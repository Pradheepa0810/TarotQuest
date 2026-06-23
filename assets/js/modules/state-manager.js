(function (global) {
  class QuestStateFactory {
    static createDailyState(todayBlessing) {
      return {
        streak: 0,
        lastLoginDate: null,
        lastIncrementDate: null,
        lastCompletionDate: null,
        completedDates: [],
        claimedMilestones: [],
        todayBlessing,
        pendingLoginReward: 0,
        showWelcomeBack: false,
        welcomeMessage: ''
      };
    }

    static createAchievementData() {
      return {
        unlocked: [],
        perfectQuizWins: 0,
        masteredThisSession: 0,
        bestSessionMastered: 0
      };
    }

    static createMasteredStatus() {
      return { deck: false, currentCard: false };
    }

    static createInitialState(config) {
      return {
        gems: 0,
        learnedCards: [],
        currentCard: 'fool',
        phaseIndex: 0,
        quizAnswers: [],
        quizSubmitted: false,
        sessionGems: 0,
        shownMilestones: [],
        completedGroups: [],
        rank: config.rankTitle,
        masteredStatus: this.createMasteredStatus(),
        lastReviewedCard: null,
        navPosition: 1,
        showingMilestone: false,
        lastViewKey: null,
        popupQueue: [],
        popupOpen: false,
        modalOpen: false,
        daily: this.createDailyState(config.todayBlessing),
        isFirstVisit: true,
        settings: { ...config.defaultSettings },
        srs: {},
        reviewSession: null,
        rightPanelCollapsed: false,
        lessonEntryCardId: null,
        revealCardFlipped: false,
        revealFlipAnimating: false,
        revealViewKey: null,
        compareMode: false,
        compareLeftCardId: null,
        compareRightCardId: null,
        activeView: 'home',
        panelReturnView: 'home',
        achievementData: this.createAchievementData()
      };
    }

    static createResetPatch(config) {
      return {
        gems: 0,
        learnedCards: [],
        currentCard: 'fool',
        phaseIndex: 0,
        quizAnswers: [],
        quizSubmitted: false,
        completedGroups: [],
        rank: config.rankTitle,
        masteredStatus: this.createMasteredStatus(),
        lastReviewedCard: null,
        navPosition: 1,
        showingMilestone: false,
        popupQueue: [],
        popupOpen: false,
        daily: this.createDailyState(config.todayBlessing),
        shownMilestones: [],
        isFirstVisit: true,
        rightPanelCollapsed: false,
        activeView: 'home',
        panelReturnView: 'home',
        achievementData: this.createAchievementData()
      };
    }
  }

  class QuestStateManager {
    constructor(config) {
      this._config = { ...config };
      this._state = QuestStateFactory.createInitialState(this._config);
    }

    getState() {
      return this._state;
    }

    reset() {
      Object.assign(this._state, QuestStateFactory.createResetPatch(this._config));
      return this._state;
    }
  }

  global.QuestStateFactory = QuestStateFactory;
  global.QuestStateManager = QuestStateManager;
})(typeof window !== 'undefined' ? window : globalThis);
