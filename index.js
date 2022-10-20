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

dotenv.config()

const app = express()

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

app.get('/', (req, res) => {
  res.send('Welcome to pizza-api! 🎉')
})

app.post('/login', userController.login)
app.post('/client/login', clientController.login)

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