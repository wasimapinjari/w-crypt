import { motion } from "framer-motion";
import { useState } from "react";

function ListItem({ listItemName, styleSetting, handleClick }) {
  const [style] = useState(styleSetting);
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        fontSize: "16px",
        fontWeight: `${style ? "600" : "400"}`,
        color: `${style ? "white" : "#5A5A5A"}`,
        borderBottom: `${style ? "white solid 2px" : "none"}`,
        transition: { delay: 0.2 },
      }}
      whileHover={{
        color: "white",
        transition: {
          delay: 0.1,
        },
      }}
      className="nav__list-item-psuedo"
    >
      <li>{listItemName}</li>
    </motion.div>
  );
}

export default ListItem;
