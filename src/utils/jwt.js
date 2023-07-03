const jwt = require("jsonwebtoken");
const JWT_PRIVATE_KEY = "palabra.jwtSecreta";

//usuario sin datos sensibles
const generarToken = (user) => {
  const token = jwt.sign({ user }, JWT_PRIVATE_KEY, { expiresIn: "1d" });
  return token;
};

const authToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).send({ status: "error", error: "No autenticado" });
  }

  //formato que llega del header: ['Bearer', 'dgpsjsgjdfijasfijafkljsdf']
  //entonces así solo capturamos el segundo valor
  const token = authHeader.split(" ")[1];

  jwt.verify(token, JWT_PRIVATE_KEY, (error, credential) => {
    if (error) {
      return res.status(403).send({ status: "error", error: "No autorizado" });
    }
    req.user = credential.user;
    next();
  });
};

module.exports = { generarToken, authToken };
