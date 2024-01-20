// паттерн dependency injection - один класс закидываем в другой

const Model = require('../models/index');
class CategoriesService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    async getAll() {
        return await this.categoryModel.findAll({
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        }); // select * from categories
    }

    async create(category) {
        return await this.categoryModel.create({...category});
    }

    async deleteOne(id) {
        return await this.categoryModel.destroy({where: {id}})
    }

    async update(id, category) {
        return await this.categoryModel.update({...category}, {where: {id}})
    }
}

module.exports = new CategoriesService(Model.Categories);