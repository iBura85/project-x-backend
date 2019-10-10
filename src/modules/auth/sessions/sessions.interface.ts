/**
 * Интерфейс сессии пользователя
 */
export interface Session {
  id?: string;
  user_id: string;
  ip: string;
  os: string;
  browser: string;
  user_agent: string;
  token: string;
  expire_in: number;
  created_at: number;
  updated_at: number;
}
