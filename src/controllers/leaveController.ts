import { Request, Response } from "express";
import leaveService from "../services/leaveService";

export default class attendenceController {
  static create = async (req: Request, res: Response) => {
    let response: any = await leaveService.inputData(req.body);
    if (response.Message) {
      return res.status(200).json({
        status: 200,
        message: response.Message,
      });
    } else if (response) {
      return res.status(200).json({
        status: 200,
        message: "Leave successfully created",
        data: response,
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found", data: response });
    }
  };

  static getLeave = async (req: Request, res: Response) => {
    let response: any = await leaveService.getData(req.query.Id);
    if (response[0]) {
      return res.status(200).json({
        status: 200,
        message: "Leave successfully fetched",
        data: response,
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found", data: null });
    }
  };

  static update = async (req: Request, res: Response) => {
    let response: any = await leaveService.updtLeave(req.body);
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
    let response: any = await leaveService.deleteLeave(req.query.id);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: "Leave successfully deleted",
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found", data: null });
    }
  };

  static create1 = async (req: Request, res: Response) => {
    let response: any = await leaveService.inputData1(req.body);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: response.Message,
        data: response.data,
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found" });
    }
  };

  static status = async (req: Request, res: Response) => {
    let response: any = await leaveService.createStatus(req.body);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: "Status succefully created"
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found", data: response });
    }
  };
}