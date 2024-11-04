import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import colors from '../utils/colors';
import { logout } from '../redux/actions/authActions';

const sparkle = keyframes`
    0%, 100% {
        border-color: rgba(235, 26, 42, 0.8);
    }
    50% {
        border-color: rgba(235, 26, 42, 1);
    }
`;

const NavContainer = styled.nav`
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 20px 30px;
    background-color: ${colors.primary};
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-bottom: 4px solid ${colors.accent};
    animation: ${sparkle} 1.5s infinite alternate;
`;

const NavControls = styled.div`
    position: absolute;
    left: 30px;
    display: flex;
    align-items: center;
    gap: 15px;

    svg {
        color: ${colors.textLight};
        font-size: 20px;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
            color: ${colors.accent};
        }
    }
`;

const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 12px;
    color: ${colors.textLight};

    img {
        height: 60px;  // Augmenté pour une meilleure visibilité
        width: auto;
    }

    p {
        font-size: 24px;
        font-weight: bold;
        color: ${colors.textLight};
    }
`;

const NavLinks = styled.div`
    position: absolute;
    right: 30px;
    display: flex;
    gap: 30px;

    a, button {
        color: ${colors.textLight};
        font-weight: bold;
        text-decoration: none;
        animation: ${sparkle} 2s infinite alternate;
        background: none;
        border: none;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
            color: ${colors.accent};
        }
    }
`;

const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    const renderLinks = () => {
        if (isAuthenticated) {
            return (
                <>
                    <Link to="/">Accueil</Link>
                    {location.pathname === '/profile' ? (
                        <button onClick={handleLogout}>Déconnexion</button>
                    ) : (
                        <Link to="/profile">Mon Profil</Link>
                    )}
                </>
            );
        } else {
            return (
                <>
                    <Link to="/">Accueil</Link>
                    <Link to="/login">Connexion</Link>
                    <Link to="/signup">Inscription</Link>
                </>
            );
        }
    };

    return (
        <NavContainer>
            <NavControls>
                <FaArrowLeft onClick={() => navigate(-1)} title="Page précédente" />
                <FaArrowRight onClick={() => navigate(1)} title="Page suivante" />
            </NavControls>

            <LogoContainer>
                <Link to="/">
                    <img src="/avatarprofile.png" alt="Logo MoongaTrack" />
                </Link>
                <p>MoongaTrack</p>
            </LogoContainer>

            <NavLinks>{renderLinks()}</NavLinks>
        </NavContainer>
    );
};

export default NavBar;
