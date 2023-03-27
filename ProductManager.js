const { promises } = require("fs");
const fs = promises;
class ProductManager {
  #margenGanancia = 0.3;
  constructor(path) {
    this.products = [];
    this.path = path;
    this.loadProducts();
  }

  loadProducts = async () => {
    setTimeout(async () => {
      try {
        const data = await fs.readFile(this.path, "utf-8");
        this.products = JSON.parse(data);
      } catch (err) {
        console.log(err);
        this.products = [];
      }
    }, 1);
  };

  saveProducts = async () => {
    try {
      const dataJson = JSON.stringify(this.products, null, 2);
      await fs.writeFile(this.path, dataJson, "utf-8");
    } catch (err) {
      console.log(err);
    }
  };

  getProducts = () => { 
    if (this.loadProducts) {
      return this.products;
    } else {
      console.log("error al cargar los productos");
    }
  };

  addProduct = async (title, description, price, thumbnail, code, stock) => {
    try {
      const product = {
        title,
        description,
        price: price + price * this.#margenGanancia,
        thumbnail,
        code,
        stock,
      };
      if (this.products.length === 0) {
        product.id = 1;
      } else {
        product.id = this.products[this.products.length - 1].id + 1;
      }
      const codeCheck = this.products.find((item) => item.code === code);
      if (!codeCheck) {
        this.products.push(product);
        this.saveProducts();
      } else {
        console.log(
          `ERROR: Ya existe un producto con ese código. Código: ${code}`
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  getProductById = (idProduct) => {
    
    const findProduct = this.products.find((e) => e.id === idProduct);
    if (!findProduct) {
      console.error("El producto que buscas, lamentablemente no existe");
      return;
    } else {
      console.log(
        `El producto que buscas es: ${findProduct.title}, cuyo valor es de: $${findProduct.price}`,
        findProduct
      );
    }
  };
  updateProduct(id, updatedFields) {
    const index = this.products.findIndex(product => product.id === id);
    const existingProduct = this.products[index];
    const updatedProduct = { ...existingProduct, ...updatedFields };
    this.products[index] = updatedProduct;
    this.saveProducts()
  }
  async deleteProduct(id) {
    const index = this.products.findIndex(product => product.id === id);
    if (index !== -1) {
      // eliminar el producto encontrado en el índice
      this.products = [
        ...this.products.slice(0, index),
        ...this.products.slice(index + 1)
      ];
  
      this.saveProducts()
    }
  }
  
}

const manageProducts = new ProductManager("./data.json");
manageProducts.addProduct(
  "Camisa blanca",
  "Camisa blanca liviana para este calor insoportable",
  50,
  "https://w7.pngwing.com/pngs/196/897/png-transparent-two-white-t-shirts-clothes-clothing-t-shirt-thumbnail.png",
  "osiadfher129348",
  34
);
manageProducts.updateProduct(1,{title:"Camisa NEGRA",
  description:"Camisa blanca liviana para este calor insoportable",
  price:50,
  thumbnail:"https://w7.pngwing.com/pngs/196/897/png-transparent-two-white-t-shirts-clothes-clothing-t-shirt-thumbnail.png",
  code:"osiadfher12934asfads8",
  stock:34}
  
);
manageProducts.addProduct(
  "Camisa azul",
  "Camisa blanca liviana para este calor insoportable",
  50,
  "https://w7.pngwing.com/pngs/196/897/png-transparent-two-white-t-shirts-clothes-clothing-t-shirt-thumbnail.png",
  "osiadfheafs129348",
  34
);

console.log(manageProducts.getProducts());
//  console.log(manageProducts.getProductById(1));
 console.log(manageProducts.deleteProduct(2))
 console.log(manageProducts.getProducts());