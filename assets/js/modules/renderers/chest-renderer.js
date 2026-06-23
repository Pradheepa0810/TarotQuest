(function (global) {
  class ChestRenderer {
    static render(options) {
      const progress = options.deck.getDeckProgress(options.state.learnedCards);
      const perfectQuizCount = Number(options.state?.achievementData?.perfectQuizWins || 0);
      const perfectQuizText = `${perfectQuizCount} perfect ${perfectQuizCount === 1 ? 'quiz' : 'quizzes'}`;
      const gemStats = [
        { type: 'rank', label: 'Current Rank', value: options.getRank(options.state.gems) },
        { type: 'cards', label: 'Cards Mastered', value: `${progress.learned}/${progress.total}` },
        { type: 'review', label: 'Perfect Quiz Bonus', value: perfectQuizText },
        { type: 'streak', label: 'Streak', value: `${options.state.daily.streak} days` }
      ];

      const gemGrid = gemStats.map((stat, index) => `
            <button class="treasure-gem-wrap gem-${stat.type}" type="button" style="--gem-index:${index}" onclick="triggerTreasureGemFlash(event, this)">
              <div class="gem-svg-shell" aria-hidden="true">
                ${this.renderTreasureGemSvg(stat.type, index)}
                <span class="gem-sparkle sparkle-1">
                  <svg viewBox="0 0 10 10" width="10" height="10" aria-hidden="true"><path d="M5 0 L6.4 3.6 L10 5 L6.4 6.4 L5 10 L3.6 6.4 L0 5 L3.6 3.6 Z"/></svg>
                </span>
                <span class="gem-sparkle sparkle-2">
                  <svg viewBox="0 0 10 10" width="9" height="9" aria-hidden="true"><path d="M5 0 L6.4 3.6 L10 5 L6.4 6.4 L5 10 L3.6 6.4 L0 5 L3.6 3.6 Z"/></svg>
                </span>
                <span class="gem-sparkle sparkle-3">
                  <svg viewBox="0 0 10 10" width="8" height="8" aria-hidden="true"><path d="M5 0 L6.4 3.6 L10 5 L6.4 6.4 L5 10 L3.6 6.4 L0 5 L3.6 3.6 Z"/></svg>
                </span>
                <span class="gem-burst-layer" aria-hidden="true"></span>
              </div>
              <span class="gem-stat-overlay" aria-hidden="true">
                <span class="gem-stat-label">${stat.label}</span>
                <span class="gem-stat-value">${stat.value}</span>
                ${stat.subvalue ? `<span class="gem-stat-subvalue">${stat.subvalue}</span>` : ''}
              </span>
            </button>`).join('');

      return `
        <section class="card-panel chest-vault-panel">
          <div class="alchemy-library-head">
            <div>
              <h2 class="phase-title">Treasure Room</h2>
            </div>
          </div>
          <div class="chest-vault-image-wrap">
            <img class="chest-vault-image" src="Treasure_room.JPEG" alt="Treasure room" loading="lazy">
            <div class="chest-vault-amount"><span class="icon-inline">${options.icon('gem')}<span>${options.state.gems} Gems</span></span></div>
          </div>
          <p class="chest-vault-subcopy">Every lesson, quiz, streak, and achievement strengthens your chest.</p>
          <div class="chest-vault-grid chest-vault-gem-grid">${gemGrid}
          </div>
        </section>`;
    }

    static renderTreasureGemSvg(type, index) {
      const gradId = `gemLightGrad-${type}-${index}`;
      const delay = Number(index) || 0;

      if (type === 'rank') {
        return `
          <svg class="treasure-gem-svg" viewBox="0 0 120 140" width="120" height="140" role="img" aria-label="Rank gem">
            <defs>
              <radialGradient id="${gradId}" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.96"/>
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <polygon points="60,6 112,66 60,136 8,66" fill="#c8961e" />
            <polygon points="60,12 42,66 60,126 18,66" fill="#a07818" />
            <polygon points="60,12 78,66 60,126 102,66" fill="#f0c96a" />
            <polygon points="60,8 82,34 60,54 38,34" fill="#ffd700" />
            <polygon points="60,94 74,112 60,132 46,112" fill="#6b4f0f" />
            <polygon points="35,24 46,26 38,36" fill="#ffffff" opacity="0.6" />
            <polygon points="30,34 39,35 33,42" fill="#ffffff" opacity="0.3" />
            <polygon points="28,44 35,45 30,51" fill="#ffffff" opacity="0.15" />
            <line x1="60" y1="12" x2="42" y2="66" stroke="#fff" stroke-opacity="0.4" stroke-width="0.5" />
            <line x1="60" y1="12" x2="78" y2="66" stroke="#fff" stroke-opacity="0.4" stroke-width="0.5" />
            <line x1="42" y1="66" x2="60" y2="126" stroke="#fff" stroke-opacity="0.4" stroke-width="0.5" />
            <circle cx="36" cy="35" r="20" fill="url(#${gradId})" opacity="0.35" class="gem-light-orb">
              <animate attributeName="cx" values="36;78;54;36" dur="4s" begin="${delay}s" repeatCount="indefinite" />
              <animate attributeName="cy" values="35;49;98;35" dur="4s" begin="${delay}s" repeatCount="indefinite" />
              <animate attributeName="r" values="22;17;26;22" dur="4s" begin="${delay}s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.2;0.35;0.4" dur="4s" begin="${delay}s" repeatCount="indefinite" />
            </circle>
          </svg>`;
      }

      if (type === 'cards') {
        return `
          <svg class="treasure-gem-svg" viewBox="0 0 120 140" width="120" height="140" role="img" aria-label="Cards mastered gem">
            <defs>
              <radialGradient id="${gradId}" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.96"/>
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <polygon points="24,20 96,20 114,60 96,116 24,116 6,60" fill="#2ecc71" />
            <polygon points="34,30 86,30 97,55 86,86 34,86 23,55" fill="#3dd47a" />
            <polygon points="24,20 34,30 23,55" fill="#27ae60" />
            <polygon points="34,30 50,24 60,30" fill="#2ecc71" />
            <polygon points="60,30 70,24 86,30" fill="#27ae60" />
            <polygon points="86,30 96,20 97,55" fill="#2ecc71" />
            <polygon points="23,55 34,86 24,116" fill="#1a8a47" />
            <polygon points="34,86 60,108 24,116" fill="#0d6b35" />
            <polygon points="60,108 86,86 96,116" fill="#1a8a47" />
            <polygon points="86,86 97,55 96,116" fill="#0d6b35" />
            <polygon points="60,20 64,30 74,34 64,38 60,48 56,38 46,34 56,30" fill="#fff" opacity="0.8" />
            <circle cx="36" cy="35" r="20" fill="url(#${gradId})" opacity="0.35" class="gem-light-orb">
              <animate attributeName="cx" values="36;78;54;36" dur="4s" begin="${delay + 1}s" repeatCount="indefinite" />
              <animate attributeName="cy" values="35;49;98;35" dur="4s" begin="${delay + 1}s" repeatCount="indefinite" />
              <animate attributeName="r" values="22;17;26;22" dur="4s" begin="${delay + 1}s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.2;0.35;0.4" dur="4s" begin="${delay + 1}s" repeatCount="indefinite" />
            </circle>
          </svg>`;
      }

      if (type === 'review') {
        return `
          <svg class="treasure-gem-svg" viewBox="0 0 120 140" width="120" height="140" role="img" aria-label="Review due gem">
            <defs>
              <radialGradient id="${gradId}" cx="50%" cy="50%" r="55%">
                <stop offset="0%" stop-color="#ffffff" stop-opacity="0.96"/>
                <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
              </radialGradient>
            </defs>
            <circle cx="60" cy="70" r="53" fill="#c0392b" />
            <g>
              <polygon points="60,70 60,18 71,26 67,55" fill="#e74c3c" />
              <polygon points="60,70 71,26 84,30 71,58" fill="#c0392b" />
              <polygon points="60,70 84,30 94,40 75,64" fill="#e74c3c" />
              <polygon points="60,70 94,40 103,53 80,70" fill="#c0392b" />
              <polygon points="60,70 103,53 103,69 83,77" fill="#e74c3c" />
              <polygon points="60,70 103,69 94,82 79,81" fill="#c0392b" />
              <polygon points="60,70 94,82 84,94 73,87" fill="#e74c3c" />
              <polygon points="60,70 84,94 71,100 67,86" fill="#c0392b" />
              <polygon points="60,70 67,86 60,122 53,86" fill="#8b0000" />
              <polygon points="60,70 53,86 49,100 36,94" fill="#a93226" />
              <polygon points="60,70 36,94 26,82 41,81" fill="#8b0000" />
              <polygon points="60,70 41,81 17,69 37,67" fill="#a93226" />
              <polygon points="60,70 37,67 17,53 40,63" fill="#8b0000" />
              <polygon points="60,70 40,63 26,40 46,56" fill="#a93226" />
              <polygon points="60,70 46,56 36,30 52,58" fill="#8b0000" />
              <polygon points="60,70 52,58 49,26 60,55" fill="#a93226" />
            </g>
            <polygon points="48,58 72,58 80,70 72,82 48,82 40,70" fill="#ff6b6b" />
            <path d="M33 35a20 17 0 0 1 17-15" stroke="#fff" stroke-width="3" stroke-linecap="round" opacity="0.5" fill="none" />
            <path d="M38 45a15 11 0 0 1 11-9" stroke="#fff" stroke-width="2.2" stroke-linecap="round" opacity="0.25" fill="none" />
            <ellipse cx="60" cy="101" rx="24" ry="9" fill="#ff9999" opacity="0.3" />
            <circle cx="36" cy="35" r="20" fill="url(#${gradId})" opacity="0.35" class="gem-light-orb">
              <animate attributeName="cx" values="36;78;54;36" dur="4s" begin="${delay + 2}s" repeatCount="indefinite" />
              <animate attributeName="cy" values="35;49;98;35" dur="4s" begin="${delay + 2}s" repeatCount="indefinite" />
              <animate attributeName="r" values="22;17;26;22" dur="4s" begin="${delay + 2}s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.4;0.2;0.35;0.4" dur="4s" begin="${delay + 2}s" repeatCount="indefinite" />
            </circle>
          </svg>`;
      }

      return `
        <svg class="treasure-gem-svg" viewBox="0 0 120 140" width="120" height="140" role="img" aria-label="Streak gem">
          <defs>
            <radialGradient id="${gradId}" cx="50%" cy="50%" r="55%">
              <stop offset="0%" stop-color="#ffffff" stop-opacity="0.96"/>
              <stop offset="100%" stop-color="#ffffff" stop-opacity="0"/>
            </radialGradient>
          </defs>
          <path d="M10 70Q28 20 60 20Q92 20 110 70Q92 120 60 120Q28 120 10 70Z" fill="#5dade2" />
          <polygon points="20,70 42,30 60,48 32,70" fill="#d6eaf8" />
          <polygon points="42,30 60,24 78,30 60,48" fill="#aed6f1" />
          <polygon points="78,30 100,70 60,48" fill="#d6eaf8" />
          <polygon points="24,78 60,92 40,108" fill="#1a5276" />
          <polygon points="60,92 96,78 80,108" fill="#2471a3" />
          <polygon points="44,68 60,56 76,68 60,82" fill="#85c1e9" />
          <polygon points="28,38 50,42 34,58" fill="#fff" opacity="0.7" />
          <polygon points="34,52 46,54 37,62" fill="#fff" opacity="0.35" />
          <ellipse cx="60" cy="99" rx="26" ry="10" fill="#d6eaf8" opacity="0.2" />
          <circle cx="36" cy="35" r="20" fill="url(#${gradId})" opacity="0.35" class="gem-light-orb">
            <animate attributeName="cx" values="36;78;54;36" dur="4s" begin="${delay + 3}s" repeatCount="indefinite" />
            <animate attributeName="cy" values="35;49;98;35" dur="4s" begin="${delay + 3}s" repeatCount="indefinite" />
            <animate attributeName="r" values="22;17;26;22" dur="4s" begin="${delay + 3}s" repeatCount="indefinite" />
            <animate attributeName="opacity" values="0.4;0.2;0.35;0.4" dur="4s" begin="${delay + 3}s" repeatCount="indefinite" />
          </circle>
        </svg>`;
    }

    static triggerGemFlash(event, el) {
      if (event) event.preventDefault();
      if (!el) return;

      el.classList.remove('flash');
      void el.offsetWidth;
      el.classList.add('flash');

      const burstLayer = el.querySelector('.gem-burst-layer') || el;
      const vectors = [
        { x: -26, y: -24 },
        { x: 26, y: -24 },
        { x: -24, y: 24 },
        { x: 24, y: 24 }
      ];

      vectors.forEach((v, i) => {
        const p = document.createElement('span');
        p.className = 'gem-burst-particle';
        p.style.setProperty('--dx', `${v.x}px`);
        p.style.setProperty('--dy', `${v.y}px`);
        p.style.animationDelay = `${i * 0.04}s`;
        burstLayer.appendChild(p);
        window.setTimeout(() => p.remove(), 520);
      });

      window.setTimeout(() => el.classList.remove('flash'), 620);
    }
  }

  global.ChestRenderer = ChestRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
