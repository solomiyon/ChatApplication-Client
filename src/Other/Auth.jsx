export default class Auth {
    static TOKEN_STORAGE_KEY = "token";

    static getToken() {
        return window.localStorage.getItem(Auth.TOKEN_STORAGE_KEY);
    }

    static setToken(token) {
        window.localStorage.setItem(Auth.TOKEN_STORAGE_KEY, token);
    }

    static removeToken() {
        window.localStorage.removeItem(Auth.TOKEN_STORAGE_KEY);
    }
}