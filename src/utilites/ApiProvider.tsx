import axios, {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import useSessionTokenManager from "./useSessionTokenManager";
import * as React from "react";
import { useContext, useMemo }from 'react';
import * as Qs from 'qs'
import { useNavigate } from "react-router-dom";

export const baseURL =
    localStorage.getItem("REACT_APP_API_URL") || "https://boiling-waters-63998.herokuapp.com";


export interface ApiInstance extends AxiosInstance {
    paths?: { [key: string]: () => string },
    url?: string,
}

interface MyRequestConfig extends AxiosRequestConfig {
    token?: string;
}

interface MyAxiosError extends AxiosError {
    config: MyRequestConfig;
}

export const createDefaultApiInstance = (url:string):ApiInstance => {
    const api:ApiInstance = axios.create({
        baseURL: url,
        timeout: 10000,
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "X-Requested-With": "XmlHttpRequest",
        },
        paramsSerializer: function (params) {
            return Qs.stringify(params, {arrayFormat: "brackets"});
        },
    });

    return api;
};

export const createApi = ():ApiInstance => {
    let api: ApiInstance;
    if (baseURL) {
        api = createDefaultApiInstance(baseURL);
    } else {
        throw new Error("baseURL is undefined");
    }

    api.paths = {
        authenticate: () => "/login",
        updatePassword: () => "v1/settings/update_password",
    };

    api.url = baseURL;


    return api;
}

const ApiContext = React.createContext<ApiInstance | undefined>(undefined);

const ApiProvider = ({ children }): JSX.Element => {
    const navigate = useNavigate();
    const { writeToken, clearToken, fetchToken} = useSessionTokenManager();

    const api = useMemo(() => {
        const newApi = createApi();
        const interceptors = {
            addAuthorizationToRequest: (config: MyRequestConfig) => {
                const token = config.token || fetchToken();

                if (token) {
                    config.headers["Authorization"] = `Bearer ${token}`;
                }
                return config;
            },
            handleError: (err: MyAxiosError) => {
                if (
                    err.response &&
                    err.response.status === 401) {
                    clearToken();
                    navigate("/");
                }

                if (
                    err.response &&
                    err.response.status === 500
                ) {
                }

                return Promise.reject(err);
            },
            fetchAuthTokens: (response: AxiosResponse) => {
                if (response && response.headers && response.headers.authorization) {
                    const jwt = response.headers.authorization.replace("Bearer ", "");
                    if (jwt && fetchToken() != jwt) {
                        writeToken(jwt);
                    }
                }
                return response;
            }, function (error) {
                return Promise.reject(error);
            }
        };

        newApi.interceptors.request.use(interceptors.addAuthorizationToRequest);
        newApi.interceptors.response.use((r) => r, interceptors.handleError);
        newApi.interceptors.response.use(interceptors.fetchAuthTokens);

        return newApi;
    }, [navigate, clearToken, fetchToken]);

    return <ApiContext.Provider value={api}>{children}</ApiContext.Provider>;
};
export default ApiProvider;

export const useApi = ():ApiInstance => {
    const context = useContext(ApiContext);
    console.log(context)
    if (context === undefined) {
        throw new Error("ApiContext Provider must consume ApiInstance");
    }
    return context;
};
