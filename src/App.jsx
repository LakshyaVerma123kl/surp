import React, { useState, useRef, useEffect } from "react";
import Card from "./Card";
import { FaMusic, FaPause } from "react-icons/fa";
import song from "./assets/falling.mp3";
import "./styles.css";

const pages = [
  [
    { title: "A Cozy Hug for You", link: "/surp/hug.html" },
    { title: "A Little Surprise", link: "/surp/surprise.html" },
  ],
  [
    { title: "A Warm Message", link: "/surp/message.html" },
    { title: "A Sweet Memory", link: "/surp/memory.html" },
  ],
  [
    { title: "A Gentle Whisper", link: "/surp/whisper.html" },
    { title: "A Secret Gift", link: "/surp/gift.html" },
  ],
];

const createFlowers = () => {
  const flowers = [];
  for (let i = 0; i < 30; i++) {
    const size = Math.random() * 15 + 10;
    const duration = Math.random() * 5 + 5;
    const delay = Math.random() * 5;
    const left = Math.random() * 100;

    flowers.push(
      <span
        key={i}
        className="flower"
        style={{
          left: `${left}%`,
          fontSize: `${size}px`,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        }}
      >
        🌸
      </span>
    );
  }
  return flowers;
};

const App = () => {
  const [page, setPage] = useState(0);
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(
    () => localStorage.getItem("musicPlaying") !== "false"
  );

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    localStorage.setItem("musicPlaying", isPlaying);
  }, [isPlaying]);

  const handleCardClick = (link) => {
    window.open(link, "_blank"); // Open in a new tab
    if (page < pages.length - 1) {
      setTimeout(() => setPage((prev) => prev + 1), 500); // Move to next cards
    }
  };

  const handleNext = () => {
    if (page < pages.length - 1) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className="app-container">
      <div className="flower-container">{createFlowers()}</div>

      <audio ref={audioRef} src={song} loop autoPlay />

      <button className="music-btn" onClick={() => setIsPlaying(!isPlaying)}>
        {isPlaying ? (
          <FaPause className="icon" />
        ) : (
          <FaMusic className="icon" />
        )}
      </button>

      <div className="cards-container">
        {pages[page].map((card, index) => (
          <Card
            key={index}
            title={card.title}
            link={card.link}
            onClick={() => handleCardClick(card.link)}
          />
        ))}
      </div>

      {/* Button Container */}
      <div className="button-container">
        {page < pages.length - 1 && (
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
        )}

        {page > 0 && (
          <button className="reset-btn" onClick={() => setPage(0)}>
            Restart Journey
          </button>
        )}
      </div>
    </div>
  );
};

export default App;
