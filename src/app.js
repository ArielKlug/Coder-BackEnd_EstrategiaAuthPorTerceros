const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const productRouter = require("./routes/productsRouter");
// const FileStore = require('session-file-store')

const cartRouter = require("./routes/cartRouter");
const handlebars = require("express-handlebars");
const viewsRouter = require("./routes/viewsRouter");
const userRouter = require("./routes/messagesRouter");
const sessionRouter = require("./routes/sessionRouter");
const { Server } = require("socket.io");
const { socketProducts } = require("./utils/socketProducts");
const cookiePrueba = require("./routes/cookiePruebaRouter");
const { create } = require("connect-mongo");

const dataBase = require("./config/objectConfig.js");
const { initPassport, initPassportGithub } = require("./config/passport.config");
const passport = require("passport");
dataBase.connectDB();

const app = express();
const PORT = 8080;

const httpServer = app.listen(PORT, () => {
  console.log(`Server listening ${PORT}`);
});
const io = new Server(httpServer);
socketProducts(io);

app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");

// const fileStore = FileStore(session)
app.use(cookieParser("P@l@vra"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    store: create({
      mongoUrl:
        "mongodb+srv://ArielKlug:gAlu9Nr8tC0xp2hO@proyect0.0lbl7pm.mongodb.net/Ecommerce?retryWrites=true&w=majority",
      mongoOptions: {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      },
      ttl: 1000000 * 6000,
    }),
    secret: "palabraSecreta",
    resave: false,
    saveUninitialized: false,
  })
);
initPassport();
initPassportGithub()
passport.use(passport.initialize());
passport.use(passport.session());

app.use("/static", express.static(__dirname + "/public"));
app.use("/api/session", sessionRouter);
app.use("/cookies", cookiePrueba);
app.use("/", viewsRouter);
app.use("/api/users", userRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send("Todo mal");
});
