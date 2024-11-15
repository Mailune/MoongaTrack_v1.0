import React, { useState } from 'react';

/**
 * MangaItem Component.
 * Represents a single manga item with editable status, volume, page, and comments.
 *
 * @param {Object} props - Component properties.
 * @param {Object} props.manga - The manga data object.
 * @returns {JSX.Element} The manga item component.
 */
const MangaItem = ({ manga }) => {
    const [status, setStatus] = useState(manga.status || 'A lire');
    const [volume, setVolume] = useState(manga.currentVolume || 1);
    const [page, setPage] = useState(manga.currentPage || 1);
    const [comments, setComments] = useState(manga.comments || '');

    /**
     * Handles changes in the status dropdown.
     * @param {React.ChangeEvent<HTMLSelectElement>} e - The event triggered by changing the dropdown.
     */
    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        // Optionally, send the update to the backend
    };

    /**
     * Handles changes in the volume input field.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by updating the volume number.
     */
    const handleVolumeChange = (e) => {
        const newVolume = parseInt(e.target.value, 10);
        if (!isNaN(newVolume) && newVolume > 0) {
            setVolume(newVolume);
        }
    };

    /**
     * Handles changes in the page input field.
     * @param {React.ChangeEvent<HTMLInputElement>} e - The event triggered by updating the page number.
     */
    const handlePageChange = (e) => {
        const newPage = parseInt(e.target.value, 10);
        if (!isNaN(newPage) && newPage > 0) {
            setPage(newPage);
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
            <h3>{manga.title}</h3>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Statut :
                    <select value={status} onChange={handleStatusChange} style={{ marginLeft: '10px' }}>
                        <option value="A lire">A lire</option>
                        <option value="En cours">En cours</option>
                        <option value="Terminé">Terminé</option>
                    </select>
                </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Tome :
                    <input
                        type="number"
                        value={volume}
                        onChange={handleVolumeChange}
                        min="1"
                        style={{ marginLeft: '10px', width: '60px' }}
                    />
                </label>
            </div>
            <div style={{ marginBottom: '10px' }}>
                <label>
                    Page :
                    <input
                        type="number"
                        value={page}
                        onChange={handlePageChange}
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

export default MangaItem;