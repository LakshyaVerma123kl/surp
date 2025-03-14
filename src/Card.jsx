import React from "react";
import { motion } from "framer-motion";

const Card = ({ title, link, content }) => {
  return (
    <motion.div
      className="card"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="card-title">{title}</h2>
      {content ? (
        <div className="card-content">{content}</div>
      ) : (
        <a
          href={link}
          target="_blank"
          rel="noopener noreferrer"
          className="card-btn"
        >
          Open Surprise
        </a>
      )}
    </motion.div>
  );
};

export default Card;
