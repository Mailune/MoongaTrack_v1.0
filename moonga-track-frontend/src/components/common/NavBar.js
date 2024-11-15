import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled, { keyframes } from 'styled-components';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import colors from '../../utils/colors';
import { logout } from '../../redux/actions/authActions';

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
    background-color: rgba(126, 89, 252, 0.85);
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
    border-bottom: 6px solid #c49ff1 !important;
    animation: ${sparkle} 1.5s infinite alternate;
    backdrop-filter: blur(10px);
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
        height: 60px;
        width: auto;
        transition: transform 0.3s ease; 
    }

    &:hover img {
        transform: scale(1.1);
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

/**
 * NavBar Component.
 * Displays a navigation bar with links and controls.
 *
 * @returns {JSX.Element} The navigation bar component.
 */
const NavBar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

    /**
     * Handles the logout functionality.
     */
    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    };

    /**
     * Renders the appropriate navigation links based on authentication status and active route.
     * @returns {JSX.Element[]} The navigation links.
     */
    const renderLinks = () => {
        if (isAuthenticated) {
            const baseLinks = (
                <>
                    <Link to="/">Accueil</Link>
                    {location.pathname !== '/profile' && <Link to="/profile">Mon Profil</Link>}
                    {location.pathname === '/profile' && (
                        <button onClick={handleLogout}>Déconnexion</button>
                    )}
                </>
            );

            let extraLinks;
            switch (location.pathname) {
                case '/anime-list':
                    extraLinks = (
                        <>
                            <Link to="/manga-list">Mangaliste</Link>
                            <Link to="/favorites">Favoris</Link>
                            <Link to="/suggestions">Suggestions</Link>
                        </>
                    );
                    break;
                case '/manga-list':
                    extraLinks = (
                        <>
                            <Link to="/anime-list">Animéliste</Link>
                            <Link to="/favorites">Favoris</Link>
                            <Link to="/suggestions">Suggestions</Link>
                        </>
                    );
                    break;
                case '/favorites':
                    extraLinks = (
                        <>
                            <Link to="/anime-list">Animéliste</Link>
                            <Link to="/manga-list">Mangaliste</Link>
                            <Link to="/suggestions">Suggestions</Link>
                        </>
                    );
                    break;
                case '/suggestions':
                    extraLinks = (
                        <>
                            <Link to="/anime-list">Animéliste</Link>
                            <Link to="/manga-list">Mangaliste</Link>
                            <Link to="/favorites">Favoris</Link>
                        </>
                    );
                    break;
                default:
                    extraLinks = null;
            }

            return (
                <>
                    {baseLinks}
                    {extraLinks}
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
