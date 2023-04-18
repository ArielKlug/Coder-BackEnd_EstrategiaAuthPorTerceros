const express = require("express");
const productRouter = require("./src/routes/productsRouter");
const cartRouter = require("./src/routes/cartRouter");
const handleBars = require("express-handlebars");
const viewsRouter = require('./src/routes/viewsRouter')
const app = express();
const PORT = 8080;

app.engine("handlebars", handleBars.engine());
app.set("views", __dirname + "/src/views");
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", viewsRouter)

app.use("/api/products", productRouter);

app.use("/api/carts", cartRouter);
app.listen(8080, () => {
  console.log(`Server listening ${PORT}`);
});
