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

    async create(req, res) {
        const { title, url } = req.body
        try {
            if (title.length < 3 || title.length > 15)
                throw new Error('Число символов меньше 3 или больше 15!')

            if (!/^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(url))
                throw new Error('Ссылка не валидна!')

            const category = await categoriesService.create({title, url})
            res.status(200).json(category)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async deleteOne(req, res) {
        const {id} = req.params

        try {
            if (isNaN(id))
                throw new Error('Id is not a number')

            const delCategory = await categoriesService.deleteOne(id)
            res.status(200).json(delCategory)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async update(req, res) {
        const { id } = req.params
        const { title, url } = req.body

        try {
            if (isNaN(id))
                throw new Error('Id is not a number')

            if (title.length < 3 || title.length > 15)
                throw new Error('Число символов меньше 3 или больше 15!')

            if (!/^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(url))
                throw new Error('Ссылка не валидна!')

            const upCategory = await categoriesService.update(id, { title, url })
            res.status(200).json(upCategory)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async getOne(req, res) {
        const { id } = req.params

        try {
            if (isNaN(id))
                throw new Error('Id is not a number')

            const category = await categoriesService.getOne(id)
            res.status(200).json(category)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }
}

module.exports = new CategoriesController(categoriesService);