import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import colors from '../../utils/colors';
import { useNavigate } from 'react-router-dom';

const VerificationPage = styled.div`
    background-color: ${colors.background};
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: ${colors.textLight};
`;

const VerificationForm = styled.form`
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

const Label = styled.label`
    display: block;
    margin-top: 15px;
    color: ${colors.textMuted};
    font-weight: bold;
`;

const Input = styled.input`
    padding: 12px;
    margin-top: 5px;
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

const Message = styled.p`
    color: ${props => props.error ? 'red' : 'green'};
    margin-top: 10px;
`;

/**
 * AccountVerification Component.
 * Allows users to verify their account by submitting a validation code.
 *
 * @returns {JSX.Element} The account verification form.
 */
const AccountVerification = () => {
    const [email, setEmail] = useState('');
    const [validationCode, setValidationCode] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const navigate = useNavigate();

    /**
     * Handles the account verification form submission.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleVerification = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:5005/api/auth/verify',
                { email, validationCode },
                { withCredentials: true }
            );

            if (response.data.message) {
                setSuccessMessage("Votre compte a été vérifié avec succès !");
                setErrorMessage('');
                setTimeout(() => {
                    navigate('/login');
                }, 2000);
            } else {
                setErrorMessage("Code de validation incorrect. Veuillez vérifier.");
                setSuccessMessage('');
            }
        } catch (error) {
            setErrorMessage("Une erreur est survenue, veuillez réessayer.");
            setSuccessMessage('');
        }
    };

    return (
        <VerificationPage>
            <VerificationForm onSubmit={handleVerification}>
                <Title>Vérification de votre compte</Title>
                <Label htmlFor="email">Email</Label>
                <Input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Label htmlFor="validationCode">Code de validation</Label>
                <Input
                    type="text"
                    id="validationCode"
                    value={validationCode}
                    onChange={(e) => setValidationCode(e.target.value)}
                    required
                />

                <Button type="submit">Valider mon compte</Button>

                {errorMessage && <Message error>{errorMessage}</Message>}
                {successMessage && <Message>{successMessage}</Message>}
            </VerificationForm>
        </VerificationPage>
    );
};

export default AccountVerification;