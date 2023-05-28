const ProductManagerMongo = require("../managerDaos/mongo/productManagerMongo");
const products = new ProductManagerMongo();
const MessagesManagerMongo = require("../managerDaos/mongo/messageManagerMongo")
const messageManager = new MessagesManagerMongo()

const socketProducts = async (io) => {
  const productos = await products.getProducts();


 

  io.on("connection", (socket) => {
    console.log("Nuevo cliente conectado");

    socket.emit("products", productos);

    socket.on("message", async (data) => {
      try {
        
          await messageManager.addMessage(data.user, data.message)
let messages = await messageManager.getMessages()
      io.emit('messageLogs', messages)
      } catch (error) {
        console.log(error)
      }
    
    });
    socket.on('authenticated', data =>{
      socket.broadcast.emit('newUserConnected', data)
    })
  });
};

module.exports = {
  socketProducts,
};
