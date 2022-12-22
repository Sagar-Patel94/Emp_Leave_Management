import { Request, Response } from "express";
import salaryService from "../services/salaryService";

export default class salaryController {
  static create = async (req: Request, res: Response) => {
    let response: any = await salaryService.inputData(req.body);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: response.Message,
        data: response.data,
      });
    } else {
      return res.status(200).json({ status: 200, message: "No data found" });
    }
  };

  static getData = async (req: Request, res: Response) => {
    let response: any = await salaryService.getDetail(req.query.Id);
    if (response[0]) {
      res.status(200).json({
        status: 200,
        message: "Data successfully fetched",
        data: response,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "No data found",
        data: null,
      });
    }
  };

  static update = async (req: Request, res: Response) => {
    let response: any = await salaryService.updtSalary(req.body);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: response.Message,
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found", data: null });
    }
  };

  static delete = async (req: Request, res: Response) => {
    let response: any = await salaryService.deleteSalary(req.query.Id);
    if (response) {
      res.status(200).json({
        status: 200,
        message: "Data successfully deleted",
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "No data found",
      });
    }
  };
}
