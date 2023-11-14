// import {ManageAccount} from '../js/services/firebase-auth.js'

var express = require("express");
var router = express.Router();
const session = require("express-session");

const fs = require("fs");
const apartments = JSON.parse(fs.readFileSync("./views/apartments.json"));
// '../../js/apartments.json'

/* GET home page. */
router.get("/", function (req, res, next) {
  // session = await ManageAccount.authenticate()
  res.render("home", { title: "Express" });
});

router.get("/home", function (req, res, next) {
  // session = await ManageAccount.authenticate()
  res.render("home", { title: "Express" });
});

router.get("/login", function (req, res, next) {
  res.render("login", { title: "Express" });
});

router.get("/register", function (req, res, next) {
  res.render("register", { title: "Express" });
});

router.get("/analitycs", function (req, res, next) {
  res.render("analitycs", { title: "Express" });
});

router.get("/add_property", function (req, res, next) {
  res.render("add_property", { title: "Express" });
});

router.get("/property_detail", function (req, res, next) {
  res.render("property_detail", { title: "Express" });
});

router.get("/properties_list", function (req, res, next) {
  res.render("properties_list", { apartments });
});

router.post("/login", function (req, res, next) {
  console.log("BODY LOGIN POST: ", req.body);
  const { email, password } = req.body;
  // Verifica si el usuario existe en el archivo users.json
  const users = JSON.parse(fs.readFileSync("./users.json", "utf-8"));
  if (users[email] && users[email].password === password) {
    // Autentica al usuario

    // Redirige a la página de inicio
    res.redirect("home");
  } else {
    res.redirect("error");
  }
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
