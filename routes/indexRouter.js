const { Router } = require('express');
const passport = require('passport');
const indexCtrl = require('../controller/indexCtrl.js');

const router = Router();

// Get ////////////////////////////////////////////////////////////

router.get(
  '/api/excercises',
  passport.authenticate('jwt', { session: false }),
  indexCtrl.getExcersices
);

//_________________________________________________________________

//

// Post ///////////////////////////////////////////////////////////

router.post(
  '/api/excercises',
  passport.authenticate('jwt', { session: false }),
  indexCtrl.createExercise
);

//_________________________________________________________________

//

// Put ///////////////////////////////////////////////////////////

// ________________________________________________________________

//

// delete /////////////////////////////////////////////////////////

// ________________________________________________________________

module.exports = router;
