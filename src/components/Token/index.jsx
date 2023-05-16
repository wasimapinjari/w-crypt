import { motion } from "framer-motion";
import { useState } from "react";

const Token = ({
  id,
  tokenName,
  tokenIcon,
  tokenSymbol,
  handleTokenClick,
  styleStatus,
}) => {
  const [style] = useState(styleStatus);
  return (
    <li>
      <motion.div
        className="modal__token"
        style={style && { background: "#1B192D" }}
        onClick={() => handleTokenClick(id, tokenName, tokenSymbol, tokenIcon)}
      >
        <figure className="modal__token-desciption">
          <img src={tokenIcon} alt={tokenName} />
          <div className="card__input-box-caption-flex">
            <figcaption>{tokenName}</figcaption>
            {style && (
              <img
                src="/icons/check.png"
                class="inverted-triangle"
                alt="check"
              />
            )}
          </div>
        </figure>
      </motion.div>
    </li>
  );
};

export default Token;
