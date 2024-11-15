/**
 * Handle errors during user signup
 * @param {object} error - Error object from Mongoose or other validation steps
 * @returns {object} - Object containing user-friendly error messages
 */
const signUpErrors = (error) => {
    const errors = { username: '', email: '', password: '' };

    // Handle MongoDB unique constraint errors (code 11000)
    if (error.code === 11000) {
        if (error.keyValue.email) {
            errors.email = 'This email is already in use.';
        }
        if (error.keyValue.username) {
            errors.username = 'This username is already taken.';
        }
    }

    // Handle Mongoose validation errors
    if (error.errors) {
        if (error.errors.username) {
            errors.username = error.errors.username.message;
        }
        if (error.errors.email) {
            errors.email = error.errors.email.message;
        }
        if (error.errors.password) {
            errors.password = 'Password must contain at least 8 characters, including uppercase, lowercase, numbers, and special characters.';
        }
    }

    return errors;
};

/**
 * Handle errors during user signin
 * @param {object} error - Error object from validation or business logic
 * @returns {object} - Object containing user-friendly error messages
 */
const signInErrors = (error) => {
    const errors = { email: '', password: '' };

    if (error.message.includes('Unknown email')) {
        errors.email = 'Unknown email address.';
    }
    if (error.message.includes('Incorrect password')) {
        errors.password = 'Incorrect password.';
    }

    return errors;
};

module.exports = { signUpErrors, signInErrors };