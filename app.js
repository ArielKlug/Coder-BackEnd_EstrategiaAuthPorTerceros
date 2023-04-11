const express = require("express");
const productRouter = require("./routes/productsRouter");
const cartRouter = require('./routes/cartRouter')
const app = express();
const PORT= 8080

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);

app.use('/api/carrito', cartRouter)
app.listen(8080, () => {
  console.log(`Server listening ${PORT}`);
});
