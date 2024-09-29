// Função para carregar os produtos do LocalStorage ao iniciar
function loadProducts() {
    const products = JSON.parse(localStorage.getItem('products')) || [];
    products.forEach(product => addProductToList(product.name, product.quantity));
}

// Função para salvar os produtos no LocalStorage
function saveProducts() {
    const products = [];
    document.querySelectorAll('#product-list li').forEach(item => {
        const name = item.querySelector('.product-name').textContent;
        const quantity = parseInt(item.querySelector('.product-quantity').textContent);
        products.push({ name, quantity });
    });
    localStorage.setItem('products', JSON.stringify(products));
}

// Adicionar produto à lista visual e ao armazenamento
function addProductToList(name, quantity) {
    const productList = document.getElementById('product-list');
    const li = document.createElement('li');
    li.innerHTML = `
        <span class="product-name">${name}</span>
        <span class="product-quantity">${quantity}</span>
        <div class="adjust-buttons">
            <button class="increase">+</button>
            <button class="decrease">-</button>
        </div>
        <button class="remove">Remover</button>
    `;
    productList.appendChild(li);
    saveProducts();
}

// Atualizar a quantidade de um produto na lista
function updateProductQuantity(item, delta) {
    const quantityElement = item.querySelector('.product-quantity');
    let quantity = parseInt(quantityElement.textContent);
    quantity += delta;
    if (quantity < 0) quantity = 0; 
    quantityElement.textContent = quantity;
    saveProducts();
}
// Remover produtos
function removeProduct(item) {
    item.remove();
    saveProducts();
}

// Adicionar produtos pelo formulário
document.getElementById('product-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('product-name').value.trim();
    const quantity = parseInt(document.getElementById('product-quantity').value.trim());
    if (name && quantity >= 0) {
        addProductToList(name, quantity);
        document.getElementById('product-name').value = '';
        document.getElementById('product-quantity').value = '';
    }
});

// Manipulação  dos botões de aumentar, diminuir e remover
document.getElementById('product-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('increase')) {
        updateProductQuantity(e.target.parentElement.parentElement, 1);
    } else if (e.target.classList.contains('decrease')) {
        updateProductQuantity(e.target.parentElement.parentElement, -1);
    } else if (e.target.classList.contains('remove')) {
        removeProduct(e.target.parentElement);
    }
});

// Barra de pesquisa de produtos
document.getElementById('search-bar').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    document.querySelectorAll('#product-list li').forEach(item => {
        const name = item.querySelector('.product-name').textContent.toLowerCase();
        if (name.includes(searchText)) {
            item.style.display = '';
        } else {
            item.style.display = 'none';
        }
    });
});

window.addEventListener('load', loadProducts);
