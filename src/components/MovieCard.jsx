import React from "react";
import { useLocation } from "react-router-dom";
import "./MovieCard.css";

export default function MovieCard({
  movie,
  onOpen = () => {},
  onAdd,
  onRemove,
  isInList = false
}) {
  const location = useLocation();
  const isMyListPage = location.pathname === "/mylist";

  return (
    <div className="card" onClick={() => onOpen(movie)}>
      <img
        src={movie.poster}
        alt={movie.title}
        className="card-img"
        onError={(e) => {
          e.target.src = "/fallback.jpg";
        }}
      />

      <div className="card__hover-title">
        <span>{movie.title}</span>
      </div>

      <div className="card__actions">
        {!isInList && onAdd && (
          <button
            className="btn add"
            onClick={(e) => {
              e.stopPropagation();
              onAdd(movie);
            }}
          >
            + Add to My List
          </button>
        )}

        {isInList && onRemove && !isMyListPage && (
          <button
            className="btn remove"
            onClick={(e) => {
              e.stopPropagation();
              onRemove(movie.id);
            }}
          >
            − Remove
          </button>
        )}
      </div>
    </div>
  );
}
