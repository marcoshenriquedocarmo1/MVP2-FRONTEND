
import React from "react";
import "./BotaoComprar.css";

function BotaoComprar({ nome, quantidade }) {
  const handleClick = () => {
    alert(`Você comprou ${quantidade}x ${nome}`);
  };

  return (
    <button onClick={handleClick} className="botao-comprar" title={`Clique para comprar ${quantidade}x ${nome}`}>
      Comprar
    </button>
  );
}

export default BotaoComprar;
