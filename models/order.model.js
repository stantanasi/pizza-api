import { Schema, model } from "mongoose"

const OrderSchema = Schema({
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

OrderSchema.virtual('totalPrice').get(function () {
  return this.pizzas
    .map(pizza => pizza.price ?? 0)
    .reduce((a, b) => a + b, 0);
});

OrderSchema
  .pre('findOne', function () {
    this.populate('pizzas');
  })
  .pre('find', function () {
    this.populate('pizzas');
  });

const Order = model('Order', OrderSchema)
export default Order