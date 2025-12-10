import React from "react";
import "./PrimaryButton.css";

function Button({ label, onClick, title, type = "button" }) {
  return (
    <button className="glow-on-hover" type={type} onClick={onClick} title={title}>
      {label}
    </button>
  );
}

export default Button;