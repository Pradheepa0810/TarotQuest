'use strict';

// No DOM, network, packages, or application initialization. Run: node --test tests/lessons.test.cjs
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.resolve(__dirname, '..');
const APP = fs.readFileSync(path.join(ROOT, 'assets/js/app.js'), 'utf8');
const DECK = fs.readFileSync(path.join(ROOT, 'deck-data.js'), 'utf8');
const KINDS = ['symbol', 'scenario', 'reversal', 'image'];
const MAJORS = ['fool', 'magician', 'high-priestess', 'empress', 'emperor', 'hierophant',
  'lovers', 'chariot', 'strength', 'hermit', 'wheel-of-fortune', 'justice', 'hanged-man',
  'death', 'temperance', 'devil', 'tower', 'star', 'moon', 'sun', 'judgement', 'world'];
const SUITS = ['wands', 'cups', 'swords', 'pentacles'];
const RANKS = ['ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  'ten', 'page', 'knight', 'queen', 'king'];
const IDS = [...MAJORS, ...SUITS.flatMap(suit => RANKS.map(rank => `${suit}-${rank}`))];
const plain = value => JSON.parse(JSON.stringify(value));

// Slice at the next top-level function declaration, not at a nested brace or a
// brace in a template literal. The lessonRoot assignment is a separate statement.
function extractFunction(source, name) {
  const signature = new RegExp(`^    (?:async )?function ${name}\\(`, 'm');
  const match = signature.exec(source);
  assert.ok(match, `Missing function signature: ${name}`);
  const tail = source.slice(match.index + match[0].length);
  const next = /\n    (?:(?:async )?function \w+\(|const lessonRoot\s*=)/.exec(tail);
  assert.ok(next, `Missing next-function marker after ${name}`);
  return source.slice(match.index, match.index + match[0].length + next.index);
}

function loadLessons(deckSource = DECK, appSource = APP) {
  const sandbox = {};
  // The deck attaches to window; window and globalThis must identify the same
  // context so the app prelude can access the bare TarotDeck global.
  sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(deckSource, sandbox, { filename: 'deck-data.js', timeout: 5000 });
  const stop = appSource.indexOf('const SRS_INITIAL_EASE');
  assert.ok(stop > 0, 'App prelude boundary must exist');
  vm.runInContext(appSource.slice(0, stop), sandbox, { filename: 'app-prelude.js', timeout: 5000 });
  // PHASES is a lexical const, not a property of window.
  const phases = plain(vm.runInContext('PHASES', sandbox));
  return { sandbox, deck: sandbox.TarotDeck, phases };
}

function installFunctions(sandbox, names, appSource = APP) {
  for (const name of names) {
    vm.runInContext(extractFunction(appSource, name), sandbox, { timeout: 5000 });
  }
}

const loaded = loadLessons();
const { sandbox, deck, phases } = loaded;
const themeLiteral = /const THEMES = (\[[^;]+\]);/.exec(APP);
assert.ok(themeLiteral, 'Read the real supported theme literal');
vm.runInContext(`const THEMES = ${themeLiteral[1]};`, sandbox);
installFunctions(sandbox, ['resolveSavedPhase', 'validateProgressImport', 'cleanLessonHtml',
  'normalizeLessonText', 'getSymbolMeaningText', 'renderCharacter', 'renderColor']);
const cards = IDS.map(id => deck.getCard(id));
const phaseId = data => phases[sandbox.resolveSavedPhase(data)]?.id;

function populated(value, label) {
  assert.equal(typeof value, 'string', label);
  assert.ok(value.trim().length > 0, label);
}

function progress(overrides = {}) {
  return {
    version: 4, currentCard: 'hermit', phaseIndex: 4, currentPhase: 'character',
    completedCards: ['fool', 'magician'], completedGroups: [], gems: 345,
    rank: 'Gem Scribe', masteredStatus: { fool: true, magician: true },
    lastReviewedCard: 'fool', currentNavigationPosition: 9,
    quizAnswers: [0, 3, 2, 1], quizSubmitted: true, showingMilestone: false,
    daily: { lastLoginDate: '2026-10-15', streak: 7, longestStreak: 9 },
    settings: { sound: false, animations: true, theme: 'moonlit' },
    srs: { fool: { easeFactor: 2.6, interval: 7, repetitions: 3, nextReview: '2026-10-22' } },
    rightPanelCollapsed: false, compareMode: false,
    compareLeftCardId: 'fool', compareRightCardId: 'hermit',
    activeView: 'lesson', panelReturnView: 'lesson',
    achievementData: { unlocked: ['first_five'], perfectQuizzes: 3 },
    learnedCards: ['fool', 'magician', 'hermit'], shownMilestones: [], isFirstVisit: false,
    ...overrides
  };
}

test('deck + app prelude loads all 78 canonical IDs in preserved order without a DOM', () => {
  assert.equal(sandbox.document, undefined);
  assert.equal(sandbox.storageService, undefined);
  assert.equal(deck.TOTAL_CARDS, 78);
  assert.deepEqual(plain(deck.DECK_ORDER), IDS);
  assert.equal(new Set(deck.DECK_ORDER).size, 78);
  assert.deepEqual(Object.keys(deck.CARDS).sort(), [...IDS].sort());
  IDS.forEach((id, index) => {
    assert.equal(cards[index].id, id);
    assert.equal(deck.getPrevCardId(id), IDS[index - 1] || null);
    assert.equal(deck.getNextCardId(id), IDS[index + 1] || null);
  });
});

test('all 78 lessons have populated canonical teaching sections and at least three sources', () => {
  for (const card of cards) {
    for (const key of ['id', 'name', 'numberLabel', 'suit', 'element', 'image', 'archetype', 'figure', 'challenge']) {
      populated(card[key], `${card.id}.${key}`);
    }
    for (const key of ['meaning', 'why', 'expression', 'hook']) populated(card.numerology[key], `${card.id}.numerology.${key}`);
    assert.equal(card.scene.paragraphs.length, 2, card.id);
    card.scene.paragraphs.forEach(text => populated(text, `${card.id}.scene.paragraph`));
    populated(card.scene.takeaway, `${card.id}.scene.takeaway`);
    for (const key of ['dominant', 'secondary', 'behavior', 'motivates', 'strengths', 'shadows', 'asPerson']) {
      populated(card.elemental[key], `${card.id}.elemental.${key}`);
    }
    assert.ok(card.symbols.length >= 3, card.id);
    for (const symbol of card.symbols) {
      for (const key of ['name', 'where', 'meaning', 'echo']) populated(symbol[key], `${card.id}.symbol.${key}`);
    }
    for (const key of ['shadow', 'readingTip', 'contrast']) populated(card.reversed[key], `${card.id}.reversed.${key}`);
    for (const [list, keys] of [['cautions', ['aspect', 'detail']], ['meanings', ['keyword', 'meaning', 'application']]]) {
      assert.ok(card.reversed[list].length > 0, card.id);
      card.reversed[list].forEach(item => keys.forEach(key => populated(item[key], `${card.id}.${list}.${key}`)));
    }
    for (const key of ['summary', 'visual', 'application']) populated(card.memory[key], `${card.id}.memory.${key}`);
    assert.ok(card.sources.length >= 3, card.id);
    assert.equal(new Set(card.sources.map(source => source.id)).size, card.sources.length, card.id);
    for (const source of card.sources) {
      for (const key of ['id', 'author', 'title', 'url']) populated(source[key], `${card.id}.source.${key}`);
      populated(source.section || source.consultedSection, `${card.id}.source.section/consultedSection`);
      assert.match(source.url, /^https:\/\//, card.id);
    }
  }
});

test('312 questions have four distinct populated options, valid answers and balanced positions', () => {
  const positions = [0, 0, 0, 0];
  for (const card of cards) {
    assert.equal(card.quiz.length, 4, card.id);
    assert.equal(new Set(card.quiz.map(question => question.answer)).size, 4, card.id);
    for (const question of card.quiz) {
      populated(question.q, card.id);
      populated(question.explain, card.id);
      assert.equal(question.options.length, 4, card.id);
      question.options.forEach(option => populated(option, card.id));
      assert.equal(new Set(question.options.map(option => option.trim().toLowerCase())).size, 4, card.id);
      assert.ok(Number.isInteger(question.answer) && question.answer >= 0 && question.answer < 4, card.id);
      populated(question.options[question.answer], card.id);
      positions[question.answer]++;
    }
  }
  assert.deepEqual(positions, [78, 78, 78, 78]);
});

test('all 56 Minors have the four intended question kinds and balanced kind positions', () => {
  const byKind = Object.fromEntries(KINDS.map(kind => [kind, [0, 0, 0, 0]]));
  for (const card of cards.slice(22)) {
    assert.deepEqual(plain(card.quiz.map(question => question.kind)), KINDS, card.id);
    card.quiz.forEach(question => byKind[question.kind][question.answer]++);
    assert.equal(card.quiz[1].options[card.quiz[1].answer], card.name, card.id);
    assert.equal(card.quiz[2].options[card.quiz[2].answer], card.reversed.cautions[0].aspect, card.id);
  }
  // Four suits each have 14 ranks, not a multiple of four. Per-kind counts are
  // therefore 12/12/16/16; across all four kinds they are exactly 56/56/56/56.
  for (const positions of Object.values(byKind)) assert.deepEqual([...positions].sort((a, b) => a - b), [12, 12, 16, 16]);
});

test('Fool prelude rotates answers deterministically without changing their correct text', () => {
  const second = loadLessons();
  assert.deepEqual(plain(deck.CARDS.fool), plain(second.deck.CARDS.fool));
  const original = loadLessons(DECK, APP.replace(/FOOL_CARD\.quiz = FOOL_CARD\.quiz\.map\([\s\S]*?\n    \}\)\);/, ''));
  deck.CARDS.fool.quiz.forEach((question, index) => {
    const before = original.deck.CARDS.fool.quiz[index];
    assert.deepEqual(plain(question.options), plain(before.options.slice(index).concat(before.options.slice(0, index))));
    assert.equal(question.options[question.answer], before.options[before.answer]);
  });
  assert.deepEqual(plain(deck.CARDS.fool.quiz.map(question => question.answer)), [0, 3, 2, 1]);
});

test('palettes have three short meaning phrases and unique full-card combinations', () => {
  const palettes = new Set();
  const minorPhrases = new Set();
  const minorHexPalettes = new Set();
  for (const card of cards) {
    assert.equal(card.colors.length, 3, card.id);
    assert.equal(new Set(card.colors.map(color => color.phrase)).size, 3, card.id);
    for (const color of card.colors) {
      assert.match(color.hex, /^#[0-9a-f]{6}$/i, card.id);
      populated(color.phrase, card.id);
      assert.ok(color.phrase.trim().split(/\s+/).length <= 10, `${card.id}: ${color.phrase}`);
      assert.doesNotMatch(color.phrase, /[.!?;]/, card.id);
      if (color.where) assert.notEqual(color.phrase, color.where, card.id);
      if (SUITS.some(suit => card.id.startsWith(`${suit}-`))) {
        assert.ok(!minorPhrases.has(color.phrase), `${card.id}: duplicate meaning phrase`);
        minorPhrases.add(color.phrase);
        assert.equal(color.name, color.phrase, card.id);
        assert.equal(color.interpretation, color.phrase, card.id);
      }
    }
    const palette = JSON.stringify(card.colors.map(color => [color.hex, color.phrase]));
    assert.ok(!palettes.has(palette), card.id);
    palettes.add(palette);
    if (!MAJORS.includes(card.id)) {
      const hexes = JSON.stringify(card.colors.map(color => color.hex));
      assert.ok(!minorHexPalettes.has(hexes), card.id);
      minorHexPalettes.add(hexes);
    }
  }
  assert.equal(palettes.size, 78);
  assert.equal(minorPhrases.size, 168);
  assert.equal(minorHexPalettes.size, 56);
});

test('available palette sourceRefs resolve consistently to per-card sources', () => {
  let references = 0;
  for (const card of cards) {
    for (const color of card.colors) {
      // Fool has a source bibliography but no per-swatch references yet.
      if (!color.sourceRefs) continue;
      assert.ok(color.sourceRefs.length > 0, card.id);
      for (const ref of color.sourceRefs) {
        const source = card.sources.find(item => item.id === (typeof ref === 'string' ? ref : ref.id));
        assert.ok(source, `${card.id}: unresolved sourceRef`);
        if (typeof ref === 'object') {
          assert.equal(ref.url, source.url, card.id);
          assert.equal(ref.author, source.author, card.id);
          assert.equal(ref.title, source.title, card.id);
          populated(ref.section, card.id);
          assert.equal(ref.symbol, color.symbol, card.id);
          assert.ok(['object-symbolism', 'reading-association'].includes(ref.relationship), card.id);
          assert.equal(ref.validation.status, 'consulted', card.id);
          populated(color.where, card.id);
        }
        references++;
      }
    }
  }
  assert.equal(references, 77 * 3);
});

test('phase list and renderer source do not restore removed labels or a movie renderer', () => {
  assert.deepEqual(phases.map(phase => phase.id), ['welcome', 'reveal', 'numerology', 'color', 'character', 'elemental', 'symbols', 'reversed', 'quiz', 'results']);
  assert.equal(phases.find(phase => phase.id === 'character').label, 'Figure & Scene');
  assert.doesNotMatch(phases.map(phase => phase.label).join('\n'), /landscape|movie|mnemonic|memory spell/i);
  assert.doesNotMatch(APP, /function\s+render(?:Movie|Landscape)\s*\(|\brender(?:Movie|Landscape)\s*\(|\bmnemonic\b/i);
  for (const card of cards) {
    assert.equal(Object.hasOwn(card, 'movie'), false, card.id);
    assert.equal(Object.hasOwn(card, 'mnemonic'), false, card.id);
    assert.equal(Object.hasOwn(card.memory, 'mnemonic'), false, card.id);
  }
});

test('combined portrait renderer includes figure, challenge, two scene paragraphs and takeaway once', () => {
  for (const card of cards) {
    const html = sandbox.renderCharacter(card);
    assert.match(html, /The Portrait/);
    assert.match(html, /The Scene/);
    assert.match(html, /Try this:/);
    for (const text of [card.figure, card.challenge, ...card.scene.paragraphs, card.scene.takeaway]) {
      const expected = sandbox.cleanLessonHtml(text).replace(/\n\n/g, '</div><div class="story-block">');
      assert.ok(html.includes(expected), `${card.id}: omitted figure/scene prose`);
      assert.equal(html.split(expected).length - 1, 1, `${card.id}: duplicate figure/scene prose`);
    }
    assert.doesNotMatch(html, /undefined|\[object Object\]|class="phase-title">(?:Memory Spell|The Landscape)|mnemonic/i);
  }
  const sentinel = plain(cards[0]);
  sentinel.character = [{ aspect: 'UNUSED_CHARACTER', detail: 'UNUSED_DETAIL', reveal: 'UNUSED_REVEAL' }];
  sentinel.landscapeStory = 'UNUSED_LANDSCAPE';
  sentinel.landscapeMeaning = 'UNUSED_MEANING';
  assert.doesNotMatch(sandbox.renderCharacter(sentinel), /UNUSED_/);
});

test('palette renderer emits only meaning phrases and swatches, never name or location', () => {
  const source = extractFunction(APP, 'renderColor');
  assert.doesNotMatch(source, /\bc\.(?:name|where)\b/);
  for (const card of cards) {
    const html = sandbox.renderColor(card);
    assert.equal((html.match(/class="color-swatch"/g) || []).length, 3, card.id);
    assert.equal((html.match(/class="color-row"/g) || []).length, 3, card.id);
    card.colors.forEach(color => {
      assert.ok(html.includes(`background:${color.hex}`), card.id);
      assert.ok(html.includes(sandbox.cleanLessonHtml(color.phrase)), card.id);
    });
  }
  const html = sandbox.renderColor({ colors: [{ hex: '#123456', phrase: 'MEANING_ONLY', name: 'FORBIDDEN_NAME', where: 'FORBIDDEN_LOCATION' }] });
  assert.match(html, /MEANING_ONLY/);
  assert.doesNotMatch(html, /FORBIDDEN_|color-name|color-trick/);
});

test('saved phase IDs take precedence, including obsolete index 11 in version 4', () => {
  for (const version of [3, 4]) {
    for (const [currentPhase, expected] of [['landscape', 'character'], ['movie', 'results'], ['results', 'results'], ['quiz', 'quiz']]) {
      const input = progress({ version, currentPhase, phaseIndex: 11 });
      assert.equal(phaseId(input), expected);
      const output = sandbox.validateProgressImport(input);
      assert.equal(output.currentPhase, expected);
      assert.equal(output.phaseIndex, phases.findIndex(phase => phase.id === expected));
    }
  }
});

test('numeric version 3 maps every legacy index, including landscape, movie, quiz and results', () => {
  const expected = ['welcome', 'reveal', 'numerology', 'color', 'character', 'character', 'elemental', 'symbols', 'reversed', 'quiz', 'results', 'results'];
  expected.forEach((id, phaseIndex) => {
    const input = progress({ version: 3, currentPhase: null, phaseIndex });
    assert.equal(phaseId(input), id);
    assert.equal(sandbox.validateProgressImport(input).currentPhase, id);
  });
});

test('full import preserves mastery, gems, achievements, SRS, quiz and every other field without mutation', () => {
  for (const [version, currentPhase] of [[3, 'landscape'], [4, 'movie'], [4, 'quiz'], [4, 'results']]) {
    const input = progress({ version, currentPhase, phaseIndex: 11 });
    const before = structuredClone(input);
    const output = sandbox.validateProgressImport(input);
    assert.notEqual(output, input);
    assert.deepEqual(input, before);
    const expectedIndex = sandbox.resolveSavedPhase(before);
    assert.deepEqual(plain(output), { ...before, phaseIndex: expectedIndex, currentPhase: phases[expectedIndex].id });
  }
});

test('invalid negative/noninteger indices are rejected even with a recognized phase ID', () => {
  for (const phaseIndex of [-1, -10, 1.5, NaN, Infinity, '4']) {
    assert.throws(() => sandbox.validateProgressImport(progress({ phaseIndex })), /phase is invalid/);
  }
});

test('unknown/unresolvable phase IDs and out-of-range numeric indices are rejected', () => {
  for (const [version, phaseIndex, currentPhase] of [[4, 10, null], [4, 11, null], [3, 12, null], [4, 999, 'unknown-phase'], [3, -1, 'unknown-phase']]) {
    const input = progress({ version, phaseIndex, currentPhase });
    assert.equal(sandbox.resolveSavedPhase(input), -1);
    assert.throws(() => sandbox.validateProgressImport(input), /phase is invalid/);
  }
  assert.equal(sandbox.resolveSavedPhase({ version: 4, currentPhase: 'unknown-phase' }), -1);
});

test('compatibility: an unknown ID with an otherwise valid index falls back to the numeric phase', () => {
  // This is current documented compatibility, not a claim of strict ID validation.
  const output = sandbox.validateProgressImport(progress({ currentPhase: 'unknown-phase', phaseIndex: 8 }));
  assert.equal(output.currentPhase, 'quiz');
});

test('import rejects malformed payloads and unsupported versions without altering their source', () => {
  for (const input of [null, [], {}, ...[0, 5, 3.5].map(version => progress({ version })),
    progress({ currentCard: 'not-a-card' }), progress({ gems: -1 }), progress({ gems: Infinity }),
    progress({ completedCards: ['not-a-card'] }), progress({ learnedCards: ['not-a-card'] }),
    progress({ quizAnswers: {} }), progress({ settings: { sound: true, animations: true, theme: 'unknown' } }),
    progress({ srs: [] }), progress({ masteredStatus: null }), progress({ achievementData: [] })]) {
    const before = structuredClone(input);
    assert.throws(() => sandbox.validateProgressImport(input));
    assert.deepEqual(input, before);
  }
  const missing = progress();
  delete missing.currentPhase;
  assert.throws(() => sandbox.validateProgressImport(missing), /missing required progress fields/);
});

// Canonical learner-prose audit shared with CONTENT_UPGRADE_REPORT.md. Deliberate
// allowlists prevent citations, sourceRefs, echoes already in meaning, generated
// keywordFlow, hidden/trick metadata, and unused landscape aliases entering after.
function proseSections(card, symbolMeaning = (_card, symbol) => symbol.meaning) {
  const pick = (object, keys) => keys.map(key => object?.[key] || '');
  const scene = card.scene
    ? [...card.scene.paragraphs, card.scene.takeaway]
    : [...(card.landscape || []).map(item => item.why), card.landscapeStory, card.landscapeMeaning,
      ...pick(card.movie, ['setting', 'sounds', 'weather', 'moves', 'emotions', 'next'])];
  return {
    numerology: pick(card.numerology, ['meaning', 'why', 'expression', 'hook']),
    colors: card.colors.flatMap(color => color.phrase ? [color.phrase] : pick(color, ['name', 'meaning', 'trick'])),
    figure: card.figure ? [card.figure] : card.character.flatMap(item => pick(item, ['aspect', 'detail', 'reveal'])),
    challenge: [card.challenge || card.characterChallenge],
    scene,
    elemental: pick(card.elemental, ['dominant', 'secondary', 'behavior', 'motivates', 'strengths', 'shadows', 'asPerson']),
    symbols: card.symbols.flatMap(symbol => [symbol.name, symbolMeaning(card, symbol)]),
    reversal: [card.reversed.shadow, ...card.reversed.cautions.flatMap(item => pick(item, ['aspect', 'detail'])),
      ...card.reversed.meanings.flatMap(item => pick(item, ['keyword', 'meaning', 'application'])),
      card.reversed.readingTip, card.reversed.contrast],
    memory: pick(card.memory, ['summary', 'visual', 'application']),
    quiz: card.quiz.flatMap(question => [question.q, ...question.options, question.explain])
  };
}

function wordCount(values) {
  const text = values.flat(Infinity).filter(value => typeof value === 'string').join(' ')
    .replace(/<[^>]*>/g, ' ').replace(/https?:\/\/\S+/g, ' ')
    .replace(/&(?:nbsp|amp|quot|apos|lt|gt|#\d+|#x[\da-f]+);/gi, ' ');
  // Hyphenated words and internal straight/curly apostrophes count as one token.
  return (text.match(/[\p{L}\p{N}]+(?:['’\-][\p{L}\p{N}]+)*/gu) || []).length;
}

test('word-count allowlists exclude citation metadata, duplicate echoes and unused legacy aliases', () => {
  const card = plain(cards[22]);
  const count = value => wordCount(Object.values(proseSections(value)));
  const before = count(card);
  card.sources.push({ title: 'PADDING '.repeat(100) });
  card.colors[0].sourceRefs.push({ section: 'PADDING '.repeat(100) });
  for (const key of ['landscapeStory', 'landscapeMeaning', 'keywordFlow', 'characterChallenge']) card[key] = 'PADDING '.repeat(100);
  card.symbols[0].echo = 'PADDING '.repeat(100);
  card.symbols[0].hidden = 'PADDING '.repeat(100);
  card.memory.mnemonic = 'PADDING '.repeat(100);
  assert.equal(count(card), before);
  assert.equal(wordCount(['<em>One</em> well-lit traveler’s pack https://example.com']), 4);
});

module.exports = { loadLessons, installFunctions, proseSections, wordCount, IDS };