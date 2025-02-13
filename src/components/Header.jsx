import { useState } from "react";
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
              <li><a href="#">Hem</a></li>
              <li><a href="#">Portfolio</a></li>
              <li><a href="#">Kontakt</a></li>
              <li><a href="#">Kundgalleri</a></li>
            </ul>
          )}
        </div>

        {/* Full meny (visas från 640px) */}
        <ul className="nav-links">
          <li><a href="#">Hem</a></li>
          <li><a href="#">Portfolio</a></li>
          <li><a href="#">Kontakt</a></li>
          <li className="dropdown">
            <a href="#">Kundgalleri ▼</a>
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
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
            <a href="#"><i className="fab fa-youtube"></i></a>
          </div>
          <input type="text" placeholder="🔍 search" className="search-bar" />
          <button className="cart"><i className="fas fa-shopping-cart"></i></button>
        </div>
      </nav>
    </header>
  );
}

export default Header;
