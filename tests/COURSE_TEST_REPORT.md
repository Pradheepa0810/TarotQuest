# Complete course, Library and certificate test

Date: 2026-10-15. Site: http://127.0.0.1:8080/tarot-quest.html.

## Results

| Check | Result |
| --- | --- |
| Full sequential course | PASS — all 78 lessons, in canonical order |
| Lesson phases | PASS — 780 phase visits, including reveal, palette, combined figure/scene, elements, symbols, reversal, quiz and results |
| Quiz scoring | PASS — all 312 keyed answers selected and scored correctly; each quiz 4/4 |
| Card mastery | PASS — one new card earned after each submission; 78/78 at completion |
| Group milestones | PASS — Major Arcana at 22, Wands at 36, Cups at 50, Swords at 64, Pentacles at 78; all five rewards claimed |
| Library achievements | PASS — all nine earned; all nine rendered as unlocked |
| Library artwork | PASS — all nine image elements decoded successfully |
| Final ending | PASS after fixing the navigation defect described below |
| Persistence | PASS — reload retained 78 mastered cards, nine achievements, 78 SRS entries and 10,368 gems |
| Certificate eligibility | PASS — incomplete mastery blocked; blank/cancel ignored and valid name trimmed in regression tests |
| Certificate download | PASS — independent Chrome reported a completed real file download |
| Certificate PNG | PASS — PNG signature verified, 800 × 560 pixels, 358,368 bytes in this run; visually inspected |
| JavaScript exceptions | None during the successful full browser run |
| Persistent Node regressions | 22 passed, zero failed |

### All Library achievements are obtainable

| Achievement | Earned after lesson |
| --- | ---: |
| Quiz Perfectionist | 3 — three perfect quizzes |
| Speed Learner | 3 — three cards mastered in the same session |
| First Five | 5 |
| Major Arcana Adept | 22 |
| Wands Adept | 36 |
| Cups Adept | 50 |
| Swords Adept | 64 |
| Pentacles Adept | 78 |
| Tarot Master | 78 |

The two performance achievements are not guaranteed merely by eventually completing the course: Quiz Perfectionist needs three perfect quizzes, and Speed Learner needs three mastery awards in one session. This run satisfied both through real quiz submissions rather than pre-populating achievement or mastery arrays.

## Defect found and fixed

**Enter Grandmaster Ending returned to the Cottage.** The action called `showGrandmasterEnding()`, which in turn called `finishLesson()`. That changed the active view to home instead of rendering the final course-completion screen.

The handler now opens the completed lesson's welcome phase, whose existing completed-deck branch renders the Grandmaster ending. It clears the milestone view without resetting mastery. A focused regression test and the independent complete browser rerun both verified the corrected route. The service-worker cache version was advanced to v20 for the application change. The certificate itself is downloaded from the existing Library button.

## Certificate artifact

The test used the fictitious name **Test Seeker**. The resulting [downloaded certificate](artifacts/Tarot_Mastery_Certificate_Test_Seeker.png) contains that name, the 78-card completion statement, Tarot Grandmaster rank, 10,368 gems and the run date. No certificate-generation change was needed.

Detailed [per-card browser results](artifacts/course-run.json) record every card ID, phase sequence, score, milestone, unlock threshold, persistence assertion and download result. The [Library screenshot](artifacts/library-complete.png) captures the isolated earned collection. Test artifacts are not application assets and do not modify the user's saved quest.

## Method, reproducibility and limits

- The initial automated playthrough used a separate browser context with service workers blocked and empty storage. It visited all 78 lessons and all 780 phase steps, then checked the Library.
- The integrated browser did not expose a completed download event even though the generator ran. This was treated as inconclusive, **not** a successful file download.
- An independent installed Chrome process then repeated the entire course from a fresh temporary profile after the ending fix. Node's built-in WebSocket talks to Chromium's DevTools protocol; no npm packages or project dependencies were added. The runner uses a five-minute failure watchdog and closes its own browser at completion.
- Both runs used application DOM click/change handlers and actual quiz scoring, reward and persistence functions. They did not directly set the mastery list, award achievements, seed a completed save or bypass the certificate eligibility check. Timed reveal transitions were allowed to complete. Decorative animations and sound were disabled for the test; screenshot animations were finished/paused for capture.
- Node regression tests run with `node --test tests/*.test.cjs`. The independent browser run is `node tests/course-browser-run.cjs` while the local server is available. `CHROME_PATH` can select another Chromium executable; an optional first argument selects the site URL.
- The independent run used Chrome's real `Browser.downloadWillBegin` and completed `Browser.downloadProgress` events. It read the downloaded PNG from disk and checked its header and dimensions; the generator's success popup alone was not accepted as proof.
- Eligibility cancellation/blank-name edges and one-time achievement payouts have persistent unit coverage. This is a correct-answer, single-session course-completion run, not a claim that every wrong-answer path, every browser/mobile breakpoint, offline mode or accessibility behavior was exhaustively tested. It validates the game's keyed scoring, not independent scholarly correctness of the lesson interpretations.
- Existing user browser progress was not reset or replaced. All course awards and certificate attempts belonged to isolated test contexts/profiles. No commits or staging were performed.