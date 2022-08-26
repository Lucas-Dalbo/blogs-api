const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const userRoute = require('./routes/userRoute');
const categoryRoute = require('./routes/categoryRoute');

// ...

const app = express();

app.use(express.json());

// ...
app.use(userRoute);
app.use(categoryRoute);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
