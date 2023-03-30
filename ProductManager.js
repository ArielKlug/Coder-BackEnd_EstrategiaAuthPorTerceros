const { promises } = require("fs");
const fs = promises;

class ProductManager {
  #margenGanancia = 0.3;
  constructor(path) {
    this.products = [];
    this.path = path;
    this.createFile();
  }

  createFile = async () => {
    try {
      await fs.writeFile(this.path, [], "utf-8");
    } catch (err) {
      console.log(err);
    }
  };
  loadProducts = async () => {
    try {
      const parsedData = await fs.readFile(this.path, "utf-8");
      this.products = JSON.parse(parsedData);
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

  getProducts = async () => {
    try {
      await this.loadProducts();
      return console.log(this.products);
    } catch (error) {
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
  updateProduct = async (id, updatedFields) => {
    try {
      
      const index = this.products.findIndex((producto) => producto.id === id);
      
if (index != -1) {
  const existingProduct = this.products[index];
      const updatedProduct = { ...existingProduct, ...updatedFields };
      this.products[index] = updatedProduct;

      await this.saveProducts();
} else {

  console.log('Error, el producto a actualizar no esiste')
}
      
    } catch (error) {
      console.log(error);
    }
  };

  deleteProduct = async (id) => {
    try {
      const index = this.products.findIndex((producto) => producto.id === id);

      if (index !== -1) {
        productos.splice(index, 1);
        await this.saveProducts();
      }
    } catch (err) {
      console.log(`Error al eliminar el producto: ${err}`);
    }
  };
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

manageProducts.addProduct(
  "Camisa azul",
  "Camisa blanca liviana para este calor insoportable",
  50,
  "https://w7.pngwing.com/pngs/196/897/png-transparent-two-white-t-shirts-clothes-clothing-t-shirt-thumbnail.png",
  "osiadfheafs129348",
  34
);

manageProducts.addProduct(
  "Camisa roja",
  "Camisa blanca liviana para este calor insoportable",
  50,
  "https://w7.pngwing.com/pngs/196/897/png-transparent-two-white-t-shirts-clothes-clothing-t-shirt-thumbnail.png",
  "osiadfheaasdasdfs129348",
  34
);

manageProducts.updateProduct(2, {
  title: "Camisa NEGRA",
  description: "Camisa blanca liviana para este calor insoportable",
  price: 53,
  thumbnail:
    "https://w7.pngwing.com/pngs/196/897/png-transparent-two-white-t-shirts-clothes-clothing-t-shirt-thumbnail.png",
  code: "osiadfher12934asfads8",
  stock: 3151234,
});
manageProducts.getProducts();
