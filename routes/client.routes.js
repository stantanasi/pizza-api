import { Router } from "express"
import clientController from "../controllers/client.controller.js"
import authJwt from "../middlewares/auth-jws.js"

const clientRoutes = Router()

/**
 * @api {get} /clients Get list of clients
 * @apiName Get Clients
 * @apiGroup Client
 *
 * @apiSuccess {String} id Id of the Client.
 * @apiSuccess {String} firstname Firstname of the Client.
 * @apiSuccess {String} lastname  Lastname of the Client.
 * @apiSuccess {String} email  Email of the Client.
 */
clientRoutes.get('/', [authJwt.verifyToken], clientController.getClients)

/**
 * @api {post} /clients Create a client
 * @apiName Create Client
 * @apiGroup Client
 *
 * @apiSuccess {String} id Id of the Client.
 * @apiSuccess {String} firstname Firstname of the Client.
 * @apiSuccess {String} lastname  Lastname of the Client.
 * @apiSuccess {String} email  Email of the Client.
 */
clientRoutes.post('/', clientController.createClient)

/**
 * @api {get} /clients/:id Get one client
 * @apiName Get Client
 * @apiGroup Client
 * 
 * @apiParam {String} id Client id
 *
 * @apiSuccess {String} id Id of the Client.
 * @apiSuccess {String} firstname Firstname of the Client.
 * @apiSuccess {String} lastname  Lastname of the Client.
 * @apiSuccess {String} email  Email of the Client.
 */
clientRoutes.get('/:id', [authJwt.verifyToken], clientController.getClientById)

/**
 * @api {patch} /clients/:id Update a client
 * @apiName Update Client
 * @apiGroup Client
 * 
 * @apiParam {String} id Client id
 *
 * @apiSuccess {String} id Id of the Client.
 * @apiSuccess {String} firstname Firstname of the Client.
 * @apiSuccess {String} lastname  Lastname of the Client.
 * @apiSuccess {String} email  Email of the Client.
 */
clientRoutes.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], clientController.updateClientById)

/**
 * @api {delete} /clients/:id Delete a client
 * @apiName Delete Client
 * @apiGroup Client
 * 
 * @apiParam {String} id Client id

 * 
 * @apiSuccess {String} message Deletion message.
 * @apiError {String} error Client doesn't exist!
 */
clientRoutes.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], clientController.deleteClientById)

export default clientRoutes