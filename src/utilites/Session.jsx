import React, { useCallback, useContext, useState } from "react";
import { useApi } from "./ApiProvider.tsx";
import useSessionTokenManager from "./useSessionTokenManager";

const SessionContext = React.createContext();

const Session = ({ children }) => {
    const { writeToken, clearToken, fetchToken} = useSessionTokenManager();
    const [hasLoadedSession, setHasLoadedSession] = useState(false);
    const api = useApi();
    const [user, setUser] = useState();

    const isAuthenticated = () => {
        return !!fetchToken();
    };

    const apiErrorHandler = (err) => {
        if (err && err.response && err.response.data) {
            console.log(err.response.data.errors.email[0])
            // NotificationManager.error(err.response.data.errors.email[0].toString, "");
            return Promise.reject(err.response.data.errors.email[0])
        }
    };

    const handleSession = useCallback((response) => {
        if (response.headers.authorization) {
            const jwt = response.headers.authorization.replace("Bearer ", "");

            writeToken(jwt);
        }

        const newUser = { ...response.data };
        setUser(newUser);
        return response.data;
    }, [writeToken, setUser]);

    const signup = ( {email, password, confirmation_password}) => {
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
        setUser();
        return clearToken();
        // const authApi = api;
        // return authApi.delete("/logout",).then(() => {
        //     clearToken();
        //     setUser(null);
        //     return user;
        // });
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
