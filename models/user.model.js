import { Schema, model } from "mongoose"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const UserSchema = Schema({
  isAdmin: {
    type: Boolean,
    default: false
  },

  firstName: {
    type: String
  },

  lastName: {
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

UserSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'client'
});

UserSchema.pre('save', function () {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

UserSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id.toString(), isAdmin: this.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

const User = model('User', UserSchema)
export default User