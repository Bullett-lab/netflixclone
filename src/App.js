import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import TrailerOverlay from "./components/TrailerOverlay";
import { movies, categories } from "./data/movies";
import Home from "./pages/Home";
import TVShows from "./pages/TVShows";
import Movies from "./pages/Movies";
import MyList from "./pages/MyList";
import "./index.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

// New pages
import MyProfile from "./pages/MyProfile";
import Settings from "./pages/Settings";
import HelpCenter from "./pages/HelpCenter";
import SignOut from "./pages/SignOut";

export default function App() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [active, setActive] = useState(null);
  const [trailer, setTrailer] = useState("");
  const [myList, setMyList] = useState(() => {
    const saved = localStorage.getItem("myList");
    return saved ? JSON.parse(saved) : [];
  });
  const [notification, setNotification] = useState("");

  // 🔍 Fetch from OMDb API
  useEffect(() => {
    const fetchMovies = async () => {
      if (!query) {
        setSearchResults([]);
        return;
      }
      try {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=e7b656a3&s=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        if (data.Search) {
          const formatted = data.Search.map((m) => ({
            id: m.imdbID,
            title: m.Title,
            poster: m.Poster !== "N/A" ? m.Poster : "/fallback.jpg",
            year: m.Year,
            genres: [],
            trailerUrl: "",
          }));
          setSearchResults(formatted);
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.error("OMDb fetch error:", err);
        setSearchResults([]);
      }
    };
    fetchMovies();
  }, [query]);

  // Save My List
  useEffect(() => {
    localStorage.setItem("myList", JSON.stringify(myList));
  }, [myList]);

  // Modal controls
  const openModal = (movie) => setActive(movie);
  const closeModal = () => setActive(null);

  // Trailer controls
  const playTrailer = (movie) => {
    if (movie.trailerUrl) {
      const embedUrl = movie.trailerUrl.includes("watch?v=")
        ? movie.trailerUrl.replace("watch?v=", "embed/")
        : movie.trailerUrl;

      setTrailer(`${embedUrl}?autoplay=1&modestbranding=1&rel=0&showinfo=0`);
      closeModal();
    }
  };

  const closeTrailer = () => setTrailer("");

  // My List
  const addToMyList = (movie) => {
    if (!myList.find((m) => m.id === movie.id)) {
      setMyList([...myList, movie]);
      setNotification(`${movie.title} has been added to My List ✅`);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const removeFromMyList = (id) => {
    const movie = myList.find((m) => m.id === id);
    setMyList(myList.filter((m) => m.id !== id));

    if (movie) {
      setNotification(`${movie.title} has been removed from My List ❌`);
      setTimeout(() => setNotification(""), 3000);
    }
  };

  return (
    <Router>
      <div className="app-layout">
        {/* Navbar always visible */}
        <Navbar query={query} onQueryChange={setQuery} myListCount={myList.length} />

        {notification && <div className="toast">{notification}</div>}

        <main className="main-content">
          <Routes>
            {/* PROFILE → HOME */}
            <Route path="/" element={<MyProfile />} />
            <Route path="/profile" element={<MyProfile />} />

            {/* HOME now receives profile name from router state */}
            <Route
              path="/home"
              element={
                <Home
                  movies={movies}
                  categories={categories}
                  query={query}
                  onAdd={addToMyList}
                  onPlay={playTrailer}
                  onOpen={openModal}
                />
              }
            />

            <Route
              path="/tvshows"
              element={
                <TVShows
                  movies={movies}
                  query={query}
                  onOpen={openModal}
                  onPlay={playTrailer}
                  onAdd={addToMyList}
                  onRemove={removeFromMyList}
                  myList={myList}
                />
              }
            />

            <Route
              path="/movies"
              element={
                <Movies
                  movies={movies}
                  query={query}
                  searchResults={searchResults}
                  onOpen={openModal}
                  onPlay={playTrailer}
                  onAdd={addToMyList}
                  onRemove={removeFromMyList}
                  myList={myList}
                />
              }
            />

            <Route
              path="/mylist"
              element={
                <MyList
                  items={myList}
                  query={query}
                  onOpen={openModal}
                  onPlay={playTrailer}
                  onRemove={removeFromMyList}
                />
              }
            />

            {/* New pages */}
            <Route path="/settings" element={<Settings />} />
            <Route path="/help" element={<HelpCenter />} />
            <Route path="/logout" element={<SignOut />} />
          </Routes>
        </main>

        {/* Footer */}
        <footer className="footer">
          <div>FAQ • Help Center • Terms of Use • Privacy</div>
          <div>© 2025 ISPSC — Netflix Inspired Front-End Project</div>
        </footer>

        {/* Modal */}
        {active && (
          <Modal
            movie={active}
            onClose={closeModal}
            onPlay={playTrailer}
            onAdd={addToMyList}
            onRemove={removeFromMyList}
            isInList={myList.some((m) => m.id === active.id)}
          />
        )}

        {/* Trailer */}
        {trailer && <TrailerOverlay url={trailer} onClose={closeTrailer} />}
      </div>
    </Router>
  );
}
