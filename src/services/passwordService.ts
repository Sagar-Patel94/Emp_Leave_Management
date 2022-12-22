import employeeModel from "../models/employeeModel";
import nodemailer from "nodemailer";
import otpModel from "../models/otpModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

const password: any = process.env.EMAILPASSWORD;
const email: any = process.env.EMAIL;

export default class passwordService {
  static async emailOtp(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let data: any = await employeeModel.findOne({
        where: { Email: bodyData.email },
      });
      if (data) {
        let otpCode = Math.floor(Math.random() * 100000 + 1);
        let expireIn = new Date().getTime() + 300 * 1000;

        var transporter = nodemailer.createTransport({
          service: "gmail",
          port: 587,
          secure: false,
          auth: {
            user: email,
            pass: password,
          },
        });
        var mailOptions: any = {
          from: email,
          to: `${bodyData.email}`,
          subject: "PragetX Login System",
          text: `Your OTP is :- ${otpCode}, your OTP Expire after 5 minute So, use carefully before expire time.`,
        };
        transporter.sendMail(mailOptions, function (err, info) {
          if (err) {
            console.log(err);
          } else {
            console.log("Email sent :- " + info.response);
          }
        });

        let otpData: any = await otpModel.create({
          EmpId: data.dataValues.Employee_Id,
          Email: bodyData.email,
          OTP: otpCode,
          ExpireIn: expireIn,
        });
        resolve(otpData);
      } else {
        resolve(false);
      }
    });
  }

  static async resetPassword(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let otpData: any = await otpModel.findOne({
        where: { Email: bodyData.email },
        order: [["Id", "DESC"]],
      });
      let response;
      if (otpData == null) {
        response = {
          Message: "Email not found",
        };
      } else {
        let currentTime = new Date().getTime();
        let diff = otpData.dataValues.ExpireIn - currentTime;
        if (diff > 0) {
          if (otpData.dataValues.OTP == bodyData.otp) {
            if (bodyData.newPassword === bodyData.confirmPassword) {
              let password = bodyData.newPassword;
              const salt = await bcrypt.genSalt(10);
              password = await bcrypt.hash(password, salt);
              await employeeModel.update(
                {
                  Password: password,
                },
                {
                  where: { Email: bodyData.email },
                }
              );
              response = {
                message: "Password successfully updated",
              };
            } else {
              response = {
                message: "Password don't match!",
              };
            }
          } else {
            response = {
              message: "Invalid OTP",
            };
          }
        } else {
          response = {
            message: "OTP Expired!",
          };
        }
      }
      resolve(response);
    });
  }

  static async changePass(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let employee: any = await employeeModel.findOne({
        where: { Email: bodyData.email },
      });
      let response;
      if (employee == null) {
        response = {
          Message: "Email not found",
        };
      } else {
        if (bodyData.oldPassword == "") {
          response = {
            Message: "Please enter old password first",
          };
        } else {
          await bcrypt
            .compare(bodyData.oldPassword, employee.dataValues.Password)
            .then(async (result) => {
              if (result) {
                if (
                  bodyData.newPassword == "" ||
                  bodyData.confirmPassword == ""
                ) {
                  response = {
                    Message: "Please enter new or confirm password first",
                  };
                } else {
                  if (bodyData.newPassword === bodyData.confirmPassword) {
                    let password = bodyData.confirmPassword;
                    const salt = await bcrypt.genSalt(10);
                    password = await bcrypt.hash(password, salt);
                    await employeeModel.update(
                      {
                        Password: password,
                      },
                      {
                        where: { Email: bodyData.email },
                      }
                    );
                    response = {
                      Message: "Password successfully changed!!",
                    };
                  } else {
                    response = {
                      Message: "Password don't match!!",
                    };
                  }
                }
              } else {
                response = {
                  Message: "Incorrect old password!!",
                };
              }
            })
            .catch((err) => {
              console.log(err, "=== err ===");
            });
        }
      }
      resolve(response);
    });
  }
}
