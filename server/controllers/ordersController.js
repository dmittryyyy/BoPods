const { Orders, OrderDevice, Device, Brand, Type } = require('../models/models');
const ApiError = require('../error/ApiError');
const jwt = require('jsonwebtoken');

class OrderController {

    async create(req, res) {
        const auth = req.headers.authorixation || '';
        const { mobile, cart } = req.body;

        try {
            let parseDevices = [];
            for (let key of cart) {
                parseDevices.push(key.id)
            }

            const isDeviceInDb = await Device.findAndCountAll({
                where: {id: parseDevices},
                attributes: ['id']
            });

            if(isDeviceInDb.count === parseDevices.length) {
                const row = { mobile };
                if (auth) {
                    const token = auth.split(' ')[1];
                    const { id } = jwt.verify(token, process.env.SECRET_KEY);
                    row.userId = id;
                }

                await Orders.create(row).then(order => {
                    const { id } = order.get();
                    parseDevices.forEach( async (deviceId, i) => {
                        await OrderDevice.create({
                            orderId: id,
                            deviceId,
                            count: cart[i].count
                        });
                    });
                });
            } else {
                const notFoundDevices = [];
                const arrDevices = [];
                isDeviceInDb.rows.forEach(item => arrDevices.push(item.id));
                parseDevices.forEach(deviceId => {
                    if(!arrDevices.includes(deviceId)) {
                        notFoundDevices.push(deviceId);
                    }
                });
                return res.json('Спасибо, скоро с вами свяжутся');
            }
        } catch(e) {
            return res.json(e);
        }
    }

    async updateOrder(req, res) {
        try {
            const { complete, id } = req.body;

            await Orders.findOne({ where: { id } }).then(async data => {
                if (data) {
                    await Orders.update({ complete }, { where: { id } }).then(() => {
                        return res.json('Заказы обновлены');
                    })
                } else {
                    return res.json('Заказы не найдены в ДБ');
                }
            });
        } catch (e) {
            return res.json("Обновить не удалось из за ошибки " + e);
        }
    }

    async deleteOrder(req, res) {
        try {
            const { id } = req.body;

            await Orders.findOne({ where: { id } }).then(async data => {
                if (data) {
                    await Orders.destroy({ where: { id } }).then(() => {
                        return res.json('Заказ удален');
                    })
                } else {
                    return res.json('Данного заказа нет ДБ');
                }
            });
        } catch (e) {
            return res.json('Удалить не удалось из за ошибки ' + e);
        }
    }

    async getAll(req, res) {
        let { limit, page, complete } = req.query;
        page = page || 1;
        limit = limit || 7;
        let offset = page * limit - limit;
        let devices;

        if (complete === 'not-completed') {
            devices = await Orders.findAndCountAll({ whre: { complete: false }, limit, offset });
        } else if (complete === 'complited') {
            devices = await Orders.findAndCountAll({ where: { complete: true }, limit, offset });
        } else {
            devices = await Orders.findAndCountAll({ limit, offset });
        }
        return res.json(devices);
    }

    async getOne(req, res) {
        const { id } = req.params;
        const order = {};
        try {
            let devices;
            let infoDevices = [];
            await Orders.findOne({where:{id}}).then(async data => {
                order.descr = data;
                devices = await OrderDevice.findAll({
                    attributes: ['deviceId', 'count'],
                    where:{orderId: data.id},
                });

                for(let device of devices) {
                    await Device.findOne({
                        attributes: ['name', 'img', 'price'],
                        where: {id: device.deviceId},
                        include: [
                            {
                                attributes: ['name'],
                                model: Type
                            },
                            {
                                attributes: ['name'],
                                model: Brand
                            }
                        ]
                    }).then(async item => {
                        let newObj = {
                            descr: item,
                            count: device.count
                        }
                        infoDevices.push(newObj)
                    });
                }
                order.devices = infoDevices;

                return res.json(order);
            }).catch(() => {
                return res.json('Заказа нет в БД');
            });
        } catch(e) {
            return res.json('Удалить не удалось из за ошибки ' + e)
        }
    }
}

module.exports = new OrderController();