# TarotQuest Content Upgrade — Editorial Plan

## Scope and execution gates

This is a **content-only plan** for the existing RWS lessons. No implementation starts until this plan is approved. After approval, I will make only the two-card Fool/Hermit pilot and stop for review; no other Major or Minor cards will be changed before the next approval.

**Repository reality to resolve before the pilot:** `PHASES` currently has 12 IDs, including `welcome` and `results`, and 10 instructional phases. Removing `movie` as requested leaves quiz navigation needing one additional change: `submitQuiz()` currently jumps to the removed `movie` ID, which would set the phase index to -1 and render the welcome screen. The Fool is marked `custom` in `deck-data.js`; its lesson object and mnemonic are instead defined in `assets/js/app.js`. That file is otherwise expressly off-limits. Also, no mnemonic is rendered today, and the current character renderer does not display `characterChallenge`. The requested color `where` field likewise is not currently rendered. I will not make those extra code changes unless you explicitly authorize them; please decide whether to authorize the minimum rendering/navigation adjustments needed for the approved content to appear correctly.

## Exact data changes planned

- **Major Arcana (`MAJOR_META` / `buildMajorCard`)**: add per-card `colors` (3–4 RWS-observed colors with `hex`, `name`, sourced `meaning`, `where`); card-specific `numerology` wording; a single `figure` description with a separate `challenge`; a merged `scene` (two sensory paragraphs and one sourced takeaway); curated `symbols` (3–5 entries, each with `name`, `where`, sourced meaning and a cross-card echo); hand-written `reversed` text; and four card-specific `quiz` questions (symbol, scenario, reversal, image interpretation). Preserve identity, keywords, elemental material and memory hook unless the pilot shows a sourced reason to edit them.
- **Minor Arcana (`SUIT_PROFILE` / `buildMinorCard`)**: replace shared color sets with card-specific, RWS-observed palettes; rewrite suit-level reversal guidance against the cited sources before applying it; use the same merged figure/scene presentation and four-question quiz standard where the actual card imagery supports it. Minors proceed one suit at a time, only after the Majors are approved and complete.
- **Remove/merge**: remove per-card `mnemonic` properties; collapse `posture`, `gaze`, `hands`, `clothing`, and `expression` into `figure` while retaining `challenge`; merge `landscape` + `movie` material into `scene`; remove `movie` from `PHASES`. Do not add a phase, tab, page, or modal. Keep `deck-data.js` as one file and add no dependencies/build step.
- **No unsupported assertions**: every interpretive claim will have a per-card source comment (one primary plus two listed references). Color meanings will not use unsourced universal color rules. Where cited sources disagree—especially reversals—the entry will state the difference rather than force a consensus.

## Hermit pilot sample (proposed schema/content)

```js
// Sources consulted: Waite, The Pictorial Key to the Tarot (1910), Part II, VIII–X;
// Pollack, Seventy-Eight Degrees of Wisdom, “Turning Inwards,” pp. 71–73;
// Biddy Tarot, “The Hermit,” “Strength,” and “Wheel of Fortune” card pages.
{
  id: 'hermit',
  file: 'RWS Tarot 09 Hermit.jpg',
  name: 'The Hermit',
  number: 9,
  numberLabel: 'IX — The Lantern of Truth',
  element: 'Earth',
  secondary: 'Virgo (analysis & service)',
  archetype: 'The Solitary Seeker',
  unlock: 'The Hermit, Bearer of Inner Light',
  keywords: ['Solitude', 'Introspection', 'Guidance', 'Wisdom'],
  colors: [
    { hex: '#d9b84f', name: 'Lantern gold', meaning: 'A beacon held up as a guide; Waite describes the Hermit’s lamp as a sign of attainment.', where: 'The six-pointed star shines inside the raised lantern.' },
    { hex: '#777b78', name: 'Contemplative grey', meaning: 'Pollack connects the stiff grey cloak with contemplation and the cold, inward-facing peak.', where: 'The Hermit’s hooded cloak.' },
    { hex: '#e8e5dd', name: 'Peak snow', meaning: 'The snow-capped height marks the difficult, elevated place of the Hermit’s solitary search.', where: 'The distant mountain ridges.' }
  ],
  numerology: {
    meaning: 'IX places the Hermit after Strength in Pollack’s inward-turning line of trumps.',
    expression: 'Here, nine is not a generic finish: the Hermit pauses at the threshold before the Wheel, carrying a light that can guide another inward.',
    hook: 'A small light shows the next step, not the whole mountain.'
  },
  figure: 'The hooded traveler stands high above the ordinary road, one hand lifting a lantern and the other steadying a staff. His grey cloak belongs to the cold, quiet work of looking inward.\n\nYet he is not sealed away from other people: Waite makes the raised lantern a beacon, and Pollack reads the Hermit as both seeker and guide.',
  challenge: 'If the lantern were lowered and the Hermit turned away, the guide would become a figure withholding the light.',
  scene: {
    paragraphs: [
      'A cold peak rises above the noisy world. Snow dulls the ridgeline; the Hermit’s cloak gathers the same quiet grey.',
      'A star glows inside the lantern. It reaches only a little way into the dark, enough to mark the next steps on the narrow path.'
    ],
    takeaway: 'The Hermit’s solitude turns outward when his hard-won light becomes a guide for another.'
  },
  symbols: [
    { name: 'Six-pointed star', where: 'Inside the raised lantern.', meaning: 'Waite calls it the star shining in the lamp; Pollack reads the image as both inward withdrawal and outward guidance.', echo: 'The Hermit’s star is enclosed in a lantern; The Star’s lights are open in the sky.' },
    { name: 'Lantern', where: 'Held above the Hermit’s head.', meaning: 'Waite describes it as a beacon of attainment, offered so another may find the way.', echo: 'The lantern makes the Hermit a guide, not only a solitary seeker.' },
    { name: 'Staff', where: 'Gripped in the Hermit’s lowered hand.', meaning: 'Biddy Tarot reads the staff as support and authority on the Hermit’s path.', echo: 'The staff turns the search into a journey taken step by step.' },
    { name: 'Snowy height', where: 'Behind and beneath the Hermit.', meaning: 'Pollack reads the cold peak as inward contemplation; Biddy Tarot connects the snow-capped range with mastery and growth.', echo: 'The high, spare setting contrasts with the fertile garden of The Empress.' }
  ],
  reversed: 'Waite lists concealment, fear, and unreasoned caution; Biddy Tarot also allows the opposite imbalance—too little reflection—or solitude stretched into isolation. These readings differ, so the reversal can signal either avoidance of the inward search or excess withdrawal.',
  quiz: [
    { q: 'Which detail appears in The Hermit’s raised lantern?', options: ['A six-pointed star', 'A pair of scales', 'A red rose', 'A crown of twelve stars'], answer: 0, explain: 'Waite identifies a star shining within the Hermit’s lamp.' },
    { q: 'A mentor offers a little light, then lets you take the next step yourself. Which card best fits?', options: ['The Hermit', 'The Emperor', 'The Chariot', 'The Devil'], answer: 0, explain: 'The Hermit’s beacon guides without revealing the entire road.' },
    { q: 'Which reversal reading is specifically emphasized for The Hermit by Biddy Tarot?', options: ['Solitude becoming isolation', 'Self-doubt and low energy (Strength)', 'Resistance to change (Wheel of Fortune)', 'Explosive raw emotion (Strength)'], answer: 0, explain: 'Biddy Tarot describes excessive withdrawal as one reversed expression; the other choices are neighboring Strength or Wheel reversal themes.' },
    { q: 'Why does the lantern illuminate only a short stretch of the path?', options: ['The next step becomes visible before the whole journey does', 'The Hermit is searching for a lost object', 'The star is hidden from the traveler', 'The staff blocks the light'], answer: 0, explain: 'Biddy Tarot describes the lamp as showing the next few steps, not the full journey.' }
  ]
}
```

**Numerology note:** the sample deliberately uses Pollack’s documented placement of the Hermit in the trump sequence rather than asserting an uncited universal meaning for nine. Before the pilot, I will verify any broader “nine” meaning against Wen’s numerological correspondence material; if it cannot be cited precisely, it will not be added.

## Approval needed before the pilot

1. Approve or revise this plan and Hermit sample.
2. Confirm whether I may make the minimum `app.js` changes needed to (a) place quiz submission on the existing Results phase after removing Movie, (b) update the custom Fool content, and (c) render `where` / the separate challenge line. Without that authorization, the Fool pilot and several requested fields cannot be implemented in their requested location or displayed as intended.
