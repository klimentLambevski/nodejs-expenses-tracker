class LocalStorageService {
  static setItem(key, item) {
    localStorage.setItem(key, item);
  }

  static getItem(key) {
    return localStorage.getItem(key);
  }

  static removeItem(key) {
    localStorage.removeItem(key);
  }
}

export default LocalStorageService;
