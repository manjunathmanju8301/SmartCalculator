import type { IUser } from "../app-types";

export const defaultGustUserInfo = { is_gust: true, name: 'Gust User', user_id: -1, email: 'gust@example.com' } as IUser;

export const getRandomNumber = () => Math.random().toString(36).substring(2, 10);