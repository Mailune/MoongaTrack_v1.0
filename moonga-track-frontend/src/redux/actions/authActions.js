import axios from 'axios';

// Action types
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGOUT = 'LOGOUT';
export const AUTH_LOADING = 'AUTH_LOADING';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';

// API base URL from environment variable
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Helper function to extract an error message from an error object.
 *
 * @param {object} error - Axios error object.
 * @param {string} defaultMessage - Default error message if no specific error is available.
 * @returns {string} - Extracted error message or default message.
 */
const getErrorMessage = (error, defaultMessage) => {
    return error.response?.data?.errors?.message || defaultMessage || 'Server error';
};

/**
 * Action to handle user signup.
 *
 * @param {object} userData - The data provided by the user for registration.
 * @returns {Function} - A Redux thunk action.
 */
export const signup = (userData) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_LOADING }); // Indicate loading state
        const response = await axios.post(`${API_URL}/api/auth/signup`, userData, { withCredentials: true });
        dispatch({ type: SIGNUP_SUCCESS, payload: response.data.message }); // Dispatch success action with response message
    } catch (error) {
        dispatch({ 
            type: AUTH_FAILURE, 
            payload: getErrorMessage(error, 'An error occurred during signup') 
        });
    }
};

/**
 * Action to handle user login.
 *
 * @param {object} credentials - User login credentials (e.g., email and password).
 * @returns {Function} - A Redux thunk action.
 */
export const login = (credentials) => async (dispatch) => {
    try {
        dispatch({ type: AUTH_LOADING }); // Indicate loading state
        const response = await axios.post(`${API_URL}/api/auth/signin`, credentials, { withCredentials: true });
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.user }); // Dispatch success action with user data
    } catch (error) {
        dispatch({
            type: AUTH_FAILURE,
            payload: getErrorMessage(error, 'Incorrect email or password'),
        });
    }
};

/**
 * Action to handle user logout.
 *
 * @returns {Function} - A Redux thunk action.
 */
export const logout = () => async (dispatch) => {
    try {
        await axios.post(`${API_URL}/api/auth/logout`, {}, { withCredentials: true });
        dispatch({ type: LOGOUT }); // Dispatch logout action
    } catch (error) {
        dispatch({ 
            type: AUTH_FAILURE, 
            payload: getErrorMessage(error, 'Server error during logout') 
        });
    }
};

/**
 * Action to check the authentication status of the user.
 *
 * @returns {Function} - A Redux thunk action.
 */
export const checkAuth = () => async (dispatch) => {
    try {
        dispatch({ type: AUTH_LOADING }); // Indicate loading state
        const response = await axios.get(`${API_URL}/api/auth/checkAuth`, { withCredentials: true });
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.user }); // Dispatch success action with user data
    } catch (error) {
        dispatch({ type: LOGOUT }); // If authentication fails, log out the user
    }
};
