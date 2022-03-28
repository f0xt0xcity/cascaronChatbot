const express = require('express');
const router = express.Router();

const Product = require('../Models/Products');

router.get('/', (req, res) => {
  res.json({ ok : true, msg : 'Esto esta funcionando'});
});

router.post('/products', ( req, res) => {
  
  
  let product = new Product({
      name : req.body.name,
      description : req.body.description,
      price : req.body.price,
      img : req.body.img
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