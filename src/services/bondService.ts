import bondModel from "../models/bondModel";
import employeeModel from "../models/employeeModel";
import moment from "moment";

export default class bondService {
  static async inputData(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let response;
      try {
        var endDate = moment(`${bodyData.endDate}`);
        var startDate = moment(`${bodyData.startDate}`);

        let durationDays = endDate.diff(startDate, "days") + 1;
        if (durationDays < 364) {
          resolve({
            Status: 200,
            Message: "Your bond policy is not eligible below 1 Year.",
            data: null,
          });
        } else {
          let durationYear = Math.floor(durationDays / 365);
          let durationMonth = Math.floor((durationDays % 365) / 31);
          let finalDuration = durationYear + "." + durationMonth + " Year";

          let employee: any = await employeeModel.findOne({
            where: { Id: bodyData.referenceId },
          });
          if (employee == null) {
            response = {
              Message: "Employee not found",
            };
          } else {
            let bond: any = await bondModel.create({
              Reference_Id: bodyData.referenceId,
              EmpId: employee.dataValues.Employee_Id,
              StartDate: bodyData.startDate,
              EndDate: bodyData.endDate,
              Duration: finalDuration,
            });
            if (bond) {
              response = {
                Message: "Bond successfully created",
                data: bond.dataValues,
              };
            } else {
              resolve(false);
            }
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

  static async getBond(id: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await bondModel.findAll({ where: { Reference_Id: id } });
      resolve(data);
    });
  }

  static async updateBond(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let response;
      try {
        var endDate = moment(`${bodyData.endDate}`);
        var startDate = moment(`${bodyData.startDate}`);

        let durationDays = endDate.diff(startDate, "days") + 1;
        if (durationDays < 364) {
          response = {
            Message: "Your bond policy is not eligible below 1 Year.",
          };
        } else {
          let durationYear = Math.floor(durationDays / 365);
          let durationMonth = Math.floor((durationDays % 365) / 31);
          let finalDuration = durationYear + "." + durationMonth + " Year";

          let findBond = await bondModel.findOne({
            where: { Id: bodyData.id },
          });
          if (findBond == null) {
            resolve(false);
          } else {
            await bondModel.update(
              {
                StartDate: bodyData.startDate,
                EndDate: bodyData.endDate,
                Duration: finalDuration,
              },
              {
                where: { Id: bodyData.id },
              }
            );
            response = {
              Message: "Bond successfully updated",
            };
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

  static async deleteBond(id: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await bondModel.destroy({ where: { Id: id } });
      resolve(data);
    });
  }
}
