import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import colors from '../utils/colors';

const Container = styled.div`
    padding: 20px;
    color: ${colors.textLight || '#ffffff'};
    background-color: #1e1d1d;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Title = styled.h2`
    color: ${colors.primary || '#8A2BE2'};
    margin-bottom: 40px; // Augmente l'espacement sous le titre principal
    text-align: center;
`;

const SectionTitle = styled.h3`
    color: ${colors.primary || '#8A2BE2'};
    margin-bottom: 30px; // Ajoute de l'espace entre le titre de section et les cartes
    text-align: center;
`;

const SuggestionsGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;
    max-width: 800px; // Limite la largeur de la grille pour centrer les cartes
    width: 100%; // S'adapte à la largeur de l'écran
    justify-content: center;
`;

const SuggestionCard = styled.div`
    background-color: ${colors.cardBackground || '#333'};
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    cursor: pointer;

    img {
        width: 100%;
        height: auto;
        border-radius: 5px;
        margin-bottom: 10px;
    }

    h3 {
        font-size: 16px;
        color: #fff;
        margin-bottom: 10px;
    }

    p {
        font-size: 14px;
        color: #aaa;
        margin-bottom: 5px;
    }
`;

const Suggestions = () => {
    const savedAnime = useSelector((state) => state.library.savedAnime);
    const savedManga = useSelector((state) => state.library.savedManga);

    const [animeSuggestions, setAnimeSuggestions] = useState([]);
    const [mangaSuggestions, setMangaSuggestions] = useState([]);

    const getPopularGenres = (savedItems) => {
        const genreCounts = {};
        savedItems.forEach((item) => {
            item.genres.forEach((genre) => {
                genreCounts[genre] = (genreCounts[genre] || 0) + 1;
            });
        });
        return Object.keys(genreCounts).sort((a, b) => genreCounts[b] - genreCounts[a]).slice(0, 3);
    };

    const fetchSuggestions = async (genres, type) => {
        try {
            const response = await axios.post('https://graphql.anilist.co', {
                query: `
                    query ($genre_in: [String], $type: MediaType, $page: Int, $perPage: Int) {
                        Page(page: $page, perPage: $perPage) {
                            media(genre_in: $genre_in, type: $type, sort: POPULARITY_DESC) {
                                id
                                title {
                                    romaji
                                }
                                coverImage {
                                    large
                                }
                                genres
                                description
                            }
                        }
                    }
                `,
                variables: {
                    genre_in: genres,
                    type: type,
                    page: 1,
                    perPage: 3
                },
            });
            return response.data.data.Page.media;
        } catch (error) {
            console.error('Erreur lors de la récupération des suggestions:', error);
            return [];
        }
    };

    useEffect(() => {
        const fetchRecommendations = async () => {
            if (savedAnime.length > 0) {
                const popularAnimeGenres = getPopularGenres(savedAnime);
                const animeRecs = await fetchSuggestions(popularAnimeGenres, 'ANIME');
                setAnimeSuggestions(animeRecs);
            }

            if (savedManga.length > 0) {
                const popularMangaGenres = getPopularGenres(savedManga);
                const mangaRecs = await fetchSuggestions(popularMangaGenres, 'MANGA');
                setMangaSuggestions(mangaRecs);
            }
        };

        fetchRecommendations();
    }, [savedAnime, savedManga]);

    return (
        <Container>
            <Title>Suggestions pour vous</Title>

            <SectionTitle>Animés recommandés</SectionTitle>
            <SuggestionsGrid>
                {animeSuggestions.length > 0 ? animeSuggestions.map((anime) => (
                    <SuggestionCard key={anime.id}>
                        <img src={anime.coverImage.large} alt={anime.title.romaji} />
                        <h3>{anime.title.romaji}</h3>
                        <p>{anime.genres.join(', ')}</p>
                        <p>{anime.description ? anime.description.slice(0, 100) + '...' : 'Pas de description'}</p>
                    </SuggestionCard>
                )) : <p>Aucune recommandation d'animé disponible</p>}
            </SuggestionsGrid>

            <SectionTitle>Mangas recommandés</SectionTitle>
            <SuggestionsGrid>
                {mangaSuggestions.length > 0 ? mangaSuggestions.map((manga) => (
                    <SuggestionCard key={manga.id}>
                        <img src={manga.coverImage.large} alt={manga.title.romaji} />
                        <h3>{manga.title.romaji}</h3>
                        <p>{manga.genres.join(', ')}</p>
                        <p>{manga.description ? manga.description.slice(0, 100) + '...' : 'Pas de description'}</p>
                    </SuggestionCard>
                )) : <p>Aucune recommandation de manga disponible</p>}
            </SuggestionsGrid>
        </Container>
    );
};

export default Suggestions;
