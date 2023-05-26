// importando mis archivos.js
import products from "./stock.js";
import Cart from "./cart.js";

// creando instancia del carrito
const cart = new Cart();
// mensaje de bienvenida a la app
alert("🍎 Welcome to the Apple Store!");
// creando un booleano para manipular nuestro while()
let exit = false;
while (!exit) {
  const option = prompt(
    "Main Menu:\n" +
      "1. Display Products\n" +
      "2. Show Cart\n" +
      "3. Exit\n\n" +
      "Enter your choice:"
  );
  // menu
  switch (option) {
    case "1":
      let productMessage = "Product List:\n";
      for (let i = 0; i < products.length; i++) {
        const product = products[i];
        productMessage += `${i + 1}. ${product.name} - $${product.price.toFixed(
          2
        )}\n`;
      }
      const productOption = prompt(
        productMessage +
          "\nEnter the product number to add to cart (or '0' to cancel):"
      );
      const productIndex = parseInt(productOption) - 1;
      if (productIndex === -1) {
        alert("Cancelled adding product to cart.");
      } else if (productIndex >= 0 && productIndex < products.length) {
        const selectedProduct = products[productIndex];

        if (selectedProduct.isStock) {
          const quantity = parseInt(
            prompt("Enter the quantity to add to cart:")
          );
          if (quantity > 0) {
            cart.addProduct(selectedProduct, quantity);
            alert(`Added ${quantity} ${selectedProduct.name}(s) to cart.`);
          } else {
            alert("Invalid quantity. Product not added to cart.");
          }
        } else {
          alert("Ups, this product isn't in stock now! Try with another.");
        }
      } else {
        alert("Invalid product number.");
      }
      break;
    case "2":
      cart.displayCart();
      if (cart.products.length === 0) {
        alert("The cart is empty. Cannot proceed to payment.");
        break;
      }
      // eliminando producto COMPLETO(incluyendo sus cantidades)
      const removeOption = prompt(
        "Enter the product number to remove from cart with ALL its quantities (or '0' to cancel):"
      );
      const removeIndex = parseInt(removeOption) - 1;
      if (removeIndex === -1) {
        alert("Cancelled removing product from cart.");
      } else if (removeIndex >= 0 && removeIndex < cart.products.length) {
        cart.removeProduct(removeIndex);
        alert("Product removed from cart.");
      } else {
        alert("Invalid product number.");
      }
      break;
    case "3":
      exit = true;
      alert("Exiting the program. Goodbye!");
      break;
    default:
      alert("Invalid option. Please try again.");
  }
  // eliminando productos y/o sus cantidades
  if (option === "2") {
    if (option === "2") {
      cart.displayCart();
      if (cart.products.length === 0) {
        alert("The cart is empty. Cannot proceed to payment.");
        break;
      }
      const removeIndex =
        parseInt(
          prompt(
            "Enter the product number to remove from cart (or '0' to continue to payment):"
          )
        ) - 1;
      if (removeIndex === -1) {
        const paymentOption = prompt(
          "Payment Options:\n" +
            "1. Pay with Debit Card\n" +
            "2. Pay with Credit Card\n\n" +
            "Enter your choice:"
        );

        switch (paymentOption) {
          case "1":
            cart.payWithDebitCard();
            break;

          case "2":
            cart.payWithCreditCard();
            break;

          default:
            alert("Invalid payment option. Returning to main menu.");
        }
      } else if (removeIndex >= 0 && removeIndex < cart.products.length) {
        const productToRemove = cart.products[removeIndex];
        const removeChoice = prompt(
          `Do you want to remove the entire quantity (${productToRemove.quantity}) of ${productToRemove.product.name}? (Y/N)`
        );
        if (removeChoice.toUpperCase() === "Y") {
          cart.removeProduct(removeIndex);
          alert(
            `Removed ${productToRemove.quantity} ${productToRemove.product.name}(s) from cart.`
          );
        } else if (removeChoice.toUpperCase() === "N") {
          const removeQuantity = parseInt(
            prompt(
              `Enter the quantity to remove for ${productToRemove.product.name}:`
            )
          );
          if (
            removeQuantity > 0 &&
            removeQuantity <= productToRemove.quantity
          ) {
            if (removeQuantity === productToRemove.quantity) {
              cart.removeProduct(removeIndex);
            } else {
              productToRemove.quantity -= removeQuantity;
            }
            alert(
              `Removed ${removeQuantity} ${productToRemove.product.name}(s) from cart.`
            );
          } else {
            alert("Invalid quantity or not enough quantity to remove.");
          }
        } else {
          alert("Invalid choice. Returning to main menu.");
        }
      } else {
        alert("Invalid product number.");
      }
    }
  }
}
