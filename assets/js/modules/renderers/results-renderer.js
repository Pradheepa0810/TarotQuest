(function (global) {
  class ResultsRenderer {
    static render(options) {
      const card = options.card;
      const quiz = global.QuizEngine.evaluate(card, options.state.quizAnswers);
      const earned = options.getCardGemReward(card);

      if (!options.pendingMilestoneId && options.progress.learned >= options.progress.total) {
        return options.renderGrandmasterEnding(options.progress);
      }

      const gemSlots = [];
      for (let i = 0; i < 3; i++) {
        gemSlots.push(`
          <div class="gem-slot earned" style="animation-delay: ${i * 0.15}s">
            <div class="gem-diamond"></div>
          </div>`);
      }
      for (let i = 0; i < 6; i++) {
        gemSlots.push('<div class="gem-slot"></div>');
      }
      const gemCabinet = `<div class="gem-cabinet">${gemSlots.join('')}</div>`;

      const grades = quiz.results.map((r, i) => `
        <div class="grade-item ${r.correct ? 'pass' : 'fail'}">
          <strong>Q${i + 1}:</strong> ${r.correct
            ? `<span class="icon-inline">${options.icon('check')}<span>Correct!</span></span>`
            : `<span class="icon-inline">${options.icon('x')}<span>Not quite.</span></span>`}
          ${r.correct ? '' : `<br><small>You chose: "${r.q.options[r.chosen]}" — ${r.q.explain}</small>`}
        </div>`).join('');

      const nextBtn = options.pendingMilestoneId
        ? `<button class="btn btn-primary" onclick="goToMilestone('${options.pendingMilestoneId}')"><span class="icon-inline">${options.icon('award')}<span>Claim Your Reward</span></span></button>`
        : options.nextCard
          ? '<button class="btn btn-primary" onclick="startNextCard()">Move to the Next Card</button>'
          : `<div class="complete-banner" style="margin-bottom:1rem"><span class="icon-inline">${options.icon('crown')}<span>You mastered all ${options.totalCards} cards!</span></span></div>`;

      return `
        <div class="card-panel results-panel">
          <div class="phase-title">Gem Reward</div>
          <p>You scored <strong>${quiz.score}/${card.quiz.length}</strong> (${quiz.pct}%)</p>
          <div class="gem-burst">+${earned} Gems</div>
          <p style="color:var(--text-dim); font-size: 0.9rem; margin-top: 0.5rem;">Earned Gems:</p>
          ${gemCabinet}
          <div class="rank-badge">${options.getRank(options.state.gems)}</div>
          <p style="color:var(--text-dim);margin-bottom:1rem">Total Gems: ${options.state.gems} &nbsp;|&nbsp; Deck: ${options.progress.learned}/${options.progress.total}</p>
          ${grades}

          <div class="nav-buttons" style="margin-top:1.5rem">
            ${nextBtn}
            ${options.state.lastReviewedCard ? '<button class="btn btn-secondary" onclick="reviewLastCard()">Review Last Card</button>' : ''}
            <button class="btn btn-secondary" onclick="finishLesson()">Return Home</button>
          </div>
        </div>`;
    }
  }

  global.ResultsPageRenderer = ResultsRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
