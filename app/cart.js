// creando nuestra clase para nuestro carrito
class Cart {
  constructor() {
    this.products = [];
  }
  // añandiendo productos al carrito
  addProduct(product, quantity) {
    const xProduct = this.products.find((p) => p.product === product);
    if (xProduct) {
      xProduct.quantity += quantity;
    } else {
      this.products.push({ product, quantity });
    }
  }
  // removiendo productos del carrito
  removeProduct(index) {
    this.products.splice(index, 1);
  }
  // consiguiendo el precio total
  getTotalPrice() {
    let totalPrice = 0;
    // for of
    for (let { product, quantity } of this.products) {
      totalPrice += product.price * quantity;
    }
    return totalPrice;
  }
  // generando un código random
  generateDiscountCode() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let discountCode = "";
    for (let i = 0; i < 8; i++) {
      discountCode += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return discountCode;
  }
  // pagando con Débito
  payWithDebitCard() {
    const discountCode = this.generateDiscountCode();
    const total = this.getTotalPrice();
    const discountedTotal = total * 0.8;
    alert(`
        Paying with Debit Card:\n
        Discount Code: ${discountCode}\n 
        Total Price (before discount): $${total.toFixed(2)}\n 
        Discounted Total Price: $${discountedTotal.toFixed(2)}
       `);

    this.clearCart();
  }
  // pagando con Crédito
  payWithCreditCard() {
    const total = this.getTotalPrice();
    const options = [
      "Pay in full",
      "Pay in 3 installments",
      "Pay in 6 installments",
      "Pay in 9 installments",
      "Pay in 12 installments",
    ];
    const option = prompt(
      "Choose installment option:\n" +
        // mapeando el Array creado anteriormente
        options.map((opt, index) => `${index + 1}. ${opt}`).join("\n") +
        "\nEnter your choice:"
    );
    let installment = 1;
    if (option >= 2 && option <= 5) {
      installment = parseInt(option);
    }
    const monthlyPayment = total / installment;
    alert(`
        Monthly Payment: $${monthlyPayment.toFixed(2)}\n
        Total Price: $${total.toFixed(2)}
        `);
    this.clearCart();
  }
  // Limpiando carrito
  clearCart() {
    this.products = [];
  }
  // Mostrando carrito
  displayCart() {
    let cartMessage = "Cart Contents:\n";
    if (this.products.length === 0) {
      cartMessage += "The cart is empty.";
    } else {
      /* for (let i = 0; i < this.products.length; i++) {
        const { product, quantity } = this.products[i];
        cartMessage += `${i + 1}. ${product.name} - $${product.price.toFixed(
          2
        )} x ${quantity}\n`;
      }*/
      // for of
      let i = 0;
      for (const { product, quantity } of this.products) {
        cartMessage += `${i + 1}. ${product.name} - $${product.price.toFixed(
          2
        )} x ${quantity}\n`;
        i++;
      }
    }
    alert(cartMessage);
  }
}
export default Cart;
