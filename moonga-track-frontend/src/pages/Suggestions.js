import React, { useEffect, useState, useRef } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import styled from 'styled-components';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
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
    margin-bottom: 40px;
    text-align: center;
`;

const SectionTitle = styled.h3`
    color: ${colors.primary || '#8A2BE2'};
    margin-bottom: 30px;
    text-align: center;
`;

const CarouselContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    max-width: 800px;
`;

const SuggestionsCarousel = styled.div`
    display: flex;
    overflow-x: auto;
    gap: 20px;
    scroll-snap-type: x mandatory;
    padding: 20px 0;
    &::-webkit-scrollbar {
        display: none;
    }
`;

const SuggestionCard = styled.div`
    flex: 0 0 250px;
    background-color: ${colors.cardBackground || '#333'};
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    cursor: pointer;
    scroll-snap-align: start;
    transition: transform 0.3s;

    &:hover {
        transform: scale(1.05);
    }

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

const CarouselButton = styled.button`
    background-color: ${colors.primary || '#8A2BE2'};
    border: none;
    color: #fff;
    font-size: 24px;
    cursor: pointer;
    padding: 10px;
    border-radius: 50%;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 1;

    &:hover {
        background-color: ${colors.accent || '#EB1A2A'};
    }
`;

const CarouselButtonLeft = styled(CarouselButton)`
    left: 0;
`;

const CarouselButtonRight = styled(CarouselButton)`
    right: 0;
`;

const Suggestions = () => {
    const savedAnime = useSelector((state) => state.library.savedAnime);
    const savedManga = useSelector((state) => state.library.savedManga);

    const [animeSuggestions, setAnimeSuggestions] = useState([]);
    const [mangaSuggestions, setMangaSuggestions] = useState([]);
    const animeCarouselRef = useRef();
    const mangaCarouselRef = useRef();
    const navigate = useNavigate();

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
                                type
                                averageScore
                                popularity
                                season
                                format
                            }
                        }
                    }
                `,
                variables: {
                    genre_in: genres,
                    type: type,
                    page: 1,
                    perPage: 10
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

    const scrollCarousel = (carouselRef, direction) => {
        carouselRef.current.scrollBy({
            left: direction === 'left' ? -300 : 300,
            behavior: 'smooth'
        });
    };

    const handleCardClick = (item) => {
        navigate(`/details/${item.id}`, { state: { item } }); // Passe `item` dans `state`
    };

    return (
        <Container>
            <Title>Suggestions pour vous</Title>

            <SectionTitle>Animés recommandés</SectionTitle>
            <CarouselContainer>
                <CarouselButtonLeft onClick={() => scrollCarousel(animeCarouselRef, 'left')}>
                    <FaChevronLeft />
                </CarouselButtonLeft>
                <SuggestionsCarousel ref={animeCarouselRef}>
                    {animeSuggestions.length > 0 ? animeSuggestions.map((anime) => (
                        <SuggestionCard key={anime.id} onClick={() => handleCardClick(anime)}>
                            <img src={anime.coverImage.large} alt={anime.title.romaji} />
                            <h3>{anime.title.romaji}</h3>
                            <p>{anime.genres.join(', ')}</p>
                            <p>{anime.description ? anime.description.slice(0, 100) + '...' : 'Pas de description'}</p>
                        </SuggestionCard>
                    )) : <p>Aucune recommandation d'animé disponible</p>}
                </SuggestionsCarousel>
                <CarouselButtonRight onClick={() => scrollCarousel(animeCarouselRef, 'right')}>
                    <FaChevronRight />
                </CarouselButtonRight>
            </CarouselContainer>

            <SectionTitle>Mangas recommandés</SectionTitle>
            <CarouselContainer>
                <CarouselButtonLeft onClick={() => scrollCarousel(mangaCarouselRef, 'left')}>
                    <FaChevronLeft />
                </CarouselButtonLeft>
                <SuggestionsCarousel ref={mangaCarouselRef}>
                    {mangaSuggestions.length > 0 ? mangaSuggestions.map((manga) => (
                        <SuggestionCard key={manga.id} onClick={() => handleCardClick(manga)}>
                            <img src={manga.coverImage.large} alt={manga.title.romaji} />
                            <h3>{manga.title.romaji}</h3>
                            <p>{manga.genres.join(', ')}</p>
                            <p>{manga.description ? manga.description.slice(0, 100) + '...' : 'Pas de description'}</p>
                        </SuggestionCard>
                    )) : <p>Aucune recommandation de manga disponible</p>}
                </SuggestionsCarousel>
                <CarouselButtonRight onClick={() => scrollCarousel(mangaCarouselRef, 'right')}>
                    <FaChevronRight />
                </CarouselButtonRight>
            </CarouselContainer>
        </Container>
    );
};

export default Suggestions;
