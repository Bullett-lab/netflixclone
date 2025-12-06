import FeaturedCarousel from "../components/FeaturedCarousel";
import Row from "../components/Row";
import MovieModal from "../components/Modal";
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Home = ({ movies, categories, query, onAdd, onOpen, onPlay }) => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const location = useLocation();

  // ✅ Only show greeting if user was passed
  const user = location.state?.user;
  const [showWelcome, setShowWelcome] = useState(!!user); // true only if user exists

  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => setShowWelcome(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [user]);

  const handleOpen = (movie) => {
    setSelectedMovie(movie);
    onOpen(movie);
  };

  const handleClose = () => setSelectedMovie(null);

  const featuredMovies = movies.filter((m) => m.isFeatured);

  const filteredMovies = query
    ? movies.filter((m) =>
        m.title.toLowerCase().includes(query.toLowerCase())
      )
    : [];

  const spotlightMovie = filteredMovies[0];

  return (
    <div className="home">
      {/* ✅ Show greeting only if user exists */}
      {showWelcome && user && (
        <div className="home__welcome fade-out">
          <h2>Welcome back, {user}!</h2>
          <p>You are logged in as <strong>{user}</strong></p>
        </div>
      )}

      <FeaturedCarousel
        movies={featuredMovies}
        interval={6000}
        onPlay={onPlay}
        onOpen={handleOpen}
      />

      <div className="carousel-section">
        {query && spotlightMovie ? (
          <div className="spotlight">
            <h2 className="spotlight__title">
              Search Results for "{query}"
            </h2>
            <div
              className="spotlight__poster"
              onClick={() => handleOpen(spotlightMovie)}
            >
              <img
                src={spotlightMovie.poster}
                alt={spotlightMovie.title}
                className="spotlight__image"
              />
            </div>
          </div>
        ) : (
          categories.map((category) => (
            <Row
              key={category.name}
              title={category.name}
              items={category.filter()}
              onOpen={handleOpen}
              onPlay={onPlay}
              onAdd={onAdd}
              isInList={false}
            />
          ))
        )}
      </div>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          onClose={handleClose}
          onPlay={onPlay}
          onAdd={onAdd}
          isInList={false}
        />
      )}
    </div>
  );
};

export default Home;
