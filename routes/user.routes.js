import { Router } from "express"
import userController from "../controllers/user.controller.js"
import authJwt from "../middlewares/auth-jws.js"

const userRoutes = Router()

userRoutes.get('/', [authJwt.verifyToken], userController.getUsers)

userRoutes.post('/', userController.createUser)

userRoutes.get('/:id', [authJwt.verifyToken], userController.getUserById)

userRoutes.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.updateUserById)

userRoutes.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUserById)

export default userRoutes