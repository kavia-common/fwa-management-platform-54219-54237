import { api } from './client';
import { ENDPOINTS } from './endpoints';

// PUBLIC_INTERFACE
export async function login(username, password) {
  /** Login and persist token */
  const res = await api.post(ENDPOINTS.login(), { username, password });
  if (res && res.token) {
    localStorage.setItem('auth_token', res.token);
  }
  return res;
}

// PUBLIC_INTERFACE
export function logout() {
  /** Clear token and optionally call backend logout */
  try { localStorage.removeItem('auth_token'); } catch {}
  // Best-effort backend logout (ignore errors)
  api.post(ENDPOINTS.logout(), {}).catch(() => {});
}

// PUBLIC_INTERFACE
export async function getCurrentUser() {
  /** Fetch the authenticated user profile */
  return api.get(ENDPOINTS.me());
}

// PUBLIC_INTERFACE
export function isAuthenticated() {
  /** Returns true if token exists */
  try { return !!localStorage.getItem('auth_token'); } catch { return false; }
}
