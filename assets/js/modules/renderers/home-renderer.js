(function (global) {
  class HomeRenderer {
    static render() {
      return `
        <section class="card-panel home-portal-panel welcome-screen">
          <div class="home-portal-hero">
            <h2 class="home-portal-title">Welcome, weary traveler</h2>
            <p class="home-portal-copy">Come in from the road and rest awhile. The cottage keeps warm light in its windows, old stories in its rafters, and a patient hearth for every seeker who arrives with dust on their boots and questions in their heart.</p>
            <p class="home-portal-copy">Long ago, the cottage was said to stand where starlight touched the earth. There, the cards began to whisper: of courage, loss, hope, and hidden paths. Each reading is a lantern, and each lesson a step deeper into the lore of the arcana.</p>
            <p class="home-portal-copy">If you are ready, take up the deck and begin your tarot quest. The road ahead is mysterious, but the cottage will guide you toward wisdom one card at a time.</p>
            <div class="smoke-wisps" aria-hidden="true">
              <span class="smoke-wisp smoke-wisp-1"></span>
              <span class="smoke-wisp smoke-wisp-2"></span>
              <span class="smoke-wisp smoke-wisp-3"></span>
              <span class="smoke-wisp smoke-wisp-4"></span>
            </div>
          </div>
          <div class="home-portal-logo-wrap">
            <img class="home-portal-logo" src="whimsical%20cottage.jpeg" alt="Whimsical cottage logo" loading="lazy">
          </div>
          <div class="home-action-grid">
            <article class="home-action-card">
              <button class="btn btn-primary cta-candle-btn" onclick="startQuestFromHome()">Begin Your Tarot Quest</button>
            </article>
          </div>
        </section>`;
    }
  }

  global.HomeRenderer = HomeRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
