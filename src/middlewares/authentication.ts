import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import role from "../models/roleModel";
import employee from "../models/employeeModel";

export default class authentication {
  static authentication = (req: Request, res: Response, next: NextFunction) => {
    try {
      let authorizationToken: any = req.get("authorization");
      if (authorizationToken == undefined) {
        res.status(200).json({ Message: "Token not found" });
      } else {
        let token: string = authorizationToken.split(" ")[1];
        jwt.verify(token, "secret", async function (err, decoded) {
          if (decoded) {
            let decode: any = jwt.decode(token);
            let data: any = await employee.findByPk(decode.Id, {
              attributes: ["Id", "RoleId", "FullName"],
              include: [
                {
                  model: role,
                  attributes: ["Id", "RoleName"],
                },
              ],
            });
            // console.log(JSON.stringify(data))   // proper data display in console // convert data into json format
            if (data.role.RoleName == "Admin" || data.role.RoleName == "HR") {
              // res.locals.Id = data.Id;
              next();
            } else {
              return res
                .status(200)
                .json({ message: "You are not authorized user" });
            }
          } else {
            return res
              .status(200)
              .json({ message: "Invalid or expired token!!!" });
          }
        });
      }
    } catch (err: any) {
      return res.status(200).json({ message: err.message });
    }
  };
}
