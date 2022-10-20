import Client from "../models/client.model.js"

const login = async function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(200).json({ message: 'Missing Data!!' })
    return
  }

  const client = await Client.findOne({
    email: req.body.email
  });

  if (!client) {
    res.status(200).json({ message: 'Client Not Found!' })
    return
  }

  const isPassworddValid = client.comparePassword(req.body.password);

  if (isPassworddValid) {
    res.status(200).json({
      data: client,
      token: client.getJWT()
    });
  } else {
    res.status(200).json({ message: 'Password is not valid!' });
  }
}


const getClients = async function (req, res, next) {
  const query = Object.assign({}, req.query)
  const limit = req.query.limit || 10;
  const page = req.query.page || 0;

  delete query.limit;
  delete query.page;

  const clients = await Client.find(query)
    .limit(limit)
    .skip(limit * page)

  let clientList = []
  for (let i = 0; i < clients.length; i++) {
    clientList.push(
      {
        "id": clients[i].id,
        "firstName": clients[i].firstName,
        "lastName": clients[i].lastName,
        "email": clients[i].email,
      }
    );
  }
  res.json(clientList)
};

const createClient = async function (req, res, next) {
  let client = await Client.findOne({
    email: req.body.email
  });

  if (client) {
    res.json({
      message: 'Failed! Email already in use!'
    });
    return;
  }

  client = new Client(req.body);
  await client.save();

  res.json({
    "id": client.id,
    "firstName": client.firstName,
    "lastName": client.lastName,
    "email": client.email,
  })
};

const getClientById = async function (req, res, next) {
  try {
    const client = await Client.findById(req.params.id)
      .populate('orders')
    res.json({
      "id": client.id,
      "firstName": client.firstName,
      "lastName": client.lastName,
      "email": client.email,
    })
  } catch {
    res.status(404).json({
      error: "Client doesn't exist!"
    })
  }
}

const updateClientById = async function (req, res, next) {
  try {
    await Client.findByIdAndUpdate(req.params.id, req.body)
    const client = await Client.findById(req.params.id)
    res.json({
      "id": client.id,
      "firstName": client.firstName,
      "lastName": client.lastName,
      "email": client.email,
    })
  } catch {
    res.status(404).json({
      error: "Client doesn't exist!"
    })
  }
};

const deleteClientById = async function (req, res, next) {
  try {
    await Client.findByIdAndDelete(req.params.id)
    res.status(200).send({
      message: "Deletion complete"
    })
  } catch {
    res.status(404).json({
      error: "Client doesn't exist!"
    })
  }
};


const clientController = {
  login,

  getClients,
  createClient,
  getClientById,
  updateClientById,
  deleteClientById,
}
export default clientController