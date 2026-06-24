    const STORAGE_KEY = 'tarotQuestProgress_v2';

    const RANKS = [
      { min: 0,    title: 'Tarot Apprentice' },
      { min: 180,  title: 'Gem Scribe' },
      { min: 420,  title: 'Arcana Pathfinder' },
      { min: 760,  title: 'Mystic Cartographer' },
      { min: 1200, title: 'Oracle Keeper' },
      { min: 1800, title: 'Tarot Grandmaster' }
    ];

    const PHASES = [
      { id: 'welcome',    icon: '', label: 'Reveal Card' },
      { id: 'reveal',     icon: '', label: 'The Card' },
      { id: 'numerology', icon: '', label: 'Numbers' },
      { id: 'color',      icon: '', label: 'Colors' },
      { id: 'character',  icon: '', label: 'Figure' },
      { id: 'landscape',  icon: '', label: 'Scene' },
      { id: 'elemental',  icon: '', label: 'Elements' },
      { id: 'symbols',    icon: '', label: 'Symbols' },
      { id: 'movie',      icon: '', label: 'Movie' },
      { id: 'reversed',   icon: '', label: 'Shadow' },
      { id: 'quiz',       icon: '', label: 'Boss Quiz' },
      { id: 'memory',     icon: '', label: 'Spell' },
      { id: 'results',    icon: '', label: 'Gems' }
    ];

    const DAILY_BLESSINGS = [
      'A quiet card still carries thunder. Listen beneath the surface today.',
      'Trust your first symbol. Intuition arrives before explanation.',
      'The path opens for those who read with courage and kindness.',
      'Let one card teach one truth. Depth matters more than speed.',
      'Today\'s spread favors clarity. Ask direct questions and breathe.',
      'The Arcana smile on patient seekers. Move steadily through your lesson.',
      'Every card mastered becomes a lantern for someone else tomorrow.'
    ];

    const DAILY_LOGIN_GEMS = 25;

    const TAROT_CARD_BACK_IMAGE = `data:image/svg+xml,${encodeURIComponent(
      `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 220 360'>
        <defs>
          <linearGradient id='bg' x1='0' y1='0' x2='0' y2='1'>
            <stop offset='0%' stop-color='#2a1b47'/>
            <stop offset='100%' stop-color='#171f3c'/>
          </linearGradient>
        </defs>
        <rect width='220' height='360' rx='14' fill='url(#bg)'/>
        <rect x='10' y='10' width='200' height='340' rx='10' fill='none' stroke='#dcb977' stroke-width='3'/>
        <rect x='22' y='22' width='176' height='316' rx='8' fill='none' stroke='#8c6dc0' stroke-width='2'/>
        <circle cx='110' cy='180' r='58' fill='none' stroke='#dcb977' stroke-width='3'/>
        <circle cx='110' cy='180' r='34' fill='none' stroke='#8c6dc0' stroke-width='2'/>
        <path d='M110 132 L122 168 L160 168 L129 191 L140 228 L110 206 L80 228 L91 191 L60 168 L98 168 Z' fill='none' stroke='#dcb977' stroke-width='2'/>
        <circle cx='110' cy='180' r='4' fill='#dcb977'/>
      </svg>`
    )}`;

    const STREAK_MILESTONES = [
      { days: 7, gems: 120, title: 'Moonlit Initiate' },
      { days: 30, gems: 420, title: 'Ritual Keeper' },
      { days: 100, gems: 1200, title: 'Chronicle Oracle' }
    ];

    const ACHIEVEMENTS = [
      { id: 'first_five', icon: 'book-open', name: 'First Five', description: 'Master 5 cards.', target: 5, gems: 25 },
      { id: 'major_arcana_adept', icon: 'sparkles', name: 'Major Arcana Adept', description: 'Master all 22 Major Arcana cards.', target: 22, gems: 150 },
      { id: 'wands_arcana_adept', icon: 'flame', name: 'Wands Adept', description: 'Master all 14 Wands cards.', target: 14, gems: 80 },
      { id: 'cups_arcana_adept', icon: 'droplets', name: 'Cups Adept', description: 'Master all 14 Cups cards.', target: 14, gems: 80 },
      { id: 'swords_arcana_adept', icon: 'wind', name: 'Swords Adept', description: 'Master all 14 Swords cards.', target: 14, gems: 80 },
      { id: 'pentacles_arcana_adept', icon: 'leaf', name: 'Pentacles Adept', description: 'Master all 14 Pentacles cards.', target: 14, gems: 80 },
      { id: 'quiz_perfectionist', icon: 'target', name: 'Quiz Perfectionist', description: 'Score 100% on a quiz 3 times.', target: 3, gems: 0 },
      { id: 'speed_learner', icon: 'zap', name: 'Speed Learner', description: 'Master 3 cards in one session.', target: 3, gems: 0 },
      { id: 'tarot_master', icon: 'crown', name: 'Tarot Master', description: 'Master all 78 tarot cards.', target: 78, gems: 300 }
    ];

    const ACHIEVEMENT_THEMES = {
      first_five: { className: 'ach-first-five', kicker: 'Seeker Ledger' },
      major_arcana_adept: { className: 'ach-major', kicker: 'Arcana Vault' },
      wands_arcana_adept: { className: 'ach-wands', kicker: 'Fire Court' },
      cups_arcana_adept: { className: 'ach-cups', kicker: 'Water Court' },
      swords_arcana_adept: { className: 'ach-swords', kicker: 'Air Court' },
      pentacles_arcana_adept: { className: 'ach-pentacles', kicker: 'Earth Court' },
      quiz_perfectionist: { className: 'ach-quiz', kicker: 'Precision Trial' },
      speed_learner: { className: 'ach-speed', kicker: 'Swift Path' },
      tarot_master: { className: 'ach-master', kicker: 'Final Arcana' }
    };

    const GROUPS = [
      { id: 'major', label: 'Major Arcana', icon: 'sparkles', count: 22, color: 'major', completionTitle: 'Crown of the Arcana', award: 'Arcana Seeker Badge', trophyIcon: 'sparkles', flavor: 'You have walked the full Fool\'s Journey. Every archetype of the human soul now lives in your memory.', bonusGems: 350 },
      { id: 'wands', label: 'Wands (Fire)', icon: 'flame', count: 14, color: 'wands', completionTitle: 'Flameborne Adept', award: 'Flame Keeper Crest', trophyIcon: 'flame', flavor: 'You command the suit of Fire. Passion, vision, and creative force are yours to read.', bonusGems: 220 },
      { id: 'cups', label: 'Cups (Water)', icon: 'droplets', count: 14, color: 'cups', completionTitle: 'Tidemind Adept', award: 'Tide Walker Seal', trophyIcon: 'waves', flavor: 'You flow through the suit of Water. Emotion, intuition, and the heart\'s deepest currents speak to you.', bonusGems: 220 },
      { id: 'swords', label: 'Swords (Air)', icon: 'wind', count: 14, color: 'swords', completionTitle: 'Skyforged Adept', award: 'Sky Reader Sigil', trophyIcon: 'wind', flavor: 'You mastered the suit of Air. Clarity, strategy, and truth now sharpen your readings.', bonusGems: 220 },
      { id: 'pentacles', label: 'Pentacles (Earth)', icon: 'leaf', count: 14, color: 'pents', completionTitle: 'Stoneheart Adept', award: 'Verdant Hall Emblem', trophyIcon: 'leaf', flavor: 'You grounded your craft in Earth. Prosperity, effort, and stewardship now anchor your insight.', bonusGems: 220 }
    ];

    const FOOL_CARD = {
      id: 'fool',
      name: 'The Fool',
      number: 0,
      numberLabel: '0 — The Void Before the Journey',
      suit: 'Major Arcana',
      element: 'Air',
      secondaryElement: 'Spirit (infinite potential)',
      image: 'https://upload.wikimedia.org/wikipedia/commons/9/90/RWS_Tarot_00_Fool.jpg',
      archetype: 'The Eternal Wanderer',
      unlockTitle: 'The Fool, Keeper of Infinite Beginnings',
      keywords: ['New beginnings', 'Innocence', 'Leap of faith', 'Spontaneity', 'Pure potential'],
      numerology: {
        meaning: 'Zero is not "nothing" — it is the <em>space before the first step</em>. In Tarot, The Fool sits outside the numbered sequence: neither finished nor started, holding all possibilities at once. Think of an empty stage before the curtain rises, or a breath held before "Action!"',
        why: 'The Fool carries zero because every great journey begins in a moment of not-knowing. Zero is the circle — no beginning, no end — the eternal return to fresh starts.',
        expression: 'Pamela Colman Smith painted a youth who hasn\'t counted the cost. He doesn\'t need a number yet; he <em>is</em> the moment before counting begins. Potential without form.',
        hook: '"Zero is the open door. The Fool walks through it smiling."'
      },
      colors: [
        { hex: '#f5e042', name: 'Golden Yellow (sun & boots)', meaning: 'Joy, optimism, divine dawn blessing the journey', trick: '"The sun rises — and so does he."' },
        { hex: '#f0ece4', name: 'White (tunic & rose)', meaning: 'Innocence, purity, a clean slate untouched by experience', trick: '"White means he hasn\'t been stained by the world yet."' },
        { hex: '#c0392b', name: 'Red (feather & stockings)', meaning: 'Vitality, passion, life force pulsing through the body', trick: '"Red feet — he\'s alive and moving forward."' },
        { hex: '#5a8a3c', name: 'Green (landscape trim)', meaning: 'Nature, growth, the fertile ground of new adventure', trick: '"Green grass waits below — life continues either way."' },
        { hex: '#9f84cf', name: 'Pale Violet-Gray (distant peaks)', meaning: 'The unknown future, mystery, challenges not yet faced', trick: '"Violet mountains = adventures still far away."' }
      ],
      character: [
        { aspect: 'Posture', detail: 'Mid-stride, one foot lifted — he is literally <em>in motion</em>, caught between steps. Not standing still, not running — strolling toward the edge with careless grace.', reveal: 'The Fool\'s message is forward movement without overthinking. Progress through trust, not planning.' },
        { aspect: 'Eye Contact', detail: 'Head tilted back, eyes toward the sky — he is <em>not</em> watching the cliff.', reveal: 'He trusts the universe more than his eyes. Upright: faith and wonder. Reversed shadow: obliviousness to danger.' },
        { aspect: 'Hand Gestures', detail: 'Right hand holds a white rose lightly; left hand grips a staff with a small knapsack tied to it.', reveal: 'The rose = beauty and passion held gently, not clutched. The staff = a traveler\'s tool; the bag = everything he carries but hasn\'t unpacked yet (unconscious baggage).' },
        { aspect: 'Clothing', detail: 'A loose, colorful tunic with floral patterns, a feather in his cap, yellow boots — impractical, festive travel clothes.', reveal: 'He is not dressed for battle or business. He is the archetype of the free spirit — unburdened by society\'s armor.' },
        { aspect: 'Facial Expression', detail: 'Calm, almost dreamy — a faint smile of someone hearing music only they can hear.', reveal: 'Inner peace despite external peril. The Fool finds joy in the moment, not in outcomes.' }
      ],
      characterChallenge: 'What would change if The Fool stood still at the cliff\'s edge, looking down instead of up? <em>He\'d become cautious — the Magician planning his next move, not the Fool leaping. Posture tells the whole story.</em>',
      landscape: [
        { item: 'Bright Sun (behind him)', symbol: 'Divine blessing, optimism, a new day dawning', why: 'Smith placed the sun at his back — warmth pushes him forward. He walks <em>into</em> the light\'s glow, not away from it.' },
        { item: 'Snow-capped Mountains (distance)', symbol: 'Future challenges, the long road ahead, spiritual heights', why: 'Adventure isn\'t flat. The peaks remind us: this journey will ask much of him — but not yet.' },
        { item: 'Cliff Edge (immediate)', symbol: 'Risk, the unknown, a leap of faith', why: 'The most dramatic symbol — one more step and he falls. Smith dares us to ask: is he foolish, or fearless?' },
        { item: 'White Dog (at his heels)', symbol: 'Loyalty, instinct, animal wisdom nipping at unconsciousness', why: 'The dog tries to warn him — instinct knows what innocence ignores. Companion and alarm bell in one.' },
        { item: 'Green Valley Below', symbol: 'Life continues, nature\'s abundance, soft landing?', why: 'Even the "fall" may lead somewhere fertile. The landscape holds both peril and promise.' }
      ],
      landscapeStory: 'Imagine dawn breaking over a high mountain pass. A young traveler hums to himself, rose in hand, while his loyal dog tugs at his coat — "Wait!" But the sun warms his shoulders like a friend\'s hand, distant peaks glow pink, and the valley below is green with promise. He takes one more step into the light, and the whole world holds its breath.',
      elemental: {
        dominant: 'Air',
        secondary: 'Spirit / Infinite Potential',
        behavior: 'Air moves freely — curious, light, untethered. It doesn\'t settle; it explores.',
        motivates: 'New ideas, freedom, possibility, the thrill of "what if?"',
        strengths: 'Open-mindedness, creativity, courage to start fresh, infectious optimism',
        shadows: 'Recklessness, naivety, avoiding commitment, head in the clouds',
        asPerson: 'The friend who books a one-way ticket with no plan — brilliant at beginnings, terrible at reading fine print. Charming, restless, always smelling of wind and possibility.'
      },
      symbols: [
        { icon: 'award', name: 'White Rose', meaning: 'Purity and passion held lightly', hidden: 'Beauty doesn\'t need to be guarded — The Fool carries it openly', trick: '"A rose without thorns held high — innocence intact."' },
        { icon: 'feather', name: 'Red Feather', meaning: 'Fire of life, airy spirit, the "feather-brained" fool', hidden: 'Waite chose a feather, not a crown — this archetype is light, not royal', trick: '"Feather in cap = light head, free heart."' },
        { icon: 'backpack', name: 'Knapsack (on staff)', meaning: 'Unconscious baggage — talents and traumas not yet examined', hidden: 'He carries everything he needs but hasn\'t looked inside yet', trick: '"The bag on his back holds his future self."' },
        { icon: 'mountain', name: 'Cliff Edge', meaning: 'Leap of faith, risk, threshold between worlds', hidden: 'Every hero\'s journey begins with leaving the known', trick: '"One step from falling — or flying."' },
        { icon: 'dog', name: 'Small White Dog', meaning: 'Instinct, loyalty, protective warning', hidden: 'Your gut feeling trying to get your attention', trick: '"The dog knows — do you?"' },
        { icon: 'sun', name: 'Rising Sun', meaning: 'New beginnings blessed by the divine', hidden: 'Optimism is not foolishness when the universe conspires in your favor', trick: '"Sun at his back — heaven pushes him forward."' }
      ],
      movie: {
        setting: 'A mountain ridge at the golden hour. Wind rustles the grass. Distant eagles cry.',
        sounds: 'A tin whistle melody, the dog\'s anxious bark, boots crunching gravel, your own heartbeat.',
        weather: 'Warm sun on skin, cool air at altitude — perfect walking weather, dangerously perfect.',
        emotions: 'Giddy freedom mixed with a flutter of "should I really?" — but the flutter loses.',
        next: 'He steps off the edge — and the camera doesn\'t cut. We discover together whether he flies, falls, or finds a path invisible from above. That\'s The Fool: the story continues because he dared to move.'
      },
      reversed: {
        shadow: 'The Fool reversed embodies hesitation where there should be courage, or recklessness without any wisdom at all.',
        cautions: [
          { aspect: 'Paralysis', detail: 'Fear has replaced faith. The Fool stands at the cliff\'s edge but cannot move — frozen by doubt, catastrophizing, replaying every possible failure in his mind.' },
          { aspect: 'Foolish Risk', detail: 'He has leapt without thinking at all. No inner guidance, no spiritual trust — just blind impulse and arrogance masquerading as faith.' },
          { aspect: 'Missed Opportunities', detail: 'The Fool reversed warns: the door was there, the moment was real, but he turned away. Second chances are rare.' },
          { aspect: 'Recklessness', detail: 'Overconfidence without preparation. He packed no provisions, asked no questions, made no plans — and now suffers the consequences.' }
        ],
        meanings: [
          { keyword: 'Hesitation', meaning: 'Fear holding you back from a necessary leap', application: 'Ask: what would I do if I trusted myself?' },
          { keyword: 'Unwisdom', meaning: 'Moving without thought or guidance', application: 'Pause. Get counsel. Check your motives.' },
          { keyword: 'Delay', meaning: 'The opportunity is passing; indecision is a decision', application: 'Time to commit, or time to release.' },
          { keyword: 'Folly', meaning: 'Arrogance mistaken for confidence', application: 'The dog is barking louder now. Listen.' }
        ],
        readingTip: 'Reversed Fool often appears when someone is standing at a crossroads but too afraid, too proud, or too unprepared to move. The message: trust, or perish in safety.',
        contrast: 'Upright Fool = leap with faith. Reversed Fool = leap in blindness, or refuse to leap at all.'
      },
      memory: {
        summary: 'The Fool is pure potential at the threshold — innocent, joyful, and ready to leap into the unknown.',
        mnemonic: 'Fearless Open Optimistic Leap — <strong>F-O-O-L</strong>: Faith Over Obvious Limitations.',
        visual: 'Picture a sunlit cliff, a smiling youth with a white rose, a barking dog, and one foot already in the air — forever between falling and flying.',
        application: 'When The Fool appears, ask: "Where am I being invited to trust instead of control?" Start the project. Take the trip. Say yes — but maybe glance at the dog first.'
      },
      quiz: [
        { q: 'What number is The Fool in the Major Arcana?', options: ['I (One)', '0 (Zero)', 'XXII (Twenty-Two)', 'No number'], answer: 1, explain: 'The Fool is 0 — outside the numbered sequence, representing infinite potential before the journey begins.' },
        { q: 'What element is most associated with The Fool?', options: ['Fire', 'Water', 'Air', 'Earth'], answer: 2, explain: 'Air governs The Fool — freedom, movement, ideas, and the breath before the first word.' },
        { q: 'What is The Fool looking at?', options: ['The cliff edge below', 'The white dog', 'The sky above', 'The knapsack on his staff'], answer: 2, explain: 'His head is tilted upward — dreaming, trusting, not watching his step. Classic Fool energy.' },
        { q: 'What does the white rose symbolize?', options: ['Death and endings', 'Purity and innocence held lightly', 'Wealth and power', 'Secret knowledge'], answer: 1, explain: 'The white rose = untouched beauty and passion, carried openly without fear.' },
        { q: 'What does the small dog at The Fool\'s heels represent?', options: ['Evil omens', 'Instinct and loyal warning', 'Wealth', 'The past he left behind'], answer: 1, explain: 'The dog nips at his heels — instinct trying to warn the unconscious traveler.' },
        { q: 'What does the knapsack on the staff represent?', options: ['Empty pockets', 'Unconscious baggage — experiences not yet unpacked', 'A gift for someone he\'ll meet', 'Food for the journey only'], answer: 1, explain: 'Waite said the bag holds everything the Fool has accumulated — but he hasn\'t examined it yet.' },
        { q: 'Numerology: What does Zero represent for this card?', options: ['Failure and nothingness', 'The void of infinite potential before creation', 'The end of a cycle', 'Balance between opposites'], answer: 1, explain: 'Zero is the open circle — all possibilities, no commitments. The blank page before the story.' },
        { q: 'Which color dominates The Fool\'s boots and the sun?', options: ['Red', 'Golden Yellow', 'Black', 'Violet'], answer: 1, explain: 'Golden yellow = joy, divine dawn, optimism pushing the journey forward.' }
      ],
      gemReward: 120
    };

    TarotDeck.CARDS.fool = FOOL_CARD;

    /* ─── SRS constants ─── */
    const SRS_INITIAL_EASE = 2.5;
    const SRS_MIN_EASE = 1.3;
    const SRS_INITIAL_INTERVAL = 1;

    const DEFAULT_SETTINGS = {
      sound: true,
      animations: true,
      theme: 'forest'
    };

    const THEMES = ['forest', 'dawn', 'moonlit'];

    const storageService = new window.QuestStorageService();
    const stateManager = new window.QuestStateManager({
      defaultSettings: DEFAULT_SETTINGS,
      rankTitle: RANKS[0].title,
      todayBlessing: DAILY_BLESSINGS[0]
    });

    const dom = {};
    let audioCtx = null;
    let achievementService = null;
    let modalState = {
      queue: [],
      open: false,
      active: null,
      resolver: null,
      triggerEl: null,
      focusEls: [],
      keyHandler: null,
      clickHandler: null
    };

    /* ─── State ─── */
    let state = stateManager.getState();

    function byId(id) {
      return document.getElementById(id);
    }

    function hydrateDomCache() {
      dom.fxLayer = byId('fxLayer');
      dom.popupFx = byId('popupFx');
      dom.completionPopup = byId('completionPopup');
      dom.welcomeOverlay = byId('welcomeOverlay');
      dom.mainContent = byId('mainContent');
      dom.lessonProgress = byId('lessonProgress');
      dom.phaseDots = byId('phaseDots');
      dom.sbTotal = byId('sbTotal');
      dom.sbMastered = byId('sbMastered');
      dom.sbGroups = byId('sbGroups');
      dom.sbStreak = byId('sbStreak');
      dom.sbMysticCalendar = byId('sbMysticCalendar');
      dom.rightCardImg = byId('rightCardImg');
      dom.rightCardName = byId('rightCardName');
      dom.rightCardMeta = byId('rightCardMeta');
      dom.rightCardKeywords = byId('rightCardKeywords');
      dom.cardAltar = byId('cardAltar');
      dom.welcomeMessage = byId('welcomeMessage');
      dom.welcomeReward = byId('welcomeReward');
      dom.welcomeBlessing = byId('welcomeBlessing');
      dom.completionTitle = byId('completionTitle');
      dom.completionText = byId('completionText');
      dom.completionGems = byId('completionGems');
      dom.settingSound = byId('settingSound');
      dom.settingAnimations = byId('settingAnimations');
      dom.themeChips = Array.from(document.querySelectorAll('.theme-chip'));
      dom.settingsBtn = byId('settingsBtn');
      dom.settingsDropdown = byId('settingsDropdown');
      dom.settingsBackdrop = byId('settingsBackdrop');
      dom.sbDuePill = byId('sbDuePill');
      dom.sbDueCount = byId('sbDueCount');
      dom.compareModeBtn = byId('compareModeBtn');
      dom.restartQuestBtn = byId('restartQuestBtn');
      dom.shortcutHomeBtn = byId('shortcutHomeBtn');
      dom.shortcutLibraryBtn = byId('shortcutLibraryBtn');
      dom.shortcutChestBtn = byId('shortcutChestBtn');
      dom.shortcutSearchBtn = byId('shortcutSearchBtn');
      dom.magicModal = byId('magicModal');
      dom.magicModalDialog = dom.magicModal?.querySelector('.magic-modal-dialog') || null;
      dom.magicModalFx = byId('magicModalFx');
      dom.magicModalIcon = byId('magicModalIcon');
      dom.magicModalTitle = byId('magicModalTitle');
      dom.magicModalMessage = byId('magicModalMessage');
      dom.magicModalInput = byId('magicModalInput');
      dom.magicModalPrimary = byId('magicModalPrimary');
      dom.magicModalCancel = byId('magicModalCancel');
    }

    function prefersReducedMotion() {
      return window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    function normalizeSettings(settings) {
      const merged = { ...DEFAULT_SETTINGS, ...(settings || {}) };
      if (!THEMES.includes(merged.theme)) merged.theme = DEFAULT_SETTINGS.theme;
      if (typeof merged.sound !== 'boolean') merged.sound = DEFAULT_SETTINGS.sound;
      if (typeof merged.animations !== 'boolean') merged.animations = DEFAULT_SETTINGS.animations;
      return merged;
    }

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: state.settings.animations ? 'smooth' : 'auto' });
    }

    function icon(name, extraClass = '') {
      const cls = extraClass ? `ui-icon ${extraClass}` : 'ui-icon';
      return `<i data-lucide="${name}" class="${cls}" aria-hidden="true"></i>`;
    }

    function refreshLucideIcons() {
      if (!window.lucide || typeof window.lucide.createIcons !== 'function') return;
      window.lucide.createIcons();
    }

    function initAmbientParticles() {
      const host = byId('ambientParticles');
      if (!host) return;
      host.innerHTML = '';

      const count = 28;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'ambient-particle';
        p.style.left = `${Math.random() * 100}%`;
        p.style.top = `${70 + Math.random() * 35}%`;
        p.style.setProperty('--drift-x', `${(Math.random() * 80 - 40).toFixed(0)}px`);
        p.style.setProperty('--particle-time', `${(11 + Math.random() * 9).toFixed(2)}s`);
        p.style.animationDelay = `${(-Math.random() * 16).toFixed(2)}s`;
        host.appendChild(p);
      }
    }

    function attachRippleEffect(event) {
      const target = event.target instanceof Element
        ? event.target.closest('.btn, .sidebar-shortcut-btn, .settings-action-btn, .compare-mode-btn, .sb-group, .theme-chip, .altar-toggle-btn')
        : null;

      if (!target) return;
      const rect = target.getBoundingClientRect();
      const ripple = document.createElement('span');
      ripple.className = 'btn-ripple';
      ripple.style.left = `${event.clientX - rect.left}px`;
      ripple.style.top = `${event.clientY - rect.top}px`;
      target.appendChild(ripple);
      window.setTimeout(() => ripple.remove(), 640);
    }

    function ensureAudioContext() {
      try {
        if (!audioCtx) {
          const Ctx = window.AudioContext || window.webkitAudioContext;
          if (!Ctx) return false;
          audioCtx = new Ctx();
        }
        if (audioCtx.state === 'suspended') {
          audioCtx.resume();
        }
        return true;
      } catch (_) {
        return false;
      }
    }

    function playUiSound(kind = 'soft') {
      if (!state.settings.sound) return;
      try {
        if (!ensureAudioContext()) return;
        if (audioCtx.state !== 'running') return;

        const now = audioCtx.currentTime;
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.0001, now);
        gain.gain.exponentialRampToValueAtTime(0.06, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);
        gain.connect(audioCtx.destination);

        const osc = audioCtx.createOscillator();
        const freq = kind === 'reward' ? 740 : kind === 'confirm' ? 520 : 440;
        osc.type = kind === 'reward' ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(freq, now);
        osc.frequency.exponentialRampToValueAtTime(freq * 1.08, now + 0.16);
        osc.connect(gain);
        osc.start(now);
        osc.stop(now + 0.22);
      } catch (_) {}
    }

    function applySettings() {
      state.settings = normalizeSettings(state.settings);
      document.body.dataset.theme = state.settings.theme;

      const disableMotion = !state.settings.animations || prefersReducedMotion();
      document.body.classList.toggle('animations-off', disableMotion);

      if (dom.settingSound) dom.settingSound.checked = !!state.settings.sound;
      if (dom.settingAnimations) dom.settingAnimations.checked = !!state.settings.animations;
      if (dom.themeChips) {
        dom.themeChips.forEach(chip => {
          const active = chip.dataset.theme === state.settings.theme;
          chip.classList.toggle('active', active);
          chip.setAttribute('aria-checked', active ? 'true' : 'false');
        });
      }
    }

    function openSettingsDropdown() {
      if (!dom.settingsDropdown) return;
      dom.settingsDropdown.classList.add('open');
      dom.settingsDropdown.setAttribute('aria-hidden', 'false');
      dom.settingsBtn?.setAttribute('aria-expanded', 'true');
      dom.settingsBackdrop?.classList.add('open');
    }

    function closeSettingsDropdown() {
      if (!dom.settingsDropdown) return;
      dom.settingsDropdown.classList.remove('open');
      dom.settingsDropdown.setAttribute('aria-hidden', 'true');
      dom.settingsBtn?.setAttribute('aria-expanded', 'false');
      dom.settingsBackdrop?.classList.remove('open');
    }

    function toggleSettingsDropdown() {
      const isOpen = dom.settingsDropdown?.classList.contains('open');
      isOpen ? closeSettingsDropdown() : openSettingsDropdown();
    }

    function initSettingsDropdown() {
      if (!dom.settingsDropdown) return;

      if (dom.settingsBtn) {
        dom.settingsBtn.addEventListener('click', (e) => {
          e.stopPropagation();
          toggleSettingsDropdown();
        });
        dom.settingsBackdrop?.addEventListener('click', closeSettingsDropdown);
        dom.settingsDropdown.addEventListener('click', (e) => e.stopPropagation());
      }

      if (dom.restartQuestBtn) {
        dom.restartQuestBtn.addEventListener('click', async () => {
          closeSettingsDropdown();
          await resetProgress();
        });
      }
    }

    /* ─────────────────────────────────────────────
       SPACED REPETITION REVIEW SYSTEM
    ───────────────────────────────────────────── */

    function addDaysToDate(dateStr, days) {
      const d = new Date(`${dateStr}T00:00:00`);
      d.setDate(d.getDate() + days);
      return d.toLocaleDateString('en-CA');
    }

    function getSrsDueCards() {
      const today = getTodayKey();
      return Object.keys(state.srs).filter(id => {
        const entry = state.srs[id];
        return entry.nextReview && entry.nextReview <= today && TarotDeck.getCard(id);
      });
    }

    function getSrsDueCount() {
      return getSrsDueCards().length;
    }

    function initSrsCard(cardId) {
      if (state.srs[cardId]) return;
      state.srs[cardId] = {
        interval: SRS_INITIAL_INTERVAL,
        easeFactor: SRS_INITIAL_EASE,
        nextReview: addDaysToDate(getTodayKey(), 1),
        reviewCount: 0,
        lapses: 0
      };
    }

    function scheduleSrsCard(cardId, rating) {
      const entry = state.srs[cardId];
      if (!entry) return 0;

      // SM-2 ease factor update
      let ef = entry.easeFactor + (0.1 - (4 - rating) * (0.08 + (4 - rating) * 0.02));
      ef = Math.max(SRS_MIN_EASE, ef);

      let interval;
      if (rating <= 1) {
        interval = 1;
        entry.lapses = (entry.lapses || 0) + 1;
      } else if (entry.reviewCount === 0) {
        interval = 1;
      } else if (entry.reviewCount === 1) {
        interval = rating >= 4 ? 6 : 3;
      } else {
        interval = Math.max(1, Math.round(entry.interval * ef));
        if (rating === 4) interval = Math.round(interval * 1.3);
      }

      entry.interval    = interval;
      entry.easeFactor  = ef;
      entry.reviewCount = (entry.reviewCount || 0) + 1;
      entry.nextReview  = addDaysToDate(getTodayKey(), interval);

      const gemMap = { 1: 0, 2: 2, 3: 5, 4: 8 };
      return gemMap[rating] || 0;
    }

    function startReviewSession() {
      const due = getSrsDueCards();
      if (!due.length) return;
      const queue = [...due].sort(() => Math.random() - 0.5);
      state.activeView = 'lesson';
      setRightPanelCollapsed(false, 'system');
      state.reviewSession = { queue, index: 0, revealed: false, results: [] };
      dom.mainContent.innerHTML = renderReviewSession();
      updateHUD();
      scrollToTop();
    }

    function revealReviewCard() {
      if (!state.reviewSession) return;
      state.reviewSession.revealed = true;
      setRightPanelCollapsed(false, 'system');
      dom.mainContent.innerHTML = renderReviewSession();
      scrollToTop();
    }

    function rateReviewCard(rating) {
      if (!state.reviewSession) return;
      const session = state.reviewSession;
      const cardId  = session.queue[session.index];

      const earned = scheduleSrsCard(cardId, rating);
      state.gems += earned;

      session.results.push({ cardId, rating, earned });
      session.index++;

      if (session.index >= session.queue.length) {
        session.done      = true;
        session.totalGems = session.results.reduce((s, r) => s + r.earned, 0);
        if (session.totalGems > 0) playUiSound('reward');
      } else {
        session.revealed = false;
        playUiSound('soft');
      }

      saveProgress();
      setRightPanelCollapsed(false, 'system');
      dom.mainContent.innerHTML = renderReviewSession();
      updateHUD();
      scrollToTop();
    }

    function finishReviewSession() {
      state.reviewSession = null;
      state.phaseIndex    = 0;
      saveProgress();
      renderPhase();
      scrollToTop();
    }

    function renderReviewSession() {
      const session = state.reviewSession;
      if (!session) return '';

      /* ─── Summary screen ─── */
      if (session.done) {
        const total     = session.results.length;
        const goodCount = session.results.filter(r => r.rating >= 3).length;
        const forgot    = session.results.filter(r => r.rating <= 1).length;
        const gems      = session.totalGems;

        const outcomeMsg = forgot > 0
          ? `<p style="color:var(--text-dim);font-size:0.85rem">${forgot} card${forgot !== 1 ? 's' : ''} will return sooner for extra practice.</p>`
          : `<p style="color:#7de8a0;font-size:0.85rem">Perfect recall — all cards advanced in their schedule.</p>`;

        return `
          <div class="card-panel review-session">
            <div class="phase-title">Review Complete</div>
            <div class="review-summary">
              <div class="review-summary-title">Session Complete</div>
              <p style="color:var(--text-dim)">The Oracle records your recall.</p>
              <div class="review-stat-row">
                <div class="review-stat">
                  <span class="review-stat-val">${total}</span>
                  <span class="review-stat-label">Cards Reviewed</span>
                </div>
                <div class="review-stat">
                  <span class="review-stat-val">${goodCount}</span>
                  <span class="review-stat-label">Recalled Well</span>
                </div>
                <div class="review-stat">
                  <span class="review-stat-val">+${gems}</span>
                  <span class="review-stat-label">Gems Earned</span>
                </div>
              </div>
              ${outcomeMsg}
            </div>
            <div class="nav-buttons">
              <button class="btn btn-primary" onclick="finishReviewSession()">Return to Quest</button>
            </div>
          </div>`;
      }

      /* ─── Review card ─── */
      const total  = session.queue.length;
      const index  = session.index;
      const cardId = session.queue[index];
      const card   = TarotDeck.getCard(cardId);
      const entry  = state.srs[cardId] || {};
      const pct    = Math.round((index / total) * 100);

      const progressHtml = `
        <div class="review-progress-bar">
          <span>Card ${index + 1} of ${total}</span>
          <div class="review-progress-track">
            <div class="review-progress-fill" style="width:${pct}%"></div>
          </div>
          <span>${total - index} left</span>
        </div>`;

      const cardFace = `
        <div class="review-card-face">
          <img class="review-card-image" src="${card.image}" alt="${card.name}" loading="lazy">
          <div class="review-card-title">${card.name}</div>
          <div class="review-card-subtitle">${card.suit} · ${card.element}</div>
          ${(entry.reviewCount || 0) > 0 ? `<div style="font-size:0.72rem;color:var(--text-dim)">Review #${entry.reviewCount + 1} · next in ${entry.interval}d after last session</div>` : ''}
        </div>`;

      /* Front of card — before reveal */
      if (!session.revealed) {
        return `
          <div class="card-panel review-session">
            <div class="phase-title">Spaced Review</div>
            ${progressHtml}
            ${cardFace}
            <p style="color:var(--text-dim);font-size:0.88rem;text-align:center">Recall this card's keywords, element, and core meaning before revealing.</p>
            <div class="nav-buttons">
              <button class="btn btn-primary" onclick="revealReviewCard()">Reveal Answer</button>
              <button class="btn btn-secondary" onclick="finishReviewSession()">End Session</button>
            </div>
          </div>`;
      }

      /* Back of card — after reveal */
      const revealHtml = `
        <div class="review-reveal">
          <div class="review-reveal-title">Keywords</div>
          <div class="review-keywords">${card.keywords.map(k => `<span>${k}</span>`).join('')}</div>
          <div class="review-memory-text">${card.memory?.summary || card.archetype || ''}</div>
        </div>`;

      const ratingHtml = `
        <div>
          <p class="rating-prompt">How well did you recall this card?</p>
          <div class="rating-grid">
            <button class="rating-btn" data-rating="1" onclick="rateReviewCard(1)">
              <span style="font-size:1rem">✗</span><span>Forgot</span>
            </button>
            <button class="rating-btn" data-rating="2" onclick="rateReviewCard(2)">
              <span style="font-size:1rem">~</span><span>Hard</span>
            </button>
            <button class="rating-btn" data-rating="3" onclick="rateReviewCard(3)">
              <span style="font-size:1rem">✓</span><span>Good</span>
            </button>
            <button class="rating-btn" data-rating="4" onclick="rateReviewCard(4)">
              <span style="font-size:1rem">★</span><span>Easy</span>
            </button>
          </div>
        </div>`;

      return `
        <div class="card-panel review-session">
          <div class="phase-title">Spaced Review</div>
          ${progressHtml}
          ${cardFace}
          ${revealHtml}
          ${ratingHtml}
        </div>`;
    }

    function getSearchUiElements() {
      const input = dom.mainContent?.querySelector('#searchInput') || null;
      const results = dom.mainContent?.querySelector('#searchResults') || null;
      return { input, results };
    }

    function bindSearchUi() {
      const { input, results } = getSearchUiElements();
      if (!input || !results || input.dataset.boundSearch === 'true') return;

      input.addEventListener('input', (e) => {
        const query = e.target.value.trim().toLowerCase();
        if (query.length < 1) {
          results.hidden = true;
          return;
        }
        performCardSearch(query, results);
      });

      input.dataset.boundSearch = 'true';
    }

    function performCardSearch(query, resultsEl = null) {
      const targetResults = resultsEl || getSearchUiElements().results;
      if (!targetResults) return;

      const allCards = TarotDeck.DECK_ORDER.map(id => TarotDeck.getCard(id)).filter(c => !!c);
      const results = allCards.filter(card => {
        const name = (card.name || '').toLowerCase();
        const suit = (card.suit || '').toLowerCase();
        const keywords = (card.keywords || []).join(' ').toLowerCase();
        return name.includes(query) || suit.includes(query) || keywords.includes(query);
      }).slice(0, 8);

      if (results.length === 0) {
        targetResults.innerHTML = `<div style="padding:0.5rem;color:var(--text-dim);font-size:0.8rem;text-align:center">No cards found</div>`;
        targetResults.hidden = false;
        return;
      }

      targetResults.innerHTML = results.map(card => `
        <article class="search-result-item" role="button" tabindex="0" onclick="goToCardLesson('${card.id}')" onkeydown="if(event.key==='Enter'||event.key===' '){event.preventDefault();goToCardLesson('${card.id}');}">
          <img class="search-result-thumb" src="${card.image}" alt="${card.name}" loading="lazy">
          <div class="search-result-text">
            <div class="search-result-name">${card.name}</div>
            <div class="search-result-suit">${card.suit}</div>
            <div class="search-result-core">${(card.keywords || []).slice(0, 3).join(' • ')}</div>
          </div>
        </article>`).join('');
      targetResults.hidden = false;
    }

    function goToCardLesson(cardId) {
      const card = TarotDeck.getCard(cardId);
      if (!card) return;
      state.compareMode = false;
      state.activeView = 'lesson';
      setRightPanelCollapsed(false, 'system');
      state.currentCard = cardId;
      state.phaseIndex = 0; /* Start at Reveal Card page */
      state.lessonEntryCardId = cardId;
      state.quizAnswers = [];
      state.quizSubmitted = false;
      state.sessionGems = 0;
      state.showingMilestone = false;
      state.revealCardFlipped = false;
      state.revealFlipAnimating = false;
      closeSettingsDropdown();
      const { input, results } = getSearchUiElements();
      if (input) input.value = '';
      if (results) results.hidden = true;
      saveProgress();
      renderPhase();
      scrollToTop();
      playUiSound('soft');
    }

    function initSettingsPanel() {
      if (!dom.themeChips?.length) return;

      dom.themeChips.forEach(chip => {
        chip.addEventListener('click', () => {
          const theme = chip.dataset.theme;
          if (!THEMES.includes(theme)) return;
          state.settings.theme = theme;
          applySettings();
          playUiSound('confirm');
          saveProgress();
        });
      });

    }

    function initSidebarShortcuts() {
      dom.shortcutHomeBtn?.addEventListener('click', () => {
        openHomePortal();
      });

      dom.shortcutLibraryBtn?.addEventListener('click', () => {
        openAlchemyLibrary();
      });

      dom.shortcutChestBtn?.addEventListener('click', () => {
        openChestVault();
      });

      dom.shortcutSearchBtn?.addEventListener('click', () => {
        openSearchPortal();
      });
    }

    function initSidebarGroupButtons() {
      dom.sbGroups?.addEventListener('click', (event) => {
        const button = event.target instanceof Element
          ? event.target.closest('.sb-group[data-group-id]')
          : null;

        if (!button) return;
        jumpToGroup(button.dataset.groupId);
      });
    }

    /* ─── Helpers: groups & milestones ─── */
    function getAchievementService() {
      if (!achievementService) {
        achievementService = new window.AchievementService({
          state,
          groups: GROUPS,
          achievements: ACHIEVEMENTS,
          deck: TarotDeck,
          onUnlock: (achievement, nextState) => {
            enqueueCelebrationPopup({
              title: `Achievement Unlocked: ${achievement.name}`,
              text: achievement.description,
              gemsLabel: achievement.gems > 0
                ? `+${achievement.gems} Gems · Total ${nextState.gems}`
                : `Collected in Alchemy Library · Total ${nextState.gems} Gems`
            });
          }
        });
      }
      return achievementService;
    }

    function getCardGroup(cardId) {
      return getAchievementService().getCardGroup(cardId);
    }

    function groupLearnedCount(groupId) {
      return getAchievementService().groupLearnedCount(groupId);
    }

    function groupIsComplete(groupId) {
      return getAchievementService().groupIsComplete(groupId);
    }

    function checkPendingMilestone() {
      return getAchievementService().checkPendingMilestone();
    }

    function getCompletedGroups() {
      return getAchievementService().getCompletedGroups();
    }

    function isAchievementUnlocked(achievementId) {
      return getAchievementService().isAchievementUnlocked(achievementId);
    }

    function unlockAchievement(achievementId) {
      return getAchievementService().unlockAchievement(achievementId);
    }

    function getAchievementProgress(achievement) {
      return getAchievementService().getAchievementProgress(achievement);
    }

    function evaluateAchievements() {
      return getAchievementService().evaluateAchievements();
    }

    function renderAlchemyLibrary() {
      const allCardsMastered = state.learnedCards.length >= TarotDeck.TOTAL_CARDS;
      return window.LibraryRenderer.render({
        achievements: ACHIEVEMENTS,
        themes: ACHIEVEMENT_THEMES,
        unlockedIds: state.achievementData.unlocked,
        deckComplete: allCardsMastered,
        icon
      });
    }

    function renderAchievementSigilSvg(achievementId) {
      return window.LibraryRenderer.renderAchievementSigilSvg(achievementId);
    }

    function renderHomePortal() {
      return window.HomeRenderer.render();
    }

    function renderSearchPortal() {
      return `
        <section class="card-panel search-portal-panel">
          <div class="alchemy-library-head">
            <div>
              <h2 class="phase-title">Search Cards</h2>
              <p class="alchemy-library-copy">Find any tarot card and jump straight to its lesson.</p>
            </div>
          </div>
          <div style="margin-top: 0.4rem;">
            <input
              type="text"
              id="searchInput"
              class="search-input"
              placeholder="Find a card..."
              autocomplete="off"
              aria-label="Search for cards"
            >
            <div class="search-results" id="searchResults" hidden></div>
          </div>
        </section>`;
    }

    function renderChestVault() {
      return window.ChestRenderer.render({
        state,
        deck: TarotDeck,
        icon,
        getRank,
        getSrsDueCount
      });
    }

    function renderTreasureGemSvg(type, index) {
      return window.ChestRenderer.renderTreasureGemSvg(type, index);
    }

    function triggerTreasureGemFlash(event, el) {
      return window.ChestRenderer.triggerGemFlash(event, el);
    }

    function startQuestFromHome() {
      state.compareMode = false;
      state.activeView = 'lesson';
      setRightPanelCollapsed(false, 'system');
      state.isFirstVisit = false;
      state.currentCard = getContinueCardId();
      state.lastViewKey = `${state.currentCard}:0`;
      startLesson();
      scrollToTop();
      playUiSound('soft');
    }

    function openHomePortal() {
      state.compareMode = false;
      state.activeView = 'home';
      state.panelReturnView = 'home';
      closeSettingsDropdown();
      renderPhase();
      playSeekerIntro(true);
      scrollToTop();
      playUiSound('soft');
    }

    function playSeekerIntro(force = false) {
      const intro = byId('seekerIntro');
      if (!intro || !state.settings.animations) return;
      if (intro.dataset.played === '1' && !force) return;

      intro.dataset.played = '1';
      intro.classList.remove('closing', 'open', 'holding');
      // Restart CSS animation timeline
      void intro.offsetWidth;
      intro.classList.add('open');

      window.setTimeout(() => {
        intro.classList.add('holding');
      }, 80);

      window.setTimeout(() => {
        intro.classList.remove('holding');
        intro.classList.add('closing');
      }, 430);

      window.setTimeout(() => {
        intro.classList.remove('open', 'closing', 'holding');
      }, 900);
    }

    function openAlchemyLibrary() {
      state.compareMode = false;
      state.panelReturnView = state.activeView || 'home';
      state.activeView = 'library';
      closeSettingsDropdown();
      renderPhase();
      scrollToTop();
      playUiSound('soft');
    }

    function closeAlchemyLibrary() {
      state.activeView = state.panelReturnView || 'home';
      state.panelReturnView = 'home';
      renderPhase();
      scrollToTop();
      playUiSound('soft');
    }

    function handleDownloadFullDeckCertificate() {
      const allCardsMastered = state.learnedCards.length >= TarotDeck.TOTAL_CARDS;
      
      if (!allCardsMastered) {
        showAlert({
          icon: 'book-open',
          title: 'Seeker',
          message: 'Dear seeker, this is available after you master all the cards.',
          primaryText: 'Continue'
        });
        return;
      }

      // Show modal to ask for user's name
      showPrompt({
        icon: 'sparkles',
        title: 'Your Mastery Certificate',
        message: 'Enter your name to receive your certificate of mastery:',
        inputPlaceholder: 'Your name...',
        primaryText: 'Download Certificate',
        cancelText: 'Cancel'
      }).then(userName => {
        if (userName === null || userName === '' || userName.trim() === '') {
          return; // User cancelled or entered nothing
        }
        generateFullDeckCertificate(userName.trim());
      });
    }

    function generateFullDeckCertificate(userName) {
      const canvas = document.createElement('canvas');
      const w = 800, h = 560;
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext('2d');
      
      // Parchment background
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#f5e6d3');
      grad.addColorStop(0.5, '#ede5d6');
      grad.addColorStop(1, '#e8dac8');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
      
      // Decorative border
      ctx.strokeStyle = '#8b6f47';
      ctx.lineWidth = 3;
      ctx.strokeRect(20, 20, w - 40, h - 40);
      ctx.lineWidth = 1;
      ctx.strokeRect(30, 30, w - 60, h - 60);
      
      // Corner ornaments
      drawOrnament(ctx, 50, 50);
      drawOrnament(ctx, w - 50, 50);
      drawOrnament(ctx, 50, h - 50);
      drawOrnament(ctx, w - 50, h - 50);
      
      // Title
      ctx.font = 'bold 32px Cinzel, serif';
      ctx.fillStyle = '#8b6f47';
      ctx.textAlign = 'center';
      ctx.fillText('Certificate of Mastery', w / 2, 90);
      
      // User name
      ctx.font = 'italic 28px Cinzel, serif';
      ctx.fillStyle = '#5a4a3a';
      ctx.fillText(userName, w / 2, 160);
      
      // Achievement text
      ctx.font = '16px Georgia, serif';
      ctx.fillStyle = '#4a3a2a';
      ctx.textAlign = 'center';
      ctx.fillText('This certifies that the seeker has mastered', w / 2, 230);
      ctx.fillText('all 78 cards in the Tarot Quest journey.', w / 2, 260);
      
      // Rank
      ctx.font = 'bold 18px Cinzel, serif';
      ctx.fillStyle = '#9a6ad9';
      ctx.fillText(`Rank: ${state.rank}`, w / 2, 320);
      
      // Gems earned
      ctx.font = '14px Georgia, serif';
      ctx.fillStyle = '#4a3a2a';
      ctx.fillText(`Gems Earned: ${state.gems}`, w / 2, 360);
      
      // Date
      ctx.font = '14px Georgia, serif';
      ctx.fillStyle = '#4a3a2a';
      const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      ctx.fillText(`Date: ${today}`, w / 2, 400);
      
      // Signature line
      ctx.strokeStyle = '#8b6f47';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(w / 2 - 80, 450);
      ctx.lineTo(w / 2 + 80, 450);
      ctx.stroke();
      ctx.font = '12px Georgia, serif';
      ctx.fillText('The Alchemy Cottage', w / 2, 480);
      
      // Download
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `Tarot_Mastery_Certificate_${userName.replace(/\s+/g, '_')}.png`;
      link.click();
      
      // Show success message
      enqueueCelebrationPopup({
        title: 'Certificate Downloaded!',
        text: `Congratulations, ${userName}! Your certificate of mastery has been saved.`,
        gemsLabel: `Total: ${state.gems} Gems · Rank: ${state.rank}`
      });
    }

    function drawOrnament(ctx, x, y) {
      ctx.fillStyle = '#d4af37';
      ctx.beginPath();
      ctx.arc(x, y, 8, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f5deb3';
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    }

    function openChestVault() {
      state.compareMode = false;
      state.panelReturnView = state.activeView || 'home';
      state.activeView = 'chest';
      closeSettingsDropdown();
      renderPhase();
      scrollToTop();
      playUiSound('soft');
    }

    function closeChestVault() {
      state.activeView = state.panelReturnView || 'home';
      state.panelReturnView = 'home';
      renderPhase();
      scrollToTop();
      playUiSound('soft');
    }

    function openSearchPortal() {
      state.compareMode = false;
      state.panelReturnView = state.activeView || 'home';
      state.activeView = 'search';
      closeSettingsDropdown();
      renderPhase();
      scrollToTop();
      playUiSound('soft');
    }

    function exposeGlobalActions() {
      Object.assign(window, {
        closeCompletionPopup,
        closeWelcomeOverlay,
        finishLesson,
        finishReviewSession,
        goToCardLesson,
        goToMilestone,
        goToResults,
        handleDownloadFullDeckCertificate,
        jumpToGroup,
        nextPhase,
        openCardFromRevealPage,
        prevPhase,
        rateReviewCard,
        resetCompareSelection,
        resetProgress,
        reviewLastCard,
        revealReviewCard,
        selectAnswer,
        showGrandmasterEnding,
        startNextCard,
        startQuestFromHome,
        startReviewSession,
        submitQuiz,
        toggleCompareMode,
        triggerTreasureGemFlash
      });
    }

    function syncProgressState() {
      state.rank = getRank(state.gems);
      state.completedGroups = getCompletedGroups();
      state.navPosition = cardPosition(state.currentCard);
      state.masteredStatus = {
        deck: isDeckComplete(),
        currentCard: state.learnedCards.includes(state.currentCard)
      };
    }

    function applyRightPanelState() {
      const collapsed = !!state.rightPanelCollapsed;
      document.body.classList.toggle('right-panel-collapsed', collapsed);
      dom.cardAltar?.classList.toggle('collapsed', collapsed);
    }

    function setRightPanelCollapsed(collapsed) {
      state.rightPanelCollapsed = !!collapsed;
      applyRightPanelState();
    }

    function getGroupCardIds(groupId) {
      return TarotDeck.DECK_ORDER.filter(id => getCardGroup(id) === groupId);
    }

    function getGroupJumpCardId(groupId) {
      const cardsInGroup = getGroupCardIds(groupId);
      if (!cardsInGroup.length) return state.currentCard;
      const unlearned = cardsInGroup.find(id => !state.learnedCards.includes(id));
      return unlearned || cardsInGroup[0];
    }

    function getTodayKey() {
      return new Date().toLocaleDateString('en-CA');
    }

    function dayDiff(a, b) {
      if (!a || !b) return 0;
      const d1 = new Date(`${a}T00:00:00`);
      const d2 = new Date(`${b}T00:00:00`);
      return Math.round((d2 - d1) / 86400000);
    }

    function getDailyBlessing(todayKey) {
      const seed = (todayKey || '').split('-').join('');
      const n = Number(seed) || 0;
      return DAILY_BLESSINGS[n % DAILY_BLESSINGS.length];
    }

    function markCompletionDate(dateKey) {
      if (!dateKey) return;
      const dates = new Set(state.daily.completedDates || []);
      dates.add(dateKey);
      state.daily.completedDates = Array.from(dates).sort().slice(-180);
    }

    function checkDailyStreakMilestone() {
      for (const milestone of STREAK_MILESTONES) {
        if (state.daily.streak >= milestone.days && !state.daily.claimedMilestones.includes(milestone.days)) {
          state.daily.claimedMilestones.push(milestone.days);
          state.gems += milestone.gems;
          enqueueCelebrationPopup({
            title: `Mystic Streak ${milestone.days} Days!`,
            text: `Title unlocked: ${milestone.title}. The cards honor your daily devotion.`,
            gemsLabel: `+${milestone.gems} Gems · Total ${state.gems}`
          });
        }
      }

      evaluateAchievements();
    }

    function processDailyLogin() {
      const today = getTodayKey();
      state.daily.todayBlessing = getDailyBlessing(today);

      if (!state.daily.lastLoginDate) {
        state.daily.lastLoginDate = today;
        state.daily.pendingLoginReward = DAILY_LOGIN_GEMS;
        state.gems += DAILY_LOGIN_GEMS;
        state.daily.showWelcomeBack = true;
        state.daily.welcomeMessage = 'Your first blessing has arrived. The cottage lights are warm for your journey.';
        return;
      }

      const delta = dayDiff(state.daily.lastLoginDate, today);
      if (delta <= 0) {
        state.daily.pendingLoginReward = 0;
        state.daily.showWelcomeBack = false;
        return;
      }

      if (delta > 1) {
        state.daily.streak = 0;
        state.daily.lastIncrementDate = null;
        state.daily.welcomeMessage = 'A day was missed, so your Mystic Streak has reset. Begin a new chain of insight today.';
      } else {
        state.daily.welcomeMessage = 'Welcome back, Seeker. Your Mystic Streak still burns bright.';
      }

      state.daily.pendingLoginReward = DAILY_LOGIN_GEMS;
      state.gems += DAILY_LOGIN_GEMS;
      state.daily.lastLoginDate = today;
      state.daily.showWelcomeBack = true;
    }

    function registerDailyCardCompletion() {
      const today = getTodayKey();
      markCompletionDate(today);
      state.daily.lastCompletionDate = today;

      if (state.daily.lastIncrementDate === today) {
        return;
      }

      if (!state.daily.lastIncrementDate) {
        state.daily.streak = 1;
      } else {
        const delta = dayDiff(state.daily.lastIncrementDate, today);
        if (delta > 1) {
          state.daily.streak = 1;
        } else if (delta === 1) {
          state.daily.streak += 1;
        }
      }

      state.daily.lastIncrementDate = today;
      checkDailyStreakMilestone();
    }

    /* ─── Persistence ─── */
    function loadProgress() {
      try {
        const data = storageService.getJSON(STORAGE_KEY);
        if (data) {
          state.gems = Number(data.gems ?? 0) || 0;
          state.learnedCards = Array.isArray(data.completedCards)
            ? data.completedCards.filter(id => !!TarotDeck.getCard(id))
            : Array.isArray(data.learnedCards)
              ? data.learnedCards.filter(id => !!TarotDeck.getCard(id))
              : [];
          state.shownMilestones = Array.isArray(data.shownMilestones) ? data.shownMilestones : [];
          state.completedGroups = Array.isArray(data.completedGroups) ? data.completedGroups : [];
          state.rank = typeof data.rank === 'string' ? data.rank : RANKS[0].title;
          state.masteredStatus = data.masteredStatus && typeof data.masteredStatus === 'object'
            ? data.masteredStatus
            : { deck: false, currentCard: false };
          state.quizAnswers = Array.isArray(data.quizAnswers) ? data.quizAnswers : [];
          state.quizSubmitted = !!data.quizSubmitted;
          state.showingMilestone = !!data.showingMilestone;
          state.lastReviewedCard = (data.lastReviewedCard && TarotDeck.getCard(data.lastReviewedCard))
            ? data.lastReviewedCard
            : null;

          if (data.daily && typeof data.daily === 'object') {
            state.daily.streak = Number(data.daily.streak || 0);
            state.daily.lastLoginDate = data.daily.lastLoginDate || null;
            state.daily.lastIncrementDate = data.daily.lastIncrementDate || null;
            state.daily.lastCompletionDate = data.daily.lastCompletionDate || null;
            state.daily.completedDates = Array.isArray(data.daily.completedDates) ? data.daily.completedDates : [];
            state.daily.claimedMilestones = Array.isArray(data.daily.claimedMilestones) ? data.daily.claimedMilestones : [];
            state.daily.todayBlessing = data.daily.todayBlessing || DAILY_BLESSINGS[0];
          }

          state.settings = normalizeSettings(data.settings);

          state.rightPanelCollapsed = !!data.rightPanelCollapsed;
          state.compareMode = false;
          state.compareLeftCardId = null;
          state.compareRightCardId = null;
          state.activeView = 'home';
          state.panelReturnView = 'home';

          if (data.achievementData && typeof data.achievementData === 'object') {
            state.achievementData.unlocked = Array.isArray(data.achievementData.unlocked)
              ? data.achievementData.unlocked.filter(id => ACHIEVEMENTS.some(a => a.id === id))
              : [];
            state.achievementData.perfectQuizWins = Number(data.achievementData.perfectQuizWins || 0);
            state.achievementData.masteredThisSession = Number(data.achievementData.masteredThisSession || 0);
            state.achievementData.bestSessionMastered = Number(data.achievementData.bestSessionMastered || 0);
          }

          if (data.srs && typeof data.srs === 'object') {
            state.srs = data.srs;
          }

          state.isFirstVisit = data.isFirstVisit !== undefined ? data.isFirstVisit : true;

          if (data.currentCard && TarotDeck.getCard(data.currentCard)) {
            state.currentCard = data.currentCard;
          }

          if (Number.isInteger(data.currentNavigationPosition)) {
            state.navPosition = Math.max(1, Math.min(TarotDeck.TOTAL_CARDS, data.currentNavigationPosition));
            if (!data.currentCard) {
              state.currentCard = TarotDeck.DECK_ORDER[state.navPosition - 1] || state.currentCard;
            }
          }

          if (Number.isInteger(data.phaseIndex)) {
            state.phaseIndex = Math.max(0, Math.min(PHASES.length - 1, data.phaseIndex));
          }
        }
        processDailyLogin();
        evaluateAchievements();
        syncProgressState();
      } catch (_) {}
    }

    function saveProgress() {
      syncProgressState();
      storageService.setJSON(STORAGE_KEY, {
        version: 4,
        currentCard: state.currentCard,
        phaseIndex: state.phaseIndex,
        currentPhase: PHASES[state.phaseIndex]?.id || PHASES[0].id,
        completedCards: state.learnedCards,
        completedGroups: state.completedGroups,
        gems: state.gems,
        rank: state.rank,
        masteredStatus: state.masteredStatus,
        lastReviewedCard: state.lastReviewedCard,
        currentNavigationPosition: state.navPosition,
        quizAnswers: state.quizAnswers,
        quizSubmitted: state.quizSubmitted,
        showingMilestone: state.showingMilestone,
        daily: state.daily,
        settings: state.settings,
        srs: state.srs,
        rightPanelCollapsed: state.rightPanelCollapsed,
        compareMode: state.compareMode,
        compareLeftCardId: state.compareLeftCardId,
        compareRightCardId: state.compareRightCardId,
        activeView: state.activeView,
        panelReturnView: state.panelReturnView,
        achievementData: state.achievementData,

        learnedCards: state.learnedCards,
        shownMilestones: state.shownMilestones,
        isFirstVisit: state.isFirstVisit
      });
    }

    function getCardGemReward(card) {
      if (typeof card.gemReward === 'number') return card.gemReward;
      if ((card.suit || '').includes('Major Arcana')) return 120;
      return 100;
    }

    function getTransitionTheme(card) {
      if (!card) return 'air';

      const elementSource = `${card.element || ''} ${card.secondary || ''}`.toLowerCase();
      if (elementSource.includes('fire')) return 'fire';
      if (elementSource.includes('water')) return 'water';
      if (elementSource.includes('air')) return 'air';
      if (elementSource.includes('earth')) return 'earth';

      const suitSource = (card.suit || '').toLowerCase();
      if (suitSource.includes('wands')) return 'fire';
      if (suitSource.includes('cups')) return 'water';
      if (suitSource.includes('swords')) return 'air';
      if (suitSource.includes('pentacles')) return 'earth';

      return 'air';
    }

    function rand(min, max) {
      return Math.random() * (max - min) + min;
    }

    function clearChildren(node) {
      if (!node) return;
      while (node.firstChild) node.removeChild(node.firstChild);
    }

    function getModalFocusableEls() {
      if (!dom.magicModal) return [];
      return Array.from(dom.magicModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'))
        .filter(el => !el.disabled && el.offsetParent !== null);
    }

    function spawnModalSparkles() {
      if (!state.settings.animations || !dom.magicModalFx) return;
      clearChildren(dom.magicModalFx);
      for (let i = 0; i < 18; i++) {
        const spark = document.createElement('span');
        spark.className = 'magic-modal-spark';
        spark.style.left = `${rand(8, 92)}%`;
        spark.style.top = `${rand(10, 88)}%`;
        spark.style.setProperty('--dx', `${rand(-55, 55)}px`);
        spark.style.setProperty('--dy', `${rand(-55, 55)}px`);
        dom.magicModalFx.appendChild(spark);
      }
    }

    function normalizeModalConfig(config) {
      const base = {
        type: 'info',
        icon: 'sparkles',
        title: 'Tarot Quest',
        message: '',
        primaryText: 'Continue',
        cancelText: 'Cancel',
        inputPlaceholder: '',
        inputValue: '',
        allowEscape: true,
        allowOverlayClose: true
      };
      return { ...base, ...(config || {}) };
    }

    function enqueueModal(config) {
      return new Promise(resolve => {
        modalState.queue.push({ config: normalizeModalConfig(config), resolve });
        if (!modalState.open) openNextModal();
      });
    }

    function openNextModal() {
      if (modalState.open || !modalState.queue.length) return;
      const next = modalState.queue.shift();
      modalState.open = true;
      state.modalOpen = true;
      modalState.active = next.config;
      modalState.resolver = next.resolve;
      modalState.triggerEl = document.activeElement instanceof HTMLElement ? document.activeElement : null;

      const cfg = modalState.active;
      const isPrompt = cfg.type === 'prompt';
      const isInfo = cfg.type === 'info';

      dom.magicModalDialog?.classList.remove('jump-modal');
      dom.magicModalIcon.classList.remove('crystal-ball-icon');
      if (cfg.variant === 'jump') {
        dom.magicModalDialog?.classList.add('jump-modal');
        dom.magicModalIcon.classList.add('crystal-ball-icon');
        dom.magicModalIcon.innerHTML = '<span class="crystal-orb"></span><span class="crystal-stand"></span>';
      } else {
        dom.magicModalIcon.innerHTML = icon(cfg.icon || 'sparkles');
      }
      dom.magicModalTitle.textContent = cfg.title || 'Tarot Quest';
      dom.magicModalMessage.textContent = cfg.message || '';
      dom.magicModalPrimary.textContent = cfg.primaryText || (isInfo ? 'Continue' : 'Confirm');
      dom.magicModalCancel.textContent = cfg.cancelText || 'Cancel';

      dom.magicModalCancel.hidden = isInfo;
      dom.magicModalInput.hidden = !isPrompt;
      if (isPrompt) {
        dom.magicModalInput.value = cfg.inputValue || '';
        dom.magicModalInput.placeholder = cfg.inputPlaceholder || '';
      }

      spawnModalSparkles();
      refreshLucideIcons();
      dom.magicModal.classList.remove('closing');
      dom.magicModal.classList.add('open');
      dom.magicModal.setAttribute('aria-hidden', 'false');
      document.body.classList.add('modal-open');

      const closeWith = (value) => closeModal(value);

      dom.magicModalPrimary.onclick = () => {
        if (cfg.type === 'confirm') return closeWith(true);
        if (cfg.type === 'prompt') return closeWith(dom.magicModalInput.value);
        return closeWith(undefined);
      };

      dom.magicModalCancel.onclick = () => closeWith(cfg.type === 'prompt' ? null : false);

      modalState.clickHandler = (event) => {
        const overlayClick = event.target && event.target.getAttribute && event.target.getAttribute('data-modal-close') === 'overlay';
        if (overlayClick && cfg.allowOverlayClose) {
          closeWith(cfg.type === 'prompt' ? null : (cfg.type === 'confirm' ? false : undefined));
        }
      };
      dom.magicModal.addEventListener('click', modalState.clickHandler);

      modalState.keyHandler = (event) => {
        if (!modalState.open) return;

        if (event.key === 'Escape' && cfg.allowEscape) {
          event.preventDefault();
          closeWith(cfg.type === 'prompt' ? null : (cfg.type === 'confirm' ? false : undefined));
          return;
        }

        if (event.key === 'Enter') {
          if (cfg.type === 'prompt' && event.target === dom.magicModalCancel) return;
          if (cfg.type === 'confirm' && event.target === dom.magicModalCancel) return;
          event.preventDefault();
          dom.magicModalPrimary.click();
          return;
        }

        if (event.key === 'Tab') {
          modalState.focusEls = getModalFocusableEls();
          if (!modalState.focusEls.length) return;
          const first = modalState.focusEls[0];
          const last = modalState.focusEls[modalState.focusEls.length - 1];
          const active = document.activeElement;
          if (event.shiftKey && active === first) {
            event.preventDefault();
            last.focus();
          } else if (!event.shiftKey && active === last) {
            event.preventDefault();
            first.focus();
          }
        }
      };

      document.addEventListener('keydown', modalState.keyHandler);

      window.setTimeout(() => {
        if (isPrompt) {
          dom.magicModalInput.focus();
          dom.magicModalInput.select();
        } else {
          dom.magicModalPrimary.focus();
        }
      }, 0);

      playUiSound('confirm');
    }

    function closeModal(value) {
      if (!modalState.open) return;

      const resolve = modalState.resolver;
      modalState.resolver = null;

      dom.magicModal.classList.add('closing');
      const end = () => {
        dom.magicModal.classList.remove('open', 'closing');
        dom.magicModal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('modal-open');
        clearChildren(dom.magicModalFx);
        dom.magicModalDialog?.classList.remove('jump-modal');
        dom.magicModalIcon.classList.remove('crystal-ball-icon');

        if (modalState.keyHandler) {
          document.removeEventListener('keydown', modalState.keyHandler);
          modalState.keyHandler = null;
        }
        if (modalState.clickHandler) {
          dom.magicModal.removeEventListener('click', modalState.clickHandler);
          modalState.clickHandler = null;
        }

        modalState.open = false;
        state.modalOpen = false;
        modalState.active = null;

        if (modalState.triggerEl && document.contains(modalState.triggerEl)) {
          modalState.triggerEl.focus();
        }
        modalState.triggerEl = null;

        if (typeof resolve === 'function') resolve(value);
        openNextModal();
      };

      if (state.settings.animations) {
        window.setTimeout(end, 180);
      } else {
        end();
      }
    }

    function showAlert(opts) {
      if (typeof opts === 'string') {
        return enqueueModal({ type: 'info', message: opts });
      }
      return enqueueModal({ type: 'info', ...(opts || {}) });
    }

    function showConfirm(opts) {
      if (typeof opts === 'string') {
        return enqueueModal({ type: 'confirm', message: opts, primaryText: 'Confirm', cancelText: 'Cancel' });
      }
      return enqueueModal({ type: 'confirm', primaryText: 'Confirm', cancelText: 'Cancel', ...(opts || {}) });
    }

    function showPrompt(opts) {
      if (typeof opts === 'string') {
        return enqueueModal({ type: 'prompt', message: opts, primaryText: 'Submit', cancelText: 'Cancel' });
      }
      return enqueueModal({ type: 'prompt', primaryText: 'Submit', cancelText: 'Cancel', ...(opts || {}) });
    }

    function playElementTransition(card) {
      if (!state.settings.animations) return;
      const layer = dom.fxLayer;
      if (!layer) return;

      const theme = getTransitionTheme(card);
      layer.className = `fx-layer active fx-${theme}`;
      clearChildren(layer);

      const sweep = document.createElement('div');
      sweep.className = 'fx-sweep';
      layer.appendChild(sweep);

      const count = 18;
      for (let i = 0; i < count; i++) {
        const p = document.createElement('span');
        p.className = 'fx-particle';
        p.style.left = `${rand(4, 96)}%`;
        p.style.top = `${rand(8, 92)}%`;
        p.style.setProperty('--dx', `${rand(-140, 140)}px`);
        p.style.setProperty('--dy', `${rand(-110, 110)}px`);

        if (theme === 'fire') {
          const size = rand(4, 10);
          p.style.width = `${size}px`;
          p.style.height = `${size}px`;
          p.style.background = `radial-gradient(circle, rgba(255,226,133,0.95), rgba(255,103,61,0.65))`;
          p.style.boxShadow = '0 0 14px rgba(255,114,66,0.6)';
        } else if (theme === 'water') {
          const size = rand(8, 18);
          p.style.width = `${size}px`;
          p.style.height = `${size}px`;
          p.style.border = '1px solid rgba(177,232,255,0.65)';
          p.style.background = 'rgba(139,214,255,0.18)';
          p.style.backdropFilter = 'blur(1px)';
        } else if (theme === 'air') {
          p.style.width = `${rand(10, 18)}px`;
          p.style.height = `${rand(3, 6)}px`;
          p.style.borderRadius = '999px';
          p.style.background = 'linear-gradient(90deg, rgba(240,253,255,0.9), rgba(154,214,240,0.4))';
          p.style.transform = `rotate(${rand(-25, 25)}deg)`;
        } else if (theme === 'earth') {
          if (Math.random() > 0.62) {
            p.style.width = `${rand(2, 4)}px`;
            p.style.height = `${rand(14, 28)}px`;
            p.style.borderRadius = '999px';
            p.style.background = 'linear-gradient(180deg, rgba(138,186,114,0.9), rgba(75,116,57,0.7))';
          } else {
            p.style.width = `${rand(6, 14)}px`;
            p.style.height = `${rand(6, 14)}px`;
            p.style.borderRadius = `${rand(20, 55)}%`;
            p.style.background = Math.random() > 0.45
              ? 'linear-gradient(160deg, rgba(163,206,121,0.8), rgba(86,129,63,0.7))'
              : 'linear-gradient(160deg, rgba(158,141,117,0.8), rgba(98,82,63,0.75))';
          }
        } else {
          const size = rand(3, 8);
          p.style.width = `${size}px`;
          p.style.height = `${size}px`;
          p.style.background = 'radial-gradient(circle, rgba(255,242,201,0.95), rgba(177,126,255,0.5))';
          p.style.boxShadow = '0 0 16px rgba(184,133,255,0.55)';
        }

        layer.appendChild(p);
      }

      window.clearTimeout(playElementTransition._t);
      playElementTransition._t = window.setTimeout(() => {
        layer.className = 'fx-layer';
        clearChildren(layer);
      }, 900);
    }

    function spawnPopupEffects() {
      if (!state.settings.animations) return;
      const fx = dom.popupFx;
      if (!fx) return;
      clearChildren(fx);

      for (let i = 0; i < 24; i++) {
        const spark = document.createElement('span');
        spark.className = 'popup-sparkle';
        spark.style.left = `${rand(8, 92)}%`;
        spark.style.top = `${rand(8, 75)}%`;
        spark.style.setProperty('--dx', `${rand(-70, 70)}px`);
        spark.style.setProperty('--dy', `${rand(-90, 40)}px`);
        spark.style.setProperty('--rot', `${rand(-160, 160)}deg`);
        fx.appendChild(spark);
      }

      for (let i = 0; i < 18; i++) {
        const conf = document.createElement('span');
        conf.className = 'popup-confetti';
        conf.style.left = `${rand(10, 90)}%`;
        conf.style.top = `${rand(6, 40)}%`;
        conf.style.setProperty('--dx', `${rand(-110, 110)}px`);
        conf.style.setProperty('--dy', `${rand(35, 145)}px`);
        conf.style.setProperty('--rot', `${rand(-240, 240)}deg`);
        fx.appendChild(conf);
      }
    }

    function openCelebrationPopup(payload) {
      const popup = dom.completionPopup;
      if (!popup) return;

      dom.completionTitle.textContent = payload.title;
      dom.completionText.textContent = payload.text;
      dom.completionGems.textContent = payload.gemsLabel;

      spawnPopupEffects();
      popup.classList.add('open');
      popup.setAttribute('aria-hidden', 'false');
      state.popupOpen = true;
      playUiSound('reward');
    }

    function enqueueCelebrationPopup(payload) {
      state.popupQueue.push(payload);
      if (!state.popupOpen) {
        const next = state.popupQueue.shift();
        if (next) openCelebrationPopup(next);
      }
    }

    function showCompletionPopup(card, earnedGems) {
      enqueueCelebrationPopup({
        title: `${card.name} Mastered!`,
        text: 'The Oracle celebrates your insight. You mastered another card in your quest.',
        gemsLabel: `+${earnedGems} Gems · Total ${state.gems}`
      });
    }

    function closeCompletionPopup() {
      const popup = dom.completionPopup;
      if (!popup) return;
      popup.classList.remove('open');
      popup.setAttribute('aria-hidden', 'true');
      clearChildren(dom.popupFx);
      state.popupOpen = false;

      const next = state.popupQueue.shift();
      if (next) {
        openCelebrationPopup(next);
      }
    }

    /* ─── Deck helpers ─── */
    function getRank(gems) {
      let rank = RANKS[0].title;
      for (const r of RANKS) { if (gems >= r.min) rank = r.title; }
      return rank;
    }

    function getCard() { return TarotDeck.getCard(state.currentCard); }

    function getNextCardId() { return TarotDeck.getNextCardId(state.currentCard); }

    function getContinueCardId() { return TarotDeck.getContinueCardId(state.learnedCards); }

    function ensureCompareSelectionDefaults() {
      if (state.compareLeftCardId && !TarotDeck.getCard(state.compareLeftCardId)) {
        state.compareLeftCardId = null;
      }

      if (state.compareRightCardId && !TarotDeck.getCard(state.compareRightCardId)) {
        state.compareRightCardId = null;
      }

      if (state.compareLeftCardId && state.compareRightCardId && state.compareLeftCardId === state.compareRightCardId) {
        state.compareRightCardId = null;
      }
    }

    function renderCompareSidebar() {
      if (!dom.compareModeBtn) return;

      ensureCompareSelectionDefaults();

      const active = !!state.compareMode;
      dom.compareModeBtn.innerHTML = '<span class="icon-inline"><i data-lucide="split-square-horizontal" class="ui-icon"></i><span>Compare Cards</span></span>';
      dom.compareModeBtn.classList.toggle('active', active);
      dom.compareModeBtn.setAttribute('aria-pressed', String(active));
      refreshLucideIcons();
    }

    function toggleCompareMode() {
      const willOpen = !state.compareMode;
      state.compareMode = willOpen;
      if (willOpen) {
        state.compareLeftCardId = null;
        state.compareRightCardId = null;
      }
      ensureCompareSelectionDefaults();
      renderPhase();
      saveProgress();
      playUiSound('soft');
    }

    function renderCompareCenter() {
      ensureCompareSelectionDefaults();

      const optionsAHtml = TarotDeck.DECK_ORDER
        .filter(id => !!TarotDeck.getCard(id))
        .map(id => {
          const card = TarotDeck.getCard(id);
          const selected = id === state.compareLeftCardId ? ' selected' : '';
          return `<option value="${id}"${selected}>${card.name}</option>`;
        }).join('');

      const optionsBHtml = TarotDeck.DECK_ORDER
        .filter(id => !!TarotDeck.getCard(id))
        .map(id => {
          const card = TarotDeck.getCard(id);
          const selected = id === state.compareRightCardId ? ' selected' : '';
          return `<option value="${id}"${selected}>${card.name}</option>`;
        }).join('');

      const placeholderA = `<option value=""${state.compareLeftCardId ? '' : ' selected'}>Choose Card A...</option>`;
      const placeholderB = `<option value=""${state.compareRightCardId ? '' : ' selected'}>Choose Card B...</option>`;

      let html = `
        <div class="card-panel compare-shell">
          <div class="compare-header-bar">
            <div class="phase-title">Card Comparison</div>
          </div>
          <div id="compareCenterOutput"></div>`;

      const cardA = TarotDeck.getCard(state.compareLeftCardId);
      const cardB = TarotDeck.getCard(state.compareRightCardId);

      const cardPickerA = `
        <div class="compare-card-picker">
          <label for="compareCenterCardA">Choose Card A</label>
          <select id="compareCenterCardA" onchange="setCompareCard('a', this.value)">${placeholderA}${optionsAHtml}</select>
        </div>`;

      const cardPickerB = `
        <div class="compare-card-picker">
          <label for="compareCenterCardB">Choose Card B</label>
          <select id="compareCenterCardB" onchange="setCompareCard('b', this.value)">${placeholderB}${optionsBHtml}</select>
        </div>`;

      if (!cardA || !cardB) {
        html += `
          <div class="compare-display-area">
            <div class="compare-images">
              <article class="compare-card">
                ${cardPickerA}
                <img src="${cardA ? cardA.image : TAROT_CARD_BACK_IMAGE}" alt="${cardA ? cardA.name : 'card back'}" loading="lazy">
                <div class="compare-card-name">${cardA ? cardA.name : ''}</div>
              </article>
              <article class="compare-card">
                ${cardPickerB}
                <img src="${cardB ? cardB.image : TAROT_CARD_BACK_IMAGE}" alt="${cardB ? cardB.name : 'card back'}" loading="lazy">
                <div class="compare-card-name">${cardB ? cardB.name : ''}</div>
              </article>
            </div>
            <div class="nav-buttons compare-reset-wrap">
              <button class="btn btn-secondary" onclick="resetCompareSelection()">Reset Pair</button>
            </div>
          </div>
        </div>`;
        return html;
      }

      const keywordsA = Array.isArray(cardA.keywords) ? cardA.keywords : [];
      const keywordsB = Array.isArray(cardB.keywords) ? cardB.keywords : [];
      const uniqueA = keywordsA.filter(k => !keywordsB.includes(k));
      const uniqueB = keywordsB.filter(k => !keywordsA.includes(k));
      const shared = keywordsA.filter(k => keywordsB.includes(k));

      const uniqueAHtml = uniqueA.length ? uniqueA.map(k => `<div>${k}</div>`).join('') : '<div>No unique keywords</div>';
      const uniqueBHtml = uniqueB.length ? uniqueB.map(k => `<div>${k}</div>`).join('') : '<div>No unique keywords</div>';
      const sharedHtml = shared.length ? `Shared: ${shared.join(', ')}` : 'Shared: No direct keyword overlap';

      html += `
          <div class="compare-display-area">
            <div class="compare-images">
              <article class="compare-card">
                ${cardPickerA}
                <img src="${cardA.image}" alt="${cardA.name}" loading="lazy">
                <div class="compare-card-name">${cardA.name}</div>
              </article>
              <article class="compare-card">
                ${cardPickerB}
                <img src="${cardB.image}" alt="${cardB.name}" loading="lazy">
                <div class="compare-card-name">${cardB.name}</div>
              </article>
            </div>
            <div class="nav-buttons compare-reset-wrap">
              <button class="btn btn-secondary" onclick="resetCompareSelection()">Reset Pair</button>
            </div>
          </div>
          <div class="compare-details">
            <h3 class="compare-section-heading">Comparison</h3>

            <div class="compare-table" role="table" aria-label="Card comparison table">
              <div class="compare-table-row compare-table-head" role="row">
                <div class="compare-cell compare-cell-label" role="columnheader" aria-hidden="true"></div>
                <div class="compare-cell compare-cell-card" role="columnheader"><strong>Card A: ${cardA.name}</strong></div>
                <div class="compare-cell compare-cell-card" role="columnheader"><strong>Card B: ${cardB.name}</strong></div>
              </div>

              <div class="compare-table-row" role="row">
                <div class="compare-cell compare-cell-label" role="rowheader">Keywords</div>
                <div class="compare-cell compare-cell-value" role="cell"><div class="compare-keyword-stack">${uniqueAHtml}</div></div>
                <div class="compare-cell compare-cell-value" role="cell"><div class="compare-keyword-stack">${uniqueBHtml}</div></div>
              </div>

              <div class="compare-table-row" role="row">
                <div class="compare-cell compare-cell-label" role="rowheader">Element</div>
                <div class="compare-cell compare-cell-value" role="cell"><strong>${cardA.element}</strong></div>
                <div class="compare-cell compare-cell-value" role="cell"><strong>${cardB.element}</strong></div>
              </div>

              <div class="compare-table-row" role="row">
                <div class="compare-cell compare-cell-label" role="rowheader">Suit</div>
                <div class="compare-cell compare-cell-value" role="cell"><strong>${cardA.suit}</strong></div>
                <div class="compare-cell compare-cell-value" role="cell"><strong>${cardB.suit}</strong></div>
              </div>
            </div>

            <div class="compare-shared-block">
              <strong>Shared Keywords:</strong> ${sharedHtml.replace('Shared: ', '')}
            </div>
          </div>
        </div>`;

      return html;
    }

    function setCompareCard(slot, cardId) {
      if (!cardId) {
        if (slot === 'a') {
          state.compareLeftCardId = null;
        } else {
          state.compareRightCardId = null;
        }

        if (state.compareMode) {
          renderPhase();
        } else {
          updateSidebar();
          saveProgress();
        }
        playUiSound('confirm');
        return;
      }

      if (!TarotDeck.getCard(cardId)) return;

      if (slot === 'a') {
        state.compareLeftCardId = cardId;
      } else {
        state.compareRightCardId = cardId;
      }

      if (state.compareLeftCardId === state.compareRightCardId) {
        const fallback = TarotDeck.DECK_ORDER.find(id => id !== state.compareLeftCardId);
        if (fallback) {
          if (slot === 'a') {
            state.compareRightCardId = fallback;
          } else {
            state.compareLeftCardId = fallback;
          }
        }
      }

      if (state.compareMode) {
        renderPhase();
      } else {
        updateSidebar();
        saveProgress();
      }
      playUiSound('confirm');
    }

    function resetCompareSelection() {
      state.compareLeftCardId = null;
      state.compareRightCardId = null;

      if (state.compareMode) {
        renderPhase();
      } else {
        updateSidebar();
        saveProgress();
      }

      playUiSound('soft');
    }

    function isDeckComplete() { return state.learnedCards.length >= TarotDeck.TOTAL_CARDS; }

    function cardPosition(id) { return TarotDeck.DECK_ORDER.indexOf(id) + 1; }

    /* ─── Sidebar ─── */
    function updateSidebar() {
      const card = getCard();
      const pos  = cardPosition(state.currentCard);

      dom.shortcutHomeBtn?.classList.toggle('active', state.activeView === 'home' && !state.compareMode);
      dom.shortcutLibraryBtn?.classList.toggle('active', state.activeView === 'library' && !state.compareMode);
      dom.shortcutChestBtn?.classList.toggle('active', state.activeView === 'chest' && !state.compareMode);
      dom.shortcutSearchBtn?.classList.toggle('active', state.activeView === 'search' && !state.compareMode);
      dom.compareModeBtn?.classList.toggle('active', !!state.compareMode);

      dom.sbTotal.textContent = TarotDeck.TOTAL_CARDS;
      dom.sbMastered.textContent = state.learnedCards.length;

      // Group bars
      const currentGroup = card ? getCardGroup(state.currentCard) : null;
      const sbg = dom.sbGroups;
      sbg.innerHTML = GROUPS.map(g => {
        const learned = groupLearnedCount(g.id);
        const pct = Math.round((learned / g.count) * 100);
        const isActive = currentGroup === g.id;
        const isDone = learned >= g.count;
        return `
          <button type="button" class="sb-group ${isActive ? 'active-group' : ''} ${isDone ? 'group-complete' : ''}" data-group-id="${g.id}">
            <div class="sb-group-label">
              <span class="icon-inline">${icon(g.icon)}<span>${g.label}</span></span>
              <span>${learned}/${g.count}${isDone ? ' ✓' : ''}</span>
            </div>
            <div class="sb-mini-bar">
              <div class="sb-mini-bar-fill ${g.color}" style="width:${pct}%"></div>
            </div>
          </button>`;
      }).join('');

      // Gems
      dom.sbStreak.textContent = `${state.daily.streak} day${state.daily.streak === 1 ? '' : 's'}`;
      dom.sbMysticCalendar.innerHTML = buildMysticCalendarHtml();

      // SRS due pill
      const due = getSrsDueCount();
      if (dom.sbDuePill) dom.sbDuePill.hidden = due === 0;
      if (dom.sbDueCount) dom.sbDueCount.textContent = due;

      renderCompareSidebar();

      updateRightCardPanel(card, pos);
      refreshLucideIcons();
    }

    function buildMysticCalendarHtml() {
      const today = getTodayKey();
      const done = new Set(state.daily.completedDates || []);
      const days = [];

      for (let i = 6; i >= 0; i--) {
        const d = new Date();
        d.setHours(0, 0, 0, 0);
        d.setDate(d.getDate() - i);
        const key = d.toLocaleDateString('en-CA');
        const dayLabel = d.toLocaleDateString('en-US', { weekday: 'short' }).slice(0, 1);
        const active = done.has(key);
        const todayCls = key === today ? ' today' : '';
        days.push(`<div class="mystic-day${active ? ' active' : ''}${todayCls}" title="${key}">${active ? '✦' : dayLabel}</div>`);
      }

      return days.join('');
    }

    function openWelcomeOverlay() {
      if (!state.daily.showWelcomeBack) return;
      const overlay = dom.welcomeOverlay;
      if (!overlay) return;

      dom.welcomeMessage.textContent = state.daily.welcomeMessage;
      dom.welcomeReward.textContent = `+${state.daily.pendingLoginReward} Gems Daily Blessing`;
      dom.welcomeBlessing.textContent = state.daily.todayBlessing;

      overlay.classList.add('open');
      overlay.setAttribute('aria-hidden', 'false');
      playUiSound('reward');
    }

    function closeWelcomeOverlay() {
      const overlay = dom.welcomeOverlay;
      if (!overlay) return;
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      state.daily.showWelcomeBack = false;
      state.daily.pendingLoginReward = 0;
      playUiSound('confirm');
      saveProgress();
    }

    function updateRightCardPanel(card, pos) {
      const image = dom.rightCardImg;
      const name = dom.rightCardName;
      const meta = dom.rightCardMeta;
      const keywords = dom.rightCardKeywords;
      const currentPhaseId = PHASES[state.phaseIndex]?.id || PHASES[0].id;
      const shouldInvertRightPanel = state.activeView === 'lesson' && currentPhaseId === 'reversed';

      if (!card) {
        image.removeAttribute('src');
        image.alt = 'No card selected';
        image.classList.remove('current-card-pulse');
        image.classList.remove('altar-card-reversed');
        name.textContent = 'Awaiting your quest...';
        meta.textContent = 'Reveal a card to begin.';
        keywords.innerHTML = '';
        return;
      }

      image.src = card.image || TAROT_CARD_BACK_IMAGE;
      image.alt = card.name || 'Tarot card';
      image.classList.toggle('altar-card-reversed', shouldInvertRightPanel);
      image.classList.toggle('current-card-pulse', !shouldInvertRightPanel);
      name.textContent = card.name || 'Unknown Card';
      meta.textContent = `Card ${pos} of ${TarotDeck.TOTAL_CARDS} • ${card.suit || 'Unknown Suit'} • ${card.element || 'Unknown Element'}`;
      const safeKeywords = Array.isArray(card.keywords) ? card.keywords : [];
      keywords.innerHTML = safeKeywords.slice(0, 4).map(k => `<span>${k}</span>`).join('');
    }

    /* ─── HUD ─── */
    function updateHUD() {
      syncProgressState();

      const progress = state.phaseIndex <= 0 ? 0 : Math.min(100, (state.phaseIndex / (PHASES.length - 1)) * 100);
      if (dom.lessonProgress) {
        dom.lessonProgress.style.width = progress + '%';
      }

      const showLessonDots = state.activeView === 'lesson'
        && !state.compareMode
        && !state.reviewSession
        && state.phaseIndex >= 2;
      if (dom.phaseDots) {
        dom.phaseDots.hidden = !showLessonDots;
      }

      const dots = dom.phaseDots;
      if (!dots) {
        updateSidebar();
        return;
      }

      if (!showLessonDots) {
        dots.innerHTML = '';
        updateSidebar();
        return;
      }

      dots.innerHTML = PHASES.map((p, i) => {
        let cls = 'phase-dot';
        if (i < state.phaseIndex)  cls += ' done';
        if (i === state.phaseIndex) cls += ' active';
        return `<div class="${cls}" title="${p.label}"></div>`;
      }).join('');

      updateSidebar();
    }

    /* ─── Phase renderers ─── */
    function renderWelcome() {
      const deckComplete = isDeckComplete();
      const progress = TarotDeck.getDeckProgress(state.learnedCards);

      if (deckComplete) {
        return renderGrandmasterEnding(progress);
      }

      return `
        <div class="card-panel reveal-hero">
          <div class="phase-title">Reveal Card</div>
          <p class="reveal-hint">Click the card to reveal your lesson.</p>
          <div class="card-image-wrap">
            <button type="button" class="reveal-flip-btn" onclick="openCardFromRevealPage()" aria-label="Reveal current tarot card lesson">
              <img class="card-image card-back-face" src="${TAROT_CARD_BACK_IMAGE}" alt="Tarot card back design" loading="lazy">
            </button>
          </div>
        </div>`;
    }

    function renderGrandmasterEnding(progress) {
      return `
        <div class="card-panel grandmaster-screen">
          <span class="grandmaster-crown">${icon('crown', 'grandmaster-crown-icon')}</span>
          <h2 class="grandmaster-title">Tarot Grandmaster</h2>
          <p class="grandmaster-subtitle">All 78 cards are now etched into your living memory.</p>
          <div class="milestone-award"><span class="icon-inline">${icon('sparkles')}<span>Final Title Unlocked: Tarot Grandmaster</span></span></div>
          <p style="color:var(--text-dim)">You completed <strong>${progress.learned}/${progress.total}</strong> cards and reached <strong>${state.gems}</strong> Gems.</p>
          <p style="color:var(--text-dim)">Your journey through the Arcana is complete, but your readings are just beginning.</p>
          <div class="nav-buttons" style="margin-top:1.25rem">
            <button class="btn btn-primary" onclick="reviewLastCard()">Review Last Card</button>
            <button class="btn btn-secondary" onclick="resetProgress()">Begin a New Journey</button>
          </div>
        </div>`;
    }

    function renderTrophyShelf() {
      const slots = GROUPS.map(group => {
        const unlocked = groupIsComplete(group.id);
        const iconName = group.trophyIcon || group.icon || 'award';
        const label = group.award || group.label;
        return `
          <div class="trophy-slot ${unlocked ? 'unlocked' : 'locked'}" title="${group.label}: ${unlocked ? 'Unlocked' : 'Locked'}">
            <div class="trophy-icon">${icon(iconName)}</div>
            <div class="trophy-name">${label}</div>
          </div>`;
      }).join('');

      return `
        <div class="trophy-shelf">
          <div class="trophy-shelf-title">Trophy Shelf</div>
          <div class="trophy-slots">${slots}</div>
        </div>`;
    }

    function renderReveal(card) {
      const detailsHtml = `
          <h2 class="card-name">${card.name}</h2>
          <p class="archetype">${card.unlockTitle}</p>
          <div class="meta-grid">
            <div class="meta-item"><div class="label">Number</div><div class="value">${card.numberLabel || card.number}</div></div>
            <div class="meta-item"><div class="label">Suit</div><div class="value">${card.suit}</div></div>
            <div class="meta-item"><div class="label">Element</div><div class="value">${card.element}</div></div>
            <div class="meta-item"><div class="label">Archetype</div><div class="value">${card.archetype}</div></div>
          </div>
          <div class="keywords">${card.keywords.map(k => `<span class="keyword">${k}</span>`).join('')}</div>
      `;

      return `
        <div class="card-panel reveal-hero ritual-hero">
          <div class="ritual-room-dim" aria-hidden="true"></div>

          <div class="ritual-particles" aria-hidden="true">
            <span style="left: 20%; top: 56%; --px: 8px; --particle-time: 6.2s; --particle-delay: 6.3s;"></span>
            <span style="left: 29%; top: 60%; --px: -6px; --particle-time: 7.1s; --particle-delay: 6.9s;"></span>
            <span style="left: 41%; top: 54%; --px: 9px; --particle-time: 6.6s; --particle-delay: 7.3s;"></span>
            <span style="left: 58%; top: 58%; --px: -8px; --particle-time: 7.3s; --particle-delay: 6.4s;"></span>
            <span style="left: 70%; top: 55%; --px: 7px; --particle-time: 6.8s; --particle-delay: 7.1s;"></span>
            <span style="left: 79%; top: 61%; --px: -7px; --particle-time: 7.4s; --particle-delay: 6.7s;"></span>
          </div>

          <div class="ritual-card-wrap">
            <div class="card-image-wrap" onclick="revealCardFace()" role="button" tabindex="0" aria-label="Reveal the card face">
              <div class="card-flip-inner ritual-flip-inner">
                <img class="card-face card-back-face" src="${TAROT_CARD_BACK_IMAGE}" alt="Tarot card back design" loading="lazy">
                <img class="card-face card-front-face" src="${card.image}" alt="${card.name} — Rider-Waite-Smith 1909" loading="lazy">
              </div>
            </div>
          </div>

          <div class="ritual-lesson">
            <div class="phase-title">The Card</div>
            <p class="unlock-text">A calm reading opens for today.</p>
            ${detailsHtml}
          </div>
        </div>`;
    }

    function revealCardFace() {
      if (state.revealCardFlipped || state.revealFlipAnimating) return;
      const wrap = dom.mainContent?.querySelector('.card-image-wrap');
      if (!wrap) {
        state.revealCardFlipped = true;
        renderPhase();
        playUiSound('confirm');
        return;
      }

      state.revealFlipAnimating = true;
      state.revealCardFlipped = true;
      wrap.classList.add('flipped');

      playUiSound('confirm');
      window.setTimeout(() => {
        state.revealFlipAnimating = false;
        renderPhase();
      }, 760);
    }

    function renderCharacter(card) {
      const obs = card.character.map(o => `
        <div class="observation">
          <h4>${o.aspect}</h4>
          <p>${o.detail}</p>
          <p><strong>What this reveals:</strong> ${o.reveal}</p>
        </div>`).join('');
      return `
        <div class="card-panel">
          <div class="phase-title">Character Reading Challenge</div>
          ${obs}
          <div class="challenge-prompt"><strong>🤔 Your Turn:</strong> ${card.characterChallenge}</div>
        </div>`;
    }

    function renderLandscape(card) {
      const items = card.landscape.map(l => `
        <div class="observation">
          <h4>${l.item}</h4>
          <p><strong>Symbolizes:</strong> ${l.symbol}</p>
          <p><strong>Why Smith included it:</strong> ${l.why}</p>
        </div>`).join('');
      return `
        <div class="card-panel">
          <div class="phase-title">Landscape Explorer</div>
          ${items}
          <div class="memory-hook"><span class="icon-inline">${icon('book-open')}<span>Landscape Memory Story</span></span><br><br>${card.landscapeStory}</div>
        </div>`;
    }

    function renderNumerology(card) {
      const n = card.numerology;

      return `
        <div class="card-panel">
          <div class="phase-title">Numerology Quest</div>
          <div class="story-block"><strong>What ${card.number} means:</strong><br>${n.meaning}</div>
          <div class="story-block"><strong>Why it matters:</strong><br>${n.why}</div>
          <div class="story-block"><strong>How ${card.name} expresses it:</strong><br>${n.expression}</div>
          <div class="memory-hook">🪝 Memory Hook: ${n.hook}</div>
        </div>`;
    }

    function renderColor(card) {
      const rows = card.colors.map(c => `
        <div class="color-row">
          <div class="color-swatch" style="background:${c.hex}"></div>
          <div>
            <div class="color-name">${c.name}</div>
            <div>${c.meaning}</div>
            <div class="color-trick">→ "${c.trick.replace(/"/g, '')}"</div>
          </div>
        </div>`).join('');

      return `
        <div class="card-panel">
          <div class="phase-title">Color Detective</div>
          <p style="margin-bottom:1rem;color:var(--text-dim)">Color → Meaning → Memory Trick</p>
          ${rows}
        </div>`;
    }

    function renderElemental(card) {
      const e = card.elemental;
      const suitToElementMap = {
        'Wands': { icon: 'flame', label: 'Fire' },
        'Cups': { icon: 'droplets', label: 'Water' },
        'Swords': { icon: 'wind', label: 'Air' },
        'Pentacles': { icon: 'leaf', label: 'Earth' }
      };
      const normalizeElement = (value) => {
        const v = String(value || '').toLowerCase();
        if (v.includes('fire')) return 'fire';
        if (v.includes('water')) return 'water';
        if (v.includes('air')) return 'air';
        if (v.includes('earth')) return 'earth';
        return 'air';
      };
      const elementKey = normalizeElement(e.dominant);
      const relevantElement = suitToElementMap[card.suit];
      const elementDisplay = relevantElement 
        ? `<div class="element-grid"><div class="element-chip ${elementKey}"><span class="icon-inline">${icon(relevantElement.icon)}<span>${card.suit} = ${relevantElement.label}</span></span></div></div>`
        : '';
      return `
        <div class="card-panel elemental-panel elemental-${elementKey}">
          <div class="elemental-backdrop" aria-hidden="true"></div>
          <div class="elemental-particles" aria-hidden="true">
            <span></span><span></span><span></span><span></span><span></span>
          </div>
          <div class="phase-title">Elemental Energy Scan</div>
          <p><strong>Dominant:</strong> ${e.dominant} &nbsp;|&nbsp; <strong>Secondary:</strong> ${e.secondary}</p>
          ${elementDisplay}
          <div class="story-block"><strong>How ${e.dominant} behaves:</strong> ${e.behavior}</div>
          <div class="story-block"><strong>What motivates it:</strong> ${e.motivates}</div>
          <div class="story-block"><strong>Strengths:</strong> ${e.strengths}</div>
          <div class="story-block"><strong>Shadow traits:</strong> ${e.shadows}</div>
          <div class="story-block emphasis"><strong>If this card were a person:</strong> ${e.asPerson}</div>
        </div>`;
    }

    function renderSymbols(card) {
      const items = card.symbols.map(s => `
        <div class="treasure-item">
          <span class="treasure-icon">${icon(s.icon || 'star')}</span>
          <div>
            <h4>Found: ${s.name}</h4>
            <p><strong>Meaning:</strong> ${s.meaning}</p>
            <p><strong>Hidden message:</strong> ${s.hidden}</p>
            <p class="color-trick">Memory Trick: ${s.trick}</p>
          </div>
        </div>`).join('');
      return `
        <div class="card-panel">
          <div class="phase-title">Symbol Treasure Hunt</div>
          <p style="margin-bottom:1rem;color:var(--text-dim)">Examine the card image above in your mind — then collect each treasure:</p>
          ${items}
        </div>`;
    }

    function renderReversed(card) {
      if (!card.reversed) {
        return `
          <div class="card-panel">
            <div class="phase-title">Shadow & Reversal</div>
            <p style="color:var(--text-dim);font-size:0.9rem">This card's reversed meanings are still being inscribed...</p>
          </div>`;
      }

      const r = card.reversed;
      const cautionHtml = r.cautions.map(c => `
        <div class="shadow-item">
          <strong style="color:var(--gold)">${c.aspect}</strong>
          <p style="font-size:0.88rem;color:var(--text)">${c.detail}</p>
        </div>`).join('');

      const meaningsHtml = r.meanings.map(m => `
        <div class="reversed-meaning">
          <div class="reversed-keyword">${m.keyword}</div>
          <div style="font-size:0.85rem;color:var(--text-dim);margin-bottom:0.35rem">${m.meaning}</div>
          <div style="font-size:0.8rem;color:var(--gold-dim);font-style:italic">→ ${m.application}</div>
        </div>`).join('');

      return `
        <div class="card-panel">
          <div class="phase-title">Shadow & Reversal</div>

          <p style="color:var(--text-dim);margin-bottom:1rem;font-size:0.87rem;line-height:1.5;font-style:italic">"${r.shadow}"</p>

          <div style="background:rgba(210,60,60,0.08);border:1px solid rgba(210,60,60,0.2);border-radius:12px;padding:1rem;margin-bottom:1.2rem">
            <div style="font-family:'Cinzel',serif;font-size:0.76rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--text-dim);margin-bottom:0.75rem">When Reversed</div>
            ${cautionHtml}
          </div>

          <div style="margin-bottom:1rem">
            <div style="font-family:'Cinzel',serif;font-size:0.78rem;text-transform:uppercase;letter-spacing:0.1em;color:var(--gold-dim);margin-bottom:0.65rem">Reversed Keywords</div>
            ${meaningsHtml}
          </div>

          <div style="background:rgba(102,95,209,0.08);border:1px solid rgba(102,95,209,0.2);border-radius:10px;padding:0.85rem;margin-bottom:1rem">
            <div style="font-size:0.75rem;color:var(--text-dim);text-transform:uppercase;letter-spacing:0.08em;margin-bottom:0.35rem">Reading Tip</div>
            <p style="font-size:0.86rem;color:var(--text);line-height:1.5;margin:0">${r.readingTip}</p>
          </div>

          <div style="background:rgba(220,185,119,0.07);border-left:2px solid rgba(220,185,119,0.25);padding:0.7rem 0.85rem;border-radius:6px">
            <p style="font-size:0.82rem;color:var(--text-dim);margin:0;font-style:italic"><strong>Quick contrast:</strong> ${r.contrast}</p>
          </div>
        </div>`;
    }

    function renderMovie(card) {
      const m = card.movie;
      return `
        <div class="card-panel">
          <div class="phase-title">Movie Scene Method</div>
          <div class="movie-scene">
            <p><strong class="icon-inline">${icon('clapperboard')}<span>Setting:</span></strong> ${m.setting}</p>
            <p><strong class="icon-inline">${icon('volume-2')}<span>Sounds:</span></strong> ${m.sounds}</p>
            <p><strong class="icon-inline">${icon('cloud-sun')}<span>Weather:</span></strong> ${m.weather}</p>
            <p><strong class="icon-inline">${icon('sparkles')}<span>Emotions:</span></strong> ${m.emotions}</p>
            <p><strong class="icon-inline">${icon('arrow-right')}<span>What happens next:</span></strong> ${m.next}</p>
          </div>
        </div>`;
    }

    function renderQuiz(card) {
      if (state.quizSubmitted) return renderResults(card);
      return window.QuizPageRenderer.render({ card, answers: state.quizAnswers, icon });
    }

    function renderMemory(card) {
      const m = card.memory;
      return `
        <div class="card-panel">
          <div class="phase-title">Memory Spell</div>
          <div class="memory-spell-block">
            <div class="spell-label">One-Sentence Summary</div>
            <div class="spell-text">${m.summary}</div>
          </div>
          <div class="memory-spell-block">
            <div class="spell-label">Mnemonic</div>
            <div class="spell-text">${m.mnemonic}</div>
          </div>
          <div class="memory-spell-block">
            <div class="spell-label">Visual Memory Image</div>
            <div class="spell-text">${m.visual}</div>
          </div>
          <div class="memory-spell-block">
            <div class="spell-label">Real-Life Application</div>
            <div class="spell-text">${m.application}</div>
          </div>
        </div>`;
    }

    /* ─── Milestone Screen ─── */
    function renderMilestone(groupId) {
      const g = GROUPS.find(x => x.id === groupId);
      const cards = TarotDeck.CARDS;
      const order = TarotDeck.DECK_ORDER;

      // Collect card IDs that belong to this group
      const groupCards = order.filter(id => getCardGroup(id) === groupId);
      const thumbs = groupCards.map(id => {
        const c = cards[id];
        return c ? `<img class="milestone-card-thumb" src="${c.image}" alt="${c.name}" title="${c.name}">` : '';
      }).join('');

      const nextId = getNextCardId();
      const nextCard = nextId ? cards[nextId] : null;
      const deckComplete = isDeckComplete();
      const nextPendingReward = checkPendingMilestone();

      const nextBtn = nextPendingReward
        ? `<button class="btn btn-primary" onclick="goToMilestone('${nextPendingReward}')">Claim Next Milestone Reward</button>
           <button class="btn btn-secondary" onclick="finishLesson()">Return Home</button>`
        : deckComplete
        ? `<button class="btn btn-primary" onclick="showGrandmasterEnding()">Enter Grandmaster Ending</button>`
        : nextCard
           ? `<button class="btn btn-primary" onclick="startNextCard()">Move to the Next Card</button>
             <button class="btn btn-secondary" onclick="finishLesson()">Return Home</button>`
          : `<button class="btn btn-secondary" onclick="finishLesson()">Return Home</button>`;

      return `
        <div class="card-panel milestone-screen">
          <span class="milestone-trophy">${icon(g.trophyIcon || g.icon, 'milestone-icon')}</span>
          <h2 class="milestone-title">${g.completionTitle}</h2>
          <p class="milestone-subtitle">${g.flavor}</p>
          <div class="ms-divider"></div>
          <div class="milestone-award"><span class="icon-inline">${icon('award')}<span>Awarded: ${g.award}</span></span></div>
          <div class="milestone-stat-row">
            <div class="milestone-stat">
              <div class="s-label">Cards Mastered</div>
              <div class="s-val">${g.count}</div>
            </div>
            <div class="milestone-stat">
              <div class="s-label">Bonus Gems</div>
              <div class="s-val">+${g.bonusGems}</div>
            </div>
            <div class="milestone-stat">
              <div class="s-label">Total Gems</div>
              <div class="s-val">${state.gems}</div>
            </div>
          </div>
          <p style="color:var(--text-dim);font-size:0.9rem;margin-bottom:0.75rem">All ${g.count} cards in your collection:</p>
          <div class="milestone-cards-grid">${thumbs}</div>
          <div class="nav-buttons">${nextBtn}</div>
        </div>`;
    }

    /* ─── Phase router ─── */
    function renderPhase() {
      if (state.compareMode) {
        setRightPanelCollapsed(true, 'system');
        dom.mainContent.innerHTML = renderCompareCenter();
        updateHUD();
        refreshLucideIcons();
        saveProgress();
        return;
      }

      if (state.activeView === 'home') {
        setRightPanelCollapsed(true, 'system');
        dom.mainContent.innerHTML = renderHomePortal();
        updateHUD();
        refreshLucideIcons();
        saveProgress();
        return;
      }

      if (state.activeView === 'library') {
        setRightPanelCollapsed(true, 'system');
        dom.mainContent.innerHTML = renderAlchemyLibrary();
        updateHUD();
        refreshLucideIcons();
        saveProgress();
        return;
      }

      if (state.activeView === 'chest') {
        setRightPanelCollapsed(true, 'system');
        dom.mainContent.innerHTML = renderChestVault();
        updateHUD();
        refreshLucideIcons();
        saveProgress();
        return;
      }

      if (state.activeView === 'search') {
        setRightPanelCollapsed(true, 'system');
        dom.mainContent.innerHTML = renderSearchPortal();
        bindSearchUi();
        updateHUD();
        refreshLucideIcons();
        saveProgress();
        return;
      }

      const card = getCard();
      const phase = PHASES[state.phaseIndex] || PHASES[0];
      const collapsedPhases = ['welcome', 'reveal', 'quiz', 'memory', 'results'];
      const shouldCollapseRightPanel = collapsedPhases.includes(phase.id);
      setRightPanelCollapsed(shouldCollapseRightPanel, 'system');
      dom.mainContent.dataset.phase = phase.id;
      let html = '';

      switch (phase.id) {
        case 'welcome':    html = renderWelcome(); break;
        case 'reveal':     html = renderReveal(card); break;
        case 'numerology': html = renderNumerology(card); break;
        case 'color':      html = renderColor(card); break;
        case 'character':  html = renderCharacter(card); break;
        case 'landscape':  html = renderLandscape(card); break;
        case 'elemental':  html = renderElemental(card); break;
        case 'symbols':    html = renderSymbols(card); break;
        case 'movie':      html = renderMovie(card); break;
        case 'reversed':   html = renderReversed(card); break;
        case 'quiz':       html = renderQuiz(card); break;
        case 'memory':     html = renderMemory(card); break;
        case 'results':    html = state.quizSubmitted ? renderResults(card) : renderQuiz(card); break;
        default:           html = renderWelcome(); break;
      }

      const showNav = phase.id !== 'welcome' && phase.id !== 'results';
      const navHtml = showNav ? `
        <div class="nav-buttons${phase.id === 'reveal' && !state.revealCardFlipped ? ' ritual-nav' : ''}">
          ${state.phaseIndex > 0 ? `<button class="btn btn-secondary" onclick="prevPhase()">← Back</button>` : ''}
          ${phase.id === 'quiz'
            ? ''
            : phase.id === 'memory'
              ? `<button class="btn btn-primary" onclick="goToResults()">View Quiz Results →</button>`
              : `<button class="btn btn-primary" onclick="nextPhase()">Continue →</button>`}
        </div>` : '';

      dom.mainContent.innerHTML = html + navHtml;
      updateHUD();
      refreshLucideIcons();
      saveProgress();
    }

    /* ─── Actions ─── */
    function startLesson() {
      state.activeView = 'lesson';
      setRightPanelCollapsed(false, 'system');
      state.panelReturnView = 'home';
      state.phaseIndex    = 0;
      state.lessonEntryCardId = state.currentCard;
      state.quizAnswers   = [];
      state.quizSubmitted = false;
      state.sessionGems   = 0;
      state.showingMilestone = false;
      state.revealCardFlipped = false;
      state.revealFlipAnimating = false;
      saveProgress();
      renderPhase();
    }

    function continueJourney() {
      state.activeView = 'lesson';
      setRightPanelCollapsed(false, 'system');
      state.isFirstVisit = false;
      state.currentCard  = getContinueCardId();
      state.lastViewKey = `${state.currentCard}:0`;
      saveProgress();
      startLesson();
    }

    function openCardFromRevealPage() {
      const isLessonEntry = state.lessonEntryCardId === state.currentCard;

      if (state.isFirstVisit || !isLessonEntry) {
        continueJourney();
      }

      nextPhase();
    }

    function prevPhase() {
      if (state.phaseIndex <= 0) return;
      state.phaseIndex -= 1;
      const card = getCard();
      if (card) playElementTransition(card);
      saveProgress();
      renderPhase();
      scrollToTop();
      playUiSound('soft');
    }

    function nextPhase() {
      if (state.phaseIndex >= PHASES.length - 1) return;
      state.phaseIndex += 1;
      const card = getCard();
      if (card) playElementTransition(card);
      saveProgress();
      renderPhase();
      scrollToTop();
      playUiSound('soft');
    }

    function startNextCard() {
      state.activeView = 'lesson';
      setRightPanelCollapsed(false, 'system');
      state.showingMilestone = false;
      const nextId = getNextCardId();
      if (!nextId) { finishLesson(); return; }
      state.currentCard = nextId;
      saveProgress();
      startLesson();
    }

    function renderResults(card) {
      const nextId = getNextCardId();
      return window.ResultsPageRenderer.render({
        card,
        state,
        icon,
        getRank,
        getCardGemReward,
        totalCards: TarotDeck.TOTAL_CARDS,
        progress: TarotDeck.getDeckProgress(state.learnedCards),
        nextCard: nextId ? TarotDeck.CARDS[nextId] : null,
        pendingMilestoneId: checkPendingMilestone(),
        renderGrandmasterEnding
      });
    }

    function submitQuiz() {
      const card  = getCard();
      const baseEarned = getCardGemReward(card);
      const wasMastered = state.learnedCards.includes(card.id);
      const { score } = QuizEngine.evaluate(card, state.quizAnswers);
      const perfectQuizBonus = score === card.quiz.length ? 1 : 0;
      const earned = baseEarned + perfectQuizBonus;

      state.sessionGems   = earned;
      state.gems         += earned;
      state.quizSubmitted = true;

      if (score === card.quiz.length) {
        state.achievementData.perfectQuizWins += 1;
      }

      if (!wasMastered) {
        state.learnedCards.push(card.id);
        initSrsCard(card.id);
        state.achievementData.masteredThisSession += 1;
        state.achievementData.bestSessionMastered = Math.max(
          state.achievementData.bestSessionMastered,
          state.achievementData.masteredThisSession
        );
      }

      registerDailyCardCompletion();
      evaluateAchievements();

      state.lastReviewedCard = card.id;

      saveProgress();
      state.phaseIndex = PHASES.findIndex(p => p.id === 'memory');
      renderPhase();
      if (!wasMastered) {
        showCompletionPopup(card, earned);
      }
      scrollToTop();
    }

    function selectAnswer(questionIndex, optionIndex) {
      state.quizAnswers[questionIndex] = optionIndex;
      saveProgress();
      renderPhase();
      playUiSound('soft');
    }

    async function reviewLastCard() {
      state.compareMode = false;
      state.activeView = 'lesson';
      setRightPanelCollapsed(false, 'system');
      if (!state.lastReviewedCard || !TarotDeck.getCard(state.lastReviewedCard)) {
        await showAlert({
          icon: '📜',
          title: 'No Review Available',
          message: 'No previously completed lesson is available to review yet.',
          primaryText: 'Continue'
        });
        return;
      }

      state.currentCard = state.lastReviewedCard;
      state.phaseIndex = 0;
      state.lessonEntryCardId = state.lastReviewedCard;
      state.quizAnswers = [];
      state.quizSubmitted = false;
      state.showingMilestone = false;
      state.isFirstVisit = false;

      renderPhase();
      scrollToTop();
    }

    async function jumpToGroup(groupId) {
      state.compareMode = false;
      state.activeView = 'lesson';
      setRightPanelCollapsed(false, 'system');
      const group = GROUPS.find(g => g.id === groupId);
      if (!group) return;

      const targetCardId = getGroupJumpCardId(groupId);
      const targetCard = TarotDeck.getCard(targetCardId);
      if (!targetCard) return;

      const ok = await showConfirm({
        icon: 'sparkles',
        title: 'Jump Here?',
        message: `Travel to ${group.label} and open ${targetCard.name}?`,
        variant: 'jump',
        primaryText: 'Jump',
        cancelText: 'Stay Here'
      });
      if (!ok) return;

      state.currentCard = targetCardId;
      state.phaseIndex = 0;
      state.lessonEntryCardId = targetCardId;
      state.quizAnswers = [];
      state.quizSubmitted = false;
      state.showingMilestone = false;
      state.revealCardFlipped = false;
      state.revealFlipAnimating = false;
      state.isFirstVisit = false;

      renderPhase();
      scrollToTop();
    }

    function goToResults() {
      state.phaseIndex = PHASES.findIndex(p => p.id === 'results');
      renderPhase();
    }

    function goToMilestone(groupId) {
      // Award bonus gems, mark milestone shown
      const g = GROUPS.find(x => x.id === groupId);
      state.gems += g.bonusGems;
      state.shownMilestones.push(groupId);
      state.showingMilestone = true;
      saveProgress();
      // Re-render as results so milestone screen shows
      dom.mainContent.innerHTML = renderMilestone(groupId);
      updateHUD();
      playUiSound('reward');
      // Spawn element-themed particles
      spawnElementParticles(groupId);
    }

    function spawnElementParticles(groupId) {
      if (!state.settings.animations) return;
      const canvas = document.createElement('canvas');
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      canvas.style.position = 'fixed';
      canvas.style.top = '0';
      canvas.style.left = '0';
      canvas.style.pointerEvents = 'none';
      canvas.style.zIndex = '9999';
      document.body.appendChild(canvas);
      const ctx = canvas.getContext('2d');
      
      const particles = [];
      const particleCount = 60;
      
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: -20 - Math.random() * 40,
          vx: (Math.random() - 0.5) * 6,
          vy: Math.random() * 4 + 3,
          life: 1,
          type: groupId
        });
      }
      
      function drawParticle(p) {
        if (p.type === 'wands') drawEmber(ctx, p);
        else if (p.type === 'cups') drawTeardrop(ctx, p);
        else if (p.type === 'swords') drawStar(ctx, p);
        else if (p.type === 'pentacles') drawLeaf(ctx, p);
        else if (p.type === 'major') drawMixed(ctx, p);
      }
      
      function drawEmber(ctx, p) {
        ctx.save();
        ctx.globalAlpha = p.life * 0.8;
        ctx.fillStyle = p.life > 0.5 ? '#ff6b35' : '#ffa500';
        ctx.fillRect(p.x - 3, p.y - 6, 6, 12);
        ctx.restore();
      }
      
      function drawTeardrop(ctx, p) {
        ctx.save();
        ctx.globalAlpha = p.life * 0.8;
        ctx.fillStyle = '#6b9fd9';
        ctx.beginPath();
        ctx.ellipse(p.x, p.y + 3, 4, 8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = '#8ab3e6';
        ctx.beginPath();
        ctx.arc(p.x, p.y - 2, 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      
      function drawStar(ctx, p) {
        ctx.save();
        ctx.globalAlpha = p.life * 0.8;
        ctx.strokeStyle = '#c0d9ff';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y - 5);
        ctx.lineTo(p.x + 2, p.y - 1);
        ctx.lineTo(p.x + 5, p.y - 1);
        ctx.lineTo(p.x + 2.5, p.y + 2);
        ctx.lineTo(p.x + 3.5, p.y + 6);
        ctx.lineTo(p.x, p.y + 3);
        ctx.lineTo(p.x - 3.5, p.y + 6);
        ctx.lineTo(p.x - 2.5, p.y + 2);
        ctx.lineTo(p.x - 5, p.y - 1);
        ctx.lineTo(p.x - 2, p.y - 1);
        ctx.closePath();
        ctx.stroke();
        ctx.restore();
      }
      
      function drawLeaf(ctx, p) {
        ctx.save();
        ctx.globalAlpha = p.life * 0.8;
        ctx.fillStyle = '#6db86d';
        ctx.beginPath();
        ctx.ellipse(p.x, p.y, 3, 6, Math.PI / 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = '#4a9a4a';
        ctx.lineWidth = 0.5;
        ctx.stroke();
        ctx.restore();
      }
      
      function drawMixed(ctx, p) {
        const mix = [drawEmber, drawTeardrop, drawStar, drawLeaf][Math.floor(p.life * 4) % 4];
        mix(ctx, p);
      }
      
      let animFrame;
      function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = particles.length - 1; i >= 0; i--) {
          const p = particles[i];
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.15; // gravity
          p.life -= 0.008;
          
          if (p.life <= 0) {
            particles.splice(i, 1);
          } else {
            drawParticle(p);
          }
        }
        
        if (particles.length > 0) {
          animFrame = requestAnimationFrame(animate);
        } else {
          document.body.removeChild(canvas);
          cancelAnimationFrame(animFrame);
        }
      }
      
      animate();
    }

    function finishLesson() {
      state.activeView = 'home';
      state.panelReturnView = 'home';
      state.achievementData.masteredThisSession = 0;
      state.phaseIndex       = 0;
      state.quizAnswers      = [];
      state.quizSubmitted    = false;
      state.showingMilestone = false;
      renderPhase();
    }

    function showGrandmasterEnding() {
      finishLesson();
    }

    async function resetProgress() {
      const shouldReset = await showConfirm({
        icon: 'moon-star',
        title: 'Reset Journey?',
        message: 'Reset all Gems, learned cards, and journey progress? This cannot be undone.',
        primaryText: 'Reset All',
        cancelText: 'Cancel'
      });

      if (shouldReset) {
        stateManager.reset();
        saveProgress();
        renderPhase();
        playUiSound('confirm');
      }
    }

    function initGlobalHandlers() {
      document.addEventListener('pointerdown', attachRippleEffect, true);

      document.addEventListener('keydown', (event) => {
        if (event.key !== 'Escape') return;

        if (state.modalOpen) {
          return;
        }

        if (dom.settingsDropdown?.classList.contains('open')) {
          closeSettingsDropdown();
          return;
        }

        if (state.popupOpen) {
          closeCompletionPopup();
          return;
        }

        if (state.daily.showWelcomeBack && dom.welcomeOverlay?.classList.contains('open')) {
          closeWelcomeOverlay();
        }
      });
    }

    /* ─── Boot ─── */
    hydrateDomCache();
    loadProgress();
    applySettings();
    initAmbientParticles();
    initSettingsPanel();
    initSidebarShortcuts();
    initSidebarGroupButtons();
    initSettingsDropdown();
    initGlobalHandlers();
    exposeGlobalActions();
    renderPhase();
    refreshLucideIcons();
    playSeekerIntro(false);
    openWelcomeOverlay();
