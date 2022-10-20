import User from "../models/user.model.js"

const login = async function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(200).json({ message: 'Missing Data!!' })
    return
  }

  const user = await User.findOne({
    email: req.body.email
  });

  if (!user) {
    res.status(200).json({ message: 'User Not Found!' })
    return
  }

  const isPassworddValid = user.comparePassword(req.body.password);

  if (isPassworddValid) {
    res.status(200).json({
      data: user,
      token: user.getJWT()
    });
  } else {
    res.status(200).json({ message: 'Password is not valid!' });
  }
}


const getUsers = async function (req, res, next) {
  let usersList = [];
  const query = Object.assign({}, req.query)
  const limit = req.query.limit || 10;
  const page = req.query.page || 0;

  delete query.limit;
  delete query.page;

  const users = await User.find(query)
    .limit(limit)
    .skip(limit * page)

  for (let i = 0; i < users.length; i++) {
    usersList.push(
      {
        "id": users[i].id,
        "firstName": users[i].firstName,
        "lastName": users[i].lastName,
        "email": users[i].email,
      }
    );
  }
  
  res.json(usersList)
};

const createUser = async function (req, res, next) {
  let user = await User.findOne({
    email: req.body.email
  });

  if (user) {
    res.json({
      message: 'Failed! Email already in use!'
    });
    return;
  }

  user = new User(req.body);
  await user.save();

  res.json({
    "id": user.id,
    "firstName": user.firstName,
    "lastName": user.lastName,
    "email": user.email,
  })
};

const getUserById = async function (req, res, next) {
  try {
    const user = await User.findById(req.params.id)
      .populate('orders')
    res.json({
      "id": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
    })
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
    res.json({
      "id": user.id,
      "firstName": user.firstName,
      "lastName": user.lastName,
      "email": user.email,
    })
  } catch {
    res.status(404).json({
      error: "User doesn't exist!"
    })
  }
};

const deleteUserById = async function (req, res, next) {
  try {
    await User.findByIdAndDelete(req.params.id)
    res.status(200).send({
      message: "Deletion complete"
    })
  } catch {
    res.status(404).json({
      error: "User doesn't exist!"
    })
  }
};


const userController = {
  login,

  getUsers,
  createUser,
  getUserById,
  updateUserById,
  deleteUserById,
}
export default userController