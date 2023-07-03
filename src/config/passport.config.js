const passport = require("passport");
const local = require("passport-local");
const GithubStrategy = require("passport-github2");
const { createHash, isValidPassword } = require("../utils/bcryptHash");
const UserManagerMongo = require("../managerDaos/mongo/userManagerMongo");

const userManager = new UserManagerMongo();
const LocalStrategy = local.Strategy;

const initPassport = () => {
  // configuracion del registro
  passport.use(
    "register",
    new LocalStrategy(
      {
        passReqToCallback: true,
        usernameField: "email",
      },
      async (req, username, password, done) => {
        const { first_name, last_name } = req.body;
        try {
          let userDB = await userManager.findUser({ email: username });
          if (userDB) {
            return done(null, false);
          }

          let newUser = {
            first_name,
            last_name,
            email: username,
            password: createHash(password),
          };
          let result = await userManager.addUser(newUser);
          return done(null, result);
        } catch (error) {
          return done("Error al obtener el usuario " + error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userManager.findUser({ _id: id });
      done(null, user);
    } catch (error) {
      return done(error);
    }
  });

  passport.use(
    "login",
    new LocalStrategy(
      {
        usernameField: "email",
      },
      async (username, password, done) => {
        try {
          const userDB = await userManager.findUser({ email: username });
          if (!userDB) {
            return done(null, false);
          }

          if (!isValidPassword(password, userDB)) {
            return done(null, false);
          }
          return done(null, userDB);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
};

const initPassportGithub = () => {
  passport.use(
    "github",
    new GithubStrategy(
      {
        clientID: "Iv1.738030b9d956b4c3",
        clientSecret: "0a41a3f63ce1af3e6ed164fd66c62bff095515e9",
        callbackURL: "http://localhost:8080/api/session/githubcallback",
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile)
        try {
          let user = await userManager.findUser({ email: profile._json.email });
          if (user) {
            return done(null, user);
          }

          if (!user) {
            let newUser = {
              first_name: profile.username,
              last_name: profile.username,
              email: profile._json.email,
              password: "",
            };
            let result = await userManager.addUser(newUser);
            return done(null, result);
          }
        } catch (error) {
          console.log(error);
        }
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      let user = await userManager.findUser({ _id: id });

      done(null, user);
    } catch (error) {
      console.log(error);
    }
  });
};

module.exports = {
  initPassport,
  initPassportGithub,
};
