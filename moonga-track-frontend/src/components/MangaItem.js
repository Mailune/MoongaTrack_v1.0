import React, { useState } from 'react';

const MangaItem = ({ manga }) => {
    const [status, setStatus] = useState(manga.status || 'A lire');
    const [volume, setVolume] = useState(manga.currentVolume || 1);
    const [page, setPage] = useState(manga.currentPage || 1);
    const [comments, setComments] = useState(manga.comments || '');

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        // Envoyer la mise à jour au backend si nécessaire
    };

    return (
        <div>
            <h3>{manga.title}</h3>
            <select value={status} onChange={handleStatusChange}>
                <option value="A lire">A lire</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
            </select>
            <label>
                Tome :
                <input
                    type="number"
                    value={volume}
                    onChange={(e) => setVolume(e.target.value)}
                    min="1"
                />
            </label>
            <label>
                Page :
                <input
                    type="number"
                    value={page}
                    onChange={(e) => setPage(e.target.value)}
                    min="1"
                />
            </label>
            <label>
                Commentaires :
                <textarea
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                />
            </label>
        </div>
    );
};

export default MangaItem;
