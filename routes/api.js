const express = require('express');
const router = express.Router();

const Product = require('../Models/Products');

router.get('/', (req, res) => {
  res.json({ ok : true, msg : 'Esto esta funcionando'});
});

router.post('/products', ( req, res) => {
  
  let body = req.body;
  
  let product = new Product({
      nameProduct : body.nameProduct,
      description : body.description,
      price : body.price,
      img : body.img
    });
  try {
    product.save();
    res.json({
      ok : true,
      msg : 'Producto creado correctamente',
    })
  } catch( err ) {
    res.json({
      ok : false,
      msg : 'Hubo un error',
    })
  }
});

module.exports = router;