// APIレスポンスを受け取った際の処理をまとめたモジュール

export function getStoredData(key) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
  }
