const { PrismaClient, Prisma } = require('../generated/prisma');
const prisma = new PrismaClient();

class IndexCtrl {
  getExcersices = async (req, res) => {
    const user = await req.user;
    const excersices = await prisma.user.findMany({
      where: {
        id: user.id,
      },
      include: {
        exercise: true,
      },
    });

    if (!excersices) {
      res.status(404).json({ message: 'Error: no exercises not found' });
    } else {
      res.status(200).json({ excersices: excersices });
    }
  };
}

const indexCtrl = new IndexCtrl();
module.exports = indexCtrl;
