class ProductManager {
  #margenGanancia = 0.3;
  constructor() {
    this.productos = [];
  }

  verProd = () => {
    return this.productos;
  };
  addProduct = (title, description, price, thumbnail, stock) => {
    const producto = {
      title,
      description,
      price: price + price * this.#margenGanancia,
      thumbnail,
      code:
      stock,
    };
    if (this.productos.length === 0) {
      producto.id = 1;
    } else {
      producto.id = this.productos[this.productos.length - 1].id + 1;
      producto.code = producto.id * 2;
    }
    this.productos.push(producto);
  };

  getProductoById = (idProducto) => {
    const encontrarProducto = this.productos.find((e) => e.id === idProducto);
    if (!encontrarProducto) {
      console.error("El producto que buscas, lamentablemente no existe");
      return;
    } else {
      console.log(
        `El producto que buscas es: ${encontrarProducto.title}, cuyo valor es de: $${encontrarProducto.price}`
      );
    }
  };
}

const manejarProductos = new ProductManager();
manejarProductos.addProduct(
  "Camisa blanca",
  "Camisa blanca liviana para este calor insoportable",
  50,
  "https://w7.pngwing.com/pngs/196/897/png-transparent-two-white-t-shirts-clothes-clothing-t-shirt-thumbnail.png",
  1,
  34
);
manejarProductos.addProduct(
  "Camisa Negra",
  "Camisa negra y gruesa para el frío que se viene por fin",
  60,
  "https://w7.pngwing.com/pngs/448/441/png-transparent-black-t-shirt-t-shirt-black-male-thumbnail.png",

  45
);
manejarProductos.addProduct(
  "Campera de invierno",
  "Campera muy cálida y cómoda ideal para el invierno",
  80,
  "https://e7.pngegg.com/pngimages/669/222/png-clipart-jacket-coat-parka-winter-clothing-jacket-winter-fashion-thumbnail.png",

  29
);
manejarProductos.addProduct(
  "Pantalon de Jean",
  "Pantalon de Jean fachero facherito",
  70,
  "https://w7.pngwing.com/pngs/717/825/png-transparent-jeans-denim-blue-slim-fit-pants-diesel-men-jeans-blue-color-black-thumbnail.png",

  54
);

console.log(manejarProductos.verProd());
console.log(manejarProductos.getProductoById(4));
