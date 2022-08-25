const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const userRouter = require('./routes/userRoute');

// ...

const app = express();

app.use(express.json());

// ...
app.use(userRouter);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
