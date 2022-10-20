import { Router } from "express"
import employeeController from "../controllers/employee.controller.js"
import authJwt from "../middlewares/auth-jws.js"

const employeeRoutes = Router()

/**
 * @api {get} /employees Get list of employees
 * @apiName Get Employees
 * @apiGroup Employee
 *
 * @apiSuccess {String} id Id of the Employee.
 * @apiSuccess {String} firstname Firstname of the Employee.
 * @apiSuccess {String} lastname  Lastname of the Employee.
 * @apiSuccess {String} email  Email of the Employee.
 */
employeeRoutes.get('/', [authJwt.verifyToken], employeeController.getEmployees)

/**
 * @api {post} /employees Create an employee
 * @apiName Create Employee
 * @apiGroup Employee
 *
 * @apiSuccess {String} id Id of the Employee.
 * @apiSuccess {String} firstname Firstname of the Employee.
 * @apiSuccess {String} lastname  Lastname of the Employee.
 * @apiSuccess {String} email  Email of the Employee.
 */
employeeRoutes.post('/', employeeController.createEmployee)

/**
 * @api {get} /employees/:id Get one employee
 * @apiName Get Employee
 * @apiGroup Employee
 * 
 * @apiParam {String} id Employee id
 *
 * @apiSuccess {String} id Id of the Employee.
 * @apiSuccess {String} firstname Firstname of the Employee.
 * @apiSuccess {String} lastname  Lastname of the Employee.
 * @apiSuccess {String} email  Email of the Employee.
 */
employeeRoutes.get('/:id', [authJwt.verifyToken], employeeController.getEmployeeById)

/**
 * @api {patch} /employees/:id Update an employee
 * @apiName Update Employee
 * @apiGroup Employee
 * 
 * @apiParam {String} id Employee id
 *
 * @apiSuccess {String} id Id of the Employee.
 * @apiSuccess {String} firstname Firstname of the Employee.
 * @apiSuccess {String} lastname  Lastname of the Employee.
 * @apiSuccess {String} email  Email of the Employee.
 */
employeeRoutes.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], employeeController.updateEmployeeById)

/**
 * @api {delete} /employees/:id Delete an employee
 * @apiName Delete Employee
 * @apiGroup Employee
 * 
 * @apiParam {String} id Employee id

 * 
 * @apiSuccess {String} message Deletion message.
 * @apiError {String} error Employee doesn't exist!
 */
employeeRoutes.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], employeeController.deleteEmployeeById)

export default employeeRoutes