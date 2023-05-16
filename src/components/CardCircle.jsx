import { motion } from "framer-motion";

function CardCircle({ tokenName, tokenIcon, navOpenState }) {
  return (
    <div>
      <div
        className="card__circle--invisible"
        style={{ zIndex: navOpenState ? "-2" : "1" }}
      >
        {/* <div className="relative-position"> */}
        <motion.div
          initial={{ transform: "translateY(-10vh)", height: "100%" }}
          animate={{
            transform: "translateY(0)",
            transition: {
              duration: 0.1,
              type: "spring",
              damping: 25,
              stiffness: 500,
            },
          }}
        >
          <motion.div
            className="card__circle--icon"
            initial={{
              opacity: 0,
              transform: "translate(-2.4rem, -1.4rem)",
            }}
            animate={{
              opacity: 1,
              transform: "translate(-2.4rem, -2.4rem)",
              transition: {
                duration: 3,
                type: "spring",
                damping: 25,
                stiffness: 500,
              },
            }}
            exit={{ transform: "translate(-2.4rem, -3.4rem)", opacity: 0 }}
            key={tokenIcon}
          >
            <img
              className="card__circle-content"
              src={tokenIcon}
              alt={tokenName}
            />
          </motion.div>
          <div className="card__circle--background"></div>
        </motion.div>
        {/* </div> */}
      </div>
    </div>
  );
}

export default CardCircle;
