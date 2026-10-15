'use strict';

const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..');
const app = fs.readFileSync(path.join(root, 'assets/js/app.js'), 'utf8');

function fixture() {
  const sandbox = {};
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(fs.readFileSync(path.join(root, 'deck-data.js'), 'utf8'), sandbox);
  vm.runInContext(app.slice(0, app.indexOf('const SRS_INITIAL_EASE')), sandbox);
  vm.runInContext(fs.readFileSync(path.join(root, 'assets/js/modules/achievement-service.js'), 'utf8'), sandbox);
  const state = {
    learnedCards: [], gems: 0, shownMilestones: [],
    achievementData: { unlocked: [], perfectQuizWins: 0, masteredThisSession: 0, bestSessionMastered: 0 }
  };
  const events = [];
  const achievements = vm.runInContext('ACHIEVEMENTS', sandbox);
  const groups = vm.runInContext('GROUPS', sandbox);
  const service = new sandbox.AchievementService({
    state, achievements, groups, deck: sandbox.TarotDeck,
    onUnlock: achievement => events.push(achievement.id)
  });
  return { sandbox, state, events, service, achievements, groups };
}

test('every Library achievement is attainable through the complete 78-card course', () => {
  const { sandbox, state, events, service, achievements, groups } = fixture();
  service.evaluateAchievements();
  assert.deepEqual(state.achievementData.unlocked, []);
  const unlockAt = {};
  sandbox.TarotDeck.DECK_ORDER.forEach((id, index) => {
    state.learnedCards.push(id);
    state.achievementData.perfectQuizWins++;
    state.achievementData.masteredThisSession++;
    state.achievementData.bestSessionMastered = state.achievementData.masteredThisSession;
    const before = events.length;
    service.evaluateAchievements();
    events.slice(before).forEach(achievement => { unlockAt[achievement] = index + 1; });
  });
  assert.deepEqual(unlockAt, {
    quiz_perfectionist: 3, speed_learner: 3, first_five: 5,
    major_arcana_adept: 22, wands_arcana_adept: 36,
    cups_arcana_adept: 50, swords_arcana_adept: 64,
    pentacles_arcana_adept: 78, tarot_master: 78
  });
  assert.equal(state.achievementData.unlocked.length, achievements.length);
  for (const group of groups) assert.equal(service.groupLearnedCount(group.id), group.count);
  assert.equal(state.gems, achievements.reduce((sum, achievement) => sum + achievement.gems, 0));
  const awarded = state.gems;
  service.evaluateAchievements();
  assert.equal(state.gems, awarded, 'Repeated evaluation must not pay achievements twice');
  assert.equal(events.length, 9);
  for (const group of groups) {
    assert.equal(service.checkPendingMilestone(), group.id);
    state.shownMilestones.push(group.id);
  }
  assert.equal(service.checkPendingMilestone(), null);
});

test('perfect-quiz and speed achievements require their own thresholds', () => {
  const { sandbox, state, service } = fixture();
  state.learnedCards = [...sandbox.TarotDeck.DECK_ORDER];
  service.evaluateAchievements();
  assert.equal(state.achievementData.unlocked.length, 7);
  assert.ok(!state.achievementData.unlocked.includes('quiz_perfectionist'));
  assert.ok(!state.achievementData.unlocked.includes('speed_learner'));
  state.achievementData.perfectQuizWins = 2;
  state.achievementData.masteredThisSession = 2;
  service.evaluateAchievements();
  assert.equal(state.achievementData.unlocked.length, 7);
  state.achievementData.perfectQuizWins = 3;
  state.achievementData.masteredThisSession = 3;
  state.achievementData.bestSessionMastered = 3;
  service.evaluateAchievements();
  assert.equal(state.achievementData.unlocked.length, 9);
});

test('certificate UI gate rejects incomplete mastery and ignores cancel or blank names', async () => {
  const { sandbox, state } = fixture();
  const calls = { alerts: [], prompts: 0, names: [] };
  sandbox.state = state;
  sandbox.showAlert = payload => calls.alerts.push(payload);
  sandbox.showPrompt = () => { calls.prompts++; return Promise.resolve(sandbox.testName); };
  sandbox.generateFullDeckCertificate = name => calls.names.push(name);
  const begin = app.indexOf('    function handleDownloadFullDeckCertificate()');
  const end = app.indexOf('    function generateFullDeckCertificate(', begin);
  vm.runInContext(app.slice(begin, end), sandbox);
  state.learnedCards = [...sandbox.TarotDeck.DECK_ORDER.slice(0, 77)];
  sandbox.handleDownloadFullDeckCertificate();
  assert.equal(calls.alerts.length, 1);
  assert.equal(calls.prompts, 0);
  state.learnedCards.push(sandbox.TarotDeck.DECK_ORDER[77]);
  for (const value of [null, '', '   ']) {
    sandbox.testName = value;
    sandbox.handleDownloadFullDeckCertificate();
    await Promise.resolve();
  }
  assert.deepEqual(calls.names, []);
  sandbox.testName = '  Test Seeker  ';
  sandbox.handleDownloadFullDeckCertificate();
  await Promise.resolve();
  assert.deepEqual(calls.names, ['Test Seeker']);
});

test('Enter Grandmaster Ending opens the completed lesson view instead of the cottage', () => {
  const { sandbox, state } = fixture();
  state.learnedCards = [...sandbox.TarotDeck.DECK_ORDER];
  state.activeView = 'lesson';
  state.phaseIndex = 9;
  state.showingMilestone = true;
  const originalMastery = [...state.learnedCards];
  sandbox.state = state;
  let rendered = false;
  sandbox.renderPhase = () => { rendered = true; };
  sandbox.finishLesson = () => assert.fail('Must not route back to the cottage');
  const begin = app.indexOf('    function showGrandmasterEnding()');
  const end = app.indexOf('    async function resetProgress(', begin);
  vm.runInContext(app.slice(begin, end), sandbox);
  sandbox.showGrandmasterEnding();
  assert.equal(rendered, true);
  assert.equal(state.activeView, 'lesson');
  assert.equal(state.phaseIndex, 0, 'Completed welcome phase renders the Grandmaster ending');
  assert.equal(state.showingMilestone, false);
  assert.deepEqual(state.learnedCards, originalMastery);
});