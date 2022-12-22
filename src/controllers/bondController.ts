import { Request, Response } from "express";
import bondService from "../services/bondService";

export default class bondController {
  static create = async (req: Request, res: Response) => {
    let response: any = await bondService.inputData(req.body);
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

  static getBondDetails = async (req: Request, res: Response) => {
    let response: any = await bondService.getBond(req.query.Id);
    if (response[0]) {
      return res.status(200).json({
        status: 200,
        message: "Bond successfully fetched",
        data: response,
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found", data: null });
    }
  };

  static update = async (req: Request, res: Response) => {
    let response: any = await bondService.updateBond(req.body);
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
    let response: any = await bondService.deleteBond(req.query.id);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: "Bond successfully deleted",
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found", data: null });
    }
  };
}
