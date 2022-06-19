const Router = require('express');
const router = new Router();
const DeviceController = require('../controllers/deviceController');
const checkRole = require('../middleware/checkRoleMiddleware');
const authMeddleware = require('../middleware/authMiddleware');

router.post('/', checkRole('ADMIN'), DeviceController.create)
router.get('/', DeviceController.getAll)
router.get('/:id', DeviceController.getOne)
router.delete('/:id', checkRole('ADMIN'), DeviceController.delete);

module.exports = router