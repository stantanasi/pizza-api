import dotenv from 'dotenv'
import express from 'express'
import rateLimit from 'express-rate-limit';
import mongoose from 'mongoose'
import userController from './controllers/user.controller.js';
import pizzaRoutes from './routes/pizza.routes.js';
import userRoutes from './routes/user.routes.js';

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
  mongoose.connect(process.env.MONGO_DB_URI)
    .then(() => next())
    .catch(err => next(err))
});

app.get('/', (req, res) => {
  res.send('Welcome to pizza-api! 🎉')
})

app.post('/login', userController.login)

app.use('/pizzas', pizzaRoutes)
app.use('/users', userRoutes)

const port = +(process.env.PORT || 3000)
app.listen(port, () => {
  console.log(`Server is listening on ${port}`)
})