import { useState, useEffect } from "react";
import Row from "../components/Row";
import MovieModal from "../components/Modal";

const TVShows = ({ movies, query, onOpen, onPlay }) => {
  const [myList, setMyList] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);

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

  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  const handleOpen = (movie) => {
    setSelectedMovie(movie);
    onOpen(movie); // ✅ triggers global modal logic
  };

  const handleClose = () => setSelectedMovie(null);

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

  const filtered = query
    ? movies.filter((m) => m.title.toLowerCase().includes(query.toLowerCase()))
    : movies;

  return (
    <div>
      <h1 style={{ padding: "20px" }}>
        {query ? `Search Results for "${query}"` : "TV Shows"}
      </h1>

      <Row
        title="All TV Shows"
        items={filtered}
        onOpen={handleOpen}
        onPlay={onPlay}         
        onAdd={handleAdd}
        onRemove={handleRemove}
        isInList={false}
      />

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleClose}
          onPlay={onPlay}       
          onAdd={handleAdd}
          onRemove={handleRemove}
          isInList={myList.some((m) => m.id === selectedMovie.id)}
        />
      )}
    </div>
  );
};

export default TVShows;
