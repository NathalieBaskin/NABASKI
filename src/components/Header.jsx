import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        {/* 🔥 Sökfält och kundkorg ligger nu ovanför knapparna i mobil */}
        <div className="nav-right">
          <input type="text" placeholder="Sök..." className="search-bar" />
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
