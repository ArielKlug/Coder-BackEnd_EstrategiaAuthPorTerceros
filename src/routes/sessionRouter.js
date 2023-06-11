const { Router } = require("express");
const { auth } = require("../middlewares/auntenticationMiddleware");
const userManagerMongo = require("../managerDaos/mongo/userManagerMongo");
const userMongo = new userManagerMongo();
const router = Router();

router.post("/register", async (req, res) => {
  try {
    const { username, first_name, last_name, email, password } = req.body;

    if (
      username === "" ||
      first_name === "" ||
      last_name === "" ||
      email === "" ||
      password === ""
    ) {
      return res.send({
        status: "Error",
        message: "Se deben completar todos los campos",
      });
    }
    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      req.session.user = {
        first_name: "Coder",
        last_name: "admin",
        email: email,
        role: "admin",
      };
    } else {
      const existUser = await userMongo.findUser(email);
if (existUser) {
   if (existUser.username === username || existUser.email === email) {
        return res.send({
          status: "error",
          message: "El usuario ya ha sido registrado, ",
        });
      }
}
     

      const newUser = {
        username,
        first_name,
        last_name,
        email,
        password,
      };

      let resultUser = await userMongo.addUser(newUser);
    }

    res.status(200).redirect("http://localhost:8080/");
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email == "" || password == "") {
      return res.send("Complete todos los campos para iniciar sesión");
    }

    if (email === "adminCoder@coder.com" && password === "adminCod3r123") {
      req.session.user = {
        first_name: "Coder",
        last_name: "admin",
        email: email,
        role: "admin",
      };
    } else {
      const userDB = await userMongo.findUserRegistered(email, password);
      
      if (!userDB) {
        return res.send({
          status: "error",
          message: "No existe ese usuario, revise los campos",
        });
      }

      req.session.user = {
        first_name: userDB.first_name,
        last_name: userDB.last_name,
        email: userDB.email,
        role: "user",
      };
    }

    res.redirect("http://localhost:8080/api/products");
  } catch (error) {
    console.log(error);
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.send({
        status: "error",
        error: err,
      });
    }
    res.redirect("http://localhost:8080/views/login/");
  });
});

router.get("/privada", auth, (req, res) => {
  res.send("Todo lo que esta acá solo lo puede ver un admin loagueado");
});

module.exports = router;
