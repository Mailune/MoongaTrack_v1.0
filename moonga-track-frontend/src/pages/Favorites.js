import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import colors from '../utils/colors';
import { removeFavorite } from '../redux/actions/libraryActions';

const Container = styled.div`
    padding: 20px;
    color: ${colors.textLight || '#ffffff'};
    background-color: ${colors.background || '#1e1d1d'};
    min-height: 100vh;
`;

const Title = styled.h2`
    color: ${colors.primary || '#8A2BE2'};
    margin-bottom: 40px; // Augmenter l'espacement entre le titre et les cartes
`;

const FavoriteCard = styled.div`
    background-color: ${colors.borderGray || '#333'};
    border-radius: 8px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 30px; /* Espacement entre les cartes */
    position: relative;
    color: #fff;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5); /* Box-shadow similaire à ProfileCard */
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.02); /* Zoom au survol */
    }

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
        transform: translate(10px, 10px); /* Déplacement légèrement réduit pour le relief */
    }
`;


const FavoriteInfo = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
    flex: 1;

    img {
        height: 100px;
        border-radius: 5px;
    }

    div {
        display: flex;
        flex-direction: column;
    }
`;

const RemoveButton = styled.button`
    background-color: #ee3051;
    color: #fff;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
    transition: background 0.3s;

    &:hover {
        background-color: #f3052e;
    }
`;

const Favorites = () => {
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.library.favorites);

    const handleRemoveFavorite = (id) => {
        dispatch(removeFavorite(id));
    };

    if (favorites.length === 0) {
        return <Container><Title>Aucun favori pour le moment</Title></Container>;
    }

    return (
        <Container>
            <Title>Favoris</Title>
            {favorites.map((item) => (
                <FavoriteCard key={item.id}>
                    <FavoriteInfo>
                        <img src={item.image || item.coverImage.large} alt={item.title.romaji} />
                        <div>
                            <h3>{item.title.romaji}</h3>
                            <p>{item.description ? item.description.slice(0, 100) + '...' : 'Pas de description disponible'}</p>
                        </div>
                    </FavoriteInfo>
                    <RemoveButton onClick={() => handleRemoveFavorite(item.id)}>Supprimer</RemoveButton>
                </FavoriteCard>
            ))}
        </Container>
    );
};

export default Favorites;
