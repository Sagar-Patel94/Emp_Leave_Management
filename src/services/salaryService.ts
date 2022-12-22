import salaryModel from "../models/salaryModel";
import employeeModel from "../models/employeeModel";
export default class salaryService {
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
          let firstSum =
            bodyData.basicSalary +
            bodyData.hra +
            bodyData.bonus +
            bodyData.special_Allowance +
            bodyData.performance_Allowance;
          let secondSum =
            bodyData.pf + bodyData.esi + bodyData.pt + bodyData.other_deduction;
          let monthly = firstSum - secondSum;

          let salary: any = await salaryModel.create({
            Reference_Id: bodyData.referenceId,
            EmpId: employee.dataValues.Employee_Id,
            Basic_Salary: bodyData.basicSalary,
            HRA: bodyData.hra,
            Bonus: bodyData.bonus,
            Special_Allowance: bodyData.special_Allowance,
            Performance_Allowance: bodyData.performance_Allowance,
            PF: bodyData.pf,
            ESI: bodyData.esi,
            PT: bodyData.pt,
            Other_Deduction: bodyData.other_deduction,
            Monthly: monthly,
          });
          if (salary) {
            response = {
              Message: "Salary successfully created",
              data: salary.dataValues,
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
      let data = await salaryModel.findAll({ where: { Reference_Id: id } });
      resolve(data);
    });
  }

  static async updtSalary(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let response;
      try {
        let findSalary = await salaryModel.findOne({
          where: { Id: bodyData.id },
        });
        if (findSalary == null) {
          resolve(false);
        } else {
          await salaryModel.update(
            {
              Basic_Salary: bodyData.basicSalary,
              PF: bodyData.pf,
              ESI: bodyData.esi,
              PT: bodyData.pt,
              Other_Deduction: bodyData.other_deduction,
            },
            {
              where: { Id: bodyData.id },
            }
          );
          response = {
            Message: "Salary successfully updated",
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

  static async deleteSalary(id: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await salaryModel.destroy({ where: { Id: id } });
      resolve(data);
    });
  }
}
