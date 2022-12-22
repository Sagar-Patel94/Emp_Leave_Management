import employeeModel from "../models/employeeModel";
import attendenceModel from "../models/attendenceModel";
import bankModel from "../models/bankDetailsModel";
import bondModel from "../models/bondModel";
import emp_LeaveModel from "../models/empLeaveModel";
import personalDetailsModel from "../models/personalDetailsModel";
import salaryModel from "../models/salaryModel";
import roleModel from "../models/roleModel";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

export default class employeeService {
  static async inputData(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let response;
      try {
        let employee: any = await employeeModel.findOne({
          order: [["Id", "DESC"]],
        });
        let role: any = await roleModel.findOne({
          where: { Id: bodyData.roleId },
        });
        let employeeByEmail: any = await employeeModel.findOne({
          where: { Email: bodyData.email },
        });
        if (employeeByEmail == null) {
          let Password = bodyData.password;
          const salt = await bcrypt.genSalt(10);
          Password = await bcrypt.hash(Password, salt);

          let employeeId, increment;
          if (employee) {
            let prevEmpId = employee.dataValues.Id;
            increment = prevEmpId + 1;
            let lengthValue = increment.toString().length;
            if (lengthValue == 1) {
              employeeId = "E" + "0" + "0" + increment;
            } else if (lengthValue == 2) {
              employeeId = "E" + "0" + increment;
            } else if (lengthValue == 3) {
              employeeId = "E" + increment;
            }
          } else {
            employeeId = "E001";
          }
          if (bodyData.roleId > 0 && bodyData.roleId <= 3) {
            if (bodyData.password === bodyData.confirmPassword) {
              let employee = await employeeModel.create({
                RoleId: bodyData.roleId,
                Employee_Id: employeeId,
                RoleName: role.dataValues.RoleName,
                FullName: bodyData.fullName,
                Email: bodyData.email,
                DOB: bodyData.dob,
                Address: bodyData.address,
                Password: Password,
                Contact: bodyData.contact,
                AlternativeContact: bodyData.alternativeContact,
                RelativePerson: bodyData.relativePerson,
                RelativeContact: bodyData.relativeContact,
                Designation: bodyData.designation,
                IsConfirm: bodyData.isConfirm,
                Confirmation_Date: bodyData.confirmation_Date,
                Joining_Date: bodyData.joining_Date,
                Under_Probation: bodyData.under_Probation,
                Probation_Period: bodyData.probation_Period,
                Reporter: bodyData.reporter,
                ProfileImage: bodyData.uploadPhoto,
                Documents: bodyData.documents,
              });
              if (employee) {
                await personalDetailsModel.create({
                  Reference_Id: employee.dataValues.Id,
                  EmpId: employeeId,
                  FullName: employee.FullName,
                  Email: employee.Email,
                  Address: employee.Address,
                  DOB: employee.DOB,
                  Contact: employee.Contact,
                  AlternativeContact: employee.AlternativeContact,
                  RelativePerson: employee.RelativePerson,
                  RelativeContact: employee.RelativeContact,
                  ProfileImage: employee.ProfileImage,
                  Documents: employee.Documents,
                });
              }
              response = {
                Message: "Data succefully created",
                data: employee.dataValues,
              };
            } else {
              response = {
                Message: "Password don't match",
              };
            }
          } else {
            response = {
              Message: "Role not found",
            };
          }
        } else {
          response = {
            Message: "Email already exist!!!",
          };
        }
      } catch (err: any) {
        response = {
          Message: err.message,
        };
      }
      resolve(response);
    });
  }

  static async getEmployee(id: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await employeeModel.findOne({
        where: { Id: id },
      });
      resolve(data);
    });
  }

  static async updateEmployee(bodyData: any, id: any) {
    return await new Promise(async (resolve, reject) => {
      let response;
      try {
        if (bodyData.roleId > 0 && bodyData.roleId <= 3) {
          let role: any = await roleModel.findOne({
            where: { Id: bodyData.roleId },
          });
          let employee: any = await employeeModel.update(
            {
              RoleId: bodyData.roleId,
              RoleName: role.dataValues.RoleName,
              FullName: bodyData.fullName,
              Email: bodyData.email,
              DOB: bodyData.dob,
              Address: bodyData.address,
              Contact: bodyData.contact,
              AlternativeContact: bodyData.alternativeContact,
              RelativePerson: bodyData.relativePerson,
              RelativeContact: bodyData.relativeContact,
              Designation: bodyData.designation,
              IsConfirm: bodyData.isConfirm,
              Confirmation_Date: bodyData.confirmation_Date,
              Joining_Date: bodyData.joining_Date,
              Under_Probation: bodyData.under_Probation,
              Probation_Period: bodyData.probation_Period,
              Reporter: bodyData.reporter,
              ProfileImage: bodyData.uploadPhoto,
              Documents: bodyData.documents,
            },
            {
              where: { Id: id },
            }
          );
          if (employee == 1) {
            let findEmp = await employeeModel.findOne({
              where: { Id: id },
            });
            await personalDetailsModel.update(
              {
                FullName: findEmp?.FullName,
                Email: findEmp?.Email,
                Address: findEmp?.Address,
                DOB: findEmp?.DOB,
                Contact: findEmp?.Contact,
                AlternativeContact: findEmp?.AlternativeContact,
                RelativePerson: findEmp?.RelativePerson,
                RelativeContact: findEmp?.RelativeContact,
                ProfileImage: findEmp?.ProfileImage,
                Documents: findEmp?.Documents,
              },
              {
                where: { Reference_Id: findEmp?.Id },
              }
            );
            response = {
              Message: "Data succefully updated",
            };
          }
        } else {
          response = {
            Message: "Role not found",
          };
        }
      } catch (err: any) {
        response = {
          Message: err.message,
        };
      }
      resolve(response);
    });
  }

  static async deleteEmployee(id: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await employeeModel.destroy({
        where: {
          Id: id,
        },
      });
      if (data) {
        await personalDetailsModel.destroy({
          where: {
            Reference_Id: id,
          },
        });
      }
      resolve(data);
    });
  }

  static async restoreEmployee(id: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await employeeModel.restore({
        where: {
          Id: id,
        },
      });
      let restoreEmp = await employeeModel.findOne({
        where: { Id: id },
      });
      if (restoreEmp) {
        await personalDetailsModel.restore({
          where: {
            Reference_Id: id,
          },
        });
      }
      resolve(data);
    });
  }

  static async empSignIn(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let response = {};
      try {
        let token = "";
        await employeeModel
          .findOne({
            where: {
              Email: bodyData.email,
            },
          })
          .then(async (data) => {
            if (bodyData.email == "" && bodyData.password == "") {
              response = {
                message: "Please enter email and password",
              };
            } else if (bodyData.password == "") {
              response = {
                message: "Please enter password",
              };
            } else if (bodyData.email == "") {
              response = {
                message: "Please enter email",
              };
            } else if (data) {
              const hashPassword = data.Password;
              await bcrypt
                .compare(bodyData.password, hashPassword)
                .then((result) => {
                  if (result) {
                    token = jwt.sign(
                      {
                        Id: data.Id,
                        RoleId: data.RoleId,
                        Name: data.FullName,
                        Email: data.Email,
                        Password: data.Password,
                      },
                      "secret",
                      { expiresIn: "1h" }
                    );
                    response = {
                      message: "Login successfull",
                      UserToken: token,
                      UserData: data,
                    };
                  } else {
                    response = {
                      message: "Password is incorrect",
                    };
                  }
                })
                .catch((err) => {
                  console.log(err, "=== err ===");
                });
            } else {
              response = {
                message: "Invalid email",
              };
            }
          })
          .catch((error) => {
            console.error(error, "error+++");
          });
        resolve(response);
      } catch (err: any) {
        response = {
          Message: err.message,
        };
        resolve(response);
      }
    });
  }

  static async getAll() {
    return await new Promise(async (resolve, reject) => {
      let data = await employeeModel.findAll({});
      resolve(data);
    });
  }

  static async allDetails(Id: any) {
    return await new Promise(async (resolve, reject) => {
      let data: any = await employeeModel.findAll({
        include: [
          {
            model: attendenceModel,
          },
          {
            model: bankModel,
          },
          {
            model: bondModel,
          },
          {
            model: emp_LeaveModel,
          },
          {
            model: personalDetailsModel,
          },
          {
            model: salaryModel,
          },
        ],
        where: { Id: Id },
      });
      resolve(data);
    });
  }
}
