// components/OutlinedHeading.jsx
import React from "react";

const OutlinedHeading = ({ children, className = "" }) => {
  return (
    <h1
      className={`font-bold text-transparent ${className}`}
      style={{
        // fontFamily: "Arial Rounded MT Bold, Helvetica Neue, Arial, sans-serif",
        WebkitTextStroke: "1px #333",
        textStroke: "1px #333",
        letterSpacing: "0.02em",
        lineHeight: "1.1",
      }}
    >
      {children}
    </h1>
  );
};

export default OutlinedHeading;
