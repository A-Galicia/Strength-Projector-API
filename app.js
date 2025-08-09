const express = require('express');
const authRouter = require('./routes/authRouter.js');
const indexRouter = require('./routes/indexRouter.js');

const nocache = require('nocache');
const cors = require('cors');

const app = express();

app.use(nocache());
//app.use(cors());
app.options('*', cors());
/* app.use(
  cors({
    methods: ['GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  })
); */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', cors(), indexRouter);
app.use('/', cors(), authRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

module.exports = app;
