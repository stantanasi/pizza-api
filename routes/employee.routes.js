import { Router } from "express"
import employeeController from "../controllers/employee.controller.js"
import authJwt from "../middlewares/auth-jws.js"

const employeeRoutes = Router()

employeeRoutes.get('/', [authJwt.verifyToken], employeeController.getEmployees)

employeeRoutes.post('/', employeeController.createEmployee)

employeeRoutes.get('/:id', [authJwt.verifyToken], employeeController.getEmployeeById)

employeeRoutes.patch('/:id', [authJwt.verifyToken, authJwt.isAdmin], employeeController.updateEmployeeById)

employeeRoutes.delete('/:id', [authJwt.verifyToken, authJwt.isAdmin], employeeController.deleteEmployeeById)

export default employeeRoutes