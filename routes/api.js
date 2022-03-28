const express = require("express");
const router = express.Router();
const Product = require("../Models/Products");

router.get("/chatbot", (req, res) => {
  res.json({ ok: true, msg: "Esto esta funcionando bien" });
});

router.post("/products", (req, res) => {
  
  console.log( req );
  
  let product = new Product({
    name: req.query.name,
    description: req.query.description,
    price: req.query.price,
    img: req.query.img,
  });
  product.save((err, productDB) => {
    if (err) return res.json({ ok: false, msg: "Hubo un error" });
    res.json({
      ok: true,
      msg: "Producto creado correctamente",
      product: productDB,
    });
  });
});

module.exports = router;
