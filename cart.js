window.addEventListener("storage", function (e) {
  if (e.key === "cart") {
    calculateCartTotals();
  }
});// Chama esta função quando a página carregar
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

const sTrigger = document.querySelector(".s-trigger");
const addclass = document.querySelector(".cart");
sTrigger.addEventListener("click", () => {
  addclass.classList.toggle("showsearch");
});

// Função que recebe os itens a partir do page-menu e exibe os produtos dentro do corpo da tabela do cart (tbody)
document.addEventListener("DOMContentLoaded", function () {
  const cartTableBody = document.querySelector("#cart-table tbody");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function renderCart() {
    cartTableBody.innerHTML = "";
    cart.forEach((product, index) => {
      const TableRow = document.createElement("tr");
      TableRow.innerHTML = `
                <td class="flexitem">
                    <div class="thumbnail">
                        <a href="#"><img src="${product.image}" alt=""></a>
                    </div>
                    <div class="content">
                        <strong><a href="#">${product.name}</a></strong>
                    </div>
                </td>
                <td>${product.price}</td>
                <td>
                    <div class="qty-control flexitem">
                        <button class="minus" data-index="${index}" aria-label="Reduce quantity">-</button>
                        <input type="text" value="${
                          product.quantity
                        }" min="1" name="quantity" class="quantity-input" data-index="${index}" readonly>
                        <button class="plus" data-index="${index}" aria-label="Increase quantity">+</button>
                    </div>
                </td>
                <td class="subtotal">${(
                  parseFloat(product.price.replace("$", "")) * product.quantity
                ).toFixed(2)}</td>
                <td><a href="#" class="item-remove" data-index="${index}"><i class="ri-close-line"></i></a></td>
            `;

      cartTableBody.appendChild(TableRow);
    });

    updateTotalPrice();
  }

  function updateTotalPrice() {
    const total = cart.reduce((sum, product) => {
      return (
        sum + parseFloat(product.price.replace("$", "")) * product.quantity
      );
    }, 0);
    document.querySelector(".total-price").textContent = `$${total.toFixed(2)}`;
  }

  function updateCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    calculateCartTotals(); // Adicione esta linha
  }

  function removeProduct(index) {
    if (cart[index].quantity > 1) {
      cart[index].quantity--;
    } else {
      cart.splice(index, 1);
    }
    updateCart();
  }

  cartTableBody.addEventListener("click", function (e) {
    if (e.target.closest("[data-index]")) {
      const index = parseInt(e.target.closest("[data-index]").dataset.index);

      if (e.target.classList.contains("minus")) {
        removeProduct(index);
      } else if (e.target.classList.contains("plus")) {
        cart[index].quantity++;
        updateCart();
      } else if (e.target.closest(".item-remove")) {
        removeProduct(index);
      }
    }
  });

  // Observar mudanças no localStorage
  window.addEventListener("storage", function (e) {
    if (e.key === "cart") {
      cart = JSON.parse(e.newValue);
      renderCart();
    }
  });

  renderCart();
});
function calculateCartTotals() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const deliveryFee = 100.00; // Taxa de entrega fixa
  const discount = 10.0; // Desconto fixo

  let subtotal = 0;

  // Calcula o subtotal
  cart.forEach((item) => {
    subtotal += parseFloat(item.price.replace("$", "")) * item.quantity; // Modificado para usar parseFloat
  });

  // Calcula o total
  const total = subtotal - discount + deliveryFee;

  // Atualiza o HTML com os valores calculados
  document.querySelector(
    ".cart-total tbody tr:nth-child(1) td"
  ).textContent = `$${subtotal.toFixed(2)}`;
  document.querySelector(
    ".cart-total tbody tr:nth-child(2) td"
  ).textContent = `$${discount.toFixed(2)}`;
  document.querySelector(
    ".cart-total tbody tr:nth-child(3) td"
  ).textContent = `$${deliveryFee.toFixed(2)}`;
  document.querySelector(
    ".cart-total tbody tr.grand-total td strong"
  ).textContent = `$${total.toFixed(2)}`;
}

// Chama a função quando a página carregar
document.addEventListener("DOMContentLoaded", calculateCartTotals);
