(function (global) {
  class QuestStorageService {
    getJSON(key) {
      try {
        const raw = localStorage.getItem(key);
        return raw ? JSON.parse(raw) : null;
      } catch (_) {
        return null;
      }
    }

    setJSON(key, value) {
      try {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
      } catch (_) {
        return false;
      }
    }
  }

  global.QuestStorageService = QuestStorageService;
})(typeof window !== 'undefined' ? window : globalThis);
