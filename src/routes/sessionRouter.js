const { Router } = require("express");
const { auth } = require("../middlewares/auntenticationMiddleware");
const userManagerMongo = require("../managerDaos/mongo/userManagerMongo");
const { createHash, isValidPassword } = require("../utils/bcryptHash");
const passport = require("passport");
const userMongo = new userManagerMongo();
const router = Router();


router.post('/register', passport.authenticate('register', { failureRedirect: '/failregister' }), async (req, res) => {
  res.redirect('http://localhost:8080/');
});


router.get("/failregister", async (req, res) => {
  console.log("Falla en estrategia de autenticación");
  res.send({ status: "error", message: "Falló la autenticación del registro" });
});

router.post(
  "/login",
  passport.authenticate("login", {
    failureRedirect: "/faillogin",
    successRedirect: "http://localhost:8080/api/products",
  }),
  async (req, res) => {
    if (!req.user) {
      return res
        .status(401)
        .send({ status: "error", message: "Credenciales inválidas" });
    }
    req.session.user = {
      username: req.user.username,
      first_name: req.user.first_name,
      last_name: req.user.last_name,
      email: req.user.email,
    };
    res.send({ status: "success", message: "Logueo exitoso" });
  }
);

router.get("/faillogin", async (req, res) => {
  console.log("Falla en estrategia de autenticación");
  res.send({ status: "error", message: "Falló la autenticación del login" });
});


router.get('/github', passport.authenticate('github', {scope:['user:email']}) )
router.get('/githubcallback', passport.authenticate('github', {failureRedirect: '/'}), async (req, res)=>{
  req.session.user = req.user
  res.redirect('http://localhost:8080/api/products')
})

router.post("/restaurarpass", async (req, res) => {
  const { email, password } = req.body;

  const userDB = await userMongo.findUser({ email });

  if (!userDB) {
    return res
      .status(401)
      .send({ status: "error", message: "El usuario no existe" });
  }

  userDB.password = createHash(password);
  await userDB.save();

  res.status(200).send({
    status: "success",
    message: "Contraseña actualizada correctamente",
  });
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
