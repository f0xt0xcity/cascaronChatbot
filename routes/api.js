const express = require('express');
const router = express.Router();

const Product = require('../Models/Products');

router.get('/', (req, res) => {
  res.json({ ok : true, msg : 'Esto esta funcionando'});
});

router.get('/products', (req, res) => {
  res.json({ ok : true, msg : 'Esto esta funcionando'});
});


router.post('/products', ( req, res) => {
  
  let body = req.body;
  
  let product = new Product({
      name : body.name,
      description : body.description,
      price : body.price,
      img : body.img
    });
  product.save( ( err, productDB ) => {
    if ( err ) return res.json({ ok : false, msg : 'Hubo un error'});
    
    
    res.json({
     ok : true,
      msg : 'Producto añadido correctamente',
      product : productDB
    });
  });
});

module.exports = router;