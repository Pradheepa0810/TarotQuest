'use strict';

// Independent Chromium end-to-end check using Node's built-in WebSocket/CDP.
// No npm dependencies. Requires a running local site and installed Chrome/Edge.
// Usage: node tests/course-browser-run.cjs [http://127.0.0.1:8080/tarot-quest.html]
const fs = require('node:fs');
const path = require('node:path');
const os = require('node:os');
const { spawn } = require('node:child_process');
const assert = require('node:assert/strict');

const artifacts = path.join(__dirname, 'artifacts');
const browsers = [process.env.CHROME_PATH,
  'C:/Program Files/Google/Chrome/Application/chrome.exe',
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].filter(Boolean);
const executable = browsers.find(file => fs.existsSync(file));
if (!executable) throw Error('Set CHROME_PATH to an installed Chromium browser.');
fs.mkdirSync(artifacts, { recursive: true });
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'tarot-course-test-'));
const child = spawn(executable, ['--headless=new', '--remote-debugging-port=0',
  `--user-data-dir=${profile}`, '--no-first-run', '--no-default-browser-check',
  '--disable-background-networking', '--window-size=1440,1000', 'about:blank'],
{ stdio: ['ignore', 'ignore', 'pipe'] });

async function main() {
  const endpoint = await new Promise((resolve, reject) => {
    let stderr = '';
    child.stderr.on('data', chunk => {
      stderr += chunk;
      const match = /DevTools listening on (ws:\/\/\S+)/.exec(stderr);
      if (match) resolve(match[1]);
    });
    child.once('error', reject);
    child.once('exit', code => reject(Error(`Browser exited before startup: ${code}`)));
  });
  const socket = new WebSocket(endpoint);
  await new Promise((resolve, reject) => { socket.onopen = resolve; socket.onerror = reject; });
  let serial = 0;
  const pending = new Map();
  const listeners = new Map();
  const errors = [];
  socket.onmessage = event => {
    const message = JSON.parse(event.data);
    if (message.id) {
      const request = pending.get(message.id);
      pending.delete(message.id);
      if (message.error) request?.reject(Error(JSON.stringify(message.error)));
      else request?.resolve(message.result);
    } else {
      if (message.method === 'Runtime.exceptionThrown') errors.push(message.params.exceptionDetails.text);
      for (const listener of listeners.get(message.method) || []) listener(message.params);
    }
  };
  function send(method, params = {}, sessionId) {
    const id = ++serial;
    return new Promise((resolve, reject) => {
      pending.set(id, { resolve, reject });
      socket.send(JSON.stringify({ id, method, params, ...(sessionId ? { sessionId } : {}) }));
    });
  }
  function once(method, predicate = () => true, timeout = 180000) {
    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => { remove(); reject(Error(`Timed out: ${method}`)); }, timeout);
      const remove = () => listeners.set(method, (listeners.get(method) || []).filter(fn => fn !== listener));
      const listener = params => {
        if (!predicate(params)) return;
        clearTimeout(timer);
        remove();
        resolve(params);
      };
      listeners.set(method, [...(listeners.get(method) || []), listener]);
    });
  }
  const { targetId } = await send('Target.createTarget', { url: 'about:blank' });
  const { sessionId } = await send('Target.attachToTarget', { targetId, flatten: true });
  await send('Page.enable', {}, sessionId);
  await send('Runtime.enable', {}, sessionId);
  await send('Browser.setDownloadBehavior', { behavior: 'allow', downloadPath: artifacts, eventsEnabled: true });
  const evaluate = async expression => {
    const result = await send('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true }, sessionId);
    if (result.exceptionDetails) throw Error(result.exceptionDetails.exception?.description || result.exceptionDetails.text);
    return result.result.value;
  };
  const ready = once('Page.domContentEventFired');
  await send('Page.navigate', { url: process.argv[2] || 'http://127.0.0.1:8080/tarot-quest.html' }, sessionId);
  await ready;
  const report = await evaluate(`(async () => {
    const check = (value, message) => { if (!value) throw Error(message); };
    check(state.learnedCards.length === 0, 'Profile must begin with no mastery');
    state.settings.sound = false;
    state.settings.animations = false;
    handleDownloadFullDeckCertificate();
    const gate = dom.magicModal.innerText;
    check(gate.includes('available after you master all'), 'Certificate must be gated');
    dom.magicModalPrimary.click();
    continueJourney();
    const lessons = [];
    const unlockAt = {};
    for (const [index, id] of TarotDeck.DECK_ORDER.entries()) {
      check(state.currentCard === id, 'Wrong next card: ' + id);
      while (state.popupOpen) closeCompletionPopup();
      dom.mainContent.querySelector('[data-action="lesson.open-card-from-reveal"]').click();
      await new Promise(resolve => {
        const observer = new MutationObserver(() => {
          if (!state.revealFlipAnimating) { observer.disconnect(); resolve(); }
        });
        observer.observe(dom.mainContent, { childList: true, subtree: true });
        dom.mainContent.querySelector('[data-action="lesson.reveal-card-face"]').click();
      });
      const phases = ['welcome', 'reveal'];
      while (PHASES[state.phaseIndex].id !== 'quiz') {
        const next = dom.mainContent.querySelector('[data-action="phase.next"]');
        check(next, 'Missing next phase: ' + id);
        next.click();
        const phase = PHASES[state.phaseIndex].id;
        phases.push(phase);
        check(dom.mainContent.innerText.trim(), 'Empty phase: ' + id + '/' + phase);
        check(!/undefined|\\[object Object\\]/.test(dom.mainContent.innerText), 'Malformed phase: ' + id);
        if (phase === 'color') check(dom.mainContent.querySelectorAll('.color-row').length === 3, 'Palette count');
        if (phase === 'character') check(dom.mainContent.innerText.includes('The Scene'), 'Merged scene missing');
      }
      const card = getCard();
      for (const [i, q] of card.quiz.entries()) {
        const input = dom.mainContent.querySelector('[data-action="quiz.select-answer"][data-question-index="' + i + '"][data-option-index="' + q.answer + '"]');
        check(input, 'Missing answer');
        input.checked = true;
        input.dispatchEvent(new Event('change', { bubbles: true }));
      }
      dom.mainContent.querySelector('[data-action="quiz.submit"]').click();
      phases.push(PHASES[state.phaseIndex].id);
      check(state.learnedCards.length === index + 1 && state.learnedCards.includes(id), 'Mastery not earned: ' + id);
      const score = QuizEngine.evaluate(card, state.quizAnswers).score;
      check(score === 4, 'Scoring mismatch');
      for (const achievement of state.achievementData.unlocked) unlockAt[achievement] ||= index + 1;
      while (state.popupOpen) closeCompletionPopup();
      const milestone = dom.mainContent.querySelector('[data-action="milestone.claim"]');
      const group = milestone?.dataset.milestoneId || null;
      if (milestone) milestone.click();
      lessons.push({ id, phases, score, milestone: group });
      if (index < 77) {
        const next = dom.mainContent.querySelector('[data-action="lesson.next-card"]');
        check(next, 'Next card blocked: ' + id);
        next.click();
      }
    }
    dom.mainContent.querySelector('[data-action="ending.show-grandmaster"]').click();
    check(!!dom.mainContent.querySelector('.grandmaster-screen'), 'Ending button did not open Grandmaster screen');
    const ending = dom.mainContent.innerText;
    openAlchemyLibrary();
    const achievements = [...document.querySelectorAll('.achievement-card')].map(e => ({ id: e.dataset.achievement, unlocked: e.classList.contains('unlocked') }));
    check(achievements.length === 9 && achievements.every(a => a.unlocked), 'Library not completely unlocked');
    const images = [...document.querySelectorAll('.achievement-card-image')];
    for (const image of images) image.loading = 'eager';
    await Promise.all(images.map(image => image.decode()));
    return { lessons, unlockAt, achievements, ending, gate, mastered: state.learnedCards.length,
      phaseCount: lessons.reduce((n, lesson) => n + lesson.phases.length, 0),
      gems: state.gems, rank: state.rank, srs: Object.keys(state.srs).length,
      images: images.map(i => ({ alt: i.alt, loaded: i.complete && i.naturalWidth > 0 })),
      saved: JSON.parse(localStorage.getItem(STORAGE_KEY)).learnedCards.length };
  })()`);
  // Reload the genuinely earned state; do not seed completion through storage.
  const reloaded = once('Page.domContentEventFired');
  await send('Page.reload', {}, sessionId);
  await reloaded;
  report.persistence = await evaluate(`(() => {
    openAlchemyLibrary();
    return { mastered: state.learnedCards.length, unlocked: state.achievementData.unlocked.length,
      srs: Object.keys(state.srs).length, gems: state.gems };
  })()`);
  assert.equal(report.persistence.mastered, 78);
  assert.equal(report.persistence.unlocked, 9);
  assert.equal(report.persistence.srs, 78);
  assert.equal(report.persistence.gems, report.gems);
  await evaluate(`(async () => {
    const images = [...document.querySelectorAll('.achievement-card-image')];
    for (const image of images) image.loading = 'eager';
    await Promise.all(images.map(image => image.decode()));
    await document.fonts.ready;
    document.getAnimations().forEach(animation => {
      if (Number.isFinite(animation.effect?.getComputedTiming().endTime)) animation.finish();
      else animation.pause();
    });
  })()`);
  const screenshot = await send('Page.captureScreenshot', { captureBeyondViewport: true }, sessionId);
  fs.writeFileSync(path.join(artifacts, 'course-library-complete.png'), Buffer.from(screenshot.data, 'base64'));
  const downloaded = once('Browser.downloadProgress', event => event.state === 'completed', 20000);
  const started = once('Browser.downloadWillBegin', () => true, 20000);
  await evaluate(`(() => {
    document.querySelector('[data-action="certificate.download"]').click();
    dom.magicModalInput.value = 'Test Seeker';
    dom.magicModalPrimary.click();
  })()`);
  const start = await started;
  await downloaded;
  const file = path.join(artifacts, start.suggestedFilename);
  const png = fs.readFileSync(file);
  assert.equal(png.subarray(0, 8).toString('hex'), '89504e470d0a1a0a');
  assert.equal(png.readUInt32BE(16), 800);
  assert.equal(png.readUInt32BE(20), 560);
  report.certificate = { filename: start.suggestedFilename, bytes: png.length,
    width: 800, height: 560, downloadCompleted: true };
  report.errors = errors;
  assert.deepEqual(errors, []);
  fs.writeFileSync(path.join(artifacts, 'course-run.json'), JSON.stringify(report, null, 2));
  console.log(JSON.stringify({ lessons: report.lessons.length, phases: report.phaseCount,
    questions: report.lessons.reduce((n, l) => n + l.score, 0), unlockAt: report.unlockAt,
    persistence: report.persistence, certificate: report.certificate, errors }, null, 2));
  await send('Browser.close');
  socket.close();
}

const watchdog = setTimeout(() => { console.error('Course browser test exceeded 5 minutes'); child.kill(); process.exitCode = 1; }, 300000);
main().catch(error => { console.error(error); process.exitCode = 1; }).finally(() => {
  clearTimeout(watchdog);
  child.kill();
  // Ephemeral browser profile is not user progress. Let Windows release its locks.
  try { fs.rmSync(profile, { recursive: true, force: true }); } catch { /* Browser may still be exiting. */ }
});