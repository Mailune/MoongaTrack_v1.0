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
    margin-bottom: 30px; // Augmenter l'espacement entre les cartes
    box-shadow: 0px 2px 6px rgba(52, 51, 51, 0.5), 0px 0px 12px 4px #7f7d81;
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
