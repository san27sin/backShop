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

    async create(phone){
        return await this.phoneNumberModel.create({...phone})
    }

    async deleteOne(id) {
        return await this.phoneNumberModel.destroy({where: {id}})
    }

    async update(id, phone){
        return await this.phoneNumberModel.update({...phone}, {where: {id}})
    }
}

module.exports = new PhoneService(Model.PhoneNumbers)