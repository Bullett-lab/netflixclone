import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ query, onQueryChange }) => {
  const [solid, setSolid] = useState(false);
  const [showProfile, setShowProfile] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setShowProfile(false);
    setMenuOpen(false); // close menu when route changes
  }, [location]);

  return (
    <header className={`nav ${solid ? "nav__black" : ""}`}>
      <div className="nav__left">
        <NavLink to="/" end>
     <img className="nav__logo" src="/netflix.png" alt="Netflix Logo" />

        </NavLink>

        {/* Burger toggle */}
        <button
          className={`burger ${menuOpen ? "open" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Collapsible menu */}
        <ul className={`nav__menu ${menuOpen ? "show" : ""}`}>
          <li><NavLink to="/" end>Home</NavLink></li>
          <li><NavLink to="/tvshows">TV Shows</NavLink></li>
          <li><NavLink to="/movies">Movies</NavLink></li>
          <li><NavLink to="/mylist">My List</NavLink></li>
        </ul>
      </div>

      <div className="nav__right">
        <div className="nav__search-container">
          <input
            className="nav__search"
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            placeholder="Search titles..."
            autoComplete="off"
          />
        </div>

        <div className="nav__profile">
          <img
            className="nav__avatar"
            src="/avatar.jpg"
            alt="Profile"
            onClick={() => setShowProfile(!showProfile)}
          />
          {showProfile && (
            <div className="nav__dropdown">
              <ul>
                <li><NavLink to="/profile">Profile</NavLink></li>
                <li><NavLink to="/settings">Settings</NavLink></li>
                <li><NavLink to="/help">Help Center</NavLink></li>
                <li><NavLink to="/logout">Sign Out</NavLink></li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;
