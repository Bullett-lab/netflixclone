import React, { useEffect, useState, useRef } from "react";
import "./FeaturedCarousel.css";

const FeaturedCarousel = ({ movies = [], interval = 5000 }) => {
  const [index, setIndex] = useState(0);
  const [playingTrailer, setPlayingTrailer] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    if (movies.length > 1 && !playingTrailer) startTimer();
    return () => stopTimer();
  }, [index, movies, playingTrailer]);

  const startTimer = () => {
    stopTimer();
    timerRef.current = setInterval(() => {
      setIndex((prev) => (prev + 1) % movies.length);
    }, interval);
  };

  const stopTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const goTo = (i) => setIndex(i);
  const prev = () => setIndex((i) => (i - 1 + movies.length) % movies.length);
  const next = () => setIndex((i) => (i + 1) % movies.length);

  if (!movies || movies.length === 0) return null;

  const currentMovie = movies[index];

  return (
    <div
      className="featured-carousel"
      onMouseEnter={stopTimer}
      onMouseLeave={() => !playingTrailer && startTimer()}
      aria-roledescription="carousel"
    >
      <div
        key={currentMovie.id || `${currentMovie.title}-${index}`}
        className="carousel-slide active"
      >
        {playingTrailer ? (
          <div className="carousel-trailer-wrapper">
            <iframe
              className="carousel-trailer"
              src={currentMovie.trailerUrl} // ✅ expects trailer URL in movie object
              title={`${currentMovie.title} Trailer`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button
              className="btn close-trailer"
              onClick={() => setPlayingTrailer(false)}
            >
              ✖
            </button>
          </div>
        ) : (
          <>
            <img
              src={currentMovie.backdrop_path}
              alt={currentMovie.title}
              className="carousel-image"
            />
            <div className="carousel-overlay">
              <div className="carousel-bottom-content">
                <h1 className="carousel-title">{currentMovie.title}</h1>
                <p className="carousel-meta">
                  {currentMovie.year} • {currentMovie.duration}
                </p>
                <p className="carousel-description">{currentMovie.description}</p>
                <div className="carousel-actions">
                  <button
                    className="btn play"
                    onClick={() => setPlayingTrailer(true)}
                  >
                    ▶ Play Trailer
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {movies.length > 1 && !playingTrailer && (
        <>
          <button
            className="carousel-control prev"
            onClick={prev}
            aria-label="Previous slide"
          >
            ‹
          </button>
          <button
            className="carousel-control next"
            onClick={next}
            aria-label="Next slide"
          >
            ›
          </button>
          <div className="carousel-indicators">
            {movies.map((_, i) => (
              <button
                key={i}
                className={`indicator ${i === index ? "active" : ""}`}
                onClick={() => goTo(i)}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedCarousel;
