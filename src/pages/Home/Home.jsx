import React, { useContext, useEffect, useState } from "react";
import "./Home.css";
import { CoinContext } from "../../context/CoinContext";
import { Link } from "react-router-dom";

function Home() {
  const { allCoins, currency } = useContext(CoinContext);
  const [displayCoins, setDisplayCoins] = useState([]);
  const [input, setInput] = useState("");

  const inputHandler = (e) => {
    setInput(e.target.value);
    if(e.target.value === "") {
      setDisplayCoins(allCoins);
    }
  };

  const searchHandler = async (e) => {
    e.preventDefault();
    const coins = await allCoins.filter((item) => {
      return item.name.toLowerCase().includes(input.toLowerCase());
    })
    setDisplayCoins(coins);
  };

  useEffect(() => {
    setDisplayCoins(allCoins);
  }, [allCoins]);

  return (
    <div className="home">
      <div className="hero">
        <h1>
          Largest <br />
          Crypto Marketplace
        </h1>
        <p>
          Welcome to the world's largest cryptocurrency marketplace. Sign up to
          explore more about cryptos.
        </p>
        <form onSubmit={searchHandler}>
          <input onChange={inputHandler} value={input} list="coinList" type="text" placeholder="Search crypto.." required />
          <datalist id="coinList">
            {allCoins.map((item, index) => (<option key={index} value={item.name} />))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="cryptoTable">
        <div className="tableLayout">
          <p>#</p>
          <p>Coins</p>
          <p>Price</p>
          <p style={{ textAlign: "center" }}>24H Change</p>
          <p className="marketCap">Market Cap</p> 
        </div>
        {displayCoins.slice(0, 10).map((item, index) => (
          <Link to={`/coin/${item.id}`} className="tableLayout" key={index}>
            <p>{item.market_cap_rank}</p>
            <div>
              <img src={item.image} alt="" />
              <p>{item.name + " - " + item.symbol}</p>
            </div>
            <p>
              {currency.symbol} {item.current_price.toLocaleString()}
            </p>
            <p className={item.price_change_24h > 0 ? "green" : "red"}>
              {Math.floor(item.price_change_24h * 100)}
            </p>
            <p className="marketCap">
              {currency.symbol} {item.market_cap.toLocaleString()}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
