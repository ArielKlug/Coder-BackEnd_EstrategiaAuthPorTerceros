const { promises } = require("fs");
const fs = promises;
const fsSync = require("fs");
class CartManager {
  constructor(path) {
    this.products = [];
    this.path = path;
    this.createFile();
    this.loadProducts();
  }

  createFile = async () => {
    try {
      if (!fsSync.existsSync(this.path)) {
        await fs.writeFile(this.path, "{}", "utf-8");
      }
    } catch (err) {
      console.log(err);
    }
  };
  loadProducts = async () => {
    try {
      await this.createFile();
      let data = await fs.readFile(this.path, "utf-8");

      if (data.length > 0) {
        const parsedData = JSON.parse(data);

        this.products = parsedData;
      }
    } catch (err) {
      console.log(err);
    }
  };

  saveProducts = async () => {
    try {
      const dataJson = JSON.stringify(this.products, null, 2);
      await fs.writeFile(this.path, dataJson, "utf-8");
    } catch (err) {
      console.log(err);
    }
  };

  getCarts = async (cid) => {
    try {
      await this.loadProducts();
      const index = this.products.findIndex((cart) => cart.id === cid);
      const findCart = this.products[index]
      const cartList = findCart.productsCart
      return cartList;
    } catch (err) {
      console.log(err);
    }
  };

  addCart = async () => {
    try {
      await this.loadProducts;
      const cart = {
        productsCart: [],
      };
      if (this.products.length === 0) {
        cart.id = 1;
      } else {
        cart.id = this.products[this.products.length - 1].id + 1;
      }

      this.products.push(cart);
      this.saveProducts();
    } catch (err) {
      console.log(err);
    }
  };

  addProduct = async (cid, pid) => {
    try {
      await this.loadProducts;
      const index = this.products.findIndex((cart) => cart.id === cid);
      const findCart = this.products[index]
      const product = {
        quantity: 2,
        id: pid,
      };
      findCart.productsCart.push(product);
        this.saveProducts();
            
      
      this.saveProducts();
    } catch (err) {
      console.log(err);
    }
  };

  
}
module.exports = CartManager;
