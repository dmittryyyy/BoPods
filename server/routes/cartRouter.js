const Router = require('express');
const router = new Router();
const CartController = require('../controllers/cartController');
const checkDeleteFromCart = require('../middleware/checkDeleteFromCart');
const authMeddleware = require('../middleware/authMiddleware');

router.post('/', authMeddleware, CartController.addDevice)
router.get('/', authMeddleware, CartController.getDevices)
router.delete('/:id', authMeddleware, CartController.deleteDevice)

module.exports = router;