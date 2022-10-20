import { Router } from "express"
import pizzaController from "../controllers/pizza.controller.js"
import authJwt from "../middlewares/auth-jws.js"

const pizzaRoutes = Router()

/**
 * @api {get} /pizzas Get list of pizzas
 * @apiName Get Pizzas
 * @apiGroup Pizza
 *
 * @apiSuccess {String} id Id of the Pizza.
 * @apiSuccess {String} name Name of the Pizza.
 * @apiSuccess {number} price  Price of the Pizza.
 */
pizzaRoutes.get('/', [authJwt.verifyToken], pizzaController.getPizzas)

/**
 * @api {post} /pizzas Create a pizza
 * @apiName Create Pizza
 * @apiGroup Pizza
 *
 * @apiSuccess {String} id Id of the Pizza.
 * @apiSuccess {String} name Name of the Pizza.
 * @apiSuccess {number} price  Price of the Pizza.
 */
pizzaRoutes.post('/', [authJwt.verifyToken, authJwt.isAdmin], pizzaController.createPizza)

/**
 * @api {get} /pizzas/:id Get one pizza
 * @apiName Get Pizza
 * @apiGroup Pizza
 * 
 * @apiParam {String} id Pizza id
 *
 * @apiSuccess {String} id Id of the Pizza.
 * @apiSuccess {String} name Name of the Pizza.
 * @apiSuccess {number} price  Price of the Pizza.
 */
pizzaRoutes.get('/:id', [authJwt.verifyToken], pizzaController.getPizzaById)

/**
 * @api {patch} /pizzas/:id Update a pizza
 * @apiName Update Pizza
 * @apiGroup Pizza
 * 
 * @apiParam {String} id Pizza id
 *
 * @apiSuccess {String} id Id of the Pizza.
 * @apiSuccess {String} name Name of the Pizza.
 * @apiSuccess {number} price  Price of the Pizza.
 */
pizzaRoutes.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], pizzaController.updatePizzaById)

/**
 * @api {delete} /pizzas/:id Delete a pizza
 * @apiName Delete Pizza
 * @apiGroup Pizza
 * 
 * @apiParam {String} id Pizza id

 * 
 * @apiSuccess {String} message Deletion message.
 * @apiError {String} error Pizza doesn't exist!
 */
pizzaRoutes.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], pizzaController.deletePizzaById)

export default pizzaRoutes