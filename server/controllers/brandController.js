const { Brand } = require('../models/models');
const ApiError = require('../error/ApiError');

class BrandController {
    async create(req, res) {
        const { name } = req.body

        const brand = await Brand.create({ name })
        return res.json(brand)
    }
    async getAll(req, res) {
        const brands = await Brand.findAll()
        return res.json(brands)
    }

    async delete(req, res) {
        try {
            const { id } = req.params;

            await Brand.findOne({ where: { id } }).then(async data => {
                if (data) {
                    await Brand.destroy({ where: { id } }).then(() => {
                        return res.json('Брэнд удален');
                    })
                } else {
                    return res.json('Брэнд не найден в БД');
                }
            })
        } catch (e) {
            return res.json(e);
        }
    }
}

module.exports = new BrandController();