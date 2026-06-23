(function (global) {
  class AchievementService {
    constructor(options) {
      this.state = options.state;
      this.groups = options.groups;
      this.achievements = options.achievements;
      this.deck = options.deck;
      this.onUnlock = options.onUnlock;
    }

    getCardGroup(cardId) {
      const idx = this.deck.DECK_ORDER.indexOf(cardId);
      if (idx < 0) return null;
      if (idx < 22) return 'major';
      if (idx < 36) return 'wands';
      if (idx < 50) return 'cups';
      if (idx < 64) return 'swords';
      return 'pentacles';
    }

    groupLearnedCount(groupId) {
      return this.state.learnedCards.filter((id) => this.getCardGroup(id) === groupId).length;
    }

    groupIsComplete(groupId) {
      const g = this.groups.find((group) => group.id === groupId);
      return !!g && this.groupLearnedCount(groupId) >= g.count;
    }

    checkPendingMilestone() {
      for (const g of this.groups) {
        if (this.groupIsComplete(g.id) && !this.state.shownMilestones.includes(g.id)) {
          return g.id;
        }
      }
      return null;
    }

    getCompletedGroups() {
      return this.groups.filter((g) => this.groupIsComplete(g.id)).map((g) => g.id);
    }

    isAchievementUnlocked(achievementId) {
      return this.state.achievementData.unlocked.includes(achievementId);
    }

    unlockAchievement(achievementId) {
      const achievement = this.achievements.find((a) => a.id === achievementId);
      if (!achievement || this.isAchievementUnlocked(achievementId)) return false;

      this.state.achievementData.unlocked.push(achievementId);
      if (achievement.gems > 0) {
        this.state.gems += achievement.gems;
      }

      if (typeof this.onUnlock === 'function') {
        this.onUnlock(achievement, this.state);
      }

      return true;
    }

    getAchievementProgress(achievement) {
      switch (achievement.id) {
        case 'first_five':
          return {
            current: Math.min(this.state.learnedCards.length, achievement.target),
            detail: `${this.state.learnedCards.length}/${achievement.target} cards mastered`
          };
        case 'major_arcana_adept': {
          const majorCount = this.groupLearnedCount('major');
          return {
            current: Math.min(majorCount, achievement.target),
            detail: `${majorCount}/${achievement.target} Major Arcana`
          };
        }
        case 'wands_arcana_adept': {
          const count = this.groupLearnedCount('wands');
          return {
            current: Math.min(count, achievement.target),
            detail: `${count}/${achievement.target} Wands`
          };
        }
        case 'cups_arcana_adept': {
          const count = this.groupLearnedCount('cups');
          return {
            current: Math.min(count, achievement.target),
            detail: `${count}/${achievement.target} Cups`
          };
        }
        case 'swords_arcana_adept': {
          const count = this.groupLearnedCount('swords');
          return {
            current: Math.min(count, achievement.target),
            detail: `${count}/${achievement.target} Swords`
          };
        }
        case 'pentacles_arcana_adept': {
          const count = this.groupLearnedCount('pentacles');
          return {
            current: Math.min(count, achievement.target),
            detail: `${count}/${achievement.target} Pentacles`
          };
        }
        case 'quiz_perfectionist':
          return {
            current: Math.min(this.state.achievementData.perfectQuizWins, achievement.target),
            detail: `${this.state.achievementData.perfectQuizWins}/${achievement.target} perfect quizzes`
          };
        case 'speed_learner':
          return {
            current: Math.min(this.state.achievementData.bestSessionMastered, achievement.target),
            detail: `${this.state.achievementData.bestSessionMastered}/${achievement.target} cards in best session`
          };
        case 'tarot_master':
          return {
            current: Math.min(this.state.learnedCards.length, achievement.target),
            detail: `${this.state.learnedCards.length}/${achievement.target} cards mastered`
          };
        default:
          return { current: 0, detail: '0/0' };
      }
    }

    evaluateAchievements() {
      if (this.state.learnedCards.length >= 5) {
        this.unlockAchievement('first_five');
      }

      if (this.groupLearnedCount('major') >= 22) {
        this.unlockAchievement('major_arcana_adept');
      }

      if (this.groupLearnedCount('wands') >= 14) this.unlockAchievement('wands_arcana_adept');
      if (this.groupLearnedCount('cups') >= 14) this.unlockAchievement('cups_arcana_adept');
      if (this.groupLearnedCount('swords') >= 14) this.unlockAchievement('swords_arcana_adept');
      if (this.groupLearnedCount('pentacles') >= 14) this.unlockAchievement('pentacles_arcana_adept');

      if (this.state.achievementData.perfectQuizWins >= 3) {
        this.unlockAchievement('quiz_perfectionist');
      }

      if (this.state.achievementData.masteredThisSession >= 3) {
        this.unlockAchievement('speed_learner');
      }

      if (this.state.learnedCards.length >= this.deck.TOTAL_CARDS) {
        this.unlockAchievement('tarot_master');
      }
    }
  }

  global.AchievementService = AchievementService;
})(typeof window !== 'undefined' ? window : globalThis);
