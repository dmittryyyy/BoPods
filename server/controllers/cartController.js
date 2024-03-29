const { Cart, CartDevice, Device, DeviceInfo } = require('../models/models');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

class CartController {

    async addDevice(req, res) {
        try {
            const { id } = req.body;
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const cart = await Cart.findOne({ where: { userId: user.id } });
            await CartDevice.create({ cartId: cart.id, deviceId: id });
            
        } catch (e) {
            console.error(e);
        }
    }

    async getDevices(req, res) {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const user = jwt.verify(token, process.env.SECRET_KEY);
            const { id } = await Cart.findOne({ where: { userId: user.id } });
            const cart = await CartDevice.findAll({ where: { cartId: id } });

            const cartArr = [];
            for (let i = 0; i < cart.length; i++) {
                const CartDevice = await Device.findOne({
                    where: {
                        id: cart[i].deviceId
                    },
                    include: {
                        model: DeviceInfo, as: 'info',
                        whee: {
                            deviceId: cart[i].deviceId,
                            [Op.or]: [
                                {
                                    deviceId: {
                                        [Op.not]: null
                                    }
                                }
                            ],
                        },
                        required: false
                    }
                }
                );
                cartArr.push(CartDevice);
            }
            return res.json(cartArr);
        } catch (e) {
            console.error(e)
        }
    }

    async deleteDevice(req, res) {
        try {
            const { id } = req.params;
            const user = req.user;

            await Cart.findOne({ where: { userId: user.id } }).then(async userCart => {
                if (userCart.userId === user.id) {
                    await CartDevice.destroy({ where: { cartId: userCart.id, deviceId: id } })
                } else {
                    return res.json('Нет доступа');
                }
            });
            return res.json('Товар удален из корзины!');
        } catch (e) {
            console.error(e);
        }
    }

    async updateCountDevice(req, res) {
        try {
            const { id } = req.params;
            const { brandId, typeId, name, price, count, } = req.body;

            await Device.findOne({ where: { id } }).then(async data => {
                if (data) {
                    let newVal = {};
                    brandId ? newVal.brandId = brandId : false;
                    typeId ? newVal.typeId = typeId : false;
                    name ? newVal.name = name : false;
                    price ? newVal.price = price : false;
                    count ? newVal.count = count : false;

                    await Device.update({
                        ...newVal
                    }, { where: { id } }).then(() => {
                        return res.json('Информация обновлена')
                    })
                } else {
                    return res.json('Данный продукта нет в БД')
                }
            })
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
}

module.exports = new CartController();