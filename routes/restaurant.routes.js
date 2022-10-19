import { Router } from "express"
import restaurantController from "../controllers/restaurant.controller.js"

const restaurantRoutes = Router()

restaurantRoutes.get('/', restaurantController.getRestaurants)

restaurantRoutes.post('/', restaurantController.createRestaurant)

restaurantRoutes.get('/:id', restaurantController.getRestaurantById)

restaurantRoutes.patch('/:id', restaurantController.updateRestaurantById)

restaurantRoutes.delete('/:id', restaurantController.deleteRestaurantById)

export default restaurantRoutes