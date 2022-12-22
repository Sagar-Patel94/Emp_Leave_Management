import { Request, Response } from "express";
import employeeService from "../services/employeeService";

export default class employeeController {
  static signUp = async (req: Request, res: Response) => {
    let response: any = await employeeService.inputData(req.body);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: response.Message,
        data: response.data
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found" });
    }
  };

  static getById = async (req: Request, res: Response) => {
    let response: any = await employeeService.getEmployee(req.query.Id);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: "Data successfully fetched",
        data: response,
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found", data: null });
    }
  };

  static update = async (req: Request, res: Response) => {
    let bodyData = req.body;
    let id = req.query.Id;
    let response: any = await employeeService.updateEmployee(bodyData, id);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: response.Message,
      });
    } else {
      return res.status(200).json({ status: 200, message: "No data found" });
    }
  };

  static delete = async (req: Request, res: Response) => {
    let response: any = await employeeService.deleteEmployee(req.query.Id);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: "Data successfully deleted",
      });
    } else {
      return res.status(200).json({ status: 200, message: "No data found" });
    }
  };

  static restore = async (req: Request, res: Response) => {
    let response: any = await employeeService.restoreEmployee(req.query.Id);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: "Data successfully restored",
      });
    } else {
      return res.status(200).json({ status: 200, message: "No data found" });
    }
  };

  static signIn = async (req: Request, res: Response) => {
    let response: any = await employeeService.empSignIn(req.body);
    return res.status(200).json(response);
  };

  static getAllEmp = async (req: Request, res: Response) => {
    let response: any = await employeeService.getAll();
    return res.status(200).json(response);
  };

  static allEmpDetails = async (req: Request, res: Response) => {
    let response: any = await employeeService.allDetails(req.query.Id);
    if (response[0]) {
      return res.status(200).json({
        status: 200,
        message: "Data successfully fetched",
        data: response,
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found", data: null });
    }
  };
}
