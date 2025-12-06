import MovieCard from "./MovieCard";

const Row = ({
  title,
  items = [],
  onOpen,
  onRemove,
  isInList = false,
  isSearch = false // ✅ new prop to control layout
}) => {
  return (
    <section className={`row ${isSearch ? "row--search" : ""}`}>
      {title && <h2 className="row__title">{title}</h2>}

      <div className={`row__track ${isSearch ? "row__track--centered" : ""}`}>
        {items.length > 0 ? (
          items.map((movie, index) => (
            <div
              key={movie.id || `${title}-${index}`}
              className={`row__item ${isSearch ? "row__item--spotlight" : ""}`}
            >
              <MovieCard
                movie={movie}
                index={index}
                onOpen={() => onOpen(movie)}
                onRemove={onRemove ? () => onRemove(movie.id) : undefined}
                isInList={isInList}
                showActions={true}
              />
            </div>
          ))
        ) : (
          <p className="row__empty">No movies available</p>
        )}
      </div>
    </section>
  );
};

export default Row;
