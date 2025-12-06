import React from "react";
import "./MovieCard.css"; 

export default function MyListModal({ movie, onClose, onPlay, onRemove }) {
  if (!movie) return null;

  const handleRemove = () => {
    onRemove(movie.id);
    onClose();          
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div
          className="modal-cover"
          style={{
            backgroundImage: `url(${movie.backdrop})`,
            height: "300px",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <div className="modal-body">
          <h2>{movie.title}</h2>
          <p style={{ color: "var(--muted)" }}>{movie.description}</p>
          <p><strong>Year:</strong> {movie.year}</p>

          <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
            <button className="btn" onClick={() => onPlay(movie)}>
              <i className="fas fa-play" /> Play Trailer
            </button>
            <button className="btn remove" onClick={handleRemove}>
              <i className="fas fa-minus" /> Remove from My List
            </button>
            <button className="btn secondary" onClick={onClose}>
              <i className="fas fa-times" /> Close
            </button>
          </div>3
        </div>
      </div>
    </div>
  );
}
