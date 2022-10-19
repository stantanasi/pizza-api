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

const Restaurant = model('Restaurant', RestaurantSchema)
export default Restaurant