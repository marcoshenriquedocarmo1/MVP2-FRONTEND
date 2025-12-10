import React from "react";
import "./PrimaryButton.css";

function Button({ label, onClick, type = "button" }) {
  return (
    <button className="glow-on-hover" type={type} onClick={onClick}>
      {label}
    </button>
  );
}

export default Button;