const express = require('express');
const authRouter = require('./routes/authRouter.js');
const indexRouter = require('./routes/indexRouter.js');

const nocache = require('nocache');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(nocache());
app.use(cors());

app.use('/', indexRouter);
app.use('/', authRouter);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});

module.exports = app;
