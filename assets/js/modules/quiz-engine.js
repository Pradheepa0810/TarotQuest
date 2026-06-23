(function (global) {
  class QuizEngine {
    static evaluate(card, answers) {
      const results = card.quiz.map((q, i) => {
        const chosen = answers[i];
        const correct = chosen === q.answer;
        return { correct, q, chosen };
      });

      const score = results.filter((r) => r.correct).length;
      const pct = Math.round((score / card.quiz.length) * 100);
      return { results, score, pct };
    }

    static allAnswered(card, answers) {
      return answers.length === card.quiz.length && answers.every((a) => a !== undefined);
    }
  }

  global.QuizEngine = QuizEngine;
})(typeof window !== 'undefined' ? window : globalThis);
