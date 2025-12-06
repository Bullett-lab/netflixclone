import { useState, useEffect } from "react";
import Row from "../components/Row";
import MovieModal from "../components/Modal";

const Movies = ({ movies, query, searchResults = [], onOpen, onPlay }) => {
  const [myList, setMyList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Load My List from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("myList");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) setMyList(parsed);
      } catch (err) {
        console.error("Failed to parse myList", err);
      }
    }
  }, []);

  // Save My List to localStorage
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  // Modal controls
  const handleOpen = (movie) => {
    setSelectedMovie(movie);
    onOpen(movie); // ✅ triggers global modal logic
  };

  const handleClose = () => setSelectedMovie(null);

  // My List controls
  const handleAdd = (movie) => {
    if (!myList.some((m) => m.id === movie.id)) {
      const updated = [...myList, movie];
      setMyList(updated);
      alert(`${movie.title} has been added to My List`);
    }
  };

  const handleRemove = (id) => {
    setMyList((prev) => prev.filter((m) => m.id !== id));
    handleClose();
  };

  // Filter movies
  const localFiltered = movies.filter((m) =>
    query ? m.title.toLowerCase().includes(query.toLowerCase()) : true
  );

  const allMovies = query ? [...localFiltered, ...searchResults] : localFiltered;

  return (
    <div>
      <h1 style={{ padding: "20px" }}>
        {query ? `Search Results for "${query}"` : "Movies"}
      </h1>

      {allMovies.length === 0 ? (
        <p style={{ padding: "20px", color: "var(--muted)" }}>
          No results found for "{query}".
        </p>
      ) : (
        <>
          <Row
            title="All Movies"
            items={allMovies}
            onOpen={handleOpen}
            onPlay={onPlay}         // ✅ triggers trailer modal
            onAdd={handleAdd}
            onRemove={handleRemove}
            isInList={false}
          />

          {selectedMovie && (
            <MovieModal
              movie={selectedMovie}
              onClose={handleClose}
              onPlay={onPlay}       // ✅ triggers trailer modal
              onAdd={handleAdd}
              onRemove={handleRemove}
              isInList={myList.some((m) => m.id === selectedMovie.id)}
            />
          )}
        </>
        
      )}
    </div>
  );
};

export default Movies;
