const categoriesService = require('./categoriesService');

class CategoriesController {
    constructor(categoriesService) {
        this.categoriesService = categoriesService;
    }

    async getAll(req, res) {
        try {
            const categories = await this.categoriesService.getAll();
            res.json(categories);
        } catch (e) {
            res.status(500).json({message: e.message});
        }
    }
}

module.exports = new CategoriesController(categoriesService);