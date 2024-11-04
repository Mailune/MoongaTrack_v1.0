import axios from 'axios';

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

const API_URL = process.env.REACT_APP_API_URL;

export const signup = (userData) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_LOADING });
        const response = await axios.post(`${API_URL}/api/auth/signup`, userData, { withCredentials: true });
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data.message });
    } catch (error) {
        dispatch({ 
            type: AUTH_FAILURE, 
            payload: error.response ? error.response.data.errors : 'Erreur de serveur' 
        });
    }
};

export const login = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_LOADING });
        const response = await axios.post(`${API_URL}/api/auth/signin`, credentials, { withCredentials: true });
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
    } catch (error) {
        const errorMessage = error.response?.data?.errors?.message || 'Email ou mot de passe incorrect';
        dispatch({
            type: AUTH_FAILURE,
            payload: errorMessage,
        });
    }
};

export const logout = () => async (dispatch) => {
    try {
        await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
        dispatch({ type: LOGOUT });
    } catch (error) {
        dispatch({ 
            type: AUTH_FAILURE, 
            payload: error.response ? error.response.data.message : 'Erreur de serveur' 
        });
    }
};

export const checkAuth = () => async (dispatch) => {
    try {
        dispatch({ type: AUTH_LOADING });
        const response = await axios.get(`${API_URL}/api/auth/checkAuth`, { withCredentials: true });
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
    } catch (error) {
        dispatch({ type: LOGOUT });
    }
};
