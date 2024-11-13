import React, { useState } from 'react';
import styled from 'styled-components';
import colors from '../utils/colors';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaSearch } from 'react-icons/fa'; // Import de l'icône de recherche

const ProfileContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: ${colors.background || '#121212'};
    color: ${colors.textLight || '#ffffff'};
`;

const ProfileCard = styled.div`
    background-color: ${colors.cardBackground || '#333'};
    padding: 60px;
    border-radius: 15px;
    width: 75%; 
    max-width: 1000px;
    min-height: 600px;
    text-align: center;
    position: relative;
    color: white;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);

    &:after {
        content: '';
        position: absolute;
        top: 5px;
        left: 5px;
        right: 5px;
        bottom: 5px;
        background: rgba(0, 0, 0, 0.2);
        z-index: -1;
        filter: blur(15px);
        transform: translate(15px, 15px);
    }
`;



const LogoContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;

    img {
        height: 150px; 
        width: auto;
    }
`;

const Title = styled.h2`
    font-size: 36px;
    color: ${colors.primary || '#8A2BE2'};
    margin-bottom: 30px;
`;

const UserInfo = styled.div`
    margin-bottom: 40px;
    font-size: 24px;
    color: ${colors.textMuted || '#aaa'};
`;

const NavButtons = styled.div`
    display: flex;
    justify-content: space-around;
    margin-top: 30px;
    gap: 20px;
`;

const NavButton = styled.button`
    padding: 16px 24px;
    font-size: 18px;
    color: #fff;
    background-color: ${colors.primary || '#8A2BE2'};
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s;
    width: 180px;

    &:hover {
        background-color: ${colors.accent || '#6A1B9A'};
    }
`;

const SearchContainer = styled.div`
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
    width: 100%;

    form {
        display: flex;
        align-items: center;
        width: 70%; /* Largeur augmentée */
    }

    input {
        padding: 10px;
        font-size: 18px;
        width: 100%; /* Prend toute la largeur dans le conteneur */
        border-radius: 5px 0 0 5px; /* Coins arrondis à gauche uniquement */
        border: 1px solid ${colors.primary || '#8A2BE2'};
        color: ${colors.textDark || '#000'};
    }

    button {
        padding: 10px;
        background-color: ${colors.primary || '#8A2BE2'};
        border: none;
        border-radius: 0 5px 5px 0; /* Coins arrondis à droite uniquement */
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    button svg {
        color: #fff; /* Couleur de l'icône */
        font-size: 18px; /* Taille de l'icône */
    }
`;

const Profile = () => {
    const navigate = useNavigate();
    const user = useSelector((state) => state.auth.user);

    const [searchQuery, setSearchQuery] = useState('');

    const handleNavigation = (path) => {
        navigate(path);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search-results?query=${searchQuery}`);
        }
    };

    return (
        <ProfileContainer>
            <ProfileCard>
                <LogoContainer>
                    <img src="/avatarprofile.png" alt="Avatar" />
                </LogoContainer>

                <Title>Mon Profil</Title>

                <UserInfo>
                    {user ? `Hello ${user.username} !` : 'Nom d\'utilisateur inconnu'}
                </UserInfo>

                <SearchContainer>
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            placeholder="Rechercher un animé, manga, auteur, style..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                        <button type="submit" onClick={handleSearch}>
                            <FaSearch /> {/* Icône de recherche */}
                        </button>
                    </form>
                </SearchContainer>

                <NavButtons>
                    <NavButton onClick={() => handleNavigation('/anime-list')}>Animé Liste</NavButton>
                    <NavButton onClick={() => handleNavigation('/manga-list')}>Manga Liste</NavButton>
                    <NavButton onClick={() => handleNavigation('/favorites')}>Favoris</NavButton>
                    <NavButton onClick={() => handleNavigation('/suggestions')}>Suggestions</NavButton>
                </NavButtons>
            </ProfileCard>
        </ProfileContainer>
    );
};

export default Profile;
