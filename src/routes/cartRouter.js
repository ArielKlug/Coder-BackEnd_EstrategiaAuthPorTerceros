const { Router } = require("express");
const cartManagerMongo = require("../managerDaos/mongo/cartManagerMongo");
const carts = new cartManagerMongo;
const router = Router();

router.get("/:cid", async (req, res) => {
  const { cid } = req.params;
  res.send(await carts.getCart(cid));
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
  await carts.addProduct(cid, pid);
  res.send(await carts.getCart(cid));
});

router.delete("/:cid", async (req, res) => {
  const { cid } = req.params;
  await carts.deleteCart(cid);
  res.status(200).send(await carts.getCarts());
});

router.delete("/:cid/products/:pid", async (req, res) => {
  const { cid } = req.params;
  const { pid } = req.params;
  await carts.deleteProduct(cid, pid);
  res.send(await carts.getCart(cid));
})

module.exports = router;
