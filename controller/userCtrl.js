const { PrismaClient } = require('../generated/prisma');
const bcrypt = require('bcryptjs');

//_________________________________________________________________

const prisma = new PrismaClient();

class AuthCtrl {
  createUser = async (req, res) => {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    console.log(hashedPassword);
    const user = await prisma.user.create({
      data: {
        name: req.body.username,
        email: req.body.email,
        password: hashedPassword,
      },
    });

    if (!user) {
      res.status(409).json({ message: 'Error: username or email is taken' });
    } else {
      res.status(201).json({ message: 'Created User', user: user });
    }
  };
}

const authCtrl = new AuthCtrl();
module.exports = authCtrl;
