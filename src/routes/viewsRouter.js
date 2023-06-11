const { Router } = require("express");
const router = Router();

const ProductManagerMongo = require("../managerDaos/mongo/productManagerMongo");

const products = new ProductManagerMongo();



router.get("/realTimeProducts", (req, res) => {
  res.render("realTimeProducts", {});
});

router.get("/chat", (req, res) => {
  res.render("chat", {});
});
router.get("/views/register", (req, res) => {
  res.render("registerForm", {
    style: "index.css",
  });
});
router.get("/", (req, res) => {
  res.render("login", {
    style: "index.css",
  });
});
module.exports = router;
