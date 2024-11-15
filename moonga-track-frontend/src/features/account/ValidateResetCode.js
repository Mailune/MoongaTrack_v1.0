import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../../utils/colors';

// Styled components
const Container = styled.div`
    background-color: ${colors.background};
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: ${colors.textLight};
`;

const Form = styled.form`
    background-color: ${colors.borderGray};
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
    width: 300px;
    text-align: center;
`;

const Title = styled.h2`
    color: ${colors.primary};
    font-size: 24px;
    margin-bottom: 20px;
`;

const Input = styled.input`
    padding: 12px;
    margin-top: 10px;
    width: 100%;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    background-color: ${colors.background};
    color: ${colors.textLight};
`;

const Button = styled.button`
    padding: 12px 20px;
    color: ${colors.textLight};
    background-color: ${colors.primary};
    border: none;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
        background-color: ${colors.accent};
    }
`;

const ErrorMessage = styled.p`
    color: red;
    margin-top: 10px;
`;

const SuccessMessage = styled.p`
    color: green;
    margin-top: 10px;
`;

const ValidateResetCode = () => {
    const [email, setEmail] = useState('');
    const [resetCode, setResetCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');

        if (newPassword !== confirmPassword) {
            return setError('Les mots de passe ne correspondent pas.');
        }

        if (newPassword.length < 8) {
            return setError('Le mot de passe doit comporter au moins 8 caractères.');
        }

        try {
            const response = await axios.post('http://localhost:5005/api/auth/reset-password', {
                email,
                resetCode,
                newPassword
            });
            setMessage(response.data.message);
            setTimeout(() => navigate('/login'), 2000);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Erreur lors de la réinitialisation.');
        }
    };

    return (
        <Container>
            <Form onSubmit={handleSubmit}>
                <Title>Réinitialisation du mot de passe</Title>
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <Input
                    type="text"
                    placeholder="Code de validation"
                    value={resetCode}
                    onChange={(e) => setResetCode(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Nouveau mot de passe"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                <Button type="submit">Réinitialiser le mot de passe</Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
                {message && <SuccessMessage>{message}</SuccessMessage>}
            </Form>
        </Container>
    );
};

export default ValidateResetCode;
