import { Request, Response } from "express";
import quarterService from "../services/quarterService";

export default class quarterController {
  static create = async (req: Request, res: Response) => {
    let response: any = await quarterService.inputData(req.body);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: "Quarter successfully created",
        data: response,
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found", data: response });
    }
  };

  static update = async (req: Request, res: Response) => {
    let response: any = await quarterService.updt(req.body);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: "Quarter successfully updated",
      });
    } else {
      return res.status(200).json({ status: 200, message: "No data found" });
    }
  };
}
