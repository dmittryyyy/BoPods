const Router = require('express');
const router = new Router();

const deviceRouter = require('./deviceRouter');
const userRouter = require('./userRouter');
const typeRouter = require('./typeRouter');
const brandRouter = require('./brandRouter');
const cartRouter = require('./cartRouter');
const ordersRouter = require('./orderRouter');

router.use('/user', userRouter);
router.use('/type', typeRouter);
router.use('/brand', brandRouter);
router.use('/device', deviceRouter);
router.use('/cart', cartRouter);
router.use('/order', ordersRouter);

module.exports = router;