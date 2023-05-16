import { useState } from "react";
import ListItem from "./ListItem";
import { motion, AnimatePresence } from "framer-motion";

function Header({ navOpenState, navStateChange }) {
  const listItems = ["Trade", "Earn", "Support", "About"];
  const [activeListItem, setActiveListItem] = useState("Trade");

  const handleClick = (id) => {
    setActiveListItem(listItems[id]);
  };

  return (
    <AnimatePresence initial="false" mode="wait">
      <motion.div
        initial={{ transform: "translateY(-20rem)" }}
        animate={{
          transform: "translateY(0rem)",
          transition: {
            duration: 0.1,
            type: "spring",
            damping: 25,
            stiffness: 500,
          },
        }}
      >
        <header className={navOpenState ? "nav-open sticky" : ""}>
          <div className="header-flex">
            <p class="logo-text">W-Crypt</p>
            <ul className="nav__list">
              {listItems.map((listItem, index) => {
                let styleSetting = false;
                if (listItem === activeListItem) styleSetting = true;
                return (
                  <ListItem
                    id={index}
                    className="nav__list-item"
                    key={index}
                    listItemName={listItem}
                    styleSetting={styleSetting}
                    handleClick={handleClick}
                  />
                );
              })}
            </ul>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="nav__btn"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              <span>Connect wallet</span>
            </motion.button>

            <div className="nav-button" onClick={navStateChange}>
              <span className="nav-icon">&nbsp;</span>
              <span className="nav-icon-close"></span>
            </div>
          </div>
        </header>
      </motion.div>
    </AnimatePresence>
  );
}

export default Header;
