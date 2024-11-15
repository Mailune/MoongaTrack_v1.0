import React, { useState } from 'react';
import { validateAccount } from '../../api/auth';

/**
 * Validate Component.
 * Allows users to validate their account using an email and a validation code.
 *
 * @returns {JSX.Element} The account validation form.
 */
const Validate = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    const handleValidation = async (e) => {
        e.preventDefault();
        setMessage('');

        try {
            await validateAccount(email, code);
            setMessage('Compte validé avec succès.');
        } catch (error) {
            setMessage('Erreur lors de la validation du compte.');
        }
    };

    return (
        <form onSubmit={handleValidation} style={{ textAlign: 'center', marginTop: '50px' }}>
            <h2>Validation du compte</h2>
            <input
                type="email"
                placeholder="Entrez votre email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                    padding: '10px',
                    margin: '10px 0',
                    width: '300px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <input
                type="text"
                placeholder="Code de validation"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
                style={{
                    padding: '10px',
                    margin: '10px 0',
                    width: '300px',
                    borderRadius: '5px',
                    border: '1px solid #ccc',
                }}
            />
            <button
                type="submit"
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007BFF',
                    color: 'white',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}
            >
                Valider
            </button>
            {message && <p style={{ marginTop: '20px', color: message.includes('succès') ? 'green' : 'red' }}>{message}</p>}
        </form>
    );
};

export default Validate;