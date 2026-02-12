// 実行環境に合わせてAPIベースURLを取得
export const URL = import.meta.env.VITE_API_URL;

// fetchの薄いラッパー
export function api(path: string, init?: RequestInit) {
  return fetch(`${URL}${path}`, init);
}
