import quarterModel from "../models/leaveForQuarterModel";

export default class quarterService {
  static async inputData(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await quarterModel.create({
        FirstQuarter: bodyData.firstQuarter,
        SecondQuarter: bodyData.secondQuarter,
        ThirdQuarter: bodyData.thirdQuarter,
        FourthQuarter: bodyData.fourthQuarter,
        TotalLeave: bodyData.totalLeave,
        LeaveType: bodyData.leaveType,
      });
      resolve(data);
    });
  }

  static async updt(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await quarterModel.update(
        {
          FirstQuarter: bodyData.firstQuarter,
          SecondQuarter: bodyData.secondQuarter,
          ThirdQuarter: bodyData.thirdQuarter,
          FourthQuarter: bodyData.fourthQuarter,
          TotalLeave: bodyData.totalLeave,
          LeaveType: bodyData.leaveType,
        },
        {
          where: { Id: bodyData.id },
        }
      );
      resolve(data);
    });
  }
}
