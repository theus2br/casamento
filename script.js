// Arrays para armazenar dados
const fornecedores = [];
const preferidos = [];

const fornecedorForm = document.getElementById("fornecedorForm");
const tabelaFornecedores = document.getElementById("tabelaFornecedores");
const tabelaPreferidos = document.getElementById("tabelaPreferidos");
const tabelaOrcamento = document.getElementById("tabelaOrcamento");
const custoTotal = document.getElementById("custoTotal");
const filtroCategoria = document.getElementById("filtroCategoria");

// Função para cadastrar fornecedor
fornecedorForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const categoria = document.getElementById("categoria").value;
  const nomeFornecedor = document.getElementById("nomeFornecedor").value;
  const preco = parseFloat(document.getElementById("preco").value);
  const contato = document.getElementById("contato").value;
  const observacoes = document.getElementById("observacoes").value;

  const fornecedor = {
    categoria,
    nomeFornecedor,
    preco,
    contato,
    observacoes
  };

  fornecedores.push(fornecedor);
  atualizarTabelaFornecedores();
  fornecedorForm.reset();
});

// Atualizar tabela de fornecedores
function atualizarTabelaFornecedores() {
tabelaFornecedores.innerHTML = fornecedores
  .filter(fornecedor => {
    const categoriaFiltro = filtroCategoria.value;
    return categoriaFiltro ? fornecedor.categoria === categoriaFiltro : true;
  })
  .map((item, index) => `
    <tr>
      <td>${index + 1}</td>
      <td>${item.categoria}</td>
      <td>${item.nomeFornecedor}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
      <td>${item.contato}</td>
      <td><button class="btn btn-primary btn-sm" onclick="adicionarAosPreferidos(${fornecedores.findIndex(f => f === item)})">Selecionar</button></td>
    </tr>
  `).join("");
}


// Adicionar aos preferidos
function adicionarAosPreferidos(index) {
    preferidos.push(fornecedores[index]);
    atualizarTabelaPreferidos();
}


// Atualizar tabela de preferidos
function atualizarTabelaPreferidos() {
  tabelaPreferidos.innerHTML = preferidos.map(item => `
    <tr>
      <td>${item.categoria}</td>
      <td>${item.nomeFornecedor}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
      <td><button class="btn btn-danger btn-sm" onclick="removerDosPreferidos(${preferidos.indexOf(item)})">Remover</button></td>
    </tr>
  `).join("");
  atualizarOrcamentoFinal();
}

// Remover dos preferidos
function removerDosPreferidos(index) {
  preferidos.splice(index, 1);
  atualizarTabelaPreferidos();
}

// Atualizar orçamento final
function atualizarOrcamentoFinal() {
  tabelaOrcamento.innerHTML = preferidos.map(item => `
    <tr>
      <td>${item.categoria}</td>
      <td>${item.nomeFornecedor}</td>
      <td>R$ ${item.preco.toFixed(2)}</td>
    </tr>
  `).join("");

  const total = preferidos.reduce((sum, item) => sum + item.preco, 0);
  custoTotal.textContent = `R$ ${total.toFixed(2)}`;
}

// Filtrar por categoria
function filtrarPorCategoria() {
  atualizarTabelaFornecedores();
}