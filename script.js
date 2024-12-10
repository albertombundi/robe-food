// função para atualizar a contagem dos produtos em tempo real
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');

  if (cartCountElement) {
      cartCountElement.textContent = count;

      // Adiciona a animação
      cartCountElement.classList.add('pulse');
      setTimeout(() => {
          cartCountElement.classList.remove('pulse');
      }, 300);
  }
}


// Adicione um listener para mudanças no localStorage
window.addEventListener('storage', function(e) {
    if (e.key === 'cart') {
        updateCartCount();
    }
});


function updateCart(product, action) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  const existingProductIndex = cart.findIndex(item => item.name === product.name);
  if (existingProductIndex !== -1) {
      if (action === 'remove') {
      cart[existingProductIndex].quantity -= 1;
      if (cart[existingProductIndex].quantity <= 0) {
          cart.splice(existingProductIndex, 1);
      }
      } else if (action === 'add') {
      cart[existingProductIndex].quantity += 1;
      }
  } else if (action === 'add') {
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
    description: productElement.querySelector(".meta .catrate .cat a").textContent,
    price: productElement.querySelector(".price .current").textContent,
    };
    addToCart(product);
  });
});

// Função para adicionar item ao carrinho
function addToCart(product) {
  updateCart(product, 'add');
  updateCartCount(); // Adicione esta linha
  alert("Produto adicionado ao carrinho!");
}


// Função que permite mandar os item pagina cart.html
document.addEventListener('DOMContentLoaded', function () {
const addToCartButtons = document.querySelectorAll('.add-to-cart');
  addToCartButtons.forEach(button => {
      button.addEventListener('click', function () {
          const product = {
              name: this.dataset.name,
              price: this.dataset.price,
              image: this.dataset.image,
              quantity: 1
          };

          let cart = JSON.parse(localStorage.getItem('cart')) || [];
          const existingProductIndex = cart.findIndex(item => item.name === product.name);

          if (existingProductIndex !== -1) {
              cart[existingProductIndex].quantity += 1;
          } else {
              cart.push(product);
          }

          localStorage.setItem('cart', JSON.stringify(cart));
          alert('Produto adicionado ao carrinho!');
      });
  });
});


// Chama esta função quando a página carregar
document.addEventListener('DOMContentLoaded', updateCartCount);
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
const sliderThumb = new Swiper('.thumb-nav', {
  spaceBetween: 10,
  slidesPerView: 3,
  slidesPerGroup: false,
  breakpoints: {
    992: {
      direction: 'vertical'
    }
  }
});
const theSlider = new Swiper(".thumb-big", {
  slidePerView: 1,
  pagination: {
    el: '.swiper-pagination',
  },
  thumbs: {
    swiper: sliderThumb,
  }
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


