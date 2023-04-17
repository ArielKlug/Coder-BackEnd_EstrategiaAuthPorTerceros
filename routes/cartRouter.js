const { Router } = require("express");
const CartManager = require("../managerDaos/CartManager");
const carts = new CartManager("./carts.json");
const router = Router();

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  res.send(await carts.getCart(parseInt(cid)));
});

router.post("/", async (req, res) => {
  await carts.addCart();
  res.send(await carts.getCarts());
});

router.get("/", async (req, res) => {
  res.send(await carts.getCarts());
});

router.post("/:cid/products/:pid", async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  await carts.addProduct(parseInt(cid), parseInt(pid));
  res.send(await carts.getCart(parseInt(cid)));
});

module.exports = router;
