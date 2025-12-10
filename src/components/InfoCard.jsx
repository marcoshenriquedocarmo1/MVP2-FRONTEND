
import React from "react";
import "./InfoCard.css";
import Button from "./PrimaryButton";

function InfoCard({ title, description, buttonLabel, onButtonClick }) {
  return (
    <div className="info-card">
      <h1>{title}</h1><br/>
      <h2>{description}</h2><br/>
      <Button label={buttonLabel} onClick={onButtonClick} />
    </div>
  );
}

export default InfoCard;
