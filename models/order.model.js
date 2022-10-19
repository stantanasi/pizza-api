import { Schema, model } from "mongoose"

const OrderSchema = Schema({
  price: {
    type: Number,
  },


  client: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },

  pizzas: [{
    type: Schema.Types.ObjectId,
    ref: 'Pizza',
    default: [],
  }],
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

const Order = model('Order', OrderSchema)
export default Order