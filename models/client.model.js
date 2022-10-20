import { Schema, model } from "mongoose"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const ClientSchema = Schema({

  firstName: {
    type: String
  },

  lastName: {
    type: String
  },

  address: {
    type: String
  },

  email: {
    type: String
  },

  password: {
    type: String
  },
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
})

ClientSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'client'
});

ClientSchema.pre('save', function () {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
});

ClientSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

ClientSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id.toString()}, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

const Client = model('Client', ClientSchema)
export default Client