import { Request, Response } from "express";

export default class fileUploadController {
  static upload = async (req: Request, res: Response) => {
    let image: any = req.files
    if (req.body.image == true) {
      return res.status(200).json({
        message: "Profile photo successfully uploaded",
        status: 200,
        imageUrl: image[0].path
      });
    } else if (req.body.document == true || req.body.others == true) {
      return res.status(200).json({
        message: "Documents successfully uploaded",
        status: 200,
        data: null,
      });
    } else {
      return res.status(200).json({
        message: "No file found!, Please select file first",
        status: 200,
        data: null,
      });
    }
  };
}
