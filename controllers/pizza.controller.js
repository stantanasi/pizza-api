import Pizza from "../models/pizza.model.js"

const getPizzas = async function (req, res, next) {
  const limit = req.query.limit || 10;
  const page = req.query.page || 0;

  const pizzas = await Pizza.find()
    .limit(limit)
    .skip(limit * page)
  res.json(pizzas)
};

const createPizza = async function (req, res, next) {
  const pizza = new Pizza(req.body)
  await pizza.save()
  res.json(pizza)
};

const getPizzaById = async function (req, res, next) {
  try {
    const pizza = await Pizza.findById(req.params.id)
    res.json(pizza)
  } catch {
    res.status(404).json({
      error: "Pizza doesn't exist!"
    })
  }
}

const updatePizzaById = async function (req, res, next) {
  try {
    await Pizza.findByIdAndUpdate(req.params.id, req.body)
    const pizza = await Pizza.findById(req.params.id)
    res.json(pizza)
  } catch {
    res.status(404).json({
      error: "Pizza doesn't exist!"
    })
  }
};

const deletePizzaById = async function (req, res, next) {
  try {
    await Pizza.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch {
    res.status(404).json({
      error: "Pizza doesn't exist!"
    })
  }
};

const pizzaController = {
  getPizzas,
  createPizza,
  getPizzaById,
  updatePizzaById,
  deletePizzaById,
}
export default pizzaController