const express = require('express');
const cors = require('cors'); // помогает нам выключить защиту браузера и отправлять запросы на бэк с разного домена
const app = express();
const sequelize = require('./config/db');
const router = require('./routes');
const cookieParse = require('cookie-parser')

app.use(cookieParse())
app.use(cors({origin: true, credentials: true}));
app.use(express.json());
app.use('/', router);

async function start() { // ассинхронная функция которая запускает приложение
    await sequelize
        .sync()
        .then(() => console.log('DB is running'))
        .catch((e) => console.log(e));
    app.listen(3000, () => {
        console.log('Server is running'); // callback загрузится, если все будет хорошо
    })
}

start();