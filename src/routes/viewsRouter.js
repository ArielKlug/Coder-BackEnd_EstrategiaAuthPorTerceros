const { Router } = require("express");
const router = Router();
const ProductManager = require("../managerDaos/ProductManager");

const products = new ProductManager("./products.json");

router.get("/", async (req, res) => {
  try {
    const productos = await products.getProducts();

    let data = {
      productos,
    };

    res.render("home", data);
  } catch (err) {
    console.log(err);
  }
});

router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", {});
});


module.exports = router;
