import React from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { saveAnime, saveManga, removeAnime, removeManga, addFavorite, removeFavorite } from '../redux/actions/libraryActions';

const DetailContainer = styled.div`
    padding: 40px;
    display: flex;
    justify-content: center;
    background-color: #121212;
    min-height: 100vh;
`;

const DetailCard = styled.div`
    display: flex;
    flex-direction: column;
    max-width: 1000px;
    color: #fff;
    background-color: #333;
    padding: 20px;
    border-radius: 15px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5), 0px 0px 20px 8px #8A2BE2;
`;

const HeaderSection = styled.div`
    display: flex;
    gap: 30px;
`;

const LeftColumn = styled.div`
    width: 300px;
    img {
        width: 100%;
        border-radius: 10px;
        box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
    }
`;

const RightColumn = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Title = styled.h2`
    font-size: 28px;
    color: #8A2BE2;
`;

const TypeLabel = styled.div`
    font-size: 16px;
    color: #8A2BE2;
    font-weight: bold;
    margin-top: 5px;
`;

const GenreTags = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 10px;
`;

const GenreTag = styled.span`
    background-color: #444;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    color: #fff;
`;

const StatsSection = styled.div`
    display: flex;
    gap: 20px;
    font-size: 14px;
    color: #aaa;
`;

const Description = styled.p`
    font-size: 16px;
    color: #ddd;
    line-height: 1.5;
    margin-top: 10px;
`;

const IconContainer = styled.div`
    display: flex;
    gap: 20px;
    margin-top: 20px;
`;

const StyledIcon = styled.div`
    svg {
        cursor: pointer;
        font-size: 24px;
        color: ${(props) => (props.active ? '#8A2BE2' : '#fff')};
        transition: color 0.3s;

        &:hover {
            color: #8A2BE2;
        }
    }
`;

const DetailPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const item = location.state?.item;

    const savedAnime = useSelector((state) => state.library.savedAnime);
    const savedManga = useSelector((state) => state.library.savedManga);
    const favorites = useSelector((state) => state.library.favorites);

    const isSaved = item.type === 'ANIME'
        ? savedAnime.some((anime) => anime.id === item.id)
        : savedManga.some((manga) => manga.id === item.id);

    const isFavorited = favorites.some((fav) => fav.id === item.id);

    const handleSave = () => {
        if (isSaved) {
            item.type === 'ANIME' ? dispatch(removeAnime(item.id)) : dispatch(removeManga(item.id));
        } else {
            item.type === 'ANIME' ? dispatch(saveAnime(item)) : dispatch(saveManga(item));
        }
    };

    const handleFavorite = () => {
        if (isFavorited) {
            dispatch(removeFavorite(item.id));
        } else {
            dispatch(addFavorite(item));
        }
    };

    return (
        <DetailContainer>
            <DetailCard>
                <HeaderSection>
                    <LeftColumn>
                        <img src={item.coverImage.large} alt={item.title.romaji} />
                        <IconContainer>
                            <StyledIcon active={isSaved}>
                                <FaBookmark onClick={handleSave} title="Enregistrer dans ma liste" />
                            </StyledIcon>
                            <StyledIcon active={isFavorited}>
                                <FaHeart onClick={handleFavorite} title="Ajouter aux favoris" />
                            </StyledIcon>
                        </IconContainer>
                    </LeftColumn>

                    <RightColumn>
                        <Title>{item.title.romaji}</Title>
                        <TypeLabel>{item.type === 'ANIME' ? 'Animé' : 'Manga'}</TypeLabel>
                        <GenreTags>
                            {item.genres.map((genre, index) => (
                                <GenreTag key={index}>{genre}</GenreTag>
                            ))}
                        </GenreTags>

                        <StatsSection>
                            <div>Score : {item.averageScore || 'N/A'}</div>
                            <div>Popularité : {item.popularity || 'N/A'}</div>
                            <div>Saison : {item.season || 'N/A'}</div>
                            <div>Format : {item.format || 'N/A'}</div>
                        </StatsSection>
                        <Description>{item.description || "Description non disponible."}</Description>
                    </RightColumn>
                </HeaderSection>
            </DetailCard>
        </DetailContainer>
    );
};

export default DetailPage;
