import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header>
      <div>
        <Link to="/">
          <img
            src="https://www.vinted.fr/assets/web-logo/default/logo.svg"
            alt="Vinted"
          />
        </Link>
      </div>
      <input
        className="search-bar"
        type="search"
        placeholder="Rechercher des articles"
        name="Vinted"
      />
      <div className="header-style">
        <Link to="/Signup">
          <div className="button">S'inscrire | Se connecter</div>
        </Link>
        <div className="button-sell">Vendre tes articles</div>
      </div>
    </header>
  );
};

export default Header;
