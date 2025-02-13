import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Header.css";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Hantera sökning vid Enter-knapp
  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/sok?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery(""); // Rensa sökfältet efter sökning
    }
  };

  return (
    <header className="header">
      <nav className="nav">
        {/* 🔥 Sökfält och kundkorg ovanför knapparna i mobil */}
        <div className="nav-right">
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Sök..."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <button className="cart"><i className="fas fa-shopping-cart"></i></button>
        </div>

        {/* Navigation – Knapparna ligger på rad även i mobil */}
        <ul className="nav-links">
          <li><Link to="/">Hem</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/kontakt">Kontakt</Link></li>
          <li><Link to="/kundgalleri">Kundgalleri</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
