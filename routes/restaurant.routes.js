import { Router } from "express"
import restaurantController from "../controllers/restaurant.controller.js"
import authJwt from "../middlewares/auth-jws.js"

const restaurantRoutes = Router()

/**
 * @api {get} /restaurants Get list of restaurants
 * @apiName Get Restaurants
 * @apiGroup Restaurant
 *
 * @apiSuccess {String} id Id of the restaurant
 * @apiSuccess {String} name Name of the restaurant
 * @apiSuccess {String[]} pizzas List of available pizzas
 */
restaurantRoutes.get('/', [authJwt.verifyToken], restaurantController.getRestaurants)

/**
 * @api {post} /restaurants Create a restaurant
 * @apiName Create Restaurant
 * @apiGroup Restaurant
 *
 * @apiSuccess {String} id Id of the restaurant
 * @apiSuccess {String} name Name of the restaurant
 * @apiSuccess {String[]} pizzas List of available pizzas */
restaurantRoutes.post('/', [authJwt.verifyToken, authJwt.isAdmin], restaurantController.createRestaurant)

/**
 * @api {get} /restaurants/:id Get one restaurant
 * @apiName Get Restaurant
 * @apiGroup Restaurant
 * 
 * @apiParam {String} id Restaurant id
 *
 * @apiSuccess {String} id Id of the restaurant
 * @apiSuccess {String} name Name of the restaurant
 * @apiSuccess {String[]} pizzas List of available pizzas
 */
restaurantRoutes.get('/:id', [authJwt.verifyToken], restaurantController.getRestaurantById)

/**
 * @api {patch} /restaurants/:id Update a restaurant
 * @apiName Update Restaurant
 * @apiGroup Restaurant
 * 
 * @apiParam {String} id Restaurant id
 *
 * @apiSuccess {String} id Id of the restaurant
 * @apiSuccess {String} name Name of the restaurant
 * @apiSuccess {String[]} pizzas List of available pizzas
 */
restaurantRoutes.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], restaurantController.updateRestaurantById)

/**
 * @api {delete} /restaurants/:id Delete a restaurant
 * @apiName Delete Restaurant
 * @apiGroup Restaurant
 * 
 * @apiParam {String} id Restaurant id

 * 
 * @apiSuccess {String} message Deletion message.
 * @apiError {String} error Restaurant doesn't exist!
 */
restaurantRoutes.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], restaurantController.deleteRestaurantById)

export default restaurantRoutes