import Order from "../models/order.model.js"

const getOrders = async function (req, res, next) {
  const limit = req.query.limit || 10;
  const page = req.query.page || 0;

  const orders = await Order.find()
    .limit(limit)
    .skip(limit * page)
  res.json(orders)
};

const createOrder = async function (req, res, next) {
  const order = new Order(req.body)
  await order.save()
  res.json(order)
};

const getOrderById = async function (req, res, next) {
  try {
    const order = await Order.findById(req.params.id)
      .populate('client')
      .populate('restaurant')
      .populate('pizzas')
    res.json(order)
  } catch {
    res.status(404).json({
      error: "Order doesn't exist!"
    })
  }
}

const updateOrderById = async function (req, res, next) {
  try {
    await Order.findByIdAndUpdate(req.params.id, req.body)
    const order = await Order.findById(req.params.id)
    res.json(order)
  } catch {
    res.status(404).json({
      error: "Order doesn't exist!"
    })
  }
};

const deleteOrderById = async function (req, res, next) {
  try {
    await Order.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch {
    res.status(404).json({
      error: "Order doesn't exist!"
    })
  }
};

const orderController = {
  getOrders,
  createOrder,
  getOrderById,
  updateOrderById,
  deleteOrderById,
}
export default orderController