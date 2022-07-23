import homePage from "./homePage";
// webpack --- NPM Node.JS
// manejo DOM Eventos
addEventListener("DOMContentLoaded", () => {
  homePage();
  cart();
});

function cart() {
  const cartButton = document.querySelector("#cart-button");
  const modal = document.querySelector(".cart-modal");
  const modalClose = document.querySelector(".modal__no-content");
  const handleClick = () => {
    console.log("haciendo click");
    toggleModalClose()
    modal.classList.remove("cart-modal--hidden");
  };
  cartButton.addEventListener("click", handleClick);

  modalClose.addEventListener("click", () => {
    console.log("entra?");
    toggleModalClose()
    modal.classList.add("cart-modal--hidden");
  });

  function toggleModalClose() {
    modalClose.classList.toggle("hidden");
  }
}
