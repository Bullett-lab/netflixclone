const Hero = ({ movie, onPlay, onInfo }) => {
  return (
    <div
      className="hero"
      style={{
        backgroundImage: `url(${movie.thumbnail || movie.poster})`,
      }}
    >
      <div className="hero__content">
        <h1 className="hero__title">{movie.title}</h1>
        <p className="hero__desc">{movie.description}</p>

        <div className="hero__btns">
          <button className="btn btn--play" onClick={() => onPlay(movie)}>
            ▶ Play
          </button>
          <button className="btn btn--info" onClick={() => onInfo(movie)}>
            ℹ More Info
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
