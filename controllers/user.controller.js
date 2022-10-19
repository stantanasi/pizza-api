import User from "../models/user.model.js"

const getUsers = async function (req, res, next) {
  const users = await User.find()
  res.json(users)
};

const createUser = async function (req, res, next) {
  let user = await User.findOne({
    email: data.email
  });

  if (user) {
    res.json({
      message: 'Failed! Email already in use!'
    });
    return;
  }

  user = new User(req.body);
  await user.save();

  res.json(user)
};

const getUserById = async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch {
    res.status(404).json({
      error: "User doesn't exist!"
    })
  }
}

const updateUserById = async function (req, res, next) {
  try {
    await User.findByIdAndUpdate(req.params.id, req.body)
    const user = await User.findById(req.params.id)
    res.json(user)
  } catch {
    res.status(404).json({
      error: "User doesn't exist!"
    })
  }
};

const deleteUserById = async function (req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch {
    res.status(404).json({
      error: "User doesn't exist!"
    })
  }
};

const userController = {
  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
}
export default userController