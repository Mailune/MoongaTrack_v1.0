import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import colors from '../utils/colors';

const SignupPage = styled.div`
    background-color: ${colors.background};
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: ${colors.textLight};
`;

const SignupFormContainer = styled.form`
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
    margin-top: 5px;
    width: 100%;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    background-color: ${colors.background};
    color: ${colors.textLight};
`;

const ErrorMessage = styled.p`
    color: ${colors.error || 'red'};
    font-size: 14px;
`;

const PasswordStrength = styled.p`
    color: ${({ strength }) => 
        strength === 'fort' ? 'green' : strength === 'moyen' ? 'orange' : 'red'};
    font-size: 14px;
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

const SignUpForm = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState('');
    const [generalMessage, setGeneralMessage] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const checkUsernameAvailability = async () => {
            if (username) {
                try {
                    const response = await axios.post('http://localhost:5005/api/auth/check-username', { username });
                    setUsernameError(response.data.exists ? 'Nom d’utilisateur déjà pris' : '');
                } catch (error) {
                    console.error("Erreur de vérification du nom d'utilisateur:", error);
                }
            }
        };
        checkUsernameAvailability();
    }, [username]);

    useEffect(() => {
        const checkEmailAvailability = async () => {
            if (email) {
                try {
                    const response = await axios.post('http://localhost:5005/api/auth/check-email', { email });
                    setEmailError(response.data.exists ? 'Email déjà utilisé' : '');
                } catch (error) {
                    console.error("Erreur de vérification de l'email:", error);
                }
            }
        };
        checkEmailAvailability();
    }, [email]);

    const evaluatePasswordStrength = (password) => {
        const strongPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
        const mediumPassword = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{6,}$/;
        
        if (strongPassword.test(password)) {
            setPasswordStrength('fort');
        } else if (mediumPassword.test(password)) {
            setPasswordStrength('moyen');
        } else {
            setPasswordStrength('faible');
        }
    };

    useEffect(() => {
        if (confirmPassword) {
            setPasswordMatchError(password === confirmPassword ? '' : 'Les mots de passe ne correspondent pas');
        }
    }, [confirmPassword, password]);

    const handleSignup = async (e) => {
        e.preventDefault();
        setGeneralMessage('');

        try {
            const response = await axios.post('http://localhost:5005/api/auth/signup', {
                username,
                email,
                password
            }, { withCredentials: true });

            setGeneralMessage(response.data.message);
            setTimeout(() => navigate('/validate'), 1500);
        } catch (error) {
            setGeneralMessage(error.response ? error.response.data.message : 'Erreur lors de l\'inscription');
        }
    };

    return (
        <SignupPage>
            <SignupFormContainer onSubmit={handleSignup}>
                <Title>Créer un compte</Title>
                
                <Input
                    type="text"
                    placeholder="Nom d'utilisateur"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                {usernameError && <ErrorMessage>{usernameError}</ErrorMessage>}

                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <ErrorMessage>{emailError}</ErrorMessage>}

                <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => {
                        setPassword(e.target.value);
                        evaluatePasswordStrength(e.target.value);
                    }}
                />
                {password && (
                    <PasswordStrength strength={passwordStrength}>
                        Force du mot de passe: {passwordStrength}
                    </PasswordStrength>
                )}

                <Input
                    type="password"
                    placeholder="Confirmer le mot de passe"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
                {passwordMatchError && <ErrorMessage>{passwordMatchError}</ErrorMessage>}

                <Button type="submit">S'inscrire</Button>
                {generalMessage && <p>{generalMessage}</p>}
            </SignupFormContainer>
        </SignupPage>
    );
};

export default SignUpForm;
