// Contagem de elementos no carrinho de compras
function countItems(items) {
  const countCart = document.querySelector('.cart_counter');
  countCart.innerHTML = items.length;
}

// Atualizar preço total do carrinho de compras
function updateTotalPrice() {
  const data = JSON.parse(getSavedCartItems());
  const totalPrice = document.querySelector('.total-price');
  if (data) {
    const result = data.reduce((acc, curr) => (acc + curr.price), 0);
    totalPrice.innerHTML = `Valor Total: R$ ${result}`;
  } else {
    totalPrice.innerHTML = `Valor Total: R$ ${0}`;
  }
}

// Carrega elemento de loading na requisição da API
function loadingRequest() {
  const patternSection = document.querySelector('.items');
  const span = document.createElement('span');
  span.classList = 'loading';
  span.innerHTML = 'carregando...';
  patternSection.appendChild(span);
}

// Apaga elemento loading
function finishLoadElement() {
  const span = document.querySelector('.loading');
  span.remove();
}

function saveLocalStorage(cartItem) {
  const currentData = getSavedCartItems();
  if (currentData) {
    const currentValues = JSON.parse(currentData);
    currentValues.push(cartItem);
    saveCartItems(JSON.stringify(currentValues));
    countItems(currentValues);
  } else {
    const arr = [cartItem];
    saveCartItems(JSON.stringify(arr));
    countItems(arr);
  }
  updateTotalPrice();
}

/**
 * Função responsável por criar e retornar o elemento de imagem do produto.
 * @param {string} imageSource - URL da imagem.
 * @returns {Element} Elemento de imagem do produto.
 */
const createProductImageElement = (imageSource, className) => {
  const img = document.createElement('img');
  img.className = className;
  img.src = imageSource;
  return img;
};

/**
 * Função responsável por criar e retornar qualquer elemento.
 * @param {string} element - Nome do elemento a ser criado.
 * @param {string} className - Classe do elemento.
 * @param {string} innerText - Texto do elemento.
 * @returns {Element} Elemento criado.
 */
const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

/**
 * Função responsável por criar e retornar o elemento do produto.
 * @param {Object} product - Objeto do produto. 
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.thumbnail - URL da imagem do produto.
 * @returns {Element} Elemento de produto.
 */
const createProductItemElement = ({ id, title, price , thumbnail }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item_id', id));
  section.appendChild(createProductImageElement(thumbnail, 'item__image'));
  section.appendChild(createCustomElement('span', 'item__title', title));
  section.appendChild(createCustomElement('span', 'item__price', `R$ ${price}`));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

/**
 * Função que recupera o ID do produto passado como parâmetro.
 * @param {Element} product - Elemento do produto.
 * @returns {string} ID do produto.
 */
const getIdFromProductItem = (product) => product.querySelector('.item_id').innerText;

// Remover produto da lista do carrinho de compras
const cartItemClickListener = (event) => {
  const data = JSON.parse(getSavedCartItems());
  const result = data.filter((product) => product.id !== event.target.parentElement.id);
  saveCartItems(JSON.stringify(result));
  event.target.parentElement.remove();
  countItems(result);
  updateTotalPrice();
};

/**
 * Função responsável por criar e retornar um item do carrinho.
 * @param {Object} product - Objeto do produto.
 * @param {string} product.id - ID do produto.
 * @param {string} product.title - Título do produto.
 * @param {string} product.price - Preço do produto.
 * @returns {Element} Elemento de um item do carrinho.
 */
const createCartItemElement = ({ thumbnail, id, title, price }) => {
  const li = document.createElement('li');
  const img = createProductImageElement(thumbnail, 'item_cart_image');
  const divSpan = createCustomElement('div', 'divSpan', '');
  const spanTitle = createCustomElement('span', 'cart_title', title);
  const spanPrice = createCustomElement('span', 'cart_price', `R$ ${price}`);
  const removeProd = createCustomElement('div', 'removeProd', 'X');
  divSpan.appendChild(spanTitle);
  divSpan.appendChild(spanPrice);
  li.className = 'cart__item';
  li.id = id;
  li.appendChild(img);
  li.appendChild(divSpan);
  li.appendChild(removeProd);
  // li.innerText = `ID: ${id} | TITLE: ${title} | PRICE: R$ ${price}`;
  removeProd.addEventListener('click', cartItemClickListener);
  return li;
};

// Seleciona o botão no elemento do produto
const selectElement = async (event) => {
  const btnClick = event.target;
  if (!btnClick.matches('.item__add')) return;
  const ul = document.querySelector('.cart__items');
  const id = getIdFromProductItem(btnClick.parentElement);
  const product = await fetchItem(id);

  ul.appendChild(createCartItemElement(product));
  saveLocalStorage(product);
};

function clearList() {
  const lis = document.querySelectorAll('.cart__item');
  lis.forEach((li) => {
    li.remove();
  });
  localStorage.removeItem('cartItems');
  countItems('');
  updateTotalPrice();
}

const loadCartStorage = () => {
  const data = getSavedCartItems();
  const ul = document.querySelector('.cart__items');
  if (data) {
    const products = JSON.parse(data);
    products.forEach(async (product) => {
      ul.appendChild(createCartItemElement(product));
    });
    countItems(products);
    updateTotalPrice();
  }

};

// FIX: Quando adiciona dois valores iguais e depois apaga um desses valores, os dois valores são excluidos juntos do LocalStorage 
window.onload = async () => {
  // Carregar carrinho do localStorage
  loadCartStorage();

  // adicionar produtos ao carrinho
  const itemsPattern = document.querySelector('.items');
  itemsPattern.addEventListener('click', selectElement);

  // Remover todos os itens do carrinho
  const btnCleanList = document.querySelector('.empty-cart');
  btnCleanList.addEventListener('click', clearList);

  // Criar dinamicamente cada item produto
  loadingRequest();
  const apiDataList = await fetchProducts('computador')
    .then((response) => {
      finishLoadElement();
      return response;
    });
  apiDataList.results.forEach((computer) => {
    itemsPattern.appendChild(createProductItemElement(computer));
  });
};
