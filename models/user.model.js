import { Schema, model } from "mongoose"

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

const User = model('User', UserSchema)
export default User