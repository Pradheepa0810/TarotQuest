# TarotQuest content upgrade: measured audit

Audit date: 2026-10-15. Baseline: Git HEAD **b82f3e114e249925c3c657e16d9f36a1c0c5af12**. After: the working-tree deck and app prelude at audit time. No application or deck changes were made for this regression/report task. No commits or staging were performed.

## Result

- **18 tests passed, 0 failed, 0 skipped, 0 todo** using `node --test tests/lessons.test.cjs` (Node's built-in test runner; no dependencies).
- **78 cards**, **312 questions**, four distinct answer positions per card; global answer-position counts **78 / 78 / 78 / 78**.
- All **56 Minors** have symbol, scenario, reversal and image questions: **56 of each kind**, **224 Minor questions**. Each kind's four position counts sort to **12 / 12 / 16 / 16**, reflecting 14 ranks per suit; combined Minor positions are **56 / 56 / 56 / 56**.
- **78 distinct three-swatch palettes**; **168 distinct Minor meaning phrases** and **56 distinct ordered Minor hex palettes**. Every phrase is at most ten whitespace-delimited words with no sentence punctuation.
- **231 existing swatch source references** resolve consistently to their card bibliographies. The Fool has three bibliography entries but no per-swatch `sourceRefs`; tests do not invent that missing metadata.
- Canonical learner-prose bundle: **82,501 before → 56,585 after**, a **−31.41%** change (**−25,916 words**).
- Approved **15% to 25% tightening (word reduction)**: **NOT MET** overall; the **31.41% reduction exceeds the 25% maximum**. Per card: **11 within / 1 too little reduction / 66 too much reduction**. No padding or further cutting was performed to force compliance; this correction changes the audit only.

### Baseline limitation

HEAD predates the Fool/Hermit pilot and later audited lesson maps. It is the available reproducible pre-upgrade baseline, **not** a snapshot immediately before the latest Minor palette audit. The prior session's temporary “audited map before” comparison proved preservation of non-color fields and hex/location values during that narrower edit; it is **not the true before** for this full content upgrade. These word-change/reduction percentages must not be described as the effect of palette wording alone or as an incremental comparison against the pilot.

### Scope deviations and pending commits

The measured tightening overshoots the approved range overall and on 66 cards; one card falls short. The quiz bucket increased despite the overall tightening. These deviations remain unresolved, not waived or corrected by relabelling the audit.

**No per-card commits have been made; that delivery step remains pending.** The working tree contains unrelated dirty changes, including shared deployment/UI work in the same app file as the lesson prelude, plus other UI/deployment files. Content/prelude edits must be isolated from those changes before per-card commits can be prepared safely. No commits or staging were performed for this audit or its correction; the report does not claim a completed commit sequence.

## Counting method and reproducibility

The persistent [regression file](tests/lessons.test.cjs) exports `loadLessons`, `installFunctions`, `proseSections`, `wordCount` and `IDS`. For the baseline, load the UTF-8 output of `git show HEAD:deck-data.js` and `git show HEAD:assets/js/app.js`. For after, use the current file contents. Both loads execute the deck first, then only the app prefix before `const SRS_INITIAL_EASE`; this includes the custom Fool and its actual deterministic quiz rotation, without DOM or storage initialization. Install `normalizeLessonText` and `getSymbolMeaningText` from each corresponding version before selecting symbol prose. Sum `wordCount(Object.values(proseSections(card, symbolMeaning)))` in canonical deck order. Requiring the regression file also registers/runs its tests; its exported helpers perform no file writes.

The **same ten conceptual sections** are counted before and after:

| Canonical section | Selected learner prose |
| --- | --- |
| Numerology | `meaning`, `why`, `expression`, `hook` |
| Colors | Current `phrase` only; legacy displayed `name`, `meaning`, `trick` where no phrase exists |
| Figure / character | Current `figure`; otherwise each legacy `aspect`, `detail`, `reveal` |
| Challenge | `challenge`, or the legacy `characterChallenge`, never both |
| Scene / landscape | Current two `scene.paragraphs` and `takeaway`; otherwise legacy displayed landscape `why`, `landscapeStory`, `landscapeMeaning`, plus the six displayed movie scene fields (`setting`, `sounds`, `weather`, `moves`, `emotions`, `next`) |
| Elemental | `dominant`, `secondary`, `behavior`, `motivates`, `strengths`, `shadows`, `asPerson` |
| Symbols | `name` and the actual version-specific `getSymbolMeaningText` output |
| Reversal | `shadow`; caution `aspect`/`detail`; meaning `keyword`/`meaning`/`application`; `readingTip`, `contrast` |
| Memory | `summary`, `visual`, `application` |
| Quiz | Every question, every option and explanation, once each |

This is a **canonical learner-prose bundle**, not a DOM word count of one screen or the number of unique words. The current memory fields are included because this audit explicitly requests memory; the current phase list has no separate Memory Spell page, so those words are **not claimed to be currently displayed in a dedicated memory phase**. Quiz explanations are counted even when revealed only after answering. The larger legacy movie scene is included only in the baseline scene bucket, since it was displayed and is a predecessor of the merged scene—not as a new after section.

Each selected canonical property is counted once. Identical wording that genuinely occupies different selected learner sections is not globally deduplicated. However, alternate metadata representations are never added a second time: symbol `echo`, `where`, `interpretation`, `hidden` and `trick` are not separately counted when their rendered meaning already carries the interpretation/echo; color `name`, `where`, `interpretation`, `object`, `basis` and attribution notes are not counted beside current phrases. Generated current `characterChallenge`, `landscapeStory`, `landscapeMeaning`, `keywordFlow`, empty legacy arrays and other unused aliases are excluded. Memory `mnemonic` is excluded in both versions because the old renderer did not display it. Bibliographies, URLs, `sourceRefs`, source notes, provenance/validation metadata, icons, CSS, fixed UI headings/instructions and reveal-card identity labels are excluded.

HTML tags, URLs and common HTML entities are removed before counting. A word is a Unicode letter/number token with optional internal apostrophes or hyphens; straight and curly apostrophes are supported. Hyphenated words count as one; em/en dashes separate words. Signed change percentages are `(after − before) / before × 100`; reduction percentages are `(before − after) / before × 100`. Percentages are rounded to two decimals **only for presentation**. Target flags use exact counts: **WITHIN** when `0.75 ≤ after / before ≤ 0.85` (inclusive 15%–25% reduction), **TOO_LITTLE** when `after / before > 0.85` (reduction shortfall), and **TOO_MUCH** when `after / before < 0.75` (excess reduction). Classification compares `100 × after` with `75 × before` and `85 × before`, avoiding rounded percentages at the boundaries. The aggregate uses summed word counts, not an average of per-card percentages.

### Section totals

| Section | Before | After |
| --- | ---: | ---: |
| Numerology | 5,201 | 4,748 |
| Colors | 2,999 | 1,092 |
| Figure / character | 10,499 | 2,222 |
| Challenge | 1,890 | 1,207 |
| Scene / landscape | 11,481 | 3,623 |
| Elemental | 4,095 | 4,140 |
| Symbols | 13,562 | 7,320 |
| Reversal | 17,542 | 8,112 |
| Memory | 4,781 | 4,572 |
| Quiz | 10,451 | 19,549 |
| **Total** | **82,501** | **56,585** |

The quiz bucket grew, while the consolidated figure, scene and reversal buckets shrank substantially. This documents the removal of repetitive generated teaching; it does not turn excessive overall tightening into a pass or independently establish teaching quality.

## All 78 cards — CSV

Flags describe the **amount of reduction**, not signed growth: `TOO_LITTLE` means below 15% reduction; `WITHIN` means 15%–25% reduction inclusive; `TOO_MUCH` means above 25% reduction. `change_percent` remains signed (negative means fewer words). Queen of Cups is exactly 25% reduction and passes; Nine of Swords is approximately 14.97% and falls short. Totals: **11 WITHIN / 1 TOO_LITTLE / 66 TOO_MUCH**.

```csv
id,before,after,change_percent,target_reduction_15_to_25
fool,1334,765,-42.65,TOO_MUCH
magician,1133,663,-41.48,TOO_MUCH
high-priestess,1144,630,-44.93,TOO_MUCH
empress,1086,626,-42.36,TOO_MUCH
emperor,1088,651,-40.17,TOO_MUCH
hierophant,1107,642,-42.01,TOO_MUCH
lovers,1048,684,-34.73,TOO_MUCH
chariot,1092,622,-43.04,TOO_MUCH
strength,1048,644,-38.55,TOO_MUCH
hermit,1097,709,-35.37,TOO_MUCH
wheel-of-fortune,1120,641,-42.77,TOO_MUCH
justice,1082,623,-42.42,TOO_MUCH
hanged-man,1113,644,-42.14,TOO_MUCH
death,1083,659,-39.15,TOO_MUCH
temperance,1066,596,-44.09,TOO_MUCH
devil,1095,642,-41.37,TOO_MUCH
tower,1093,650,-40.53,TOO_MUCH
star,1071,659,-38.47,TOO_MUCH
moon,1064,678,-36.28,TOO_MUCH
sun,1058,622,-41.21,TOO_MUCH
judgement,1065,591,-44.51,TOO_MUCH
world,1074,633,-41.06,TOO_MUCH
wands-ace,1086,732,-32.60,TOO_MUCH
wands-two,1071,759,-29.13,TOO_MUCH
wands-three,1033,741,-28.27,TOO_MUCH
wands-four,1035,720,-30.43,TOO_MUCH
wands-five,1044,694,-33.52,TOO_MUCH
wands-six,1033,691,-33.11,TOO_MUCH
wands-seven,1035,698,-32.56,TOO_MUCH
wands-eight,1034,691,-33.17,TOO_MUCH
wands-nine,1045,709,-32.15,TOO_MUCH
wands-ten,1062,742,-30.13,TOO_MUCH
wands-page,1034,738,-28.63,TOO_MUCH
wands-knight,1025,686,-33.07,TOO_MUCH
wands-queen,1032,757,-26.65,TOO_MUCH
wands-king,1029,712,-30.81,TOO_MUCH
cups-ace,1088,754,-30.70,TOO_MUCH
cups-two,1046,734,-29.83,TOO_MUCH
cups-three,1025,732,-28.59,TOO_MUCH
cups-four,1023,753,-26.39,TOO_MUCH
cups-five,1035,711,-31.30,TOO_MUCH
cups-six,1024,756,-26.17,TOO_MUCH
cups-seven,1034,728,-29.59,TOO_MUCH
cups-eight,1085,766,-29.40,TOO_MUCH
cups-nine,1042,763,-26.78,TOO_MUCH
cups-ten,1071,756,-29.41,TOO_MUCH
cups-page,1055,837,-20.66,WITHIN
cups-knight,1030,693,-32.72,TOO_MUCH
cups-queen,1032,774,-25.00,WITHIN
cups-king,1041,796,-23.54,WITHIN
swords-ace,1052,749,-28.80,TOO_MUCH
swords-two,1053,744,-29.34,TOO_MUCH
swords-three,1029,758,-26.34,TOO_MUCH
swords-four,1019,754,-26.01,TOO_MUCH
swords-five,1051,787,-25.12,TOO_MUCH
swords-six,1048,774,-26.15,TOO_MUCH
swords-seven,1023,802,-21.60,WITHIN
swords-eight,1034,806,-22.05,WITHIN
swords-nine,1029,875,-14.97,TOO_LITTLE
swords-ten,1071,808,-24.56,WITHIN
swords-page,1028,755,-26.56,TOO_MUCH
swords-knight,1012,734,-27.47,TOO_MUCH
swords-queen,1046,763,-27.06,TOO_MUCH
swords-king,1041,761,-26.90,TOO_MUCH
pentacles-ace,1059,790,-25.40,TOO_MUCH
pentacles-two,1046,720,-31.17,TOO_MUCH
pentacles-three,1025,746,-27.22,TOO_MUCH
pentacles-four,1024,756,-26.17,TOO_MUCH
pentacles-five,1034,780,-24.56,WITHIN
pentacles-six,1035,752,-27.34,TOO_MUCH
pentacles-seven,1049,794,-24.31,WITHIN
pentacles-eight,1026,784,-23.59,WITHIN
pentacles-nine,1039,769,-25.99,TOO_MUCH
pentacles-ten,1065,822,-22.82,WITHIN
pentacles-page,1026,769,-25.05,TOO_MUCH
pentacles-knight,1045,745,-28.71,TOO_MUCH
pentacles-queen,1063,775,-27.09,TOO_MUCH
pentacles-king,1039,816,-21.46,WITHIN
```

## Actual sourcing and limits

These are the sourcing methods recorded in the current data and prior audit notes, **not new online verification performed by this regression task**:

- **Waite primary text:** Minor entries and Part III §4 were checked in an Archive-hosted OCR reproduction of the Sacred Texts book. Only the Ace of Wands individual page was retrieved in that Minor audit; the other individual primary pages were unavailable. The retained page URLs identify entries, while `consultedUrl` and `consultedSection` document the text actually consulted. The OCR reproduction is **not a verified first-edition facsimile**.
- **Pollack:** the full-book Archive OCR and corresponding card sections were consulted. Part Two's printed pagination restarts: Wands 25–47, Cups 48–70, Swords 71–93, Pentacles 94–120. Major metadata compiles Part One headings, OCR-character offsets and paraphrased anchors. OCR is not proof of a perfectly transcribed printed edition.
- **Biddy Tarot:** all 56 individual Minor pages were retrieved in the recorded audit; the compiled Major references include card-specific descriptions and upright/reversed readings. The compiled bibliography is not a new live-link availability test.
- Waite anchors depicted objects and historical readings; Biddy provides modern applications/reversals; Pollack supplies compositional and psychological comparison. Historical and modern reversal readings are distinguished rather than forced into one consensus.
- Current palettes describe object symbolism or explicitly marked editorial `reading-association`, **not universal hue rules**. Hexes approximate a printed palette. Symbol echoes and figure challenges are editorial visual comparisons. Existing element/secondary attributions are retained rather than claimed as newly source-verified.
- Recorded corrections include Waite's four streams versus the image/Biddy's five for Ace of Cups; Queen of Wands' cat as shadow-self rather than an explicit independence symbol; Seven of Cups' wreath in the lower row; Four of Swords' window attribution to Pollack; and the inaccessible-sanctuary nuance for Five of Pentacles.

## Current UI and migration contract

The ten phase IDs are `welcome`, `reveal`, `numerology`, `color`, `character`, `elemental`, `symbols`, `reversed`, `quiz`, `results`. `character` is labelled **Figure & Scene**. Its isolated renderer includes The Portrait, the challenge, The Scene's two paragraphs and takeaway. Palette output is three swatches and short meaning phrases only—not color names or location metadata. There is no separate landscape/movie phase, movie renderer or mnemonic field/display. Some generated legacy landscape aliases remain in card objects for compatibility; they are not selected by the current figure/scene branch and are excluded from after counts.

Regression coverage executes the **real extracted** `resolveSavedPhase` and `validateProgressImport` functions, with the real `PHASES` from the VM prelude and the supported `THEMES` literal from the app. Legacy `landscape` resolves to `character`; `movie` resolves to `results`. Recognized IDs take precedence over obsolete indices, including **index 11 in version 4** for landscape/movie/results/quiz. All twelve numeric version-3 phase indices are checked. A full fixture preserves every field other than the deliberately normalized phase, including mastery, gems, achievements, quiz data and SRS, and its source is not mutated.

Negative/noninteger indices are rejected by import even when an ID is recognized. Out-of-range indices without a resolvable phase ID and unresolvable unknown IDs are rejected. **Compatibility caveat:** an unknown ID plus a valid numeric index is currently accepted via numeric fallback; this behavior is explicitly tested, not represented as strict unknown-ID rejection. Similarly, recognized IDs can supersede stale indices; the tests do not impose an arbitrary current-length bound that would reject the requested version-4/index-11 migration.

The suite verifies structure, deterministic behavior, renderer strings and metadata consistency. It does not independently prove the interpretive correctness of every quiz answer or source claim. It intentionally does not make the approved 15%–25% tightening target a passing regression assertion: the overall target's actual failure and per-card compliance counts are reported above.

## Browser integration validation

- Fresh, service-worker-blocked contexts loaded the current deck and application. Fool, Justice, Seven of Wands, Queen of Cups, Six of Swords and Ace of Pentacles each rendered both Portrait and Scene in one phase and three phrase-only swatches. No removed labels or JavaScript page errors appeared in that rendering check.
- Actual radio-button selections and quiz submissions for Justice, Seven of Wands, Queen of Cups, Six of Swords and Ace of Pentacles reached Results with **4/4** each. Each quiz used a separate context so delayed achievement popups from an earlier completed lesson did not obstruct the next fixture.
- Screenshots of Queen of Cups confirmed readable combined Portrait/Scene content and three circles with meaning phrases only. Screenshots are spot checks, not an all-card responsive-layout audit.
- The existing tab initially served cached earlier scripts. Cache identifiers were advanced from v17 to v18; updating the service worker and reloading loaded the new Figure & Scene label and current palette. This changes asset caches, not the progress storage key.
- The shared tab’s saved progress was backed up before the screenshot fixtures and restored byte-for-byte afterward. Gameplay tests used separate contexts. No quest reset was performed.
- Restore/import migration and preservation of mastery, gems, achievements, SRS and quiz fields were exercised by the Node suite against the actual extracted functions. An interactive file-picker import was not performed; full offline availability and every responsive breakpoint were not audited.