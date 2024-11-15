import React, { useState } from 'react';

/**
 * AnimeItem Component.
 * Represents a single anime item with editable status, episode, and comments.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.anime - The anime data object.
 * @returns {JSX.Element} The anime item component.
 */
const AnimeItem = ({ anime }) => {
    const [status, setStatus] = useState(anime.status || 'A regarder');
    const [episode, setEpisode] = useState(anime.currentEpisode || 1);
    const [comments, setComments] = useState(anime.comments || '');

    /**
     * Handles changes in the status dropdown.
     * @param {React.ChangeEvent<HTMLSelectElement>} e - The event triggered by changing the dropdown.
     */
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        // Optionally, send the update to the backend
    };

    /**
     * Handles changes in the episode input field.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by updating the episode number.
     */
    const handleEpisodeChange = (e) => {
        const newEpisode = parseInt(e.target.value, 10);
        if (!isNaN(newEpisode) && newEpisode > 0) {
            setEpisode(newEpisode);
        }
    };

    /**
     * Handles changes in the comments textarea.
     * @param {React.ChangeEvent<HTMLTextAreaElement>} e - The event triggered by updating the comments.
     */
    const handleCommentsChange = (e) => {
        setComments(e.target.value);
    };

    return (
        <div style={{ border: '1px solid #ccc', padding: '20px', margin: '10px', borderRadius: '5px' }}>
            <h3>{anime.title}</h3>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Statut :
                    <select value={status} onChange={handleStatusChange} style={{ marginLeft: '10px' }}>
                        <option value="A regarder">A regarder</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminé">Terminé</option>
                    </select>
                </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Épisode :
                    <input
                        type="number"
                        value={episode}
                        onChange={handleEpisodeChange}
                        min="1"
                        style={{ marginLeft: '10px', width: '60px' }}
                    />
                </label>
            </div>
            <div>
                <label>
                    Commentaires :
                    <textarea
                        value={comments}
                        onChange={handleCommentsChange}
                        rows="3"
                        style={{ display: 'block', width: '100%', marginTop: '10px', borderRadius: '5px' }}
                    />
                </label>
            </div>
        </div>
    );
};

export default AnimeItem;