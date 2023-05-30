const { Router } = require("express");
const cartManagerMongo = require("../managerDaos/mongo/cartManagerMongo");
const { cartModel } = require("../models/cartModel");
const carts = new cartManagerMongo;
const router = Router();

router.get("/:cid", async (req, res) => {
 try {
      const { cid } = req.params;

    const cart = await carts.getCart(cid);

    if (!cart) {
      return res.status(404).json({ error: 'Carrito no encontrado' });
    }

    const { products } = cart;

    res.render('cart', { cart: products });
 
 } catch (error) {
  console.log(error)
 } 
});

router.post("/", async (req, res) => {
 try {
   await carts.addCart();
  res.send(await carts.getCarts());
 } catch (error) {
  console.log(error)
 }
});

router.get("/", async (req, res) => {
  try {
    res.send(await carts.getCarts());
  } catch (error) {
    console.log(error)
  }
  
});

router.post("/:cid/products/:pid", async (req, res) => {
  try {
    const { cid } = req.params;
  const { pid } = req.params;
  await carts.addProduct(cid, pid);
  res.send(await carts.getCart(cid));
  } catch (error) {
    console.log(error)
  }
  
});

router.delete("/:cid", async (req, res) => {
  try {
    const { cid } = req.params;
  await carts.emptyCart(cid);
  res.status(200).send(await carts.getCarts());
  } catch (error) {
    console.log(error)
  } 
});

router.delete("/:cid/products/:pid", async (req, res) => {
 try {
  const { cid } = req.params;
  const { pid } = req.params;
  await carts.deleteProduct(cid, pid);
  res.send(await carts.getCart(cid));
 } catch (error) {
  console.log(error)
 } 
})

router.put('/:cid/products/:pid', async (req, res)=>{
  try {
    const {cid, pid} = req.params
    const {quantity} = req.body
   const result = await cartModel.aggregate([
    {
      
    }
   ])
  } catch (error) {
    
  }
} )

module.exports = router;
