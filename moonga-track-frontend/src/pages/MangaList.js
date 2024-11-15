import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import colors from '../utils/colors';
import { removeManga, updateManga } from '../redux/actions/libraryActions';

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

const MangaCard = styled.div`
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
        transform: translate(10px, 10px);
    }

    h3, p {
        color: #fff;
    }
`;

const StyledImage = styled.img`
    width: 100%;
    height: 180px;
    object-fit: contain;
    cursor: pointer;
    border-radius: 5px;
`;

const SavedCard = styled.div`
    background-color: #444;
    color: #fff;
    padding: 10px;
    border-radius: 8px;
    margin-top: 8px;
    font-size: 12px;
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
 * MangaList Component.
 * Displays a list of saved manga with options to update or delete them.
 *
 * @returns {JSX.Element} The manga list component.
 */
const MangaList = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const savedManga = useSelector((state) => state.library.savedManga);

    const [mangaDetails, setMangaDetails] = useState(
        savedManga.map((manga) => ({
            ...manga,
            status: manga.status || 'À lire',
            volume: manga.volume || '',
            page: manga.page || '',
            comments: manga.comments || '',
        }))
    );

    /**
     * Handles deleting a manga from the list.
     * @param {number} id - The ID of the manga to remove.
     */
    const handleDelete = (id) => {
        dispatch(removeManga(id));
        setMangaDetails(mangaDetails.filter((manga) => manga.id !== id));
    };

    /**
     * Handles saving updates to a manga.
     * @param {number} id - The ID of the manga to update.
     */
    const handleSave = (id) => {
        const updatedManga = mangaDetails.find((manga) => manga.id === id);
        dispatch(updateManga(updatedManga));
    };

    /**
     * Handles input changes for manga details.
     * @param {number} id - The ID of the manga being updated.
     * @param {string} field - The field being updated.
     * @param {string|number} value - The new value for the field.
     */
    const handleChange = (id, field, value) => {
        setMangaDetails(mangaDetails.map((manga) =>
            manga.id === id ? { ...manga, [field]: value } : manga
        ));
    };

    /**
     * Handles navigating to the detailed page for a manga.
     * @param {object} manga - The manga object to view in detail.
     */
    const handleImageClick = (manga) => {
        navigate(`/details/${manga.id}`, { state: { item: manga } });
    };

    if (savedManga.length === 0) {
        return <Container><Title>Pas de manga sauvegardé pour le moment</Title></Container>;
    }

    return (
        <Container>
            <Title>Manga Liste</Title>
            <CardGrid>
                {mangaDetails.map((manga) => (
                    <MangaCard key={manga.id}>
                        <h3>{manga.title.romaji || manga.title}</h3>
                        <StyledImage 
                            src={manga.coverImage?.large || manga.image} 
                            alt={manga.title.romaji || manga.title}
                            onClick={() => handleImageClick(manga)}
                        />
                        <p><strong>Auteur:</strong> {manga.author || 'Inconnu'}</p>
                        <p><strong>Résumé:</strong> {manga.description?.substring(0, 100) || 'Non disponible'}...</p>
                        <div>
                            <label>Status: </label>
                            <SelectField
                                value={manga.status}
                                onChange={(e) => handleChange(manga.id, 'status', e.target.value)}
                            >
                                <option value="À lire">À lire</option>
                                <option value="En cours">En cours</option>
                                <option value="Terminé">Terminé</option>
                            </SelectField>
                        </div>
                        <div>
                            <label>Tome: </label>
                            <InputField
                                type="number"
                                value={manga.volume}
                                onChange={(e) => handleChange(manga.id, 'volume', e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Page: </label>
                            <InputField
                                type="number"
                                value={manga.page}
                                onChange={(e) => handleChange(manga.id, 'page', e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Commentaires: </label>
                            <TextArea
                                value={manga.comments}
                                onChange={(e) => handleChange(manga.id, 'comments', e.target.value)}
                            />
                        </div>
                        <div>
                            <ActionButton onClick={() => handleSave(manga.id)}>Sauvegarder</ActionButton>
                            <ActionButton delete onClick={() => handleDelete(manga.id)}>Supprimer</ActionButton>
                        </div>
                    </MangaCard>
                ))}
            </CardGrid>
        </Container>
    );
};

export default MangaList;
