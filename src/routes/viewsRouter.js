const { Router } = require("express");
const router = Router();

const ProductManagerMongo = require("../managerDaos/mongo/productManagerMongo");

const products = new ProductManagerMongo

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

router.get("/chat", (req, res) =>{
  res.render('chat', {})
})

module.exports = router;
