import React, { useEffect, useState, useMemo } from 'react'
import logo from './assets/Logo_Pizzaria.png'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom"
import './App.css'
import InfoCard from "./components/InfoCard.jsx"
import Card_Cardapio from "./components/Card_Cardapio";
import { indexarCardapio, obterResumoPedido, STATUS_COLORS } from "./utils/pedidos"
import NotFound from "./pages/NotFound"
import Cadastro_Component from "./components/Cadastro_Component.jsx"


function Home() {
  
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/cardapio"); // Redireciona para a página de cardápio
  };


  return (
    <div className="home-page">
      <InfoCard
        title="Bem-vindo à Pizzaria!"
        description="Descubra nossas deliciosas pizzas e faça um react exclusivo."
        buttonLabel="Ver Cardápio"
        onButtonClick={handleClick}
        tooltip="Clique para ver o cardápio"
      />
    </div>

  );
}

function Cardapio() {
  const [cardapio, setCardapio] = useState(null);
  
  useEffect(() => {
    fetch("./cardapio.json")
      .then((response) => response.json())
      .then((data) => setCardapio(data));
  }, []);

  if (!cardapio) return <p>Carregando...</p>;

  return (
  <div className="cardapio-page">
      <h1>Cardápio</h1>

      {Object.entries(cardapio).map(([categoria, itens]) => (
        <div key={categoria}>
          <h2 style={{ marginTop: "30px" }}>{categoria.toUpperCase()}</h2>
          <div className="grid-container">
            {itens.map((item, index) => (
              <Card_Cardapio key={index} {...item} />
            ))}
          </div>
        </div>
      ))}
  </div>);


}

function Pedidos() {

  const [cardapio, setCardapio] = useState(null);
  const [pedidos, setPedidos] = useState([]);

  
  useEffect(() => {
    Promise.all([
      fetch("/cardapio.json").then((r) => r.json()),
      fetch("/pedidos.json").then((r) => r.json()),
    ]).then(([cardapioData, pedidosData]) => {
      setCardapio(cardapioData);
      setPedidos(pedidosData.pedidos || []);
    });
  }, []);


  const mapaCardapio = useMemo(() => {
      if (!cardapio) return new Map();
      return indexarCardapio(cardapio);
    }, [cardapio]);

  if (!cardapio) return <div className="pedidos-loading">Carregando pedidos...</div>;
  if (pedidos.length === 0) return <p>Nenhum pedido encontrado.</p>;

  return (
      <div className="pedidos-page">
        <header className="pedidos-header">
          <h1>Pedidos</h1>
        </header>

        <section className="pedidos-grid">
          {pedidos.map((p) => {
            const resumo = obterResumoPedido(p, mapaCardapio);

            return (
              <article key={resumo.numeroPedido} className="pedido-card">
                <div className="pedido-card-top">
                  <h3 className="pedido-titulo">Pedido #{resumo.numeroPedido}</h3>
                  <span
                    className="status-badge"
                    style={{
                      backgroundColor: STATUS_COLORS[resumo.status] || "#616161",
                    }}
                  >
                    {resumo.status}
                  </span>
                </div>


                <ul className="pedido-itens">
                  {resumo.itens.map((it) => (
                    <li key={it.id} className="pedido-item">
                      <div className="pedido-item-info">
                        <strong className="pedido-item-nome">{it.nome}</strong>
                        <span className="pedido-item-quantidade">
                          Quantidade: {it.quantidade}
                        </span>
                        <span className="pedido-item-preco-unitario">
                          Preço unitário: R$ {it.preco.toFixed(2)}
                        </span>
                      </div>

                      {/* Subtotal (preço x quantidade) */}
                      <div className="pedido-item-subtotal">
                        Subtotal: <strong>R$ {it.subtotal.toFixed(2)}</strong>
                      </div>
                    </li>
                  ))}
                </ul>


                <div className="pedido-total">
                  <span>Total:</span>
                  <strong>R$ {resumo.total.toFixed(2)}</strong>
                </div>
              </article>
            );
          })}
        </section>
      </div>
    );

}

function Cadastro() {
  return (
    <>
      <Cadastro_Component />
    </>
  );
}


function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };


  return (
    <>
    <Router>
      <div className="app-container">
        {/* Botão para mobile */}
        <button className="menu-toggle" onClick={toggleMenu}>
          ☰ Menu
        </button>
        {/* Menu lateral */}
        <nav className={`sidebar ${menuOpen ? "open" : ""}`}>
          
        <div className="logo">
          <img src={logo} alt="Logo Pizzaria" />
        </div>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/cardapio">Cardápio</Link></li>
            <li><Link to="/pedidos">Pedidos</Link></li>
            <li><Link to="/cadastro">Cadastro</Link></li>
          </ul>
        </nav>
        {/* Conteúdo principal */}
        <div className="content">          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cardapio" element={<Cardapio />} />
            <Route path="/pedidos" element={<Pedidos />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </Router>

    </>
  )
}

export default App
