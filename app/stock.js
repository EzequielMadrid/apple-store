// creando nuestra clase para nuestro stock
class Product {
  constructor(name, price, isStock) {
    this.name = name;
    this.price = price;
    this.isStock = isStock;
  }
}
// stock
const products = [
  new Product("iPhone 14 Pro", 1319.99, true),
  new Product("iPhone 14 Pro Max", 1469.99, true),
  new Product("iPhone 14 Plus", 1159.99, false),
  new Product("iPhone 14", 1009.99, true),
  new Product("iPhone 13", 909.99, true),
  new Product("iPhone 13 mini", 809.99, false),
];
export default products;
