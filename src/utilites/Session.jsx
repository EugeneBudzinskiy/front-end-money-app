import React, { useCallback, useContext, useState } from "react";
import { useApi } from "./ApiProvider.tsx";
import useSessionTokenManager from "./useSessionTokenManager";

const SessionContext = React.createContext();

const Session = ({ children }) => {
    const { writeToken, clearToken, fetchToken} = useSessionTokenManager();
    const [hasLoadedSession, setHasLoadedSession] = useState(false);
    const api = useApi();
    const [user, setUser] = useState();

    const emailRegex = /^\S+@\S+$/;

    const isAuthenticated = () => {
        return !!fetchToken();
    };

    const apiErrorHandler = (err) => {
        if (err && err.response && err.response.data && err.response.data.message) {
            return Promise.reject(err.response.data.message);
        }
    };

    const handleSession = useCallback((response) => {
        if (response.headers.authorization) {
            const jwt = response.headers.authorization.replace("Bearer ", "");

            writeToken(jwt);
        }

        const newUser = { ...response.data.user };
        setUser(newUser);
        return response.data;
    }, [writeToken, setUser]);

    const signup = ( {email, password, confirmation_password}) => {
        if (
            !email || !email.match(emailRegex)
        ) {
            return Promise.reject("Email is required");
        }
        if (!password) {
            return Promise.reject("Password is required");
        }
        if (password !== confirmation_password) {
            return Promise.reject("Password and confirmation password don't match");
        }

        const authApi = api;
        return authApi.post(
                "/signup",
            {
                    user: {
                        email: email,
                        password: password,
                        confirmation_password: confirmation_password,
                    }
                },
            )
            .then(handleSession)
            .then(() => setHasLoadedSession(true))
            .catch(apiErrorHandler);
    };

    const login = ({ email, password }) => {
        if (
            !email || !email.match(emailRegex)
        ) {
            return Promise.reject("Email is required");
        }
        if (!password) {
            return Promise.reject("Password is required");
        }

        const authApi = api;
        return authApi
            .post(
                "/login",
                {
                    user: {
                        email: email,
                        password: password,
                    }
                },
            )
            .then(handleSession)
            .then(() => setHasLoadedSession(true))
            .catch(apiErrorHandler);
    };

    const logout = () => {
        const authApi = api;
        return authApi.delete("/logout(",).then(() => {
            clearToken();
            setUser(null);
            return user;
        });
    };

    return (
        <SessionContext.Provider
            value={{
                user,
                isAuthenticated,
                login,
                logout,
                hasLoadedSession,
                writeToken,
                setUser,
                signup,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};

export default Session;

export const useSession = () => {
    const context = useContext(SessionContext);
    if (typeof context === "undefined") {
        throw new Error("useSession must be used within a SessionContext");
    }
    return context;
};
