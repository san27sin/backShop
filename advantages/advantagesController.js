const advantagesService = require('./advantagesService')

class AdvantagesController {
    constructor(advantagesService) {
        this.advantagiesService = advantagesService
    }

    async getAll(req, res) {
        try {
            const advantages = await this.advantagiesService.getAll()
            res.json(advantages)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async create(req, res) {
        const { title, url, description } = req.body
        try {
            if (title.length < 3 || title.length > 15)
                throw new Error('Число символов меньше 3 или больше 15!')

            if (!/^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(url))
                throw new Error('Ссылка не валидна!')

            if (description.length < 10 || description.length > 200)
                throw new Error('Описание содержит меньше 10 или больше 200 симолов!')

            const advantage = await advantagesService.create({title, url, description})
            res.status(200).json(advantage)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async deleteOne(req, res) {
        const {id} = req.params

        try {
            if (isNaN(id))
                throw new Error('Id is not a number')

            const delAdvantage = await advantagesService.deleteOne(id)
            res.status(200).json(delAdvantage)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async update(req, res) {
        const { id, title, url, description } = req.body

        try {
            if (isNaN(id))
                throw new Error('Id is not a number')

            if (title.length < 3 || title.length > 15)
                throw new Error('Число символов меньше 3 или больше 15!')

            if (!/^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/.test(url))
                throw new Error('Ссылка не валидна!')

            if (description.length < 10 || description.length > 200)
                throw new Error('Описание содержит меньше 10 или больше 200 симолов!')

            const upAdvantage = await advantagesService.update(id, { title, url, description})
            res.status(200).json(upAdvantage)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }
}

module.exports = new AdvantagesController(advantagesService)