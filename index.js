const express = require('express');
const cors = require('cors'); // помогает нам выключить защиту браузера и отправлять запросы на бэк с разного домена
const app = express();

app.use(cors());
app.use(express.json());

async function start() { // ассинхронная функция которая запускает приложение
    await app.listen(3000, () => {
        console.log('Server is running'); // callback загрузится, если все будет хорошо
    })
}

start();