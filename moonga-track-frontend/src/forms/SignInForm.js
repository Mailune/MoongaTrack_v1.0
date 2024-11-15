import React, { useState } from 'react';
import axios from 'axios';

/**
 * SignInForm Component.
 * Handles user login and password reset requests.
 *
 * @returns {JSX.Element} The sign-in and reset password form.
 */
const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);

    /**
     * Handles the sign-in form submission.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleSignIn = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post('/api/auth/signin', { email, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Erreur de connexion.");
        }
    };

    /**
     * Handles the password reset request form submission.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleResetRequest = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            const response = await axios.post('/api/auth/reset-password-request', { email: resetEmail });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Erreur lors de la demande de réinitialisation.");
        }
    };

    return (
        <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
            {!showResetForm ? (
                <form onSubmit={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <button
                        type="submit"
                        style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Connexion
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowResetForm(true)}
                        style={{ background: 'none', border: 'none', color: '#007BFF', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        Mot de passe oublié ?
                    </button>
                    {message && <p style={{ marginTop: '10px', color: 'red' }}>{message}</p>}
                </form>
            ) : (
                <form onSubmit={handleResetRequest} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <input
                        type="email"
                        placeholder="Votre email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                        required
                        style={{ padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
                    />
                    <button
                        type="submit"
                        style={{ padding: '10px 20px', backgroundColor: '#28A745', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}
                    >
                        Envoyer le lien de réinitialisation
                    </button>
                    <button
                        type="button"
                        onClick={() => setShowResetForm(false)}
                        style={{ background: 'none', border: 'none', color: '#007BFF', cursor: 'pointer', textDecoration: 'underline' }}
                    >
                        Retour
                    </button>
                    {message && <p style={{ marginTop: '10px', color: 'green' }}>{message}</p>}
                </form>
            )}
        </div>
    );
};

export default SignInForm;
