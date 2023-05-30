const { Router } = require("express");

const products = require("../managerDaos/mongo/productManagerMongo");
const { productModel } = require("../models/productModel");
const productsManager = new products();
const router = Router();

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort === "desc" ? -1 : 1;
    const query = req.query.query || "";

    const options = {
      page: page,
      limit: limit,
      sort: { price: sort },
    };
    const filter = {
      category: { $regex: query, $options: "i" },
    };
    const products = await productModel.paginate(filter, options);

    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } =
      products;

    if (!docs) {
      res.send({
        status: "Error",
        message: "No se encontraron los productos",
      });
    }
    res.render("products", {
      status: "success",
      payload: "Resultado de los productos solicitados",
      products: docs,
      hasPrevPage,
      hasNextPage,
      prevPage,
      nextPage,
      totalPages,
      limit,
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
