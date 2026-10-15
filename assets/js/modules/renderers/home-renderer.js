(function (global) {
  class HomeRenderer {
    static render() {
      return `
        <section class="card-panel home-portal-panel welcome-screen reference-letter-home" id="homePortalPanel">
          <div class="home-letter-transition" id="homeLetterTransition" aria-label="Home scene transition from cottage to letter">
            <picture class="home-scene-picture">
              <source srcset="assets/images/Cottage.webp" type="image/webp">
              <img class="home-scene-cottage" src="assets/images/Cottage-fallback.jpg" alt="Cottage exterior" width="1382" height="1138" loading="eager">
            </picture>
            <picture class="home-scene-picture">
              <source srcset="assets/images/letter.webp?v=20261014" type="image/webp">
              <img class="home-scene-letter" id="homeSceneLetter" src="assets/images/letter.jpg?v=20261014" alt="Letter and envelope scene" width="1248" height="1027" loading="eager">
            </picture>
            <div class="home-scene-fx" aria-hidden="true">
              <div class="home-fireflies">
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
                <span></span><span></span><span></span><span></span><span></span><span></span><span></span>
              </div>
              <div class="home-kettle-smoke-fx">
                <span class="kettle-smoke wisp-a"></span>
                <span class="kettle-smoke wisp-b"></span>
                <span class="kettle-smoke wisp-c"></span>
                <span class="kettle-smoke wisp-d"></span>
                <span class="kettle-smoke wisp-e"></span>
                <span class="kettle-smoke wisp-f"></span>
                <span class="kettle-smoke wisp-g"></span>
                <span class="kettle-smoke wisp-h"></span>
              </div>
            </div>
          </div>
          <div class="home-action-grid">
            <article class="home-action-card reference-home-cta-card">
              <button class="btn btn-secondary walk-into-cottage-btn" data-action="home.start-transition">Walk Into The Cottage</button>
              <button class="btn btn-primary cta-candle-btn cta-after-transition" data-action="quest.start">Begin Your Tarot Quest</button>
            </article>
          </div>
        </section>`;
    }
  }

  global.HomeRenderer = HomeRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
