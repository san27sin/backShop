// паттерн dependency injection - один класс закидываем в другой

const Model = require('../models/index');
class CategoriesService {
    constructor(categoryModel) {
        this.categoryModel = categoryModel;
    }

    async getAll() {
        await this.categoryModel.findAll(); // select * from categories
    }

    async create(category) {
        return await this.categoryModel.create({...category});
    }
}

module.exports = new CategoriesService(Model.Categories);