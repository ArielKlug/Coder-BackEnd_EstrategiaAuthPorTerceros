const express = require("express");
const productRouter = require("./routes/productsRouter");

const cartRouter = require("./routes/cartRouter");
const handleBars = require("express-handlebars");
const viewsRouter = require("./routes/viewsRouter");
const userRouter = require('./routes/messagesRouter')
const { Server } = require("socket.io");
const { socketProducts } = require("./utils/socketProducts");


const dataBase = require('./config/objectConfig.js')

dataBase.connectDB()
const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});

const io = new Server(httpServer);



socketProducts(io)

app.engine("handlebars", handleBars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/public"));
app.use("/", viewsRouter);

app.use('/users', userRouter)

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Todo mal");
});
