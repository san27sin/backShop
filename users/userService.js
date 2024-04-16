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

    async activateUser(key) {
        const user = await this.usersModel.findOne({ where: { activationKey: key } })
        await user.update({ isActivated: true })
        return user
    }
}

module.exports = new UserService(Model.Users)