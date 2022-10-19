import { Schema, model } from "mongoose"

const PizzaSchema = Schema({
  name: {
    type: String
  },

  price: {
    type: Number,
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

const Pizza = model('Pizza', PizzaSchema)
export default Pizza