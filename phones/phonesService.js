const Model = require('../models/index')

class PhoneService {
    constructor(phoneNumberModel) {
        this.phoneNumberModel = phoneNumberModel
    }

    async getAll() {
        return await this.phoneNumberModel.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
    }

    async create(phoneNumber){
        return await this.phoneNumberModel.create({...phoneNumber})
    }

    async deleteOne(id) {
        return await this.phoneNumberModel.destroy({where: {id}})
    }

    async update(id, phoneNumber){
        return await this.phoneNumberModel.update({...phoneNumber}, {where: {id}})
    }
}

module.exports = new PhoneService(Model.PhoneNumbers)