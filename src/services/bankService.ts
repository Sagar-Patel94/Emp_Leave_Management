import bankModel from "../models/bankDetailsModel";
import employeeModel from "../models/employeeModel";

export default class bankService {
  static async inputData(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let response;
      try {
        let employee: any = await employeeModel.findOne({
          where: { Id: bodyData.referenceId },
        });
        if (employee == null) {
          response = {
            Message: "Employee not found",
          };
        } else {
          let bank: any = await bankModel.create({
            Reference_Id: bodyData.referenceId,
            EmpId: employee.dataValues.Employee_Id,
            BankName: bodyData.bankName,
            Branch: bodyData.branch,
            IFSC_Code: bodyData.ifsc_code,
            Account_number: bodyData.accountNum,
          });
          if (bank) {
            response = {
              Message: "Bank successfully created",
              data: bank.dataValues,
            };
          } else {
            resolve(false);
          }
        }
      } catch (err: any) {
        response = {
          Message: err.message,
        };
      }
      resolve(response);
    });
  }

  static async getDetail(id: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await bankModel.findAll({ where: { Reference_Id: id } });
      resolve(data);
    });
  }

  static async updtBank(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let response;
      try {
        let findBank = await bankModel.findOne({
          where: { Id: bodyData.id },
        });
        if (findBank == null) {
          resolve(false);
        } else {
          await bankModel.update(
            {
              BankName: bodyData.bankName,
              Branch: bodyData.branch,
              IFSC_Code: bodyData.ifsc_code,
              Account_number: bodyData.accountNum,
            },
            {
              where: { Id: bodyData.id },
            }
          );
          response = {
            Message: "Bank successfully updated",
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

  static async deleteBank(id: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await bankModel.destroy({ where: { Id: id } });
      resolve(data);
    });
  }
}
