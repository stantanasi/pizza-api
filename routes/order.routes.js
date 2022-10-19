import { Router } from "express"
import orderController from "../controllers/order.controller.js"
import authJwt from "../middlewares/auth-jws.js"

const orderRoutes = Router()

orderRoutes.get('/', [authJwt.verifyToken], orderController.getOrders)

orderRoutes.post('/', [authJwt.verifyToken, authJwt.isAdmin], orderController.createOrder)

orderRoutes.get('/:id', [authJwt.verifyToken], orderController.getOrderById)

orderRoutes.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], orderController.updateOrderById)

orderRoutes.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], orderController.deleteOrderById)

export default orderRoutes