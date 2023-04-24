const express = require("express");
const productRouter = require("./src/routes/productsRouter");

const cartRouter = require("./src/routes/cartRouter");
const handleBars = require("express-handlebars");
const viewsRouter = require("./src/routes/viewsRouter");

const { Server } = require("socket.io");
const { socketProducts } = require("./src/utils/socketProducts");





const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});

const io = new Server(httpServer);



socketProducts(io)

app.engine("handlebars", handleBars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/static", express.static(__dirname + "/src/public"));
app.use("/", viewsRouter);

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Todo mal");
});
