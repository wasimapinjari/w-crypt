import { useState, useEffect } from "react";
import CardCircle from "./CardCircle";
import { motion, AnimatePresence } from "framer-motion";
import Modal from "./Modal";
import tokenData from "../tokenData";

function Card({ navOpenState }) {
  const [tokens, settokens] = useState(tokenData);
  const [tokenName, setTokenName] = useState("Bitcoin");
  const [tokenIcon, setTokenIcon] = useState("/icons/btc.svg");
  const [selectedToken, setSelectedToken] = useState(0);
  const [modalOpen, setModalOpen] = useState(false);
  const [price, setPrice] = useState(0);
  const [input, setInput] = useState("");
  const [spinner, setSpinner] = useState(true);
  const [estimatePrice, setEstimatePrice] = useState("");
  const close = () => setModalOpen(false);
  const open = () => setModalOpen(true);
  const [searchText, setSearchText] = useState("");

  // setInterval(() => console.log("Set: " + navOpenState), 10000);

  useEffect(() => {
    setSpinner(true);
    const socketUrl =
      "wss://stream.binance.com:9443/ws/" +
      tokenData[selectedToken].tickerSymbol.toLowerCase() +
      "usdt@trade";
    const ws = new WebSocket(socketUrl);

    ws.onmessage = (e) => {
      const data = JSON.parse(e.data);
      const price = data.p * 80;
      setPrice(Math.floor(price * 100) / 100);
      setSpinner(false);
    };

    return () => {
      ws.close();
    };
  }, [selectedToken]);

  useEffect(() => {
    if (input) setEstimatePrice(input / price);
    else setEstimatePrice("0.00");
  }, [input, price]);

  useEffect(() => {
    settokens(
      tokenData.filter((token) =>
        token.name.toLowerCase().includes(searchText.toLowerCase())
      )
    );
  }, [searchText]);

  useEffect(() => {
    console.log(navOpenState);
  }, [navOpenState]);

  const handleSearch = (searchText) => {
    setSearchText(searchText);
  };

  const handleTokenClick = (id, tokenSymbol) => {
    close();
    setSelectedToken(id);
    setTokenName(tokenData[id].name);
    setTokenIcon(tokenData[id].src);
  };

  const handleInputChange = (e) => {
    setInput(e.target.value);
    const priceEstimation = e.target.value / price;
    setEstimatePrice(priceEstimation);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{
        opacity: 1,
        transition: { delay: 0.2 },
      }}
    >
      <CardCircle
        tokenName={tokenName}
        tokenIcon={tokenIcon}
        navOpenState={navOpenState}
      />
      <div className="card" style={{ zIndex: navOpenState ? "-3" : "0" }}>
        <form>
          <label>
            <div className="card__price-tag-container-flex">
              <p className="card__label-padding">Current Value</p>
              {spinner ? (
                <div className="loader">Loading...</div>
              ) : (
                <p className="card__price-tag">
                  {price.toLocaleString("en-US", {
                    maximumFractionDigits: 2,
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              )}
            </div>
            <div
              className="card__input-box"
              onClick={() => (modalOpen ? close() : open())}
            >
              <figure className="card__token-desciption">
                <img src={tokenIcon} alt="Bitcoin token" />
                <div className="card__input-box-caption-flex">
                  <figcaption>{tokenName}</figcaption>
                  <img
                    className="inverted-triangle"
                    src="/icons/inverted-triangle.png"
                    alt="Purple color inverted triangle"
                  />
                </div>
              </figure>
            </div>
          </label>
          <label>
            <p className="card__label-padding">Amount you want to invest</p>

            <input
              type="number"
              className="card__input-box"
              name="inrInput"
              placeholder="0.00"
              value={input}
              onChange={handleInputChange}
            />
            <p className="card__currency-text-float">USD</p>
          </label>
          <label>
            <p className="card__label-padding">
              Estimate number of {tokenData[selectedToken].tickerSymbol} you get
            </p>
            <input
              type="number"
              className="card__input"
              disabled
              placeholder="0.00"
              value={estimatePrice}
            />
          </label>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="card__btn"
            onClick={(e) => {
              e.preventDefault();
            }}
          >
            Buy
          </motion.button>
        </form>
      </div>
      <AnimatePresence initial="false" mode="wait">
        {modalOpen && (
          <Modal
            tokens={tokens}
            handleClose={close}
            handleTokenClick={handleTokenClick}
            selectedToken={selectedToken}
            handleSearch={handleSearch}
            searchText={searchText}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Card;
