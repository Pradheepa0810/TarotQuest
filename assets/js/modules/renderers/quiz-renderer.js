(function (global) {
  class QuizRenderer {
    static render(options) {
      const card = options.card;
      const answers = options.answers;
      const questions = card.quiz.map((q, qi) => `
        <div class="quiz-question" data-q="${qi}">
          <h4>Question ${qi + 1} of ${card.quiz.length}</h4>
          <p>${q.q}</p>
          <div class="quiz-options">
            ${q.options.map((opt, oi) => `
              <label class="quiz-option ${answers[qi] === oi ? 'selected' : ''}" onclick="selectAnswer(${qi}, ${oi})">
                <input type="radio" name="q${qi}" ${answers[qi] === oi ? 'checked' : ''}>
                <span>${opt}</span>
              </label>`).join('')}
          </div>
        </div>`).join('');

      const allAnswered = global.QuizEngine.allAnswered(card, answers);

      return `
        <div class="card-panel">
          <div class="phase-title">Oracle Quiz</div>
          <p style="margin-bottom:1.25rem;color:var(--text-dim)">Answer all questions from memory first. If you are unsure, pick the meaning that fits the card's image and lesson together.</p>
          ${questions}
          <div class="nav-buttons">
            <button class="btn btn-primary" ${allAnswered ? '' : 'disabled'} onclick="submitQuiz()"><span class="icon-inline">${options.icon('sparkles')}<span>Face the Oracle</span></span></button>
          </div>
        </div>`;
    }
  }

  global.QuizPageRenderer = QuizRenderer;
})(typeof window !== 'undefined' ? window : globalThis);
