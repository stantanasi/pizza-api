import Restaurant from "../models/restaurant.model.js"

const getRestaurants = async function (req, res, next) {
  const limit = req.query.limit || 10;
  const page = req.query.page || 0;

  const restaurants = await Restaurant.find()
    .limit(limit)
    .skip(limit * page)

  let restaurantList = []
  for (let i = 0; i < restaurants.length; i++) {
    restaurantList.push(
      {
        "id": restaurants[i].id,
        "name": restaurants[i].name,
        "pizzas": restaurants[i].pizzas,
      }
    );
  }
  
  res.json(restaurantList)
};

const createRestaurant = async function (req, res, next) {
  const restaurant = new Restaurant(req.body)
  await restaurant.save()
  res.json({
    "id": restaurant.id,
    "name": restaurant.name,
    "pizzas": restaurant.pizzas,
  })
};

const getRestaurantById = async function (req, res, next) {
  try {
    const restaurant = await Restaurant.findById(req.params.id)
      .populate('pizzas')
      .populate('orders')
    res.json({
      "id": restaurant.id,
      "name": restaurant.name,
      "pizzas": restaurant.pizzas,
    })
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
    res.json({
      "id": restaurant.id,
      "name": restaurant.name,
      "pizzas": restaurant.pizzas,
    })
  } catch {
    res.status(404).json({
      error: "Restaurant doesn't exist!"
    })
  }
};

const deleteRestaurantById = async function (req, res, next) {
  try {
    await Restaurant.findByIdAndDelete(req.params.id)
    res.status(200).send({
      "message": "Deletion complete"
    })
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