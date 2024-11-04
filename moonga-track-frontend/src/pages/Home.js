import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { keyframes } from 'styled-components';
import colors from '../utils/colors';

const HomePage = styled.div`
    background-color: ${colors.background};
    min-height: 100vh;
    color: ${colors.textLight};
    font-family: 'Roboto', sans-serif;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const MainContent = styled.main`
    padding: 60px 20px;
    text-align: center;
    width: 90%;
    max-width: 1200px;
`;

const Title = styled.h2`
    font-size: 42px;
    margin-bottom: 15px;
    color: ${colors.primary};
    font-weight: bold;
    animation: fadeIn 1s ease-in-out;
`;

const Subtitle = styled.p`
    font-size: 20px;
    margin-bottom: 40px;
    color: ${colors.textMuted};
`;

const FeaturedSeries = styled.section`
    margin-top: 50px;
    padding: 20px;
    border-radius: 8px;
    background-color: ${colors.borderGray}; // Légère couleur de fond pour contraster avec le fond principal

    h2 {
        font-size: 30px;
        color: ${colors.primary};
        margin-bottom: 30px;
    }
`;

const fadeIn = keyframes`
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
`;

const SeriesList = styled.div`
    display: flex;
    gap: 20px;
    overflow-x: auto;
    padding-bottom: 20px;

    &::-webkit-scrollbar {
        height: 8px;
    }

    &::-webkit-scrollbar-thumb {
        background-color: ${colors.primary};
        border-radius: 4px;
    }

    &::-webkit-scrollbar-track {
        background-color: ${colors.background};
    }
`;

const SeriesItem = styled.div`
    text-align: center;
    min-width: 150px;
    transition: transform 0.3s ease, box-shadow 0.3s ease;

    &:hover {
        transform: translateY(-8px);
        box-shadow: 0px 6px 15px rgba(0, 0, 0, 0.2);
    }

    img {
        width: 100%;
        border-radius: 12px;
        margin-bottom: 10px;
        box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
        transition: box-shadow 0.3s ease;
    }

    p {
        font-weight: 500;
        color: ${colors.textLight};
        margin-top: 8px;
    }
`;

const Home = () => {
    const [popularSeries, setPopularSeries] = useState([]);

    useEffect(() => {
        const fetchPopularSeries = async () => {
            const query = `
                query {
                    Page(page: 1, perPage: 6) {
                        media(sort: POPULARITY_DESC, type: ANIME) {
                            id
                            title {
                                romaji
                            }
                            coverImage {
                                large
                            }
                        }
                    }
                }
            `;

            try {
                const response = await axios.post('https://graphql.anilist.co', {
                    query: query
                });
                
                const series = response.data.data.Page.media;
                setPopularSeries(series);
            } catch (error) {
                console.error('Erreur lors de la récupération des séries populaires :', error);
            }
        };

        fetchPopularSeries();
    }, []);

    return (
        <HomePage>
            <MainContent>
                <Title>Bienvenue sur MoongaTrack</Title>
                <Subtitle>Découvrez et suivez vos séries préférées de manga et d'anime avec aise !</Subtitle>

                <FeaturedSeries>
                    <h2>Séries populaires</h2>
                    <SeriesList>
                        {popularSeries.map((series) => (
                            <SeriesItem key={series.id}>
                                <img src={series.coverImage.large} alt={series.title.romaji} />
                                <p>{series.title.romaji}</p>
                            </SeriesItem>
                        ))}
                    </SeriesList>
                </FeaturedSeries>
            </MainContent>
        </HomePage>
    );
};

export default Home;
