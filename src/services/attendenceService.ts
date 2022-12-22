import attendenceModel from "../models/attendenceModel";
import employeeModel from "../models/employeeModel";
import moment from "moment";
export default class attendenceService {
  static async inputData(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let response;
      try {
        const date = new Date();
        /******************************************************Job Duration**************************************************************** */
        const timeForWork = (startTime: any, endTime: any, format: any) => {
          startTime = moment(startTime, `${date.toDateString()} HH:mm:ss`);
          endTime = moment(endTime, `${date.toDateString()} HH:mm:ss`);
          return endTime.diff(startTime, format);
        };

        let startTime = new Date(`${date.toDateString()} ${bodyData.inTime}`);
        let endTime = new Date(`${date.toDateString()} ${bodyData.outTime}`);

        let totalTime = timeForWork(startTime, endTime, "seconds");
        let totalHour: any = Math.floor(totalTime / 3600);
        if (totalHour < 10) {
          totalHour = "0" + totalHour;
        }
        let intHour = totalHour * 3600;
        let remainingSecond = totalTime - intHour;
        let totalMinute: any = Math.floor(remainingSecond / 60);
        if (totalMinute < 10) {
          totalMinute = "0" + totalMinute;
        }
        let intSecond = totalMinute * 60;
        let totalSecond: any = Math.floor(remainingSecond - intSecond);
        if (totalSecond < 10) {
          totalSecond = "0" + totalSecond;
        }

        let workTime: any = totalHour + ":" + totalMinute + ":" + totalSecond;
        console.log(workTime, "Total Job Time");

        /******************************************************Break Duration**************************************************************** */
        const timeForBreak = (startTime: any, endTime: any, format: any) => {
          startTime = moment(startTime, `${date.toDateString()} HH:mm:ss`);
          endTime = moment(endTime, `${date.toDateString()} HH:mm:ss`);
          return endTime.diff(startTime, format);
        };

        let startTime1 = new Date(
          `${date.toDateString()} ${bodyData.breakInTime}`
        );
        let endTime1 = new Date(
          `${date.toDateString()} ${bodyData.breakOutTime}`
        );

        let totalTimeForBreak = timeForBreak(startTime1, endTime1, "seconds");
        let totalHourForBreak: any = Math.floor(totalTimeForBreak / 3600);
        if (totalHourForBreak < 10) {
          totalHourForBreak = "0" + totalHourForBreak;
        }
        let intHourForBreak = totalHourForBreak * 3600;
        let remainingSecond1 = totalTimeForBreak - intHourForBreak;
        let totalMinuteForBreak: any = Math.floor(remainingSecond1 / 60);
        if (totalMinuteForBreak < 10) {
          totalMinuteForBreak = "0" + totalMinuteForBreak;
        }
        let intSecondForBreak = totalMinuteForBreak * 60;
        let totalSecondForBreak: any = Math.floor(
          remainingSecond1 - intSecondForBreak
        );
        if (totalSecondForBreak < 10) {
          totalSecondForBreak = "0" + totalSecondForBreak;
        }

        let workTimeForBreak: any =
          totalHourForBreak +
          ":" +
          totalMinuteForBreak +
          ":" +
          totalSecondForBreak;
        console.log(workTimeForBreak, "Total Break Time");

        /******************************************************Work Duration**************************************************************** */
        var finalTime = moment(new Date(`${date.toDateString()} ${workTime}`));
        finalTime.subtract(workTimeForBreak);

        let hour: any = finalTime.hour();
        if (hour < 10) {
          hour = "0" + hour;
        }

        let minute: any = finalTime.minute();
        if (minute < 10) {
          minute = "0" + minute;
        }

        let second: any = finalTime.second();
        if (second < 10) {
          second = "0" + second;
        }

        let totalWorkTime: any = hour + ":" + minute + ":" + second;
        console.log(totalWorkTime, "Total Work Time");

        /******************************************************Average Time**************************************************************** */
        let totalAvgTime, avg;
        let prevAttendence: any = await attendenceModel.findOne({
          where: { Reference_Id: bodyData.referenceId },
          order: [["Id", "DESC"]],
        });
        if (prevAttendence) {
          let prevMonth =
            moment(`${prevAttendence.dataValues.Date}`).month() + 1;
          let currMonth = moment(`${date.toDateString()}`).month() + 1;
          if (prevMonth == currMonth) {
            let findData: any = await attendenceModel.findOne({
              where: { Reference_Id: bodyData.referenceId },
              order: [["Id", "DESC"]],
            });
            var averageTime = moment(
              new Date(
                `${date.toDateString()} ${findData.dataValues.AverageTime}`
              )
            );
            averageTime.add(totalWorkTime);

            let sumHour = averageTime.hour();
            let sumMinute = averageTime.minute();
            let sumSecond = averageTime.second();

            var timeInValue = sumHour * 3600 + sumMinute * 60 + sumSecond; // in second
            var average = timeInValue / 2;

            let h: any = Math.floor(average / 3600);
            if (h < 10) {
              h = "0" + h;
            }
            let m: any = Math.floor((average % 3600) / 60);
            if (m < 10) {
              m = "0" + m;
            }
            let s: any = Math.floor((average % 3600) % 60);
            if (s < 10) {
              s = "0" + s;
            }

            totalAvgTime = h + ":" + m + ":" + s;
            console.log(totalAvgTime, "Total Average Time");
            avg = totalAvgTime;
          } else {
            avg = totalWorkTime;
          }
        } else {
          avg = totalWorkTime;
        }
        let employee: any = await employeeModel.findOne({
          where: { Id: bodyData.referenceId },
        });
        if (employee == null) {
          resolve(false);
        } else {
          let attendence: any = await attendenceModel.create({
            Reference_Id: bodyData.referenceId,
            EmpId: employee.dataValues.Employee_Id,
            Date: date.toDateString(),
            InTime: bodyData.inTime,
            OutTime: bodyData.outTime,
            BreakInTime: bodyData.breakInTime,
            BreakOutTime: bodyData.breakOutTime,
            TotalTime: totalWorkTime,
            AverageTime: avg,
          });
          response = {
            Message: "Attendence successfully created",
            data: attendence.dataValues,
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

  static async getData(id: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await attendenceModel.findAll({ where: { Reference_Id: id } });
      resolve(data);
    });
  }
}
