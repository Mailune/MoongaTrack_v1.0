import React, { useState } from 'react';
import axios from 'axios';

const SignInForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [resetEmail, setResetEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showResetForm, setShowResetForm] = useState(false);

    const handleSignIn = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/signin', { email, password });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Erreur de connexion.");
        }
    };

    const handleResetRequest = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/auth/reset-password-request', { email: resetEmail });
            setMessage(response.data.message);
        } catch (error) {
            setMessage("Erreur lors de la demande de réinitialisation.");
        }
    };

    return (
        <div>
            {!showResetForm ? (
                <form onSubmit={handleSignIn}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button type="submit">Connexion</button>
                    <button type="button" onClick={() => setShowResetForm(true)}>
                        Mot de passe oublié ?
                    </button>
                    {message && <p>{message}</p>}
                </form>
            ) : (
                <form onSubmit={handleResetRequest}>
                    <input
                        type="email"
                        placeholder="Votre email"
                        value={resetEmail}
                        onChange={(e) => setResetEmail(e.target.value)}
                    />
                    <button type="submit">Envoyer le lien de réinitialisation</button>
                    <button type="button" onClick={() => setShowResetForm(false)}>
                        Retour
                    </button>
                    {message && <p>{message}</p>}
                </form>
            )}
        </div>
    );
};

export default SignInForm;
