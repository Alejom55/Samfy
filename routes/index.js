// import {ManageAccount} from '../js/services/firebase-auth.js'

var express = require("express");
var router = express.Router();
var app = express();
const session = require('express-session');

const fs = require("fs");
const { Session } = require("inspector");
const apartments = JSON.parse(fs.readFileSync("./views/apartments.json"));
const usersJSON = JSON.parse(fs.readFileSync("./users.json", "utf-8"));





// Middleware para verificar el nivel de suscripción
const checkSubscriptionAccess = (requiredSubscriptionLevel) => {
  return (req, res, next) => {
    if (req.session && req.session.user) {
      // Cargar usuarios desde el archivo JSON (simulación)
      const users = usersJSON;

      // Buscar al usuario actual en la lista de usuarios cargados
      const currentUser = users[req.session.user.email];

      // Verificar el nivel de suscripción
      if (currentUser && isSubscriptionSufficient(currentUser.plan, requiredSubscriptionLevel)) {
        res.locals.username = currentUser.name;  
        next(); 
      } else {
        res.redirect('/upgrade');
      }
    } else {
      res.locals.username = null; 
      res.redirect('/login');
    }
  };
};

// Función para verificar si el nivel de suscripción es suficiente
const isSubscriptionSufficient = (userSubscription, requiredSubscription) => {
  const subscriptionOrder = ['free', 'Elite', 'Premium']; // Orden de jerarquía de suscripciones

  const userSubscriptionIndex = subscriptionOrder.indexOf(userSubscription);
  const requiredSubscriptionIndex = subscriptionOrder.indexOf(requiredSubscription);

  return userSubscriptionIndex >= requiredSubscriptionIndex;
};


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("home", { title: "Express", username: res.locals.username });
});

router.get("/home", checkSubscriptionAccess('free'), function (req, res, next) {
  res.render("home", { title: "Express", username: res.locals.username });
});


router.get("/upgrade", checkSubscriptionAccess('free'), function (req, res, next) {
  if (res.locals.isLoggedIn) {
    const currentSubscription = usersJSON[req.session.user.email].plan;

    res.render("upgrade", {
      title: "Upgrade Subscription",
      username: res.locals.username,
      currentSubscription: currentSubscription
    });
  } else {
    res.render("home", { title: "Express", username: res.locals.username });
  }
});

// Ruta para procesar la mejora de suscripción
router.post("/upgrade", function (req, res, next) {
  if (res.locals.isLoggedIn) {
    const upgradeTo = req.body.upgrade;

    // Cargar usuarios desde el archivo JSON
    const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

    users[req.session.user.email].plan = upgradeTo;
    // users[req.session.user.email].plan = upgradeTo;

    // Guardar los cambios en el archivo JSON
    fs.writeFileSync("./users.json", JSON.stringify(users, null, 2), "utf-8");

    // Redirigir a la página de inicio después de la mejora
    req.session.destroy((err) => {
      if (err) {
        console.error("Error al cerrar sesión:", err);
      }
      res.redirect("/"); // Redirigir a la página de inicio u otra página después de cerrar sesión
    });
  } else {
    res.redirect("/home");
  }
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Express" });
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Express" });
});

router.get("/analitycs", checkSubscriptionAccess('free'), function (req, res, next) {
  res.render("analitycs", { title: "Express", username: res.locals.username });
});

router.get("/add_property", checkSubscriptionAccess('Premium'), function (req, res, next) {
  res.render("add_property", { title: "Express", username: res.locals.username });
});

router.get("/property_detail", checkSubscriptionAccess('Elite'), function (req, res, next) {
  res.render("property_detail", { title: "Express", username: res.locals.username });
});

router.get("/properties_list", checkSubscriptionAccess('Elite'), function (req, res, next) {
  res.render("properties_list", { apartments, username: res.locals.username });
});

// Ruta para procesar el formulario de inicio de sesión
router.post("/login", function (req, res, next) {

  const { email, password } = req.body;
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));

  if (users[email] && users[email].password === password) {
    // Autentica al usuario y establece la sesión
    req.session.user = { email: email, subscriptionLevel: users[email].plan };
    res.redirect("/home");
  } else {
    res.redirect("/error");
  }
});
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error al cerrar sesión:", err);
    }
    res.redirect("/"); // Redirigir a la página de inicio u otra página después de cerrar sesión
  });
});


router.post("/register", function (req, res, next) {
  console.log("BODY REGISTER POST: ", req.body);
  const { name, email, password, plan } = req.body;

  try {
    // Verifica si el usuario ya existe en el archivo users.json
    fs.readFile("./users.json", "utf-8", (err, data) => {
      if (err) {
        throw new Error("Error reading users file.");
      }

      const users = JSON.parse(data);
      if (users[email]) {
        throw new Error("El usuario ya existe");
      }

      users[email] = { name, password, plan };
      fs.writeFile("./users.json", JSON.stringify(users), (err) => {
        if (err) {
          throw new Error("Error writing to users file.");
        }
        res.redirect("/login");
      });
    });
  } catch (error) {
    res.send(error.message);
  }
});
module.exports = router;
