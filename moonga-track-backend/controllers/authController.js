const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const UserModel = require('../models/User');
const { signUpErrors, signInErrors } = require('../utils/errors');
const { sendValidationEmail, sendResetPasswordEmail } = require('../utils/emailService');

/**
 * Generate a JWT token with role and expiration
 * @param {string} id - User ID
 * @param {string} role - User role
 * @param {string} expiresIn - Expiration time (default: '1h')
 * @returns {string} - Signed JWT token
 */
const createToken = (id, role, expiresIn = '1h') => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET, { expiresIn });
};

/**
 * Validate password complexity
 * @param {string} password - Plain text password
 * @returns {boolean} - True if password meets requirements
 */
const validatePassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return regex.test(password);
};

/**
 * Check username availability
 */
const checkUsername = async (req, res) => {
  const { username } = req.body;
  try {
    const userExists = await UserModel.findOne({ username });
    res.json({ exists: !!userExists });
  } catch (error) {
    console.error("Error checking username availability:", error.message);
    res.status(500).json({ message: 'Error checking username availability' });
  }
};

/**
 * Check email availability
 */
const checkEmail = async (req, res) => {
  const { email } = req.body;
  try {
    const emailExists = await UserModel.findOne({ email });
    res.json({ exists: !!emailExists });
  } catch (error) {
    console.error("Error checking email availability:", error.message);
    res.status(500).json({ message: 'Error checking email availability' });
  }
};

/**
 * User registration
 */
const signUp = async (req, res) => {
  const { username, email, password } = req.body;

  if (!validatePassword(password)) {
    return res.status(400).json({
      errors: { password: 'Password must be at least 8 characters, including uppercase, lowercase, number, and special character.' },
    });
  }

  try {
    const existingUsername = await UserModel.findOne({ username });
    if (existingUsername) return res.status(400).json({ errors: { username: 'Username is already taken.' } });

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) return res.status(400).json({ errors: { email: 'Email is already in use.' } });

    const password_hash = await bcrypt.hash(password, 10);
    const validationCode = Math.floor(100000 + Math.random() * 900000).toString();

    const newUser = await UserModel.create({ username, email, password_hash, validationCode, role: 'user', isActive: false });
    sendValidationEmail(email, validationCode);

    res.status(201).json({ message: 'Validation email sent.' });
  } catch (error) {
    console.error("Error in signUp:", error.message);
    res.status(500).json({ errors: { general: 'Server error. Please try again later.' } });
  }
};

/**
 * User login
 */
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ errors: { message: 'Unknown email.' } });

    const passwordMatch = await bcrypt.compare(password, user.password_hash);
    if (!passwordMatch) return res.status(400).json({ errors: { message: 'Incorrect password.' } });

    const token = createToken(user._id, user.role);
    res.cookie('jwt', token, { httpOnly: true, secure: false, sameSite: 'None', maxAge: 3600000 });
    res.status(200).json({ message: 'Login successful', user });
  } catch (error) {
    console.error("Error in signIn:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Verify user registration
 */
const verifyUser = async (req, res) => {
  const { email, validationCode } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(400).json({ message: 'User not found.' });

    if (user.validationCode === validationCode) {
      user.isActive = true;
      user.validationCode = null;
      await user.save();

      const token = createToken(user._id, user.role);
      res.cookie('jwt', token, { httpOnly: true, secure: false, sameSite: 'None', maxAge: 3600000 });
      res.status(200).json({ message: 'Registration successfully validated.', token });
    } else {
      res.status(400).json({ message: 'Invalid validation code.' });
    }
  } catch (error) {
    console.error("Error in verifyUser:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Reset password request
 */
const resetPasswordRequest = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await UserModel.findOne({ email });
    if (!user) return res.status(404).json({ message: 'Email not found.' });

    const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetCode = resetCode;
    user.resetCodeExpiration = Date.now() + 15 * 60 * 1000; // Valid for 15 minutes
    await user.save();

    await sendResetPasswordEmail(email, resetCode);
    res.status(200).json({ message: 'Reset code sent via email.' });
  } catch (error) {
    console.error("Error in resetPasswordRequest:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * Reset user password
 */
const resetPassword = async (req, res) => {
  const { email, resetCode, newPassword } = req.body;

  try {
    const user = await UserModel.findOne({ email, resetCode });
    if (!user) return res.status(404).json({ message: 'Invalid email or reset code.' });

    if (user.resetCodeExpiration < Date.now()) {
      return res.status(400).json({ message: 'Reset code expired. Request a new one.' });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password_hash = hashedPassword;
    user.resetCode = null;
    user.resetCodeExpiration = null;
    await user.save();

    res.status(200).json({ message: 'Password reset successfully.' });
  } catch (error) {
    console.error("Error in resetPassword:", error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * User logout
 */
const logout = (req, res) => {
  res.cookie('jwt', '', { maxAge: 1 });
  res.status(200).json({ message: 'Logout successful.' });
};

module.exports = {
  signUp,
  signIn,
  verifyUser,
  logout,
  resetPasswordRequest,
  resetPassword,
  checkUsername,
  checkEmail,
};
