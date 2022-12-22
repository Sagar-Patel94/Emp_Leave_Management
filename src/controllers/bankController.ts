import { Request, Response } from "express";
import bankService from "../services/bankService";

export default class bankController {
  static create = async (req: Request, res: Response) => {
    let response: any = await bankService.inputData(req.body);
    if (response) {
      res.status(200).json({
        status: 200,
        message: response.Message,
        data: response.data,
      });
    } else {
      res.status(200).json({
        status: 200,
        message: "No data found",
        data: null,
      });
    }
  };

  static getData = async (req: Request, res: Response) => {
    let response: any = await bankService.getDetail(req.query.Id);
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
    let response: any = await bankService.updtBank(req.body);
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
    let response: any = await bankService.deleteBank(req.query.Id);
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
