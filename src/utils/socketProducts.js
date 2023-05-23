const productManager = require("../managerDaos/files/ProductManager");
const products = new productManager("./products.json");

const socketProducts = async (io) => {
  const productos = await products.getProducts();

  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    socket.emit("products", productos);
  });
};

module.exports = {
  socketProducts,
};
