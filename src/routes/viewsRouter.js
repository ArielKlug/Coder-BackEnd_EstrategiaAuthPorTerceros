const { Router } = require('express')
const router = Router()


let comida = [
    {name: "prod1", price: 50},
    {name: "prod2", price: 150},
    {name: "prod3", price: 250},
    {name: "prod4", price: 350}
  ]
  let users = [
    {
      name: "pepe",
      apellido: "lopez",
      role: "ad",
    },
    {
      name: "pablo",
      apellido: "martinez",
      role: "us",
    },
    {
      name: "epito",
      apellido: "elargo",
      role: "us",
    },
    {
      name: "elver",
      apellido: "galarga",
      role: "ad",
    },
  ];


router.get("/vista", (req, res) => {

    
      
    let user = users[Math.floor(Math.random() * users.length)];
    let testing = {
      title: "funca",
      isAd: user.role === "ad",
      user,
      comida,
      style: 'index.css'
    };
  
    res.render("index", testing);
  });


module.exports = router