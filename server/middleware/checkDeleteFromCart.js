const { Cart, CartDevice } = require('../models/models');
const jwt = require('jsonwebtoken');

module.exports = async function (req, res, next) {
    try {
        const { id } = req.params;
        const user = req.user;
        const userCart = await Cart.findOne({where: {userId: user.id}});
        const deviceItem = await CartDevice.findOne({where: {cartId: userCart.id, device: id}});

        if(deviceItem) {
            return next();
        }
        return res.json('Продукт не найден в корзине пользователя');
    } catch(e) {
        res.json(e);
    }
};