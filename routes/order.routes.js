import { Router } from "express"
import orderController from "../controllers/order.controller.js"

const orderRoutes = Router()

orderRoutes.get('/', orderController.getOrders)

orderRoutes.post('/', orderController.createOrder)

orderRoutes.get('/:id', orderController.getOrderById)

orderRoutes.patch('/:id', orderController.updateOrderById)

orderRoutes.delete('/:id', orderController.deleteOrderById)

export default orderRoutes