import { Schema, model } from "mongoose"

const RestaurantSchema = Schema({
  name: {
    type: String
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

RestaurantSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'restaurant'
});

const Restaurant = model('Restaurant', RestaurantSchema)
export default Restaurant