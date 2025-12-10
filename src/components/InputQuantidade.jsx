
import React from "react";
import "./InputQuantidade.css";

function InputQuantidade({ quantidade, setQuantidade }) {
  const handleChange = (e) => {
    const valor = parseInt(e.target.value);
    if (valor >= 1) {
      setQuantidade(valor);
    }
  };

  return (
    <input
      type="number"
      min="1"
      value={quantidade}
      onChange={handleChange}
      className="input-quantidade"
    />
  );
}

export default InputQuantidade;
