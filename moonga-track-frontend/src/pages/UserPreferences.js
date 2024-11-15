import React from 'react';
import styled from 'styled-components';
import colors from '../utils/colors';

// Styled components
const PreferencesPage = styled.div`
    background-color: ${colors.background};
    min-height: 100vh;
    color: ${colors.textLight};
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 50px;
`;

const PreferencesContainer = styled.div`
    background-color: ${colors.borderGray};
    padding: 40px;
    border-radius: 10px;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.5);
    width: 400px;
    text-align: center;
`;

const Title = styled.h2`
    color: ${colors.primary};
    font-size: 24px;
    margin-bottom: 20px;
`;

const CheckboxLabel = styled.label`
    display: block;
    color: ${colors.textMuted};
    font-weight: bold;
    margin: 10px 0;
`;

const Checkbox = styled.input`
    margin-right: 10px;
`;

const SaveButton = styled.button`
    padding: 12px 20px;
    color: ${colors.textLight};
    background-color: ${colors.primary};
    border: none;
    border-radius: 5px;
    margin-top: 20px;
    cursor: pointer;
    font-weight: bold;
    transition: background 0.3s;

    &:hover {
        background-color: ${colors.accent};
    }
`;

const UserPreferences = () => {
    const preferences = ["Aventure", "Fantaisie", "Romance"];

    return (
        <PreferencesPage>
            <PreferencesContainer>
                <Title>Mes Préférences</Title>
                {preferences.map((preference) => (
                    <CheckboxLabel key={preference}>
                        <Checkbox type="checkbox" />
                        {preference}
                    </CheckboxLabel>
                ))}
                <SaveButton>Enregistrer</SaveButton>
            </PreferencesContainer>
        </PreferencesPage>
    );
};

export default UserPreferences;
