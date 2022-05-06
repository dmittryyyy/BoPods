const Router = require('express');
const router = new Router();
const cartController = require('../controllers/cartController');
const authMiddleware = require('../middleware/authMiddleware');
const checkDeleteFromCart = require('../middleware/checkDeleteFromCart');

router.post('/', authMiddleware, cartController.addDevice)
router.get('/', authMiddleware, cartController.getDevices)
router.delete('/:id', authMiddleware, checkDeleteFromCart, cartController.deleteDevice);

module.exports = router;