import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../utils/colors';
import { removeAnime, updateAnime } from '../redux/actions/libraryActions';

const Container = styled.div`
    padding: 20px;
    background-color: #1a1a1a;
    color: ${colors.textLight || '#ffffff'};
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h2`
    color: ${colors.primary || '#8A2BE2'};
    margin-bottom: 20px;
`;

const CardGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    width: 100%;
    max-width: 1200px;
`;

const AnimeCard = styled.div`
    background-color: ${colors.cardBackground || '#333'};
    border-radius: 8px;
    padding: 15px;
    position: relative;
    text-align: center;
    color: #fff;
    box-shadow: 10px 10px 20px rgba(0, 0, 0, 0.5);
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }
`;

const StyledImage = styled.img`
    width: 100%;
    height: 180px;
    object-fit: contain;
    cursor: pointer;
    border-radius: 5px;
`;

const ActionButton = styled.button`
    padding: 6px 10px;
    font-size: 12px;
    margin-right: 5px;
    border-radius: 5px;
    cursor: pointer;
    background-color: ${(props) => (props.delete ? '#d9534f' : '#5cb85c')};
    color: #fff;
    border: none;
    transition: background 0.3s;

    &:hover {
        opacity: 0.9;
    }
`;

const InputField = styled.input`
    color: black;
`;

const TextArea = styled.textarea`
    color: black;
`;

const SelectField = styled.select`
    color: black;
`;

/**
 * AnimeList Component.
 * Displays a list of saved animes with options to update or delete them.
 *
 * @returns {JSX.Element} The anime list component.
 */
const AnimeList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const savedAnime = useSelector((state) => state.library.savedAnime);

    const [animeDetails, setAnimeDetails] = useState(
        savedAnime.map((anime) => ({
            ...anime,
            status: anime.status || 'À regarder',
            season: anime.season || '',
            episode: anime.episode || '',
            comments: anime.comments || '',
        }))
    );

    const handleDelete = (id) => {
        dispatch(removeAnime(id));
        setAnimeDetails(animeDetails.filter((anime) => anime.id !== id));
    };

    const handleSave = (id) => {
        const updatedAnime = animeDetails.find((anime) => anime.id === id);
        dispatch(updateAnime(updatedAnime));
    };

    const handleChange = (id, field, value) => {
        setAnimeDetails(animeDetails.map((anime) =>
            anime.id === id ? { ...anime, [field]: value } : anime
        ));
    };

    const handleImageClick = (anime) => {
        navigate(`/details/${anime.id}`, { state: { item: anime } });
    };

    if (savedAnime.length === 0) {
        return <Container><Title>Pas d'animé sauvegardé pour le moment</Title></Container>;
    }

    return (
        <Container>
            <Title>Animé Liste</Title>
            <CardGrid>
                {animeDetails.map((anime) => (
                    <AnimeCard key={anime.id}>
                        <h3>{anime.title.romaji || anime.title}</h3>
                        <StyledImage 
                            src={anime.coverImage?.large || anime.image} 
                            alt={anime.title.romaji || anime.title}
                            onClick={() => handleImageClick(anime)}
                        />
                        <div>
                            <label>Status: </label>
                            <SelectField
                                value={anime.status}
                                onChange={(e) => handleChange(anime.id, 'status', e.target.value)}
                            >
                                <option value="À regarder">À regarder</option>
                                <option value="En cours">En cours</option>
                                <option value="Terminé">Terminé</option>
                            </SelectField>
                        </div>
                        <div>
                            <label>Saison: </label>
                            <InputField
                                type="number"
                                value={anime.season}
                                onChange={(e) => handleChange(anime.id, 'season', e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Épisode: </label>
                            <InputField
                                type="number"
                                value={anime.episode}
                                onChange={(e) => handleChange(anime.id, 'episode', e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Commentaires: </label>
                            <TextArea
                                value={anime.comments}
                                onChange={(e) => handleChange(anime.id, 'comments', e.target.value)}
                            />
                        </div>
                        <div>
                            <ActionButton onClick={() => handleSave(anime.id)}>Sauvegarder</ActionButton>
                            <ActionButton delete onClick={() => handleDelete(anime.id)}>Supprimer</ActionButton>
                        </div>
                    </AnimeCard>
                ))}
            </CardGrid>
        </Container>
    );
};

export default AnimeList;