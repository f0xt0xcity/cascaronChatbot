const express = require('express');
const router = express.Router();

const Product = require('../Models/Products');

router.get('/', (req, res) => {
  res.json({ ok : true, msg : 'Esto esta funcionando'});
});

router.post('/products', ( req, res) => {
  
  const { name }
  
  let product = new Product({
    name : '',
    description : '',
    price : '',
    img : ''
  });
});

module.exports = router;