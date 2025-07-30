const { Router } = require('express');
const passport = require('passport');
const indexCtrl = require('../controller/indexCtrl.js');

const router = Router();

router.get(
  '/api/excercises',
  passport.authenticate('jwt', { session: false }),
  indexCtrl.getExcersices
);

module.exports = router;
