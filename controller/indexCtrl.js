const { PrismaClient, Prisma } = require('../generated/prisma');
const asyncHandler = require('express-async-handler');
const { body, validationResult } = require('express-validator');
const { connect } = require('../routes/indexRouter');

const prisma = new PrismaClient();

class IndexCtrl {
  getExcersices = async (req, res) => {
    const user = await req.user;
    const exercises = await prisma.user.findMany({
      where: {
        id: user.id,
      },
      include: {
        exercise: true,
      },
    });

    if (!exercises) {
      res.status(404).json({ message: 'Error: no exercises not found' });
    } else {
      res.status(200).json({ exercises: exercises });
    }
  };

  createExercise = [
    body('exercise')
      .trim()
      .notEmpty()
      .withMessage('Name can not be empty.')
      .isAlpha()
      .withMessage('Name must only contain alphabet letters.')
      .escape(),

    asyncHandler(async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const user = await req.user;
      const exercise = await prisma.exercise.create({
        data: {
          name: req.body.exercise,
          user: {
            connect: {
              id: user.id,
            },
          },
        },
        include: {
          user: true,
        },
      });

      if (!exercise) {
        res.status(409).json({ message: 'Error: creation failed' });
      } else {
        res.status(201).json({ exercise: exercise });
      }
    }),
  ];
}

const indexCtrl = new IndexCtrl();
module.exports = indexCtrl;
