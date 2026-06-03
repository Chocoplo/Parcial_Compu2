import { Store } from "@tanstack/react-store";

export const authStore = new Store({
    token: localStorage.getItem("token") || null,
    isAuthenticated: !!localStorage.getItem("token"),
});

export const setToken = (token) => {
    localStorage.setItem("token", token);
    authStore.setState(() => ({ token, isAuthenticated: true }));
};

export const clearToken = () => {
    localStorage.removeItem("token");
    authStore.setState(() => ({ token: null, isAuthenticated: false }));
};
