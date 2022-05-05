const { Type } = require('../models/models');
const ApiError = require('../error/ApiError');

class TypeController {
    async create(req, res) {
        const { name } = req.body
        const type = await Type.create({ name });
        return res.json({ type })
    }
    async getAll(req, res) {
        const types = await Type.findAll()
        return res.json(types);
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await Type.findOne({ where: { id } }).then(async data => {
                if (data) {
                    await Type.destroy({ where: { id } }).then(() => {
                        return res.json('Тип удален')
                    })
                } else {
                    return res.json('Тип не найден в БД')
                }
            })
        } catch (e) {
            return res.json(e)
        }
    }
}

module.exports = new TypeController();