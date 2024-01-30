const Model = require('../models/index')

class UserService {
    constructor(usersModel) {
        this.usersModel = usersModel
    }

    async getAll() {
        return await this.usersModel.getAll()
    }

    async create(user) {
        return await this.usersModel.create(user)
    }

    async findOne(id) {
        return await this.usersModel.findByPk(id)
    }

    async getUserByEmail(email) {
        return await this.usersModel.findOne({where: {email}})
    }
}

module.exports = new UserService(Model.Users)