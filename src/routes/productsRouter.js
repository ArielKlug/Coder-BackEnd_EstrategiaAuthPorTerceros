const { Router } = require("express");
const ProductManager = require("../managerDaos/ProductManager");
const products = new ProductManager("./products.json");
const router = Router();

router.get("/", async (req, res) => {
  try {
    const { limit } = req.query;
    const productos = await products.getProducts();
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
    const productBI = await products.getProductById(parseInt(pid));
    if (!productBI) {
      return res.send({ status: "error", error: "Product not found" });
    }
    res.send({
      status: "success",
      payload: productBI,
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
      !prod.category ||
      !prod.status
    ) {
      return res
        .status(400)
        .send({ status: "error", mensaje: "Todos los campos son necesarios" });
    } else {
      const codeCheck = products.products.find(
        (item) => item.code === prod.code
      );
      if (codeCheck) {
        return res.send({
          status: "error",
          mensaje: "Ya existe un producto con ese código",
        });
      }
      await products.addProduct(
        prod.title,
        prod.description,
        prod.price,
        prod.thumbnail,
        prod.code,
        prod.stock,
        prod.category,
        prod.status
      );
    }

    res.status(200).send(await products.getProducts());
  } catch (error) {
    console.log(error);
  }
});

router.put("/:pid", async (req, res) => {
  try {
    const { pid } = req.params;
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
      await products.updateProduct(parseInt(pid), prod);
    }

    res.status(200).send(await products.getProducts());
  } catch (error) {
    console.log(error);
  }
});

router.delete("/:pid", async (req, res) => {
  const { pid } = req.params;
  await products.deleteProduct(parseInt(pid));
  res.status(200).send(await products.getProducts());
});

module.exports = router;
