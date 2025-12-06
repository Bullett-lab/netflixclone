import React from "react";
import "./TrailerOverlay.css";

export default function TrailerOverlay({ url, onClose }) {
  return (
    <div className="trailer-overlay">
      <div className="trailer-box">
        <button className="btn close" onClick={onClose}>✖</button>
        <iframe
          src={`${url}?autoplay=1&modestbranding=1&rel=0&showinfo=0`}
          title="YouTube Trailer"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    </div>
  );
}
