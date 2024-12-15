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

// Função para msotrar a barra de buscar
const sTrigger = document.querySelector(".s-trigger");
const addclass = document.querySelector(".menu");
sTrigger.addEventListener("click", () => {
  addclass.classList.toggle("showsearch");
});

// Adicione um listener para mudanças no localStorage
window.addEventListener("storage", function (e) {
  if (e.key === "cart") {
    updateCartCount();
  }
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

// Função para atualizar o carrinho
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

// Função para remover item do carrinho
function removeFromCart(product) {
  const updatedCart = updateCart(product, "remove");
  if (updatedCart.find((item) => item.name === product.name)) {
    alert("Quantidade do produto reduzida!");
  } else {
    alert("Produto removido do carrinho!");
  }
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
  updateCartCount();
  alert("Produto adicionado ao carrinho!");
}

// Função para buscar e mostrar os resultados
document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.querySelector('input[type="search"]');
  const searchResultsContainer = document.getElementById("search-results");
  const items = document.querySelectorAll(".item");

  searchInput.addEventListener("input", function () {
    const query = searchInput.value.toLowerCase();
    searchResultsContainer.innerHTML = ""; // Limpa os resultados anteriores

    if (query) {
      items.forEach((item) => {
        const itemName = item.querySelector("h2 a").textContent.toLowerCase();
        const itemCategory = item
          .querySelector(".cat a")
          .textContent.toLowerCase();
        const itemImage = item.querySelector("img").src;
        const itemPrice = item.querySelector(".price .current").textContent;

        if (itemName.includes(query) || itemCategory.includes(query)) {
          const resultItem = document.createElement("div");
          resultItem.classList.add("result-item");
          resultItem.innerHTML = `

                      <div>
                        <a href="#">
                            <img src="${itemImage}" alt="${itemName}">
                        </a>
                      </div>
                      <div class"item-name">
                        <h2>${itemName}</h2>
                      </div>
                      <div class"item-category">
                        <span>Categoria: <strong>${itemCategory}</strong></span>
                      </div>
                      <div class"item-price">
                        <span>Preço: <strong>${itemPrice}</strong></span>
                      </div>
                      <div class="buttons">
                        <button data-name="${itemName}" data-price="${itemPrice}"
                          data-image="${itemImage}">
                          Adicionar no carrinho
                        </button>
                        <a href="cart.html" referrerpolicy="no-referrer" class="cart-icon-page">
                          <i class="ri-shopping-cart-line"></i>
                        </a>
                      </div>
                        
                    `;
          searchResultsContainer.appendChild(resultItem);
        }
      });
    }
  });
});

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
