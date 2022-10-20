import { Router } from "express"
import orderController from "../controllers/order.controller.js"
import authJwt from "../middlewares/auth-jws.js"

const orderRoutes = Router()

/**
 * @api {get} /orders Get list of orders
 * @apiName Get Orders
 * @apiGroup Order
 *
 * @apiSuccess {String} id Id of the Order.
 * @apiSuccess {String} client Client of the Order.
 * @apiSuccess {String} restaurant  Restaurant of the Order.
 * @apiSuccess {String[]} pizzas  List of pizzas of the Order.
 * @apiSuccess {String} employee  Employee of the Order.
 */
orderRoutes.get('/', [authJwt.verifyToken], orderController.getOrders)

/**
 * @api {post} /orders Create a order
 * @apiName Create Order
 * @apiGroup Order
 *
 * @apiSuccess {String} id Id of the Order.
 * @apiSuccess {String} client Client of the Order.
 * @apiSuccess {String} restaurant  Restaurant of the Order.
 * @apiSuccess {String[]} pizzas  List of pizzas of the Order.
 * @apiSuccess {String} employee  Employee of the Order.
 */
orderRoutes.post('/', [authJwt.verifyToken, authJwt.isAdmin], orderController.createOrder)

/**
 * @api {get} /orders/:id Get one order
 * @apiName Get Order
 * @apiGroup Order
 * 
 * @apiParam {String} id Order id
 *
 * @apiSuccess {String} id Id of the Order.
 * @apiSuccess {String} client Client of the Order.
 * @apiSuccess {String} restaurant  Restaurant of the Order.
 * @apiSuccess {String[]} pizzas  List of pizzas of the Order.
 * @apiSuccess {String} employee  Employee of the Order.
 */
orderRoutes.get('/:id', [authJwt.verifyToken], orderController.getOrderById)

/**
 * @api {patch} /orders/:id Update a order
 * @apiName Update Order
 * @apiGroup Order
 * 
 * @apiParam {String} id Order id
 *
 * @apiSuccess {String} id Id of the Order.
 * @apiSuccess {String} client Client of the Order.
 * @apiSuccess {String} restaurant  Restaurant of the Order.
 * @apiSuccess {String[]} pizzas  List of pizzas of the Order.
 * @apiSuccess {String} employee  Employee of the Order.
 */
orderRoutes.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], orderController.updateOrderById)

/**
 * @api {delete} /orders/:id Delete a order
 * @apiName Delete Order
 * @apiGroup Order
 * 
 * @apiParam {String} id Order id

 * 
 * @apiSuccess {String} message Deletion message.
 * @apiError {String} error Order doesn't exist!
 */
orderRoutes.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], orderController.deleteOrderById)

export default orderRoutes