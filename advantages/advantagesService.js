const Model = require('../models/index')

class AdvantagesService {
    constructor(advantageModel) {
        this.advantageModel = advantageModel
    }

    async getAll() {
        return await this.advantageModel.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
    }

    async create(advantage) {
        return await this.advantageModel.create({...advantage})
    }

    async deleteOne(id) {
        return await this.advantageModel.destroy({where: {id}})
    }

    async update(id, advantage) {
        return await this.advantageModel.update({...advantage}, {where: {id}})
    }
}

module.exports = new AdvantagesService(Model.Advantages)