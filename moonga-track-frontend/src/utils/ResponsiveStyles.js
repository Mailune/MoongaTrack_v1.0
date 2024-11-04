import { css } from 'styled-components';

// Breakpoints for different screen sizes
const breakpoints = {
    mobile: '480px',
    tablet: '768px',
    desktop: '1024px',
};

// Responsive styles for titles
export const responsiveTitle = css`
    font-size: 2rem;
    margin-bottom: 1rem;

    @media (max-width: ${breakpoints.tablet}) {
        font-size: 1.8rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
        font-size: 1.5rem;
        text-align: center;
    }
`;

// Responsive styles for subtitles
export const responsiveSubtitle = css`
    font-size: 1.5rem;
    margin-bottom: 1rem;

    @media (max-width: ${breakpoints.tablet}) {
        font-size: 1.3rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
        font-size: 1.1rem;
        text-align: center;
    }
`;

// Responsive container padding and layout
export const responsiveContainer = css`
    padding: 40px;

    @media (max-width: ${breakpoints.tablet}) {
        padding: 30px;
    }

    @media (max-width: ${breakpoints.mobile}) {
        padding: 20px;
    }
`;

// Responsive grid layout for cards and other grid items
export const responsiveGrid = css`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 20px;

    @media (max-width: ${breakpoints.tablet}) {
        grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    }

    @media (max-width: ${breakpoints.mobile}) {
        grid-template-columns: 1fr;
    }
`;

// Responsive card styles
export const responsiveCard = css`
    padding: 20px;
    border-radius: 8px;

    img {
        width: 100%;
        height: auto;
        border-radius: 5px;
    }

    h3 {
        font-size: 1.2rem;
        margin-bottom: 0.5rem;
    }

    p {
        font-size: 0.9rem;
    }

    @media (max-width: ${breakpoints.tablet}) {
        padding: 15px;

        h3 {
            font-size: 1rem;
        }

        p {
            font-size: 0.85rem;
        }
    }

    @media (max-width: ${breakpoints.mobile}) {
        padding: 10px;

        h3 {
            font-size: 0.9rem;
        }

        p {
            font-size: 0.8rem;
        }
    }
`;

// Responsive button styles
export const responsiveButton = css`
    padding: 12px 20px;
    font-size: 1rem;

    @media (max-width: ${breakpoints.tablet}) {
        padding: 10px 18px;
        font-size: 0.9rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
        padding: 8px 16px;
        font-size: 0.85rem;
    }
`;

// Responsive text input and form field styles
export const responsiveInput = css`
    width: 100%;
    padding: 12px;
    font-size: 1rem;

    @media (max-width: ${breakpoints.tablet}) {
        padding: 10px;
        font-size: 0.9rem;
    }

    @media (max-width: ${breakpoints.mobile}) {
        padding: 8px;
        font-size: 0.85rem;
    }
`;

// Responsive for specific page sections if needed
export const responsiveSectionSpacing = css`
    margin-top: 40px;

    @media (max-width: ${breakpoints.tablet}) {
        margin-top: 30px;
    }

    @media (max-width: ${breakpoints.mobile}) {
        margin-top: 20px;
    }
`;

// Export all responsive styles as an object for easier import if needed
export default {
    responsiveTitle,
    responsiveSubtitle,
    responsiveContainer,
    responsiveGrid,
    responsiveCard,
    responsiveButton,
    responsiveInput,
    responsiveSectionSpacing,
};
