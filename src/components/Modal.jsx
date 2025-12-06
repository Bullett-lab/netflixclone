import React from "react";
import "./Modal.css";

export default function Modal({
  movie,
  onClose,
  onPlay,
  onAdd,
  onRemove,
  isInList = false,
  showActions = true
}) {
  if (!movie) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <img
            src={movie.poster}
            alt={movie.title}
            className="modal-poster"
            onError={(e) => {
              e.target.src = "/fallback.jpg";
            }}
          />
          <div className="modal-info">
            <h2>{movie.title}</h2>
            <p>{movie.description || "No description available."}</p>
            <p><strong>Year:</strong> {movie.year || "N/A"}</p>
          </div>
        </div>

        <div className="modal-actions">
          {movie.trailerUrl && (
            <button className="btn play" onClick={() => onPlay(movie)}>
              ▶ Play Trailer
            </button>
          )}

         
          {showActions && (
            <div className="modal-actions-row">
              {!isInList && onAdd && (
                <button className="btn add" onClick={() => onAdd(movie)}>
                  Add to My List
                </button>
              )}

              {isInList && onRemove && (
                <button className="btn remove" onClick={() => onRemove(movie.id)}>
                  Remove from My List
                </button>
              )}

              <button className="btn close" onClick={onClose}>
                ✖ 
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
