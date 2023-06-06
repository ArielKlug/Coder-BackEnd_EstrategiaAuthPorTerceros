const { Router } = require("express");
const router = Router();

router.get("/setCookie", (req, res) => {
  res
    .cookie("CookieRica", "Ésta cookie es muy muy rica", { maxAge: 100000 })
    .send("Cookie salida del horno");
});

router.get("/getCookie", (req, res) => {
  res.send(req.cookies);
});
router.get("/clearCookie", (req, res) => {
  res.clearCookie("CookieRica").send("Cookie funada");
});

router.get("/setSignedCookie", (req, res) => {
  res
    .cookie("SignedCookie", "Cookie piola segura", {
      maxAge: 100000,
      signed: true,
    })
    .send("Salió todo bien");
});
router.get("/getSignedCookie", (req, res) => {
  res.send(req.signedCookies);
});

module.exports = router;
