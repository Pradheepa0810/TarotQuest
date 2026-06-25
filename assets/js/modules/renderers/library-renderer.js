(function (global) {
  class LibraryRenderer {
    static render(options) {
      const unlockedCount = options.unlockedIds.length;
      
      // Map achievement IDs to tarot card images
      const imageMap = {
        'first_five': 'achievement_first_five.jpeg',
        'major_arcana_adept': 'achievement_major_arcana.jpeg',
        'wands_arcana_adept': 'achievement_wands.jpeg',
        'cups_arcana_adept': 'achievement_major_arcana.jpeg',
        'swords_arcana_adept': 'achievement_swords.jpg',
        'pentacles_arcana_adept': 'achievement_pentacles.jpg',
        'quiz_perfectionist': 'achievement_quiz.jpg',
        'speed_learner': 'achievement_speed.jpg',
        'tarot_master': 'achievement_master.jpg'
      };

      const cardsHtml = options.achievements.map((achievement, index) => {
        const unlocked = options.unlockedIds.includes(achievement.id);
        const theme = options.themes[achievement.id] || { className: '', kicker: 'Archive Card' };
        const imagePath = `assets/images/${imageMap[achievement.id] || 'achievement_master.jpg'}`;

        return `
          <article class="achievement-card ${theme.className} ${unlocked ? 'unlocked' : 'locked'}" data-achievement="${achievement.id}" style="--card-index:${index}; --sweep-delay:${index}s;">
            <div class="achievement-back" aria-hidden="true">
              <div class="achievement-back-inner">
                <div class="achievement-illustration">
                  <img src="${imagePath}" alt="${achievement.name}" class="achievement-card-image" loading="lazy" onerror="this.onerror=null;this.src='assets/images/achievement_master.jpg';" />
                  <div class="achievement-hover-sparkles" aria-hidden="true">
                    <span></span><span></span><span></span><span></span><span></span>
                  </div>
                  <span class="card-ornament card-ornament-top" aria-hidden="true">✦ ☾ ✦</span>
                  <span class="card-ornament card-ornament-bottom" aria-hidden="true">✧ ✦ ✧</span>
                </div>
                <p class="achievement-tooltip">${achievement.description}</p>
                ${unlocked ? '<span class="achievement-unlocked-badge" aria-hidden="true">&#10022;</span>' : ''}
                ${!unlocked ? '<span class="achievement-locked-badge" aria-hidden="true">&#128274;</span>' : ''}
              </div>
            </div>
            <div class="achievement-label">
              <h3 class="achievement-name">${achievement.name}</h3>
            </div>
          </article>`;
      }).join('');

      const certificateBtn = `
        <button class="btn btn-accent" onclick="handleDownloadFullDeckCertificate()" style="margin-bottom: 1.5rem;">
          <span class="icon-inline">${options.icon('award')}<span>Download Mastery Certificate</span></span>
        </button>`;

      return `
        <section class="card-panel alchemy-library-panel">
          <div class="alchemy-library-head">
            <div>
              <h2 class="phase-title">Alchemy Library</h2>
              <p class="alchemy-library-copy">Collected achievement cards: ${unlockedCount}/${options.achievements.length}</p>
              ${options.deckComplete ? '<p class="alchemy-library-copy" style="color: var(--color-accent); margin-top: 0.5rem;">🌟 Entire Deck Mastered! 🌟</p>' : ''}
            </div>
            ${certificateBtn}
          </div>
          <div class="achievement-grid">${cardsHtml}</div>
        </section>`;
    }

    static renderDotRow(count) {
      return Array.from({ length: count }, () => '<span class="edge-dot"></span>').join('');
    }

    static renderStarfield(seedKey) {
      let seed = Array.from(seedKey).reduce((acc, char, index) => acc + char.charCodeAt(0) * (index + 11), 97);
      const random = () => {
        seed = (seed * 1664525 + 1013904223) >>> 0;
        return seed / 4294967296;
      };

      const dots = Array.from({ length: 18 }, (_, index) => {
        const size = 1 + random() * 1.4;
        const left = 10 + random() * 80;
        const top = 8 + random() * 56;
        const opacity = 0.3 + random() * 0.5;
        return `<span class="star-dot" style="left:${left.toFixed(1)}%; top:${top.toFixed(1)}%; width:${size.toFixed(2)}px; height:${size.toFixed(2)}px; opacity:${opacity.toFixed(2)}; animation-delay:${(index * 0.31).toFixed(2)}s"></span>`;
      }).join('');

      const glyphs = Array.from({ length: 4 }, (_, index) => {
        const left = 14 + random() * 72;
        const top = 12 + random() * 52;
        const size = 11 + random() * 5;
        const opacity = 0.38 + random() * 0.34;
        return `<span class="star-glyph" style="left:${left.toFixed(1)}%; top:${top.toFixed(1)}%; font-size:${size.toFixed(1)}px; opacity:${opacity.toFixed(2)}; animation-delay:${(index * 0.47).toFixed(2)}s">✦</span>`;
      }).join('');

      return `${dots}${glyphs}`;
    }

    static renderAchievementSigilSvg(achievementId) {
      const stroke = '#c9a84c';
      switch (achievementId) {
        case 'first_five':
          return `
            <svg class="achievement-sigil" viewBox="0 0 120 160" fill="none" stroke="${stroke}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M45 30a24 24 0 1 0 0 48a18 18 0 1 1 0-48z" />
              <circle cx="64" cy="55" r="11" />
              <path d="M64 42v-10M76 48l8-5M77 62l8 5M64 68v10M51 48l-8-5M51 62l-8 5" stroke-dasharray="1.8 4.2"/>
              <path d="M34 96c8-12 18-18 30-18s22 6 30 18" />
              <path d="M44 110c6-8 11-12 20-12s14 4 20 12" />
              <circle cx="33" cy="32" r="2" /><circle cx="92" cy="37" r="2" /><circle cx="98" cy="70" r="2" /><circle cx="28" cy="84" r="2" /><circle cx="87" cy="111" r="2" />
            </svg>`;
        case 'major_arcana_adept':
          return `
            <svg class="achievement-sigil" viewBox="0 0 120 160" fill="none" stroke="${stroke}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="60" cy="68" r="29" />
              <path d="M60 21v18M60 97v18M22 68h18M80 68h18M33 41l12 12M75 83l12 12M33 95l12-12M75 53l12-12" />
              <path d="M40 68c6-8 12.7-12 20-12s14 4 20 12c-5.8 8-12.5 12-20 12s-14.2-4-20-12z" />
              <circle cx="60" cy="68" r="5" />
              <path d="M43 118c6-10 12-15 17-15s11 5 17 15" />
              <circle cx="25" cy="33" r="2" /><circle cx="95" cy="33" r="2" /><circle cx="18" cy="68" r="2" /><circle cx="102" cy="68" r="2" /><circle cx="27" cy="104" r="2" /><circle cx="93" cy="104" r="2" />
            </svg>`;
        case 'wands_arcana_adept':
          return `
            <svg class="achievement-sigil" viewBox="0 0 120 160" fill="none" stroke="${stroke}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M59 112l3-46" />
              <path d="M51 114h18" />
              <path d="M50 72c4-13 14-20 10-33c8 5 13 14 12 24c6-2 10-8 12-14c4 16-5 28-20 35" />
              <path d="M60 29v-10M42 41l-9-8M78 41l9-8M36 66H24M84 66h12M44 92l-8 9M76 92l8 9" />
              <circle cx="31" cy="32" r="2" /><circle cx="88" cy="32" r="2" /><circle cx="22" cy="66" r="2" /><circle cx="97" cy="66" r="2" /><circle cx="60" cy="125" r="2" />
            </svg>`;
        case 'cups_arcana_adept':
          return `
            <svg class="achievement-sigil" viewBox="0 0 120 160" fill="none" stroke="${stroke}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M39 50h42c-1.5 18-9 28-21 33c-12-5-19.5-15-21-33z" />
              <path d="M48 84h24M44 92h32" />
              <path d="M43 38a14 14 0 1 0 0 22a10 10 0 1 1 0-22z" />
              <path d="M50 108c0 4-3 8-6 10c-3-2-6-6-6-10c0-3.6 2.6-6 6-9.8c3.4 3.8 6 6.2 6 9.8z" />
              <path d="M76 108c0 4-3 8-6 10c-3-2-6-6-6-10c0-3.6 2.6-6 6-9.8c3.4 3.8 6 6.2 6 9.8z" />
              <circle cx="31" cy="34" r="2" /><circle cx="86" cy="31" r="2" /><circle cx="94" cy="54" r="2" /><circle cx="32" cy="71" r="2" /><circle cx="60" cy="121" r="2" />
            </svg>`;
        case 'swords_arcana_adept':
          return `
            <svg class="achievement-sigil" viewBox="0 0 120 160" fill="none" stroke="${stroke}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M60 25l7 22l22-7l-16 16l16 16l-22-7l-7 22l-7-22l-22 7l16-16l-16-16l22 7z" />
              <circle cx="60" cy="56" r="7" />
              <path d="M60 35l4 13M60 77l-4-13M39 56l13 4M81 56l-13-4" />
              <path d="M44 33a9 9 0 1 0 0 14a6 6 0 1 1 0-14z" />
              <path d="M76 41a9 9 0 1 0 0 14a6 6 0 1 1 0-14z" />
              <path d="M76 75a9 9 0 1 0 0 14a6 6 0 1 1 0-14z" />
              <path d="M44 75a9 9 0 1 0 0 14a6 6 0 1 1 0-14z" />
              <circle cx="60" cy="111" r="2" /><circle cx="28" cy="56" r="2" /><circle cx="92" cy="56" r="2" />
            </svg>`;
        case 'pentacles_arcana_adept':
          return `
            <svg class="achievement-sigil" viewBox="0 0 120 160" fill="none" stroke="${stroke}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="60" cy="62" r="28" />
              <path d="M60 34l16 12l-6 20H50l-6-20z" />
              <path d="M60 34v32M76 46L44 66M44 46l32 20" />
              <path d="M42 95c5-8 11-12 18-12s13 4 18 12" />
              <circle cx="60" cy="34" r="2" /><circle cx="76" cy="46" r="2" /><circle cx="70" cy="66" r="2" /><circle cx="50" cy="66" r="2" /><circle cx="44" cy="46" r="2" /><circle cx="29" cy="31" r="2" /><circle cx="90" cy="31" r="2" /><circle cx="92" cy="89" r="2" /><circle cx="28" cy="90" r="2" />
            </svg>`;
        case 'quiz_perfectionist':
          return `
            <svg class="achievement-sigil" viewBox="0 0 120 160" fill="none" stroke="${stroke}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M60 23v14M60 99v14M23 68h14M83 68h14M34 42l10 10M76 84l10 10M34 94l10-10M76 52l10-10M42 28l5 11M78 28l-5 11M28 42l11 5M28 94l11-5M92 42l-11 5M92 94l-11-5M42 108l5-11M78 108l-5-11" />
              <circle cx="60" cy="68" r="15" />
              <path d="M46 68c4-5.2 8.7-7.8 14-7.8s10 2.6 14 7.8c-4 5.2-8.7 7.8-14 7.8s-10-2.6-14-7.8z" />
              <circle cx="60" cy="68" r="3.6" />
              <circle cx="60" cy="117" r="2" /><circle cx="20" cy="68" r="2" /><circle cx="100" cy="68" r="2" />
            </svg>`;
        case 'speed_learner':
          return `
            <svg class="achievement-sigil" viewBox="0 0 120 160" fill="none" stroke="${stroke}" stroke-width="1.35" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <path d="M46 36a23 23 0 1 0 0 46a17 17 0 1 1 0-46z" />
              <path d="M37 84l48-38" />
              <path d="M81 46l7 8h-12z" />
              <path d="M34 106h24" stroke-dasharray="1.8 4" />
              <circle cx="29" cy="89" r="2" /><circle cx="36" cy="97" r="2" /><circle cx="45" cy="104" r="2" /><circle cx="56" cy="110" r="2" /><circle cx="92" cy="33" r="2" />
            </svg>`;
        case 'tarot_master':
          return `
            <svg class="achievement-sigil" viewBox="0 0 120 160" fill="none" stroke="${stroke}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="60" cy="68" r="35" />
              <path d="M60 25l9 24l24-9l-15 20l24 9l-24 9l15 20l-24-9l-9 24l-9-24l-24 9l15-20l-24-9l24-9l-15-20l24 9z" />
              <circle cx="60" cy="68" r="13" />
              <path d="M47 68c4.1-5 8.5-7.4 13-7.4s8.9 2.4 13 7.4c-4.1 5-8.5 7.4-13 7.4s-8.9-2.4-13-7.4z" />
              <circle cx="60" cy="68" r="3" />
              <path d="M60 35a8 8 0 1 0 0 13a5.5 5.5 0 1 1 0-13z" />
              <path d="M82 46a8 8 0 1 0 0 13a5.5 5.5 0 1 1 0-13z" />
              <path d="M84 80a8 8 0 1 0 0 13a5.5 5.5 0 1 1 0-13z" />
              <path d="M60 92a8 8 0 1 0 0 13a5.5 5.5 0 1 1 0-13z" />
              <path d="M36 80a8 8 0 1 0 0 13a5.5 5.5 0 1 1 0-13z" />
              <path d="M38 46a8 8 0 1 0 0 13a5.5 5.5 0 1 1 0-13z" />
              <circle cx="60" cy="18" r="2" /><circle cx="83" cy="25" r="2" /><circle cx="100" cy="43" r="2" /><circle cx="102" cy="67" r="2" /><circle cx="91" cy="90" r="2" /><circle cx="67" cy="104" r="2" /><circle cx="43" cy="103" r="2" /><circle cx="24" cy="88" r="2" /><circle cx="18" cy="64" r="2" /><circle cx="25" cy="40" r="2" />
            </svg>`;
        default:
          return `
            <svg class="achievement-sigil" viewBox="0 0 120 160" fill="none" stroke="${stroke}" stroke-width="1.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <circle cx="60" cy="68" r="28" />
              <path d="M60 38v60M30 68h60M40 48l40 40M80 48L40 88" />
              <circle cx="30" cy="38" r="2" /><circle cx="90" cy="38" r="2" /><circle cx="90" cy="98" r="2" /><circle cx="30" cy="98" r="2" />
            </svg>`;
      }
    }
  }

  global.LibraryRenderer = LibraryRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
