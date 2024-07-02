import { getValueFromLocalStorage, setValueToLocalStorage } from './Misc';
import { create } from "zustand";

const TOKEN_KEY = 'auth_token';
const USER_KEY = 'auth_user';

export const useAuthStore = create((set, get) => ({
    token: getValueFromLocalStorage(TOKEN_KEY) || null,
    currentUser: getValueFromLocalStorage(USER_KEY) || null,
    setToken: (token) => {
        set({ token });
        setValueToLocalStorage(TOKEN_KEY, token);
    },
    removeToken: () => {
        set({ token: null });
        setValueToLocalStorage(TOKEN_KEY, null);
    },
    isAuthenticated: () => {
        return get().token !== null;
    },
    setCurrentUser: (user) => {
        set({ currentUser: user });
        setValueToLocalStorage(USER_KEY, user);
    },
    removeCurrentUser: () => {
        set({ currentUser: null });
        setValueToLocalStorage(USER_KEY, null);
    }
}));