import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faInstagram } from "@fortawesome/free-brands-svg-icons"; // Sociala ikoner
import "./Header.css";

function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery.trim() !== "") {
      navigate(`/sok?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
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
          {/* Sökfält */}
          <form onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Sök..."
              className="search-bar"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>

          {/* Sociala medier + kundvagn */}
          <div className="social-cart">
            <a href="https://www.facebook.com/namahka" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faFacebook} size="lg" />
            </a>
            <a href="https://www.instagram.com/namahka/" className="social-icon" target="_blank" rel="noopener noreferrer">
              <FontAwesomeIcon icon={faInstagram} size="lg" />
            </a>
            <button className="cart" onClick={() => navigate("/cart")}>
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
            </button>
          </div>
        </div>

        <ul className="nav-links">
          <li><Link to="/">Hem</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/kontakt">Kontakt</Link></li>
          <li><Link to="/kundgalleri">Kundgalleri</Link></li>
          <li><Link to="/admin" className="admin-link">Admin</Link></li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
