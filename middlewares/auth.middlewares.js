import jwt from 'jsonwebtoken'
import { findUser, findUserById } from '../repositories/user.repository.js';

const authMiddleware = {
    authentication: async (req, res, next) => {
      const authToken = req.headers['authorization']
      try {
        const token = authToken && authToken.split(' ')[1]
        if(!token) throw new Error('Please login again')
        const verifyToken = jwt.verify(token, process.env.ACCESS_TK_KEY)
        const { _id } = verifyToken
        const user = await findUserById(_id)
        if(!user) throw new Error('Unauthorized')
        req.currentUser = user
        next();
      } catch (error) {
        res.status(401).send({
            message: error.message
        })
      }
    }
};
export default authMiddleware;