import { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="header">
      <nav className="nav">
        {/* Menyknapp (visas på mobil) */}
        <div className="menu">
          <button className="menu-button" onClick={() => setMenuOpen(!menuOpen)}>
            menu ▼
          </button>
          {menuOpen && (
            <ul className="dropdown-menu">
              <li><Link to="/" onClick={() => setMenuOpen(false)}>Hem</Link></li>
              <li><Link to="/Portfolio" onClick={() => setMenuOpen(false)}>Portfolio</Link></li>
              <li><Link to="/kontakt" onClick={() => setMenuOpen(false)}>Kontakt</Link></li>
              <li><Link to="/kundgalleri" onClick={() => setMenuOpen(false)}>Kundgalleri</Link></li>
            </ul>
          )}
        </div>

        {/* Full meny (visas från 640px) */}
        <ul className="nav-links">
          <li><Link to="/">Hem</Link></li>
          <li><Link to="/portfolio">Portfolio</Link></li>
          <li><Link to="/kontakt">Kontakt</Link></li>
          <li className="dropdown">
            <span>Kundgalleri ▼</span>
            <ul className="dropdown-menu">
              <li><a href="#">Luisa och Muslim</a></li>
              <li><a href="#">Jesper och Nicole</a></li>
              <li><a href="#">Martina och Erik</a></li>
              <li><a href="#">Johan och Madelene</a></li>
              <li><a href="#">Lena och Andreas</a></li>
              <li><a href="#">Hoda och Kemal</a></li>
              <li><a href="#">Ida och Niklas</a></li>
              <li><a href="#">Hanna och Andreas</a></li>
              <li><a href="#">Therese och Milan</a></li>
              <li><a href="#">Emma och Per</a></li>
              <li><a href="#">Emma och Oscar</a></li>
              <li><a href="#">Sebastian och Jhoselin</a></li>
              <li><a href="#">Serena och Oliver</a></li>
            </ul>
          </li>
        </ul>

        {/* Ikoner, sökfält och varukorg */}
        <div className="nav-right">

          <input type="text" placeholder="🔍 search" className="search-bar" />
          <button className="cart"><i className="fas fa-shopping-cart"></i></button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
