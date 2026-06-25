/* Tarot Quest — Full 78-card RWS deck data & lesson builder */
(function (global) {
  const RWS_BASE = 'https://commons.wikimedia.org/wiki/Special:FilePath/';

  function img(file) {
    return RWS_BASE + encodeURIComponent(file);
  }

  const SUIT_ELEMENT = {
    wands: 'Fire',
    cups: 'Water',
    swords: 'Air',
    pentacles: 'Earth'
  };

  const RANK_NAMES = ['', 'Ace', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Page', 'Knight', 'Queen', 'King'];
  const RANK_THEMES = {
    1: { theme: 'Pure potential — the seed of the suit\'s energy', hook: 'Ace is the spark before the flame catches.' },
    2: { theme: 'Duality, choice, and partnership', hook: 'Two is the first mirror — nothing exists alone.' },
    3: { theme: 'Creation, growth, and expression', hook: 'Three is creation made visible.' },
    4: { theme: 'Structure, stability, and foundation', hook: 'Four corners hold the temple.' },
    5: { theme: 'Conflict, challenge, and change', hook: 'Five breaks the comfort — growth hurts first.' },
    6: { theme: 'Harmony, balance, and reciprocity', hook: 'Six is the gift returned.' },
    7: { theme: 'Assessment, reflection, and inner work', hook: 'Seven asks: are you sure?' },
    8: { theme: 'Momentum, mastery in motion', hook: 'Eight is speed with purpose.' },
    9: { theme: 'Near-completion, intensity, culmination', hook: 'Nine is the last breath before the crown.' },
    10: { theme: 'Completion, legacy, and full cycle', hook: 'Ten is the suit\'s story ending — and beginning again.' },
    11: { theme: 'Curious student — messages and exploration', hook: 'The Page brings news on the wind.' },
    12: { theme: 'Active quest — movement and adventure', hook: 'The Knight charges — for better or worse.' },
    13: { theme: 'Mature mastery — nurturing the suit\'s gifts', hook: 'The Queen holds the heart of the element.' },
    14: { theme: 'External authority — command and responsibility', hook: 'The King rules the realm of this element.' }
  };

  const SUIT_PROFILE = {
    wands: {
      suit: 'Wands',
      element: 'Fire',
      behavior: 'Fire burns bright — passionate, creative, restless, and driven to act.',
      motivates: 'Inspiration, ambition, adventure, and the thrill of creation.',
      strengths: 'Courage, enthusiasm, vision, and natural leadership.',
      shadows: 'Burnout, impulsiveness, aggression, and starting without finishing.',
      asPerson: 'The entrepreneur who launches at midnight — blazing energy, sometimes scorching the earth.',
      colorSet: [
        { hex: '#c0392b', name: 'Red & Orange (flames)', meaning: 'Passion, action, raw creative force', trick: '"Red Wands burn — this suit moves."' },
        { hex: '#f5e042', name: 'Golden Yellow (sky)', meaning: 'Optimism and spiritual fire', trick: '"Gold sky = divine inspiration."' },
        { hex: '#5a8a3c', name: 'Green (distant land)', meaning: 'Growth fueled by fire\'s energy', trick: '"Green horizon = ideas taking root."' }
      ],
      landscape: 'Open sky and fertile land — fire needs air and something to transform.',
      archetypePrefix: 'Flame'
    },
    cups: {
      suit: 'Cups',
      element: 'Water',
      behavior: 'Water flows — emotional, intuitive, receptive, and deep.',
      motivates: 'Love, connection, beauty, and inner fulfillment.',
      strengths: 'Empathy, creativity, compassion, and emotional intelligence.',
      shadows: 'Moodiness, escapism, dependency, and drowning in feelings.',
      asPerson: 'The poet who cries at sunsets — deeply feeling, sometimes lost in the tide.',
      colorSet: [
        { hex: '#9a6ad9', name: 'Violet (water & sky)', meaning: 'Emotion, intuition, the unconscious', trick: '"Violet Cups hold the heart\'s tides."' },
        { hex: '#f0ece4', name: 'White & Silver (chalice)', meaning: 'Purity of feeling, spiritual love', trick: '"White cup = feelings offered openly."' },
        { hex: '#d4a853', name: 'Gold (decorations)', meaning: 'Sacred emotion, divine love', trick: '"Gold trim = love as holy."' }
      ],
      landscape: 'Waterways, pools, and horizons — the realm of feeling and reflection.',
      archetypePrefix: 'Tide'
    },
    swords: {
      suit: 'Swords',
      element: 'Air',
      behavior: 'Air cuts clean — intellectual, sharp, honest, and sometimes cold.',
      motivates: 'Truth, clarity, justice, and understanding.',
      strengths: 'Logic, communication, discernment, and moral courage.',
      shadows: 'Cruelty, anxiety, overthinking, and words that wound.',
      asPerson: 'The debater who wins arguments but loses friends — brilliant mind, sharp edges.',
      colorSet: [
        { hex: '#9f84cf', name: 'Gray-Violet (clouds & sky)', meaning: 'Mental clarity, stormy thoughts', trick: '"Violet sky = mind at work."' },
        { hex: '#f0ece4', name: 'White (clouds)', meaning: 'Pure thought, cold truth', trick: '"White clouds = ideas forming."' },
        { hex: '#c0392b', name: 'Red (accents)', meaning: 'Conflict, blood, passionate debate', trick: '"Red streak = words that cut."' }
      ],
      landscape: 'Cloudy skies and open fields — the mind\'s battlefield under heaven.',
      archetypePrefix: 'Wind'
    },
    pentacles: {
      suit: 'Pentacles',
      element: 'Earth',
      behavior: 'Earth holds steady — practical, sensual, patient, and material.',
      motivates: 'Security, craft, health, and tangible results.',
      strengths: 'Reliability, skill, abundance, and grounded wisdom.',
      shadows: 'Greed, stagnation, materialism, and fear of loss.',
      asPerson: 'The craftsperson who builds for generations — slow, solid, worth their weight in gold.',
      colorSet: [
        { hex: '#6db86d', name: 'Green (fields & gardens)', meaning: 'Growth, prosperity, nature\'s bounty', trick: '"Green Pentacles grow wealth."' },
        { hex: '#d4a853', name: 'Gold (coins)', meaning: 'Material wealth, the sacred in the mundane', trick: '"Gold coin = magic in matter."' },
        { hex: '#8B6914', name: 'Brown (earth & stone)', meaning: 'Stability, body, the physical world', trick: '"Brown ground = roots that hold."' }
      ],
      landscape: 'Gardens, cities, and countryside — the material world made visible.',
      archetypePrefix: 'Stone'
    }
  };

  const MINOR_MEANINGS = {
    wands: {
      1: ['Inspiration', 'New passion', 'Creative spark', 'Potential'],
      2: ['Planning', 'Future vision', 'Personal power', 'Discovery'],
      3: ['Expansion', 'Foresight', 'Enterprise', 'Collaboration'],
      4: ['Celebration', 'Homecoming', 'Community', 'Stability'],
      5: ['Competition', 'Conflict', 'Struggle', 'Tension'],
      6: ['Victory', 'Recognition', 'Success', 'Pride'],
      7: ['Perseverance', 'Defiance', 'Challenge', 'Conviction'],
      8: ['Speed', 'Movement', 'Action', 'Momentum'],
      9: ['Resilience', 'Courage', 'Determination', 'Boundaries'],
      10: ['Burden', 'Responsibility', 'Hard work', 'Achievement'],
      11: ['Exploration', 'Discovery', 'Free spirit', 'Messages'],
      12: ['Adventure', 'Impulsiveness', 'Passion', 'Charge'],
      13: ['Confidence', 'Warmth', 'Vivacity', 'Independence'],
      14: ['Leadership', 'Vision', 'Boldness', 'Entrepreneurship']
    },
    cups: {
      1: ['New love', 'Emotional awakening', 'Joy', 'Intuition'],
      2: ['Partnership', 'Unity', 'Mutual attraction', 'Connection'],
      3: ['Celebration', 'Friendship', 'Community', 'Abundance'],
      4: ['Contemplation', 'Apathy', 'Rest', 'Reevaluation'],
      5: ['Loss', 'Grief', 'Regret', 'Disappointment'],
      6: ['Nostalgia', 'Innocence', 'Memories', 'Kindness'],
      7: ['Choices', 'Fantasy', 'Illusion', 'Wishful thinking'],
      8: ['Walking away', 'Seeking deeper meaning', 'Disillusionment', 'Journey'],
      9: ['Contentment', 'Satisfaction', 'Wishes fulfilled', 'Gratitude'],
      10: ['Harmony', 'Family bliss', 'Emotional fulfillment', 'Legacy'],
      11: ['Creative messages', 'Intuitive spark', 'Sensitivity', 'Wonder'],
      12: ['Romance', 'Charm', 'Imagination', 'Following the heart'],
      13: ['Compassion', 'Calm', 'Emotional security', 'Intuition'],
      14: ['Emotional balance', 'Diplomacy', 'Generosity', 'Wisdom']
    },
    swords: {
      1: ['Breakthrough', 'Clarity', 'Truth', 'New idea'],
      2: ['Difficult choice', 'Stalemate', 'Denial', 'Balance'],
      3: ['Heartbreak', 'Sorrow', 'Grief', 'Painful truth'],
      4: ['Rest', 'Recovery', 'Contemplation', 'Truce'],
      5: ['Conflict', 'Defeat', 'Tension', 'Win at a cost'],
      6: ['Transition', 'Moving on', 'Healing journey', 'Release'],
      7: ['Deception', 'Strategy', 'Stealth', 'Cleverness'],
      8: ['Restriction', 'Anxiety', 'Feeling trapped', 'Self-limitation'],
      9: ['Nightmares', 'Worry', 'Anxiety', 'Despair'],
      10: ['Painful ending', 'Betrayal', 'Rock bottom', 'Release'],
      11: ['Curiosity', 'Vigilance', 'New ideas', 'Mental agility'],
      12: ['Action', 'Impulsiveness', 'Determination', 'Charge'],
      13: ['Independence', 'Clear boundaries', 'Direct communication', 'Perceptiveness'],
      14: ['Authority', 'Intellectual power', 'Truth', 'Ethical leadership']
    },
    pentacles: {
      1: ['Opportunity', 'Prosperity', 'New venture', 'Manifestation'],
      2: ['Balance', 'Adaptability', 'Juggling priorities', 'Flexibility'],
      3: ['Teamwork', 'Skill', 'Craftsmanship', 'Collaboration'],
      4: ['Security', 'Conservation', 'Control', 'Possessiveness'],
      5: ['Hardship', 'Poverty', 'Isolation', 'Worry'],
      6: ['Generosity', 'Charity', 'Sharing wealth', 'Fairness'],
      7: ['Patience', 'Long-term vision', 'Investment', 'Perseverance'],
      8: ['Skill', 'Dedication', 'Apprenticeship', 'Mastery'],
      9: ['Abundance', 'Luxury', 'Self-sufficiency', 'Gratitude'],
      10: ['Wealth', 'Legacy', 'Family fortune', 'Long-term success'],
      11: ['Study', 'Ambition', 'New skills', 'Manifestation'],
      12: ['Hard work', 'Routine', 'Reliability', 'Steady progress'],
      13: ['Nurturing abundance', 'Practical care', 'Comfort', 'Generosity'],
      14: ['Wealth', 'Business mastery', 'Security', 'Discipline']
    }
  };

  const SUIT_LABEL = {
    wands: 'Wands',
    cups: 'Cups',
    swords: 'Swords',
    pentacles: 'Pentacles'
  };

  const NUMBER_PERSONALITY = {
    1: { pattern: 'One begins the story with a single spark.', story: 'In Tarot, one is the moment intention chooses a direction.' },
    2: { pattern: 'Two creates tension, mirroring, and choice.', story: 'In Tarot, two introduces relationship, polarity, and decisions.' },
    3: { pattern: 'Three turns potential into visible growth.', story: 'In Tarot, three is where ideas become social, creative, and embodied.' },
    4: { pattern: 'Four builds a structure that can hold energy.', story: 'In Tarot, four asks whether your foundations are supportive or confining.' },
    5: { pattern: 'Five disrupts comfort so truth can emerge.', story: 'In Tarot, five marks friction, conflict, and the cost of growth.' },
    6: { pattern: 'Six seeks restoration, reciprocity, and adjustment.', story: 'In Tarot, six is the rebalancing after tension.' },
    7: { pattern: 'Seven always asks a question before progress.', story: 'In Tarot, seven is the testing ground where intention meets doubt.' },
    8: { pattern: 'Eight channels power through skill and repetition.', story: 'In Tarot, eight shows momentum that must be directed with discipline.' },
    9: { pattern: 'Nine intensifies the lesson right before completion.', story: 'In Tarot, nine is emotional and psychological saturation.' },
    10: { pattern: 'Ten completes a cycle and reveals its consequences.', story: 'In Tarot, ten shows what a full arc produces, for better or worse.' }
  };

  function getNumberQuestionAcrossSuits(rank) {
    if (rank === 7) {
      return 'Across suits, seven tests conviction through questions: Seven of Wands asks, Can you defend yourself? Seven of Cups asks, Can you trust your dreams? Seven of Pentacles asks, Should you keep investing? Seven of Swords asks, Can you justify your actions?';
    }

    const rankLabel = RANK_NAMES[rank] || String(rank);
    return `${rankLabel} of Wands, ${rankLabel} of Cups, ${rankLabel} of Pentacles, and ${rankLabel} of Swords each express the same number through a different element. Learn the number once, then watch each suit change the tone.`;
  }

  function buildKeywordFlow(cardName, keywords, sceneText) {
    const [k1, k2, k3] = (keywords || ['Insight', 'Shift', 'Choice']).concat(['Choice']);
    return `${cardName} does not throw random words at you. The scene establishes pressure, the figure shows response, and the symbols clarify motive. That sequence naturally grows into ${k1}, ${k2}, and ${k3}.`;
  }

  function titleCase(value) {
    if (!value) return '';
    return value
      .toString()
      .replace(/[-_]/g, ' ')
      .split(' ')
      .filter(Boolean)
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  }

  function articleFor(word) {
    return /^[aeiou]/i.test(String(word || '').trim()) ? 'an' : 'a';
  }

  function deriveEnvironmentCue(landscapeText) {
    const t = String(landscapeText || '').toLowerCase();
    if (!t) return 'open threshold';
    if (t.includes('mountain')) return 'mountains';
    if (t.includes('river') || t.includes('water') || t.includes('pool') || t.includes('sea')) return 'water';
    if (t.includes('garden') || t.includes('forest') || t.includes('wheat') || t.includes('field')) return 'garden';
    if (t.includes('desert') || t.includes('barren')) return 'desert';
    if (t.includes('temple') || t.includes('cathedral') || t.includes('throne')) return 'sacred architecture';
    if (t.includes('sky') || t.includes('cloud')) return 'open sky';
    return 'setting';
  }

  function buildLandscapeMeaning(cardName, landscapeText, keywords) {
    const cue = deriveEnvironmentCue(landscapeText);
    const k1 = String(keywords?.[0] || 'the lesson').toLowerCase();
    const k2 = String(keywords?.[1] || 'its tension').toLowerCase();
    const cueLine = {
      mountains: 'Mountains raise the emotional stakes: this is hard-won perspective, not comfort.',
      water: 'Water softens edges and reveals feeling; the tone becomes reflective, intuitive, and vulnerable.',
      garden: 'A garden suggests cultivation, choice, and consequence, what you tend here will grow.',
      desert: 'A sparse horizon strips away distraction so only the core conflict remains.',
      'sacred architecture': 'Structured architecture frames this moment as ritual: values are being tested, not merely displayed.',
      'open sky': 'Open sky keeps the card exposed, everything here happens in full view.',
      'open threshold': 'The scene feels like a threshold, the old mood behind you, the new mood not yet settled.'
    }[cue] || 'The environment is not decoration; it controls pace, pressure, and emotional tone.';

    return `Treat ${cardName} like a film still. Ask why this ${cue} was chosen. ${cueLine} That is why ${k1} and ${k2} feel inevitable in this card.`;
  }

  function buildCharacterIntent(meta, keywords) {
    const k1 = String(keywords?.[0] || 'the card message').toLowerCase();
    return [
      {
        aspect: 'Posture',
        detail: meta.posture,
        reveal: `${meta.name} is posed this way to communicate ${k1} instantly. If the pose changed, the story would change with it.`
      },
      {
        aspect: 'Eye Contact',
        detail: meta.gaze,
        reveal: `The gaze direction is compositional storytelling: it tells you where attention, truth, or desire is being directed.`
      },
      {
        aspect: 'Hand Gestures',
        detail: meta.hands,
        reveal: `Hands are the action grammar of tarot art, what is being received, controlled, offered, or withheld.`
      },
      {
        aspect: 'Clothing',
        detail: meta.clothing,
        reveal: `Wardrobe is coded narrative. Color and fabric reveal role, status, and spiritual temperature before any text does.`
      },
      {
        aspect: 'Facial Expression',
        detail: meta.expression,
        reveal: `Expression calibrates tone. The same symbol set with a different face would imply a different psychological reading.`
      }
    ];
  }

  function buildSymbolVisualLiteracy(metaName, symbolText, keywords) {
    const symbolName = symbolText.split(' — ')[0].split(' (')[0].trim();
    const detail = symbolText.includes(' — ') ? symbolText.split(' — ')[1].trim() : '';
    const k1 = String(keywords?.[0] || 'the core lesson').toLowerCase();
    const k2 = String(keywords?.[1] || 'the second lesson').toLowerCase();
    const prompt = `Notice ${symbolName.toLowerCase()} first. What visual cue anchors it, color, direction, repetition, or placement?`;
    const bridge = detail
      ? `In ${metaName}, that cue links to ${detail.toLowerCase()}.`
      : `In ${metaName}, track where this cue appears elsewhere in the deck and compare tone.`;
    const takeaway = `Now the symbol stops being decoration. It teaches how ${k1} and ${k2} are built through composition.`;
    return `${prompt} ${bridge} ${takeaway}`;
  }

  function buildKeywordFlow(metaName, keywords, visualAnchor) {
    const list = (keywords || []).slice(0, 4).map(k => String(k).toLowerCase());
    if (!list.length) return `${metaName} asks you to read image first, keyword second.`;
    const [k1, k2, k3 = list[0], k4 = list[1] || list[0]] = list;
    return `Read ${visualAnchor || 'the composition'} first, then the keywords unfold naturally: ${k1} creates the tension, ${k2} shows the method, ${k3} marks the turning point, and ${k4} tells you the consequence.`;
  }

  function buildMovieScene(metaName, landscapeText, keywords, baseNext) {
    const k1 = String(keywords?.[0] || 'the lesson').toLowerCase();
    const k2 = String(keywords?.[1] || 'the emotion').toLowerCase();
    return {
      setting: landscapeText,
      sounds: `You hear layered ambience first, wind, fabric, footsteps, and one sharp sound that marks ${k1}.`,
      weather: `The air matches ${k2}: it is emotionally legible before anyone speaks.`,
      moves: `A key gesture shifts the frame and reveals what the card wants from the viewer right now.`,
      emotions: `${titleCase(k1)} colliding with ${titleCase(k2)}`,
      next: baseNext || `The shot does not end cleanly; it pushes the story forward and asks what choice comes next.`
    };
  }

  function buildMemoryStory(metaName, landscapeText, keywords) {
    const k1 = String(keywords?.[0] || 'the lesson').toLowerCase();
    const k2 = String(keywords?.[1] || 'the tension').toLowerCase();
    const absurdAnchor = `Picture ${metaName} inside ${articleFor(deriveEnvironmentCue(landscapeText))} ${deriveEnvironmentCue(landscapeText)} where one impossible detail keeps repeating until you notice ${k1}.`;
    return {
      summary: `${metaName} becomes unforgettable when you treat ${k2} as the emotional weather and ${k1} as the decision point.`,
      mnemonic: `${metaName}: see it, feel it, decide it, then name it.`,
      visual: `${absurdAnchor} That repetition is your memory hook.`,
      application: `When ${metaName} appears, ask: where in my life is this same visual tension between ${k1} and ${k2}?`
    };
  }

  function buildNumerologyCrossSuit(rank, suitLabel) {
    const templates = {
      1: {
        question: 'What wants to begin?',
        suitQuestion: {
          Wands: 'What spark are you willing to act on?',
          Cups: 'What feeling is asking to be welcomed?',
          Swords: 'What truth is trying to be spoken?',
          Pentacles: 'What practical seed can you plant today?'
        }
      },
      2: {
        question: 'What needs balancing?',
        suitQuestion: {
          Wands: 'Can your passion and patience cooperate?',
          Cups: 'Can your heart stay open without losing boundaries?',
          Swords: 'Can you hold two perspectives at once?',
          Pentacles: 'Can you juggle resources without dropping purpose?'
        }
      },
      3: {
        question: 'What is trying to grow?',
        suitQuestion: {
          Wands: 'Which bold idea needs momentum?',
          Cups: 'Which relationship needs celebration and care?',
          Swords: 'Which insight needs to be articulated clearly?',
          Pentacles: 'Which project needs real-world craftsmanship?'
        }
      },
      4: {
        question: 'What needs structure?',
        suitQuestion: {
          Wands: 'Where do you need stable fuel for your fire?',
          Cups: 'Where do you need emotional safety?',
          Swords: 'Where do your thoughts need order?',
          Pentacles: 'What foundation secures your material life?'
        }
      },
      5: {
        question: 'What conflict is forcing growth?',
        suitQuestion: {
          Wands: 'Can you learn through competition instead of ego?',
          Cups: 'Can grief become honest feeling instead of collapse?',
          Swords: 'Can tension reveal what must be said?',
          Pentacles: 'Can hardship clarify what truly matters?'
        }
      },
      6: {
        question: 'What can be restored?',
        suitQuestion: {
          Wands: 'Can recognition be used with humility?',
          Cups: 'Can love be shared without possession?',
          Swords: 'Can the mind move toward calmer waters?',
          Pentacles: 'Can giving and receiving stay in balance?'
        }
      },
      7: {
        question: 'Seven always asks a question.',
        suitQuestion: {
          Wands: 'Can you defend yourself?',
          Cups: 'Can you trust your dreams?',
          Swords: 'Can you justify your actions?',
          Pentacles: 'Should you keep investing?'
        }
      },
      8: {
        question: 'What must move now?',
        suitQuestion: {
          Wands: 'Can you sustain speed without losing aim?',
          Cups: 'Can you walk away from what no longer nourishes you?',
          Swords: 'Can you notice the prison your mind built?',
          Pentacles: 'Can repetition become mastery instead of routine?'
        }
      },
      9: {
        question: 'What is nearing completion?',
        suitQuestion: {
          Wands: 'Can you hold your boundary for one more stretch?',
          Cups: 'Can you receive joy without apology?',
          Swords: 'Can you separate fear from fact?',
          Pentacles: 'Can you trust the abundance you already built?'
        }
      },
      10: {
        question: 'What cycle is ending?',
        suitQuestion: {
          Wands: 'Is this burden still yours to carry?',
          Cups: 'Can this harmony be protected over time?',
          Swords: 'Can this ending clear the way for truth?',
          Pentacles: 'What legacy are you building, not just earning?'
        }
      }
    };

    const t = templates[rank];
    if (!t) return '';
    const suitePrompt = t.suitQuestion[suitLabel] || t.question;
    return `Across tarot, ${t.question} In ${rank} of ${suitLabel}, the question becomes: ${suitePrompt}`;
  }

  function getSuitLabelForElement(element) {
    return {
      Fire: 'Wands',
      Water: 'Cups',
      Air: 'Swords',
      Earth: 'Pentacles'
    }[element] || 'Wands';
  }

  function buildElementPersonality(element) {
    const e = String(element || 'Air');
    return {
      Fire: 'Fire enters the room first, impatient, daring, and impossible to ignore. It wants movement now, not later.',
      Water: 'Water feels everything in real time, reading subtleties, bonding quickly, and remembering what others dismissed.',
      Air: 'Air dissects, compares, and questions. It wants coherence, evidence, and language precise enough to cut through fog.',
      Earth: 'Earth slows the tempo, tests what lasts, and asks for proof in results, routines, and tangible care.'
    }[e] || 'Air thinks in clean lines and asks better questions than it answers at first.';
  }

  function buildReversedProfile(name, keywords, element, suitLabel) {
    const baseKeywords = (keywords || []).map(titleCase).filter(Boolean);
    while (baseKeywords.length < 4) {
      baseKeywords.push(['Delay', 'Resistance', 'Imbalance', 'Confusion'][baseKeywords.length]);
    }

    const [k1, k2, k3, k4] = baseKeywords;
    const reversedName = `${name} reversed`;

    return {
      shadow: `${reversedName} is not just weaker upright energy. It shows distortion: sometimes absence, sometimes excess, sometimes avoidance, delay, or misdirection of ${element.toLowerCase()} force.`,
      cautions: [
        {
          aspect: 'Blocked Flow',
          detail: `Absence pattern: ${k1} goes quiet. Instead of acting, the psyche withdraws and waits for impossible certainty.`
        },
        {
          aspect: 'Overcorrection',
          detail: `Excess pattern: ${k2} overcompensates. Energy spikes, but direction blurs, so intensity replaces wisdom.`
        },
        {
          aspect: 'Avoidance',
          detail: `Avoidance and delay pattern: ${k3} is postponed through distraction, rationalization, or emotional sidestepping.`
        },
        {
          aspect: 'Misread Signals',
          detail: `Misdirection pattern: ${k4} is present, but pointed at the wrong target. Effort is real, alignment is off.`
        }
      ],
      meanings: [
        {
          keyword: k1,
          meaning: `${k1} is present, but constrained or internalized.`,
          application: 'Name the block clearly, then choose one grounded next step.'
        },
        {
          keyword: k2,
          meaning: `${k2} appears in shadow form and needs recalibration.`,
          application: 'Pause before reacting; return to the card\'s core value.'
        },
        {
          keyword: k3,
          meaning: `${k3} is asking for honest review instead of avoidance.`,
          application: 'Address what has been delayed with a simple, concrete action.'
        },
        {
          keyword: k4,
          meaning: `${k4} may be misunderstood or expressed out of proportion.`,
          application: 'Seek clarity from context, not urgency.'
        }
      ],
      readingTip: `${reversedName} in ${suitLabel} asks a diagnostic question: is this energy missing, excessive, avoided, delayed, or misdirected? Name the pattern first, then choose one corrective action.`,
      contrast: `Upright ${name} channels ${element.toLowerCase()} cleanly. Reversed ${name} keeps the same theme but shifts its psychology: impulse without aim, silence without peace, effort without alignment, or insight without embodiment.`
    };
  }

  const MAJOR_META = [
    { id: 'fool', file: 'RWS Tarot 00 Fool.jpg', name: 'The Fool', number: 0, numberLabel: '0 — The Void Before the Journey', element: 'Air', secondary: 'Spirit (infinite potential)', archetype: 'The Eternal Wanderer', unlock: 'The Fool, Keeper of Infinite Beginnings', keywords: ['New beginnings', 'Innocence', 'Leap of faith', 'Spontaneity', 'Pure potential'], numHook: '"Zero is the open door. The Fool walks through it smiling."', custom: true },
    { id: 'magician', file: 'RWS Tarot 01 Magician.jpg', name: 'The Magician', number: 1, numberLabel: 'I — The First Spark of Will', element: 'Air', secondary: 'Mercury (communication & skill)', archetype: 'The Master of Manifestation', unlock: 'The Magician, Weaver of Reality', keywords: ['Willpower', 'Manifestation', 'Skill', 'Resourcefulness', 'Focus'], numHook: '"One is the wand raised — will made visible."', symbols: ['Infinity symbol above head', 'Wand raised to sky', 'Table with four suit tools', 'Red and white robes', 'Snake belt (ouroboros)', 'Garden roses and lilies'], posture: 'Standing tall at the altar of creation', gaze: 'Direct and confident — eye contact with viewer', hands: 'As above, so below — one hand to heaven, one to earth', clothing: 'White robe (purity) beneath red cloak (worldly power)', expression: 'Calm mastery — "I have everything I need"', challenge: 'If The Magician sat with hands in his lap, he\'d become The Hermit contemplating — posture is active creation, not passive waiting.', landscape: 'A garden of roses and lilies under open sky — tools of all four suits on the table before him.', movie: 'A magician\'s garden at dawn. Bees hum. He channels lightning through his body — sky to earth — and the roses bloom in real time.', memory: 'The Magician channels will into reality — all tools present, both worlds connected.', mnemonic: 'Magic Always Needs Intent — <strong>M-A-N-I</strong>: Manifest All Needed Instruments.' },
    { id: 'high-priestess', file: 'RWS Tarot 02 High Priestess.jpg', name: 'The High Priestess', number: 2, numberLabel: 'II — The Gateway of Mystery', element: 'Water', secondary: 'Moon (intuition & cycles)', archetype: 'Guardian of the Veil', unlock: 'The High Priestess, Keeper of Hidden Wisdom', keywords: ['Intuition', 'Mystery', 'Inner knowledge', 'Sacred feminine', 'Stillness'], numHook: '"Two is the veil — what is hidden behind duality."', symbols: ['Violet veil with pomegranates', 'Torah scroll (partially hidden)', 'Crown of Isis (horns and disk)', 'Black and white pillars (Boaz & Jachin)', 'Cross on chest', 'Moon at feet'], posture: 'Seated between two pillars — throne of inner wisdom', gaze: 'Looking past us — seeing what we cannot', hands: 'Scroll held partially hidden in her lap', clothing: 'Flowing violet robes, horned crown of Isis', expression: 'Serene, enigmatic — secrets kept with love', challenge: 'If she stood and revealed the full scroll, she\'d become The Hierophant teaching openly — her power is in what she withholds.', landscape: 'Temple entrance between black and white pillars, veil behind her, calm water at her feet.', movie: 'Moonlit temple. Silence except for water lapping. She sits between worlds — the veil ripples but never lifts completely.', memory: 'The High Priestess trusts the unseen — intuition over explanation, mystery as sacred.', mnemonic: 'Hidden Insights Guide Hidden Secrets — trust the <strong>H-I-G-H</strong> voice within.' },
    { id: 'empress', file: 'RWS Tarot 03 Empress.jpg', name: 'The Empress', number: 3, numberLabel: 'III — The Creative Force', element: 'Earth', secondary: 'Venus (love & beauty)', archetype: 'Guardian of Growth', unlock: 'The Empress, Mother of Abundance', keywords: ['Fertility', 'Nurture', 'Abundance', 'Nature', 'Creativity'], numHook: '"Three is creation. The Empress is creation made visible."', symbols: ['Venus symbol on heart-shaped shield', 'Crown of twelve stars', 'Wheat in foreground', 'Flowing river', 'Pomegranate-patterned pillows', 'Scepter'], posture: 'Reclined on cushions — relaxed, receptive, regal', gaze: 'Soft, welcoming — maternal warmth toward viewer', hands: 'One holds scepter of authority; the other rests openly', clothing: 'Rich white gown with pomegranate pattern — fertility symbols', expression: 'Content, loving, deeply present in her body', challenge: 'If she stood rigidly with clenched fists, she\'d lose her nurturing openness — her power flows from ease, not force.', landscape: 'Lush forest, flowing river, golden wheat — a living paradise.', movie: 'A sun-dappled forest throne. Birds sing. Wheat ripples. Everything she touches seems to grow — including your courage.', memory: 'The Empress nurtures what she loves — abundance flows from care, not control.', mnemonic: 'Every Mother Instinct Generates Rich Harvests — <strong>E-M-P-R-E-S-S</strong> creates.' },
    { id: 'emperor', file: 'RWS Tarot 04 Emperor.jpg', name: 'The Emperor', number: 4, numberLabel: 'IV — The Architect of Order', element: 'Fire', secondary: 'Aries (leadership & initiative)', archetype: 'The Sovereign Builder', unlock: 'The Emperor, Lord of Structure', keywords: ['Authority', 'Structure', 'Stability', 'Father figure', 'Logic'], numHook: '"Four corners hold the temple — The Emperor is that temple."', symbols: ['Stone throne with ram heads', 'Ankh scepter', 'Orb of dominion', 'Red robes over armor', 'Barren mountains', 'Crown'], posture: 'Seated firmly on stone throne — immovable authority', gaze: 'Direct, commanding — meets your eyes without flinching', hands: 'Ankh in right hand (life), orb in left (worldly rule)', clothing: 'Red robes of passion over armor of protection', expression: 'Stern but fair — the face of necessary order', challenge: 'If he slouched casually, he\'d become The Fool — his rigid posture IS his message: structure holds civilization.', landscape: 'Barren orange mountains — civilization carved from harsh terrain.', movie: 'A mountaintop fortress. Wind howls. He doesn\'t blink. Order is not comfortable — it is necessary.', memory: 'The Emperor builds frameworks that last — boundaries create safety.', mnemonic: 'Establish Masterful Power Efficiently — <strong>E-M-P-E-R-O-R</strong> rules with reason.' },
    { id: 'hierophant', file: 'RWS Tarot 05 Hierophant.jpg', name: 'The Hierophant', number: 5, numberLabel: 'V — The Bridge of Tradition', element: 'Earth', secondary: 'Taurus (values & stability)', archetype: 'The Sacred Teacher', unlock: 'The Hierophant, Voice of Tradition', keywords: ['Tradition', 'Spiritual wisdom', 'Institutions', 'Guidance', 'Conformity'], numHook: '"Five breaks comfort — tradition must adapt or crack."', symbols: ['Triple crown (three worlds)', 'Papal cross keys', 'Two monks (student & teacher)', 'Pillars of temple', 'Raised hand in blessing', 'Crossed keys at feet'], posture: 'Seated on throne between pillars — institutional authority', gaze: 'Downward toward supplicants — teacher addressing students', hands: 'Right raised in blessing; left holding triple cross', clothing: 'Elaborate papal vestments — ritual made visible', expression: 'Solemn wisdom — the weight of centuries', challenge: 'If he stepped down to walk among the monks equally, he\'d become The Star\'s free spirit — his role requires elevation.', landscape: 'Grey temple interior — stone, ritual, the architecture of belief.', movie: 'Incense fills a cathedral. Chanting echoes. Two seekers kneel — he holds the keys they cannot yet turn themselves.', memory: 'The Hierophant connects you to lineage — learn the rules before you break them wisely.', mnemonic: 'Holy Instruction Encourages Religious Observance — sacred <strong>paths</strong> have guides.' },
    { id: 'lovers', file: 'RWS Tarot 06 Lovers.jpg', name: 'The Lovers', number: 6, numberLabel: 'VI — The Sacred Choice', element: 'Air', secondary: 'Gemini (duality & connection)', archetype: 'The Choosers', unlock: 'The Lovers, Guardians of the Heart\'s Decision', keywords: ['Love', 'Union', 'Choice', 'Values', 'Harmony'], numHook: '"Six is the gift returned — love given and received."', symbols: ['Angel Raphael above', 'Naked man and woman', 'Tree of Knowledge (snake & apples)', 'Tree of Life (flames)', 'Mountain between them'], posture: 'Standing together — equal, exposed, choosing', gaze: 'Looking at each other — and the angel above', hands: 'Open, reaching — vulnerability as strength', clothing: 'None — naked truth before choice', expression: 'Trust, desire, and the gravity of decision', challenge: 'If they turned away from each other, the card becomes the Two of Swords — indecision instead of union.', landscape: 'Eden-like garden with two trees — knowledge and life side by side.', movie: 'A garden at the moment of choice. An angel speaks without words. Two hearts beat louder than the snake hisses.', memory: 'The Lovers ask: does this align with your deepest values? Love is a choice, not just a feeling.', mnemonic: 'Love Offers Vital Emotional Resonance — choose with your whole <strong>heart</strong>.' },
    { id: 'chariot', file: 'RWS Tarot 07 Chariot.jpg', name: 'The Chariot', number: 7, numberLabel: 'VII — The Triumph of Will', element: 'Water', secondary: 'Cancer (protection & determination)', archetype: 'The Victorious Warrior', unlock: 'The Chariot, Driver of Destiny', keywords: ['Determination', 'Victory', 'Control', 'Willpower', 'Direction'], numHook: '"Seven asks: are you sure? The Chariot answers: yes, and I\'m moving."', symbols: ['Star canopy (celestial guidance)', 'Black and white sphinxes', 'Square on chest (four elements)', 'Crown laurels', 'City walls behind', 'No reins — will controls beasts'], posture: 'Standing in chariot — upright, armored, in command', gaze: 'Forward — eyes on the horizon of victory', hands: 'No reins — pure will directs the sphinxes', clothing: 'Armor beneath robes — protected but mobile', expression: 'Focused triumph — battle won through discipline', challenge: 'If he slumped exhausted, he\'d be the Four of Swords — rest after battle, not the charge itself.', landscape: 'River behind, city walls, open road ahead — leaving safety for conquest.', movie: 'Sphinxes pull without reins. Stars blaze overhead. The chariot doesn\'t swerve — will is the only steering wheel.', memory: 'The Chariot wins by mastering opposing forces — hold the reins of your inner conflict.', mnemonic: 'Charge Hard And Ride Intently Over Trouble — drive your <strong>will</strong> forward.' },
    { id: 'strength', file: 'RWS Tarot 08 Strength.jpg', name: 'Strength', number: 8, numberLabel: 'VIII — The Gentle Power', element: 'Fire', secondary: 'Leo (courage & heart)', archetype: 'The Lion Tamer', unlock: 'Strength, Mistress of Inner Courage', keywords: ['Courage', 'Patience', 'Compassion', 'Inner strength', 'Influence'], numHook: '"Eight is speed with purpose — but Strength chooses soft power."', symbols: ['Woman closing lion\'s jaws gently', 'Infinity symbol above head', 'White robe with flowers', 'Green landscape', 'Lion\'s tail between legs'], posture: 'Standing calm beside the lion — unafraid, unhurried', gaze: 'Gentle downward look at the lion — compassion, not dominance', hands: 'Closing the lion\'s jaws with bare hands — no weapons', clothing: 'White robe adorned with flowers — strength without armor', expression: 'Serene confidence — power that needs no proof', challenge: 'If she raised a sword instead, she\'d be Justice — Strength wins through heart, not blade.', landscape: 'Soft green hills under golden sky — nature tamed by love.', movie: 'A meadow. A lion roars. She smiles and closes its jaws with her hands. The infinity symbol glows — endless gentle power.', memory: 'Strength is soft control — courage that doesn\'t need to roar.', mnemonic: 'Soft Touch Reaches Every Noble Gesture — tame the beast with <strong>love</strong>.' },
    { id: 'hermit', file: 'RWS Tarot 09 Hermit.jpg', name: 'The Hermit', number: 9, numberLabel: 'IX — The Lantern of Truth', element: 'Earth', secondary: 'Virgo (analysis & service)', archetype: 'The Solitary Seeker', unlock: 'The Hermit, Bearer of Inner Light', keywords: ['Solitude', 'Introspection', 'Guidance', 'Wisdom', 'Search'], numHook: '"Nine is the last breath before the crown — The Hermit breathes alone."', symbols: ['Lantern with six-pointed star', 'Staff of pilgrimage', 'Grey hooded robe', 'Mountain peak', 'Snow', 'Downcast gaze'], posture: 'Standing on mountain peak — elevated solitude', gaze: 'Looking down at the path — illuminating where others walk', hands: 'Right holds lantern high; left grips pilgrim\'s staff', clothing: 'Grey monk\'s robe — humility and withdrawal from world', expression: 'Wise, weary, peaceful — one who has seen enough', challenge: 'If he joined a crowd, he\'d become The Fool beginning again — his gift requires distance.', landscape: 'Snow-capped peak, grey sky — the heights of introspection.', movie: 'Blizzard on a mountain. One lantern bobs in the dark. He doesn\'t call out — but if you look, you\'ll find your way.', memory: 'The Hermit lights the path by walking alone — go inward to see outward clearly.', mnemonic: 'Hold Every Reflective Moment In Thought — seek the <strong>inner</strong> lantern.' },
    { id: 'wheel-of-fortune', file: 'RWS Tarot 10 Wheel of Fortune.jpg', name: 'Wheel of Fortune', number: 10, numberLabel: 'X — The Turning of Fate', element: 'Fire', secondary: 'Jupiter (expansion & luck)', archetype: 'The Spinner of Destiny', unlock: 'Wheel of Fortune, Turner of Tides', keywords: ['Cycles', 'Destiny', 'Turning point', 'Luck', 'Change'], numHook: '"Ten is completion — the wheel completes and begins again."', symbols: ['Wheel with alchemical symbols (TORA/TARO/ROTA)', 'Sphinx atop wheel', 'Snake descending (Typhon)', 'Anubis rising', 'Four winged creatures in corners', 'Clouds'], posture: 'No central figure — the wheel itself is the protagonist', gaze: 'Sphinx faces forward — riddle of fate unanswered', hands: 'Sword held by sphinx — fate has teeth', clothing: 'N/A — archetypal creatures wear nature\'s symbols', expression: 'The wheel turns regardless of your preference', challenge: 'If the wheel stopped moving, time would end — its motion IS the lesson.', landscape: 'Clouds and sky — fate operates above human ground.', movie: 'Thunder. The wheel spins. Anubis rises as the snake falls. You are not the wheel — but you are on it.', memory: 'What rises must fall; what falls will rise — ride the cycle without clinging.', mnemonic: 'Wheel Of Fortune Turns — when you\'re down, <strong>up</strong> is coming.' },
    { id: 'justice', file: 'RWS Tarot 11 Justice.jpg', name: 'Justice', number: 11, numberLabel: 'XI — The Scales of Truth', element: 'Air', secondary: 'Libra (balance & fairness)', archetype: 'The Fair Judge', unlock: 'Justice, Arbiter of Truth', keywords: ['Fairness', 'Truth', 'Law', 'Cause and effect', 'Accountability'], numHook: '"Eleven reduces to two — duality weighed on scales."', symbols: ['Scales in right hand', 'Upright sword in left', 'Purple veil', 'Crown', 'Red robe', 'Square clasp (four elements)', 'Pillars'], posture: 'Seated upright on throne — formal, balanced, alert', gaze: 'Direct — sees through deception without anger', hands: 'Scales measure; sword delivers consequence', clothing: 'Red robe (action) with green mantle (growth through law)', expression: 'Neutral, precise — emotion doesn\'t sway the scales', challenge: 'If she lowered the sword, she\'d be the High Priestess holding secrets — Justice acts on what is known.', landscape: 'Throne room between pillars — the court of cosmic law.', movie: 'Silence in the courtroom of the universe. The scales tremble. The sword waits. Your actions are already weighed.', memory: 'Justice reminds: every choice has consequence — act with integrity.', mnemonic: 'Just Actions Require Integrity — the <strong>scales</strong> never lie.' },
    { id: 'hanged-man', file: 'RWS Tarot 12 Hanged Man.jpg', name: 'The Hanged Man', number: 12, numberLabel: 'XII — The Sacred Pause', element: 'Water', secondary: 'Neptune (surrender & transcendence)', archetype: 'The Willing Sacrifice', unlock: 'The Hanged Man, Seer in Suspension', keywords: ['Surrender', 'New perspective', 'Pause', 'Sacrifice', 'Letting go'], numHook: '"Twelve is three times four — spirit suspended in matter."', symbols: ['Tree of living wood (Tau cross)', 'Halo of enlightenment', 'Leg crossed in number 4 shape', 'Bound foot (not hands)', 'Serene expression', 'Hidden hands behind back'], posture: 'Hanging upside down by one foot — voluntary suspension', gaze: 'Peaceful, open — seeing the world inverted and finding truth', hands: 'Hidden behind back — surrender, not struggle', clothing: 'Simple violet tunic and red pants — no status symbols', expression: 'Blissful acceptance — enlightenment in discomfort', challenge: 'If he struggled to free himself, he\'d be the Eight of Swords — trapped by fear, not choosing pause.', landscape: 'Living tree, green leaves — sacrifice that nourishes growth.', movie: 'Upside down. Blood rushes to his head. He smiles. The halo glows. Everything you thought was wrong is suddenly clear.', memory: 'The Hanged Man gains wisdom by stopping — surrender to see differently.', mnemonic: 'Hang And Notice Growth — pause to gain <strong>perspective</strong>.' },
    { id: 'death', file: 'RWS Tarot 13 Death.jpg', name: 'Death', number: 13, numberLabel: 'XIII — The Threshold of Transformation', element: 'Water', secondary: 'Scorpio (transformation & rebirth)', archetype: 'The Reaper of Change', unlock: 'Death, Herald of Transformation', keywords: ['Endings', 'Transformation', 'Transition', 'Release', 'Rebirth'], numHook: '"Thirteen frightens — but it transforms."', symbols: ['Skeleton knight on white horse', 'Black banner with white rose', 'Fallen king', 'Bishop praying', 'Child and maiden', 'Two towers', 'Sun setting between towers'], posture: 'Skeleton rides upright — inevitable, unstoppable motion', gaze: 'Forward — Death doesn\'t look back', hands: 'Black flag with white rose — beauty in endings', clothing: 'Armor of bones — stripped to essence', expression: 'No malice — neutral force of nature', challenge: 'If the skeleton dismounted to comfort the king, it would delay necessary change — Death moves on.', landscape: 'River, sun setting, distant towers — the end of a day, a life, an era.', movie: 'Hooves on cobblestones. A rose on a black flag. Everyone meets the rider eventually — and something new grows where the old fell.', memory: 'Death ends what must end so transformation can begin — not literal death, but necessary closure.', mnemonic: 'Doorways Enable A Transforming Horizon — endings open <strong>new</strong> paths.' },
    { id: 'temperance', file: 'RWS Tarot 14 Temperance.jpg', name: 'Temperance', number: 14, numberLabel: 'XIV — The Alchemist\'s Flow', element: 'Fire', secondary: 'Sagittarius (purpose & integration)', archetype: 'The Divine Mixer', unlock: 'Temperance, Angel of Balance', keywords: ['Balance', 'Moderation', 'Patience', 'Purpose', 'Healing'], numHook: '"Fourteen reduces to five — change through balanced flow."', symbols: ['Angel with one foot in water, one on land', 'Pouring water between two cups', 'Triangle on chest', 'Iris flowers', 'Golden path to mountains', 'Sun on horizon'], posture: 'Standing balanced between elements — one foot wet, one dry', gaze: 'Downward at the flowing cups — focused on the work', hands: 'Pouring water in impossible flow — alchemy in action', clothing: 'Simple white robe with triangle (fire element) on chest', expression: 'Patient, serene — eternity in a single pour', challenge: 'If she spilled the cups in haste, she\'d be the Tower — imbalance destroys.', landscape: 'Pool, path, distant mountains crowned with light — the long road of integration.', movie: 'Water flows upward between cups. One foot in the stream, one on the shore. The angel never rushes — and neither should you.', memory: 'Temperance blends opposites with patience — moderation is magic.', mnemonic: 'Take Every Moment Patiently — blend fire and water with <strong>grace</strong>.' },
    { id: 'devil', file: 'RWS Tarot 15 Devil.jpg', name: 'The Devil', number: 15, numberLabel: 'XV — The Chain of Shadow', element: 'Earth', secondary: 'Capricorn (materialism & ambition)', archetype: 'The Tempter', unlock: 'The Devil, Mirror of Bondage', keywords: ['Bondage', 'Shadow self', 'Addiction', 'Materialism', 'Temptation'], numHook: '"Fifteen reduces to six — distorted love becomes attachment."', symbols: ['Baphomet figure on black pedestal', 'Inverted pentagram on forehead', 'Torch pointing down', 'Naked chained man and woman', 'Loose chains (can be removed)', 'Grapes and fire tail'], posture: 'Seated on throne — dominating but static', gaze: 'Direct, hypnotic — the stare of fixation', hands: 'Right raised, left holding torch — illuminating shadows downward', clothing: 'None on the figures — exposed vulnerability and shame', expression: 'The Devil smirks; the chained figures look ashamed but stay', challenge: 'If the couple walked away, chains would fall — bondage here is chosen, not forced.', landscape: 'Black void — no horizon, no escape visible except the choice to leave.', movie: 'Smoke and chains clink. The torch burns downward. But look closely — the chains are loose. The door was never locked.', memory: 'The Devil shows where you feel trapped but could leave — shadow work, not evil.', mnemonic: 'Distorted Evil Victimizes Intentionally — face your <strong>chains</strong>.' },
    { id: 'tower', file: 'RWS Tarot 16 Tower.jpg', name: 'The Tower', number: 16, numberLabel: 'XVI — The Lightning of Truth', element: 'Fire', secondary: 'Mars (destruction & awakening)', archetype: 'The Shattered Fortress', unlock: 'The Tower, Breaker of Illusions', keywords: ['Upheaval', 'Revelation', 'Chaos', 'Awakening', 'Breakthrough'], numHook: '"Sixteen reduces to seven — the false structure cannot stand."', symbols: ['Lightning striking crown tower', 'Flames bursting from windows', 'Falling figures', '22 flames (Major Arcana)', 'Yod-shaped flames', 'Dark sky', 'Crown toppling'], posture: 'Figures falling headfirst — sudden, violent disruption', gaze: 'Shock — the moment before acceptance', hands: 'Flailing — no control in free fall', clothing: 'Everyday dress — this could be anyone', expression: 'Terror and awakening simultaneously', challenge: 'If the tower stood unharmed, false beliefs would remain — destruction IS the gift.', landscape: 'Black sky, no ground visible — total disorientation.', movie: 'Lightning splits the sky. The crown flies. You fall — and for the first time, you see the ground was never where you thought.', memory: 'The Tower destroys what was never solid — painful but liberating truth.', mnemonic: 'Truth Obliterates Weak Ego Routines — lightning reveals <strong>reality</strong>.' },
    { id: 'star', file: 'RWS Tarot 17 Star.jpg', name: 'The Star', number: 17, numberLabel: 'XVII — The Light After Darkness', element: 'Air', secondary: 'Aquarius (hope & renewal)', archetype: 'The Healing Light', unlock: 'The Star, Beacon of Hope', keywords: ['Hope', 'Renewal', 'Inspiration', 'Serenity', 'Faith'], numHook: '"Seventeen reduces to eight — hope moves with purpose."', symbols: ['Large star with seven smaller stars', 'Naked woman kneeling', 'Two water pitchers (land and pool)', 'Ibis tree (naked woman)', 'Bird in tree', 'Eight-pointed stars'], posture: 'Kneeling — humble, open, pouring', gaze: 'Upward at the stars — faith in something greater', hands: 'Pouring water onto land and into pool — nourishing both worlds', clothing: 'None — vulnerable authenticity after the Tower\'s destruction', expression: 'Peaceful, renewed — calm after catastrophe', challenge: 'If she covered herself and hid, hope would dim — The Star requires naked trust.', landscape: 'Pool under starry sky, green land, one foot in water — integration restored.', movie: 'After the storm, stars emerge. She pours water onto scorched earth. It steams, then blooms. Hope is not naive — it is brave.', memory: 'The Star appears after destruction — hope is the reward for surviving the Tower.', mnemonic: 'Shining Trust Awakens Renewal — look <strong>up</strong> after the fall.' },
    { id: 'moon', file: 'RWS Tarot 18 Moon.jpg', name: 'The Moon', number: 18, numberLabel: 'XVIII — The Realm of Illusion', element: 'Water', secondary: 'Pisces (dreams & the unconscious)', archetype: 'The Dream Walker', unlock: 'The Moon, Guide Through the Dark', keywords: ['Illusion', 'Intuition', 'Fear', 'Unconscious', 'Dreams'], numHook: '"Eighteen reduces to nine — the unconscious near completion."', symbols: ['Full moon with face', 'Two towers', 'Dog and wolf howling', 'Crayfish emerging from pool', 'Winding path', 'Fifteen yods falling'], posture: 'No human figure — we walk the path as the viewer', gaze: 'The moon\'s face watches — unsettling, knowing', hands: 'N/A — creatures react to lunar pull', clothing: 'N/A — dreamscape', expression: 'Unease, mystery, the familiar made strange', challenge: 'If the path were straight and sunlit, this would be The Sun — The Moon requires navigating confusion.', landscape: 'Pool, path between towers, distant mountains — the landscape of dreams.', movie: 'Howling. The moon grins. Something crawls from the water. The path winds on — you must walk it without seeing the end.', memory: 'The Moon warns: not everything is as it seems — trust intuition through fear.', mnemonic: 'Mystery Opens Over Night — walk the path through <strong>uncertainty</strong>.' },
    { id: 'sun', file: 'RWS Tarot 19 Sun.jpg', name: 'The Sun', number: 19, numberLabel: 'XIX — The Radiance of Joy', element: 'Fire', secondary: 'Sun (vitality & success)', archetype: 'The Radiant Child', unlock: 'The Sun, Bringer of Joy', keywords: ['Joy', 'Success', 'Vitality', 'Clarity', 'Celebration'], numHook: '"Nineteen reduces to one — pure positive energy reborn."', symbols: ['Sun with face and rays', 'Naked child on white horse', 'Red banner', 'Sunflowers', 'Grey wall behind', 'Four sunflowers (four elements)'], posture: 'Child stands arms-open on horse — triumphant innocence', gaze: 'Forward, joyful — no fear in brightness', hands: 'Arms wide — embracing life', clothing: 'Child naked; red banner only — pure being', expression: 'Unbridled joy — the laugh after tears', challenge: 'If the child hid behind the wall, joy would be private — The Sun demands open celebration.', landscape: 'Sunflowers, low wall, brilliant sky — warmth without threat.', movie: 'Blinding golden light. A child laughs on a white horse. Sunflowers turn to follow. Everything is simply, overwhelmingly okay.', memory: 'The Sun is clarity and joy — success visible to all, warmth shared freely.', mnemonic: 'Shining Unclouded Nightlight — pure <strong>joy</strong> after darkness.' },
    { id: 'judgement', file: 'RWS Tarot 20 Judgement.jpg', name: 'Judgement', number: 20, numberLabel: 'XX — The Call to Rise', element: 'Fire', secondary: 'Pluto (rebirth & awakening)', archetype: 'The Awakened Caller', unlock: 'Judgement, Voice of Awakening', keywords: ['Rebirth', 'Inner calling', 'Absolution', 'Awakening', 'Reckoning'], numHook: '"Twenty reduces to two — a new duality: answer or ignore the call."', symbols: ['Archangel Gabriel with trumpet', 'Flag with red cross', 'Rising naked figures (family)', ' Coffins/tombstones', 'Mountains', 'Outstretched arms'], posture: 'Figures rising arms-up — resurrection posture', gaze: 'Upward toward the angel — answering the call', hands: 'Arms open to heaven — receptive to judgement', clothing: 'None — souls bare before the divine', expression: 'Awakening, wonder, relief — second chances', challenge: 'If they stayed in coffins, the call went unanswered — this card is about rising when summoned.', landscape: 'Grey water, mountains, tombs — the border between death and new life.', movie: 'A trumpet blasts. Coffins crack. People rise with arms open, weeping with joy. You hear your name — will you answer?', memory: 'Judgement is your higher self calling — forgive, release, and rise.', mnemonic: 'Just Understand Divinegement\'s Calling — rise when <strong>called</strong>.' },
    { id: 'world', file: 'RWS Tarot 21 World.jpg', name: 'The World', number: 21, numberLabel: 'XXI — The Dance of Completion', element: 'Earth', secondary: 'Saturn (completion & mastery)', archetype: 'The Cosmic Dancer', unlock: 'The World, Dancer at the Center', keywords: ['Completion', 'Integration', 'Achievement', 'Wholeness', 'Travel'], numHook: '"Twenty-one is the full journey — The Fool returns transformed."', symbols: ['Dancing figure in laurel wreath', 'Purple sash (infinity)', 'Four creatures in corners (evangelists)', 'Wands in each hand', 'Wreath (victory)', 'Cloud background'], posture: 'Dancing inside the wreath — active completion, not passive rest', gaze: 'Sideways, free — seeing past and future simultaneously', hands: 'Two wands — balance of forces mastered', clothing: 'Purple sash alone — freedom within achievement', expression: 'Serene triumph — the journey\'s reward', challenge: 'If the dancer stopped moving, completion would stagnate — The World dances eternally.', landscape: 'Cosmic clouds, four corners of creation — the entire universe as stage.', movie: 'She dances at the center of everything. The four guardians watch. The wreath closes and opens — the Fool\'s journey complete, ready to begin again.', memory: 'The World is wholeness — all pieces integrated, the hero\'s journey complete.', mnemonic: 'Whole Achievement Reaches Life\'s Destination — you are <strong>complete</strong>.' }
  ];

  function buildMajorCard(meta) {
    const n = meta.number;
    const numThemes = {
      0: { meaning: 'Zero is the <em>space before the first step</em> — infinite potential, neither beginning nor end.', why: 'Every journey starts in not-knowing. Zero holds all possibilities.', expression: `${meta.name} embodies this number\'s energy through Pamela Colman Smith\'s iconic imagery.` },
      1: { meaning: 'One is unity — the first spark, singular focus, "I AM."', why: 'Before two there must be one. Will precedes manifestation.', expression: `${meta.name} concentrates all energy into a single point of power.` },
      2: { meaning: 'Two is duality — choice, partnership, the veil between worlds.', why: 'Opposites create tension and balance. Mystery lives in the space between.', expression: `${meta.name} holds two forces in delicate equilibrium.` },
      3: { meaning: 'Three is creation — expression, growth, the visible result of union.', why: 'Two become three: idea becomes form.', expression: `${meta.name} shows creation made manifest in the physical world.` },
      4: { meaning: 'Four is structure — stability, foundation, the four corners.', why: 'Creation needs a container. Four builds the temple.', expression: `${meta.name} establishes order from chaos.` },
      5: { meaning: 'Five is disruption — challenge, conflict, the crack where light enters.', why: 'Comfort must break for growth. Five is the catalyst.', expression: `${meta.name} navigates the tension of change.` },
      6: { meaning: 'Six is harmony — reciprocity, healing, the gift returned.', why: 'After conflict comes balance. Six restores flow.', expression: `${meta.name} finds beauty in connection and choice.` },
      7: { meaning: 'Seven is reflection — assessment, inner work, spiritual testing.', why: 'The mystic number asks: what do you truly believe?', expression: `${meta.name} demands conviction before victory.` },
      8: { meaning: 'Eight is momentum — power in motion, mastery through action.', why: 'Ideas must move. Eight is the engine.', expression: `${meta.name} channels force with precision.` },
      9: { meaning: 'Nine is culmination — near-completion, intensity before the end.', why: 'The last solo digit holds maximum energy before returning to one.', expression: `${meta.name} stands at the threshold of transformation.` },
      10: { meaning: 'Ten is completion — the full cycle of the number, ready to begin again.', why: '1+0=1 — endings seed new beginnings.', expression: `${meta.name} closes one chapter and opens the next.` },
      11: { meaning: 'Eleven is master intuition — duality (1+1=2) elevated to illumination.', why: 'The first master number: insight beyond logic.', expression: `${meta.name} weighs truth with inner and outer vision.` },
      12: { meaning: 'Twelve is cosmic order — 3×4, spirit woven through matter.', why: 'Zodiac months, apostles, hours — twelve organizes the sacred.', expression: `${meta.name} finds enlightenment through surrender.` },
      13: { meaning: 'Thirteen transforms — feared but necessary, death before rebirth.', why: 'Beyond twelve lies change. Thirteen breaks the old cycle.', expression: `${meta.name} clears the ground for new growth.` },
      14: { meaning: 'Fourteen integrates — 1+4=5, change through balanced alchemy.', why: 'Tempering opposites creates the philosopher\'s gold.', expression: `${meta.name} flows between extremes with grace.` },
      15: { meaning: 'Fifteen distorts — 1+5=6, love twisted into attachment.', why: 'Shadow side of harmony: obsession and bondage.', expression: `${meta.name} reveals where we choose our chains.` },
      16: { meaning: 'Sixteen shatters — 1+6=7, false structures cannot pass the test.', why: 'What is built on lies must fall.', expression: `${meta.name} destroys illusions in one lightning strike.` },
      17: { meaning: 'Seventeen hopes — 1+7=8, renewal with purposeful momentum.', why: 'After destruction, the first star appears.', expression: `${meta.name} pours healing on wounded ground.` },
      18: { meaning: 'Eighteen dreams — 1+8=9, the unconscious near its peak.', why: 'The moon governs what hides beneath the surface.', expression: `${meta.name} walks the path through illusion.` },
      19: { meaning: 'Nineteen radiates — 1+9=10→1, joy reborn as pure energy.', why: 'Clarity after confusion. The sun returns.', expression: `${meta.name} celebrates life without reservation.` },
      20: { meaning: 'Twenty awakens — 2+0=2, a new choice at the soul level.', why: 'The call to rise: answer or remain asleep.', expression: `${meta.name} summons rebirth and absolution.` },
      21: { meaning: 'Twenty-one completes — 2+1=3, the full creative cycle.', why: 'The Fool who left at zero returns transformed.', expression: `${meta.name} dances at the center of all creation.` }
    };
    const nt = numThemes[n] || numThemes[1];
    const syms = (meta.symbols || []).map(s => {
      const symbolName = s.split(' — ')[0].split(' (')[0];
      const symbolDesc = s.split(' — ')[1] || s;
      return {
        icon: '🏆',
        name: symbolName,
        meaning: symbolDesc || symbolName,
        hidden: `Smith placed this symbol deliberately in ${meta.name} — look for it on the card.`,
        trick: `"${s.split(' ').slice(0, 4).join(' ')}…" — find it on the card.`
      };
    });

    const quiz = [
      { q: `What number is ${meta.name}?`, options: [`${n - 1}`, `${n}`, `${n + 1}`, 'None'], answer: 1, explain: `${meta.name} is number ${n} in the Major Arcana.` },
      { q: `What is the primary element of ${meta.name}?`, options: ['Fire', 'Water', 'Air', 'Earth'].map((e, i) => e), answer: ['Fire', 'Water', 'Air', 'Earth'].indexOf(meta.element), explain: `${meta.element} is the dominant element.` },
      { q: `Which archetype fits ${meta.name}?`, options: [meta.archetype, 'The Eternal Wanderer', 'The Fair Judge', 'The Tempter'], answer: 0, explain: `${meta.archetype} is this card's archetype title.` },
      { q: `What does the numerology hook remind us?`, options: [meta.numHook.replace(/"/g, ''), 'Numbers don\'t matter in Tarot', 'Only reversed cards have meaning', 'Elements override numbers'], answer: 0, explain: meta.numHook },
      { q: `A keyword for ${meta.name} is:`, options: [...meta.keywords, 'Indifference'], answer: 0, explain: `${meta.keywords[0]} is a core keyword.` },
      { q: `In the RWS deck, ${meta.name} belongs to:`, options: ['Minor Arcana — Wands', 'Major Arcana', 'Minor Arcana — Cups', 'Court Cards only'], answer: 1, explain: 'Major Arcana cards are the 22 trump cards numbered 0–21.' }
    ];

    return {
      id: meta.id,
      name: meta.name,
      number: n,
      numberLabel: meta.numberLabel,
      suit: 'Major Arcana',
      element: meta.element,
      image: img(meta.file),
      archetype: meta.archetype,
      unlockTitle: meta.unlock,
      keywords: meta.keywords,
      numerology: {
        meaning: nt.meaning,
        why: `${nt.why} ${buildNumerologyCrossSuit(n, getSuitLabelForElement(meta.element))}`,
        expression: `${nt.expression} In the bigger tarot story, this number behaves like a recurring character, not a one-card exception.`,
        hook: meta.numHook
      },
      colors: [
        { hex: '#d4a853', name: 'Gold & Yellow', meaning: 'Divine light, optimism, spiritual illumination', trick: '"Gold light guides the seeker."' },
        { hex: '#c0392b', name: 'Red', meaning: 'Life force, passion, action in the world', trick: '"Red means energy moves."' },
        { hex: '#9a6ad9', name: 'Violet', meaning: 'Intuition, depth, the unconscious realm', trick: '"Violet holds mystery."' },
        { hex: '#f0ece4', name: 'White', meaning: 'Purity, clarity, new beginnings', trick: '"White = truth unveiled."' }
      ],
      character: buildCharacterIntent(meta, meta.keywords),
      characterChallenge: meta.challenge,
      landscape: [],
      landscapeStory: meta.landscape,
      landscapeMeaning: buildLandscapeMeaning(meta.name, meta.landscape, meta.keywords),
      elemental: {
        dominant: meta.element,
        secondary: meta.secondary,
        behavior: buildElementPersonality(meta.element),
        motivates: SUIT_PROFILE[{ Fire: 'wands', Water: 'cups', Air: 'swords', Earth: 'pentacles' }[meta.element] || 'wands'].motivates,
        strengths: SUIT_PROFILE[{ Fire: 'wands', Water: 'cups', Air: 'swords', Earth: 'pentacles' }[meta.element] || 'wands'].strengths,
        shadows: SUIT_PROFILE[{ Fire: 'wands', Water: 'cups', Air: 'swords', Earth: 'pentacles' }[meta.element] || 'wands'].shadows,
        asPerson: SUIT_PROFILE[{ Fire: 'wands', Water: 'cups', Air: 'swords', Earth: 'pentacles' }[meta.element] || 'wands'].asPerson
      },
      symbols: syms.map(s => ({
        ...s,
        meaning: buildSymbolVisualLiteracy(meta.name, `${s.name}${s.meaning ? ` — ${s.meaning}` : ''}`, meta.keywords)
      })).length
        ? syms.map(s => ({
            ...s,
            meaning: buildSymbolVisualLiteracy(meta.name, `${s.name}${s.meaning ? ` — ${s.meaning}` : ''}`, meta.keywords)
          }))
        : [{
            icon: 'star',
            name: meta.name,
            meaning: buildSymbolVisualLiteracy(meta.name, meta.name, meta.keywords),
            hidden: 'Study the card image carefully.',
            trick: meta.numHook
          }],
      movie: buildMovieScene(meta.name, meta.landscape, meta.keywords, meta.movie),
      reversed: buildReversedProfile(meta.name, meta.keywords, meta.element, 'Major Arcana'),
      memory: buildMemoryStory(meta.name, meta.landscape, meta.keywords),
      keywordFlow: buildKeywordFlow(meta.name, meta.keywords, deriveEnvironmentCue(meta.landscape)),
      quiz,
      xpReward: 120
    };
  }

  function buildMinorCard(suitKey, rank) {
    const profile = SUIT_PROFILE[suitKey];
    const rankName = RANK_NAMES[rank];
    const name = rankName + ' of ' + profile.suit;
    const id = suitKey + '-' + rankName.toLowerCase();
    const suitFilePrefix = {
      wands: 'Wands',
      cups: 'Cups',
      swords: 'Swords',
      pentacles: 'Pents'
    }[suitKey] || profile.suit;
    const file = `${suitFilePrefix}${String(rank).padStart(2, '0')}.jpg`;
    const keywords = MINOR_MEANINGS[suitKey][rank];
    const rt = RANK_THEMES[rank];
    const courtTitle = rank >= 11 ? ['', '', 'Page', 'Knight', 'Queen', 'King'][rank - 10] : '';
    const archetype = courtTitle
      ? `${profile.archetypePrefix}${courtTitle} of ${profile.element}`
      : `${profile.archetypePrefix} ${rankName} — ${profile.element} Seed`;

    const quiz = [
      { q: `Which suit is the ${name}?`, options: ['Wands', 'Cups', 'Swords', 'Pentacles'], answer: ['wands', 'cups', 'swords', 'pentacles'].indexOf(suitKey), explain: `${profile.suit} = ${profile.element} element.` },
      { q: `What element governs ${profile.suit}?`, options: ['Fire', 'Water', 'Air', 'Earth'], answer: ['Fire', 'Water', 'Air', 'Earth'].indexOf(profile.element), explain: `${profile.suit} are the suit of ${profile.element}.` },
      { q: `A keyword for ${name}:`, options: [...keywords.slice(0, 3), 'Irrelevance'], answer: 0, explain: keywords[0] + ' captures this card\'s essence.' },
      { q: `Numerology: ${rankName} in the minors means:`, options: [rt.theme, 'Nothing specific', 'Only reversed meanings', 'Same as Major Arcana'], answer: 0, explain: rt.theme },
      { q: `The ${name} belongs to:`, options: ['Major Arcana', `Minor Arcana — ${profile.suit}`, 'The Fool\'s journey only', 'Court of Major Arcana'], answer: 1, explain: `Minor Arcana cards show daily life through the four suits.` },
      { q: `Memory hook for ${rankName}:`, options: [rt.hook, 'Numbers don\'t apply to minors', 'Only the picture matters', 'Elements change per card'], answer: 0, explain: rt.hook }
    ];

    return {
      id,
      name,
      number: rank,
      numberLabel: `${rankName} of ${profile.suit}`,
      suit: `Minor Arcana — ${profile.suit}`,
      element: profile.element,
      image: img(file),
      archetype,
      unlockTitle: `${name}, ${archetype}`,
      keywords,
      numerology: {
        meaning: `In the ${profile.suit}, ${rankName} expresses: <em>${rt.theme}</em>`,
        why: `${rankName} carries the number ${rank}'s energy through ${profile.element.toLowerCase()} experience. ${buildNumerologyCrossSuit(rank, profile.suit)}`,
        expression: `${name} shows why this number repeats its personality across suits while changing costume. Here the costume is ${profile.element.toLowerCase()} and the drama is ${keywords.join(', ').toLowerCase()}.`,
        hook: rt.hook
      },
      colors: profile.colorSet,
      character: [
        {
          aspect: 'Figures & Posture',
          detail: `Study the figures on the ${name} — their posture carries ${keywords[0].toLowerCase()} before words do.`,
          reveal: `The artist chooses this stance so the eye reads intention instantly: action posture, defensive posture, or reflective posture each tells a different story.`
        },
        {
          aspect: 'Eye Contact',
          detail: 'Notice who looks at whom — or who refuses to look.',
          reveal: 'Eye lines are narrative arrows. They reveal trust, conflict, secrecy, or disconnection.'
        },
        {
          aspect: 'Hand Gestures',
          detail: 'What are hands doing? Holding, giving, fighting, building?',
          reveal: `Hands show how ${profile.element.toLowerCase()} energy is being directed, toward creation, defense, avoidance, or repair.`
        },
        {
          aspect: 'Suit Symbols',
          detail: `${profile.suit} appear throughout — count placement, not just quantity.`,
          reveal: `Placement teaches emphasis. Central symbols feel immediate; distant symbols feel conditional or delayed.`
        },
        {
          aspect: 'Overall Mood',
          detail: `The scene feels ${keywords.slice(0, 2).join(' and ').toLowerCase()} — let tone lead interpretation.`,
          reveal: 'Mood is compositional logic. It explains why the keyword list feels inevitable.'
        }
      ],
      characterChallenge: `What would change if the main figure on the ${name} turned away from the ${profile.suit.toLowerCase()}? <em>The ${profile.element.toLowerCase()} energy would shift — perhaps becoming blocked or redirected.</em>`,
      landscape: [{ item: profile.landscape, symbol: `${profile.element} realm — the world of ${profile.suit}`, why: 'Smith painted distinct landscapes for each suit to reinforce elemental identity.' }],
      landscapeStory: `In the realm of ${profile.element.toLowerCase()}, the ${name} unfolds: ${keywords.join(', ').toLowerCase()}. ${profile.landscape} The ${rankName} reminds you — ${rt.hook.replace(/"/g, '')}`,
      landscapeMeaning: buildLandscapeMeaning(name, profile.landscape, keywords),
      elemental: {
        dominant: profile.element,
        secondary: `Minor Arcana — ${profile.suit}`,
        behavior: buildElementPersonality(profile.element),
        motivates: profile.motivates,
        strengths: profile.strengths,
        shadows: profile.shadows,
        asPerson: profile.asPerson
      },
      symbols: keywords.slice(0, 4).map((k, i) => ({
        icon: 'star',
        name: `${profile.suit} — ${k}`,
        meaning: buildSymbolVisualLiteracy(name, `${profile.suit} — ${k}`, keywords),
        hidden: `Look for visual cues of "${k}" in the ${name} illustration.`,
        trick: `"${k}" — say it when you see the card.`
      })),
      movie: buildMovieScene(name, profile.landscape, keywords, `The ${name} resolves, ${keywords[2] || keywords[0]} emerges as the lesson.`),
      reversed: buildReversedProfile(name, keywords, profile.element, `Minor Arcana — ${profile.suit}`),
      memory: buildMemoryStory(name, profile.landscape, keywords),
      keywordFlow: buildKeywordFlow(name, keywords, deriveEnvironmentCue(profile.landscape)),
      quiz,
      xpReward: 100
    };
  }

  const DECK_ORDER = [];
  const CARDS = {};

  MAJOR_META.forEach(meta => {
    DECK_ORDER.push(meta.id);
    if (!meta.custom) CARDS[meta.id] = buildMajorCard(meta);
  });

  ['wands', 'cups', 'swords', 'pentacles'].forEach(suit => {
    for (let rank = 1; rank <= 14; rank++) {
      const card = buildMinorCard(suit, rank);
      DECK_ORDER.push(card.id);
      CARDS[card.id] = card;
    }
  });

  global.TarotDeck = {
    DECK_ORDER,
    CARDS,
    TOTAL_CARDS: DECK_ORDER.length,
    getNextCardId(id) {
      const i = DECK_ORDER.indexOf(id);
      return i >= 0 && i < DECK_ORDER.length - 1 ? DECK_ORDER[i + 1] : null;
    },
    getPrevCardId(id) {
      const i = DECK_ORDER.indexOf(id);
      return i > 0 ? DECK_ORDER[i - 1] : null;
    },
    getCard(id) {
      return CARDS[id] || null;
    },
    getContinueCardId(learnedCards) {
      for (const id of DECK_ORDER) {
        if (!learnedCards.includes(id)) return id;
      }
      return DECK_ORDER[0];
    },
    getDeckProgress(learnedCards) {
      return { learned: learnedCards.length, total: DECK_ORDER.length };
    }
  };
})(typeof window !== 'undefined' ? window : globalThis);
