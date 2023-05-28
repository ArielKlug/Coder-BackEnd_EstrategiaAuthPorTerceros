const { Router } = require("express");

const products = require("../managerDaos/mongo/productManagerMongo");
const productsManager = new products();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const productos = await productsManager.getProducts();
    if (!limit) {
      return res.send({
        status: "success",
        payload: productos,
      });
    }
    return res.send({
      status: "success",
      payload: productos.slice(0, limit),
    });
  } catch (error) {
    console.log(error);
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const productById = await productsManager.getProductById(parseInt(pid));
    if (!productById) {
      return res.send({ status: "error", error: "Product not found" });
    }
    res.send({
      status: "success",
      payload: productById,
    });
  } catch (error) {
    console.log(error);
  }
});

router.post("/", async (req, res) => {
  try {
    const prod = req.body;

    if (
      !prod.title ||
      !prod.description ||
      !prod.price ||
      !prod.thumbnail ||
      !prod.code ||
      !prod.stock ||
      !prod.category 
    ) {
      return res
        .status(400)
        .send({ status: "error", mensaje: "Todos los campos son necesarios" });
    } else {
      await productsManager.addProduct(prod);
      
    }

    res.status(200).send(await productsManager.getProducts());
  } catch (error) {
    console.log(error);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
    const prodToReplace = req.body;

    await productsManager.updateProduct(pid, prodToReplace);

    res.status(200).send(await productsManager.getProducts());
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  await productsManager.deleteProduct(pid);
  res.status(200).send(await productsManager.getProducts());
});

module.exports = router;
