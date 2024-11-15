import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { Link, Navigate } from 'react-router-dom';
import colors from '../../utils/colors';

const LoginPage = styled.div`
    background-color: ${colors.background};
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    color: ${colors.textLight};
`;

const LoginForm = styled.form`
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

const ErrorMessage = styled.p`
    color: red;
    margin-top: 10px;
`;

const ForgotPasswordLink = styled(Link)`
    display: block;
    margin-top: 15px;
    color: ${colors.primary};
    font-size: 14px;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
    }
`;

/**
 * Login Component.
 * Provides a login form for users to access their accounts.
 *
 * @returns {JSX.Element} The login page component.
 */
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const { isAuthenticated, error } = useSelector((state) => state.auth);

    /**
     * Handles the form submission for user login.
     * @param {React.FormEvent<HTMLFormElement>} e - The form submission event.
     */
    const handleLogin = (e) => {
        e.preventDefault();
        dispatch(login({ email, password }));
    };

    // Redirect to profile if the user is authenticated
    if (isAuthenticated) {
        return <Navigate to="/profile" />;
    }

    return (
        <LoginPage>
            <LoginForm onSubmit={handleLogin}>
                <Title>Connexion</Title>
                <Label>Email</Label>
                <Input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <Label>Mot de passe</Label>
                <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <Button type="submit">Se connecter</Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}

                <ForgotPasswordLink to="/reset-password-request">
                    Mot de passe oublié ?
                </ForgotPasswordLink>
            </LoginForm>
        </LoginPage>
    );
};

export default Login;
