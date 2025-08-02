require('dotenv').config();
const { PrismaClient } = require('../generated/prisma');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');

// JWT Config /////////////////////////////////////////////////////

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(opts, async (payload, done) => {
    try {
      const user = prisma.user.findFirst({
        where: {
          id: payload.id,
        },
      });
      if (user) return done(null, user);
    } catch (error) {
      return done(error);
    }
  })
);

//_________________________________________________________________

const prisma = new PrismaClient();

class AuthCtrl {
  createUser = [
    body('username', 'Username must not be empty').trim().escape(),
    body('email', 'must be a valid email (ex: example@gmail.com)')
      .trim()
      .isEmail()
      .escape(),
    body('password', 'Password must be a minimum of 5 characters')
      .trim()
      .isLength({ min: 5 })
      .escape(),
    asyncHandler(async (req, res) => {
      try {
        if (req.body.password !== req.body.confirm) {
          const error = [{ msg: 'passwords do not match' }];
          res.status(409).json({ errors: error });
        }

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }

        const hashedPassword = await bcrypt.hash(req.body.password, 10);

        const user = await prisma.user.create({
          data: {
            name: req.body.username,
            email: req.body.email,
            password: hashedPassword,
          },
        });

        if (!user) {
          const error = [{ msg: 'Error: username or email is taken' }];
          res.status(409).json({ errors: error });
        } else {
          res.status(201).json({ message: 'Created User', user: user });
        }
      } catch (err) {
        if ((err.code = 'P2002')) {
          err.message = 'Name or email is already taken';
        }
        const error = [{ msg: err.message }];
        res.status(409).json({ errors: error });
      }
    }),
  ];

  login = asyncHandler(async (req, res, next) => {
    const user = await prisma.user.findFirst({
      where: {
        OR: [
          { name: req.body.usernameOrEmail },
          { email: req.body.usernameOrEmail },
        ],
      },
    });

    if (!user) return res.status(400).json({ message: 'user does not exist' });

    if (
      user.name !== req.body.usernameOrEmail &&
      user.email !== req.body.usernameOrEmail
    )
      return res.status(400).json({ message: 'incorrect username or email' });

    const match = await bcrypt.compare(req.body.password, user.password);
    if (!match) return res.status(400).json({ message: 'incorrect password' });

    const accessToken = jwt.sign(
      {
        id: user.id,
      },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
      //expires in 4 hours, should last whole workout
    );

    return res
      .status(200)
      .json({ message: 'user logged in', accessToken: accessToken });
  });
}

const authCtrl = new AuthCtrl();
module.exports = authCtrl;
