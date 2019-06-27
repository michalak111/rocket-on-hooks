import React from "react";

const Scene = ({ children, nightMode = false }) => (
  <div className="scene">
    <div
      data-testid="Sky"
      className={`sky sky--${nightMode ? "night" : "day"}`}
    />
    <div
      data-testid="Ground"
      className={`ground ground--${nightMode ? "night" : "day"}`}
    />
    {children}
  </div>
);

export default Scene;
