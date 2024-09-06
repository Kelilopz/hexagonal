// Define las rutas de la aplicación y mapea las URLs a los controladores.
const express = require('express');
const productController = require('../controllers/productController')
const productValidator = require('../validator/productValidator');

const router = express.Router();
const ProductController = new productController();
const ProductValidator = new productValidator();

router.get('/:id', ProductValidator.validateProductId(), (req, res) => ProductController.getProduct(req, res));
router.post('/', ProductValidator.validateProductData(), (req, res) => ProductController.createProduct(req, res));
router.put('/:id', ProductValidator.validateProductUpdateDataById(), (req, res) => ProductController.updateProduct(req, res));
router.delete('/:id', ProductValidator.validateProductId(), (req, res) => ProductController.deleteProduct(req, res));
router.get('/search', (req, res) => ProductController.searchProducts(req, res));


module.exports = router;