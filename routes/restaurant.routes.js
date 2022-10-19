import { Router } from "express"
import restaurantController from "../controllers/restaurant.controller.js"
import authJwt from "../middlewares/auth-jws.js"

const restaurantRoutes = Router()

restaurantRoutes.get('/', [authJwt.verifyToken], restaurantController.getRestaurants)

restaurantRoutes.post('/', [authJwt.verifyToken, authJwt.isAdmin], restaurantController.createRestaurant)

restaurantRoutes.get('/:id', [authJwt.verifyToken], restaurantController.getRestaurantById)

restaurantRoutes.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], restaurantController.updateRestaurantById)

restaurantRoutes.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], restaurantController.deleteRestaurantById)

export default restaurantRoutes