import { 
    LOGIN_SUCCESS, 
    LOGOUT, 
    AUTH_LOADING, 
    AUTH_FAILURE, 
    SIGNUP_SUCCESS 
} from '../actions/authActions';

/**
 * Initial state for the authentication reducer.
 * @property {boolean} isAuthenticated - Tracks if the user is authenticated.
 * @property {object|null} user - Stores the authenticated user's information.
 * @property {boolean} loading - Indicates if an authentication-related request is in progress.
 * @property {string|null} error - Contains the error message if an authentication action fails.
 * @property {string|null} signupMessage - Stores a success message after a successful signup.
 */
const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    signupMessage: null,
};

/**
 * Authentication reducer to handle authentication-related actions.
 *
 * @param {object} state - Current state of the authentication slice.
 * @param {object} action - Action dispatched to the reducer.
 * @returns {object} - Updated state based on the dispatched action.
 */
const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOADING:
            // Triggered when an authentication-related request starts
            return { 
                ...state, 
                loading: true, 
                error: null, 
                signupMessage: null 
            };

        case LOGIN_SUCCESS:
            // Triggered when the user logs in successfully
            return { 
                ...state, 
                isAuthenticated: true, 
                user: action.payload, 
                loading: false, 
                error: null 
            };

        case SIGNUP_SUCCESS:
            // Triggered when the user signs up successfully
            return { 
                ...state, 
                signupMessage: action.payload, 
                loading: false, 
                error: null 
            };

        case AUTH_FAILURE:
            // Triggered when an authentication action fails
            return { 
                ...state, 
                error: action.payload, 
                loading: false, 
                signupMessage: null 
            };

        case LOGOUT:
            // Triggered when the user logs out
            return { 
                ...state, 
                isAuthenticated: false, 
                user: null, 
                loading: false, 
                error: null, 
                signupMessage: null 
            };

        default:
            // Returns the current state if no action matches
            return state;
    }
};

export default authReducer;
