import Employee from "../models/employee.model.js"

const login = async function (req, res, next) {
  if (!req.body.email || !req.body.password) {
    res.status(200).json({ message: 'Missing Data!!' })
    return
  }

  const employee = await Employee.findOne({
    email: req.body.email
  });

  if (!employee) {
    res.status(200).json({ message: 'Employee Not Found!' })
    return
  }

  const isPassworddValid = employee.comparePassword(req.body.password);

  if (isPassworddValid) {
    res.status(200).json({
      data: employee,
      token: employee.getJWT()
    });
  } else {
    res.status(200).json({ message: 'Password is not valid!' });
  }
}


const getEmployees = async function (req, res, next) {
  const query = Object.assign({}, req.query)
  const limit = req.query.limit || 10;
  const page = req.query.page || 0;

  delete query.limit;
  delete query.page;

  const employees = await Employee.find(query)
    .limit(limit)
    .skip(limit * page)
  res.json(employees)
};

const createEmployee = async function (req, res, next) {
  let employee = await Employee.findOne({
    email: req.body.email
  });

  if (employee) {
    res.json({
      message: 'Failed! Email already in use!'
    });
    return;
  }

  employee = new Employee(req.body);
  await employee.save();

  res.json(employee)
};

const getEmployeeById = async function (req, res, next) {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate('orders')
    res.json(employee)
  } catch {
    res.status(404).json({
      error: "Employee doesn't exist!"
    })
  }
}

const updateEmployeeById = async function (req, res, next) {
  try {
    await Employee.findByIdAndUpdate(req.params.id, req.body)
    const employee = await Employee.findById(req.params.id)
    res.json(employee)
  } catch {
    res.status(404).json({
      error: "Employee doesn't exist!"
    })
  }
};

const deleteEmployeeById = async function (req, res, next) {
  try {
    await Employee.findByIdAndDelete(req.params.id)
    res.status(204).send()
  } catch {
    res.status(404).json({
      error: "Employee doesn't exist!"
    })
  }
};


const employeeController = {
  login,

  getEmployees,
  createEmployee,
  getEmployeeById,
  updateEmployeeById,
  deleteEmployeeById,
}
export default employeeController