/*// Função para adicionar um produto ao carrinho
function adicionarAoCarrinho(nome, valor) {
    // Obtenha o carrinho atual do localStorage (ou um array vazio, caso não exista)
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Crie o produto a ser adicionado
    let produto = { nome: nome, valor: valor };

    // Adicione o produto ao array do carrinho
    carrinho.push(produto);

    // Atualize o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify(carrinho));

    alert(`${nome} foi adicionado ao carrinho!`);
}*/

function adicionarAoCarrinho(nome, valor) {
    // Obter carrinho e produtos disponíveis do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let produtosDisponiveis = JSON.parse(localStorage.getItem('produtosDisponiveis'));

    // Encontrar o produto e verificar quantidade
    const produto = produtosDisponiveis.find(p => p.nome === nome);
    if (produto && produto.quantidade > 0) {
        // Diminuir quantidade disponível
        produto.quantidade -= 1;

        // Adicionar ao carrinho
        carrinho.push({ nome: nome, valor: valor });
        localStorage.setItem('carrinho', JSON.stringify(carrinho));

        // Atualizar produtos disponíveis no localStorage
        localStorage.setItem('produtosDisponiveis', JSON.stringify(produtosDisponiveis));

        alert(`${nome} foi adicionado ao carrinho!`);
    } else {
        alert(`Desculpe, ${nome} está fora de estoque.`);
    }
}

// Função para exibir os produtos do carrinho na página "Minhas Compras"
function exibirCarrinho() {
    const comprasDiv = document.querySelector('.minhascompras');

    // Obtenha o carrinho do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Limpe o conteúdo atual
    comprasDiv.innerHTML = '<h2>Minhas compras</h2>';

    // Verifique se o carrinho está vazio
    if (carrinho.length === 0) {
        comprasDiv.innerHTML += '<p>Seu carrinho está vazio.</p>';
        return;
    }

    // Exiba cada produto no carrinho
    carrinho.forEach(produto => {
        comprasDiv.innerHTML += `
            <div class="produto">
                <h3>${produto.nome}</h3>
                <p>Valor: R$${produto.valor}</p>
            </div>
        `;
    });
}

function exibirCarrinho() {
    const comprasDiv = document.querySelector('.minhascompras');
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    comprasDiv.innerHTML = '<h2>Minhas compras</h2>';

    if (carrinho.length === 0) {
        comprasDiv.innerHTML += '<p>Seu carrinho está vazio.</p>';
        return;
    }

    carrinho.forEach((produto, index) => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produto');
        produtoDiv.innerHTML = `
            <h3>${produto.nome}</h3>
            <p>Valor: R$${produto.valor}</p>
            <button onclick="removerDoCarrinho(${index})">Remover</button>
        `;
        comprasDiv.appendChild(produtoDiv);
    });
}

function removerDoCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    let produtosDisponiveis = JSON.parse(localStorage.getItem('produtosDisponiveis'));

    // Remover o item do carrinho e obter informações do produto
    const [produtoRemovido] = carrinho.splice(index, 1);

    // Atualizar a quantidade disponível no estoque
    const produto = produtosDisponiveis.find(p => p.nome === produtoRemovido.nome);
    if (produto) {
        produto.quantidade += 1;
    }

    // Atualizar o localStorage com o novo carrinho e produtos disponíveis
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    localStorage.setItem('produtosDisponiveis', JSON.stringify(produtosDisponiveis));

    // Reexibir o carrinho após a remoção
    exibirCarrinho();
}

function exibirProdutosDisponiveis() {
    const produtosContainer = document.querySelector('.todosProdutos');
    produtosContainer.innerHTML = '';

    const produtosDisponiveis = JSON.parse(localStorage.getItem('produtosDisponiveis')) || [];

    produtosDisponiveis.forEach(produto => {
        const produtoDiv = document.createElement('div');
        produtoDiv.classList.add('produtos');
        produtoDiv.innerHTML = `
            <h4>${produto.nome}</h4>
            <img src="../img/imgemProdutos/smartphone.jpg" alt="">
            <p>Preço: R$${produto.valor}</p>
            <p>Quantidade disponível: ${produto.quantidade}</p>
            <button onclick="adicionarAoCarrinho('${produto.nome}', ${produto.valor})">Adicionar ao carrinho</button>
        `;
        produtosContainer.appendChild(produtoDiv);
    });
}

function comprar() {
    // Obter o carrinho atual do localStorage
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];

    // Verificar se o carrinho está vazio
    if (carrinho.length === 0) {
        alert('Seu carrinho está vazio. Adicione produtos para realizar a compra.');
        return;
    }

    // Obter a forma de pagamento selecionada
    const pagamentoSelecionado = document.querySelector('input[name="pagamento"]:checked').value;

    // Mensagem de confirmação
    alert(`Compra realizada com sucesso usando ${pagamentoSelecionado}!`);

    // Esvaziar o carrinho no localStorage
    localStorage.setItem('carrinho', JSON.stringify([]));

    // Atualizar a exibição do carrinho
    exibirCarrinho();
}

document.addEventListener("DOMContentLoaded", function() {
    exibirCarrinho();  // Certifique-se de que esta função é chamada quando o DOM estiver pronto
});

// Chame esta função quando a página index.html for carregada
if (window.location.pathname.includes('index.html')) {
    exibirProdutosDisponiveis();
}

// Chame a função exibirCarrinho quando a página "Minhas Compras" for carregada
if (window.location.pathname.includes('minhascompras.html')) {
    exibirCarrinho();
}

// Inicializar produtos com quantidade disponível (execute uma vez)
if (!localStorage.getItem('produtosDisponiveis')) {
    const produtosDisponiveis = [
        { nome: 'Iphone', valor: 100, quantidade: 10 },
        // Adicione outros produtos aqui se necessário
        { nome: 'Samsung', valor: 80, quantidade: 20 },
    ];
    localStorage.setItem('produtosDisponiveis', JSON.stringify(produtosDisponiveis));
}