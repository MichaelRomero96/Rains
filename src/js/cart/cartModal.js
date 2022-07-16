export default function () {
  console.log("cart modal");
  const cartButton = document.querySelector("#cart-button");
  cartButton.addEventListener("click", handleOpenModal);

  function handleOpenModal() {
    console.log("haciendo click");
  }
}
