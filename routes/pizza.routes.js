import { Router } from "express"
import pizzaController from "../controllers/pizza.controller.js"
import authJwt from "../middlewares/auth-jws.js"

const pizzaRoutes = Router()

pizzaRoutes.get('/', [authJwt.verifyToken], pizzaController.getPizzas)

pizzaRoutes.post('/', [authJwt.verifyToken, authJwt.isAdmin], pizzaController.createPizza)

pizzaRoutes.get('/:id', [authJwt.verifyToken], pizzaController.getPizzaById)

pizzaRoutes.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], pizzaController.updatePizzaById)

pizzaRoutes.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], pizzaController.deletePizzaById)

export default pizzaRoutes