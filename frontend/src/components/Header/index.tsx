import { NavLink } from "react-router-dom";

import "./Header.css";

function Header() {
  return (
    <header className="Header">
      <div className="Header-links-container">
        <NavLink to="/" className="Header-link">
          Home
        </NavLink>
        <NavLink to="/history" className="Header-link">
          History
        </NavLink>
      </div>
    </header>
  );
}

export default Header;
