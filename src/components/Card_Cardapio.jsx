
import React, { useState } from "react";
import InputQuantidade from "./InputQuantidade";
import BotaoComprar from "./BotaoComprar";
import "./Card_Cardapio.css";

function Card_Cardapio({ nome, preco, imagem, ingredientes }) {
  const [quantidade, setQuantidade] = useState(1);
  return (
    <div className="card-cardapio">
      <img src={imagem} alt={nome} />
      <h3>{nome}</h3>
      <p className="price">R$ {preco.toFixed(2)}</p>
      {ingredientes && (
        <p className="ingredients">Ingredientes: {ingredientes.join(", ")}</p>
      )}
      
      <div className = "controle">
        <InputQuantidade quantidade={quantidade} setQuantidade={setQuantidade} />
        <BotaoComprar nome={nome} quantidade={quantidade} />
      </div>
    </div>
  );
}

export default Card_Cardapio;

