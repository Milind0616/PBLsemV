import React from 'react';
import './GenreSelector.css';

const GenreSelector = () => {
  const genres = [
    'Any genre', 'Romance', 'Action', 'Mystery', 'Fantasy', 'Sci-fi', 'Biography',
    'Young Adult', 'Crime', 'Horror', 'Children’s Books', 'Thriller', 'Non-fiction',
    'Humor', 'Historical Fiction'
  ];

  return (
    <div className="genre-selector">
      <h2>Browse by genre:</h2>
      <div className="genre-grid">
        {genres.map((genre, index) => (
          <button key={index} className="genre-button">
            {genre}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GenreSelector;
