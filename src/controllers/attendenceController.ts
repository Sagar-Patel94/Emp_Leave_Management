import { Request, Response } from "express";
import attendenceService from "../services/attendenceService";

export default class attendenceController {
  static create = async (req: Request, res: Response) => {
    let response: any = await attendenceService.inputData(req.body);
    // console.log(response, "fffffffffffffffffffff")
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

  static getAttendence = async (req: Request, res: Response) => {
    let response: any = await attendenceService.getData(req.query.Id);
    if (response[0]) {
      return res.status(200).json({
        status: 200,
        message: "Attendence successfully fetched",
        data: response,
      });
    } else {
      return res
        .status(200)
        .json({ status: 200, message: "No data found", data: null });
    }
  };
}
