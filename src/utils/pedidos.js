export function indexarCardapio(cardapio) {
  const mapa = new Map();

  if (!cardapio || typeof cardapio !== "object") return mapa;

  // Percorre categorias do cardápio (entradas, pizzas, pizzas_doces)
  for (const categoria of Object.values(cardapio)) {
    if (!Array.isArray(categoria)) continue;
    for (const item of categoria) {
      if (item && item.id) {
        mapa.set(item.id, item);
      }
    }
  }

  return mapa;
}

/**
 * Calcula o valor total do pedido somando (preço * quantidade) para cada item.
 * Se algum item não existir no cardápio, considera preço 0.
 */
export function calcularTotalPedido(pedido, mapaCardapio) {
  if (!pedido || !Array.isArray(pedido.itens)) return 0;

  return pedido.itens.reduce((acc, it) => {
    const item = mapaCardapio.get(it.itemId);
    const preco = item ? Number(item.preco) || 0 : 0;
    const qtd = Number(it.quantidade) || 0;
    return acc + preco * qtd;
  }, 0);
}

/**
 * Retorna uma lista de itens do pedido com dados do cardápio resolvidos:
 * [{ id, nome, preco, imagem, quantidade, subtotal }]
 */
export function mapearItensDoPedido(pedido, mapaCardapio) {
  if (!pedido || !Array.isArray(pedido.itens)) return [];

  return pedido.itens.map((it) => {
    const item = mapaCardapio.get(it.itemId);
    const preco = item ? Number(item.preco) || 0 : 0;
    const quantidade = Number(it.quantidade) || 0;

    return {
      id: it.itemId,
      nome: item ? item.nome : `Item desconhecido (${it.itemId})`,
      preco,
      imagem: item ? item.imagem : undefined,
      quantidade,
      subtotal: +(preco * quantidade).toFixed(2),
      ingredientes: item && item.ingredientes ? item.ingredientes : undefined,
    };
  });
}

/**
 * Gera um resumo amigável do pedido:
 */
export function obterResumoPedido(pedido, mapaCardapio) {
  const itensDetalhados = mapearItensDoPedido(pedido, mapaCardapio);
  const total = calcularTotalPedido(pedido, mapaCardapio);
  return {
    numeroPedido: pedido?.numeroPedido,
    status: pedido?.status,
    itens: itensDetalhados,
    total: +total.toFixed(2),
  };
}

/**
 * (Opcional) Valida estrutura mínima do cardápio e do pedido.
 */
export function validarDados(cardapio, pedido) {
  const erros = [];

  // Validação básica do cardápio
  const categorias = ["entradas", "pizzas", "pizzas_doces"];
  for (const cat of categorias) {
    if (!Array.isArray(cardapio?.[cat])) {
      erros.push(`Cardápio inválido: categoria '${cat}' não é uma lista.`);
    } else {
      for (const item of cardapio[cat]) {
        if (!item?.id || !item?.nome || typeof item?.preco !== "number") {
          erros.push(`Item inválido em '${cat}': precisa de { id, nome, preco }.`);
        }
      }
    }
  }

  // Validação básica do pedido
  if (typeof pedido?.numeroPedido !== "number") {
    erros.push("Pedido inválido: 'numeroPedido' deve ser numérico.");
  }
  if (!Array.isArray(pedido?.itens) || pedido.itens.length === 0) {
    erros.push("Pedido inválido: 'itens' deve ser uma lista não vazia.");
  } else {
    for (const it of pedido.itens) {
      if (!it?.itemId || typeof it?.quantidade !== "number") {
        erros.push("Item de pedido inválido: requer { itemId, quantidade }.");
      }
    }
  }
  if (!["Pedido Recebido", "Em Preparação", "Concluido"].includes(pedido?.status)) {
    erros.push("Pedido inválido: 'status' deve ser 'Pedido Recebido', 'Em Preparação' ou 'Concluido'.");
  }

  return { valido: erros.length === 0, erros };
}

/**
 * (Opcional) Mapa de cores por status para badges
 */
export const STATUS_COLORS = {
  "Pedido Recebido": "#1976d2",
  "Em Preparação": "#f57c00",
  "Concluido": "#2e7d32",
};
