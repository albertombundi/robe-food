// função para atualizar a contagem dos produtos em tempo real
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");

  if (cartCountElement) {
    cartCountElement.textContent = count;

    // Adiciona a animação
    cartCountElement.classList.add("pulse");
    setTimeout(() => {
      cartCountElement.classList.remove("pulse");
    }, 300);
  }
}

// Adicione um listener para mudanças no localStorage
window.addEventListener("storage", function (e) {
  if (e.key === "cart") {
    updateCartCount();
  }
});

function updateCart(product, action) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex(
    (item) => item.name === product.name
  );
  if (existingProductIndex !== -1) {
    if (action === "remove") {
      cart[existingProductIndex].quantity -= 1;
      if (cart[existingProductIndex].quantity <= 0) {
        cart.splice(existingProductIndex, 1);
      }
    } else if (action === "add") {
      cart[existingProductIndex].quantity += 1;
    }
  } else if (action === "add") {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  return cart;
}

// Event listener para os botões "Adicionar no carrinho"
document.querySelectorAll(".buttons button").forEach((button) => {
  button.addEventListener("click", function () {
    const productElement = this.closest(".item");
    const product = {
      name: productElement.querySelector("h2 a").textContent,
      image: productElement.querySelector(".thumbnail img").src,
      description: productElement.querySelector(".meta .catrate .cat a")
        .textContent,
      price: productElement.querySelector(".price .current").textContent,
    };
    addToCart(product);
  });
});

// Função para adicionar item ao carrinho
function addToCart(product) {
  updateCart(product, "add");
  updateCartCount(); // Adicione esta linha
  alert("Produto adicionado ao carrinho!");
}

// Função que permite mandar os item pagina cart.html
document.addEventListener("DOMContentLoaded", function () {
  const addToCartButtons = document.querySelectorAll(".add-to-cart");
  addToCartButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const product = {
        name: this.dataset.name,
        price: this.dataset.price,
        image: this.dataset.image,
        quantity: 1,
      };

      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProductIndex = cart.findIndex(
        (item) => item.name === product.name
      );

      if (existingProductIndex !== -1) {
        cart[existingProductIndex].quantity += 1;
      } else {
        cart.push(product);
      }

      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Produto adicionado ao carrinho!");
    });
  });
});

// Chama esta função quando a página carregar
document.addEventListener("DOMContentLoaded", updateCartCount);
const divtoShow = "nav .menu";
const divPopup = document.querySelector(divtoShow);
const divTrigger = document.querySelector(".m-trigger");

divTrigger.addEventListener("click", () => {
  setTimeout(() => {
    if (!divPopup.classList.contains("show")) {
      divPopup.classList.add("show");
      document.body.classList.add("menu-visible");
    }
  }, 250);
});

//---Fecha automaticamente ao clicar fora dele
document.addEventListener("click", (e) => {
  const isClosest = e.target.closest(divtoShow);

  if (!isClosest && divPopup.classList.contains("show")) {
    divPopup.classList.remove("show");
    document.body.classList.remove("menu-visible");
  }
});
//------------Pesquisar
const sTrigger = document.querySelector(".s-trigger");
const addclass = document.querySelector(".site");
sTrigger.addEventListener("click", () => {
  addclass.classList.toggle("showsearch");
});

//--------SLIDER
const sliderThumb = new Swiper(".thumb-nav", {
  spaceBetween: 10,
  slidesPerView: 3,
  slidesPerGroup: false,
  breakpoints: {
    992: {
      direction: "vertical",
    },
  },
});
const theSlider = new Swiper(".thumb-big", {
  slidePerView: 1,
  pagination: {
    el: ".swiper-pagination",
  },
  thumbs: {
    swiper: sliderThumb,
  },
});

//--------TABBED PRODUCTS
const tabbedNav = new Swiper(".tnav", {
  spaceBetween: 20,
  slidesPerView: 6,
  centeredSlides: true,
  slidesPerGroup: false,
});
const theTab = new Swiper(".tabbed-item", {
  loop: true,
  slidePerView: 1,
  autoHeight: true,
  thumbs: {
    swiper: tabbedNav,
  },
});

//---------------Transição ao fazer o scroll
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.intersectionRatio > 0) {
      entry.target.classList.add("this");
    }
  });
});

const box = document.querySelectorAll(".animate");
box.forEach((el) => {
  io.observe(el);
});














// Lista de itens com URLs adicionadas
const items = [
  { 
      id: 1, 
      name: "Pizza de Calabresa", 
      category: "Pizzas", 
      price: 45.00, 
      image: "https://example.com/pizza-calabresa.jpg",
      url: "produto.html?id=1" 
  },
  { 
      id: 2, 
      name: "Hambúrguer Gourmet", 
      category: "Lanches", 
      price: 25.00, 
      image: "https://example.com/hamburguer-gourmet.jpg",
      url: "produto.html?id=2" 
  },
  { 
      id: 3, 
      name: "Sushi Variado", 
      category: "Sushi", 
      price: 80.00, 
      image: "https://example.com/sushi-variado.jpg",
      url: "produto.html?id=3" 
  },
  { 
      id: 4, 
      name: "Lasanha à Bolonhesa", 
      category: "Massas", 
      price: 50.00, 
      image: "https://example.com/lasanha-bolonhesa.jpg",
      url: "produto.html?id=4" 
  },
  { 
      id: 5, 
      name: "Salada Caesar", 
      category: "Saladas", 
      price: 20.00, 
      image: "https://example.com/salada-caesar.jpg",
      url: "produto.html?id=5" 
  },
];

// Elementos do DOM
const searchInput = document.getElementById("search-input");
const resultsContainer = document.createElement("div");
resultsContainer.classList.add("search-results");

// Adiciona o container de resultados ao formulário
document.querySelector("form.search").appendChild(resultsContainer);

// Função para mostrar os resultados
function showSearchResults(query) {
  resultsContainer.innerHTML = ""; // Limpa resultados anteriores

  if (!query.trim()) {
      resultsContainer.style.display = "none"; // Esconde se vazio
      return;
  }

  // Filtra itens com base no texto digitado
  const filteredItems = items.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase())
  );

  if (filteredItems.length === 0) {
      resultsContainer.innerHTML = "<p>Nenhum resultado encontrado.</p>";
  } else {
      // Gera resultados com detalhes
      const list = document.createElement("div");
      list.classList.add("item-list");
      filteredItems.forEach(item => {
          const itemContainer = document.createElement("div");
          itemContainer.classList.add("item");

          const image = document.createElement("img");
          image.src = item.image;
          image.alt = item.name;

          const name = document.createElement("h4");
          name.textContent = item.name;

          const category = document.createElement("p");
          category.textContent = `Categoria: ${item.category}`;

          const price = document.createElement("p");
          price.textContent = `Preço: R$ ${item.price.toFixed(2)}`;

          // Adiciona redirecionamento ao clicar no item
          itemContainer.addEventListener("click", () => {
              window.location.href = item.url;
          });

          itemContainer.appendChild(image);
          itemContainer.appendChild(name);
          itemContainer.appendChild(category);
          itemContainer.appendChild(price);

          list.appendChild(itemContainer);
      });
      resultsContainer.appendChild(list);
  }

  resultsContainer.style.display = "block"; // Mostra resultados
}

// Evento para capturar entrada de texto
searchInput.addEventListener("input", (event) => {
  const query = event.target.value;
  showSearchResults(query);
});

// Estilo básico para exibição
const style = document.createElement("style");
style.textContent = `
  .search-results {
      position: absolute;
      background: #fff;
      border: 1px solid #ccc;
      padding: 10px;
      width: 100%;
      max-height: 300px;
      overflow-y: auto;
      z-index: 1000;
      display: none;
  }
  .search-results .item-list {
      display: flex;
      flex-direction: column;
      gap: 10px;
  }
  .search-results .item {
      display: flex;
      gap: 15px;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding: 10px;
      cursor: pointer;
      transition: background-color 0.2s;
  }
  .search-results .item:hover {
      background: #f0f0f0;
  }
  .search-results .item img {
      width: 50px;
      height: 50px;
      border-radius: 5px;
      object-fit: cover;
  }
  .search-results .item h4 {
      margin: 0;
      font-size: 16px;
  }
  .search-results .item p {
      margin: 0;
      font-size: 14px;
      color: #555;
  }
`;
document.head.appendChild(style);
