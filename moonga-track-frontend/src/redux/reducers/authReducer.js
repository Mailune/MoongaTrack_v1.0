import { LOGIN_SUCCESS, LOGOUT, AUTH_LOADING, AUTH_FAILURE, SIGNUP_SUCCESS } from '../actions/authActions';

const initialState = {
    isAuthenticated: false,
    user: null,
    loading: false,
    error: null,
    signupMessage: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_LOADING:
            return { ...state, loading: true, error: null, signupMessage: null };
        case LOGIN_SUCCESS:
            return { 
                ...state, 
                isAuthenticated: true, 
                user: action.payload, 
                loading: false, 
                error: null 
            };
        case SIGNUP_SUCCESS:
            return { 
                ...state, 
                signupMessage: action.payload, 
                loading: false, 
                error: null 
            };
        case AUTH_FAILURE:
            return { 
                ...state, 
                error: action.payload, 
                loading: false, 
                signupMessage: null 
            };
        case LOGOUT:
            return { 
                ...state, 
                isAuthenticated: false, 
                user: null, 
                loading: false, 
                error: null, 
                signupMessage: null 
            };
        default:
            return state;
    }
};

export default authReducer;
