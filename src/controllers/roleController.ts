import { Request, Response } from "express";
import roleService from "../services/roleService";

export default class roleController {
  static create = async (req: Request, res: Response) => {
    let response: any = await roleService.inputData(req.body);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: "Data successfully created",
        data: response,
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found", data: response });
    }
  };

  static get = async (req: Request, res: Response) => {
    let response: any = await roleService.getRole(req.query.Id);
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
}
