import { motion, AnimatePresence } from "framer-motion";
import Backdrop from "../Backdrop";
import Token from "../Token";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0",
    opacity: 1,
    transition: {
      duration: 0.1,
      type: "spring",
      damping: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({
  handleClose,
  tokens,
  handleTokenClick,
  selectedToken,
  handleSearch,
  searchText,
}) => {
  return (
    <AnimatePresence>
      <Backdrop onClick={handleClose}>
        <motion.div
          onClick={(e) => e.stopPropagation()}
          className="modal"
          variants={dropIn}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="modal__close">
            <img
              src="/icons/close.png"
              className="modal__close-btn"
              onClick={handleClose}
              alt="Close button"
            />
          </div>

          <div className="modal__content">
            <div>
              <img
                src="/icons/search.png"
                onClick={handleClose}
                alt="Search button"
                className="modal__search"
              />
              <input
                type="text"
                className="modal__search-input"
                placeholder="Search chains"
                value={searchText}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>

            <ul className="modal__token-list">
              {tokens.map((token, index) => {
                let style = false;
                if (index === selectedToken) style = true;
                return (
                  <Token
                    key={index}
                    id={index}
                    tokenName={token.name}
                    tokenIcon={token.src}
                    tokenSymbol={token.tickerSymbol}
                    handleTokenClick={handleTokenClick}
                    styleStatus={style}
                  />
                );
              })}
            </ul>
          </div>
        </motion.div>
      </Backdrop>
    </AnimatePresence>
  );
};

export default Modal;
