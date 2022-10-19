import { Schema, model } from "mongoose"
import bcrypt from 'bcryptjs';

const UserSchema = Schema({
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
})

UserSchema.pre('save', function () {
  if (this.isModified('password') || this.isNew) {
    this.password = bcrypt.hashSync(this.password, 8);
  }
});

UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.password);
};

const User = model('User', UserSchema)
export default User