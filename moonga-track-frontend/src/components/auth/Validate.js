import React, { useState } from 'react';
import { validateAccount } from '../../api/auth';

const Validate = () => {
    const [email, setEmail] = useState('');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');

    const handleValidation = async (e) => {
        e.preventDefault();
        try {
            await validateAccount(email, code);
            setMessage('Compte validé avec succès.');
        } catch (error) {
            setMessage('Erreur lors de la validation du compte.');
        }
    };

    return (
        <form onSubmit={handleValidation}>
            <input 
                type="email" 
                placeholder="Entrez votre email" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
            />
            <input 
                type="text" 
                placeholder="Code de validation" 
                value={code} 
                onChange={(e) => setCode(e.target.value)} 
            />
            <button type="submit">Valider</button>
            {message && <p>{message}</p>}
        </form>
    );
};

export default Validate;
