var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/node_client', {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("Connection Done")
});

const Products = new mongoose.Schema({
  Pname: String,
  price: String,
  image: String,
  weight: String,
  type:String
});

router.get('/', function (req, res, next) {
    res.render('admin/products/index');
  });

router.get('/add', function (req, res, next) {
    res.render('admin/products/add');
  });

  router.post('/add', function (req, res, next) {
    var productModel = mongoose.model('products', Products);
    var product = new productModel(req.body);
    product.save(function (err) {
      if (err) {
        res.send("Error ", err);
      } else {
        res.send("Data Saved");
      }
    })
  })

module.exports = router;