const uuid = require('uuid');
const path = require('path');
const { Device, DeviceInfo, DeviceDescripton, OrderDevice, CartDevice } = require('../models/models');
const ApiError = require('../error/ApiError');

class DeviceController {

    async create(req, res, next) {
        try {
            let { name, price, brandId, typeId, info } = req.body
            const { img } = req.files
            let fileName = uuid.v4() + '.jpg';
            img.mv(path.resolve(__dirname, '..', 'static', fileName));
            const device = await Device.create({ name, price, brandId, typeId, img: fileName })

            if (info) {
                info = JSON.parse(info);

                info.forEach(i =>
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                )
            }

            return res.json(device)
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }
    async getAll(req, res) {
        try {
            let { brandId, typeId, limit, page } = req.query
        page = page || 1
        limit = limit || 10
        let offset = page * limit - limit
        let devices;
        if (!brandId && !typeId) {
            devices = await Device.findAndCountAll({ limit, offset })
        }
        if (brandId && !typeId) {
            devices = await Device.findAndCountAll({ where: { brandId }, limit, offset })
        }
        if (!brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId }, limit, offset })
        }
        if (brandId && typeId) {
            devices = await Device.findAndCountAll({ where: { typeId, brandId }, limit, offset })
        }
        return res.json(devices)
        } catch(e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async getOne(req, res) {
        const { id } = req.params;
        const device = await Device.findOne(
            {
                where: { id },
                include: [{ model: DeviceInfo, as: 'info' }]
            },
            {
                where: { id },
                include: [{ model: DeviceDescripton, as: 'descr' }]
            }
        )
        return res.json(device)
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await Device.findOne({ where: { id } }).then(async data => {
                if (data) {
                    await Device.destroy({ where: { id } }).then(() => {
                        return res.json('Удалено')
                    })
                } else {
                    return res.json('Данного продукта нет в базе данных')
                }

                await OrderDevice.destroy({ where: { deviceId: id } })
                await CartDevice.destroy({ where: { deviceId: id } })
            })
        } catch (e) {
            next(ApiError.badRequest(e.message));
        }
    }

    async update(req, res) {
        try {
            const { id } = req.params;
            const { brandId, typeId, name, price, info, descr } = req.body;

            await Device.findOne({ where: { id } }).then(async data => {
                if (data) {
                    let newVal = {};
                    brandId ? newVal.brandId = brandId : false;
                    typeId ? newVal.typeId = typeId : false;
                    name ? newVal.name = name : false;
                    price ? newVal.price = price : false;

                    if (req.files) {
                        const { img } = req.files;
                        const type = img.mimetype.split('/')[1];
                        let fileName = uuid.v4() + `.${type}`;
                        img.mv(path.resolve(__dirname, '..', 'static', fileName));
                        newVal.img = fileName;
                    }

                    if (info) {
                        const parseInfo = JSON.parse(info);
                        for (const item of parseInfo) {
                            await DeviceInfo.findOne({ where: { id: item.id } }).then(async data => {
                                if (data) {
                                    await DeviceInfo.update({
                                        title: item.title,
                                        description: item.description
                                    }, { where: { id: item.id } })
                                } else {
                                    await DeviceInfo.create({
                                        title: item.title,
                                        description: item.description,
                                        deviceId: id
                                    })
                                }
                            }
                            )
                        }
                    }
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

module.exports = new DeviceController();