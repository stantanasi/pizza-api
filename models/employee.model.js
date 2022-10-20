import { Schema, model } from "mongoose"
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const EmployeeSchema = Schema({
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

EmployeeSchema.virtual('orders', {
  ref: 'Order',
  localField: '_id',
  foreignField: 'employee'
});

EmployeeSchema.pre('save', function () {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
});

EmployeeSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

EmployeeSchema.methods.getJWT = function () {
  return jwt.sign({ id: this._id.toString(), isAdmin: this.isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '1h'
  });
};

const Employee = model('Employee', EmployeeSchema)
export default Employee