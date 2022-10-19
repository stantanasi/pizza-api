import Restaurant from "../models/restaurant.model.js"

const getRestaurants = async function (req, res, next) {
  const limit = req.query.limit || 10;
  const page = req.query.page || 0;

  const restaurants = await Restaurant.find()
    .limit(limit)
    .skip(limit * page)
  res.json(restaurants)
};

const createRestaurant = async function (req, res, next) {
  const restaurant = new Restaurant(req.body)
  await restaurant.save()
  res.json(restaurant)
};

const getRestaurantById = async function (req, res, next) {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('pizzas')
    res.json(restaurant)
  } catch {
    res.status(404).json({
      error: "Restaurant doesn't exist!"
    })
  }
}

const updateRestaurantById = async function (req, res, next) {
  try {
    await Restaurant.findByIdAndUpdate(req.params.id, req.body)
    const restaurant = await Restaurant.findById(req.params.id)
    res.json(restaurant)
  } catch {
    res.status(404).json({
      error: "Restaurant doesn't exist!"
    })
  }
};

const deleteRestaurantById = async function (req, res, next) {
  try {
    await Restaurant.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch {
    res.status(404).json({
      error: "Restaurant doesn't exist!"
    })
  }
};

const restaurantController = {
  getRestaurants,
  createRestaurant,
  getRestaurantById,
  updateRestaurantById,
  deleteRestaurantById,
}
export default restaurantController