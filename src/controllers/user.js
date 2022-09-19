const prisma = require('../utils/prisma');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const key = process.env.KEY;
const saltRounds = 10;

const createUser = async (req, res) => {
  try {
    const schema = Joi.object({
      firstname: Joi.string().min(2).max(15).required(),
      lastname: Joi.string().min(2).max(15).required(),
      email: Joi.string()
        .email({
          minDomainSegments: 2,
          tlds: { allow: ['com', 'net'] },
        })
        .required(),
      password: Joi.string().min(3).max(30).required(),
      confirmPass: Joi.ref('password'),
    });

    const { error, value } = schema.validate(req.body);
    if (error) {
      res.status(400);
      res.json({ error: error.details[0].message });
      return;
    }
    const { password, email, firstname, lastname } = value;
    const userByEmail = await prisma.user.findUnique({ where: { email } });

    if (userByEmail) {
      res.status(409);

      res.json({ error: 'This Email is already exists' });
      return;
    }

    const hash = await bcrypt.hash(password, saltRounds);
    const createdUser = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hash,
      },
    });
    const token = jwt.sign({ id: createdUser.id }, key);
    res.json({ data: createdUser, token });
  } catch (e) {
    return res.json({ err: e.message });
  }
};

module.exports = { createUser };
