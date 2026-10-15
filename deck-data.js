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
        { hex: '#c0392b', name: 'Flame red', phrase: 'creative force' },
        { hex: '#f5e042', name: 'Sun yellow', phrase: 'inspiration in motion' },
        { hex: '#5a8a3c', name: 'Field green', phrase: 'growth after effort' }
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
        { hex: '#9a6ad9', name: 'Violet', phrase: 'feeling beneath the surface' },
        { hex: '#f0ece4', name: 'Chalice white', phrase: 'an open emotional offer' },
        { hex: '#d4a853', name: 'Cup gold', phrase: 'a valued bond' }
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
        { hex: '#9f84cf', name: 'Storm violet', phrase: 'thought under pressure' },
        { hex: '#f0ece4', name: 'Cloud white', phrase: 'a clear line of thought' },
        { hex: '#c0392b', name: 'Accent red', phrase: 'conflict made visible' }
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
        { hex: '#6db86d', name: 'Field green', phrase: 'growth made tangible' },
        { hex: '#d4a853', name: 'Coin gold', phrase: 'value in the hand' },
        { hex: '#8B6914', name: 'Earth brown', phrase: 'a grounded foundation' }
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

  // Minor source audit, 2026-10-15: all 56 Biddy pages and Pollack card sections
  // retrieved independently. Waite's Ace of Wands page was retrieved; the other
  // individual pages were unavailable, so all 56 primary entries and Part III §4
  // were compared in an Archive-hosted OCR reproduction of the Sacred Texts book.
  // Earlier session history does not establish prior per-card retrievals.
  // Pollack, Seventy-Eight Degrees of Wisdom, Part Two, Wands pp.25–47,
  // Cups pp.48–70, Swords pp.71–93, Pentacles pp.94–120, actual OCR text:
  // https://archive.org/download/78-degrees-of-wisdom/78%20degrees%20of%20wisdom_djvu.txt
  // Source roles: Waite anchors objects/traditional readings; Biddy supplies modern
  // applications/reversals; Pollack supplies compositional/psychological context.
  // Echoes and challenges are editorial visual comparisons, not historical claims.
  // Palette phrases paraphrase object symbolism or an explicitly labelled reading
  // association with the depicted figure/scene, never a universal rule about a hue.
  // Hex values approximate a printed edition. Location is non-display metadata.
  // Colors: [hex, meaning phrase, location, [source id, section, object, relationship?]].
  // Relationship defaults to object-symbolism; reading-association is editorial,
  // grounded in the cited card reading, not a claim that the source interprets a hue.
  // Symbols: [name, where, meaning, visual echo];
  // reversal [focus, modern reading, Waite comparison, application];
  // scenario [situation, three alternative cards]; image [question, correct, 3 distractors].
  const MINOR_LESSONS = {
    wands: {
      1: {
        figure: 'A hand reaches from a cloud and grips a living branch. No traveler has yet taken the offered staff.',
        scene: ['Leaves spring from the wand above a green valley.', 'A distant castle gives this sudden offer somewhere to grow beyond the cloud.'],
        takeaway: 'Waite links this beginning with invention and enterprise; Biddy stresses potential that still needs action.',
        challenge: 'Without the fresh leaves, would this look like a living opportunity or merely a cut stick?',
        colors: [['#edf0e6', 'an opportunity offered for development', 'cloud around the offered hand', ['biddy', 'description', 'Cloud hand']], ['#57854b', 'a beginning with room to grow', 'new leaves on the wand', ['biddy', 'description', 'Sprouting wand']], ['#b6a78b', 'the promise of future opportunities', 'castle beyond the valley', ['biddy', 'description', 'Distant castle']]],
        symbols: [['Sprouting wand', 'in the hand above the valley', 'Waite associates the living staff with creation and the start of enterprise.', 'The Page of Wands studies a similar leafy staff before acting.'], ['Cloud hand', 'at the left edge', 'Biddy describes an opportunity presented before it has been developed.', 'The Ace of Pentacles offers a coin instead of a branch.'], ['Distant castle', 'on the hill below', 'Biddy connects the far destination with possibilities requiring effort.', 'The Ten of Wands approaches a town after that effort has accumulated.']],
        symbolChoices: ['A sprouting wand', 'A laurel-crowned staff', 'A bundle of ten sticks', 'A sunflower'],
        reversal: ['An idea delayed or lacking direction', 'Biddy allows a private idea, distraction or a stalled beginning; choose one workable first step.', 'Waite gives harsher decline and also clouded joy, not simply creative delay.', 'Test the idea on a small scale before launching several projects.'],
        scenario: ['A promising creative idea arrives, but you have not made anything yet.', ['Three of Wands', 'Six of Wands', 'Ten of Wands']],
        image: ['What do the fresh leaves add to the offered staff?', 'The beginning has life and room to grow', 'The enterprise has already earned public acclaim', 'The traveler is defending an established position', 'The work has reached its final delivery']
      },
      2: {
        figure: 'A cloaked figure holds a globe on a battlement, one hand resting on a wand. Another staff is fixed to the wall.',
        scene: ['Sea and land stretch beyond the fortified terrace.', 'The figure surveys the open distance while remaining inside a secure enclosure.'],
        takeaway: 'Biddy reads future planning; Pollack also notices the tension between power already held and a life not yet entered.',
        challenge: 'If the figure stepped beyond the wall, what would change from surveying possibilities to experiencing them?',
        colors: [['#ae493d', 'planning before leaving familiar ground', 'cloak on the battlement', ['biddy', 'description', 'Surveying figure', 'reading-association']], ['#d7a848', 'possibilities beyond the present domain', 'small globe in hand', ['biddy', 'description', 'Globe']], ['#6b9eae', 'a wider life not yet entered', 'sea beyond the wall', ['pollack', 'Two, pp.45–46', 'View beyond the battlement', 'reading-association']]],
        symbols: [['Globe', 'in the figure’s raised hand', 'Biddy connects the held world with a larger field of possibilities.', 'The World surrounds a figure with a whole wreath rather than a miniature globe.'], ['Fixed wand', 'attached to the battlement', 'Biddy contrasts an established position with the urge to explore.', 'Three of Wands plants its staffs outside the fortress.'], ['Battlement', 'beneath the surveying figure', 'Pollack draws attention to security that can also keep experience at a distance.', 'Four of Pentacles likewise separates its solitary holder from the city.']],
        symbolChoices: ['A globe', 'A merchant’s scales', 'A hooded falcon', 'A sealed chalice'],
        reversal: ['Fear of leaving the planning stage', 'Biddy suggests fear of the unknown, inadequate planning or revisiting personal goals.', 'Waite lists surprise and wonder alongside trouble and fear; these are not one fixed outcome.', 'Name the specific risk and make a plan that serves your own goals.'],
        scenario: ['You have resources and are deciding whether to expand into unfamiliar territory.', ['Ace of Wands', 'Eight of Wands', 'Nine of Wands']],
        image: ['Why notice the wall as well as the globe?', 'The imagined wider life contrasts with a protected present position', 'The figure is already sailing with the ships', 'The wall proves no further choices remain', 'The globe is being awarded by a cheering crowd']
      },
      3: {
        figure: 'A merchant-like figure stands with their back to us, holding one of three planted staffs and watching ships.',
        scene: ['The high bank opens onto a broad, golden-colored sea.', 'Ships move below while the watcher remains on the shore, looking beyond immediate ground.'],
        takeaway: 'Waite explicitly connects the ships with enterprise and trade; Biddy emphasizes expansion after the first plans.',
        challenge: 'If the ships were removed, what evidence of enterprise already underway would disappear?',
        colors: [['#bd4f36', 'foresight guiding an expanding venture', 'cloak above the shore', ['biddy', 'description', 'High lookout', 'reading-association']], ['#dbbc52', 'enterprise reaching beyond its starting point', 'sea beneath the ships', ['waite', 'Part III §2', 'Trading ships', 'reading-association']], ['#4c7950', 'new exploration from a secure base', 'green fold of the garment', ['pollack', 'Three, pp.43–44', 'Standing merchant', 'reading-association']]],
        symbols: [['Trading ships', 'on the sea below the watcher', 'Waite calls them the merchant’s vessels: effort now reaches beyond the shore.', 'Six of Swords uses one boat for passage rather than commercial expansion.'], ['Three planted wands', 'around the standing figure', 'Biddy reads a prepared base from which further growth becomes possible.', 'Two of Wands keeps a staff attached to its wall.'], ['High lookout', 'above the sea', 'Biddy connects the broad view with foresight and wider opportunities.', 'Seven of Wands uses high ground to defend rather than survey.']],
        symbolChoices: ['Trading ships', 'A wreath-bearing horse', 'A pair of kneeling petitioners', 'A floating cloud of cups'],
        reversal: ['Expansion obstructed by delays or limited foresight', 'Biddy describes setbacks, playing small or failing to anticipate what expansion requires.', 'Waite instead allows the ending of troubles; his reversal need not mean a blocked venture.', 'Review the practical obstacle rather than assuming the entire venture has failed.'],
        scenario: ['Your first venture is operating and you are watching for opportunities in a wider market.', ['Two of Wands', 'Five of Wands', 'Four of Wands']],
        image: ['How do the ships distinguish this scene from the Two of Wands?', 'Plans now have visible activity beyond the starting point', 'The figure is still holding the world as a small globe', 'The ships show that every burden has been laid down', 'A crowd is publicly crowning the merchant']
      },
      4: {
        figure: 'Two figures lift bouquets beyond four upright staffs. More people gather near a large building behind them.',
        scene: ['A fruit-and-flower garland hangs across the foreground like a temporary gateway.', 'The open space between its posts leads toward a shared celebration, not a defended barricade.'],
        takeaway: 'Waite describes refuge and harvest-home; Biddy reads celebration, homecoming and a milestone shared with others.',
        challenge: 'If the garland became a locked gate, how would the welcome change?',
        colors: [['#e9d164', 'freedom from a defensive enclosure', 'open sky over the garland', ['pollack', 'Four, pp.41–42', 'Open celebration', 'reading-association']], ['#64944c', 'a milestone worth celebrating together', 'leaves across the four posts', ['biddy', 'description', 'Flower garland']], ['#d98a48', 'shared joy in a completed undertaking', 'bouquets raised by the pair', ['biddy', 'description', 'Raised bouquets']]],
        symbols: [['Flower garland', 'across the four foreground staffs', 'Biddy reads the decorated threshold as a celebration of achievement.', 'The World also frames completion with greenery, but closes it into a wreath.'], ['Raised bouquets', 'in the hands of the two celebrants', 'Waite’s harvest-home makes the welcome communal rather than solitary.', 'Three of Cups raises chalices in a similarly shared celebration.'], ['Four posts', 'forming the open foreground gateway', 'Pollack emphasizes freedom and release within this apparent structure.', 'Four of Pentacles holds its structure closed around one person.']],
        symbolChoices: ['A flower garland', 'A blindfold', 'A broken tower', 'A chain linking two figures'],
        reversal: ['A private milestone or unsettled sense of home', 'Biddy allows personal celebration, transition or friction in the group.', 'Waite explicitly keeps the favorable meaning when reversed; conflict is a modern option, not his rule.', 'Ask whether joy needs privacy or whether the household needs a clearer agreement.'],
        scenario: ['Friends gather to celebrate moving into a home after a long period of work.', ['Six of Wands', 'Nine of Wands', 'Two of Wands']],
        image: ['What makes the four posts welcoming rather than confining?', 'The garland frames an open passage toward celebrating people', 'The posts completely surround a bound prisoner', 'The celebrants are driving away defeated rivals', 'The building behind them is falling apart']
      },
      5: {
        figure: 'Five youths brandish staffs in different directions. Their separate gestures do not settle into a coordinated formation.',
        scene: ['The sticks cross above a patch of uneven ground.', 'Different clothes and competing movements make the group look busy without showing a decisive winner.'],
        takeaway: 'Waite calls this a sham fight and strenuous competition; Biddy emphasizes disagreement and competing perspectives.',
        challenge: 'If all five staffs pointed toward the same task, would the scene still read as conflict?',
        colors: [['#6d9db3', 'competition without a settled outcome', 'sky above the crossed staffs', ['waite', 'Part III §2', 'Mimic battle', 'reading-association']], ['#b54a3d', 'different perspectives competing for attention', 'one competitor’s tunic', ['biddy', 'description', 'Different garments']], ['#d2aa48', 'differences needing common ground', 'another competitor’s clothing', ['biddy', 'description', 'Contrasting outfits']]],
        symbols: [['Crossing staffs', 'above the five youths', 'Waite’s imitation battle suggests competition without requiring a lethal conflict.', 'Five of Swords shows weapons gathered after a more damaging contest.'], ['Different garments', 'on the five participants', 'Biddy connects their differences with multiple viewpoints that need coordination.', 'Three of Pentacles gives distinct participants a shared plan.'], ['Uneven stances', 'across the foreground', 'Biddy reads scattered efforts rather than an agreed direction.', 'Eight of Wands aligns its staffs in a single flight.']],
        symbolChoices: ['Crossing staffs', 'Crossed cups', 'A crown pierced by a sword', 'A coin held against a chest'],
        reversal: ['Conflict avoided, internalized or beginning to settle', 'Biddy allows inner conflict, avoidance or the release of tension; context decides which.', 'Waite retains disputes and litigation, so resolution is not guaranteed.', 'Distinguish a negotiated agreement from simply suppressing disagreement.'],
        scenario: ['Every team member has a different approach, and no one is coordinating the discussion.', ['Three of Pentacles', 'Four of Wands', 'Six of Wands']],
        image: ['Why is this not yet the aftermath shown in Five of Swords?', 'Everyone is still engaged in the contest and no winner is established', 'All weapons have been surrendered to one person', 'The group is following one agreed building plan', 'The scene contains no competing movements']
      },
      6: {
        figure: 'A rider on a white horse rises above a walking crowd. A wreath crowns the rider and another circles the raised staff.',
        scene: ['The horse moves through people carrying wands.', 'The elevated rider and paired wreaths turn an achievement into a public occasion.'],
        takeaway: 'Waite describes a victor and welcome news; Biddy stresses recognition and confidence earned through progress.',
        challenge: 'Without the surrounding people, would this still look like public recognition?',
        colors: [['#eee9d6', 'an adventure progressing successfully', 'horse beneath the rider', ['biddy', 'description', 'White horse']], ['#b44a3f', 'achievement acknowledged by others', 'rider’s celebratory cloak', ['biddy', 'description', 'Rider and crowd', 'reading-association']], ['#57854b', 'success crowned with recognition', 'laurel around the staff', ['waite', 'Part III §2', 'Laurel wreath']]],
        symbols: [['Laurel wreath', 'around the top of the raised wand', 'Waite reads victory and expectation crowned with its desire.', 'The Ace of Swords places its crown directly on the blade.'], ['White horse', 'beneath the central rider', 'Biddy notes how the rider is made visible to the supporting crowd.', 'Death’s pale horse carries an entirely different procession.'], ['Walking crowd', 'beside and behind the horse', 'Biddy locates recognition in a social setting, not just private satisfaction.', 'Nine of Cups displays satisfaction with no companions present.']],
        symbolChoices: ['A laurel wreath', 'A hanging lantern', 'A fish in a cup', 'A rose-covered blindfold'],
        reversal: ['Recognition turns inward or becomes a need for applause', 'Biddy includes private achievement, wounded confidence and ego-driven recognition.', 'Waite emphasizes fear, disloyalty and delay instead of a private definition of success.', 'Decide what achievement means when no audience is watching.'],
        scenario: ['Your colleagues publicly acknowledge a project you successfully led.', ['Nine of Cups', 'Three of Wands', 'Seven of Wands']],
        image: ['What makes the achievement explicitly public?', 'The elevated rider passes through a crowd carrying wands', 'A solitary figure sits beneath nine cups', 'A concealed traveler leaves an empty camp', 'A craftsperson works alone away from town']
      },
      7: {
        figure: 'A figure braces a staff across their body on raised ground. Six other wands push up from below; the challengers stay out of sight.',
        scene: ['A narrow ridge gives the defender a height advantage.', 'Mismatched footwear adds a hurried, unprepared quality to an otherwise determined stand.'],
        takeaway: 'Waite emphasizes valor and advantageous position; Biddy reads the need to protect a hard-won place.',
        challenge: 'If the defender stood below the six staffs, how would the balance of advantage shift?',
        colors: [['#5a8e5a', 'protecting a hard-won position', 'defender’s green tunic', ['biddy', 'upright', 'Defender', 'reading-association']], ['#bc773f', 'courage meeting direct opposition', 'staff across the body', ['waite', 'Part III §2', 'Defensive staff']], ['#80b1bf', 'an advantage despite unequal odds', 'sky behind the lone figure', ['waite', 'Part III §2', 'Defender on high ground', 'reading-association']]],
        symbols: [['Six opposing wands', 'rising from below the ridge', 'Waite identifies six against one: pressure is real, but position matters.', 'Five of Wands distributes competition across an entire visible group.'], ['High ground', 'under the defender’s feet', 'Waite explicitly makes this the defender’s advantage.', 'Three of Wands uses elevation for foresight rather than resistance.'], ['Mismatched shoes', 'on the defender’s feet', 'Biddy reads them as a sign of being caught off guard.', 'The Nine of Wands shows a bandaged veteran already marked by prior struggle.']],
        symbolChoices: ['Six opposing wands', 'Six floating cups', 'Eight mounted pentacles', 'Two abandoned swords'],
        reversal: ['Defending a position becomes exhausting', 'Biddy describes overwhelm, surrender or uncertainty about which fight deserves energy.', 'Waite lists perplexity and anxiety and cautions against indecision.', 'Choose a boundary worth maintaining rather than resisting every demand.'],
        scenario: ['After earning a role, you must explain and defend your position against several challenges.', ['Six of Wands', 'Four of Wands', 'Page of Wands']],
        image: ['What prevents this from being a picture of equal odds?', 'One defender faces six staffs but holds higher ground', 'A large crowd cheers the defender’s victory', 'All seven people stand calmly at the same level', 'The defender has already dropped the staff']
      },
      8: {
        figure: 'No human figure appears. Eight leafy staffs cross the sky in a close, slanting formation.',
        scene: ['A river bends through green land below the airborne wands.', 'Their repeated angle directs the eye swiftly across a scene with no visible obstacle.'],
        takeaway: 'Waite describes swift activity and an express messenger; Biddy reads rapid movement and aligned action.',
        challenge: 'If the staffs pointed in opposing directions, would the image still convey coordinated momentum?',
        colors: [['#87bdcd', 'swift movement through open space', 'sky crossed by flying staffs', ['waite', 'Part III §2', 'Airborne wands', 'reading-association']], ['#6c9951', 'room to move after obstacles clear', 'land below the flight', ['biddy', 'upright', 'Open countryside', 'reading-association']], ['#b07943', 'action accelerating toward a result', 'eight parallel wooden shafts', ['waite', 'Part III §2', 'Flying staffs']]],
        symbols: [['Airborne wands', 'across the open sky', 'Waite associates their flight with swiftness and activity nearing its end.', 'Ten of Wands brings the staffs back to earth as a carried load.'], ['Parallel angles', 'repeated by all eight shafts', 'Biddy reads alignment: many moving parts share a direction.', 'Five of Wands crosses its staffs without coordination.'], ['Open countryside', 'beneath the wands', 'Biddy notes the clear route supporting forward motion.', 'Eight of Swords surrounds a stationary figure with upright obstacles.']],
        symbolChoices: ['Eight flying wands', 'Eight cups on a shelf', 'Eight swords around a seated monarch', 'Eight coins in a stone arch'],
        reversal: ['Fast progress meets delay or resistance', 'Biddy describes frustration, timing problems or a need for inner alignment before acceleration.', 'Waite emphasizes jealousy and disputes, rather than a simple slowing of speed.', 'Check whether communication or coordination is holding the work up.'],
        scenario: ['Several awaited messages arrive together and a stalled project suddenly moves quickly.', ['Four of Swords', 'Seven of Pentacles', 'Two of Wands']],
        image: ['How is momentum shown without a rider or traveler?', 'Repeated diagonal staffs imply a shared direction through open space', 'A bent figure struggles under a bundle', 'A stationary horse waits beside a field', 'A wall blocks every staff from moving']
      },
      9: {
        figure: 'A bandaged figure grips one wand and glances sideways. Eight upright staffs line the ground behind them.',
        scene: ['The regular row resembles a boundary or defensive screen.', 'The watcher remains standing, but the head bandage makes the cost of endurance visible.'],
        takeaway: 'Waite calls this strength in opposition; Biddy adds resilience, boundaries and the fatigue of repeated tests.',
        challenge: 'If the watcher relaxed their grip, would the boundary disappear—or could it still support rest?',
        colors: [['#e5ddc8', 'endurance marked by earlier struggle', 'bandage around the head', ['biddy', 'description', 'Injured watcher']], ['#a16b3c', 'boundaries protecting earned progress', 'row of standing staffs', ['biddy', 'upright', 'Staff screen', 'reading-association']], ['#87adbf', 'readiness for another difficult test', 'sky above the watchful figure', ['waite', 'Part III §2', 'Expectant watcher', 'reading-association']]],
        symbols: [['Head bandage', 'around the watcher’s forehead', 'Biddy reads a person tested by difficulty but still able to persist.', 'Four of Swords shifts the wounded person’s response from vigilance to rest.'], ['Eight-staff screen', 'behind the standing figure', 'Biddy connects the repeated staffs with defended boundaries.', 'Seven of Wands faces pressure from below rather than sheltering behind a row.'], ['Gripped wand', 'held upright in the foreground', 'Waite emphasizes readiness to meet opposition firmly.', 'Ten of Wands gathers all its staffs into an exhausting bundle.']],
        symbolChoices: ['A head bandage', 'A crown of butterflies', 'A hooded bird', 'A fish-shaped necklace'],
        reversal: ['Vigilance hardens into exhaustion or suspicion', 'Biddy allows overwhelm, defensive habits or a need to draw on inner resources.', 'Waite keeps adversity and obstacles rather than promising relief.', 'Separate a useful boundary from expecting every approach to be an attack.'],
        scenario: ['You are tired after repeated setbacks but want to protect the progress already made.', ['Ace of Wands', 'Four of Wands', 'Six of Wands']],
        image: ['What does the bandage change about the upright staff?', 'Readiness now comes with evidence of an earlier struggle', 'The staff is a prize awarded for an effortless win', 'The watcher is beginning without any prior experience', 'The scene is a carefree welcome celebration']
      },
      10: {
        figure: 'A figure bends beneath ten long staffs, gathering them so tightly that the load obscures the way ahead.',
        scene: ['A road runs toward a nearby town.', 'The destination is visible to us, while the carrier’s posture shows how achievement can become difficult to manage.'],
        takeaway: 'Waite connects oppression with the weight of success; Biddy reads extra responsibility and work that needs sharing.',
        challenge: 'If two helpers took some of the staffs, what would change about the same destination?',
        colors: [['#aa5d3e', 'responsibility exceeding comfortable capacity', 'carrier’s strained clothing', ['biddy', 'description', 'Bent carrier', 'reading-association']], ['#b79b58', 'success becoming a burden', 'bundle blocking the view', ['waite', 'Part III §2', 'Heavy bundle']], ['#d9c277', 'hard work nearing its destination', 'road toward the town', ['biddy', 'description', 'Nearby town', 'reading-association']]],
        symbols: [['Heavy bundle', 'across the carrier’s upper body', 'Waite makes the burden itself central, including burdens produced by gain.', 'Ace of Wands begins with just one freely offered staff.'], ['Bent back', 'beneath the ten staffs', 'Biddy reads overwork and obligations that exceed comfortable capacity.', 'Nine of Wands is tired but still stands upright.'], ['Nearby town', 'at the end of the road', 'Biddy frames the load as work approaching completion rather than endless wandering.', 'Four of Wands opens a shared refuge instead of a solitary delivery.']],
        symbolChoices: ['A heavy bundle of staffs', 'A wreath on a single staff', 'A globe above a wall', 'A flower held beside a throne'],
        reversal: ['A burden is released—or carried without help', 'Biddy allows delegation and release as well as refusing to share an unsustainable load.', 'Waite retains difficulties and complications; release is not his sole reading.', 'List what can be handed over, stopped or completed rather than simply enduring more.'],
        scenario: ['A successful project has left you doing every final task yourself, with little room to breathe.', ['Six of Wands', 'Page of Wands', 'Two of Wands']],
        image: ['Why notice that the bundle blocks the carrier’s view?', 'Responsibility is interfering with an effective approach to the destination', 'The carrier is watching distant trading ships', 'The bundle has already been delivered to a crowd', 'The town has disappeared behind a locked gate']
      },
      11: {
        figure: 'A young figure in a patterned tunic studies the leafy top of a tall staff. The body is still, the attention lively.',
        scene: ['Pale sand and low pyramidal hills stretch behind the Page.', 'Fresh leaves on the wand stand out against the dry ground: curiosity precedes a visible undertaking.'],
        takeaway: 'Waite gives an envoy or bearer of news; Biddy emphasizes discovery, inspiration and ideas not yet put into motion.',
        challenge: 'What small action could turn the Page’s absorbed inspection into practical exploration?',
        colors: [['#d7b64b', 'creative possibility ready for transformation', 'patterned tunic in the desert', ['biddy', 'description', 'Salamander pattern']], ['#c88952', 'finding potential in unlikely conditions', 'sandy hills behind the Page', ['biddy', 'description', 'Barren landscape']], ['#5c8b4a', 'inspiration still awaiting its first action', 'leaves being inspected', ['biddy', 'description', 'Studied leafy staff']]],
        symbols: [['Leafy staff', 'before the Page’s upturned gaze', 'Biddy reads fascinated attention to creative possibility.', 'The Ace of Wands offers what this Page now examines.'], ['Salamander pattern', 'across the tunic', 'Biddy associates these suit motifs with fiery possibility and transformation.', 'The King of Wands carries the salamander motif into an established court.'], ['Dry hills', 'behind the stationary figure', 'Biddy contrasts the barren surroundings with the Page’s capacity to discover potential.', 'Page of Pentacles studies its object above a cultivated landscape.']],
        symbolChoices: ['A leafy staff', 'A covered cup', 'An upright sword', 'A gold coin'],
        reversal: ['Inspiration needs redirection before it can develop', 'Biddy allows newly forming ideas and limiting beliefs; enthusiasm may lack a workable route.', 'Waite gives troubling announcements and the instability of indecision.', 'Try one low-risk experiment instead of treating uncertainty as proof of failure.'],
        scenario: ['An intriguing creative message makes you eager to explore, even though you have no finished plan.', ['King of Wands', 'Ten of Wands', 'Nine of Wands']],
        image: ['How does the Page differ from the Knight of Wands?', 'The Page studies the staff while the Knight rides into action', 'The Page rides faster than the Knight', 'The Page has already reached a royal throne', 'The Page is carrying all ten staffs toward town']
      },
      12: {
        figure: 'An armored rider holds a wand as a horse rears forward. Plumes and a patterned cloak amplify the energetic pose.',
        scene: ['Dry hills echo the Page’s desert setting.', 'Here curiosity has become movement, but the lifted forelegs suggest impulse rather than a measured pace.'],
        takeaway: 'Waite emphasizes departure and change of residence; Biddy reads adventurous action with an impulsive edge.',
        challenge: 'If the horse stood still, would the rider’s enthusiasm look more like planning than departure?',
        colors: [['#d3ad45', 'fiery enthusiasm entering action', 'salamander-patterned garment', ['biddy', 'description', 'Salamander garment', 'reading-association']], ['#bb643d', 'eagerness poised for immediate movement', 'horse rising beneath the rider', ['biddy', 'description', 'Rearing horse']], ['#cd563e', 'passion driving an adventurous pursuit', 'plumes streaming from the helmet', ['biddy', 'upright', 'Plumed rider', 'reading-association']]],
        symbols: [['Rearing horse', 'beneath the armored rider', 'Biddy connects the active pose with energy that wants immediate expression.', 'Knight of Pentacles keeps all four hooves grounded.'], ['Raised wand', 'in the rider’s hand', 'Waite’s departure gives the staff a traveling rather than ceremonial role.', 'Six of Wands raises a staff during a public return.'], ['Streaming plumes', 'on helmet and armor', 'Biddy uses the fiery details to reinforce the restless pace.', 'Knight of Cups presents a quieter silhouette above a walking horse.']],
        symbolChoices: ['A rearing horse', 'A stationary black horse', 'A resting lion', 'A crouching rabbit'],
        reversal: ['Enthusiasm scatters into haste and frustration', 'Biddy describes rushed action, delays and poorly directed energy, including a private passion project.', 'Waite emphasizes interruption, division and discord.', 'Check the route and commitments before another dramatic departure.'],
        scenario: ['You eagerly leave familiar ground for a new venture, tempted to act before checking the details.', ['Knight of Pentacles', 'Page of Wands', 'Queen of Cups']],
        image: ['What contrasts this Knight with the Knight of Cups?', 'The rearing horse makes the approach more forceful and restless', 'Both horses stand motionless in a ploughed field', 'This rider offers a cup rather than holding a wand', 'The desert becomes a sheltered garden']
      },
      13: {
        figure: 'The Queen sits upright with a wand in one hand and a sunflower in the other. A black cat faces outward at the feet of the throne.',
        scene: ['Lion carvings frame a bright, open court.', 'The flower, leafy staff and alert cat make confidence look warm and alive rather than armored.'],
        takeaway: 'Biddy reads independent confidence and social warmth; Pollack treats this Queen as an active appreciation of life.',
        challenge: 'Without the sunflower and cat, would the throne convey the same approachable vitality?',
        colors: [['#e2bd48', 'warm enjoyment of a flourishing life', 'Queen’s sunflower and robe', ['biddy', 'description', 'Sunflower']], ['#222a2a', 'openness to a less visible self', 'cat facing the viewer', ['biddy', 'description', 'Black cat']], ['#a76538', 'strength supporting confident presence', 'lions carved around the throne', ['biddy', 'description', 'Lion throne']]],
        symbols: [['Sunflower', 'in the Queen’s left hand', 'Biddy associates the flower with the warmth and enjoyment of this confident figure.', 'The Sun places similar flowers behind its child rider.'], ['Black cat', 'at the Queen’s feet', 'Biddy reads independence and an unhidden, instinctive side of the personality.', 'Queen of Pentacles places a rabbit within her garden instead.'], ['Lion carvings', 'on the throne', 'Biddy connects the lions with the Queen’s courage and strength.', 'Strength meets a living lion without a royal seat.']],
        symbolChoices: ['A sunflower', 'A severed rose', 'A lily-filled cup', 'A palm branch through a crown'],
        reversal: ['Confidence needs private rebuilding rather than performance', 'Biddy allows introversion, renewed self-respect or a loss of confidence.', 'Waite also permits helpfulness, but includes jealousy in some combinations; these are different emphases.', 'Ask what restores your own confidence without depending on social approval.'],
        scenario: ['A warm, self-assured host encourages others while keeping a strong independent identity.', ['Queen of Swords', 'Page of Wands', 'Four of Pentacles']],
        image: ['What do the sunflower and cat add to royal authority?', 'An approachable liveliness alongside independence', 'Evidence of a defensive battle already lost', 'A demand to abandon all contact with others', 'A scene devoted only to weighing legal evidence']
      },
      14: {
        figure: 'A crowned King turns sideways on a throne, grasping a living wand. The forward lean suggests someone ready to direct an undertaking.',
        scene: ['Lions and salamanders decorate the royal setting.', 'A small salamander rests near the throne, repeating the garment’s motif at ground level.'],
        takeaway: 'Waite emphasizes conscientious honesty; Biddy reads a leader who gives a larger creative vision direction.',
        challenge: 'How would leadership change if the King listened before turning vision into an order?',
        colors: [['#bd503d', 'vision directed through responsible leadership', 'King’s robe beside the wand', ['biddy', 'upright', 'Seated leader', 'reading-association']], ['#d1ad4c', 'a sustained drive through obstacles', 'crown and patterned mantle', ['biddy', 'description', 'Tail-biting salamanders']], ['#5b8548', 'creativity kept alive and growing', 'living leaves on the staff', ['biddy', 'description', 'Blossoming wand']]],
        symbols: [['Blossoming wand', 'in the King’s hand', 'Biddy connects the living staff with sustained creative leadership.', 'Page of Wands studies a similar staff without yet directing others.'], ['Salamander', 'on the ground beside the throne', 'Biddy links the repeated salamander design with the Wands court’s fiery character.', 'Knight of Wands wears the same motif while traveling.'], ['Lion-backed throne', 'behind the seated King', 'Biddy reads the lion imagery as courage supporting a commanding role.', 'Queen of Wands shares lion carvings but adds a sunflower and cat.']],
        symbolChoices: ['A blossoming wand', 'A pair of scales', 'A closed chalice', 'A hooded falcon'],
        reversal: ['Vision becomes demanding or ruthlessly impatient', 'Biddy warns of haste, unrealistic expectations and a leader overriding others.', 'Waite instead describes severity tempered by tolerance; authoritarian excess is not inevitable.', 'Set a clear direction while leaving collaborators room to exercise judgment.'],
        scenario: ['An experienced founder rallies people around an ambitious idea and delegates its execution.', ['Page of Wands', 'Knight of Wands', 'Nine of Wands']],
        image: ['Why compare the King’s wand with the Page’s?', 'The same living potential shifts from exploration to direction', 'Both figures are carrying an identical ten-staff burden', 'The King has discarded every sign of the suit', 'The Page is already seated above the King']
      }
    }
  };

  Object.assign(MINOR_LESSONS, {
    cups: {
      1: {
        figure: 'A hand extends from a cloud with an overflowing cup. A dove descends toward it carrying a small marked wafer.',
        scene: ['Five streams spill into a pool dotted with water plants.', 'The cup receives from above and pours outward below; the image makes a gift of feeling into a flowing exchange.'],
        takeaway: 'Waite calls this the house of the true heart; Pollack emphasizes love as a gift that gives life value.',
        challenge: 'If the water stopped at the cup’s rim, how would the sense of emotional overflow change?',
        colors: [['#eaece0', 'love entering conscious awareness', 'dove above the chalice', ['biddy', 'description', 'Descending dove']], ['#85b7c3', 'feeling and intuition overflowing', 'streams spilling into the pool', ['biddy', 'description', 'Five streams']], ['#6b9358', 'an awakening of inner life', 'water plants below the gift', ['biddy', 'description', 'Lotus blossoms']]],
        symbols: [['Descending dove', 'above the offered cup', 'Waite describes the bird placing a wafer into the vessel; Pollack recognizes the Grail imagery.', 'The Star pours water without the Ace’s descending bird.'], ['Five streams', 'flowing over the cup’s rim', 'Biddy reads an abundance of feeling and creative receptivity.', 'Five of Cups spills liquid from overturned vessels instead.'], ['Cloud hand', 'at the left side of the chalice', 'Biddy describes a new emotional possibility offered to the viewer.', 'Ace of Wands offers creative initiative through the same cloud-hand device.']],
        symbolChoices: ['A descending dove', 'A fish peering from the rim', 'A winged lion’s head', 'A hooded falcon'],
        reversal: ['Feeling turns inward or is held back', 'Biddy allows self-love and intuition as well as suppressed emotion.', 'Waite stresses instability and a false heart; inward care is a modern, less accusatory option.', 'Notice whether privacy nourishes feeling or prevents it from being expressed.'],
        scenario: ['An unexpected opening to affection or creativity invites you to receive before making promises.', ['Two of Cups', 'Four of Cups', 'Nine of Cups']],
        image: ['What does the overflowing water suggest beyond possessing a cup?', 'Feeling is received and shared rather than stored as a trophy', 'All relationships have reached a permanent final state', 'The offer is deliberately ignored beneath a tree', 'The cup is empty and awaiting a merchant’s payment']
      },
      2: {
        figure: 'Two people face each other and exchange cups. Their matching gestures make the meeting reciprocal rather than one-sided.',
        scene: ['A small house sits beyond low, green hills.', 'Above the pair, entwined serpents rise beneath a winged lion’s head, giving the personal exchange a larger emblem.'],
        takeaway: 'Waite lists affinity and union; Biddy reads mutual attraction, partnership and the willingness to meet equally.',
        challenge: 'If only one person offered a cup, what would be missing from the exchange?',
        colors: [['#d6b44e', 'affection freely pledged in return', 'cups held between the pair', ['waite', 'Part III §2', 'Exchanged cups']], ['#b65b43', 'passion strengthening a developing bond', 'winged lion above them', ['biddy', 'description', 'Lion head']], ['#66945b', 'a partnership with potential to deepen', 'hills behind the meeting', ['biddy', 'upright', 'Meeting pair', 'reading-association']]],
        symbols: [['Winged lion’s head', 'above the entwined serpents', 'Biddy connects the emblem with passion and the strength of a developing bond.', 'Strength presents a whole lion in direct contact with one person.'], ['Two offered cups', 'between the facing figures', 'Waite’s affinity becomes visible through a reciprocal gesture.', 'Six of Pentacles gives from a standing donor to kneeling recipients.'], ['Entwined serpents', 'on the central caduceus', 'Biddy reads the paired form in relation to exchange and partnership.', 'The Lovers also places a large overseeing figure above a human pair.']],
        symbolChoices: ['A winged lion’s head', 'A star inside a lantern', 'A wreath around a rider’s wand', 'A rabbit under a rosebush'],
        reversal: ['A mutual bond loses trust or balance', 'Biddy describes disharmony, separation or a need to restore the relationship with oneself.', 'Waite’s main entry emphasizes upright affinity; his additional reversed note is passion, not a universal breakup.', 'Ask whether both people can freely give, receive and speak honestly.'],
        scenario: ['Two collaborators openly commit to a partnership in which both contributions matter.', ['Six of Pentacles', 'Seven of Cups', 'Nine of Cups']],
        image: ['Which visual detail most strongly supports reciprocity?', 'Both figures face one another and offer cups', 'One figure holds scales above two kneeling people', 'A solitary person guards a shelf of cups', 'The pair walks away from all the vessels']
      },
      3: {
        figure: 'Three celebrants lift their cups toward one another in a close circle. Their raised arms join separate bodies into a shared gesture.',
        scene: ['Fruit and vegetables lie around their feet.', 'The open ground feels like a harvest gathering, where the enjoyment of good things is inseparable from company.'],
        takeaway: 'Waite connects the scene with a happy conclusion and solace; Biddy emphasizes friendship and creative community.',
        challenge: 'If one person turned their cup away, how would the circle’s shared celebration change?',
        colors: [['#b84e3e', 'friends lifting one another up', 'one celebrant’s robe', ['biddy', 'description', 'Dancing celebrants', 'reading-association']], ['#eee8d8', 'joy made richer through companionship', 'light dress within the circle', ['pollack', 'Three, pp.66–67', 'Intertwined circle', 'reading-association']], ['#d39b43', 'abundance enjoyed as a shared harvest', 'harvest fruit at their feet', ['biddy', 'description', 'Harvest produce']]],
        symbols: [['Raised chalices', 'meeting above the three celebrants', 'Biddy reads a shared toast rather than a private achievement.', 'Two of Cups brings two vessels together face to face.'], ['Harvest produce', 'on the ground around the dancers', 'Waite’s plenty gives the celebration a tangible outcome.', 'Seven of Pentacles pauses beside a crop still under evaluation.'], ['Circular grouping', 'formed by the three people', 'Pollack emphasizes sharing the wonder of life with others.', 'Nine of Cups seats a satisfied figure alone before a display.']],
        symbolChoices: ['Raised chalices', 'Crossed swords', 'Coins inside an infinity loop', 'A crown above a solitary rider'],
        reversal: ['Celebration needs limits or time apart', 'Biddy allows independence, excessive partying or a group dynamic that excludes someone.', 'Waite includes achievement and completion as well as excess; not every reversal means a broken friendship.', 'Check whether gathering together restores you or has become an obligation.'],
        scenario: ['Close friends celebrate one another’s milestones and make a creative project feel supported.', ['Nine of Cups', 'Four of Cups', 'Five of Wands']],
        image: ['Why is the produce important to this gathering?', 'It connects the toast with plenty and a harvest-like result', 'It proves the three people are competing for a job', 'It replaces the cups as the card’s suit', 'It shows that all celebration must be solitary']
      },
      4: {
        figure: 'A person sits under a tree with arms folded and eyes lowered. Three cups stand nearby while a cloud hand offers a fourth.',
        scene: ['The tree shelters a quiet patch of ground.', 'The unexpected cup hangs within reach, yet the seated figure’s closed posture does not acknowledge it.'],
        takeaway: 'Waite emphasizes weariness despite a fresh offer; Biddy allows contemplation that can become apathy.',
        challenge: 'What would change if the seated figure unfolded one arm toward the offered cup?',
        colors: [['#648b4f', 'a pause for inward contemplation', 'tree canopy above the seat', ['biddy', 'description', 'Figure beneath the tree', 'reading-association']], ['#b86a44', 'attention turned away from engagement', 'folded sleeves near the cups', ['biddy', 'description', 'Folded arms']], ['#e6ebdf', 'a fresh offer without immediate comfort', 'cloud presenting the fourth cup', ['waite', 'Part III §2', 'Cloud-offered cup']]],
        symbols: [['Cloud-offered cup', 'beside the seated figure', 'Waite describes another offer that brings no immediate consolation.', 'Ace of Cups presents its gift without a figure visibly refusing it.'], ['Folded arms', 'across the seated person’s chest', 'Biddy reads inward absorption and a pause in emotional engagement.', 'Two of Swords also crosses the arms, but adds weapons and a blindfold.'], ['Three ground cups', 'before the tree', 'Pollack connects them with experience that no longer feels satisfying.', 'Five of Cups overturns three vessels rather than leaving them standing.']],
        symbolChoices: ['A cloud-offered cup', 'A flower-filled cup passed by a child', 'A cup containing a fish', 'A closed cup with handles'],
        reversal: ['Withdrawal becomes a deliberate emotional check-in', 'Biddy emphasizes retreat and alignment; it can clarify what deserves renewed attention.', 'Waite instead lists novelty, instruction and new relations, an outward opening rather than only further retreat.', 'Identify what the pause is teaching instead of accepting or rejecting every offer automatically.'],
        scenario: ['Even a fresh invitation feels uninteresting, so you pause to ask what you actually want.', ['Ace of Cups', 'Three of Cups', 'Eight of Wands']],
        image: ['What creates tension between the gift and the recipient?', 'The offered cup is close, but the recipient remains folded inward', 'The recipient eagerly passes it to a partner', 'All four cups lie broken on the ground', 'The cup is being carried away on a horse']
      },
      5: {
        figure: 'A black-cloaked figure bows toward three fallen cups. Two vessels remain upright behind the turned shoulders.',
        scene: ['A river separates the foreground from a building.', 'A bridge provides a possible route across, but the mourner’s attention stays on the spilled contents.'],
        takeaway: 'Waite explicitly calls this loss with something remaining; Biddy emphasizes grief and the difficulty of noticing surviving support.',
        challenge: 'If the figure turned toward the two standing cups, would the loss vanish—or would the available response change?',
        colors: [['#262c2d', 'grief awaiting acknowledgment', 'mourning cloak above the spills', ['pollack', 'Five, pp.63–64', 'Black-cloaked mourner']], ['#a44d3e', 'disappointment in what has been lost', 'liquid from a fallen cup', ['biddy', 'description', 'Overturned cups']], ['#6e9ead', 'sorrow with a route toward continuity', 'river beneath the bridge', ['pollack', 'Five, pp.63–64', 'River and bridge']]],
        symbols: [['Three fallen cups', 'at the mourner’s feet', 'Waite makes an actual loss central without declaring everything lost.', 'Three of Cups lifts the same number in celebration.'], ['Two upright cups', 'behind the cloaked figure', 'Biddy points to resources and relationships not yet receiving attention.', 'Two of Cups brings its surviving pair into an active exchange.'], ['Bridge', 'across the river behind the figure', 'Biddy reads a route toward reconnection beyond present disappointment.', 'Six of Swords crosses water by boat rather than by a built span.']],
        symbolChoices: ['Three fallen cups', 'Three swords inside a stone arch', 'Three suspended coins', 'Three wands on a battlement'],
        reversal: ['Grief begins to move toward forgiveness', 'Biddy allows personal setbacks, self-forgiveness and gradual emotional movement.', 'Waite includes return, alliances and news, but also false projects; recovery is not automatic.', 'Acknowledge what was lost while identifying one source of remaining support.'],
        scenario: ['A disappointment absorbs your attention so completely that you overlook two relationships still supporting you.', ['Four of Cups', 'Ten of Cups', 'Seven of Cups']],
        image: ['What do the standing cups prevent us from concluding?', 'That every source of connection has disappeared', 'That a real loss has occurred', 'That the figure is looking at the fallen cups', 'That the river separates two banks']
      },
      6: {
        figure: 'A taller child offers a flower-filled cup to a smaller child. Their attention rests on the exchange rather than the adult retreating behind them.',
        scene: ['Six cups of pale flowers occupy a sheltered courtyard.', 'Old walls and the small figures give the scene the closeness of a remembered place.'],
        takeaway: 'Waite links the card with childhood and memories; Biddy emphasizes innocence, kindness and revisiting the past.',
        challenge: 'How could the kindness of this remembered scene be carried into the present without trying to live in it?',
        colors: [['#eee6cb', 'kindness offered without bargaining', 'flowers inside the six cups', ['biddy', 'description', 'Flower gift']], ['#b85d43', 'childhood remembered with affection', 'child’s hood in the courtyard', ['biddy', 'description', 'Children', 'reading-association']], ['#d7bd66', 'pleasure carried forward from the past', 'cups around the exchange', ['waite', 'Part III §2', 'Flower-filled cups', 'reading-association']]],
        symbols: [['Flower-filled cup', 'between the two children', 'Biddy reads a simple, affectionate gift without a bargaining posture.', 'Two of Cups exchanges matching vessels between adults.'], ['Sheltered courtyard', 'around the children', 'Biddy connects the protected setting with familiarity and childhood security.', 'Five of Pentacles places its travelers outside shelter in snow.'], ['Retreating adult', 'near the courtyard’s rear passage', 'Biddy contrasts adult concerns receding with the children’s immediate playfulness.', 'Ten of Pentacles brings different generations together under one arch.']],
        symbolChoices: ['A flower-filled cup', 'A cup containing a fish', 'An overflowing cup with five streams', 'A goblet topped by a dragon'],
        reversal: ['The past becomes a refuge that holds you back', 'Biddy includes living in memory, forgiveness and recovering lost playfulness.', 'Waite points instead to the future and renewal; the reversal can move beyond the past rather than deepen nostalgia.', 'Keep the useful kindness while checking what today’s situation actually requires.'],
        scenario: ['An old friend’s small gift revives a childhood memory and encourages present-day kindness.', ['Page of Cups', 'Seven of Cups', 'Eight of Cups']],
        image: ['What distinguishes this gift from Six of Pentacles?', 'Children exchange flowers in a familiar courtyard, not charity beneath scales', 'The giver controls payment with a balance', 'A merchant measures out coins to kneeling adults', 'The recipient is walking away from every cup']
      },
      7: {
        figure: 'A dark silhouette raises an arm before seven cups floating in cloud. Each vessel offers a different, unsettling possibility.',
        scene: ['Jewels, a wreath, a castle, a snake and a dragon mingle with stranger apparitions.', 'There is no path between the prizes: the whole display remains suspended rather than grounded.'],
        takeaway: 'Waite describes images without substantial permanence; Biddy reads choices that require discrimination rather than wishful thinking.',
        challenge: 'Which possibility could survive a practical test outside the cloud?',
        colors: [['#777f8a', 'dreams without a firm foundation', 'cloud carrying the choices', ['biddy', 'description', 'Cloud-borne visions']], ['#252c35', 'discernment before choosing a promise', 'viewer’s silhouette', ['biddy', 'upright', 'Viewer facing choices', 'reading-association']], ['#d6b653', 'tempting rewards with uncertain substance', 'vessels holding the apparitions', ['waite', 'Part III §2', 'Visionary chalices']]],
        symbols: [['Cloud-borne cups', 'above the silhouetted viewer', 'Waite emphasizes imagined possibilities without a firm, lasting result.', 'Ace of Pentacles brings its offer over a tangible garden path.'], ['Victory wreath', 'inside one of the upper cups', 'Biddy places desirable rewards among options that may distract or mislead.', 'Six of Wands wears its wreath in a visible public procession.'], ['Snake and dragon', 'emerging from separate cups', 'Biddy includes threatening possibilities alongside tempting ones: not every offer deserves pursuit.', 'The Devil also asks whether attraction conceals a cost, in a very different scene.']],
        symbolChoices: ['Cloud-borne cups', 'Coins carved into a cathedral', 'Staffs planted around a lookout', 'Swords carried in a ferry'],
        reversal: ['Choices are narrowed by returning to personal values', 'Biddy allows inner alignment or feeling overwhelmed by too many possibilities.', 'Waite gives determination and a project, supporting a movement from fantasy toward intention.', 'Choose one option using evidence and values, not its most dazzling promise.'],
        scenario: ['You collect enticing possibilities but keep imagining outcomes instead of choosing a realistic next step.', ['Two of Wands', 'Eight of Pentacles', 'Nine of Cups']],
        image: ['Why does the floating cloud matter?', 'The attractive options have not yet become grounded achievements', 'Every displayed reward has already been earned', 'The viewer is physically carrying all seven cups', 'The choices are ranked by a visible set of scales']
      },
      8: {
        figure: 'A cloaked traveler turns away from eight arranged cups and uses a staff to walk toward uneven hills.',
        scene: ['A moon with a shadowed face hangs over channels of water.', 'The cups remain intact; the departure is not explained by smashed vessels but by a need the arrangement no longer meets.'],
        takeaway: 'Waite describes a matter declining in importance; Biddy reads leaving an emotionally unfulfilling situation to seek more.',
        challenge: 'If the cups were broken, would leaving carry the same ambiguity about what is being given up?',
        colors: [['#b6483b', 'departure in search of deeper fulfillment', 'traveler’s cloak moving away', ['biddy', 'upright', 'Departing traveler', 'reading-association']], ['#d8bc58', 'investment that no longer feels complete', 'cups left in the foreground', ['biddy', 'description', 'Incomplete cup arrangement']], ['#6f91a2', 'feeling carried into a difficult journey', 'water beneath the moon', ['biddy', 'description', 'River and mountain route', 'reading-association']]],
        symbols: [['Abandoned cups', 'in two rows in the foreground', 'Biddy reads emotional investment that no longer provides enough fulfillment.', 'Five of Cups grieves spilled vessels rather than leaving standing ones.'], ['Walking staff', 'in the departing traveler’s hand', 'Pollack treats the departure as a search rather than mere destruction.', 'The Hermit carries a staff while taking solitude to a high place.'], ['Shadowed moon', 'above the mountain route', 'Biddy places the journey in uncertainty rather than a clearly mapped daylight road.', 'The Moon also shows a route continuing into uncertain distance.']],
        symbolChoices: ['Eight abandoned cups', 'Ten cups inside a rainbow', 'Nine cups above a seated host', 'Four cups around a tree'],
        reversal: ['Departure stalls between another attempt and avoidance', 'Biddy asks whether to try again, walk away or recognize aimless drifting.', 'Waite instead gives great joy and feasting; his reversal is not a rule about indecision.', 'Decide whether staying has a real purpose or merely postpones an honest departure.'],
        scenario: ['You leave something outwardly adequate because it no longer meets your deeper emotional needs.', ['Five of Cups', 'Four of Cups', 'Ten of Cups']],
        image: ['Why is it important that the cups remain standing?', 'The traveler can leave an intact situation that still feels insufficient', 'The traveler is fleeing because every vessel shattered', 'The cups prove that the journey is already complete', 'The traveler is carrying every emotional investment along']
      },
      9: {
        figure: 'A well-fed figure sits with folded arms beneath a curved display of nine cups. The face and posture suggest personal satisfaction.',
        scene: ['A cloth covers the high shelf behind the bench.', 'The arrangement looks complete and carefully displayed, but no guest appears in the scene.'],
        takeaway: 'Waite lists contentment and physical well-being; Biddy reads gratitude and wishes fulfilled, while asking what actually satisfies.',
        challenge: 'Would adding a guest change private satisfaction into a different kind of happiness?',
        colors: [['#d4b14b', 'fulfillment of a cherished desire', 'nine cups above the bench', ['biddy', 'description', 'Displayed cups']], ['#567e9f', 'a gathered display of personal satisfaction', 'cloth beneath the display', ['waite', 'Part III §2', 'Arched counter', 'reading-association']], ['#ba4e3e', 'contentment in enjoying what is present', 'cap above the folded arms', ['biddy', 'description', 'Satisfied sitter', 'reading-association']]],
        symbols: [['Nine displayed cups', 'on the curved shelf behind the sitter', 'Waite’s satisfaction becomes visible as a gathered, completed display.', 'Ten of Cups places the vessels in a rainbow over a family.'], ['Folded arms', 'across the seated figure', 'Biddy reads comfortable self-satisfaction rather than the withdrawn refusal of Four of Cups.', 'Four of Cups folds the arms while overlooking an offer.'], ['Solitary bench', 'beneath the satisfied figure', 'Pollack contrasts this personal enjoyment with happiness shared in Ten of Cups.', 'Three of Cups makes companionship central to the celebration.']],
        symbolChoices: ['Nine displayed cups', 'Nine planted swords', 'Nine coins on an arch', 'Nine flowers in a wreath'],
        reversal: ['An impressive display fails to satisfy inwardly', 'Biddy reads dissatisfaction, indulgence or a search for inner rather than material happiness.', 'Waite’s alternatives include truth and liberty as well as mistakes; his list is not solely about excess.', 'Name the feeling you want instead of accumulating another visible token of success.'],
        scenario: ['A long-held personal wish comes true, and you pause to appreciate what you have achieved.', ['Ten of Cups', 'Three of Cups', 'Seven of Cups']],
        image: ['How does this happiness differ from Ten of Cups?', 'It is centered on one satisfied person rather than shared family life', 'It requires a couple and two dancing children', 'It shows a traveler leaving an unsatisfying display', 'It focuses on three cups overturned in grief']
      },
      10: {
        figure: 'A couple raises their arms toward a rainbow of ten cups. Two children dance beside them without staring at the sky.',
        scene: ['A river, green land and a small home stretch beyond the family.', 'The adults acknowledge a vision overhead while the children embody its happiness in ordinary play.'],
        takeaway: 'Waite describes contentment of the heart and fulfilled human affection; Biddy emphasizes harmony rooted in shared values.',
        challenge: 'If the family stopped responding to one another, would the rainbow alone make the home harmonious?',
        colors: [['#d9b955', 'emotional happiness shared with loved ones', 'cups along the rainbow', ['waite', 'Part III §2', 'Cup-filled rainbow']], ['#6f9a55', 'a fertile foundation for belonging', 'land around the family home', ['biddy', 'description', 'Grassy hills and home']], ['#81b8c7', 'hope after a difficult season', 'sky above the raised arms', ['biddy', 'description', 'Rainbow', 'reading-association']]],
        symbols: [['Cup-filled rainbow', 'above the celebrating family', 'Biddy reads emotional fulfillment as something shared beyond one individual.', 'Nine of Cups arrays its vessels behind a solitary sitter.'], ['Dancing children', 'beside the adults', 'Waite describes the children’s happiness as part of the domestic scene.', 'Six of Cups makes childhood itself the center of a remembered exchange.'], ['Distant home', 'across the green landscape', 'Biddy connects the home with a lived sense of belonging.', 'Ten of Pentacles emphasizes a family’s built estate and generations.']],
        symbolChoices: ['A cup-filled rainbow', 'A cloud of seven competing prizes', 'A star within a lantern', 'A wreath across four staffs'],
        reversal: ['A picture of harmony conceals disconnection', 'Biddy describes misaligned values and relationships that need attention behind the ideal image.', 'Waite emphasizes false-hearted repose and indignation; the modern focus need not predict a dramatic rupture.', 'Ask each person what belonging requires rather than protecting a flawless family appearance.'],
        scenario: ['A household feels emotionally secure because its members actively support shared values and one another.', ['Nine of Cups', 'Ten of Pentacles', 'Four of Cups']],
        image: ['What do the playing children add to the rainbow?', 'A lived, everyday expression of the happiness the adults celebrate', 'Proof that inherited money is the only source of happiness', 'A warning that no one can enjoy the present', 'Evidence that all the cups have been rejected']
      },
      11: {
        figure: 'A Page holds a cup at chest height and turns toward a fish peering from its rim. Surprise becomes a conversation rather than a threat.',
        scene: ['Blue water ripples behind a figure in patterned clothes.', 'The ordinary act of holding a cup is interrupted by an impossible visitor, inviting curiosity instead of rigid expectations.'],
        takeaway: 'Waite links the Page with messages and reflection; Biddy emphasizes intuitive or creative news arriving in an unexpected form.',
        challenge: 'If the Page dismissed the fish as nonsense, what opening to imagination would close?',
        colors: [['#76a8bf', 'receptivity to feeling and imagination', 'tunic and sea behind the Page', ['biddy', 'description', 'Sea']], ['#cf8d91', 'curiosity welcoming an unexpected idea', 'floral pattern on the clothing', ['biddy', 'upright', 'Curious Page', 'reading-association']], ['#d9b35d', 'creative inspiration arriving by surprise', 'cup holding its unlikely visitor', ['biddy', 'description', 'Fish in a cup']]],
        symbols: [['Fish in a cup', 'at the rim beside the Page’s face', 'Biddy reads an unexpected message from the intuitive or creative life.', 'King of Cups wears a fish emblem instead of receiving a surprising visitor.'], ['Floral tunic', 'across the Page’s torso', 'Biddy notes the decorated clothing as part of a receptive, imaginative character.', 'Page of Wands wears salamanders while studying a living branch.'], ['Rippling sea', 'behind the standing Page', 'Biddy connects the water with the emotional setting of the encounter.', 'Queen of Cups sits at the meeting place of shore and sea.']],
        symbolChoices: ['A fish in a cup', 'A dove carrying a wafer', 'A snake inside a wreath', 'A falcon on a glove'],
        reversal: ['An intuitive idea is doubted or left immature', 'Biddy describes creative blocks, self-doubt and a new idea not ready for expression.', 'Waite instead includes attachment, seduction and deception; he does not reduce the reversal to a creative block.', 'Explore the impression playfully, then distinguish a useful idea from an unsupported promise.'],
        scenario: ['An odd dream or unexpected message gives you a fresh creative idea worth gently exploring.', ['Page of Swords', 'King of Cups', 'Seven of Cups']],
        image: ['Why does the Page’s response to the fish matter?', 'Curious attention allows an unexpected idea to be heard', 'The Page has ignored the visitor and discarded the cup', 'The fish is presented as a completed business contract', 'The Page is leading an armored charge across the sea']
      },
      12: {
        figure: 'A knight carries a cup forward on an outstretched hand. The pale horse walks rather than charges.',
        scene: ['A stream winds through dry, rocky country.', 'Winged details on the helmet and boots give the measured approach the air of a messenger bringing an invitation.'],
        takeaway: 'Waite lists an approach, proposition or invitation; Biddy adds romance and creative imagination carried into action.',
        challenge: 'What would make the offered invitation trustworthy beyond the beauty of its presentation?',
        colors: [['#eee8d9', 'a calm rather than forceful approach', 'walking horse beneath the knight', ['biddy', 'description', 'Walking horse']], ['#77a6b9', 'imagination nourishing an unpromising setting', 'stream and patterned surcoat', ['biddy', 'description', 'River in barren land']], ['#d1b05c', 'an invitation carried toward another', 'cup extended before the rider', ['waite', 'Part III §2', 'Approaching cup-bearer', 'reading-association']]],
        symbols: [['Offered cup', 'ahead of the rider’s chest', 'Waite explicitly connects the approach with an invitation or proposition.', 'Two of Cups shows the response as a mutual exchange.'], ['Walking horse', 'beneath the composed knight', 'Biddy contrasts this pace with the forceful rush of other Knights.', 'Knight of Swords drives a charging horse into the wind.'], ['Winged helmet', 'above the knight’s face', 'Biddy connects the winged details with imagination and creative expression.', 'Page of Cups encounters inspiration while still standing at the shore.']],
        symbolChoices: ['An offered cup', 'A raised sword', 'A sprouting wand', 'A coin resting above a field'],
        reversal: ['An appealing invitation lacks realistic follow-through', 'Biddy warns of fantasy, moodiness or jealousy replacing steady emotional action.', 'Waite emphasizes trickery and duplicity, a harsher possibility rather than the only reading.', 'Ask what concrete action supports the charming words.'],
        scenario: ['Someone approaches with an affectionate invitation or a beautifully imagined creative proposal.', ['Knight of Wands', 'Page of Pentacles', 'Four of Cups']],
        image: ['What does the horse’s walking pace contribute?', 'The approach feels deliberate and inviting rather than combative', 'It makes the knight identical to a charging Swords rider', 'It shows that the cup has already been refused', 'It proves the rider has no intention of communicating']
      },
      13: {
        figure: 'The Queen sits beside the sea and studies an elaborate covered cup held in both hands. Attention is concentrated rather than displayed outward.',
        scene: ['A carved throne rests at the water’s edge.', 'Stones and water meet around her feet while the unusual vessel becomes a private focus for imagination and care.'],
        takeaway: 'Waite joins loving intelligence with vision; Pollack emphasizes imagination directed by conscious attention rather than vague dreaming.',
        challenge: 'How would the meaning shift if the Queen looked only toward others and never attended to her own cup?',
        colors: [['#79acbd', 'connection with feeling without being overwhelmed', 'water beside the throne', ['biddy', 'description', 'Shoreline']], ['#e7e5d8', 'loving attention joined with understanding', 'Queen’s pale robe', ['waite', 'Part III §2', 'Contemplative Queen', 'reading-association']], ['#c3a758', 'inner feeling given concentrated attention', 'ornate covered chalice', ['biddy', 'description', 'Covered chalice']]],
        symbols: [['Covered chalice', 'between the Queen’s hands', 'Biddy reads the enclosed vessel as a focus for deep inner feeling; Pollack stresses creative attention.', 'The Ace of Cups overflows openly rather than keeping a lid.'], ['Shoreline throne', 'at the meeting of water and land', 'Biddy connects the setting with receiving emotion while retaining a stable place.', 'King of Cups seats his throne amid the moving sea.'], ['Intent gaze', 'directed down toward the cup', 'Pollack reads a will that gives imagination shape rather than merely drifting.', 'Seven of Cups looks toward many floating visions without choosing one.']],
        symbolChoices: ['A covered chalice', 'A sunflower', 'A balanced pair of scales', 'A globe'],
        reversal: ['Care for others eclipses care for oneself', 'Biddy allows self-love, inward feeling and examining co-dependent patterns.', 'Waite explicitly gives divergent accounts, from goodness to untrustworthiness; they should not be forced into one verdict.', 'Notice your own needs before taking responsibility for everyone else’s feelings.'],
        scenario: ['An attentive listener understands feelings deeply while giving an imaginative project careful form.', ['Queen of Swords', 'Seven of Cups', 'Knight of Wands']],
        image: ['Why compare this covered cup with the Ace’s overflowing one?', 'One concentrates attention inward while the other displays feeling flowing outward', 'Both vessels are empty and discarded', 'The Queen is refusing every form of emotional life', 'The Ace alone shows a vessel made of gold']
      },
      14: {
        figure: 'A crowned King sits upright with a cup and a short scepter. The torso stays composed while the sea moves around the throne.',
        scene: ['A ship rides the waves on one side and a sea creature appears on the other.', 'There is motion all around the royal seat, yet the King neither rushes into the water nor turns away from it.'],
        takeaway: 'Biddy reads emotional balance and diplomacy; Pollack notices the tension between social responsibility and the living world of feeling.',
        challenge: 'What would balance look like if the King acknowledged the waves instead of merely trying to appear unmoved?',
        colors: [['#6d9fb5', 'emotional steadiness amid turbulence', 'sea and King’s tunic', ['biddy', 'description', 'Sea-set throne']], ['#d4b053', 'authority carried with responsibility', 'mantle over the shoulders', ['biddy', 'description', 'Gold mantle', 'reading-association']], ['#bb5b43', 'staying balanced while circumstances move', 'ship’s sail beyond the throne', ['biddy', 'description', 'Steady ship']]],
        symbols: [['Sea-set throne', 'beneath the King amid the waves', 'Biddy reads steadiness in the presence of strong feeling rather than the absence of feeling.', 'Queen of Cups keeps her throne on the shore.'], ['Cup and scepter', 'in the King’s two hands', 'Biddy connects feeling with the responsibility to govern actions.', 'King of Swords presents a single prominent blade as the emblem of judgment.'], ['Ship', 'on the sea beside the throne', 'Biddy uses the surrounding motion to contrast with the King’s composed posture.', 'Two of Pentacles places its ships behind a visibly adjusting juggler.']],
        symbolChoices: ['A throne amid waves', 'A throne in a vineyard', 'A rider below a rainbow', 'A bench beneath nine cups'],
        reversal: ['Composure masks moodiness or emotional control', 'Biddy allows inner work and self-compassion, but also manipulation or feelings that overwhelm judgment.', 'Waite emphasizes dishonesty and injustice rather than making every inward turn suspect.', 'Check whether calm communication leaves room for other people’s feelings and choices.'],
        scenario: ['A mediator remains compassionate during an emotional disagreement without losing the ability to make decisions.', ['King of Swords', 'Knight of Cups', 'Five of Wands']],
        image: ['What makes the waves important to the King’s calm?', 'The calm exists amid movement, not in a world without emotional pressure', 'The sea has dried up beneath the throne', 'The King has abandoned the cup to avoid feeling', 'The ship is carrying the King away from responsibility']
      }
    }
  });

  Object.assign(MINOR_LESSONS, {
    swords: {
      1: {
        figure: 'A hand emerges from a cloud and raises a straight sword. Its point passes through a crown hung with branches.',
        scene: ['Sharp mountain peaks rise beneath the suspended weapon.', 'The spare image offers no human dispute to judge: it isolates the power of a clear, cutting idea.'],
        takeaway: 'Waite stresses triumph and force; Biddy’s modern reading emphasizes a breakthrough that still requires responsible judgment.',
        challenge: 'How might the same sharp argument clarify a problem or injure the person hearing it?',
        colors: [['#d1b34d', 'triumph through concentrated force', 'crown pierced by the blade', ['waite', 'Part III §2', 'Pierced crown']], ['#e6e9e5', 'a new opening for clear thought', 'hand and cloud around the hilt', ['biddy', 'upright', 'Offered sword', 'reading-association']], ['#8d91a1', 'truth beyond a personal viewpoint', 'bare mountain peaks', ['pollack', 'Ace, pp.92–93', 'Mountains']]],
        symbols: [['Pierced crown', 'at the upright sword’s tip', 'Waite connects the image with triumph and an extreme concentration of force.', 'Six of Wands lifts a wreath on a staff for public recognition.'], ['Straight blade', 'rising from the cloud hand', 'Biddy reads clear thought capable of cutting through confusion.', 'Two of Swords crosses two blades to hold a decision in suspension.'], ['Bare peaks', 'beneath the offered sword', 'Pollack connects the mountains with abstract, impersonal truth.', 'Ace of Pentacles sets its offer over a cultivated garden instead.']],
        symbolChoices: ['A pierced crown', 'A cup containing a fish', 'A garland between four posts', 'A hooded falcon'],
        reversal: ['An idea needs rethinking before it becomes clear', 'Biddy allows private clarity, clouded judgment or a breakthrough that needs reformulation.', 'Waite preserves force but warns of harmful results; he also records other incompatible alternatives.', 'State the claim plainly and check its evidence before using it to win an argument.'],
        scenario: ['A precise insight suddenly reveals the central issue in a confusing discussion.', ['Two of Swords', 'Seven of Cups', 'Five of Swords']],
        image: ['Why show one upright blade rather than two crossed ones?', 'The composition isolates a focused breakthrough rather than a held stalemate', 'It shows several competing options still unchosen', 'It depicts a completed public negotiation', 'The hand is refusing to grasp any idea']
      },
      2: {
        figure: 'A blindfolded figure sits with two swords crossed before the chest. Both arms remain raised to maintain the balanced pose.',
        scene: ['A rocky sea lies behind the stone seat.', 'A crescent hangs above water the seated figure cannot see, making the apparent stillness feel effortful rather than settled.'],
        takeaway: 'Waite qualifies the image’s armed balance; Biddy reads a difficult decision or an impasse sustained by avoidance.',
        challenge: 'What information would become available if the blindfold were lifted before either sword moved?',
        colors: [['#e8e4db', 'a choice obscured by missing information', 'blindfold and seated robe', ['biddy', 'description', 'Blindfold']], ['#6e9da9', 'feelings complicating a mental decision', 'sea behind the stone seat', ['biddy', 'description', 'Rocky water']], ['#d2bf66', 'intuition needed alongside deliberation', 'crescent above the crossed blades', ['biddy', 'description', 'Crescent moon']]],
        symbols: [['Blindfold', 'over the seated figure’s eyes', 'Biddy reads unavailable or deliberately excluded information.', 'Eight of Swords blindfolds a bound standing figure rather than an armed sitter.'], ['Crossed swords', 'before the chest', 'Pollack reads a guarded balance that prevents emotional involvement.', 'Ace of Swords raises one blade in a clear direction.'], ['Rocky water', 'behind the figure’s seat', 'Biddy connects the obstructed water with feelings complicating the decision.', 'Six of Swords moves across water instead of sitting with a back to it.']],
        symbolChoices: ['A blindfold', 'A laurel crown', 'A red feather', 'A hooded falcon'],
        reversal: ['A stalemate becomes confusion or information overload', 'Biddy describes difficulty deciding when competing facts or pressures become too much.', 'Waite instead lists falsehood and disloyalty; confusion alone is not proof of deception.', 'Separate missing facts from incompatible values, then choose what must be decided first.'],
        scenario: ['You postpone a difficult choice by keeping both options defended and avoiding information that might upset the balance.', ['Ace of Swords', 'Two of Cups', 'Eight of Wands']],
        image: ['Why is the figure’s balance not the same as relaxation?', 'Both arms must keep the crossed weapons raised while vision is blocked', 'The swords have already been laid safely on the ground', 'The sea is being crossed by a moving ferry', 'A companion is supporting both weapons']
      },
      3: {
        figure: 'No person appears. Three swords pass through a red heart suspended against rain and cloud.',
        scene: ['Grey weather fills the background with no sheltered horizon.', 'The simple, centered arrangement makes the wound impossible to overlook without supplying a story about who caused it.'],
        takeaway: 'Waite includes division and rupture; Biddy emphasizes emotional pain, while Pollack asks for acknowledgment rather than denial.',
        challenge: 'How could naming the hurt differ from repeating a story that keeps reopening it?',
        colors: [['#b64b4a', 'emotional hurt that needs acknowledgment', 'heart pierced at the center', ['biddy', 'description', 'Pierced heart']], ['#959ba4', 'painful weather that can pass', 'rainclouds behind the heart', ['biddy', 'description', 'Rainclouds']], ['#d6dadd', 'separation cutting through connection', 'three crossing blades', ['waite', 'Part III §2', 'Three swords']]],
        symbols: [['Pierced heart', 'at the center of the rain', 'Biddy reads emotional pain directly rather than treating the heart as a literal medical prediction.', 'Three of Cups raises three vessels in a composition of shared joy.'], ['Three blades', 'crossing through the heart', 'Waite connects the image with separation, division and rupture.', 'Ace of Swords isolates one blade as the force of a clear idea.'], ['Rainclouds', 'behind the suspended heart', 'Biddy associates the weather with the difficult emotional period surrounding the hurt.', 'The Sun replaces cloudy uncertainty with open daylight.']],
        symbolChoices: ['A pierced heart', 'A carved church window', 'A crown pierced by a blade', 'A shield under a horse'],
        reversal: ['Pain can be released, but harsh inner talk may persist', 'Biddy allows forgiveness and recovery alongside negative self-talk that prolongs sorrow.', 'Waite emphasizes confusion and disorder instead of making the reversal an automatic healing.', 'Acknowledge the injury while choosing language that does not make it your whole identity.'],
        scenario: ['A painful truth or separation needs to be acknowledged rather than disguised as a minor inconvenience.', ['Four of Swords', 'Seven of Swords', 'Ace of Cups']],
        image: ['What does the absence of a human culprit leave open?', 'The image identifies hurt without proving who caused it or what happens next', 'The card proves that a specific person has lied', 'The scene is a literal forecast of a medical event', 'The heart shows that the pain is already resolved']
      },
      4: {
        figure: 'An armored effigy lies on a tomb with hands joined in prayer. One sword rests along the base while three hang on the wall.',
        scene: ['A stained-glass window illuminates a still interior.', 'Unlike the open conflicts elsewhere in Swords, the image suspends movement and places the weapons at rest.'],
        takeaway: 'Waite names retreat and repose; Biddy emphasizes recuperation, while Pollack distinguishes healing withdrawal from hiding.',
        challenge: 'What would make this pause restorative rather than a way of avoiding the world indefinitely?',
        colors: [['#c5a34f', 'rest before renewed engagement', 'resting effigy on the tomb', ['waite', 'Part III §2', 'Praying effigy']], ['#858c96', 'conflict set aside for recuperation', 'stone wall bearing three swords', ['biddy', 'upright', 'Resting weapons', 'reading-association']], ['#b58b75', 'healing sought through reflective withdrawal', 'stained-glass window above', ['pollack', 'Four, pp.87–89', 'Healing window']]],
        symbols: [['Praying hands', 'above the reclining figure’s chest', 'Biddy reads meditation and inward attention during recovery.', 'Nine of Swords presses both hands to a wakeful face.'], ['Single horizontal sword', 'along the tomb’s side', 'Biddy contrasts the one underlying issue with the several swords above.', 'Ace of Swords turns a single blade upright into active clarity.'], ['Stained glass', 'above the still figure', 'Biddy notes the sacred interior as a setting for reflection and recovery.', 'Five of Pentacles passes a lit window from outside in the snow.']],
        symbolChoices: ['Praying hands', 'Hands juggling two coins', 'Hands gathering five swords', 'A hand offering a fish-filled cup'],
        reversal: ['Rest is postponed until exhaustion—or becomes stagnation', 'Biddy includes burnout, deep contemplation and a pause that has lasted too long.', 'Waite emphasizes prudent management and precaution rather than only physical exhaustion.', 'Choose a bounded recovery period and a realistic return instead of pushing until collapse.'],
        scenario: ['After a stressful period, you deliberately step back to recuperate before making the next move.', ['Eight of Wands', 'Nine of Swords', 'Knight of Swords']],
        image: ['Why are the resting weapons important?', 'The scene suspends conflict so attention can turn toward recovery', 'The effigy is charging into another battle', 'The swords form a prison around a standing traveler', 'The window is awarding a prize for public victory']
      },
      5: {
        figure: 'A foreground figure gathers swords while looking toward two people walking away. More weapons lie abandoned on the ground.',
        scene: ['Jagged cloud bands stretch above choppy water.', 'The remaining figure has possession of the blades, but the others’ turned backs make the social cost visible.'],
        takeaway: 'Waite emphasizes dishonor and loss; Biddy asks whether winning at all costs has damaged the relationship.',
        challenge: 'If the weapons were returned, what else would still need repair after this encounter?',
        colors: [['#729eac', 'defeat felt beyond the contest itself', 'restless sea behind the departing figures', ['pollack', 'Five, pp.86–87', 'Choppy water']], ['#b56b44', 'a victory with a relational cost', 'foreground figure’s clothing', ['biddy', 'upright', 'Sword collector', 'reading-association']], ['#929ea8', 'unrest remaining after the fight', 'jagged clouds over the contest', ['biddy', 'description', 'Tumultuous sky']]],
        symbols: [['Gathered swords', 'in the foreground figure’s arms', 'Biddy reads possession of the weapons as a victory that may carry a relational cost.', 'Seven of Swords also carries blades away, but from a camp rather than a visible defeat.'], ['Departing figures', 'near the water behind the collector', 'Pollack emphasizes the experience of humiliation and defeat as well as the apparent victor.', 'Six of Wands surrounds its central figure with participating supporters.'], ['Abandoned blades', 'on the foreground ground', 'Biddy reads people choosing or being forced to disengage from the contest.', 'Four of Swords sets weapons aside in a scene of deliberate rest.']],
        symbolChoices: ['Gathered swords', 'A garland of harvest fruit', 'Two cups held in greeting', 'A pair of balanced scales'],
        reversal: ['Making amends competes with lingering resentment', 'Biddy allows reconciliation, a wish to end conflict or old bitterness returning.', 'Waite keeps loss and sorrow in the reversal; peace should not be assumed from orientation alone.', 'Decide whether an apology, a boundary or disengagement is needed beyond winning the argument.'],
        scenario: ['You win a harsh argument but discover that the people involved no longer want to work with you.', ['Six of Wands', 'Three of Pentacles', 'Two of Cups']],
        image: ['What challenges the idea that the sword collector simply succeeded?', 'The other people leave, revealing a cost that possession of the weapons cannot erase', 'A cheering crowd has crowned the collector', 'Every participant is sharing the weapons equally', 'The sea has become perfectly still around a peaceful home']
      },
      6: {
        figure: 'A standing boatman poles a small vessel carrying a cloaked adult and a child. Six swords stand inside the boat.',
        scene: ['Rougher water borders one side of the vessel; a calmer stretch lies ahead.', 'A distant bank gives the quiet crossing direction, while the passengers remain turned away from us.'],
        takeaway: 'Waite names a journey by water; Pollack and Biddy extend the image into a quiet passage through difficulty.',
        challenge: 'If the boat arrived, what carried concern might still need attention on the new shore?',
        colors: [['#739eac', 'movement toward a calmer situation', 'water around the ferry', ['biddy', 'description', 'Calmer water']], ['#c5af70', 'a passage that carries unresolved concerns', 'wooden boat carrying the family', ['biddy', 'description', 'Boat and swords']], ['#a0a4aa', 'sadness accompanying necessary change', 'cloak around the seated passenger', ['biddy', 'description', 'Covered passenger']]],
        symbols: [['Six upright swords', 'inside the boat ahead of the passengers', 'Biddy reads baggage carried through a transition rather than instantly discarded.', 'Eight of Cups leaves its vessels behind on the bank.'], ['Boatman’s pole', 'held by the standing rower', 'Waite’s crossing requires an actual means of passage, not merely a wish to move.', 'The Chariot directs a land vehicle instead of crossing water.'], ['Calmer water', 'beyond the rougher patch beside the boat', 'Biddy reads movement toward a less troubled situation.', 'Two of Pentacles places ships on dramatic waves behind a juggler.']],
        symbolChoices: ['Six upright swords', 'Six flower-filled cups', 'Six coins on a merchant’s cloak', 'Six airborne staffs'],
        reversal: ['Unfinished business complicates the transition', 'Biddy includes resistance to change and a personal passage that others may not see.', 'Waite gives declaration, confession and publicity, not simply a journey that cannot move.', 'Identify what must be acknowledged or carried responsibly rather than expecting location alone to solve it.'],
        scenario: ['You accept help to move out of a difficult period, knowing some concerns travel with you.', ['Eight of Cups', 'Two of Swords', 'Eight of Wands']],
        image: ['Why are the swords still inside the moving boat?', 'Transition can make progress without erasing every carried concern', 'The passengers have already resolved every difficulty', 'The boat is staying permanently at the original bank', 'The child has thrown all the swords into the water']
      },
      7: {
        figure: 'A figure tiptoes away carrying five swords and looks back toward two left standing. Tents fill the camp behind.',
        scene: ['The bright ground makes the sideways movement easy for the viewer to follow.', 'The awkward armful and unfinished collection complicate any simple story of a perfect escape.'],
        takeaway: 'Waite calls the design uncertain and allows a plan that may fail; Biddy emphasizes strategy, concealment and the cost of deception.',
        challenge: 'What changes if this private maneuver is a necessary strategy rather than a way to avoid accountability?',
        colors: [['#d9bf5d', 'a maneuver leaving the problem unfinished', 'ground behind the departing figure', ['pollack', 'Seven, pp.83–84', 'Incomplete sword removal', 'reading-association']], ['#bc5e42', 'concealment seeking an unnoticed advantage', 'cap and footwear of the carrier', ['biddy', 'upright', 'Sneaking carrier', 'reading-association']], ['#e3d8be', 'avoidance of an open confrontation', 'tents in the camp', ['pollack', 'Seven, pp.83–84', 'Unattacked camp', 'reading-association']]],
        symbols: [['Five carried swords', 'across the departing figure’s arms', 'Biddy reads an attempt to gain an advantage without open confrontation.', 'Five of Swords gathers weapons after a visible conflict.'], ['Two remaining swords', 'standing near the camp', 'Pollack notes the incomplete act: carrying something off need not solve the actual problem.', 'Two of Swords keeps both blades close to a stationary decision-maker.'], ['Backward glance', 'toward the tents and remaining blades', 'Biddy connects the glance with secrecy and the risk of being discovered.', 'Three of Wands faces openly toward the future horizon.']],
        symbolChoices: ['Five carried swords', 'Seven cups in a cloud', 'Two coins linked by a ribbon', 'A cup raised by a mounted messenger'],
        reversal: ['Concealment turns into self-deception or a need to speak', 'Biddy includes keeping secrets and imposter feelings; examine what is being hidden and why.', 'Waite allows good advice and instruction as well as slander, a broader range than confession alone.', 'Seek honest counsel and distinguish necessary privacy from misleading others or yourself.'],
        scenario: ['You try to solve a problem through a private shortcut, avoiding the direct conversation it may still require.', ['Five of Swords', 'Ace of Swords', 'Three of Pentacles']],
        image: ['What makes the remaining two swords important?', 'The maneuver is incomplete and may leave the underlying problem behind', 'They prove the carrier has collected every blade', 'They turn the scene into a mutual exchange of gifts', 'They show that the camp is welcoming the departure']
      },
      8: {
        figure: 'A bound, blindfolded figure stands in wet ground among eight swords. The blades do not form an unbroken fence.',
        scene: ['A fortified settlement rises far behind the isolated figure.', 'The gaps between the swords leave visible space, though the person cannot survey it while blindfolded.'],
        takeaway: 'Waite describes constrained power; Pollack and Biddy notice how oppressive beliefs and unavailable perspective can reinforce real restriction.',
        challenge: 'What support could help the figure assess the gaps safely rather than being told simply to walk away?',
        colors: [['#b96654', 'helplessness reinforced by a restricted view', 'bound figure’s dress', ['biddy', 'upright', 'Bound figure', 'reading-association']], ['#dddcd2', 'beliefs narrowing the apparent options', 'blindfold and bindings', ['biddy', 'description', 'Blindfold and bindings']], ['#8b9dab', 'authority experienced as distant oppression', 'distant fortified height', ['pollack', 'Eight, pp.82–83', 'Castle']]],
        symbols: [['Blindfold and bindings', 'around the isolated figure', 'Biddy reads a restricted viewpoint and thoughts that intensify helplessness; this is not proof that circumstances are imaginary.', 'Two of Swords blindfolds a person who still holds two weapons.'], ['Gaps between swords', 'around the standing figure', 'Pollack explicitly notices that the arrangement is not a complete physical enclosure.', 'Nine of Wands builds a more regular defensive row behind its watcher.'], ['Distant castle', 'on the high ground behind', 'Pollack connects the remote authority with a condition of oppression and isolation.', 'Four of Wands opens a welcoming threshold near its castle.']],
        symbolChoices: ['A blindfold and bindings', 'A crown and scepter', 'A flower-filled cup', 'A pair of working tools'],
        reversal: ['A limiting view can loosen—or the inner critic can tighten it', 'Biddy allows new perspectives and release alongside deeply held self-limiting beliefs.', 'Waite still lists difficulty and opposition; inversion does not guarantee an easy escape.', 'Look for one safe option or outside source of help without blaming yourself for the restriction.'],
        scenario: ['You feel unable to act, and a trusted person helps you test whether all the apparent barriers are equally fixed.', ['Two of Swords', 'Nine of Wands', 'Knight of Swords']],
        image: ['Why notice the gaps without dismissing the bindings?', 'Possible room to move coexists with an impaired ability to see or use it', 'The figure has perfect freedom and deserves blame for staying', 'Every sword forms a sealed stone wall', 'The blindfold gives the figure complete information']
      },
      9: {
        figure: 'A person sits upright in bed with both hands covering the face. Nine swords hang in the dark space above.',
        scene: ['A patterned blanket lies across the bed beneath the looming blades.', 'The swords do not pierce the sleeper; the scene places distress in a wakeful night rather than showing its feared event.'],
        takeaway: 'Biddy emphasizes anxiety and recurring worry; Pollack distinguishes the anguish shown from proof that the feared disaster has occurred.',
        challenge: 'What changes when a fear is spoken to someone supportive instead of rehearsed alone in the dark?',
        colors: [['#22272c', 'worry magnified in a wakeful night', 'night behind the suspended swords', ['biddy', 'description', 'Nightmare scene', 'reading-association']], ['#c3a067', 'conflict haunting a place of rest', 'bed frame beneath the sleeper', ['biddy', 'description', 'Defeat carved on the bed', 'reading-association']], ['#9cafaa', 'love and concern beneath mental anguish', 'patterned blanket over the bed', ['pollack', 'Nine, pp.80–81', 'Rose-and-zodiac blanket']]],
        symbols: [['Hands over the face', 'on the figure sitting in bed', 'Biddy reads acute mental distress, not a reliable picture of future events.', 'Four of Swords joins hands in a quiet pose of recovery.'], ['Suspended swords', 'above the bed in the dark', 'Pollack stresses that the blades hang over rather than enter the person.', 'Ten of Swords makes the painful ending physically explicit in its illustration.'], ['Rose-and-zodiac blanket', 'across the bed', 'Pollack notes the patterned blanket while exploring the love and concern underlying anguish.', 'The World displays its cosmic framing around an active, upright figure.']],
        symbolChoices: ['Hands covering a face', 'Hands measuring with scales', 'Hands exchanging cups', 'Hands carving a coin'],
        reversal: ['Worry becomes private turmoil or begins to be released', 'Biddy allows both deeper hidden fear and the first steps toward releasing worry.', 'Waite emphasizes suspicion, shame and doubt, not guaranteed recovery.', 'Name the fear and seek appropriate support; the image is not a diagnosis or a prediction.'],
        scenario: ['At night you replay frightening possibilities until the worry itself feels overwhelming.', ['Three of Swords', 'Four of Swords', 'Seven of Swords']],
        image: ['What can we conclude from the swords hanging above the bed?', 'The image shows distress without proving that the feared event has happened', 'A specific future catastrophe is certain', 'The sleeper is physically pierced by every sword', 'The person is calmly resting without concern']
      },
      10: {
        figure: 'A prone figure lies beneath ten swords, with a red cloth covering the lower body. No struggle is still underway.',
        scene: ['A dark sky gives way to a narrow light on the horizon.', 'The water beyond is calm, separating the finality in the foreground from the possibility of a different day.'],
        takeaway: 'Waite explicitly says the card is not especially violent death; Biddy reads a painful ending and the need to stop prolonging it.',
        challenge: 'How does the distant light change the scene without making the foreground painless?',
        colors: [['#252b31', 'the weight of a painful ending', 'dark sky above the ending', ['biddy', 'upright', 'Dark ending scene', 'reading-association']], ['#b94e3d', 'dignity preserved at a final limit', 'cloth across the prone figure', ['biddy', 'description', 'Red cape']], ['#d8bd62', 'renewal possible after a chapter closes', 'light at the far horizon', ['biddy', 'description', 'Rising sun']]],
        symbols: [['Ten embedded swords', 'along the prone figure’s back', 'Biddy reads a decisive ending; Waite warns against assuming a literal violent death.', 'Nine of Swords suspends its blades above a person still awake in bed.'], ['Light horizon', 'beyond the dark foreground', 'Biddy reads the possibility of renewal after an ending is acknowledged.', 'The Sun fills the whole sky with daylight rather than leaving a narrow opening.'], ['Still water', 'behind the prone figure', 'Pollack notices the calm distance as a counterpoint to the dramatic foreground.', 'Five of Swords keeps its water rough during a conflict’s aftermath.']],
        symbolChoices: ['Ten embedded swords', 'Ten cups over a family', 'Ten coins around an archway', 'Ten staffs carried toward town'],
        reversal: ['Recovery begins, or an unavoidable ending is resisted', 'Biddy allows regeneration alongside an unwillingness to let a completed chapter end.', 'Waite permits advantage and success but warns that these gains may not last.', 'Identify what is truly over and what small form of rebuilding is now possible.'],
        scenario: ['A situation has reached a painful final limit; continuing the same struggle will not restore the old arrangement.', ['Nine of Swords', 'Five of Wands', 'Two of Swords']],
        image: ['Why include a bright horizon behind the dark ending?', 'The ending is real, but it need not define every future chapter', 'It proves that the ending has not happened', 'It changes the scene into an effortless victory parade', 'It predicts the exact time a problem will disappear']
      },
      11: {
        figure: 'A young figure holds a sword upright while turning the head away from the body’s direction. The stance is alert rather than settled.',
        scene: ['Wind bends nearby trees and drives clouds through the sky.', 'Uneven ground and the turned gaze make the Page look ready to notice a new question from any direction.'],
        takeaway: 'Waite gives vigilance and examination; Biddy adds curiosity and new ways of communicating that still need practice.',
        challenge: 'When does watching for every possible issue stop being curiosity and become suspicion?',
        colors: [['#9cbdc8', 'dynamic energy stirring new questions', 'windy sky behind the blade', ['biddy', 'description', 'Rushing clouds']], ['#d7b859', 'alert curiosity still learning its direction', 'Page’s tunic in motion', ['biddy', 'upright', 'Inquisitive Page', 'reading-association']], ['#6f915b', 'restless attention to a changing situation', 'trees bending near the ridge', ['waite', 'Part III §2', 'Vigilant Page', 'reading-association']]],
        symbols: [['Upright sword', 'in the Page’s two hands', 'Biddy reads a lively new idea and a readiness to communicate it.', 'Ace of Swords isolates the blade without a learning human figure.'], ['Turned head', 'looking across the Page’s shoulder', 'Waite’s vigilance becomes visible as attention scans beyond the body’s stance.', 'Seven of Swords also looks back, but while carrying weapons away.'], ['Windblown trees', 'along the ground behind the Page', 'Biddy reads the restless setting as active, changing mental energy.', 'Four of Swords contains its stillness inside a stone interior.']],
        symbolChoices: ['An upright sword', 'A leafy wand under inspection', 'A coin above both palms', 'A cup with a fish'],
        reversal: ['Quick thinking becomes talk without tested action', 'Biddy describes hasty communication, scattered action or a private need to find one’s voice.', 'Waite emphasizes unpreparedness and the harsher side of vigilance.', 'Verify the message and choose a useful question before broadcasting every suspicion.'],
        scenario: ['A curious newcomer asks sharp questions and wants to learn how to communicate an unfamiliar idea.', ['Page of Cups', 'King of Swords', 'Knight of Wands']],
        image: ['What does the Page’s turned head add to the upright sword?', 'Alertness that is still scanning and learning rather than settled authority', 'Proof that the Page has already won a legal judgment', 'A posture of deep, uninterrupted sleep', 'A willingness to ignore every change nearby']
      },
      12: {
        figure: 'An armored knight leans into a galloping white horse and raises a sword. The whole body aims urgently forward.',
        scene: ['Trees bend under wind and clouds race across the background.', 'The diagonal horse and rider compress the scene into a charge, leaving little visual room for deliberation.'],
        takeaway: 'Waite includes skill and bravery but also destructive opposition; Biddy reads ambition that can outrun consideration.',
        challenge: 'What might this rider notice if the horse slowed long enough for the surroundings to register?',
        colors: [['#e9e8de', 'intellectual purpose driving decisive action', 'horse driving into the wind', ['biddy', 'description', 'White charging horse']], ['#b84c41', 'determination pursuing an idea at speed', 'cape streaming behind the rider', ['biddy', 'upright', 'Charging knight', 'reading-association']], ['#829faf', 'obstacles met with urgent commitment', 'stormy sky above the charge', ['biddy', 'description', 'Headwind and storm', 'reading-association']]],
        symbols: [['Raised sword', 'above the charging knight', 'Biddy connects the weapon with an idea pursued forcefully and without hesitation.', 'King of Swords holds authority in a seated, measured pose.'], ['Galloping horse', 'beneath the forward-leaning rider', 'Biddy reads speed and commitment that can become impulsiveness.', 'Knight of Pentacles waits on a stationary horse.'], ['Bent trees', 'along the rushing landscape', 'Biddy notes the forceful wind reinforcing the urgency of the charge.', 'Page of Swords stands within a similar wind rather than racing through it.']],
        symbolChoices: ['A raised sword', 'A carefully offered cup', 'A coin resting in an open palm', 'A sunflower beside a throne'],
        reversal: ['Urgency becomes unfocused haste or burnout', 'Biddy describes restless action without a useful direction and energy pushed beyond sustainable limits.', 'Waite’s imprudence and incapacity likewise challenge the rider’s apparent competence.', 'Pause to check consequences before treating speed as proof that you are right.'],
        scenario: ['You rush to implement a strong idea, determined to overcome resistance before considering the effects on others.', ['Knight of Cups', 'Page of Swords', 'Four of Swords']],
        image: ['What reinforces the rider’s haste besides the horse?', 'The leaning body, streaming cape and wind-bent trees point into the charge', 'A calm seated posture beneath a motionless canopy', 'A carefully balanced pair of scales', 'A child stopping to offer a cup of flowers']
      },
      13: {
        figure: 'The Queen sits in profile with one sword upright and the other hand extended. The gaze is direct, the invitation measured.',
        scene: ['Clouds collect low around a carved stone throne.', 'A butterfly motif and a small winged face soften the severe geometry without taking the blade away.'],
        takeaway: 'Biddy emphasizes clear boundaries and unbiased communication; Pollack reads the capacity to turn sorrow into perceptive wisdom.',
        challenge: 'How could the extended hand remain receptive without lowering a necessary boundary?',
        colors: [['#dce4e2', 'receptivity without surrendering discernment', 'clouded robe and open hand', ['biddy', 'description', 'Raised open hand']], ['#789eac', 'clear perspective above surrounding sorrow', 'sky above the stone throne', ['pollack', 'Queen, pp.75–76', 'Head above clouds']], ['#b99757', 'mature judgment shaped by experience', 'crown above the profile', ['pollack', 'Queen, pp.75–76', 'Experienced Queen', 'reading-association']]],
        symbols: [['Extended hand', 'reaching outward from the throne', 'Biddy reads openness to hearing others alongside an independent judgment.', 'Four of Cups closes both arms against an approaching offer.'], ['Upright blade', 'beside the Queen’s face', 'Biddy connects the sword with direct, precise communication and boundaries.', 'Two of Swords crosses two blades across a closed chest.'], ['Butterfly carving', 'on the stone throne', 'Biddy reads transformation; Pollack’s account links hard experience with insight.', 'King of Swords repeats butterfly designs in a more frontal court scene.']],
        symbolChoices: ['An extended hand', 'A sunflower in the left hand', 'A coin cradled in both hands', 'A covered cup held to the heart'],
        reversal: ['A boundary hardens into cold or distorted judgment', 'Biddy allows judgment clouded by emotion, outside influence or unnecessarily harsh speech.', 'Waite stresses malice and deceit; this is not a reason to label a real person cruel from one card.', 'Separate a necessary limit from language intended to wound or exclude.'],
        scenario: ['An experienced adviser listens, names the facts clearly and sets a firm boundary without flattering you.', ['Queen of Cups', 'Page of Swords', 'Queen of Wands']],
        image: ['Why keep both the open hand and the upright sword in view?', 'Receptivity and discernment can operate together', 'The Queen has surrendered all authority to others', 'The blade prevents any conversation from occurring', 'The hand is offering a romantic cup instead of hearing evidence']
      },
      14: {
        figure: 'The King faces forward on a stone throne, holding an upright sword slightly angled to one side. The posture is formal and deliberate.',
        scene: ['Butterflies and crescent forms decorate the high throne.', 'A relatively open sky and orderly seat frame the human use of judgment rather than a rushing confrontation.'],
        takeaway: 'Waite associates the King with judgment, command and law; Biddy emphasizes intellectual clarity exercised as authority.',
        challenge: 'What safeguards would keep a clear ruling from becoming merely the ruler’s preference?',
        colors: [['#7196ae', 'a desire for spiritual understanding', 'King’s blue robe', ['biddy', 'description', 'Blue tunic']], ['#a06b88', 'compassion joined with intellect', 'mantle around the seated figure', ['biddy', 'description', 'Purple mantle']], ['#a8afb1', 'mental development through transformation', 'carved stone throne', ['biddy', 'description', 'Butterfly motifs']]],
        symbols: [['Upright royal sword', 'in the King’s right hand', 'Waite connects it with judgment and command; Biddy stresses truth-guided decisions.', 'Knight of Swords uses its blade during a headlong charge.'], ['Frontal throne', 'directly behind the King', 'Biddy reads responsibility and an expectation of fair, reasoned authority.', 'Queen of Swords turns sideways and extends a listening hand.'], ['Butterfly motifs', 'on the throne’s back', 'Biddy associates the designs with transformation and mental development.', 'Queen of Swords repeats butterfly imagery in her own court.']],
        symbolChoices: ['An upright royal sword', 'A leafy staff', 'A cup with five streams', 'A coin above a bull-carved seat'],
        reversal: ['Intellect is used to manipulate rather than judge fairly', 'Biddy contrasts quiet inner authority with misuse of power and persuasion without integrity.', 'Waite gives cruelty and bad intention, reinforcing the need to examine how authority is used.', 'Check the decision against evidence and consistent standards, not just the speaker’s status.'],
        scenario: ['A decision-maker applies clear evidence and consistent rules to a complicated dispute.', ['King of Cups', 'Knight of Swords', 'Seven of Swords']],
        image: ['How does the seated pose differ from the Knight’s charge?', 'Authority has time to assess rather than relying on the force of immediate action', 'The King is moving faster than the mounted Knight', 'The King has abandoned the sword and all judgment', 'The throne converts every personal opinion into a fact']
      }
    }
  });

  Object.assign(MINOR_LESSONS, {
    pentacles: {
      1: {
        figure: 'An open hand extends from a cloud and supports a large pentacle. The offered coin is presented rather than tightly gripped.',
        scene: ['White lilies border a garden path leading toward a leafy arch.', 'Beyond the sheltered garden stand distant mountains: the offer is tangible, but development still asks for effort.'],
        takeaway: 'Waite associates the Ace with material contentment; Biddy reads a practical opportunity whose potential is not yet guaranteed.',
        challenge: 'What work would turn the offered coin into a sustainable result rather than a briefly exciting promise?',
        colors: [['#d4b451', 'a tangible opening needing development', 'pentacle resting on the palm', ['biddy', 'description', 'Offered pentacle']], ['#67964e', 'conditions ripe for practical growth', 'garden around the path', ['biddy', 'description', 'Abundant garden']], ['#eeebda', 'ordinary gifts opening toward deeper experience', 'lilies below the offered coin', ['pollack', 'Ace, pp.118–120', 'Garden and arch', 'reading-association']]],
        symbols: [['Offered pentacle', 'on the cloud hand’s palm', 'Biddy reads a financial, work or material opening that must be developed.', 'Ace of Wands offers a growing branch instead of a tangible coin.'], ['Garden arch', 'at the end of the foreground path', 'Pollack sees ordinary material gifts opening toward a larger experience beyond the shelter.', 'The World closes its greenery into a surrounding wreath.'], ['Distant mountains', 'beyond the leafy arch', 'Biddy emphasizes effort beyond the initial abundant opportunity.', 'The Hermit stands at a height already reached by a different kind of journey.']],
        symbolChoices: ['An offered pentacle', 'A coin clutched against a chest', 'A coin held above a student’s face', 'A coin being carved on a bench'],
        reversal: ['A practical opportunity needs better planning', 'Biddy describes hesitation, a missed offer or an undertaking weakened by inadequate preparation.', 'Waite instead includes great wealth and its harmful side; reversal need not mean money is absent.', 'Check feasibility and resources before committing to a promising offer.'],
        scenario: ['A concrete opening for work or a new venture appears, and you must decide how to develop it.', ['Page of Pentacles', 'Nine of Pentacles', 'Seven of Cups']],
        image: ['Why include a path and mountains beyond the coin?', 'The gift opens a route that still needs to be traveled and worked', 'The coin guarantees wealth without any further action', 'The garden has no exit or future possibility', 'The mountains show that every offer must be rejected']
      },
      2: {
        figure: 'A brightly dressed juggler holds two pentacles inside a looping ribbon. One knee lifts as the body adjusts to the rhythm.',
        scene: ['Ships rise and fall on large waves in the background.', 'The foreground dance and distant sea both show balance as an ongoing adjustment rather than a frozen position.'],
        takeaway: 'Waite includes recreation alongside agitation; Biddy emphasizes time management, competing priorities and practical adaptability.',
        challenge: 'Which obligation could be set down before the juggling becomes unsustainable?',
        colors: [['#b9573f', 'flexibility while juggling real responsibilities', 'juggler’s hat and clothing', ['biddy', 'upright', 'Dancing juggler', 'reading-association']], ['#5b9b7a', 'balance maintained through ongoing attention', 'ribbon looping around the coins', ['biddy', 'description', 'Infinity ribbon']], ['#79a6b9', 'life’s fluctuations handled with focus', 'waves lifting the ships', ['biddy', 'description', 'Wave-tossed ships']]],
        symbols: [['Infinity ribbon', 'looping around the two coins', 'Pollack connects the loop with continuing balance and the magic of ordinary activity.', 'The Magician places a similar horizontal loop above the head.'], ['Raised foot', 'beneath the dancing juggler', 'Biddy reads flexibility needed to handle shifting demands.', 'Four of Pentacles pins both feet onto coins and cannot dance.'], ['Wave-tossed ships', 'behind the juggler', 'Biddy reads the ups and downs that practical attention must accommodate.', 'Three of Wands watches ships from a stable lookout.']],
        symbolChoices: ['An infinity ribbon', 'A flower garland', 'A chain with two collars', 'A blindfold tied over the eyes'],
        reversal: ['Too many priorities overwhelm the balancing act', 'Biddy describes overcommitment, disorder or a need to choose what matters most.', 'Waite gives forced enjoyment and written exchanges, not simply a failed budget.', 'Reduce or reorder commitments instead of trying to keep everything equally urgent.'],
        scenario: ['You keep adjusting time and money between several real responsibilities as demands change.', ['Four of Pentacles', 'Two of Swords', 'Ten of Pentacles']],
        image: ['What do the ships add to the foreground juggling?', 'Both show coping with changing conditions rather than perfect stillness', 'They prove the juggler has already completed every duty', 'They turn the scene into a solitary retreat from work', 'They show that a fixed routine never needs adjustment']
      },
      3: {
        figure: 'A craftsperson stands on a bench beneath a carved arch. Two other people look on, one holding a plan for the building.',
        scene: ['Three pentacles sit within the stonework overhead.', 'The unfinished conversation joins hands-on skill with a shared design: the structure is larger than any one contributor.'],
        takeaway: 'Waite emphasizes skilled labor; Pollack and Biddy draw out the cooperation of different forms of expertise.',
        challenge: 'If the plan-holder stopped listening to the craftsperson, what would the project lose?',
        colors: [['#888f94', 'skill made visible in a shared structure', 'stone arch above the workers', ['waite', 'Part III §2', 'Sculpted stonework', 'reading-association']], ['#ae7751', 'practical expertise valued by collaborators', 'bench beneath the craftsperson', ['biddy', 'description', 'Working stonemason', 'reading-association']], ['#d4bb81', 'a common design joining different skills', 'plan held by a collaborator', ['biddy', 'description', 'Building plans']]],
        symbols: [['Carved pentacles', 'within the arch above the group', 'Waite connects the scene with trade and skill made visible in work.', 'Eight of Pentacles shows the repeated practice behind developing such skill.'], ['Building plan', 'in one observer’s hands', 'Biddy reads planning coordinated with practical expertise.', 'Two of Wands surveys a possible future without this shared working document.'], ['Raised workbench', 'under the craftsperson’s feet', 'Pollack emphasizes the craftsperson’s mastery as a contribution alongside other roles.', 'Five of Wands puts different contributors into uncoordinated competition.']],
        symbolChoices: ['Carved pentacles', 'Cups hanging in a cloud', 'Swords suspended over a bed', 'Staffs flying over a river'],
        reversal: ['A shared project suffers from misaligned contributions', 'Biddy describes disharmony, undervalued expertise or trying to do everything alone.', 'Waite emphasizes mediocre work and pettiness; failure is not inevitable if coordination improves.', 'Clarify roles and listen to the person who understands the work at hand.'],
        scenario: ['A skilled maker and two planners compare notes so that their different expertise serves one project.', ['Eight of Pentacles', 'Five of Wands', 'Nine of Pentacles']],
        image: ['Why show a plan beside the person doing the work?', 'The project needs shared design and practical skill in conversation', 'Only the person with the plan has any expertise', 'The building is complete and no coordination is needed', 'The craftsperson is deliberately working without a team']
      },
      4: {
        figure: 'A seated figure grips one pentacle against the chest, balances one on the crown and pins two beneath the feet.',
        scene: ['A city rises behind the solitary holder.', 'The coins cover head, heart and soles; their careful protection also leaves little freedom of movement.'],
        takeaway: 'Waite calls this clinging to possessions; Pollack and Biddy show how security can become an isolating form of control.',
        challenge: 'Which coin could be loosened without losing every form of security?',
        colors: [['#d3b052', 'security held so tightly it restricts', 'coins at head, chest and feet', ['biddy', 'description', 'Clutched and pinned coins']], ['#b85847', 'self-protection closing off connection', 'robe around the tightly held coin', ['pollack', 'Four, pp.115–116', 'Guarded holder', 'reading-association']], ['#8f9a9a', 'wealth separated from community', 'city behind the solitary seat', ['biddy', 'description', 'Distant hometown']]],
        symbols: [['Clutched coin', 'against the seated figure’s chest', 'Biddy reads protection of resources that may become possessiveness.', 'Ace of Pentacles presents its coin on an open palm.'], ['Coins underfoot', 'beneath both feet', 'Pollack notes how the pentacles close the figure off at points of contact with the world.', 'Two of Pentacles keeps the body moving while the coins circulate.'], ['Distant city', 'behind the isolated holder', 'Biddy contrasts accumulated wealth with connection to the surrounding community.', 'Ten of Pentacles brings people together within an inhabited family setting.']],
        symbolChoices: ['A clutched coin', 'A cup offered by a fish', 'A globe above a wall', 'A tool carving a pentacle'],
        reversal: ['Control loosens—or turns into uncontrolled spending', 'Biddy includes changed priorities, overspending and intensified greed; the direction needs context.', 'Waite lists suspense, delay and opposition rather than a single rule about release.', 'Review what protection is necessary and what it costs in flexibility or connection.'],
        scenario: ['You preserve every resource so tightly that ordinary enjoyment and relationships are being squeezed out.', ['Two of Pentacles', 'Six of Pentacles', 'Nine of Pentacles']],
        image: ['How can the coins both protect and restrict the figure?', 'Holding them at head, chest and feet makes movement and contact difficult', 'They are all being freely distributed to a crowd', 'They have been planted in a growing field', 'They keep the figure dancing in an open loop']
      },
      5: {
        figure: 'Two poorly clothed travelers pass through snow. One uses crutches; the other bends into the cold.',
        scene: ['A lit window containing five pentacles glows above them.', 'The image places visible hardship beside a sign of shelter, but shows no door or completed act of welcome.'],
        takeaway: 'Waite emphasizes material trouble; Biddy reads exclusion and hardship, while Pollack also notices companionship within difficult conditions.',
        challenge: 'What concrete help is missing between seeing a light and actually reaching accessible shelter?',
        colors: [['#e7e8e1', 'hardship endured in exposed conditions', 'snow around the travelers', ['waite', 'Part III §2', 'Travelers in snow', 'reading-association']], ['#d2ad4d', 'hope of support not yet received', 'pentacles in the lit window', ['biddy', 'description', 'Lit church window']], ['#596b79', 'sanctuary without a visible way inside', 'cold wall beside the path', ['pollack', 'Five, pp.113–115', 'Doorless church']]],
        symbols: [['Lit pentacle window', 'above the travelers in the wall', 'Biddy sees nearby support that may not be recognized or accessible; the picture does not prove a welcome.', 'Four of Swords places a stained-glass window inside a sheltered resting place.'], ['Crutches', 'supporting one traveler', 'Waite’s material trouble includes the bodily difficulty plainly shown in the image.', 'The Hermit’s staff supports a chosen solitary journey on high ground.'], ['Two travelers', 'together in the snowy foreground', 'Pollack allows mutual loyalty within hardship rather than reducing the scene to isolation alone.', 'Four of Pentacles guards wealth alone despite the nearby city.']],
        symbolChoices: ['A lit pentacle window', 'A rainbow of cups', 'A flower-covered garden arch', 'A crown above a sword'],
        reversal: ['Material recovery begins, or lack remains inwardly entrenched', 'Biddy includes recovery from financial hardship and a continuing sense of spiritual poverty.', 'Waite instead lists disorder and ruin; his reversal is not automatically an improvement.', 'Identify an accessible source of practical support without treating hardship as personal failure.'],
        scenario: ['Practical hardship leaves you feeling excluded, even while a companion shares the difficult journey.', ['Four of Pentacles', 'Five of Cups', 'Ten of Pentacles']],
        image: ['Why should we not assume the bright window has solved the hardship?', 'Light is visible, but entry and assistance are not shown', 'The travelers are already resting inside the building', 'The window shows that neither traveler needs help', 'The snow is a celebration prepared by the household']
      },
      6: {
        figure: 'A standing figure holds a balance and distributes coins to one of two kneeling recipients. The giver controls both measure and payment.',
        scene: ['Buildings sit beyond the exchange.', 'The arrangement makes generosity visible while also raising a question about who determines the terms of receiving.'],
        takeaway: 'Waite lists gifts and present prosperity; Biddy and Pollack also draw attention to reciprocity, dependence and unequal power.',
        challenge: 'What would change if the recipients could help decide what fair support looks like?',
        colors: [['#b55041', 'generosity within an unequal relationship', 'donor’s robe above the kneeling figures', ['pollack', 'Six, pp.109–113', 'Standing donor', 'reading-association']], ['#d3b253', 'resources offered to meet another’s need', 'coins being distributed', ['waite', 'Part III §2', 'Distributed coins']], ['#8b9f99', 'fairness weighed by the person giving', 'balance and distant town', ['biddy', 'description', 'Balance scales']]],
        symbols: [['Balance scales', 'in the standing giver’s hand', 'Biddy reads the weighing of resources and fairness; Pollack asks who controls the relationship.', 'Justice displays scales as an explicit emblem of judgment.'], ['Falling coins', 'between donor and kneeling recipient', 'Waite’s gifts take the concrete form of resources changing hands.', 'Four of Pentacles prevents its coins from circulating.'], ['Kneeling recipients', 'below the standing donor', 'Pollack emphasizes the hierarchy built into this seemingly simple act of charity.', 'Two of Cups places both participants upright and face to face.']],
        symbolChoices: ['Balance scales', 'An infinity ribbon', 'A covered chalice', 'A leafy staff'],
        reversal: ['Support becomes one-sided or carries hidden conditions', 'Biddy includes unpaid debts, unequal charity and the need to care for oneself.', 'Waite emphasizes desire, envy and illusion; not every reversal identifies a dishonest donor.', 'Clarify whether help is a gift, a loan or a demand for future compliance.'],
        scenario: ['Resources are being shared, and you need to examine both the generosity and the terms attached to it.', ['Two of Cups', 'Four of Pentacles', 'Three of Cups']],
        image: ['What complicates a simple reading of generous equality?', 'One standing figure controls the scales while the recipients kneel', 'The recipients and donor exchange identical cups', 'Nobody has resources available to share', 'Every participant is carving coins at the same bench']
      },
      7: {
        figure: 'A worker leans on a long-handled tool and looks down at pentacles growing among foliage. The hands have paused rather than abandoned the task.',
        scene: ['Six coins cluster in the plant while another sits low near the worker.', 'The crop is visible, but there is no harvesting motion: the scene holds the interval for judging what the work has produced.'],
        takeaway: 'Biddy reads long-term investment and evaluation; Pollack emphasizes the growth that lets a worker step back and assess.',
        challenge: 'What evidence would tell the worker to keep nurturing this crop—or redirect the effort?',
        colors: [['#5d8750', 'growth sustained by earlier effort', 'foliage carrying the pentacles', ['biddy', 'description', 'Thriving crop']], ['#c8a94f', 'results worth pausing to evaluate', 'coins within the crop', ['biddy', 'upright', 'Pentacle crop', 'reading-association']], ['#b57b4f', 'an earned pause before further work', 'worker’s sleeves above the tool', ['pollack', 'Seven, p.108', 'Resting worker', 'reading-association']]],
        symbols: [['Pentacle crop', 'on the leafy plant before the worker', 'Biddy reads results developing through sustained investment rather than sudden reward.', 'Ace of Pentacles offers one coin before cultivation begins.'], ['Resting tool', 'beneath the worker’s joined hands', 'Pollack sees a useful pause after work has reached a point of growth.', 'Eight of Pentacles keeps the tools actively engaged in the next coin.'], ['Downward gaze', 'from the worker toward the crop', 'Biddy connects the inspection with assessing whether effort is worthwhile.', 'Three of Wands directs its evaluation toward a distant horizon.']],
        symbolChoices: ['A pentacle crop', 'Coins juggled inside a ribbon', 'Coins pressed beneath both feet', 'Pentacles carved into an arch'],
        reversal: ['Investment yields too little or has lost its direction', 'Biddy describes limited reward, impatience or insufficient attention to the long-term aim.', 'Waite specifically warns about anxiety over money proposed for lending; his focus is narrower.', 'Compare the actual return with the time and resources still required.'],
        scenario: ['After sustained effort, you pause to decide whether a project’s developing results justify further investment.', ['Eight of Pentacles', 'Two of Pentacles', 'Ace of Wands']],
        image: ['Why is leaning on the tool different from throwing it away?', 'The pause supports evaluation without declaring the work abandoned', 'The worker has already sold every part of the crop', 'The scene shows careless destruction of the garden', 'The tool is being used to fight an approaching crowd']
      },
      8: {
        figure: 'A seated craftsperson works a tool against a pentacle on a bench. Finished examples hang in a vertical row nearby.',
        scene: ['A town stands some distance beyond the workspace.', 'One coin is under the tool, others are completed, and another rests below: repetition makes the process visible.'],
        takeaway: 'Waite emphasizes craftsmanship, sometimes in a preparatory stage; Biddy and Pollack read skill built through attention to the work itself.',
        challenge: 'What kind of feedback would improve the next coin without turning practice into endless perfectionism?',
        colors: [['#bd684b', 'dedication to improving a practical skill', 'craftsperson’s work clothes', ['biddy', 'description', 'Concentrating craftsperson', 'reading-association']], ['#d5b15a', 'mastery built through repeated attempts', 'coins hanging beside the bench', ['biddy', 'description', 'Worked coins']], ['#9c7952', 'attention to the work rather than fame', 'wooden work surface', ['pollack', 'Eight, pp.107–108', 'Apprentice’s task', 'reading-association']]],
        symbols: [['Worked pentacle', 'beneath the craftsperson’s tool', 'Biddy connects concentrated practice with skill development.', 'Three of Pentacles places a skilled maker in conversation with collaborators.'], ['Row of completed coins', 'on the post beside the bench', 'Biddy reads progress through repeated tasks rather than a single flash of success.', 'Seven of Pentacles assesses a growing crop during a pause.'], ['Distant town', 'beyond the isolated workspace', 'Pollack notes the need for dedicated work eventually to relate to the wider world.', 'Ten of Pentacles places people directly inside the established household setting.']],
        symbolChoices: ['A worked pentacle', 'A fish-filled goblet', 'A globe on a parapet', 'A laurel around a wand'],
        reversal: ['Practice slips into perfectionism or misdirected effort', 'Biddy allows self-development but warns about polishing details that do not serve the actual aim.', 'Waite emphasizes vanity, greed and misused skill rather than assuming lack of ability.', 'Check whether the next repetition is teaching something useful or only delaying completion.'],
        scenario: ['You improve a practical skill by repeating a task carefully and learning from each attempt.', ['Three of Pentacles', 'Seven of Pentacles', 'Nine of Cups']],
        image: ['What does the row of coins add to the single one under the tool?', 'Skill develops through a sequence of attempts, not one isolated moment', 'The craftsperson no longer needs to practice', 'All the coins have been inherited without work', 'The bench is actually a throne for a public ruler']
      },
      9: {
        figure: 'A finely dressed person stands among vines with a hooded falcon on a gloved hand. The other hand rests near a cluster of pentacles.',
        scene: ['Ripe grapes fill the enclosed garden.', 'A small snail crosses the foreground while the trained bird remains still, setting deliberate pace beside cultivated abundance.'],
        takeaway: 'Waite emphasizes prudence and accomplishment; Pollack highlights the discipline behind a self-directed life, not simply luxury.',
        challenge: 'Which habits make this independence possible, and which sacrifices no longer serve it?',
        colors: [['#d6bb65', 'comfort reflecting cultivated success', 'flowing robe in the vineyard', ['biddy', 'description', 'Golden robe']], ['#718853', 'fruitful rewards of patient cultivation', 'vines surrounding the pentacles', ['biddy', 'description', 'Grapes and coins']], ['#b45243', 'material independence visibly enjoyed', 'headwear above the gloved bird', ['biddy', 'description', 'Red beret']]],
        symbols: [['Hooded falcon', 'on the figure’s gloved hand', 'Pollack reads trained attention and the discipline that gives achievement its form.', 'The Fool’s small dog accompanies a less controlled beginning.'], ['Ripe grapes', 'on the vines around the figure', 'Biddy connects the garden with the cultivated rewards of sustained effort.', 'Seven of Pentacles pauses to evaluate a crop rather than inhabit its comfort.'], ['Nine pentacles', 'among the garden foliage', 'Waite’s accomplishment is materially present, but Pollack also stresses self-awareness.', 'Ten of Pentacles places wealth within a multigenerational household.']],
        symbolChoices: ['A hooded falcon', 'A fish peering from a cup', 'A black cat before a throne', 'A dog beside a precipice'],
        reversal: ['Work and self-worth become too tightly entangled', 'Biddy describes overinvestment in work, hustling and a need to reconsider what being enough means.', 'Waite warns of deception and a spoiled project; Pollack instead emphasizes failed discipline.', 'Protect time to enjoy the life that your effort was meant to support.'],
        scenario: ['Patient work has made you self-sufficient, and you can choose how to enjoy a cultivated, independent life.', ['Ten of Pentacles', 'Four of Pentacles', 'Three of Pentacles']],
        image: ['How does the hooded bird complicate a reading of effortless luxury?', 'Its training points toward discipline behind the visible comfort', 'It proves the garden appeared without anyone’s work', 'It turns independence into a public victory parade', 'It shows the figure preparing to abandon every resource']
      },
      10: {
        figure: 'An older figure sits with two dogs while adults and a child gather under a stone arch. Ten pentacles overlay the family scene.',
        scene: ['Buildings and a courtyard extend beyond the gateway.', 'The elder, younger adults, child and animals share one built environment, making continuity more prominent than a single person’s fortune.'],
        takeaway: 'Waite names family, gain and inherited records; Biddy emphasizes durable security, while Pollack asks whether ordinary prosperity is truly appreciated.',
        challenge: 'What could the family pass on besides property, and who might be excluded by its traditions?',
        colors: [['#c5a65b', 'security extending across generations', 'pentacles across the family scene', ['biddy', 'upright', 'Family wealth', 'reading-association']], ['#c17c6a', 'a lifetime’s achievements shared with family', 'elder’s richly patterned robe', ['biddy', 'description', 'Wealthy elder', 'reading-association']], ['#e6e5d6', 'loyal companionship within an enduring home', 'dogs beside the seated elder', ['biddy', 'description', 'Loyal dogs', 'reading-association']]],
        symbols: [['Family archway', 'over the adults and child', 'Biddy connects the built threshold with an established family environment and continuity.', 'Four of Wands makes a temporary flower gateway for a shared milestone.'], ['Elder and dogs', 'at the foreground edge of the household', 'Waite describes the older person and dogs as part of the lived family setting.', 'Nine of Pentacles places one independent figure beside a trained bird.'], ['Ten overlaid pentacles', 'across the whole domestic scene', 'Biddy reads wealth and security extending beyond one person; Pollack asks whether the family notices what it has.', 'Ten of Cups raises a rainbow above people consciously celebrating connection.']],
        symbolChoices: ['A family archway', 'A cloud of tempting goblets', 'A row of battle staffs', 'A boat crossing rough water'],
        reversal: ['Family wealth or tradition becomes a source of strain', 'Biddy includes financial loss and the constraining side of wealth, status or expectations.', 'Waite adds chance, loss and gambling, but also gifts or pensions; outcomes are not uniformly negative.', 'Review the obligations and exclusions attached to what the family preserves.'],
        scenario: ['Several generations consider how a home, shared resources and family expectations will be passed on.', ['Nine of Pentacles', 'Ten of Cups', 'Ace of Pentacles']],
        image: ['What shifts the emphasis from Nine to Ten of Pentacles?', 'Several generations inhabit an established household rather than one person’s garden', 'The scene removes every family member but one', 'All wealth has become a private display of cups', 'The family is shown leaving every building behind']
      },
      11: {
        figure: 'A young figure holds a pentacle with both hands and studies it closely. The attention is absorbed, not directed toward an audience.',
        scene: ['A green field opens toward a patch of cultivated land.', 'Distant hills frame a material world waiting for study: the coin is an object to understand before it is a prize to spend.'],
        takeaway: 'Waite names study and scholarship; Pollack emphasizes fascination with learning itself, and Biddy connects it with developing practical skills.',
        challenge: 'What small exercise would turn this careful attention into a skill that can be demonstrated?',
        colors: [['#d3b45e', 'practical learning through close attention', 'pentacle above the Page’s hands', ['waite', 'Part III §2', 'Studied pentacle']], ['#6b9858', 'preparation promising a future harvest', 'tunic and surrounding field', ['biddy', 'description', 'Newly ploughed field']], ['#b8664c', 'fascination with learning for its own sake', 'hat over the absorbed gaze', ['pollack', 'Page, p.101', 'Absorbed student', 'reading-association']]],
        symbols: [['Studied pentacle', 'above the Page’s upturned hands', 'Waite’s scholarship becomes visible as sustained attention to one concrete object.', 'Page of Cups meets an unexpected visitor inside its vessel.'], ['Cultivated field', 'behind the standing student', 'Biddy connects the setting with the practical growth a skill may support.', 'Knight of Pentacles faces a more explicitly worked field from a stationary horse.'], ['Distant hills', 'beyond the green field', 'Biddy reads future effort beyond the Page’s initial concentration.', 'Ace of Pentacles shows mountains beyond an offered opportunity.']],
        symbolChoices: ['A studied pentacle', 'A sprouting staff at eye level', 'A fish in a cup', 'A sword held against the wind'],
        reversal: ['Study stalls before useful practice begins', 'Biddy describes procrastination, limited progress and learning from an unsuccessful attempt.', 'Waite instead lists extravagance and unfavorable news, not only a student avoiding homework.', 'Choose a small practical exercise and use mistakes as feedback.'],
        scenario: ['You become absorbed in learning a concrete skill and are ready to practice its basic methods.', ['Page of Wands', 'Eight of Pentacles', 'King of Pentacles']],
        image: ['Why compare this Page with the Page of Wands?', 'Both study suit objects, but this one concentrates on practical learning through a coin', 'Both Pages lead charging horses into battle', 'This Page is already the wealthy ruler of a castle', 'The coin is being given away without any attention']
      },
      12: {
        figure: 'An armored knight sits upright on a motionless dark horse and holds a pentacle forward. Neither rider nor mount appears hurried.',
        scene: ['Ploughed land lies beyond the horse.', 'The stillness gives the field and the task ahead more weight than the drama of arrival or departure.'],
        takeaway: 'Waite names usefulness and responsibility; Biddy emphasizes routine effort, while Pollack warns that practicality can narrow a life.',
        challenge: 'When would a reliable routine need adjustment rather than another repetition?',
        colors: [['#3f443c', 'patience before a considered next step', 'stationary horse in the foreground', ['biddy', 'description', 'Stationary horse']], ['#cfb058', 'responsibility focused on a tangible task', 'pentacle held above the field', ['waite', 'Part III §2', 'Held pentacle', 'reading-association']], ['#ad8554', 'readiness for methodical repeated work', 'ploughed earth beyond the rider', ['biddy', 'description', 'Ploughed field']]],
        symbols: [['Stationary horse', 'beneath the upright knight', 'Biddy reads patience and consistent work rather than a fast charge.', 'Knight of Swords gallops with a raised weapon.'], ['Held pentacle', 'before the knight’s torso', 'Waite’s responsibility becomes focused on a tangible task or resource.', 'Page of Pentacles looks closely at the coin itself as a student.'], ['Ploughed field', 'behind the mounted figure', 'Biddy connects the prepared land with methodical, productive effort.', 'Seven of Pentacles inspects a crop after sustained cultivation.']],
        symbolChoices: ['A stationary dark horse', 'A rearing chestnut horse', 'A galloping white horse', 'A small boat beside a ferry pole'],
        reversal: ['Reliability turns into inertia or rigid perfectionism', 'Biddy describes feeling stuck, boredom or discipline that no longer serves the task.', 'Waite likewise includes inertia and stagnation, but also carelessness rather than excess control.', 'Change one unhelpful part of the routine without discarding its useful structure.'],
        scenario: ['You make dependable progress by following a careful routine, even when the work is not exciting.', ['Knight of Wands', 'Two of Pentacles', 'Seven of Cups']],
        image: ['Why is a motionless horse suitable for this Knight?', 'The task values steady responsibility more than dramatic speed', 'It proves the knight has no duties to perform', 'It shows the same impulsive charge as Knight of Wands', 'It makes the pentacle an invitation to romance']
      },
      13: {
        figure: 'The Queen bends her gaze toward a pentacle cradled in both hands. The pose resembles caring for something living rather than displaying a trophy.',
        scene: ['Roses frame a throne set in lush growth.', 'A rabbit appears low in the foreground, bringing the eye from royal status back to ordinary life in the garden.'],
        takeaway: 'Waite emphasizes generosity and security; Pollack reads an intimate appreciation of the material world, echoed in Biddy’s practical care.',
        challenge: 'How can providing for others include the Queen’s own need for rest and a sustainable home life?',
        colors: [['#b95346', 'self-trust supporting practical care', 'robe beneath the cradled coin', ['pollack', 'Queen, pp.98–99', 'Self-aware Queen', 'reading-association']], ['#6b945b', 'abundance rooted in connection with nature', 'garden around the throne', ['biddy', 'description', 'Lush plants']], ['#d6b65d', 'resources nurtured with loving attention', 'pentacle resting in both hands', ['biddy', 'description', 'Cradled pentacle']]],
        symbols: [['Cradled pentacle', 'in the Queen’s lap', 'Biddy reads resources held with nurturing attention rather than detached ownership.', 'Four of Pentacles grips a coin defensively against the chest.'], ['Garden rabbit', 'at the lower edge of the throne scene', 'Pollack connects the animal with fruitfulness and a life in rhythm with its world.', 'Queen of Wands places an alert black cat before her throne.'], ['Rose canopy', 'arching over the Queen', 'Pollack emphasizes her connection with nature and compares her with the Empress.', 'The Empress also sits among cultivated, living abundance.']],
        symbolChoices: ['A cradled pentacle', 'A sunflower held upright', 'A closed cup at eye level', 'An open hand beside a sword'],
        reversal: ['Practical caregiving leaves work and home out of balance', 'Biddy allows financial independence and self-care alongside conflicting responsibilities.', 'Waite emphasizes suspicion and fear, not simply an overworked caregiver.', 'Make support sustainable by including your own time, resources and boundaries.'],
        scenario: ['You create comfort through practical care, budgeting, food and attention to the needs of a household.', ['Queen of Cups', 'Queen of Swords', 'Nine of Pentacles']],
        image: ['What does cradling the coin add beyond owning it?', 'Material resources are receiving attentive, nurturing care', 'The Queen is refusing all contact with ordinary life', 'The coin is being used as a weapon in an argument', 'The garden exists only as a distant, unreachable backdrop']
      },
      14: {
        figure: 'A crowned King sits amid vines, holding a pentacle and a scepter. One armored foot remains visible beneath the rich clothing.',
        scene: ['Bull carvings decorate the throne and grapes fill the foreground.', 'A castle rises behind the dense growth, joining cultivated land with the structures built from lasting prosperity.'],
        takeaway: 'Waite connects the King with practical intelligence and business success; Biddy emphasizes stewardship of established material resources.',
        challenge: 'How would you distinguish a good steward of this abundance from someone who treats status as a right to control?',
        colors: [['#d2af55', 'power to create and sustain material value', 'pentacle and scepter held by the King', ['biddy', 'description', 'Coin and scepter']], ['#5c814e', 'cultivated abundance managed over time', 'vines around the throne', ['biddy', 'description', 'Grapes and vines']], ['#6d6764', 'established authority in practical affairs', 'bull-carved stone seat', ['biddy', 'upright', 'Enthroned provider', 'reading-association']]],
        symbols: [['Bull carvings', 'on the King’s throne', 'Biddy connects them with the grounded, established nature of this court; no new astrological rule is required here.', 'The Hierophant also occupies a formal seat, but teaches rather than manages a vineyard.'], ['Grapevines', 'around the throne and across the robe', 'Biddy reads cultivated abundance supported by discipline and practical management.', 'Nine of Pentacles enjoys a vineyard as a self-directed individual.'], ['Castle', 'behind the vine-covered throne', 'Pollack connects the built estate with the King’s established place in society.', 'Ace of Pentacles offers a starting opportunity before any estate has been built.']],
        symbolChoices: ['Bull carvings', 'Butterfly carvings', 'Lion carvings', 'Sea-creature carvings'],
        reversal: ['Stewardship becomes status-seeking or stubborn control', 'Biddy warns of financial mismanagement, fixation on wealth and refusal to adapt.', 'Waite emphasizes corruption and weakness; the modern reading can also describe an ineffective method rather than a person’s character.', 'Judge the management by sustainable results and fair treatment, not impressive possessions.'],
        scenario: ['An experienced manager builds durable prosperity and takes responsibility for maintaining the resources others depend on.', ['King of Wands', 'Knight of Pentacles', 'Four of Pentacles']],
        image: ['Why combine vines with a castle behind the King?', 'Prosperity includes cultivated resources and an established material structure', 'The King has no connection with either work or property', 'The castle replaces every sign of natural growth', 'The scene is only a fleeting dream suspended in cloud']
      }
    }
  });

  // Every card resolves its own primary page, Biddy page and Pollack chapter.
  // Court suffixes are Waite's filenames, not a changed numbering/progress scheme.
  function minorSources(suitKey, rank) {
    const prefix = { wands: 'wa', cups: 'cu', swords: 'sw', pentacles: 'pe' }[suitKey];
    const suffix = { 1: 'ac', 11: 'pa', 12: 'kn', 13: 'qu', 14: 'ki' }[rank] || String(rank).padStart(2, '0');
    const primaryPageRetrieved = suitKey === 'wands' && rank === 1;
    const waiteReproduction = 'https://ia600903.us.archive.org/25/items/a.-e.-waite-the-pictorial-key-to-the-tarot/A.E.%20Waite%20-%20The%20Pictorial%20Key%20to%20the%20Tarot_djvu.txt';
    const streamCountNote = suitKey === 'cups' && rank === 1
      ? 'Waite’s prose counts four streams; Biddy describes five, matching the pictured RWS arrangement. The lesson uses the image count, not Waite’s count.'
      : '';
    return [
      {
        id: 'waite', author: 'A. E. Waite', title: 'The Pictorial Key to the Tarot, Part III §2; additional readings in §4',
        url: `https://archive.sacred-texts.com/tarot/pkt/pkt${prefix}${suffix}.htm`,
        consultedUrl: waiteReproduction,
        consultedSection: `Part III §2: ${RANK_NAMES[rank]} of ${SUIT_PROFILE[suitKey].suit}; §4 where referenced`,
        validation: { status: 'consulted', date: '2026-10-15', method: 'archived-primary-text-reproduction', individualPage: primaryPageRetrieved ? 'retrieved' : 'unavailable-in-this-audit' },
        note: streamCountNote || 'The archived OCR reproduces the primary entries and their Sacred Texts page addresses; it is not a separately verified first-edition scan.'
      },
      {
        id: 'biddy', author: 'Biddy Tarot', title: `${RANK_NAMES[rank]} of ${SUIT_PROFILE[suitKey].suit}: RWS description and upright/reversed meanings`,
        url: `https://biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-${suitKey}/${RANK_NAMES[rank].toLowerCase()}-of-${suitKey}/`,
        consultedSection: 'Description, Upright, Reversed',
        validation: { status: 'consulted', date: '2026-10-15', method: 'individual-card-page' }
      },
      {
        id: 'pollack', author: 'Rachel Pollack', title: `Seventy-Eight Degrees of Wisdom, Part Two: ${SUIT_PROFILE[suitKey].suit}, pp. ${ { wands: '25–47', cups: '48–70', swords: '71–93', pentacles: '94–120' }[suitKey] } (corresponding card section)`,
        url: 'https://archive.org/download/78-degrees-of-wisdom/78%20degrees%20of%20wisdom_djvu.txt',
        consultedSection: `Part Two, ${SUIT_PROFILE[suitKey].suit}: ${RANK_NAMES[rank]}`,
        validation: { status: 'consulted', date: '2026-10-15', method: 'full-book-ocr-card-section' },
        note: 'Page numbers refer to Part Two’s printed pagination, which restarts after Part One; OCR is not a verified facsimile transcription.'
      }
    ];
  }

  // Rotate correct positions deterministically; the quiz engine may shuffle again.
  function minorQuestion(kind, q, options, explain, offset) {
    const shift = offset % options.length;
    return { kind, q, options: options.slice(shift).concat(options.slice(0, shift)), answer: (options.length - shift) % options.length, explain };
  }

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

  function buildMemoryStory(metaName, landscapeText, keywords) {
    const k1 = String(keywords?.[0] || 'the lesson').toLowerCase();
    const k2 = String(keywords?.[1] || 'the tension').toLowerCase();
    const absurdAnchor = `Picture ${metaName} inside ${articleFor(deriveEnvironmentCue(landscapeText))} ${deriveEnvironmentCue(landscapeText)} where one impossible detail keeps repeating until you notice ${k1}.`;
    return {
      summary: `${metaName} becomes unforgettable when you treat ${k2} as the emotional weather and ${k1} as the decision point.`,
      visual: `${absurdAnchor} Keep that repeated image in view.`,
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
    // Identity and existing deck attributions only; audited teaching lives below.
    { id: 'magician', file: 'RWS Tarot 01 Magician.jpg', name: 'The Magician', number: 1, numberLabel: 'I — The First Spark of Will', element: 'Air', secondary: 'Mercury (communication & skill)', archetype: 'The Master of Manifestation', unlock: 'The Magician, Weaver of Reality', keywords: ['Willpower', 'Manifestation', 'Skill', 'Resourcefulness', 'Focus'] },
    { id: 'high-priestess', file: 'RWS Tarot 02 High Priestess.jpg', name: 'The High Priestess', number: 2, numberLabel: 'II — The Gateway of Mystery', element: 'Water', secondary: 'Moon (intuition & cycles)', archetype: 'Guardian of the Veil', unlock: 'The High Priestess, Keeper of Hidden Wisdom', keywords: ['Intuition', 'Mystery', 'Inner knowledge', 'Sacred feminine', 'Stillness'] },
    { id: 'empress', file: 'RWS Tarot 03 Empress.jpg', name: 'The Empress', number: 3, numberLabel: 'III — The Creative Force', element: 'Earth', secondary: 'Venus (love & beauty)', archetype: 'Guardian of Growth', unlock: 'The Empress, Mother of Abundance', keywords: ['Fertility', 'Nurture', 'Abundance', 'Nature', 'Creativity'] },
    { id: 'emperor', file: 'RWS Tarot 04 Emperor.jpg', name: 'The Emperor', number: 4, numberLabel: 'IV — The Architect of Order', element: 'Fire', secondary: 'Aries (leadership & initiative)', archetype: 'The Sovereign Builder', unlock: 'The Emperor, Lord of Structure', keywords: ['Authority', 'Structure', 'Stability', 'Father figure', 'Logic'] },
    { id: 'hierophant', file: 'RWS Tarot 05 Hierophant.jpg', name: 'The Hierophant', number: 5, numberLabel: 'V — The Bridge of Tradition', element: 'Earth', secondary: 'Taurus (values & stability)', archetype: 'The Sacred Teacher', unlock: 'The Hierophant, Voice of Tradition', keywords: ['Tradition', 'Spiritual wisdom', 'Institutions', 'Guidance', 'Conformity'] },
    { id: 'lovers', file: 'RWS Tarot 06 Lovers.jpg', name: 'The Lovers', number: 6, numberLabel: 'VI — The Sacred Choice', element: 'Air', secondary: 'Gemini (duality & connection)', archetype: 'The Choosers', unlock: 'The Lovers, Guardians of the Heart\'s Decision', keywords: ['Love', 'Union', 'Choice', 'Values', 'Harmony'] },
    { id: 'chariot', file: 'RWS Tarot 07 Chariot.jpg', name: 'The Chariot', number: 7, numberLabel: 'VII — The Triumph of Will', element: 'Water', secondary: 'Cancer (protection & determination)', archetype: 'The Victorious Warrior', unlock: 'The Chariot, Driver of Destiny', keywords: ['Determination', 'Victory', 'Control', 'Willpower', 'Direction'] },
    { id: 'strength', file: 'RWS Tarot 08 Strength.jpg', name: 'Strength', number: 8, numberLabel: 'VIII — The Gentle Power', element: 'Fire', secondary: 'Leo (courage & heart)', archetype: 'The Lion Tamer', unlock: 'Strength, Mistress of Inner Courage', keywords: ['Courage', 'Patience', 'Compassion', 'Inner strength', 'Influence'] },
    // Virgo is retained from the deck's existing attribution; no new astrological claim is added.
    // Sources consulted: Waite, The Pictorial Key to the Tarot (1910), Part II, IX;
    // Pollack, Seventy-Eight Degrees of Wisdom, “Turning Inwards,” pp. 71–73;
    // Biddy Tarot, “The Hermit Tarot Card Meanings,” description/upright/reversed.
    {
      id: 'hermit', file: 'RWS Tarot 09 Hermit.jpg', name: 'The Hermit', number: 9,
      numberLabel: 'IX — The Lantern of Truth', element: 'Earth',
      secondary: 'Virgo (analysis & service)', archetype: 'The Solitary Seeker',
      unlock: 'The Hermit, Bearer of Inner Light',
      keywords: ['Solitude', 'Introspection', 'Guidance', 'Wisdom'],
      numHook: 'A small light shows the next step, not the whole mountain.',
      numerology: {
        meaning: 'Pollack places IX within the inward sequence begun by Strength, VIII.',
        why: 'The Hermit develops the inner search: a pause before the Wheel turns the journey onward.',
        expression: 'He searches from a cold height, then raises his light so another can follow.',
        hook: 'A small light shows the next step, not the whole mountain.'
      },
      colors: [
        { hex: '#d7b84a', name: 'Lantern gold', phrase: 'a beacon offered to others' },
        { hex: '#777b78', name: 'Contemplative grey', phrase: 'the quiet inward turn' },
        { hex: '#e8e5dd', name: 'Peak snow', phrase: 'a hard-won height' }
      ],
      figure: 'The hooded traveler stands above the ordinary road, lantern lifted in one hand and staff steady in the other. Pollack links the grey cloak and cold peak to the quiet work of turning inward.\n\nHe is not sealed away from others: Waite calls the lantern a beacon, and Pollack reads the Hermit as both seeker and guide.',
      challenge: 'If he lowered the lantern and turned away, the seeker would keep his light instead of offering it.',
      scene: {
        paragraphs: [
          'A cold peak rises beyond the noisy world. Snow dulls the ridgeline; the Hermit’s grey cloak gathers the same quiet.',
          'A star shines inside the raised lantern. Its small circle of light marks the next steps, not the whole road.'
        ],
        takeaway: 'The Hermit turns inward to find a light he can hold out for another.'
      },
      symbols: [
        { icon: 'star', name: 'Six-pointed star', where: 'Inside the raised lantern.', meaning: 'Waite identifies a star in the lamp; Biddy specifies six points. Pollack reads inner search and outward guidance. Echo: The Star opens its lights across the sky.', echo: 'The Star opens its lights across the sky.' },
        { icon: 'lamp', name: 'Lantern', where: 'Held high by the Hermit.', meaning: 'Waite calls it a beacon of attainment offered to others. Echo: The Fool looks toward the open sky; the Hermit carries a light for the path.', echo: 'The Fool looks toward the open sky; the Hermit carries a light for the path.' },
        { icon: 'move-up-right', name: 'Pilgrim’s staff', where: 'Gripped in the Hermit’s lowered hand.', meaning: 'Biddy Tarot reads the staff as support and authority on the journey. Echo: The Magician raises a wand toward heaven; the Hermit uses a staff to steady his walk.', echo: 'The Magician raises a wand toward heaven; the Hermit uses a staff to steady his walk.' },
        { icon: 'mountain', name: 'Snowy height', where: 'The pale ridges rise behind the figure.', meaning: 'Pollack reads the cold peak as inward contemplation; Biddy links the snow-capped range with mastery and growth. Echo: The Fool also stands before distant mountains, still at the journey’s threshold.', echo: 'The Fool also stands before distant mountains, still at the journey’s threshold.' }
      ],
      reversed: {
        shadow: 'Waite warns against reducing the Hermit to occult isolation. Biddy Tarot reads the reversal in two directions: too little reflection, or solitude stretched into isolation.',
        cautions: [
          { aspect: 'Avoided reflection', detail: 'The inward pause is missing; everyday noise leaves little room for the search.' },
          { aspect: 'Excess withdrawal', detail: 'Solitude has narrowed into isolation, and the lantern no longer reaches others.' }
        ],
        meanings: [
          { keyword: 'introspection', meaning: 'Reflection is avoided or postponed.', application: 'Notice what is keeping the inner question unheard.' },
          { keyword: 'guidance', meaning: 'Withdrawal has become disconnection.', application: 'Look for a way to let the light travel outward again.' }
        ],
        readingTip: 'Choose the reversal by context: is reflection absent, or has solitude become isolation?',
        contrast: 'Upright, the Hermit’s inward search produces a beacon; reversed, the search may be avoided or kept too far from others.'
      },
      memory: {
        summary: 'The Hermit searches inward, then lifts a lantern for the next traveler.',
        visual: 'A star in a lantern, a staff in snow, one clear step ahead.',
        application: 'Ask whether the light is being sought, followed, or shared.'
      },
      quiz: [
        { q: 'Which detail appears inside The Hermit’s raised lantern?', options: ['A six-pointed star', 'A red cross flag', 'A pair of scales', 'Four suit emblems'], answer: 0, explain: 'Waite describes a star shining in the lantern.' },
        { q: 'A mentor shares a little light, then lets you take the next step yourself. Which card best fits?', options: ['The Hermit', 'The Hierophant', 'The Chariot', 'The Devil'], answer: 0, explain: 'Waite calls the Hermit’s lantern a beacon offered to others; the distractors use neighboring card imagery.' },
        { q: 'The Hermit reversed is most commonly read as:', options: ['Solitude becoming isolation', 'Resistance to change', 'Doubt in one’s inner strength', 'A loss of hope'], answer: 0, explain: 'Biddy Tarot emphasizes excessive withdrawal as one reversed reading; the other choices echo Death, Strength, and The Star reversed.' },
        { q: 'Why does the lantern light only a short stretch of the path?', options: ['The next steps become visible before the whole journey', 'The Hermit is searching for a lost tool', 'The star is hidden from the traveler', 'The staff blocks the light'], answer: 0, explain: 'Biddy Tarot says the lamp shows the next few steps, not the full journey.' }
      ],
    },
    { id: 'wheel-of-fortune', file: 'RWS Tarot 10 Wheel of Fortune.jpg', name: 'Wheel of Fortune', number: 10, numberLabel: 'X — The Turning of Fate', element: 'Fire', secondary: 'Jupiter (expansion & luck)', archetype: 'The Spinner of Destiny', unlock: 'Wheel of Fortune, Turner of Tides', keywords: ['Cycles', 'Destiny', 'Turning point', 'Luck', 'Change'] },
    { id: 'justice', file: 'RWS Tarot 11 Justice.jpg', name: 'Justice', number: 11, numberLabel: 'XI — The Scales of Truth', element: 'Air', secondary: 'Libra (balance & fairness)', archetype: 'The Fair Judge', unlock: 'Justice, Arbiter of Truth', keywords: ['Fairness', 'Truth', 'Law', 'Cause and effect', 'Accountability'] },
    { id: 'hanged-man', file: 'RWS Tarot 12 Hanged Man.jpg', name: 'The Hanged Man', number: 12, numberLabel: 'XII — The Sacred Pause', element: 'Water', secondary: 'Neptune (surrender & transcendence)', archetype: 'The Willing Sacrifice', unlock: 'The Hanged Man, Seer in Suspension', keywords: ['Surrender', 'New perspective', 'Pause', 'Sacrifice', 'Letting go'] },
    { id: 'death', file: 'RWS Tarot 13 Death.jpg', name: 'Death', number: 13, numberLabel: 'XIII — The Threshold of Transformation', element: 'Water', secondary: 'Scorpio (transformation & rebirth)', archetype: 'The Reaper of Change', unlock: 'Death, Herald of Transformation', keywords: ['Endings', 'Transformation', 'Transition', 'Release', 'Rebirth'] },
    { id: 'temperance', file: 'RWS Tarot 14 Temperance.jpg', name: 'Temperance', number: 14, numberLabel: 'XIV — The Alchemist\'s Flow', element: 'Fire', secondary: 'Sagittarius (purpose & integration)', archetype: 'The Divine Mixer', unlock: 'Temperance, Angel of Balance', keywords: ['Balance', 'Moderation', 'Patience', 'Purpose', 'Healing'] },
    { id: 'devil', file: 'RWS Tarot 15 Devil.jpg', name: 'The Devil', number: 15, numberLabel: 'XV — The Chain of Shadow', element: 'Earth', secondary: 'Capricorn (materialism & ambition)', archetype: 'The Tempter', unlock: 'The Devil, Mirror of Bondage', keywords: ['Bondage', 'Shadow self', 'Addiction', 'Materialism', 'Temptation'] },
    { id: 'tower', file: 'RWS Tarot 16 Tower.jpg', name: 'The Tower', number: 16, numberLabel: 'XVI — The Lightning of Truth', element: 'Fire', secondary: 'Mars (destruction & awakening)', archetype: 'The Shattered Fortress', unlock: 'The Tower, Breaker of Illusions', keywords: ['Upheaval', 'Revelation', 'Chaos', 'Awakening', 'Breakthrough'] },
    { id: 'star', file: 'RWS Tarot 17 Star.jpg', name: 'The Star', number: 17, numberLabel: 'XVII — The Light After Darkness', element: 'Air', secondary: 'Aquarius (hope & renewal)', archetype: 'The Healing Light', unlock: 'The Star, Beacon of Hope', keywords: ['Hope', 'Renewal', 'Inspiration', 'Serenity', 'Faith'] },
    { id: 'moon', file: 'RWS Tarot 18 Moon.jpg', name: 'The Moon', number: 18, numberLabel: 'XVIII — The Realm of Illusion', element: 'Water', secondary: 'Pisces (dreams & the unconscious)', archetype: 'The Dream Walker', unlock: 'The Moon, Guide Through the Dark', keywords: ['Illusion', 'Intuition', 'Fear', 'Unconscious', 'Dreams'] },
    { id: 'sun', file: 'RWS Tarot 19 Sun.jpg', name: 'The Sun', number: 19, numberLabel: 'XIX — The Radiance of Joy', element: 'Fire', secondary: 'Sun (vitality & success)', archetype: 'The Radiant Child', unlock: 'The Sun, Bringer of Joy', keywords: ['Joy', 'Success', 'Vitality', 'Clarity', 'Celebration'] },
    { id: 'judgement', file: 'RWS Tarot 20 Judgement.jpg', name: 'Judgement', number: 20, numberLabel: 'XX — The Call to Rise', element: 'Fire', secondary: 'Pluto (rebirth & awakening)', archetype: 'The Awakened Caller', unlock: 'Judgement, Voice of Awakening', keywords: ['Rebirth', 'Inner calling', 'Absolution', 'Awakening', 'Reckoning'] },
    { id: 'world', file: 'RWS Tarot 21 World.jpg', name: 'The World', number: 21, numberLabel: 'XXI — The Dance of Completion', element: 'Earth', secondary: 'Saturn (completion & mastery)', archetype: 'The Cosmic Dancer', unlock: 'The World, Dancer at the Center', keywords: ['Completion', 'Integration', 'Achievement', 'Wholeness', 'Travel'] }
  ];

  const MAJOR_LESSONS = {
    // Sources consulted: Waite, Pictorial Key (1910), Part II, I; Pollack, 78 Degrees, “The Magician”;
    // Biddy Tarot, “The Magician Tarot Card Meanings” (RWS description and reversal).
    magician: {
      numerology: { meaning: 'One is the first point: unity before division.', why: 'Waite describes the raised wand and lowered hand as a current from above to below.', expression: 'The Magician gives that single will a table of four tools and a direction.', hook: 'One hand above, one below; one will between them.' },
      colors: [{hex:'#f4eee1',name:'Robe white',phrase:'purity of intent'},{hex:'#b8322a',name:'Cloak red',phrase:'knowledge put to work'},{hex:'#57854b',name:'Foliage green',phrase:'aspiration cultivated'}],
      figure: 'He stands at a table, wand lifted in one hand and the other pointing down. The four suit emblems are within reach; roses and lilies fill the foreground.\n\nWaite reads the gesture as a passage from above to below. The Magician is not waiting for tools—he is selecting and using them.',
      challenge: 'If the wand lowered and the tools stayed untouched, his focused act would become possibility without action.',
      scene:{paragraphs:['A bright garden opens behind the table. Red roses and white lilies frame the four emblems laid out before the Magician.','His wand points upward; his other hand points to earth. The scene holds both source and result in one gesture.'],takeaway:'The Magician’s work is to direct what is available, not merely to admire it.'},
      symbols:[{icon:'infinity',name:'Lemniscate',where:'Floating above his head.',meaning:'Waite calls it the sign of life; Biddy Tarot links it with continuing potential. Echo: Strength carries the same sign above a different kind of power.',echo:'Strength carries the same sign above a different kind of power.'},{icon:'wand',name:'Raised wand',where:'In his right hand.',meaning:'Waite reads the upward and downward gesture as spirit and power communicated between planes. Echo: The Hermit raises a lantern while his staff supports his stance.',echo:'The Hermit raises a lantern while his staff supports his stance.'},{icon:'sparkles',name:'Four suit emblems',where:'Set across the table.',meaning:'Waite says they signify the elements of natural life, available to the adept. Echo: The World’s four corner figures gather the suits into a completed whole.',echo:'The World’s four corner figures gather the suits into a completed whole.'}],
      reversed:{shadow:'Waite’s reversal includes disgrace and disquiet, not his upright will and skill. Biddy Tarot distinguishes unfocused effort from manipulation; neither reading is a medical diagnosis.',cautions:[{aspect:'Unfocused skill',detail:'The tools are present, but effort lacks a clear aim.'},{aspect:'Misused influence',detail:'Skill is directed to deceive or take advantage.'}],meanings:[{keyword:'will',meaning:'Intention is scattered or blocked.',application:'Check whether the tools serve the stated aim.'},{keyword:'skill',meaning:'Ability is used without honest purpose.',application:'Look at who benefits from the action.'}],readingTip:'Use context to distinguish a lack of direction from deliberate manipulation.',contrast:'Upright skill joins intention and action; reversed, the link is weakened or abused.'},
      quiz:[{q:'Which four objects are laid on the Magician’s table?',options:['Cup, pentacle, sword and wand','Lantern, staff, rose and dog','Scales, sword, crown and veil','Two cups, wings, iris and path'],answer:0,explain:'Waite identifies the emblems of all four suits on the table.'},{q:'You have the skills and resources but must choose a focused next action. Which card fits?',options:['The Magician','The Hermit','The Hanged Man','The Moon'],answer:0,explain:'The Magician’s table shows resources ready to be directed.'},{q:'The Magician reversed is most commonly read as:',options:['Manipulation or unfocused potential','Excess solitude','A delayed ending','Fear of being seen'],answer:0,explain:'Biddy Tarot names manipulation, poor planning and untapped talent.'},{q:'Why does one hand point upward while the other points down?',options:['To show a passage between above and below','To signal refusal to act','To measure the table','To shield the face from the sun'],answer:0,explain:'Waite explicitly describes the paired gesture as a descent from above to below.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, II; Pollack, 78 Degrees, “The High Priestess”;
    // Biddy Tarot, “The High Priestess Tarot Card Meanings” (RWS description and reversal).
    'high-priestess': {
      numerology:{meaning:'Two sets one thing beside another: a pair, a boundary, a choice.',why:'The High Priestess sits between the black and white pillars, holding the tension without resolving it.',expression:'Her partly hidden scroll and still gaze make duality a threshold, not a quick answer.',hook:'Two pillars; one veil between.'},
      colors:[{hex:'#252729',name:'Pillar black',phrase:'one side of duality'},{hex:'#eee9de',name:'Pillar white',phrase:'its complementary side'},{hex:'#769ac1',name:'Robe blue',phrase:'sacred knowledge held inward'}],
      figure:'She faces the viewer between two pillars, the scroll resting partly hidden in her lap. A veil patterned with palms and pomegranates screens the space behind her.\n\nWaite presents both spoken and concealed knowledge. The card’s stillness asks you to notice what remains covered.',
      challenge:'If she stood and opened the entire scroll, the guarded threshold would become a public lesson.',
      scene:{paragraphs:['Black and white pillars frame a quiet temple entrance. Behind the seated figure, a pomegranate veil screens the water beyond.','The scroll is visible but not fully revealed; the moon rests at her feet. Nothing in the scene rushes toward disclosure.'],takeaway:'The High Priestess keeps knowledge in view while leaving its depth concealed.'},
      symbols:[{icon:'columns-3',name:'Black and white pillars',where:'On either side of her throne.',meaning:'Waite names them Boaz and Jachin, framing the guarded entrance. Echo: Justice sits between pillars when knowledge must be weighed.',echo:'Justice sits between pillars when knowledge must be weighed.'},{icon:'scroll',name:'Partly hidden scroll',where:'Across her lap.',meaning:'Waite identifies the Tora, partly concealed, as the law not yet wholly disclosed. Echo: The Hierophant presents teaching openly to students.',echo:'The Hierophant presents teaching openly to students.'},{icon:'moon',name:'Moon at her feet',where:'At the bottom of the robe.',meaning:'Waite notes the lunar crescent as part of the card’s mystery. Echo: The Moon enlarges uncertainty into a whole landscape.',echo:'The Moon enlarges uncertainty into a whole landscape.'}],
      reversed:{shadow:'Waite associates reversal with passion, moral or physical ardour, and conceit; Biddy Tarot emphasizes secrets, withdrawal, and disconnection from intuition. These traditions differ in emphasis.',cautions:[{aspect:'Knowledge withheld',detail:'Silence becomes a barrier rather than a protected interval.'},{aspect:'Unbalanced passion',detail:'Waite’s reversal cautions that hidden force can surface as unchecked ardour.'}],meanings:[{keyword:'mystery',meaning:'Information is concealed or intuition is ignored.',application:'Separate what is known from what is only suspected.'},{keyword:'stillness',meaning:'Inwardness may become disengagement.',application:'Notice whether silence is protective or isolating.'}],readingTip:'The reading traditions differ; surrounding cards can show whether secrecy or excess is more relevant.',contrast:'Upright knowledge is veiled but present; reversed, the veil may be misused or the inner signal obscured.'},
      quiz:[{q:'What lies across the High Priestess’s lap?',options:['A partly hidden scroll','A pair of scales','A small knapsack','A trumpet'],answer:0,explain:'Waite describes the Tora scroll as partly concealed.'},{q:'A question remains unanswered while you gather what is still hidden. Which card fits?',options:['The High Priestess','The Chariot','The Sun','The Emperor'],answer:0,explain:'Her scroll and veil make concealment part of the image.'},{q:'The High Priestess reversed is most commonly read as:',options:['Secrets, withdrawal, or blocked intuition','A completed cycle','A sudden upheaval','Public recognition'],answer:0,explain:'Biddy Tarot emphasizes secrets and disconnection; Waite’s emphasis differs, including ardour and conceit.'},{q:'Why is the scroll partly covered?',options:['The knowledge is present but not fully disclosed','The figure has finished reading it','The water has damaged it','The pillars cast a shadow over it'],answer:0,explain:'Waite explicitly describes the scroll as partly hidden.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, III; Pollack, 78 Degrees, “The Empress”;
    // Biddy Tarot, “The Empress Tarot Card Meanings” (RWS description and reversal).
    empress: {
      numerology:{meaning:'Three brings a third term: what was potential becomes visible.',why:'Waite calls the Empress the fruitful mother and the visible house of human life.',expression:'Wheat, water and patterned cloth put abundance in the scene rather than leaving it abstract.',hook:'Three is growth with a body.'},
      colors:[{hex:'#f0eee6',name:'Gown white',phrase:'abundance held with ease'},{hex:'#c8453c',name:'Cushion red',phrase:'warmth and sensual life'},{hex:'#d8ad3c',name:'Harvest gold',phrase:'ripened plenty'}],
      figure:'She sits among cushions, holding a sceptre while a shield bearing Venus rests beside her. Her crown carries twelve stars; wheat grows at her feet.\n\nWaite calls her the earthly paradise. The relaxed setting is receptive, yet the harvest and sceptre show that nurture also has authority.',
      challenge:'If she left the garden and sat rigidly on stone, abundance would become rule without cultivation.',
      scene:{paragraphs:['A stream winds past the throne; wheat ripens in front of it. Trees and water give the scene its living frame.','Pomegranates pattern the gown, while the Venus shield catches the eye beside the red cushions. The landscape is cultivated, not empty.'],takeaway:'The Empress makes growth visible through what is tended and allowed to ripen.'},
      symbols:[{icon:'venus',name:'Venus shield',where:'Beside the Empress’s cushion.',meaning:'Waite identifies Venus on the shield, joining the figure to the garden’s fruitful life. Echo: The Lovers places desire in a scene of choice.',echo:'The Lovers places desire in a scene of choice.'},{icon:'wheat',name:'Ripening wheat',where:'Across the foreground.',meaning:'Waite describes corn ripening before the seated figure, an image of fertile abundance. Echo: the Pentacles suit brings material growth into daily work.',echo:'the Pentacles suit brings material growth into daily work.'},{icon:'stars',name:'Twelve-star crown',where:'On her head.',meaning:'Waite notes the cluster of twelve stars in her diadem. Echo: The Star disperses stars across the open sky.',echo:'The Star disperses stars across the open sky.'}],
      reversed:{shadow:'Waite lists light, truth, and the unravelling of involved matters; Biddy Tarot focuses on creative block or dependence. The card-specific reversal shifts between clarity and depleted nurture.',cautions:[{aspect:'Creative block',detail:'The work of bringing something to life feels stalled.'},{aspect:'Care out of balance',detail:'Nurture flows outward while the source is depleted.'}],meanings:[{keyword:'abundance',meaning:'Growth is constrained or not being received.',application:'Notice what is being over-tended or neglected.'},{keyword:'nurture',meaning:'Care may have become dependence or control.',application:'Look at whether both sides can grow.'}],readingTip:'Context distinguishes a clearing of complications from a block in creative or caring energy.',contrast:'Upright growth ripens in a living setting; reversed, the flow may be depleted or tangled.'},
      quiz:[{q:'Which sign appears on the shield beside the Empress?',options:['Venus','Mars','A six-pointed star','A red cross'],answer:0,explain:'Waite identifies the symbol of Venus on the shield.'},{q:'A project grows through patient care and a supportive environment. Which card fits?',options:['The Empress','The Tower','The Hermit','Justice'],answer:0,explain:'Waite describes her as the fruitful mother and earthly paradise.'},{q:'The Empress reversed is most commonly read as:',options:['Creative block or care out of balance','A sudden victory','A hidden legal decision','Fear of a new journey'],answer:0,explain:'Biddy Tarot names creative block and dependence among reversed themes.'},{q:'What does the ripening wheat add to the image?',options:['A visible harvest in the foreground','A boundary around a temple','A warning from a dog','A sign that time has stopped'],answer:0,explain:'Waite notes corn ripening before the Empress.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, IV; Pollack, 78 Degrees, “The Emperor”;
    // Biddy Tarot, “The Emperor Tarot Card Meanings” (RWS description and reversal).
    emperor:{
      numerology:{meaning:'Four makes a frame: boundaries, order, a stable base.',why:'The Emperor’s stone throne gives authority a fixed structure.',expression:'His armor, sceptre and orb show order held by a person, not merely by a rule.',hook:'Four walls make a seat of rule.'},
      colors:[{hex:'#b63c31',name:'Robe red',phrase:'power expressed openly'},{hex:'#9a9691',name:'Throne grey',phrase:'a resistant foundation'},{hex:'#ece7dd',name:'Beard white',phrase:'experience behind command'}],
      figure:'He sits squarely on a stone throne, an ankh in one hand and an orb in the other. Armor shows beneath the red robe; ram heads mark the throne.\n\nThe posture is fixed and direct. His authority protects a structure, but the hard stone and barren peaks leave little room for softness.',
      challenge:'If he set aside the orb and left the throne, order would have to negotiate rather than command.',
      scene:{paragraphs:['A stone seat faces the viewer, backed by a spare mountain range. Red cloth covers armor; a narrow river runs below the rocks.','The ankh and orb balance life and rule in his hands. Nothing in the landscape suggests an easy change of course.'],takeaway:'The Emperor gives a lasting shape to power, with the risk of making the shape too rigid.'},
      symbols:[{icon:'armchair',name:'Stone throne with rams',where:'Beneath and beside the Emperor.',meaning:'Waite describes rams on the throne; Biddy reads its firm setting as established authority. Echo: The Empress rules through a living garden.',echo:'The Empress rules through a living garden.'},{icon:'circle-dot',name:'Orb',where:'In his left hand.',meaning:'Waite identifies the globe; Biddy reads the world under the Emperor’s dominion. Echo: The World replaces a single ruler with a whole cycle.',echo:'The World replaces a single ruler with a whole cycle.'},{icon:'key-round',name:'Ankh sceptre',where:'In his right hand.',meaning:'Waite identifies the sceptre as a form of the crux ansata; Biddy explains the ankh as life. Echo: The Hierophant’s keys represent another kind of authority.',echo:'The Hierophant’s keys represent another kind of authority.'}],
      reversed:{shadow:'Waite lists benevolence, compassion, and confusion of enemies; Biddy Tarot emphasizes domination, inflexibility, or a failure of discipline. These readings diverge.',cautions:[{aspect:'Excess control',detail:'Rules tighten until other people have little room to act.'},{aspect:'Unsteady authority',detail:'Structure is missing or discipline cannot be sustained.'}],meanings:[{keyword:'authority',meaning:'Leadership is too rigid or imposed.',application:'Notice who holds power and how it is used.'},{keyword:'structure',meaning:'A needed framework is absent or unreliable.',application:'Check whether a clear boundary would help.'}],readingTip:'Compare the Emperor’s role with nearby cards to tell rigid control from a lack of structure.',contrast:'Upright authority organizes and protects; reversed, it can dominate or fail to hold.'},
      quiz:[{q:'What does the Emperor hold in his left hand?',options:['An orb','A cup','A lantern','A pair of scales'],answer:0,explain:'Waite identifies the orb as the world under his rule.'},{q:'A team needs clear roles and a durable framework. Which card fits?',options:['The Emperor','The Fool','The Moon','The Hanged Man'],answer:0,explain:'The throne and regalia show authority made into structure.'},{q:'The Emperor reversed is most commonly read as:',options:['Domination or inflexible control','Excess solitude','A delayed journey','Hope losing its light'],answer:0,explain:'Biddy Tarot emphasizes domination, excessive control and inflexibility.'},{q:'Why is armor visible beneath the red robe?',options:['Power is protected but not emotionally exposed','The figure is preparing to travel','The robe is a ceremonial gift','The armor belongs to a fallen soldier'],answer:0,explain:'Biddy Tarot reads the armor as protection from threat and vulnerability.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, V; Pollack, 78 Degrees, “The Hierophant”;
    // Biddy Tarot, “The Hierophant Tarot Card Meanings” (RWS description and reversal).
    hierophant:{
      numerology:{meaning:'V places the Hierophant after worldly authority in the deck’s sequence.',why:'The seated religious teacher offers another kind of institution, with followers before him.',expression:'His blessing and keys make tradition a teaching passed from one generation to the next.',hook:'A shared lesson before a personal choice.'},
      colors:[{hex:'#b64037',name:'Vestment red',phrase:'teaching in shared form'},{hex:'#416995',name:'Robe blue',phrase:'an inherited inner tradition'},{hex:'#eee8dc',name:'Robe white',phrase:'a ritual threshold'}],
      figure:'He sits between pillars, one hand raised in blessing and the triple cross in the other. Two followers kneel before him; crossed keys lie at his feet.\n\nThe lesson is public and structured. Unlike the High Priestess, the Hierophant passes knowledge outward through a shared form.',
      challenge:'If the followers stood and walked away, inherited teaching would have to meet personal choice.',
      scene:{paragraphs:['Two pillars frame the temple. Red, blue and white robes mark the elevated teacher; two figures kneel on the patterned floor.','The raised hand blesses while the crossed keys rest below. The setting makes learning a communal rite.'],takeaway:'The Hierophant teaches what a group preserves—and what a learner may later question.'},
      symbols:[{icon:'key-round',name:'Crossed keys',where:'At the Hierophant’s feet.',meaning:'Waite links the keys with external religious authority. Echo: The High Priestess guards a partly hidden scroll rather than displaying keys.',echo:'The High Priestess guards a partly hidden scroll rather than displaying keys.'},{icon:'hand',name:'Two-finger blessing',where:'Raised in the right hand.',meaning:'Biddy describes two fingers toward heaven and two toward earth; Waite distinguishes manifest and concealed doctrine. Echo: The Magician points above and below in an act of personal will.',echo:'The Magician points above and below in an act of personal will.'},{icon:'users',name:'Two kneeling followers',where:'Before the throne.',meaning:'Waite calls them priestly ministers; Biddy reads initiation into a shared teaching. Echo: The Lovers stand together and face a choice of their own.',echo:'The Lovers stand together and face a choice of their own.'}],
      reversed:{shadow:'Waite associates reversal with society, good understanding, and concord; Biddy Tarot emphasizes personal beliefs and challenging convention. The readings diverge between established harmony and breaking from it.',cautions:[{aspect:'Tradition without question',detail:'A shared rule is followed even when it no longer fits.'},{aspect:'Rebellion without grounding',detail:'Rejecting every structure can leave no useful teaching to build on.'}],meanings:[{keyword:'tradition',meaning:'A group teaching may be rigid or unexamined.',application:'Separate the principle from the institution carrying it.'},{keyword:'belief',meaning:'Personal conviction may be finding its own form.',application:'Compare inherited rules with the values shown in context.'}],readingTip:'Nearby cards clarify whether the reversal favors concord or independent belief.',contrast:'Upright teaching is transmitted within a group; reversed, the learner may question the group’s authority.'},
      quiz:[{q:'What lies crossed at the Hierophant’s feet?',options:['Two keys','Two cups','Two swords','Two wands'],answer:0,explain:'Waite identifies crossed keys at the foot of the Hierophant.'},{q:'A newcomer learns a shared practice from a teacher before adapting it. Which card fits?',options:['The Hierophant','The Star','The Tower','The Fool'],answer:0,explain:'The teacher and kneeling followers show structured transmission.'},{q:'The Hierophant reversed can be read as:',options:['Questioning tradition or forming personal beliefs','Resistance to a necessary ending','Uncontrolled anxiety','A completed journey'],answer:0,explain:'Biddy Tarot emphasizes freedom from convention and personal belief.'},{q:'Why are two figures kneeling before him?',options:['They are receiving instruction in a shared rite','They are steering the chariot','They have fallen from a tower','They are waiting for a harvest'],answer:0,explain:'Biddy reads the followers as initiates; Waite identifies them as priestly ministers.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, VI; Pollack, 78 Degrees, “The Lovers”;
    // Biddy Tarot, “The Lovers Tarot Card Meanings” (RWS description and reversal).
    lovers:{
      numerology:{meaning:'Six restores relation after the tension of five.',why:'The Lovers picture a pair, but the angel above them changes a pair into a choice.',expression:'The card’s number lands in the open space between attraction, value and decision.',hook:'Six asks what can be joined without losing choice.'},
      colors:[{hex:'#8e709f',name:'Angel mantle violet',phrase:'a healing blessing'},{hex:'#3c834f',name:'Tree green',phrase:'temptation within growth'},{hex:'#e1c551',name:'Sun yellow',phrase:'union in open light'}],
      figure:'A man and woman stand unclothed beneath a winged figure. The woman turns toward the angel; the man looks toward her. A tree rises behind each figure.\n\nBiddy names the angel Raphael and reads the gaze as a path from physical desire through emotional needs to spiritual concerns. Waite leaves the angel unnamed.',
      challenge:'If the pair turned away from the angel and each other, the scene would become a divided choice rather than a shared one.',
      scene:{paragraphs:['The couple stands in a fertile garden. Behind the woman, a serpent winds through an apple tree; behind the man, flames rise from another tree.','A mountain divides the horizon beneath the angel. Desire, consequence and blessing occupy the same open space.'],takeaway:'The Lovers asks how a choice joins desire to the values that guide it.'},
      symbols:[{icon:'cloud-sun',name:'Blessing angel',where:'In the open sky over the couple.',meaning:'Waite describes a winged figure pouring down influences; Biddy identifies Raphael and a healing blessing. Echo: Judgement places another angel above figures answering a call.',echo:'Judgement places another angel above figures answering a call.'},{icon:'apple',name:'Serpent and apple tree',where:'Behind the woman.',meaning:'Biddy Tarot connects the tree with Eden and sensual temptation. Echo: The Devil’s chained pair shows attachment after choice has narrowed.',echo:'The Devil’s chained pair shows attachment after choice has narrowed.'},{icon:'flame',name:'Tree of flames',where:'Behind the man.',meaning:'Biddy reads passion and twelve zodiac signs; Waite describes twelve fruits on the Tree of Life. Echo: Temperance blends different forces rather than choosing one alone.',echo:'Temperance blends different forces rather than choosing one alone.'}],
      reversed:{shadow:'Waite’s reversal stresses failure, foolish designs and frustrated plans; Biddy Tarot emphasizes disharmony, mismatched values and difficult choices. Both make the issue a relationship out of alignment.',cautions:[{aspect:'Misaligned values',detail:'Two people may no longer be choosing from the same commitments.'},{aspect:'Avoided decision',detail:'A difficult choice is deferred while its consequences continue.'}],meanings:[{keyword:'connection',meaning:'The bond may lack reciprocity or shared direction.',application:'Notice whether each person’s values are being heard.'},{keyword:'choice',meaning:'A decision may be made from fear rather than conviction.',application:'Name what the choice protects and what it costs.'}],readingTip:'Use surrounding cards to distinguish relationship strain from an individual values conflict.',contrast:'Upright union includes conscious choice; reversed, connection or values may be out of sync.'},
      quiz:[{q:'Which name does Biddy Tarot give the angel above the RWS Lovers?',options:['Raphael','Gabriel','A sphinx','A crowned king'],answer:0,explain:'Biddy identifies Raphael; Waite describes a winged figure without naming it.'},{q:'You are weighing attraction against the values you want to live by. Which card fits?',options:['The Lovers','The Chariot','The Hermit','The Sun'],answer:0,explain:'The Lovers joins relationship and choice.'},{q:'The Lovers reversed can be read as:',options:['Disharmony or values out of alignment','A lost sense of direction on a journey','An excess of solitude','Unexpected recognition'],answer:0,explain:'Biddy Tarot emphasizes relationship strain and misaligned values.'},{q:'Why do the figures look in different directions?',options:['Their attention traces a path from person to person to the angel','They are looking for a lost cup','They are watching the wheel turn','They are avoiding a teacher’s blessing'],answer:0,explain:'Biddy Tarot reads the gaze sequence as conscious, subconscious and super-conscious.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, VII; Pollack, 78 Degrees, “The Chariot”;
    // Biddy Tarot, “The Chariot Tarot Card Meanings” (RWS description and reversal).
    chariot:{
      numerology:{meaning:'VII closes Pollack’s first line, concerned with worldly challenges.',why:'Biddy reads the two seated sphinxes as opposing forces.',expression:'Seven becomes a test of focused will, not simply speed or victory.',hook:'Seven asks whether the course can hold.'},
      colors:[{hex:'#202a34',name:'Sphinx black',phrase:'force held in tension'},{hex:'#eee8dc',name:'Sphinx white',phrase:'the complementary pull'},{hex:'#477ba4',name:'Canopy blue',phrase:'guidance beyond the driver'}],
      figure:'The armored Charioteer stands beneath a starry canopy. He holds no reins; black and white sphinxes sit before the vehicle.\n\nBiddy reads the pair as opposing pulls directed by will. Waite emphasizes conquest on external planes rather than complete inner liberation.',
      challenge:'If he gripped reins and leaned into one sphinx alone, mastery of the opposing forces would be lost.',
      scene:{paragraphs:['The city lies behind the Chariot; a river runs between its walls and the road ahead. Six-pointed stars cover the canopy.','The black and white sphinxes face different ways. The driver’s wand, not visible reins, marks how the vehicle is directed.'],takeaway:'The Chariot advances by containing opposing pulls, not by pretending they are absent.'},
      symbols:[{icon:'star',name:'Star canopy',where:'Over the Charioteer.',meaning:'Biddy connects the six-pointed stars with celestial guidance. Echo: The Star later opens the sky after The Tower.',echo:'The Star later opens the sky after The Tower.'},{icon:'cat',name:'Black and white sphinxes',where:'At the front of the chariot.',meaning:'Waite adopts two sphinxes; Biddy reads opposing forces directed by will. Echo: The Lovers presents a choice before this act of direction.',echo:'The Lovers presents a choice before this act of direction.'},{icon:'square',name:'Square on the tunic',where:'At the center of the Charioteer’s chest.',meaning:'Biddy connects the square with strength of will. Echo: Justice wears a square on her crown as a sign of ordered thought.',echo:'Justice wears a square on her crown as a sign of ordered thought.'}],
      reversed:{shadow:'Waite warns of riot, quarrel and dispute; Biddy Tarot describes lost direction, opposition or a need to change course. The reversal shifts from command to divided or stalled movement.',cautions:[{aspect:'Lost direction',detail:'The vehicle has power but no settled course.'},{aspect:'Forced control',detail:'Trying to command every detail intensifies the opposing pull.'}],meanings:[{keyword:'willpower',meaning:'Commitment is wavering or misdirected.',application:'Check whether the aim still matches the reason for moving.'},{keyword:'control',meaning:'Opposition or over-control blocks progress.',application:'Separate what can be steered from what cannot.'}],readingTip:'Use context to tell whether the Chariot is stalled, divided or gripping too tightly.',contrast:'Upright will coordinates opposing forces; reversed, force may be scattered or overused.'},
      quiz:[{q:'Which missing means of steering does Biddy Tarot emphasize?',options:['Reins','A wand','A crown','A canopy'],answer:0,explain:'Biddy describes no reins, only a wand. Waite’s text instead calls the held object a drawn sword.'},{q:'A person keeps moving toward a goal while managing competing demands. Which card fits?',options:['The Chariot','The Moon','The Empress','The Hanged Man'],answer:0,explain:'The paired sphinxes represent opposition held under direction.'},{q:'The Chariot reversed can be read as:',options:['Lost direction or opposition','A lack of imagination','An overfull harvest','A secret kept from a student'],answer:0,explain:'Biddy Tarot emphasizes opposition and lack of direction.'},{q:'Why are the two sphinxes different colors and turned in opposition?',options:['To show competing forces the driver must coordinate','To mark morning and evening','To distinguish two passengers','To show the city’s gatekeepers'],answer:0,explain:'Biddy Tarot interprets their opposing pull as forces directed by the Charioteer.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, VIII; Pollack, 78 Degrees, “Strength”;
    // Biddy Tarot, “Strength Tarot Card Meanings” (RWS description and reversal).
    strength:{
      numerology:{meaning:'VIII follows the Chariot in Waite’s numbering.',why:'Pollack begins the inward sequence with Strength: meeting hidden feeling calmly rather than extending the ego’s control.',expression:'The woman meets the lion with bare hands and calm attention, not armor or a weapon.',hook:'Strength holds the lion without a blade.'},
      colors:[{hex:'#eee9df',name:'Robe white',phrase:'composure without armor'},{hex:'#57904c',name:'Flower leaves green',phrase:'nature in gentle bloom'},{hex:'#c96848',name:'Lion orange-red',phrase:'passion brought into relation'}],
      figure:'A woman stands beside a lion, closing its jaws with unarmored hands. Flowers circle her head and waist; an infinity sign rests above her.\n\nWaite connects the scene with fortitude and contemplation. The lion is not struck down: the figure meets its force without a weapon.',
      challenge:'If she raised a blade, the scene would become a contest of force rather than a meeting with the lion.',
      scene:{paragraphs:['Green ground and flowering vines soften the open landscape. The woman’s white robe contrasts with the lion’s warm mane.','Her hands rest at the lion’s mouth. The animal remains present, but the posture is calm rather than combative.'],takeaway:'Strength gives instinct a place in the scene without letting it rule the whole picture.'},
      symbols:[{icon:'infinity',name:'Infinity sign',where:'Above the woman’s head.',meaning:'Waite calls it the sign of life; Pollack notes its echo in the flower belt joining woman and lion. Echo: The Magician wears the same sign above his head.',echo:'The Magician wears the same sign above his head.'},{icon:'paw-print',name:'Lion',where:'Beside the woman, its jaws under her hands.',meaning:'Waite associates the lion with passions and the higher nature that tames them. Echo: The Chariot’s sphinxes show opposing forces directed by will.',echo:'The Chariot’s sphinxes show opposing forces directed by will.'},{icon:'flower-2',name:'Flower belt',where:'Looped around the woman and lion.',meaning:'Waite reads the flower chain as a gentle bond taken into the heart. Echo: the Empress’s garden imagery places nature in a nurturing role.',echo:'The Empress’s garden imagery places nature in a nurturing role.'}],
      reversed:{shadow:'Waite lists weakness, discord, and sometimes abuse; Biddy Tarot emphasizes depleted confidence or energy, and raw emotion. The reversal may show inner strength running low or force breaking out without balance.',cautions:[{aspect:'Depleted resolve',detail:'Confidence and energy have been worn down.'},{aspect:'Raw force',detail:'Instinct takes over before it can be guided.'}],meanings:[{keyword:'courage',meaning:'Inner confidence is hard to access.',application:'Notice what has exhausted the reserve.'},{keyword:'passion',meaning:'Strong feeling may be expressed without restraint.',application:'Look for the difference between feeling and action.'}],readingTip:'Look to the surrounding cards to distinguish depletion from an outburst of force.',contrast:'Upright strength works through composure; reversed, composure may be missing or exhausted.'},
      quiz:[{q:'What appears above the woman’s head?',options:['An infinity sign','A crown of twelve stars','A crescent moon','A red cross'],answer:0,explain:'Waite describes the life symbol above the woman.'},{q:'A strong reaction is acknowledged without being acted out. Which card fits?',options:['Strength','The Tower','The Devil','The Chariot'],answer:0,explain:'The woman meets the lion calmly rather than attacking it.'},{q:'Strength reversed is most commonly read as:',options:['Self-doubt, low energy, or raw emotion','A fixed legal ruling','A new relationship','A delayed journey'],answer:0,explain:'Biddy Tarot lists self-doubt, low energy and raw emotion.'},{q:'How does the woman approach the lion?',options:['With bare hands and calm control','With a sword and shield','By turning her back','By binding it with chains'],answer:0,explain:'The RWS image shows her closing its jaws without a weapon.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, X; Pollack, 78 Degrees, “The Wheel of Fortune”;
    // Biddy Tarot, “Wheel of Fortune Tarot Card Meanings” (RWS description and reversal).
    'wheel-of-fortune':{
      numerology:{meaning:'X closes a numbered cycle and begins another turn.',why:'Waite describes the wheel as perpetual motion and the flux of human life.',expression:'The figures rise and fall around a center that remains balanced amid movement.',hook:'The wheel turns; the center holds.'},
      colors:[{hex:'#d9a04c',name:'Wheel orange',phrase:'life in continual motion'},{hex:'#6198bf',name:'Sphinx blue',phrase:'balance amid movement'},{hex:'#c45b42',name:'Anubis red',phrase:'the upward turn'}],
      figure:'There is no human center. A sphinx sits above the wheel; a serpent descends at one side while Anubis rises at the other. Four winged creatures occupy the corners.\n\nWaite describes the sphinx as stability within motion. The image does not promise that one position will last.',
      challenge:'If the sphinx were swept around with the other figures, the image would lose its still point amid change.',
      scene:{paragraphs:['A great wheel hangs in a field of sky. A serpent moves down one side while Anubis climbs the other.','At the top, the sphinx faces outward with a sword. In the corners, four winged figures read from open books.'],takeaway:'The Wheel places change and stability in the same frame.'},
      symbols:[{icon:'circle',name:'Wheel with letters',where:'Across the center of the card.',meaning:'Waite reads the wheel as the perpetual motion of a changing universe. Echo: The World’s wreath closes a cycle while opening the next.',echo:'The World’s wreath closes a cycle while opening the next.'},{icon:'sphinx',name:'Sphinx',where:'Balanced on top of the wheel.',meaning:'Waite calls the sphinx the equilibrium within movement. Echo: the Chariot’s sphinxes pull against one another below a driver.',echo:'The Chariot’s sphinxes pull against one another below a driver.'},{icon:'book-open',name:'Four winged creatures',where:'One in each corner.',meaning:'Waite identifies Ezekiel’s living creatures at the card’s angles. Echo: The World repeats the four corner guardians around a dancing figure.',echo:'The World repeats the four corner guardians around a dancing figure.'}],
      reversed:{shadow:'Waite lists increase, abundance and superfluity; Biddy Tarot emphasizes resistance to change, a downturn, or breaking a repeating cycle. The reversal can be a difficult turn or the end of a pattern.',cautions:[{aspect:'Resistance',detail:'Events turn, but the reading resists adapting to their direction.'},{aspect:'Cycle disrupted',detail:'A repeating pattern may be ending rather than continuing.'}],meanings:[{keyword:'cycles',meaning:'A change of direction feels obstructed.',application:'Notice which part of the cycle is repeating.'},{keyword:'turning point',meaning:'A familiar pattern may be breaking.',application:'Read nearby cards for what is ending or beginning.'}],readingTip:'Context helps tell resistance to change from a cycle that is already being broken.',contrast:'Upright motion is visible and balanced; reversed, the turn may be resisted or misread.'},
      quiz:[{q:'Which figure sits at the top of the Wheel?',options:['A sphinx','A child on a horse','A woman with scales','A hooded traveler'],answer:0,explain:'Waite places the sphinx above the wheel.'},{q:'A repeating circumstance changes direction while you look for what remains steady. Which card fits?',options:['Wheel of Fortune','The Hierophant','The Sun','The Fool'],answer:0,explain:'The Wheel depicts movement with the sphinx as its balance point.'},{q:'The Wheel of Fortune reversed is most commonly read as:',options:['Resistance to change or a cycle breaking','A pause for a new viewpoint','A hidden feeling','A choice about shared values'],answer:0,explain:'Biddy Tarot names resistance to change and breaking cycles.'},{q:'What does the serpent’s downward movement contrast with?',options:['Anubis rising on the opposite side','A second wheel below','The sphinx walking away','A river flowing upward'],answer:0,explain:'The RWS design pairs the descending serpent with a rising Anubis.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, XI; Pollack, 78 Degrees, “Justice”;
    // Biddy Tarot, “Justice Tarot Card Meanings” (RWS description and reversal).
    justice:{
      numerology:{meaning:'XI appears as the number of Justice in Waite’s sequence.',why:'The card sets a pair of scales beside a double-edged sword.',expression:'Its number lands in a decision that must balance evidence and consequence.',hook:'A measure in one hand, a decision in the other.'},
      colors:[{hex:'#6b557d',name:'Veil purple',phrase:'compassion behind judgment'},{hex:'#b43c32',name:'Robe red',phrase:'action with consequence'},{hex:'#d6b355',name:'Scales yellow',phrase:'an impartial measure'}],
      figure:'Justice sits between pillars, scales held in one hand and a sword upright in the other. A purple veil hangs behind her; a small white shoe shows beneath the robe.\n\nBiddy Tarot reads the sword as reason and the scales as intuition. Neither hand alone makes the judgment.',
      challenge:'If the sword dropped while the scales remained, the card would weigh without deciding.',
      scene:{paragraphs:['The throne stands between two pillars before a purple veil. The red robe falls in a straight line; one foot is partly visible below it.','Scales extend from one hand; the upright sword fills the other. The composition is still, but its decision is active.'],takeaway:'Justice weighs what is known, then acts with the consequence in view.'},
      symbols:[{icon:'scale',name:'Scales',where:'In her left hand.',meaning:'Biddy reads an impartial measure and intuition balancing logic; Waite stresses consequences according to one’s works. Echo: The Two of Pentacles shows balance as a daily moving task.',echo:'The Two of Pentacles shows balance as a daily moving task.'},{icon:'sword',name:'Upright sword',where:'In her right hand.',meaning:'Biddy reads the double edge as the consequences accompanying action. Echo: The Ace of Swords turns a single blade into a new idea or truth.',echo:'The Ace of Swords turns a single blade into a new idea or truth.'},{icon:'square',name:'Square on the crown',where:'At the center of the crown.',meaning:'Biddy links the square with ordered thought. Echo: The Chariot bears a square on the tunic, interpreted there as strength of will.',echo:'The Chariot bears a square on the tunic, interpreted there as strength of will.'}],
      reversed:{shadow:'Waite’s reversed list includes legal complications, bigotry, bias and excessive severity; equity belongs to his upright list. Biddy emphasizes unfairness, dishonesty and avoiding accountability.',cautions:[{aspect:'Unequal measure',detail:'The same standard may not be applied to everyone involved.'},{aspect:'Avoided accountability',detail:'A choice is made, but its consequences are assigned elsewhere.'}],meanings:[{keyword:'fairness',meaning:'A decision may be biased or poorly examined.',application:'Check what evidence has been left out.'},{keyword:'accountability',meaning:'Responsibility is being avoided.',application:'Name the action and its consequence plainly.'}],readingTip:'Use context to distinguish a flawed process from avoidance of responsibility.',contrast:'Upright Justice weighs and decides; reversed, the measure or accountability may be uneven.'},
      quiz:[{q:'Which object does Justice hold upright?',options:['A sword','A lantern','A wand','A trumpet'],answer:0,explain:'Biddy describes the upright sword in Justice’s right hand.'},{q:'A decision must be fair and its consequences accepted. Which card fits?',options:['Justice','The Star','The Fool','The Devil'],answer:0,explain:'The scales and sword join weighing with decision.'},{q:'Justice reversed can be read as:',options:['Unfairness or lack of accountability','A surge of creative energy','A pause chosen for insight','A completed journey'],answer:0,explain:'Biddy lists unfairness; Waite’s reversal includes bias and excessive severity.'},{q:'Why does Justice hold both scales and a sword?',options:['To weigh evidence and make a decision','To defend a city and guide a chariot','To harvest and plant wheat','To conceal a scroll and guard a veil'],answer:0,explain:'The two objects pair measure with action.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, XII; Pollack, 78 Degrees, “The Hanged Man”;
    // Biddy Tarot, “The Hanged Man Tarot Card Meanings” (RWS description and reversal).
    'hanged-man':{
      numerology:{meaning:'XII follows Justice in this deck; Pollack contrasts assessment with the experience of acceptance.',why:'The figure hangs from a living T-cross, suspended rather than fallen.',expression:'The pause is made visible through an inverted body and a calm face.',hook:'Suspension changes the view.'},
      colors:[{hex:'#b94236',name:'Trousers red',phrase:'passion held in suspension'},{hex:'#426d9d',name:'Tunic blue',phrase:'knowledge from another angle'},{hex:'#d4b344',name:'Halo gold',phrase:'insight within the pause'}],
      figure:'A man hangs upside down from a living T-shaped tree, one foot bound while the other bends behind it. His hands are hidden; a halo circles his calm face.\n\nWaite describes the image as a suspended figure, not a struggle to escape. Biddy Tarot likewise reads the chosen pose as a new perspective.',
      challenge:'If he fought against the binding, the pause would become a scene of entrapment rather than chosen suspension.',
      scene:{paragraphs:['A living branch crosses the frame like a T. Green leaves remain on the wood while the figure hangs head-down beneath it.','His red trousers and blue tunic stay bright against the tree; a halo marks the still space around his head.'],takeaway:'The Hanged Man changes perspective by remaining suspended rather than forcing movement.'},
      symbols:[{icon:'tree-deciduous',name:'Living T-cross',where:'Across the top of the hanging figure.',meaning:'Waite specifies a living tree shaped as a T-cross. Echo: The World’s wreath forms a circular frame around movement rather than suspension.',echo:'The World’s wreath forms a circular frame around movement rather than suspension.'},{icon:'sun',name:'Halo',where:'Around the figure’s head.',meaning:'Biddy Tarot reads the halo as new insight and awareness. Echo: the Hermit’s lantern carries light outward into the path.',echo:'the Hermit’s lantern carries light outward into the path.'},{icon:'footprints',name:'Bound foot',where:'One foot is tied to the branch; the other remains free.',meaning:'Biddy Tarot notes the single bound foot and the free leg folded behind it. Echo: the Eight of Swords shows restriction from another perspective.',echo:'the Eight of Swords shows restriction from another perspective.'}],
      reversed:{shadow:'Waite lists selfishness, the crowd and the body politic; he does not say political sacrifice. Biddy emphasizes resistance, delay and indecision: a useful pause can become avoidance.',cautions:[{aspect:'Resisted pause',detail:'Activity continues to avoid a needed change in perspective.'},{aspect:'Stalled decision',detail:'Waiting has become a way to avoid choosing.'}],meanings:[{keyword:'surrender',meaning:'The pause is resisted or prolonged.',application:'Notice whether stillness is chosen or imposed.'},{keyword:'perspective',meaning:'A decision may be stalled while waiting for certainty.',application:'Ask what can be seen from the position you are in.'}],readingTip:'Use context to tell a necessary pause from avoidance or delay.',contrast:'Upright suspension opens another view; reversed, it may be resisted or become stagnation.'},
      quiz:[{q:'What shape does the living branch form?',options:['A T-cross','A wheel','A doorway','A crown'],answer:0,explain:'Biddy Tarot describes the living tree as T-shaped.'},{q:'A person stops pressing forward to reconsider the situation from another angle. Which card fits?',options:['The Hanged Man','The Chariot','The Emperor','The Sun'],answer:0,explain:'The suspended figure embodies a pause and a changed viewpoint.'},{q:'The Hanged Man reversed is most commonly read as:',options:['Resistance to pausing or stalling','Unfair judgment','A new partnership','A cycle turning freely'],answer:0,explain:'Biddy Tarot emphasizes delays, resistance and indecision.'},{q:'What suggests the hanging may be chosen rather than forced?',options:['His calm face and one free leg','A sword held above him','A crowd pulling the rope','A storm breaking the tree'],answer:0,explain:'The calm expression and unbound leg support the voluntary reading.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, XIII; Pollack, 78 Degrees, “Death”;
    // Biddy Tarot, “Death Tarot Card Meanings” (RWS description and reversal).
    death:{
      numerology:{meaning:'XIII follows the suspended pause of XII in Waite’s sequence.',why:'The rider moves through a scene where king, child and maiden all meet the same passage.',expression:'The number marks a threshold in the sequence, while the white rose keeps life visible on the black banner.',hook:'The rose remains while the old form passes.'},
      colors:[{hex:'#101218',name:'Banner black',phrase:'the passage through an ending'},{hex:'#eee9de',name:'Rose white',phrase:'life within the ending'},{hex:'#dbbe55',name:'Horizon sun yellow',phrase:'continuity beyond the passage'}],
      figure:'A skeletal rider crosses the card on a white horse, carrying a black banner with a white rose. A king lies fallen; a child, maiden and bishop face the rider.\n\nWaite insists the banner’s rose signifies life. The rider does not stop for rank or age; the scene is transition, not punishment.',
      challenge:'If the rider turned back to spare the king, the procession would cease to pass through every station of life.',
      scene:{paragraphs:['The white horse moves beside a river. Between two towers, the sun sits low on the horizon.','A black banner crosses the scene, its white rose bright against the dark cloth; figures meet the rider in different postures.'],takeaway:'Death carries life’s sign through an ending that no rank can avoid.'},
      symbols:[{icon:'flag',name:'Black banner and rose',where:'Raised by the rider.',meaning:'Waite says the Mystic Rose signifies life on the black banner. Echo: The Fool carries a white rose at the beginning of the journey.',echo:'The Fool carries a white rose at the beginning of the journey.'},{icon:'horse',name:'White horse',where:'Beneath the skeletal rider.',meaning:'Biddy reads the horse as strength and purity beside the armored skeleton. Echo: The Sun’s white horse carries a child in a scene of open vitality.',echo:'The Sun’s white horse carries a child in a scene of open vitality.'},{icon:'sun',name:'Sun between towers',where:'Low on the horizon.',meaning:'Waite calls it the sun of immortality; Biddy reads sunset and the next sunrise. Echo: The Moon reuses twin towers under reflected light.',echo:'The Moon reuses twin towers under reflected light.'}],
      reversed:{shadow:'Waite lists inertia, sleep, lethargy and petrifaction; Biddy Tarot emphasizes resistance to change or private transformation. The reversal may freeze the passage or turn it inward.',cautions:[{aspect:'Resistance',detail:'An ending is held off even after its shape is clear.'},{aspect:'Private transition',detail:'Change is underway but has not yet become visible to others.'}],meanings:[{keyword:'ending',meaning:'A needed transition is resisted or delayed.',application:'Notice what has already reached its limit.'},{keyword:'transformation',meaning:'Change may be happening inwardly first.',application:'Look for what is being released quietly.'}],readingTip:'Read neighboring cards to distinguish resistance from a private, ongoing transformation.',contrast:'Upright Death moves through transition openly; reversed, change may be resisted or internalized.'},
      quiz:[{q:'What appears on the rider’s black banner?',options:['A white rose','A red cross','A crescent moon','A pair of scales'],answer:0,explain:'Waite identifies the Mystic Rose on the black banner.'},{q:'An old role ends, while a sign of life remains in the scene. Which card fits?',options:['Death','The Devil','The Hierophant','The Chariot'],answer:0,explain:'The rose on the banner accompanies the passage through change.'},{q:'Death reversed is most commonly read as:',options:['Resistance to change or private transformation','A confident new beginning','A fair decision','A shared celebration'],answer:0,explain:'Biddy Tarot emphasizes resistance and inner transformation.'},{q:'Why are people of different ages shown before the rider?',options:['The passage reaches every station of life','They are waiting for a teacher','They are preparing for a harvest','They are the four elements'],answer:0,explain:'Waite describes king, child, maiden and prelate before the rider.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, XIV; Pollack, 78 Degrees, “Temperance”;
    // Biddy Tarot, “Temperance Tarot Card Meanings” (RWS description and reversal).
    temperance:{
      numerology:{meaning:'XIV follows the ending of XIII and returns the sequence to measured movement.',why:'The angel joins land and water, pouring between two cups.',expression:'The scene makes patience an active blending, not an empty wait.',hook:'A measured pour joins two sides.'},
      colors:[{hex:'#dae7e6',name:'Robe pale blue',phrase:'different natures harmonized'},{hex:'#77a1b8',name:'Pool blue',phrase:'groundedness meeting flow'},{hex:'#d1aa3c',name:'Distant crown gold',phrase:'purpose held in view'}],
      figure:'A winged figure stands with one foot on land and one in water, pouring between two cups. A triangle sits inside a square on the robe.\n\nWaite describes an angel neither male nor female, harmonizing psychic and material natures. The measured exchange gives the work a calm rhythm.',
      challenge:'If the cups were tipped quickly, blending would become spill and imbalance.',
      scene:{paragraphs:['A pool rests beside the path; mountains rise beyond it. One foot stands on the bank, the other in the water.','The angel pours between cups while the path leads toward a distant crown of light. The composition gives patience a direction.'],takeaway:'Temperance joins different conditions through measured exchange.'},
      symbols:[{icon:'droplets',name:'Two cups',where:'Held at the angel’s hands.',meaning:'Waite describes the essences of life passing between chalices, harmonizing psychic and material natures. Echo: The Two of Cups shows exchange between people.',echo:'The Two of Cups shows exchange between people.'},{icon:'triangle',name:'Triangle in square',where:'On the angel’s chest.',meaning:'Biddy reads human life within earthly law. Echo: The Chariot’s square is interpreted as strength of will, not an identical rule.',echo:'The Chariot’s square is interpreted as strength of will, not an identical rule.'},{icon:'footprints',name:'One foot on land, one in water',where:'At the pool’s edge.',meaning:'Biddy reads groundedness joined to flow. Echo: The Star rests a knee on land and a foot on water while pouring outward.',echo:'The Star rests a knee on land and a foot on water while pouring outward.'}],
      reversed:{shadow:'Waite lists disunion, competing interests and unfortunate combinations; Biddy Tarot emphasizes imbalance, excess or a need to realign. The reversal turns blending into a mixture that no longer holds.',cautions:[{aspect:'Excess',detail:'One element overwhelms the other instead of meeting it.'},{aspect:'Misalignment',detail:'The daily pattern no longer fits the longer purpose.'}],meanings:[{keyword:'balance',meaning:'The mix has become unequal.',application:'Notice which side is taking more than it gives.'},{keyword:'moderation',meaning:'Extremes are disrupting the flow.',application:'Look for a smaller, steadier adjustment.'}],readingTip:'Use context to tell whether the issue is excess, imbalance or an overdue realignment.',contrast:'Upright Temperance blends with care; reversed, the mixture may be uneven or strained.'},
      quiz:[{q:'What is the angel doing with the cups?',options:['Pouring between them','Stacking them on a table','Hiding one behind a veil','Offering them to the sphinx'],answer:0,explain:'Waite describes liquid passing between the two vessels.'},{q:'Different needs are being combined slowly into a workable arrangement. Which card fits?',options:['Temperance','The Tower','The Devil','The Fool'],answer:0,explain:'Temperance pictures measured exchange and balance.'},{q:'Temperance reversed is most commonly read as:',options:['Imbalance or excess','A hidden invitation','A legal ruling','A completed journey'],answer:0,explain:'Biddy Tarot names imbalance and excess among reversed meanings.'},{q:'What does the angel’s stance combine?',options:['Land and water','Fire and lightning','A cliff and a valley','A throne and a temple'],answer:0,explain:'One foot is on land and one is in water.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, XV; Pollack, 78 Degrees, “The Devil”;
    // Biddy Tarot, “The Devil Tarot Card Meanings” (RWS description and reversal).
    devil:{
      numerology:{meaning:'XV follows Temperance’s measured blending with a card of attachment.',why:'Waite places two chained figures at the foot of the Devil’s pedestal.',expression:'The loose chains make the number’s tension visible: bondage is pictured, but so is the possibility of release.',hook:'The chain hangs loose.'},
      colors:[{hex:'#15151a',name:'Background black',phrase:'awareness obscured'},{hex:'#e1b94a',name:'Torch flame yellow',phrase:'desire turned downward'},{hex:'#999798',name:'Chain grey',phrase:'attachment made visible'}],
      figure:'The Devil looms above a naked man and woman, each chained to the pedestal. His torch points down; the neck loops hang loose.\n\nWaite says the figure will not remain their master forever. Biddy highlights removable loops; this image is not proof that real constraints can always be left easily.',
      challenge:'If the neck loops opened, what other practical or emotional support might still be needed to leave?',
      scene:{paragraphs:['A dark field leaves little horizon. The bat-winged figure occupies an altar-like block while a torch points down toward the chained pair.','Grapes and flame mark the figures’ tails; their neck loops hang loose. The image sets constraint beside a possible opening.'],takeaway:'The Devil shows attachment as a bond that can be examined, not an invisible law.'},
      symbols:[{icon:'link',name:'Loose chains',where:'Around the necks of the two figures.',meaning:'Biddy Tarot notes that the links could be removed. Echo: the Eight of Swords presents restriction through a different set of bindings.',echo:'the Eight of Swords presents restriction through a different set of bindings.'},{icon:'flame',name:'Downward torch',where:'In the Devil’s left hand.',meaning:'Waite describes the torch as a sign turned toward the lower scene. Echo: The Star pours water toward earth in a contrasting gesture.',echo:'The Star pours water toward earth in a contrasting gesture.'},{icon:'pentagon',name:'Inverted pentagram',where:'On the Devil’s forehead.',meaning:'Biddy Tarot identifies the inverted star as a mark associated with occultism. Echo: Pentacles upright use the star as a sign of material life.',echo:'Pentacles upright use the star as a sign of material life.'}],
      reversed:{shadow:'Waite’s reversal lists evil fatality, weakness, pettiness and blindness; force belongs to his upright list. Biddy allows releasing limiting attachments or confronting shadow material, a different emphasis.',cautions:[{aspect:'Attachment loosened',detail:'A former constraint is beginning to release.'},{aspect:'Shadow exposed',detail:'A hidden desire or fear is being faced directly.'}],meanings:[{keyword:'bondage',meaning:'A limiting tie may be weakening.',application:'Notice which part of the chain is already loose.'},{keyword:'shadow',meaning:'A concealed motive is becoming visible.',application:'Separate the image of the desire from its consequence.'}],readingTip:'Context helps distinguish release from a confrontation with what has been hidden.',contrast:'Upright attachment appears binding; reversed, the bond may loosen or become conscious.'},
      quiz:[{q:'What is distinctive about the chains around the pair?',options:['They hang loose','They are made of flowers','They join the two pillars','They are held by the angel'],answer:0,explain:'Biddy Tarot notes the chains are loose and could be removed.'},{q:'A person notices that a limiting habit is sustained by a bond they can examine. Which card fits?',options:['The Devil','The Star','Justice','The World'],answer:0,explain:'The image places loose chains beside the chained figures.'},{q:'The Devil reversed is most commonly read as:',options:['Releasing limiting attachments or facing shadow','A public celebration','A new authority structure','A pause chosen for reflection'],answer:0,explain:'Biddy Tarot emphasizes detachment and confronting limiting beliefs.'},{q:'Where does the torch point?',options:['Down toward the figures','Up toward the star canopy','Behind the throne','Across the river'],answer:0,explain:'The Devil holds a lit torch pointing down.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, XVI; Pollack, 78 Degrees, “The Tower”;
    // Biddy Tarot, “The Tower Tarot Card Meanings” (RWS description and reversal).
    tower:{
      numerology:{meaning:'XVI follows the Devil and marks a sudden break in the sequence.',why:'Waite reads a house of falsehood torn apart; Biddy links the lightning with sudden insight.',expression:'The falling figures show the disruption reaching the occupants, not only the building.',hook:'The crown falls with the false height.'},
      colors:[{hex:'#131924',name:'Night sky black',phrase:'certainty overwhelmed'},{hex:'#e8c84b',name:'Lightning yellow',phrase:'sudden clarity'},{hex:'#969b9d',name:'Tower grey',phrase:'a rigid structure exposed'}],
      figure:'Lightning strikes the crowned tower. Two figures fall headfirst from its windows; the crown breaks away from the roof.\n\nWaite reads the rending of a house of falsehood. Biddy connects the bolt with revelation, but the image also shows the distress of those inside.',
      challenge:'If the crown stayed fixed and the figures remained inside, the picture would lose the sudden break that defines it.',
      scene:{paragraphs:['A dark sky surrounds a narrow tower on a rocky height. Lightning cuts down through the crown, and flames show at the windows.','Two figures fall into open space. The scene contains no stable ground beneath them yet.'],takeaway:'The Tower breaks a structure in one stroke and exposes what it could not hold.'},
      symbols:[{icon:'zap',name:'Lightning bolt',where:'Striking the top of the tower.',meaning:'Biddy reads a sudden surge of insight; Waite calls the structure a house of falsehood. Echo: The Sun’s rays bring illumination without destruction.',echo:'The Sun’s rays bring illumination without destruction.'},{icon:'crown',name:'Falling crown',where:'Toppling from the roof.',meaning:'Biddy connects the tower with ambitions based on false premises and the crown with energy entering from above. Echo: The Emperor’s crown stays on its wearer.',echo:'The Emperor’s crown stays on its wearer.'},{icon:'flame',name:'Flames at the windows',where:'Bursting from openings in the tower.',meaning:'The fire visibly reaches the interior; this is an editorial observation, not a numerical color rule. Echo: The Devil’s torch points down, but this fire spreads through a building.',echo:'The Devil’s torch points down, but this fire spreads through a building.'}],
      reversed:{shadow:'Waite lists oppression, imprisonment and tyranny; Biddy Tarot reads personal upheaval, resistance to change or an avoided disaster. Reversal can keep pressure contained or turn the disruption inward.',cautions:[{aspect:'Change resisted',detail:'A structure is already unstable, but its break is being denied.'},{aspect:'Private upheaval',detail:'The transformation is occurring inwardly before it is visible.'}],meanings:[{keyword:'upheaval',meaning:'Pressure is contained or delayed.',application:'Notice what is no longer supported by its foundation.'},{keyword:'revelation',meaning:'A private change may be underway.',application:'Look for what has already shifted beneath the surface.'}],readingTip:'Use surrounding cards to distinguish resistance from an inward transformation.',contrast:'Upright collapse is visible; reversed, it may be resisted, reduced or internal.'},
      quiz:[{q:'What strikes the crowned tower?',options:['Lightning','A falling star','A trumpet blast','A river wave'],answer:0,explain:'The visible lightning strike is described in Biddy’s RWS account.'},{q:'A false foundation gives way and the crown topples. Which card fits?',options:['The Tower','The World','The Hierophant','The Empress'],answer:0,explain:'The lightning-struck building is the central RWS image.'},{q:'The Tower reversed can be read as:',options:['Resistance to change or private upheaval','A calm period of completion','A shared tradition','An open new beginning'],answer:0,explain:'Biddy describes personal transformation, fear of change and averting disaster.'},{q:'Why are the figures shown falling from the windows?',options:['The disruption reaches those inside the structure','They are answering a trumpet call','They are climbing toward the crown','They are leaving a garden'],answer:0,explain:'The falling figures make the collapse affect the occupants as well as the tower.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, XVII; Pollack, 78 Degrees, “The Star”;
    // Biddy Tarot, “The Star Tarot Card Meanings” (RWS description and reversal).
    star:{
      numerology:{meaning:'XVII follows the Tower’s rupture in Waite’s sequence.',why:'The Star places one large light among seven smaller ones after the dark event.',expression:'Its figure pours water onto land and back into a pool, returning the scene to exchange.',hook:'After the break, water reaches the ground.'},
      colors:[{hex:'#d4c957',name:'Large star gold',phrase:'a steady inner light'},{hex:'#7ca8be',name:'Water blue',phrase:'renewal freely given'},{hex:'#54844a',name:'Land green',phrase:'fertility replenished'}],
      figure:'A naked woman rests her left knee on land and her right foot on water, pouring from two vessels. One large star and seven smaller stars fill the sky; a bird rests in a tree.\n\nWaite reads a free gift of the waters of life. Pollack contrasts this relaxed openness with Temperance’s controlled exchange.',
      challenge:'If she poured only into the pool, the dry ground would receive none of the water.',
      scene:{paragraphs:['A star-filled sky opens over a pool and low green land. One large star is surrounded by seven smaller ones.','The kneeling figure pours water from two vessels, one stream to earth and another to the pool. A bird settles in the tree beyond.'],takeaway:'The Star restores exchange between the water and the land after The Tower.'},
      symbols:[{icon:'star',name:'Eight-pointed stars',where:'One large star and seven smaller ones fill the sky.',meaning:'Waite describes their rays and calls the scene a communication of the heavens and elements. Echo: The Hermit carries a single star inside a lantern.',echo:'The Hermit carries a single star inside a lantern.'},{icon:'amphora',name:'Two vessels',where:'One in each of the woman’s hands.',meaning:'Waite describes water poured across land and sea as the waters of life. Echo: Temperance pours between two cups.',echo:'Temperance pours between two cups.'},{icon:'bird',name:'Bird in the tree',where:'Perched on the shrub to the right.',meaning:'Waite notes the bird within the living landscape. Echo: The Fool’s dog is another animal companion close to a threshold.',echo:'The Fool’s dog is another animal companion close to a threshold.'}],
      reversed:{shadow:'Waite lists arrogance, haughtiness and impotence; Biddy Tarot emphasizes lack of faith, disconnection and depleted inspiration. These differ in tone; the reversal may be pride or a loss of trust in the light.',cautions:[{aspect:'Hope obscured',detail:'The available light is hard to see through discouragement.'},{aspect:'Prideful distance',detail:'Waite’s reversal warns of a stance that keeps others below.'}],meanings:[{keyword:'hope',meaning:'Faith or inspiration feels distant.',application:'Notice whether the loss is temporary or defended.'},{keyword:'renewal',meaning:'A generous exchange may have stopped.',application:'Look at what is no longer being replenished.'}],readingTip:'Let surrounding cards distinguish discouraged faith from Waite’s warning about arrogance.',contrast:'Upright the Star pours and receives; reversed the flow may be blocked or the light distrusted.'},
      quiz:[{q:'How many smaller stars surround the large star?',options:['Seven','Four','Twelve','Two'],answer:0,explain:'Waite describes one great star surrounded by seven lesser stars.'},{q:'After upheaval, a person begins sharing what restores both them and their surroundings. Which card fits?',options:['The Star','The Tower','The Devil','Justice'],answer:0,explain:'The figure pours water to land and pool beneath the stars.'},{q:'The Star reversed is most commonly read as:',options:['Lack of faith or disconnection','Excessive control','A delayed legal ruling','An unexamined tradition'],answer:0,explain:'Biddy Tarot emphasizes loss of faith, despair and disconnection.'},{q:'Why does the figure pour water to both land and pool?',options:['To nourish both the ground and the water','To put out the Tower’s flames','To hide the vessels from view','To mark a boundary between the pillars'],answer:0,explain:'Waite describes the vessels irrigating both land and sea.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, XVIII; Pollack, 78 Degrees, “The Moon”;
    // Biddy Tarot, “The Moon Tarot Card Meanings” (RWS description and reversal).
    moon:{
      numerology:{meaning:'XVIII follows the Star’s first light with a more uncertain landscape.',why:'The Moon’s path winds between towers while animals answer its light.',expression:'The card’s number is felt as a long passage through signs that do not yet settle into certainty.',hook:'A winding path under a partial light.'},
      colors:[{hex:'#d5c257',name:'Moon yellow',phrase:'reflected light into the unknown'},{hex:'#6897a7',name:'Pool blue',phrase:'the unconscious stirring'},{hex:'#b46c42',name:'Crayfish russet',phrase:'something hidden emerging'}],
      figure:'No human figure stands in the foreground. A crayfish emerges from the pool while a dog and wolf answer the moon; a path runs between two towers.\n\nBiddy Tarot reads these creatures as tamed and wild aspects of mind. The viewer must follow a path whose end is not visible.',
      challenge:'If the path ran straight beneath full daylight, the scene would lose its uncertainty and become the Sun.',
      scene:{paragraphs:['A lunar disc with a crescent profile shines above two towers. Waite describes an increasing moon and reflected light; Biddy calls the disc full.','A crayfish crawls from the pool; dog and wolf face upward. The land is familiar and strange at once.'],takeaway:'The Moon asks you to read the path while some of its meaning remains hidden.'},
      symbols:[{icon:'moon',name:'Moon and falling drops',where:'Above the twin towers.',meaning:'Waite describes reflected light and the dew of thought; Biddy reads dim, partial illumination. Echo: The Sun gives the landscape direct light.',echo:'The Sun gives the landscape direct light.'},{icon:'dog',name:'Dog and wolf',where:'On opposite sides of the path.',meaning:'Biddy reads tamed and wild aspects of mind; Waite stresses fear before the unknown. Echo: The Fool’s dog is a single companion at the journey’s edge.',echo:'The Fool’s dog is a single companion at the journey’s edge.'},{icon:'crab',name:'Crayfish',where:'Emerging from the pool at the path’s entrance.',meaning:'Biddy connects it with early consciousness rising from the subconscious. Echo: The High Priestess guards what remains below the surface.',echo:'The High Priestess guards what remains below the surface.'}],
      reversed:{shadow:'Waite lists instability, silence and lesser degrees of deception; Biddy Tarot describes fears subsiding or emotions continuing to be repressed. The reversal may clear confusion or hide it deeper.',cautions:[{aspect:'Fear easing',detail:'An earlier uncertainty is beginning to lose its hold.'},{aspect:'Emotion buried',detail:'A feeling may be pushed down rather than understood.'}],meanings:[{keyword:'illusion',meaning:'Confusion may be clearing or returning inward.',application:'Separate what is observed from what is feared.'},{keyword:'intuition',meaning:'An inner signal is difficult to interpret.',application:'Give it time before treating it as certainty.'}],readingTip:'Use context to tell whether the Moon’s fog is lifting or whether feelings remain buried.',contrast:'Upright uncertainty is visible in the winding path; reversed, fear may ease or become concealed.'},
      quiz:[{q:'Which creature emerges from the pool at the path’s entrance?',options:['A crayfish','A small dog','A lion','A white horse'],answer:0,explain:'Biddy Tarot identifies the crayfish emerging from the water.'},{q:'A familiar situation feels unclear, and you cannot yet see where the path ends. Which card fits?',options:['The Moon','The Sun','The Emperor','The World'],answer:0,explain:'The winding path is only partly lit by the moon.'},{q:'The Moon reversed is most commonly read as:',options:['Fear easing or emotion kept repressed','A public victory','Excessive control','A new teacher arriving'],answer:0,explain:'Biddy Tarot gives both diminishing fears and continued repression as possibilities.'},{q:'Why are a dog and wolf both shown howling?',options:['To show tamed and wild responses to the same uncertain light','To guard a temple entrance','To pull a chariot in opposite directions','To represent two students before a teacher'],answer:0,explain:'Biddy Tarot interprets the pair as tamed and wild aspects of the mind.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, XIX; Pollack, 78 Degrees, “The Sun”;
    // Biddy Tarot, “The Sun Tarot Card Meanings” (RWS description and reversal).
    sun:{
      numerology:{meaning:'XIX stands after the Moon’s uncertain passage in Waite’s sequence.',why:'The Sun places a child, horse and sunflowers in open light.',expression:'Its number meets a scene with no veil: the child rides openly before the wall.',hook:'The light reaches the whole scene.'},
      colors:[{hex:'#f2ce43',name:'Sun yellow',phrase:'warmth without concealment'},{hex:'#eee9df',name:'Horse white',phrase:'innocence in motion'},{hex:'#bd3c32',name:'Banner red',phrase:'joy carried outward'}],
      figure:'A naked child sits on a white horse with arms open and a red banner in hand. Four sunflowers rise behind a low wall.\n\nBiddy reads the child as joy and the horse as purity and strength. The unclothed figure is presented openly, without concealment.',
      challenge:'If the child hid behind the wall, the joy would stay private rather than fill the scene.',
      scene:{paragraphs:['A large sun fills the sky above four sunflowers and a low brick wall. The foreground is open and bright.','The child rides forward on a calm white horse, red banner raised. There is no shadowed path to decode.'],takeaway:'The Sun makes vitality visible and shared in the present moment.'},
      symbols:[{icon:'sun',name:'Radiant sun',where:'Filling the sky above the wall.',meaning:'Biddy Tarot calls it the source of life and the image’s central radiance. Echo: The Moon’s dim light only partly reveals its path.',echo:'The Moon’s dim light only partly reveals its path.'},{icon:'flower',name:'Four sunflowers',where:'Growing behind the low wall.',meaning:'Biddy Tarot links the four flowers with the four suits and elements. Echo: the Magician lays the four suit emblems on his table.',echo:'the Magician lays the four suit emblems on his table.'},{icon:'horse',name:'Child on white horse',where:'In the foreground.',meaning:'Biddy Tarot reads the child as open joy and the horse as purity and strength. Echo: Death’s white horse carries a very different passage.',echo:'Death’s white horse carries a very different passage.'}],
      reversed:{shadow:'Waite keeps the upright happiness and contentment in a lesser sense when reversed. Biddy allows reconnecting with play, low spirits or excessive optimism; joy need not become its opposite.',cautions:[{aspect:'Light dimmed',detail:'A setback makes it hard to feel the warmth already present.'},{aspect:'Overconfidence',detail:'Optimism outruns what the scene can support.'}],meanings:[{keyword:'joy',meaning:'Vitality may be muted or private.',application:'Notice what is blocking the view of what is working.'},{keyword:'clarity',meaning:'Confidence may exceed the evidence.',application:'Check the bright reading against practical details.'}],readingTip:'Context can show whether the Sun is temporarily obscured or shining too brightly to see clearly.',contrast:'Upright warmth is direct and shared; reversed, it may be dimmed or inflated.'},
      quiz:[{q:'How many sunflowers appear behind the wall?',options:['Four','Seven','Two','Twelve'],answer:0,explain:'Biddy Tarot identifies four sunflowers in the RWS image.'},{q:'A moment of success and energy can be enjoyed openly. Which card fits?',options:['The Sun','The Moon','The Hermit','The Hanged Man'],answer:0,explain:'The child rides in an open, bright scene.'},{q:'The Sun reversed is most commonly read as:',options:['Feeling down or being overly optimistic','A secret kept from others','A stalled legal decision','A new emotional offer'],answer:0,explain:'Biddy Tarot includes feeling down and over-optimism.'},{q:'Why is the child shown unclothed?',options:['Biddy Tarot reads this as having nothing to hide and childhood innocence','To show the journey is dangerous','To mark a formal ritual','To hide the child’s identity'],answer:0,explain:'The RWS description links the child’s nakedness with innocence and openness.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, XX; Pollack, 78 Degrees, “Judgement”;
    // Biddy Tarot, “Judgement Tarot Card Meanings” (RWS description and reversal).
    judgement:{
      numerology:{meaning:'XX follows the Sun’s open vitality in Waite’s sequence.',why:'A trumpet calls the dead to rise and face a reckoning.',expression:'The number lands in a response: figures awaken together and lift their arms.',hook:'The call is answered by rising.'},
      colors:[{hex:'#a6b9b7',name:'Figures grey',phrase:'awakening into response'},{hex:'#b84237',name:'Cross red',phrase:'a turning-point call'},{hex:'#eee9df',name:'Banner white',phrase:'a summons to renewal'}],
      figure:'Naked figures rise from open coffins with arms outspread. An angel sounds a bannered trumpet above them; a red cross marks the call.\n\nBiddy identifies Gabriel; Waite leaves the angel unnamed and reads transformation answering a summons heard within.',
      challenge:'If the figures stayed in their graves, the sound would arrive without an answer.',
      scene:{paragraphs:['Grey water and mountains frame open coffins. The figures respond to a trumpet sounding from the clouds.','A red cross marks the banner. Waite notes a foreground child with its back turned and additional figures beyond the family.'],takeaway:'Judgement turns recognition into a response to the call.'},
      symbols:[{icon:'megaphone',name:'Trumpet',where:'Blown by the angel above the figures.',meaning:'Waite connects the bannered trumpet with an inward summons to transformation; Biddy names Gabriel. Echo: The Fool’s open step begins a journey; Judgement calls it toward recognition.',echo:'The Fool’s open step begins a journey; Judgement calls it toward recognition.'},{icon:'flag',name:'Red-cross banner',where:'Hanging from the trumpet.',meaning:'Pollack connects the cross with a crossroads demanding change. Echo: Death carries a black banner with a rose through another threshold.',echo:'Death carries a black banner with a rose through another threshold.'},{icon:'users',name:'Figures rising from coffins',where:'Across the lower half of the card.',meaning:'Waite describes wonder, adoration and ecstasy; Biddy describes a shared response. Echo: The World’s four guardians frame a completed journey.',echo:'The World’s four guardians frame a completed journey.'}],
      reversed:{shadow:'Waite lists weakness, timidity and simplicity, but also deliberation, decision and sentence—not irresolution. Biddy emphasizes self-doubt, an inner critic or ignoring the call.',cautions:[{aspect:'Call ignored',detail:'A needed response is delayed by fear or hesitation.'},{aspect:'Harsh self-judgment',detail:'Review becomes an inner verdict rather than recognition.'}],meanings:[{keyword:'awakening',meaning:'The summons is not being heard or trusted.',application:'Notice what the surrounding cards say is asking for a response.'},{keyword:'reckoning',meaning:'The past may be judged without perspective.',application:'Separate honest review from condemnation.'}],readingTip:'Context reveals whether the call is ignored or the inner critic has become too loud.',contrast:'Upright recognition leads to response; reversed, doubt or avoidance interrupts it.'},
      quiz:[{q:'Who blows the trumpet above the rising figures?',options:['Gabriel','Raphael','A sphinx','A crowned child'],answer:0,explain:'Biddy Tarot identifies Archangel Gabriel as the trumpet bearer.'},{q:'A group recognizes a turning point and answers a summons together. Which card fits?',options:['Judgement','The Hermit','The Devil','The Emperor'],answer:0,explain:'The rising figures respond to Gabriel’s trumpet.'},{q:'Judgement reversed is most commonly read as:',options:['Self-doubt or ignoring the call','A completed cycle','An excess of material wealth','A new creative spark'],answer:0,explain:'Biddy Tarot lists self-doubt, inner criticism and ignoring the call.'},{q:'Why are figures of different ages shown rising together?',options:['The call reaches the whole group','They are students before a teacher','They are the four seasons','They are celebrating a harvest'],answer:0,explain:'Biddy Tarot describes men, women and children answering the trumpet.'}]
    },
    // Sources consulted: Waite, Pictorial Key, Part II, XXI; Pollack, 78 Degrees, “The World”;
    // Biddy Tarot, “The World Tarot Card Meanings” (RWS description and reversal).
    world:{
      numerology:{meaning:'XXI closes the numbered trumps; the journey language is an editorial sequence reading.',why:'Waite describes the dancing figure and living creatures in Part I; Part II reads cosmic perfection.',expression:'The figure moves inside a frame that is both completion and a way through.',hook:'The wreath closes around a dance that continues.'},
      colors:[{hex:'#75618f',name:'Sash violet',phrase:'a liberated whole'},{hex:'#54824a',name:'Laurel green',phrase:'completion still in motion'},{hex:'#87b8cd',name:'Sky blue',phrase:'a wider connection'}],
      figure:'A naked dancer moves inside a laurel wreath, holding two wands. A purple sash circles the body; four figures occupy the corners.\n\nThe body turns while the wreath frames it. The image is not a still trophy: completion keeps moving.',
      challenge:'If the dancer stopped inside the wreath, completion would become a boundary instead of a living cycle.',
      scene:{paragraphs:['A laurel wreath hangs against open sky. The dancer moves within it while the four corner figures hold their positions.','One wand in each hand balances the body’s movement. The circular frame closes behind her and opens ahead.'],takeaway:'The World joins completion with the next beginning in a single moving figure.'},
      symbols:[{icon:'circle',name:'Laurel wreath',where:'Encircling the dancer.',meaning:'Biddy Tarot reads the circular wreath as completion and new beginnings. Echo: the Wheel of Fortune shows a cycle turning around a fixed center.',echo:'the Wheel of Fortune shows a cycle turning around a fixed center.'},{icon:'wand',name:'Two wands',where:'One in each hand.',meaning:'Biddy Tarot links them to the Magician’s tools and the completion of what began there. Echo: the Magician raises one wand at the start of the sequence.',echo:'the Magician raises one wand at the start of the sequence.'},{icon:'shapes',name:'Four corner figures',where:'At the four corners around the wreath.',meaning:'Waite identifies the living creatures at the angles; Biddy Tarot connects them to the four suits and elements. Echo: the Wheel repeats the four guardians around motion.',echo:'the Wheel repeats the four guardians around motion.'}],
      reversed:{shadow:'Waite lists inertia, fixity and stagnation; Biddy Tarot emphasizes incomplete closure, shortcuts or delays. The reversal can leave the cycle unfinished or prevent movement after completion.',cautions:[{aspect:'Unfinished cycle',detail:'A final step is missing, so closure remains out of reach.'},{aspect:'Stagnation',detail:'The dancer’s motion has stopped before the next opening.'}],meanings:[{keyword:'completion',meaning:'A goal may be close but not fully finished.',application:'Name the loose end still holding the cycle open.'},{keyword:'integration',meaning:'The pieces have not yet been brought together.',application:'Review what the journey has changed.'}],readingTip:'Read context to tell a delayed finish from a refusal to move beyond a completed phase.',contrast:'Upright completion includes movement onward; reversed, closure or integration is incomplete.'},
      quiz:[{q:'What surrounds the dancer in The World?',options:['A laurel wreath','A stone throne','A veil between pillars','A tower crown'],answer:0,explain:'The RWS dancer moves inside a laurel wreath.'},{q:'A long project reaches completion while preparing the next cycle. Which card fits?',options:['The World','The Hanged Man','The Moon','The Devil'],answer:0,explain:'The wreath encloses completion and another beginning.'},{q:'The World reversed is most commonly read as:',options:['Incomplete closure or delay','An abrupt awakening','A new teacher','A choice between two paths'],answer:0,explain:'Biddy Tarot lists seeking closure, shortcuts and delays.'},{q:'What do the four figures at the corners echo?',options:['The four suits and elements','Four stages of a single day','Four people in a courtroom','Four tools on a table'],answer:0,explain:'Biddy Tarot connects the corner figures with the four elements and suits.'}]
    }
  };

  // Verified against the actual texts on 2026-10-14, not a list of book names.
  // Pollack locators are zero-based character offsets in the supplied 641013-character
  // OCR transcription, Part One (1980). Headings remain useful if that OCR changes.
  // Each tuple is [Pollack heading, OCR offset, primary anchor, secondary anchor,
  // Pollack comparison]. Anchors below are paraphrases, not quotations.
  const MAJOR_SOURCE_NOTES = {
    magician: ['The Magician', 54946, 'Raised right wand, lowered left hand, four suit tools and cultivated flowers.', 'White robe as purity; red cloak as worldly knowledge; tools ready for use.', 'Creative life energy received and directed through action.'],
    'high-priestess': ['The High Priestess', 66798, 'Partly covered Tora, palms and pomegranates, black and white pillars.', 'Duality in the pillars; blue robe and implicit as well as explicit knowledge.', 'Inner truth contrasted with the active Magician; historical Papess imagery.'],
    empress: ['The Empress', 85101, 'Twelve-star diadem, Venus shield, ripening corn and fruitful earthly life.', 'Pomegranate gown, red cushions, natural setting and golden wheat.', 'Emotion, sensual life and motherhood contrasted with the Priestess.'],
    emperor: ['The Emperor', 93373, 'Crux ansata sceptre, globe, ram-fronted throne and executive authority.', 'Red robe, armor, white beard and resistant mountain foundation.', 'The parental authority archetype and rules of society.'],
    hierophant: ['The Hierophant', 103224, 'Triple crown, triple cross, blessing, crossed keys and priestly ministers.', 'Three robes, shared teaching and initiation into a group.', 'External doctrine contrasted with inner truth and initiation.'],
    lovers: ['The Lovers', 114365, 'Unnamed winged figure, unveiled couple and two Eden trees.', 'Raphael identification, healing blessing and the gaze sequence.', 'The RWS pair differs from the older choice-between-two-people design.'],
    chariot: ['The Chariot', 127785, 'Two sphinxes, conquest in the mind; text calls the held object a sword.', 'Star canopy, square of will and absence of reins; description calls the object a wand.', 'Developed ego and direction of will without reconciling its underlying forces.'],
    strength: ['Strength', 144131, 'Closing lion jaws, sign of life and flower chain; higher nature and passions.', 'White robe, flowers and passions guided without coercion.', 'VIII begins the inward line; flower belt joins woman and lion.'],
    hermit: ['The Hermit', 155972, 'Star-lit lantern offered as a beacon of attainment; rejection of occult isolation.', 'Six-pointed star, staff, snow-capped mastery and the next few steps.', 'Both inward withdrawal and outward teaching; grey cloak of contemplation.'],
    'wheel-of-fortune': ['The Wheel of Fortune', 167451, 'Serpent Typhon, living creatures, perpetual motion and the sphinx as equilibrium.', 'Descending snake, rising Anubis and corner creatures holding books.', 'Power changes with the turning wheel; the outer cycle invites inner understanding.'],
    justice: ['Justice', 184415, 'Pillars and consequences according to works; reversed bias and severity.', 'Left scales, right sword, purple veil and square on the crown.', 'Unblindfolded self-assessment; red robe echoes the Magician.'],
    'hanged-man': ['The Hanged Man', 197321, 'Tau cross of living wood, halo and entrancement rather than suffering.', 'Red trousers, blue vest, halo and a voluntarily read suspension.', 'Acceptance after Justice; light surrounding the head echoes the Magician.'],
    death: ['Death', 204849, 'Mystic Rose as life and sun of immortality between horizon pillars.', 'White five-petal rose, black armor, white horse and sunset/sunrise cycle.', 'Death reaches all ranks; dark armor and the pale horse contrast ending and life.'],
    temperance: ['Temperance', 214811, 'Neither-male-nor-female angel harmonizes psychic and material natures.', 'Pale blue robe, two cups, land/water stance and distant crown of purpose.', 'Balanced contact with life replaces the Chariot’s separated ego.'],
    devil: ['The Devil', 226482, 'Inverted torch and pentagram, neck chains and a mastery that will not last forever.', 'Loose neck loops, grapes and fire as pleasure and lust.', 'Dark background obscures awareness; the chained pair reverses the Lovers.'],
    tower: ['The Tower', 239022, 'Rending of a house of falsehood and suffering of its occupants.', 'Lightning as revelation, fallen crown and ambitions built on false premises.', 'Rigid grey tower and crown contrast with overwhelming energy.'],
    star: ['The Star', 249339, 'Eight-rayed stars, left knee on land, right foot on water and waters of life.', 'Core light, nourishing water and renewed fertility.', 'Relaxed healing after upheaval contrasted with controlled Temperance.'],
    moon: ['The Moon', 255483, 'Increasing moon, reflected light, unknown path, fears and dew of thought.', 'Disc described as full; pool as subconscious and crayfish as emerging awareness.', 'Imagination gives form to the Star’s energy through distortion and fear.'],
    sun: ['The Sun', 264592, 'Child, white horse, red standard and direct rather than reflected light.', 'Seated child, four sunflowers, purity and strength; reversed play or muted joy.', 'Active radiance after surrender to the Moon’s images.'],
    judgement: ['Judgement', 272265, 'Unnamed angel, bannered trumpet and a summons heard and answered within.', 'Gabriel identification and men, women and children responding.', 'The cross suggests a crossroads and a call for change.'],
    world: ['The World', 280855, 'Part I dancing figure, two wands and four creatures; Part II cosmic perfection.', 'Purple cloth, laurel wreath, completion and new beginnings.', 'Integrated being; purple sash and blue sky carry card-specific symbolism.']
  };

  // Swatch order matches each lesson’s colors. Source IDs resolve in card.sources;
  // the source supports object symbolism, not a standardized RGB/color doctrine.
  const MAJOR_PALETTE_SOURCES = {
    magician: ['biddy', 'biddy', 'waite-symbolism'],
    'high-priestess': ['biddy', 'biddy', 'biddy'],
    empress: ['biddy', 'biddy', 'biddy'],
    emperor: ['biddy', 'biddy', 'biddy'],
    hierophant: ['biddy', 'biddy', 'biddy'],
    lovers: ['biddy', 'biddy', 'waite-symbolism'],
    chariot: ['biddy', 'biddy', 'biddy'],
    strength: ['biddy', 'biddy', 'biddy'],
    hermit: ['waite-symbolism', 'pollack', 'biddy'],
    'wheel-of-fortune': ['waite-symbolism', 'waite-symbolism', 'biddy'],
    justice: ['biddy', 'pollack', 'biddy'],
    'hanged-man': ['biddy', 'biddy', 'biddy'],
    death: ['waite-symbolism', 'waite-symbolism', 'waite-symbolism'],
    temperance: ['waite-symbolism', 'biddy', 'biddy'],
    devil: ['pollack', 'biddy', 'waite-symbolism'],
    tower: ['biddy', 'biddy', 'pollack'],
    star: ['biddy', 'waite-symbolism', 'biddy'],
    moon: ['waite-symbolism', 'biddy', 'biddy'],
    sun: ['biddy', 'biddy', 'waite-symbolism'],
    judgement: ['waite-symbolism', 'pollack', 'waite-symbolism'],
    world: ['pollack', 'biddy', 'pollack']
  };

  function majorSources(meta) {
    const [heading, offset, primary, secondary, comparison] = MAJOR_SOURCE_NOTES[meta.id];
    const section = meta.numberLabel.split(' — ')[0];
    return [
      { id: 'waite-symbolism', author: 'A. E. Waite', title: 'The Pictorial Key to the Tarot', section: `Part II §2, ${section}: ${meta.name}`, url: `https://archive.sacred-texts.com/tarot/pkt/pktar${String(meta.number).padStart(2, '0')}.htm`, verified: true, retrieved: '2026-10-14', anchor: primary },
      { id: 'waite-divination', author: 'A. E. Waite', title: 'The Pictorial Key to the Tarot', section: `Part III §3, entry ${meta.number}: ${meta.name}, upright and reversed`, url: 'https://archive.sacred-texts.com/tarot/pkt/pkt0303.htm', verified: true, retrieved: '2026-10-14', role: 'Historical reversal list; distinct from modern psychological readings.' },
      { id: 'biddy', author: 'Biddy Tarot', title: `${meta.name} Tarot Card Meanings`, section: 'RWS description; upright and reversed sections', url: `https://biddytarot.com/tarot-card-meanings/major-arcana/${meta.id}/`, verified: true, retrieved: '2026-10-14', anchor: secondary },
      { id: 'pollack', author: 'Rachel Pollack', title: 'Seventy-Eight Degrees of Wisdom, Part One: The Major Arcana (1980)', section: heading, locator: { type: 'ocr-character-offset', zeroBased: offset, transcriptionCharacters: 641013 }, url: 'https://archive.org/download/78-degrees-of-wisdom/78%20degrees%20of%20wisdom_djvu.txt', verified: true, retrieved: '2026-10-14', anchor: comparison },
      ...(meta.id === 'world' ? [{ id: 'waite-design', author: 'A. E. Waite', title: 'The Pictorial Key to the Tarot', section: 'Part I §2, entry 22: The World (traditional design)', url: 'https://archive.sacred-texts.com/tarot/pkt/pkt0102.htm', verified: true, retrieved: '2026-10-14', role: 'Dancer, paired wands and four living creatures, referenced from Part II.' }] : [])
    ];
  }

  MAJOR_META.forEach(meta => {
    const lesson = MAJOR_LESSONS[meta.id];
    if (lesson) Object.assign(meta, lesson);
  });

  function buildMajorCard(meta) {
    const n = meta.number;
    // No generic fallback can silently reintroduce unaudited Major teaching.
    if (!meta.figure || !meta.scene || !meta.numerology || !meta.colors || !meta.symbols || !meta.reversed || !meta.quiz || !MAJOR_SOURCE_NOTES[meta.id]) {
      throw new Error(`Missing audited Major lesson: ${meta.id}`);
    }
    const syms = meta.symbols.map(s => {
      const interpretation = s.meaning.split(' Echo:')[0];
      return {
        ...s,
        interpretation,
        // Display the structured echo once, including identical capitalization.
        meaning: `${s.where} ${interpretation} Echo: ${s.echo}`
      };
    });
    const quiz = meta.quiz.map((question, index) => {
      const shift = (n + index) % question.options.length;
      const cut = question.options.length - shift;
      return {
        ...question,
        kind: ['symbol', 'scenario', 'reversal', 'image'][index],
        q: question.q.replace('is most commonly read as:', 'can be read as:'),
        options: question.options.slice(cut).concat(question.options.slice(0, cut)),
        answer: (question.answer + shift) % question.options.length
      };
    });

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
      numerology: { ...meta.numerology, basis: 'Card-sequence teaching; number metaphors are editorial unless attributed in the text.' },
      // Names identify observed objects for audit data, not palette display.
      // renderColor displays only the circle and phrase. These approximate print
      // colors carry the object’s meaning, not a universal rule about a hue.
      colors: meta.colors.map((color, index) => ({
        ...color,
        object: color.name,
        sourceRefs: [MAJOR_PALETTE_SOURCES[meta.id][index]],
        basis: 'Observed RWS object; phrase paraphrases its card-specific symbolism. Hex approximates a printed hue, not a universal color rule.'
      })),
      character: [],
      figure: meta.figure,
      challenge: meta.challenge,
      characterChallenge: meta.challenge,
      landscape: [],
      landscapeStory: meta.scene.paragraphs.join('\n\n'),
      landscapeMeaning: meta.scene.takeaway,
      scene: meta.scene,
      elemental: {
        dominant: meta.element,
        secondary: `Retained deck attribution: ${meta.secondary}`,
        attribution: 'Existing deck attribution retained; not established by the source audit. Suit-style personality is an editorial analogy.',
        behavior: buildElementPersonality(meta.element),
        motivates: SUIT_PROFILE[{ Fire: 'wands', Water: 'cups', Air: 'swords', Earth: 'pentacles' }[meta.element] || 'wands'].motivates,
        strengths: SUIT_PROFILE[{ Fire: 'wands', Water: 'cups', Air: 'swords', Earth: 'pentacles' }[meta.element] || 'wands'].strengths,
        shadows: SUIT_PROFILE[{ Fire: 'wands', Water: 'cups', Air: 'swords', Earth: 'pentacles' }[meta.element] || 'wands'].shadows,
        asPerson: SUIT_PROFILE[{ Fire: 'wands', Water: 'cups', Air: 'swords', Earth: 'pentacles' }[meta.element] || 'wands'].asPerson
      },
      symbols: syms,
      reversed: meta.reversed,
      memory: meta.memory && typeof meta.memory === 'object'
        ? meta.memory
        : { summary: meta.scene.takeaway, visual: meta.figure, application: meta.challenge },
      keywordFlow: `${meta.figure} ${meta.scene.takeaway}`,
      sources: majorSources(meta),
      quiz,
      xpReward: 120
    };
  }

  function buildMinorCard(suitKey, rank) {
    const profile = SUIT_PROFILE[suitKey];
    // Keep source corrections local to the Minor builder; raw map edits are palettes only.
    const lesson = { ...MINOR_LESSONS[suitKey][rank], symbols: MINOR_LESSONS[suitKey][rank].symbols.map(tuple => [...tuple]) };
    if (suitKey === 'wands' && rank === 1) {
      lesson.symbols[2][2] = 'Biddy identifies the castle with future opportunities; the hills and mountains, not the castle alone, indicate effort ahead.';
    }
    if (suitKey === 'wands' && rank === 13) {
      lesson.symbols[1][2] = 'Biddy connects the black cat with the Queen’s shadow self, a less visible side acknowledged alongside her outgoing confidence.';
    }
    if (suitKey === 'cups' && rank === 7) {
      lesson.symbols[1][1] = 'inside a cup in the lower row';
    }
    if (suitKey === 'cups' && rank === 11) {
      lesson.symbols[1][2] = 'Biddy describes the floral tunic; the receptive imagination belongs to the Page’s overall reading, not a stated symbolic rule about this print.';
    }
    if (suitKey === 'swords' && rank === 4) {
      lesson.symbols[2][2] = 'Pollack interprets the window as a healing blessing within a place of withdrawal; Biddy describes its figures without assigning that interpretation.';
    }
    if (suitKey === 'swords' && rank === 9) {
      lesson.takeaway = 'Biddy emphasizes anxiety and recurring worry; Pollack notes that the swords hang above rather than pierce the figure and connects anguish with concern for loved ones. The image alone does not establish a feared future event.';
    }
    if (suitKey === 'pentacles' && rank === 5) {
      lesson.symbols[0][2] = 'Biddy reads the lit church window as hope and spiritual support; Pollack also notices the absence of a door and questions whether sanctuary is accessible.';
    }
    if (suitKey === 'pentacles' && rank === 14) {
      lesson.symbols[0][2] = 'Waite notes the recurring bull heads on the throne; the practical leadership association used here comes from Biddy’s overall upright reading, not a new rule about bull imagery.';
    }
    const sources = minorSources(suitKey, rank);
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
    const courtTitle = rank >= 11 ? rankName : '';
    const archetype = courtTitle
      ? `${profile.archetypePrefix}${courtTitle} of ${profile.element}`
      : `${profile.archetypePrefix} ${rankName} — ${profile.element} Seed`;
    const symbols = lesson.symbols.map(([symbolName, where, meaning, echo]) => ({
      icon: 'star', name: symbolName, where,
      meaning: `${where.charAt(0).toUpperCase() + where.slice(1)}. ${meaning} Visual echo: ${echo}`,
      interpretation: meaning, echo,
      hidden: echo,
      trick: `Find ${symbolName.toLowerCase()} ${where}.`
    }));
    const [focus, modern, traditional, application] = lesson.reversal;
    const reversed = {
      shadow: `${modern} ${traditional}`,
      cautions: [{ aspect: focus, detail: modern }],
      meanings: [{ keyword: keywords[0], meaning: traditional, application }],
      readingTip: application,
      contrast: `${keywords[0]} upright; ${focus.charAt(0).toLowerCase() + focus.slice(1)} reversed. A reversal is contextual, not automatically an opposite.`
    };
    const otherReversals = [1, 5, 9].map(step => MINOR_LESSONS[suitKey][((rank - 1 + step) % 14) + 1].reversal[0]);
    const [imageQuestion, ...imageOptions] = lesson.image;
    const quiz = [
      minorQuestion('symbol', `In ${name}, which detail appears ${symbols[0].where}?`, lesson.symbolChoices, `${symbols[0].interpretation} Visual echo: ${symbols[0].echo}`, rank),
      minorQuestion('scenario', `${lesson.scenario[0]} Which card is the closest fit?`, [name, ...lesson.scenario[1]], `${lesson.takeaway} In this situation, ${symbols[1].meaning}`, rank + 1),
      minorQuestion('reversal', `${name} reversed can specifically point to:`, [focus, ...otherReversals], `${modern} ${traditional} ${application}`, rank + 2),
      minorQuestion('image', `${name}: ${imageQuestion}`, imageOptions, `${lesson.figure} ${lesson.takeaway}`, rank + 3)
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
        meaning: rank <= 10 ? `${rankName} identifies this card’s place in the ${profile.suit} sequence; read its particular arrangement, not a universal number rule.` : `${rankName} is a court role in ${profile.suit}, not a numbered life stage or a fixed age or gender.`,
        why: lesson.figure,
        expression: lesson.takeaway,
        hook: symbols[0].echo
      },
      colors: lesson.colors.map(([hex, phrase, where, [sourceId, section, symbol, relationship = 'object-symbolism']]) => ({
        hex, name: phrase, phrase, where, symbol, interpretation: phrase,
        sourceRefs: [{ ...sources.find(source => source.id === sourceId), section, symbol, relationship }],
        attributionNote: relationship === 'reading-association'
          ? 'Editorial association between this depicted object or scene and the cited card reading; not an intrinsic meaning of its color.'
          : 'Original paraphrase of the cited object interpretation; not a universal meaning of this color.'
      })),
      character: [],
      figure: lesson.figure,
      challenge: lesson.challenge,
      characterChallenge: lesson.challenge,
      scene: { paragraphs: [...lesson.scene], takeaway: lesson.takeaway },
      landscape: [],
      landscapeStory: lesson.scene.join('\n\n'),
      landscapeMeaning: lesson.takeaway,
      elemental: {
        dominant: profile.element,
        secondary: `Minor Arcana — ${profile.suit}`,
        behavior: buildElementPersonality(profile.element),
        motivates: profile.motivates,
        strengths: profile.strengths,
        shadows: profile.shadows,
        asPerson: profile.asPerson
      },
      symbols,
      reversed,
      memory: { summary: lesson.takeaway, visual: lesson.figure, application: lesson.challenge },
      keywordFlow: `${lesson.figure} ${lesson.takeaway}`,
      sources,
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
