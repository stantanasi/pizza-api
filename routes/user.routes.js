import { Router } from "express"
import userController from "../controllers/user.controller.js"
import authJwt from "../middlewares/auth-jws.js"

const userRoutes = Router()

/**
 * @api {get} /users Get list of users
 * @apiName Get Users
 * @apiGroup User
 *
 * @apiSuccess {String} id Id of the User.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} email  Email of the User.
 */
userRoutes.get('/', [authJwt.verifyToken], userController.getUsers)

/**
 * @api {post} /users Create a user
 * @apiName Create User
 * @apiGroup User
 *
 * @apiSuccess {String} id Id of the User.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} email  Email of the User.
 */
userRoutes.post('/', userController.createUser)

/**
 * @api {get} /users/:id Get one user
 * @apiName Get User
 * @apiGroup User
 * 
 * @apiParam {String} id User id
 *
 * @apiSuccess {String} id Id of the User.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} email  Email of the User.
 */
userRoutes.get('/:id', [authJwt.verifyToken], userController.getUserById)

/**
 * @api {patch} /users/:id Update a user
 * @apiName Update User
 * @apiGroup User
 * 
 * @apiParam {String} id User id
 *
 * @apiSuccess {String} id Id of the User.
 * @apiSuccess {String} firstname Firstname of the User.
 * @apiSuccess {String} lastname  Lastname of the User.
 * @apiSuccess {String} email  Email of the User.
 */
userRoutes.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.updateUserById)

/**
 * @api {delete} /users/:id Delete a user
 * @apiName Delete User
 * @apiGroup User
 * 
 * @apiParam {String} id User id

 * 
 * @apiSuccess {String} message Deletion message.
 * @apiError {String} error User doesn't exist!
 */
userRoutes.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], userController.deleteUserById)

export default userRoutes