import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons"; // Importera shoppingcart-ikonen
import "./Header.css"; // Din CSS-fil för styling

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
      <div className="logo-container">
        <Link to="/">
          <img src="/images/logo.png" alt="Logo" className="logo" />
        </Link>
      </div>
      <nav className="nav">
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

          {/* Ersätt knappen med shoppingcart-ikonen */}
          <button className="cart" onClick={() => navigate("/cart")}>
            <FontAwesomeIcon icon={faShoppingCart} size="lg" />
          </button>
        </div>

        <ul className="nav-links">
          <li>
            <Link to="/">Hem</Link>
          </li>
          <li>
            <Link to="/portfolio">Portfolio</Link>
          </li>
          <li>
            <Link to="/kontakt">Kontakt</Link>
          </li>
          <li>
            <Link to="/kundgalleri">Kundgalleri</Link>
          </li>
          <li><Link to="/admin" className="admin-link">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
