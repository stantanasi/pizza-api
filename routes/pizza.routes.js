import { Router } from "express"
import pizzaController from "../controllers/pizza.controller.js"

const pizzaRoutes = Router()

pizzaRoutes.get('/', pizzaController.getPizzas)

pizzaRoutes.post('/', pizzaController.createPizza)

pizzaRoutes.get('/:id', pizzaController.getPizzaById)

pizzaRoutes.patch('/:id', pizzaController.updatePizzaById)

pizzaRoutes.delete('/:id', pizzaController.deletePizzaById)

export default pizzaRoutes