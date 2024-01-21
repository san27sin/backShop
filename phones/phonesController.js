const phonesService = require('./phonesService')
class PhonesController {
    constructor(phonesService) {
        this.phonesService = phonesService
    }

    async getAll(req, res) {
        try {
            const phones = await this.phonesService.getAll()
            res.status(200).json(phones)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async create(req, res) {
        const { phone } = req.body
        try {
            if (!/^((\+7|7|8)+([0-9]){10})$/.test(phone))
                throw new Error('Некорректный номер телефона!')

            const phoneNumber = this.phonesService.create({ phone })
            res.status(200).json(phoneNumber)
        } catch (e) {
            res.status(500).json({ message: e.message })
        }
    }

    async deleteOne(req, res) {
        const {id} = req.params

        try {
            if (isNaN(id))
                throw new Error('Id is not a number')

            const delPhone = await this.phonesService.deleteOne(id)
            res.status(200).json(delPhone)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async update(req, res) {
        const { id, phone } = req.body

        try {
            if (!/^((\+7|7|8)+([0-9]){10})$/.test(phone))
                throw new Error('Некорректный номер телефона!')

            const upPhoneNumber = await this.phonesService.update(id, { phone })
            res.status(200).json(upPhoneNumber)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }
}

module.exports = new PhonesController(phonesService)