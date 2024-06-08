import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import userService from '../services/user.service.js';

dotenv.config();

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send({ message: "The token was not informed!" });
  }

  const parts = authHeader.split(" "); // ["Bearer", "TOKEN"]
  if (parts.length !== 2) {
    return res.status(401).send({ message: "Invalid token!" });
  }

  const [scheme, token] = parts;

  if (!/^Bearer$/i.test(scheme)) {
    return res.status(401).send({ message: "Malformatted Token!" });
  }

  jwt.verify(token, process.env.SECRET_JWT, async (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Invalid token!" });
    }

    try {
      const user = await userService.findUserByIdService(decoded.id);
      if (!user || !user.id) {
        return res.status(401).send({ message: "Invalid token!" });
      }

      req.userId = user.id;
      return next();
    } catch (error) {
      return res.status(500).send({ message: "Internal Server Error" });
    }
  });
};

export {
  authMiddleware
};
