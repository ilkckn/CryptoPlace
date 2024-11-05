import React, { useContext, useState } from "react";
import "./Navbar.css";
import logo from "../../assets/logo.png";
import arrowIcon from "../../assets/arrow_icon.png";
import { Link } from "react-router-dom";
import { CoinContext } from "../../context/CoinContext";
import { RiMenu3Fill } from "react-icons/ri";
import { BsChevronBarRight } from "react-icons/bs";

function Navbar() {
  const { setCurrency } = useContext(CoinContext);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const currencyHandler = (e) => {
    switch (e.target.value) {
      case "usd":
        setCurrency({ name: "usd", symbol: "$" });
        break;
      case "eur":
        setCurrency({ name: "eur", symbol: "€" });
        break;
      case "chf":
        setCurrency({ name: "chf", symbol: "₣" });
        break;
      default:
        setCurrency({ name: "usd", symbol: "$" });
        break;
    }
  };

  return (
    <div className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="logo" />
        </Link>
      </div>
      <ul>
        <Link to="/">
          <li>Home</li>
        </Link>
        <li>Features</li>
        <li>Pricing</li>
        <li>Blog</li>
      </ul>
      <div className="navRight">
        <RiMenu3Fill
          className="dropdownIcon"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        />
        <select onChange={currencyHandler}>
          <option value="usd">USD</option>
          <option value="eur">EURO</option>
          <option value="chf">CHF</option>
        </select>
        <button>
          Sign Up <img src={arrowIcon} alt="" />
        </button>
      </div>
      {isMenuOpen && (
        <div className="dropdown">
          <div className="menuClose">
            <BsChevronBarRight
              className="dropdownIcon"
              onClick={() => setIsMenuOpen(false)}
            />
          </div>
          <div className="dropNavRight">
            <select onChange={currencyHandler}>
              <option value="usd">USD</option>
              <option value="eur">EURO</option>
              <option value="chf">CHF</option>
            </select>
          </div>
          <ul className="dropUl">
            <li>Home</li>
            <li>Features</li>
            <li>Pricing</li>
            <li>Blog</li>
          </ul>
          <button>
            Sign Up <img src={arrowIcon} alt="" />
          </button>
        </div>
      )}
    </div>
  );
}

export default Navbar;
