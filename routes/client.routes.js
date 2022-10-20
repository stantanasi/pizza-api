import { Router } from "express"
import clientController from "../controllers/client.controller.js"
import authJwt from "../middlewares/auth-jws.js"

const clientRoutes = Router()

clientRoutes.get('/', [authJwt.verifyToken], clientController.getClients)

clientRoutes.post('/', clientController.createClient)

clientRoutes.get('/:id', [authJwt.verifyToken], clientController.getClientById)

clientRoutes.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], clientController.updateClientById)

clientRoutes.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], clientController.deleteClientById)

export default clientRoutes