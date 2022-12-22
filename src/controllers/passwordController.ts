import { Request, Response } from "express";
import passwordService from "../services/passwordService";

export default class employeeController {
static otp = async (req: Request, res: Response) => {
    let response: any = await passwordService.emailOtp(req.body);
    if (response) {
      return res.status(200).json({
        status: 200,
        message: "OTP sent to your email",
      });
    } else {
      return res.status(200).json({ status: 200, message: "Email not found" });
    }
  };

  static reset = async (req: Request, res: Response) => {
    let response: any = await passwordService.resetPassword(req.body);
    return res.status(200).json(response);
  };

  static changePassword = async (req: Request, res: Response) => {
    let response: any = await passwordService.changePass(req.body);
    return res.status(200).json(response);
  }
}