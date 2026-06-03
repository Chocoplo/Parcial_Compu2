import { Store } from "@tanstack/react-store";

export const authStore = new Store({
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
    user: null,
});

export const setToken = (token) => {
    localStorage.setItem("token", token);
    authStore.setState((s) => ({ ...s, token, isAuthenticated: true }));
};

export const setUser = (user) => {
    authStore.setState((s) => ({ ...s, user }));
};

export const clearToken = () => {
    localStorage.removeItem("token");
    authStore.setState(() => ({ token: null, isAuthenticated: false, user: null }));
};
