import dotenv from 'dotenv'
import express from 'express'
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose'
import userController from './controllers/user.controller.js';
import pizzaRoutes from './routes/pizza.routes.js';
import orderRoutes from './routes/order.routes.js';
import restaurantRoutes from './routes/restaurant.routes.js';
import userRoutes from './routes/user.routes.js';
import clientRoutes from './routes/client.routes.js';
import employeeRoutes from './routes/employee.routes.js';
import clientController from './controllers/client.controller.js';
import employeeController from './controllers/employee.controller.js';
import morgan from 'morgan'

dotenv.config()

const app = express()
const logger = morgan

app.use(logger('dev'))

app.use(express.json())
app.use(
  rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 50,
      message: 'You exceeded 50 request in 15 minutes!!',
      headers: true
  })
);

app.use((req, res, next) => {
  mongoose.connect(process.env.MONGO_DB_URI_CLOUD)
    .then(() => next())
    .catch(err => next(err))
});

/**
 * @api {get} / Welcome Page
 * @apiName Welcome page
 * @apiGroup Root
 *
 * @apiSuccess {String} message Welcome message
 */
app.get('/', (req, res) => {
  res.send('Welcome to pizza-api! 🎉')
})

/**
 * @api {post} /login Login as a user
 * @apiName Login user
 * @apiGroup Root
 *
 * @apiSuccess {String} email Email of the user
 * @apiSuccess {String} password Password of the user
 */
app.post('/login', userController.login)

/**
 * @api {post} /login Login as a client
 * @apiName Login client
 * @apiGroup Root
 *
 * @apiSuccess {String} email Email of the client
 * @apiSuccess {String} password Password of the client
 */
app.post('/client/login', clientController.login)

/**
 * @api {post} /login Login as an employee
 * @apiName Login employee
 * @apiGroup Root
 *
 * @apiSuccess {String} email Email of the employee
 * @apiSuccess {String} password Password of the employee
 */
app.post('/employee/login', employeeController.login)

app.use('/pizzas', pizzaRoutes)
app.use('/orders', orderRoutes)
app.use('/restaurants', restaurantRoutes)
app.use('/users', userRoutes)
app.use('/clients', clientRoutes)
app.use('/employees', employeeRoutes)

const port = +(process.env.PORT || 3000)
app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})

// Important because it prevents nodejs app from crashing
process.on('unhandledRejection', error => {
  console.error('Uncaught Error', pe(error));
});