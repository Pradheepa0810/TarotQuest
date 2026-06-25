(function (global) {
  class HomeRenderer {
    static render() {
      return `
        <section class="card-panel home-portal-panel welcome-screen reference-letter-home" id="homePortalPanel">
          <div class="home-letter-transition" id="homeLetterTransition" aria-label="Home scene transition from cottage to letter">
            <img class="home-scene-cottage" src="assets/images/Cottage.jpeg" alt="Cottage exterior" loading="eager">
            <img class="home-scene-letter" id="homeSceneLetter" src="assets/images/letter.jpeg.png?v=20260624b" alt="Letter and envelope scene" loading="eager">
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
              <button class="btn btn-secondary walk-into-cottage-btn" onclick="startHomeSceneTransition()">Walk Into The Cottage</button>
              <button class="btn btn-primary cta-candle-btn cta-after-transition" onclick="startQuestFromHome()">Begin Your Tarot Quest</button>
            </article>
          </div>
        </section>`;
    }
  }

  global.HomeRenderer = HomeRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
