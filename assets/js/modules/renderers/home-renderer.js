(function (global) {
  class HomeRenderer {
    static render() {
      return `
        <section class="card-panel home-portal-panel welcome-screen">
          <div class="home-portal-hero">
            <h2 class="home-portal-title">Welcome, weary traveler</h2>
            <p class="home-portal-copy">The cottage predates its own walls.</p>
            <p class="home-portal-copy">The road that leads here did not exist until you needed it to.</p>
            <p class="home-portal-copy">Inside, the cards have been shuffled by hands no one remembers, read by mouths that spoke in languages the forest has since swallowed.</p>
            <p class="home-portal-copy">They have, it should be noted, a habit of being right.</p>
            <p class="home-portal-copy">Every seeker arrives the same, carrying something wordless,something that hums faintly in the chest at odd hours.</p>
            <p class="home-portal-copy">The cottage knows.</p>
            <p class="home-portal-copy">It set out your chair before dawn.</p>
            <p class="home-portal-copy">It has kept the fire and has been expecting you for a very long time.</p>
            <p class="home-portal-copy">Sit down.</p>
            <p class="home-portal-copy">The deck is on the table.</p>
            <p class="home-portal-copy">You already know what to do.</p>
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
