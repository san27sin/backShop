const Model = require('../models/index')

class SocialNetworkService {
    constructor(socialNetworkModel) {
        this.socialNetworkModel = socialNetworkModel
    }

    async getAll() {
        return await this.socialNetworkModel.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
    }

    async create(socialNetwork) {
        return await this.socialNetworkModel.create({...socialNetwork})
    }

    async deleteOne(id) {
        return await this.socialNetworkModel.destroy({where: {id}})
    }

    async update(id, socialNetwork) {
        return await this.socialNetworkModel.update({...socialNetwork}, {where: {id}})
    }
}

module.exports = new SocialNetworkService(Model.SocialNetwork)