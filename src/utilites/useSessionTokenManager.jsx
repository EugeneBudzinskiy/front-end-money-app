import {
    deleteFromStorage,
    writeStorage,
} from "@rehooks/local-storage";
let token;

const useSessionTokenManager = () => {
    const tokenKey = "token";

    const writeToken = (newToken) => {
        token = newToken;
        writeStorage(tokenKey, newToken);
    };
    const clearToken = () => {
        token = null;
        deleteFromStorage(tokenKey);
    };
    const fetchToken = () => {
        const storedToken = localStorage.getItem(tokenKey);
        return token || storedToken;
    };

    return { writeToken, clearToken, fetchToken};
};

export default useSessionTokenManager;