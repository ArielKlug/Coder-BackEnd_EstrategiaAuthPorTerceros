const express = require("express");
const ProductManager = require("./ProductManager");

const app = express();
const products = new ProductManager("./data.json");

app.use(express.urlencoded({ extended: true }));

app.get("/", (request, response) => {
  response.send("testing");
});
app.get("/products", async (request, response) => {
  try {
    const { limit } = request.query;
    const productos = await products.getProducts();
    if (!limit) {
      return response.send({
        status: "success",
        productos,
      });
    }
    return response.send({
      status: "success",
      requestedProducts: productos.slice(0, limit),
    });
  } catch (error) {
    console.log(error);
  }
});
app.get("/products/:pid", async (request, response) => {
  try {
    const { pid } = request.params;
    const productBI = await products.getProductById(parseInt(pid));
    if (!productBI) {
      return response.send({ status: "error", error: "Product not found" });
    }
    response.send({
      productBI,
    });
  } catch (error) {}
});

app.listen(8080, () => {});
