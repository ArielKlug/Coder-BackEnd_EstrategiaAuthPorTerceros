const { Router } = require("express");

const products = require("../managerDaos/mongo/productManagerMongo");
const { productModel } = require("../models/productModel");
const productsManager = new products();
const router = Router();

//Éstas son las únicas dos rutas actuales que se pueden filtrar por categoría
// /api/products?category=camisas
// /api/products?category=remera

router.get("/", async (req, res) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const page = parseInt(req.query.page) || 1;
    const sort = req.query.sort === "desc" ? -1 : 1;
    const category = req.query.category || "";

    let productos;
    if (category === "") {
      productos = await productModel.paginate(
        {},
        {
          limit: limit,
          page: page,
          lean: true,
          sort: { _id: sort, createdAt: 1 },
        }
      );
    } else {
      productos = await productModel.paginate(
        { category: { $eq: category } },
        {
          limit: limit,
          page: page,
          lean: true,
          sort: { _id: sort, createdAt: 1 },
        }
      );
    }

    const { docs, hasPrevPage, hasNextPage, prevPage, nextPage, totalPages } =
      productos;

    if (!docs) {
      res.send({
        status: "Error",
        message: "No se encontraron los productos",
      });
    }
    const payload = `Se encontraron ${docs.length} productos en la página ${page}`;
    res.render("products", {
      status: "success",
      payload: payload,
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

//ID de algunos productos de la DB : 6472dbd06e17547c73e2a872, 647426de34ee0a57cc1b3c8f, 647426e934ee0a57cc1b3c97 ,
//6472dae2319d717aed29367e, 6472db04319d717aed293686

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
