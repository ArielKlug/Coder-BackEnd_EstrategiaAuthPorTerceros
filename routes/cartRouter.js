const { Router } = require("express");
const CartManager = require("../CartManager");
const carts = new CartManager("./carrito.json");
const router = Router();

router.post("/", async (req, res) => {
  await carts.addCart();
  res.send(await carts.getCarts());
});

router.get("/:cid", async (req, res) => {
    const { cid } = req.params;
    res.send(await carts.getCarts(parseInt(cid)))
});
router.post("/:cid/products/:pid", async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  await carts.addProduct(parseInt(cid), parseInt(pid));
});

module.exports = router;
