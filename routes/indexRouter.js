const { Router } = require('express');
const passport = require('passport');
const indexCtrl = require('../controller/indexCtrl.js');

const router = Router();

// Get ////////////////////////////////////////////////////////////

router.get(
  '/api/exercises',
  passport.authenticate('jwt', { session: false }),
  indexCtrl.getExcersices
);

//_________________________________________________________________

//

// Post ///////////////////////////////////////////////////////////

router.post(
  '/api/exercises',
  passport.authenticate('jwt', { session: false }),
  indexCtrl.createExercise
);

router.post(
  '/api/exercises/data',
  passport.authenticate('jwt', { session: false }),
  indexCtrl.addStrength
);

//_________________________________________________________________

//

// Put ///////////////////////////////////////////////////////////

// ________________________________________________________________

//

// delete /////////////////////////////////////////////////////////

router.delete(
  '/api/exercises',
  passport.authenticate('jwt', { session: false }),
  indexCtrl.deleteExercise
);
// ________________________________________________________________

module.exports = router;
