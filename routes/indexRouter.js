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

//_________________________________________________________________

//

// Put ///////////////////////////////////////////////////////////

router.put(
  '/api/exercises',
  passport.authenticate('jwt', { session: false }),
  indexCtrl.addStrength
);

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
