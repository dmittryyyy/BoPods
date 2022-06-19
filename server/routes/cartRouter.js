const Router = require('express');
const router = new Router();
const CartController = require('../controllers/cartController');
const authMeddleware = require('../middleware/authMiddleware');

router.post('/', authMeddleware, CartController.addDevice)
router.get('/', authMeddleware, CartController.getDevices)
router.delete('/:id', authMeddleware, CartController.deleteDevice)
router.put('/:id', authMeddleware, CartController.updateCountDevice)

module.exports = router;