import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { FaHeart, FaBookmark } from 'react-icons/fa';
import { saveAnime, saveManga, removeAnime, removeManga, addFavorite, removeFavorite } from '../redux/actions/libraryActions';

const SearchResultsContainer = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #121212;
    min-height: 100vh;
`;

const FilterBar = styled.div`
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
    justify-content: center;

    select, input {
        padding: 10px;
        font-size: 16px;
        border-radius: 5px;
        border: 1px solid #8A2BE2;
    }
`;

const ResultsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 15px;
    width: 100%;
    max-width: 1200px;
`;

const ResultCard = styled.div`
    background-color: #333;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.5);
    text-align: center;
    cursor: pointer;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }

    img {
        width: 100%;
        height: auto;
        border-radius: 5px;
        margin-bottom: 8px;
    }

    h3 {
        font-size: 14px;
        color: #fff;
        margin-bottom: 5px;
    }

    p {
        font-size: 12px;
        color: #aaa;
        margin-bottom: 5px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
`;

const TypeLabel = styled.div`
    font-size: 12px;
    color: #8A2BE2;
    font-weight: bold;
    margin-bottom: 5px;
`;

const IconContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
`;

const StyledIcon = styled.div`
    svg {
        cursor: pointer;
        color: ${(props) => (props.active ? '#8A2BE2' : '#fff')};
        font-size: 16px;

        &:hover {
            color: #8A2BE2;
        }
    }
`;

const SearchResults = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const query = new URLSearchParams(location.search).get('query');

    const savedAnime = useSelector((state) => state.library.savedAnime);
    const savedManga = useSelector((state) => state.library.savedManga);
    const favorites = useSelector((state) => state.library.favorites);

    const [initialResults, setInitialResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [filters, setFilters] = useState({ genre: '', year: '', type: '' });

    const genres = [
        'Action', 'Adventure', 'Comedy', 'Drama', 'Fantasy', 'Horror', 'Mystery', 
        'Psychological', 'Romance', 'Sci-Fi', 'Slice of Life', 'Sports', 'Supernatural', 'Thriller'
    ];

    const fetchResults = useCallback(async () => {
        try {
            const response = await axios.post('https://graphql.anilist.co', {
                query: `
                query ($search: String) {
                    Page {
                        media(search: $search) {
                            id
                            title {
                                romaji
                            }
                            coverImage {
                                large
                            }
                            description
                            genres
                            type
                        }
                    }
                }`,
                variables: { search: query }
            });
            const media = response.data.data.Page.media;
            const filteredMedia = media.filter((item) => !item.genres.includes('Hentai'));
            setInitialResults(filteredMedia);
            setFilteredResults(filteredMedia);
        } catch (error) {
            console.error('Erreur lors de la récupération des résultats de recherche:', error);
        }
    }, [query]);

    const applyFilters = useCallback(() => {
        let results = initialResults;
        if (filters.genre) {
            results = results.filter((item) => item.genres.includes(filters.genre));
        }
        if (filters.year) {
            results = results.filter((item) => item.seasonYear === parseInt(filters.year));
        }
        if (filters.type) {
            results = results.filter((item) => item.type === filters.type.toUpperCase());
        }
        setFilteredResults(results);
    }, [filters, initialResults]);

    useEffect(() => {
        fetchResults();
    }, [fetchResults]);

    useEffect(() => {
        applyFilters();
    }, [applyFilters]);

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters((prevFilters) => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    const handleCardClick = (item) => {
        navigate(`/details/${item.id}`, { state: { item } });
    };

    const handleSave = (item) => {
        if (item.type === 'ANIME') {
            if (savedAnime.some((anime) => anime.id === item.id)) {
                dispatch(removeAnime(item.id));
            } else {
                dispatch(saveAnime(item));
            }
        } else if (item.type === 'MANGA') {
            if (savedManga.some((manga) => manga.id === item.id)) {
                dispatch(removeManga(item.id));
            } else {
                dispatch(saveManga(item));
            }
        }
    };

    const handleFavorite = (item) => {
        if (favorites.some((fav) => fav.id === item.id)) {
            dispatch(removeFavorite(item.id));
        } else {
            dispatch(addFavorite(item));
        }
    };

    const isItemSaved = (item) => (
        item.type === 'ANIME'
            ? savedAnime.some((anime) => anime.id === item.id)
            : savedManga.some((manga) => manga.id === item.id)
    );

    const isItemFavorited = (item) => favorites.some((fav) => fav.id === item.id);

    return (
        <SearchResultsContainer>
            <h1>Résultats de recherche pour: "{query}"</h1>

            <FilterBar>
                <select name="genre" value={filters.genre} onChange={handleFilterChange}>
                    <option value="">Genre</option>
                    {genres.map((genre) => (
                        <option key={genre} value={genre}>{genre}</option>
                    ))}
                </select>
                <input 
                    type="number"
                    name="year"
                    placeholder="Année"
                    value={filters.year}
                    onChange={handleFilterChange}
                />
                <select name="type" value={filters.type} onChange={handleFilterChange}>
                    <option value="">Tous</option>
                    <option value="ANIME">Animé</option>
                    <option value="MANGA">Manga</option>
                </select>
            </FilterBar>

            <ResultsGrid>
                {filteredResults.length > 0 ? (
                    filteredResults.map((item) => (
                        <ResultCard key={item.id} onClick={() => handleCardClick(item)}>
                            <TypeLabel>{item.type === 'ANIME' ? 'Animé' : 'Manga'}</TypeLabel>
                            <img src={item.coverImage.large} alt={item.title.romaji} />
                            <h3>{item.title.romaji}</h3>
                            <p>{item.genres.join(', ')}</p>
                            
                            <IconContainer>
                                <StyledIcon active={isItemSaved(item)}>
                                    <FaBookmark onClick={(e) => { e.stopPropagation(); handleSave(item); }} title="Enregistrer" />
                                </StyledIcon>
                                <StyledIcon active={isItemFavorited(item)}>
                                    <FaHeart onClick={(e) => { e.stopPropagation(); handleFavorite(item); }} title="Favoris" />
                                </StyledIcon>
                            </IconContainer>
                        </ResultCard>
                    ))
                ) : (
                    <p>Aucun résultat trouvé</p>
                )}
            </ResultsGrid>
        </SearchResultsContainer>
    );
};

export default SearchResults;
