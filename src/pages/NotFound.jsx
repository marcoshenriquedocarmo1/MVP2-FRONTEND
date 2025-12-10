
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NotFound.css";
import InfoCard from "../components/InfoCard.jsx";

function NotFound() {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cardapio"); // Redireciona para a página de cardápio
  };

  return (
    <div className="notfound-page">
      <InfoCard
        title="404! 🍕"
        description="Ops! Página não encontrada! A página que você tentou acessar não existe ou foi movida."
        buttonLabel="Voltar ao Cardápio"
        onButtonClick={handleClick}
      />
    </div>
  );
}

export default NotFound;
