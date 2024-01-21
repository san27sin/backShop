const socialNetworkService = require('./socialNetworkService')

class SocialNetworkController {
    constructor(socialNetworkService) {
        this.socialNetworkService = socialNetworkService
    }

    async getAll(req, res) {
        try {
            const socialNets = await this.socialNetworkService.getAll()
            res.status(200).json(socialNets)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async create(req, res) {
        const { urlPicture, urlSocialNet } = req.body

        try {
            const regUrl = /^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/
            if (!regUrl.test(urlPicture) || !regUrl.test(urlSocialNet))
                throw new Error('Ссылка не валидна!')

            const socialNet = await this.socialNetworkService.create({ urlPicture, urlSocialNet })
            res.status(200).json(socialNet)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async deleteOne(req, res) {
        const {id} = req.params

        try {
            if (isNaN(id))
                throw new Error('Id is not a number')

            const delSocialNet = await this.socialNetworkService.deleteOne(id)
            res.status(200).json(delSocialNet)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }

    async update(req, res) {
        const { id, urlPicture, urlSocialNet } = req.body

        try {
            const regUrl = /^(http|https):\/\/([\w-]+(\.[\w-]+)+)(\/[\w-./?%&=]*)?$/
            if (!regUrl.test(urlPicture) || !regUrl.test(urlSocialNet))
                throw new Error('Ссылка не валидна!')

            const upSocialNet = await this.socialNetworkService.update(id, { urlPicture, urlSocialNet })
            res.status(200).json(upSocialNet)
        } catch (e) {
            res.status(500).json({message: e.message})
        }
    }
}

module.exports = new SocialNetworkController(socialNetworkService)