import React, { useState } from 'react';

const AnimeItem = ({ anime }) => {
    const [status, setStatus] = useState(anime.status || 'A regarder');
    const [episode, setEpisode] = useState(anime.currentEpisode || 1);
    const [comments, setComments] = useState(anime.comments || '');

    const handleStatusChange = (e) => {
        setStatus(e.target.value);
        // Envoyer la mise à jour au backend si nécessaire
    };

    return (
        <div>
            <h3>{anime.title}</h3>
            <select value={status} onChange={handleStatusChange}>
                <option value="A regarder">A regarder</option>
                <option value="En cours">En cours</option>
                <option value="Terminé">Terminé</option>
            </select>
            <label>
                Épisode :
                <input
                    type="number"
                    value={episode}
                    onChange={(e) => setEpisode(e.target.value)}
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

export default AnimeItem;
