const { Router } = require("express");
const cartManagerMongo = require("../managerDaos/mongo/cartManagerMongo");
const carts = new cartManagerMongo();
const router = Router();


//acá dejo el id de 1 carrito que ya tiene 2 productos para probar:
//ID carrito: 646c1654fdd633759a71a074
//ID productos del carrito (o sea, product): 6472dae2319d717aed29367e, 6472db04319d717aed293686
//ID de otros productos de la DB : 6472dbd06e17547c73e2a872, 647426de34ee0a57cc1b3c8f, 647426e934ee0a57cc1b3c97 

router.get("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;

    const cart = await carts.getCart(cid);

    if (!cart) {
      return res.status(404).json({ error: "Carrito no encontrado" });
    }

    const newCart = [];
    for (let i = 0; i < cart.products.length; i++) {
      newCart[i] = cart.products[i].product;
    }
    
    const flattenedCart = newCart.map((item) => ({
      _id: item._id,
      title: item.title,
      price: item.price,
      description: item.description,
      thumbnail: item.thumbnail,
      code: item.code,
      stock: item.stock,
      category: item.category,
    }));

    res.render("cart", {
      status: "success",
      newCart: flattenedCart,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    await carts.addCart();
    res.send(await carts.getCarts());
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    res.send(await carts.getCarts());
  } catch (error) {
    console.log(error);
  }
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    await carts.addProduct(cid, pid);
    res.send({
      status: "success",
      payload: "El producto fué agregado con éxito"
    });
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
    await carts.emptyCart(cid);
    res.status(200).send(await carts.getCarts());
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid } = req.params;
    const { pid } = req.params;
    await carts.deleteProduct(cid, pid);
    res.send(await carts.getCart(cid));
  } catch (error) {
    console.log(error);
  }
});

router.put("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    
    const cart = await carts.updateQuantityOfProduct(cid, pid, quantity)
console.log(cart)
    res.send(cart)
  } catch (error) {}
});

module.exports = router;
