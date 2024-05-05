const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: 'coder27sinitsyn@gmail.com',
        pass: 'lwbg witu vlii moid', //TODO не коммитить убрать пароль в окружение
    }
})

module.exports = transporter