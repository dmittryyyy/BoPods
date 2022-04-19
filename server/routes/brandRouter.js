const Router = require('express');
const brandController = require('../controllers/brandController');
const router = new Router();
const BrandController = require('../controllers/brandController');

router.post('/', brandController.create)
router.get('/', brandController.getAll)
router.delete('/',)

module.exports = router