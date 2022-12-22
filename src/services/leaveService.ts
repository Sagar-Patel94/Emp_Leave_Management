import leaveModel from "../models/empLeaveModel";
import employeeModel from "../models/employeeModel";
import leaveForQuarterModel from "../models/leaveForQuarterModel";
import statusModel from "../models/leaveStatusModel";
import moment, { now } from "moment";

export default class leaveService {
  static async inputData(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let employee: any = await employeeModel.findOne({
        where: { Id: bodyData.empId },
      });
      let leaveData: any = await leaveModel.findAll({
        where: { EmpId: bodyData.empId },
        order: [["Id", "DESC"]],
      });
      let quarterData: any = await leaveForQuarterModel.findOne({
        where: { Id: 1 },
      });

      let firstQuarter = quarterData.dataValues.FirstQuarter;
      let secondQuarter = quarterData.dataValues.SecondQuarter;
      let thirdQuarter = quarterData.dataValues.ThirdQuarter;
      let fourthQuarter = quarterData.dataValues.FourthQuarter;

      let leaveDays,
        quartilyLeaveBalance,
        leaveWithoutPay,
        response,
        quarterLeave,
        totalQuarterLeave;

      var startDate = moment(`${bodyData.dateFrom}`);
      var endDate = moment(`${bodyData.dateTo}`);

      if (bodyData.leaveType == "Full") {
        leaveDays = endDate.diff(startDate, "days") + 1;
      } else if (bodyData.leaveType == "Half") {
        leaveDays = 0.5;
      } else {
        leaveDays = 0;
        response = {
          Message:
            "Leave type does not match! please select 'Full' or 'Half' only",
        };
        resolve(response);
      }

      let startMonthQuarter = moment(`${bodyData.dateFrom}`).quarter();
      let endMonthQuarter = moment(`${bodyData.dateTo}`).quarter();

      if (leaveData[0]) {
        let currQuarter = moment(`${bodyData.dateFrom}`).quarter();
        let prevQuarter = moment(`${leaveData[0].dataValues.DateTo}`).quarter();
        let prevQuartilyLeaveBalance =
          leaveData[0].dataValues.Quartily_Leave_Balance;
        if (prevQuarter == currQuarter) {
          quartilyLeaveBalance = prevQuartilyLeaveBalance - leaveDays;
          if (quartilyLeaveBalance < 0) {
            leaveWithoutPay = Math.abs(quartilyLeaveBalance);
            quartilyLeaveBalance = 0;
          } else {
            leaveWithoutPay = 0;
          }
          if (startMonthQuarter != endMonthQuarter) {
            if (startMonthQuarter == 1 && endMonthQuarter == 2) {
              if (prevQuarter == 1) {
                totalQuarterLeave = prevQuartilyLeaveBalance + secondQuarter;
              } else if (prevQuarter == 2) {
                totalQuarterLeave = prevQuartilyLeaveBalance;
              }
              let finalQuartilyLeaveBalance = totalQuarterLeave - leaveDays;
              if (finalQuartilyLeaveBalance < 0) {
                quartilyLeaveBalance = 0;
                leaveWithoutPay = Math.abs(finalQuartilyLeaveBalance);
              } else {
                leaveWithoutPay = 0;
                quartilyLeaveBalance = finalQuartilyLeaveBalance;
              }
            } else if (startMonthQuarter == 2 && endMonthQuarter == 3) {
              if (prevQuarter == 1) {
                totalQuarterLeave =
                  prevQuartilyLeaveBalance + secondQuarter + thirdQuarter;
              } else if (prevQuarter == 2) {
                totalQuarterLeave = prevQuartilyLeaveBalance + thirdQuarter;
              } else if (prevQuarter == 3) {
                totalQuarterLeave = prevQuartilyLeaveBalance;
              }
              let finalQuartilyLeaveBalance = totalQuarterLeave - leaveDays;
              if (finalQuartilyLeaveBalance < 0) {
                quartilyLeaveBalance = 0;
                leaveWithoutPay = Math.abs(finalQuartilyLeaveBalance);
              } else {
                leaveWithoutPay = 0;
                quartilyLeaveBalance = finalQuartilyLeaveBalance;
              }
            } else if (startMonthQuarter == 3 && endMonthQuarter == 4) {
              if (prevQuarter == 1) {
                totalQuarterLeave =
                  prevQuartilyLeaveBalance +
                  secondQuarter +
                  thirdQuarter +
                  fourthQuarter;
              } else if (prevQuarter == 2) {
                totalQuarterLeave =
                  prevQuartilyLeaveBalance + thirdQuarter + fourthQuarter;
              } else if (prevQuarter == 3) {
                totalQuarterLeave = prevQuartilyLeaveBalance + fourthQuarter;
              } else if (prevQuarter == 4) {
                totalQuarterLeave = prevQuartilyLeaveBalance;
              }
              let finalQuartilyLeaveBalance = totalQuarterLeave - leaveDays;
              if (finalQuartilyLeaveBalance < 0) {
                quartilyLeaveBalance = 0;
                leaveWithoutPay = Math.abs(finalQuartilyLeaveBalance);
              } else {
                leaveWithoutPay = 0;
                quartilyLeaveBalance = finalQuartilyLeaveBalance;
              }
            }
          }
        } else {
          if (startMonthQuarter == 1 && endMonthQuarter == 1) {
            if (prevQuarter == 1) {
              totalQuarterLeave = prevQuartilyLeaveBalance;
            }
          } else if (startMonthQuarter == 2 && endMonthQuarter == 2) {
            if (prevQuarter == 1) {
              totalQuarterLeave = prevQuartilyLeaveBalance + secondQuarter;
            } else if (prevQuarter == 2) {
              totalQuarterLeave = prevQuartilyLeaveBalance;
            }
          } else if (startMonthQuarter == 3 && endMonthQuarter == 3) {
            if (prevQuarter == 1) {
              totalQuarterLeave =
                prevQuartilyLeaveBalance + secondQuarter + thirdQuarter;
            } else if (prevQuarter == 2) {
              totalQuarterLeave = prevQuartilyLeaveBalance + thirdQuarter;
            } else if (prevQuarter == 3) {
              totalQuarterLeave = prevQuartilyLeaveBalance;
            }
          } else if (startMonthQuarter == 4 && endMonthQuarter == 4) {
            if (prevQuarter == 1) {
              totalQuarterLeave =
                prevQuartilyLeaveBalance +
                secondQuarter +
                thirdQuarter +
                fourthQuarter;
            } else if (prevQuarter == 2) {
              totalQuarterLeave =
                prevQuartilyLeaveBalance + thirdQuarter + fourthQuarter;
            } else if (prevQuarter == 3) {
              totalQuarterLeave = prevQuartilyLeaveBalance + fourthQuarter;
            } else if (prevQuarter == 4) {
              totalQuarterLeave = prevQuartilyLeaveBalance;
            }
          }
          quartilyLeaveBalance = totalQuarterLeave - leaveDays;
          if (quartilyLeaveBalance < 0) {
            leaveWithoutPay = Math.abs(quartilyLeaveBalance);
            quartilyLeaveBalance = 0;
          } else {
            leaveWithoutPay = 0;
          }
          if (startMonthQuarter != endMonthQuarter) {
            let startMonthQuarterYear = startDate.year();
            if (startMonthQuarter == 1 && endMonthQuarter == 2) {
              if (prevQuarter == 1) {
                totalQuarterLeave = prevQuartilyLeaveBalance + secondQuarter;
              } else if (prevQuarter == 2) {
                totalQuarterLeave = prevQuartilyLeaveBalance;
              }
              let finalQuartilyLeaveBalance = totalQuarterLeave - leaveDays;
              if (finalQuartilyLeaveBalance < 0) {
                quartilyLeaveBalance = 0;
                leaveWithoutPay = Math.abs(finalQuartilyLeaveBalance);
              } else {
                leaveWithoutPay = 0;
                quartilyLeaveBalance = finalQuartilyLeaveBalance;
              }
            } else if (startMonthQuarter == 2 && endMonthQuarter == 3) {
              if (prevQuarter == 1) {
                totalQuarterLeave =
                  prevQuartilyLeaveBalance + secondQuarter + thirdQuarter;
              } else if (prevQuarter == 2) {
                totalQuarterLeave = prevQuartilyLeaveBalance + thirdQuarter;
              } else if (prevQuarter == 3) {
                totalQuarterLeave = prevQuartilyLeaveBalance;
              }
              let finalQuartilyLeaveBalance = totalQuarterLeave - leaveDays;
              if (finalQuartilyLeaveBalance < 0) {
                quartilyLeaveBalance = 0;
                leaveWithoutPay = Math.abs(finalQuartilyLeaveBalance);
              } else {
                leaveWithoutPay = 0;
                quartilyLeaveBalance = finalQuartilyLeaveBalance;
              }
            } else if (startMonthQuarter == 3 && endMonthQuarter == 4) {
              if (prevQuarter == 1) {
                totalQuarterLeave =
                  prevQuartilyLeaveBalance +
                  secondQuarter +
                  thirdQuarter +
                  fourthQuarter;
              } else if (prevQuarter == 2) {
                totalQuarterLeave =
                  prevQuartilyLeaveBalance + thirdQuarter + fourthQuarter;
              } else if (prevQuarter == 3) {
                totalQuarterLeave = prevQuartilyLeaveBalance + fourthQuarter;
              } else if (prevQuarter == 4) {
                totalQuarterLeave = prevQuartilyLeaveBalance;
              }
              let finalQuartilyLeaveBalance = totalQuarterLeave - leaveDays;
              if (finalQuartilyLeaveBalance < 0) {
                quartilyLeaveBalance = 0;
                leaveWithoutPay = Math.abs(finalQuartilyLeaveBalance);
              } else {
                leaveWithoutPay = 0;
                quartilyLeaveBalance = finalQuartilyLeaveBalance;
              }
            }
          }
        }
      } else {
        //   First entry of leave
        if (startMonthQuarter == 1 && endMonthQuarter == 1) {
          quarterLeave = firstQuarter;
        } else if (startMonthQuarter == 2 && endMonthQuarter == 2) {
          quarterLeave = firstQuarter + secondQuarter;
        } else if (startMonthQuarter == 3 && endMonthQuarter == 3) {
          quarterLeave = firstQuarter + secondQuarter + thirdQuarter;
        } else if (startMonthQuarter == 4 && endMonthQuarter == 4) {
          quarterLeave =
            firstQuarter + secondQuarter + thirdQuarter + fourthQuarter;
        }
        let finalQuartilyLeaveBalance = quarterLeave - leaveDays;
        if (finalQuartilyLeaveBalance < 0) {
          leaveWithoutPay = Math.abs(finalQuartilyLeaveBalance);
          quartilyLeaveBalance = 0;
        } else {
          leaveWithoutPay = 0;
          quartilyLeaveBalance = finalQuartilyLeaveBalance;
        }
        if (startMonthQuarter != endMonthQuarter) {
          let startMonthQuarterYear = startDate.year();
          if (startMonthQuarter == 1 && endMonthQuarter == 2) {
            let startMonthQuarterLastDate = `${startMonthQuarterYear}-03-31`;
            let momentDate1 = moment(`${startMonthQuarterLastDate}`);
            let firstQuarterLeaveDays = momentDate1.diff(startDate, "days") + 1;

            let endMonthQuarterFirstDate = `${startMonthQuarterYear}-04-01`;
            let momentDate2 = moment(`${endMonthQuarterFirstDate}`);
            let secondQuarterLeaveDays = endDate.diff(momentDate2, "days") + 1;

            let remainingFirstQuarterLeave =
              firstQuarter - firstQuarterLeaveDays;
            let secondTotalQuarterLeave =
              secondQuarter + remainingFirstQuarterLeave;
            let totalQuartilyLeaveBalance =
              secondTotalQuarterLeave - secondQuarterLeaveDays;
            if (totalQuartilyLeaveBalance < 0) {
              quartilyLeaveBalance = 0;
              leaveWithoutPay = Math.abs(totalQuartilyLeaveBalance);
            } else {
              quartilyLeaveBalance = totalQuartilyLeaveBalance;
              leaveWithoutPay = 0;
            }
          } else if (startMonthQuarter == 2 && endMonthQuarter == 3) {
            let startMonthQuarterLastDate = `${startMonthQuarterYear}-06-30`;
            let momentDate1 = moment(`${startMonthQuarterLastDate}`);
            let firstQuarterLeaveDays = momentDate1.diff(startDate, "days") + 1;

            let endMonthQuarterFirstDate = `${startMonthQuarterYear}-07-01`;
            let momentDate2 = moment(`${endMonthQuarterFirstDate}`);
            let secondQuarterLeaveDays = endDate.diff(momentDate2, "days") + 1;

            let remainingFirstQuarterLeave =
              firstQuarter + secondQuarter - firstQuarterLeaveDays;
            let secondTotalQuarterLeave =
              thirdQuarter + remainingFirstQuarterLeave;
            let totalQuartilyLeaveBalance =
              secondTotalQuarterLeave - secondQuarterLeaveDays;
            if (totalQuartilyLeaveBalance < 0) {
              quartilyLeaveBalance = 0;
              leaveWithoutPay = Math.abs(totalQuartilyLeaveBalance);
            } else {
              quartilyLeaveBalance = totalQuartilyLeaveBalance;
              leaveWithoutPay = 0;
            }
          } else if (startMonthQuarter == 3 && endMonthQuarter == 4) {
            let startMonthQuarterLastDate = `${startMonthQuarterYear}-09-30`;
            let momentDate1 = moment(`${startMonthQuarterLastDate}`);
            let firstQuarterLeaveDays = momentDate1.diff(startDate, "days") + 1;

            let endMonthQuarterFirstDate = `${startMonthQuarterYear}-10-01`;
            let momentDate2 = moment(`${endMonthQuarterFirstDate}`);
            let secondQuarterLeaveDays = endDate.diff(momentDate2, "days") + 1;

            let remainingFirstQuarterLeave =
              firstQuarter +
              secondQuarter +
              thirdQuarter -
              firstQuarterLeaveDays;
            let secondTotalQuarterLeave =
              fourthQuarter + remainingFirstQuarterLeave;
            let totalQuartilyLeaveBalance =
              secondTotalQuarterLeave - secondQuarterLeaveDays;
            if (totalQuartilyLeaveBalance < 0) {
              quartilyLeaveBalance = 0;
              leaveWithoutPay = Math.abs(totalQuartilyLeaveBalance);
            } else {
              quartilyLeaveBalance = totalQuartilyLeaveBalance;
              leaveWithoutPay = 0;
            }
          }
        } else {
          console.log("Quarter Error");
        }
      }

      console.log("leaveType", bodyData.leaveType);
      console.log("dateFrom", bodyData.dateFrom);
      console.log("dateTo", bodyData.dateTo);
      console.log("leaveDays", leaveDays);
      console.log("quartilyLeaveBalance", quartilyLeaveBalance);
      console.log("leaveWithoutPay", leaveWithoutPay);

      let data = await leaveModel.create({
        EmpId: bodyData.empId,
        Name: employee.dataValues.FullName,
        LeaveType: bodyData.leaveType,
        DateFrom: bodyData.dateFrom,
        DateTo: bodyData.dateTo,
        Leave_Days: leaveDays,
        Quartily_Leave_Balance: quartilyLeaveBalance,
        Leave_Without_Pay: leaveWithoutPay,
        Reason: bodyData.reason,
      });
      resolve(data);
    });
  }

  static async inputData1(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let response;
      try {
        // Quarter of date from req.body
        let startMonthQuarter = moment(`${bodyData.dateFrom}`).quarter();
        let endMonthQuarter = moment(`${bodyData.dateTo}`).quarter();

        if (startMonthQuarter == 4 && endMonthQuarter == 1) {
          response = {
            Message: "Your date is not valid between current and next year",
          };
        } else {
          // Fetch employee data
          let employee: any = await employeeModel.findOne({
            where: { Id: bodyData.referenceId },
          });
          // check employee exist or not
          if (employee) {
            console.log("Employee found");
            // Date format
            var startDateFrom = moment(`${bodyData.dateFrom}`);
            console.log("Start Date ---> ", startDateFrom);
            var endDateTo = moment(`${bodyData.dateTo}`);
            console.log("End Date ---> ", endDateTo);
            var currentDate = moment();
            console.log("Current Date ---> ", currentDate);

            // Fetch leaveModel data by id order by descending order
            let leaveData: any = await leaveModel.findAll({
              where: { Reference_Id: bodyData.referenceId },
              order: [["Id", "DESC"]],
            });

            // Quarter of date from req.body
            // let prevEndMonthQuarter = moment(
            //   `${leaveData[0].dataValues.DateTo}`
            // ).quarter();

            // if (
            //   moment(`${leaveData[0].dataValues.DateTo}`).year() ==
            //   moment(new Date()).year()
            // ) {
            // compare start date and current date using moment
            if (startDateFrom >= currentDate && startDateFrom <= endDateTo) {
              // Fetch quarter leave by id
              let quarterData: any = await leaveForQuarterModel.findOne({
                where: { Id: 1 },
              });

              // Leave days of every quarter
              let firstQuarter = quarterData.dataValues.FirstQuarter;
              let secondQuarter = quarterData.dataValues.SecondQuarter;
              let thirdQuarter = quarterData.dataValues.ThirdQuarter;
              let fourthQuarter = quarterData.dataValues.FourthQuarter;

              // Variable declaring
              let leaveDays,
                quartilyLeaveBalance,
                leaveWithoutPay,
                quarterLeave,
                totalQuarterLeave;

              // Start date and end date from req.body
              var startDate = moment(`${bodyData.dateFrom}`);
              var endDate = moment(`${bodyData.dateTo}`);

              if (
                startDate.isoWeekday() == 6 ||
                startDate.isoWeekday() == 7 ||
                endDate.isoWeekday() == 6 ||
                endDate.isoWeekday() == 7
              ) {
                response = {
                  Message:
                    "Please choose working day, saturday or sunday not allowed for leave",
                };
              } else {
                // calculate startDate and endDate diff. excluding weekends (saturday, sunday) => leave_days
                let startDate2 = moment(`${bodyData.dateFrom}`);
                let endDate2 = moment(`${bodyData.dateTo}`);
                var first = startDate2.clone().endOf("week"); // end of first week
                var last = endDate2.clone().startOf("week"); // start of last week
                var days = (last.diff(first, "days") * 5) / 7; // this will always multiply of 7
                var wfirst = first.day() - startDate2.day(); // check first week
                var wlast = endDate2.day() - last.day(); // check last week

                // Check leave type full or half
                if (bodyData.leaveType == "Full") {
                  if (days < 0) {
                    leaveDays = endDate.diff(startDate, "days") + 1;
                  } else {
                    leaveDays = days + wfirst + wlast;
                  }
                  console.log("Total Leave Days ---> ", leaveDays);
                } else if (bodyData.leaveType == "Half") {
                  leaveDays = 0.5;
                  console.log("Total Leave Days ---> ", leaveDays);
                } else {
                  leaveDays = 0;
                  response = {
                    Message:
                      "Leave type does not match! please select 'Full' or 'Half' only",
                  };
                }

                // Check existing previous leave or not
                if (leaveData[0]) {
                  let prevQuarter = moment(
                    `${leaveData[0].dataValues.DateTo}`
                  ).quarter();
                  let currQuarter = moment(`${bodyData.dateFrom}`).quarter();
                  let prevQuartilyLeaveBalance =
                    leaveData[0].dataValues.Quartily_Leave_Balance;
                  // Get value from previous last leave from database
                  let prevLeaveWithoutPay =
                    leaveData[0].dataValues.Leave_Without_Pay;
                  let dateFromMonth =
                    moment(`${bodyData.dateFrom}`).month() + 1;
                  let dateToMonth = moment(`${bodyData.dateTo}`).month() + 1;
                  if (
                    moment(`${bodyData.dateFrom}`).year() ==
                    moment(new Date()).year()
                  ) {
                    if (prevQuarter == currQuarter) {
                      quartilyLeaveBalance =
                        prevQuartilyLeaveBalance - leaveDays;
                      if (quartilyLeaveBalance < 0) {
                        if (dateFromMonth == dateToMonth) {
                          leaveWithoutPay =
                            Math.abs(quartilyLeaveBalance) +
                            prevLeaveWithoutPay;
                        } else {
                          leaveWithoutPay = Math.abs(quartilyLeaveBalance);
                        }
                        quartilyLeaveBalance = 0;
                      } else {
                        if (dateFromMonth == dateToMonth) {
                          leaveWithoutPay = 0 + prevLeaveWithoutPay;
                        } else {
                          leaveWithoutPay = 0;
                        }
                      }
                      if (startMonthQuarter != endMonthQuarter) {
                        if (startMonthQuarter == 1 && endMonthQuarter == 2) {
                          if (prevQuarter == 1) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance + secondQuarter;
                          } else if (prevQuarter == 2) {
                            totalQuarterLeave = prevQuartilyLeaveBalance;
                          }
                          let finalQuartilyLeaveBalance =
                            totalQuarterLeave - leaveDays;
                          if (finalQuartilyLeaveBalance < 0) {
                            quartilyLeaveBalance = 0;
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay =
                                Math.abs(finalQuartilyLeaveBalance) +
                                prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = Math.abs(
                                finalQuartilyLeaveBalance
                              );
                            }
                          } else {
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay = 0 + prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = 0;
                            }
                            quartilyLeaveBalance = finalQuartilyLeaveBalance;
                          }
                        } else if (
                          startMonthQuarter == 2 &&
                          endMonthQuarter == 3
                        ) {
                          if (prevQuarter == 1) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance +
                              secondQuarter +
                              thirdQuarter;
                          } else if (prevQuarter == 2) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance + thirdQuarter;
                          } else if (prevQuarter == 3) {
                            totalQuarterLeave = prevQuartilyLeaveBalance;
                          }
                          let finalQuartilyLeaveBalance =
                            totalQuarterLeave - leaveDays;
                          if (finalQuartilyLeaveBalance < 0) {
                            quartilyLeaveBalance = 0;
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay =
                                Math.abs(finalQuartilyLeaveBalance) +
                                prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = Math.abs(
                                finalQuartilyLeaveBalance
                              );
                            }
                          } else {
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay = 0 + prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = 0;
                            }
                            quartilyLeaveBalance = finalQuartilyLeaveBalance;
                          }
                        } else if (
                          startMonthQuarter == 3 &&
                          endMonthQuarter == 4
                        ) {
                          if (prevQuarter == 1) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance +
                              secondQuarter +
                              thirdQuarter +
                              fourthQuarter;
                          } else if (prevQuarter == 2) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance +
                              thirdQuarter +
                              fourthQuarter;
                          } else if (prevQuarter == 3) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance + fourthQuarter;
                          } else if (prevQuarter == 4) {
                            totalQuarterLeave = prevQuartilyLeaveBalance;
                          }
                          let finalQuartilyLeaveBalance =
                            totalQuarterLeave - leaveDays;
                          if (finalQuartilyLeaveBalance < 0) {
                            quartilyLeaveBalance = 0;
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay =
                                Math.abs(finalQuartilyLeaveBalance) +
                                prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = Math.abs(
                                finalQuartilyLeaveBalance
                              );
                            }
                          } else {
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay = 0 + prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = 0;
                            }
                            quartilyLeaveBalance = finalQuartilyLeaveBalance;
                          }
                        }
                      }
                    } else {
                      if (startMonthQuarter == 1 && endMonthQuarter == 1) {
                        if (prevQuarter == 1) {
                          totalQuarterLeave = prevQuartilyLeaveBalance;
                        }
                      } else if (
                        startMonthQuarter == 2 &&
                        endMonthQuarter == 2
                      ) {
                        if (prevQuarter == 1) {
                          totalQuarterLeave =
                            prevQuartilyLeaveBalance + secondQuarter;
                        } else if (prevQuarter == 2) {
                          totalQuarterLeave = prevQuartilyLeaveBalance;
                        }
                      } else if (
                        startMonthQuarter == 3 &&
                        endMonthQuarter == 3
                      ) {
                        if (prevQuarter == 1) {
                          totalQuarterLeave =
                            prevQuartilyLeaveBalance +
                            secondQuarter +
                            thirdQuarter;
                        } else if (prevQuarter == 2) {
                          totalQuarterLeave =
                            prevQuartilyLeaveBalance + thirdQuarter;
                        } else if (prevQuarter == 3) {
                          totalQuarterLeave = prevQuartilyLeaveBalance;
                        }
                      } else if (
                        startMonthQuarter == 4 &&
                        endMonthQuarter == 4
                      ) {
                        if (prevQuarter == 1) {
                          totalQuarterLeave =
                            prevQuartilyLeaveBalance +
                            secondQuarter +
                            thirdQuarter +
                            fourthQuarter;
                        } else if (prevQuarter == 2) {
                          totalQuarterLeave =
                            prevQuartilyLeaveBalance +
                            thirdQuarter +
                            fourthQuarter;
                        } else if (prevQuarter == 3) {
                          totalQuarterLeave =
                            prevQuartilyLeaveBalance + fourthQuarter;
                        } else if (prevQuarter == 4) {
                          totalQuarterLeave = prevQuartilyLeaveBalance;
                        }
                      }
                      quartilyLeaveBalance = totalQuarterLeave - leaveDays;
                      if (quartilyLeaveBalance < 0) {
                        if (dateFromMonth == dateToMonth) {
                          leaveWithoutPay =
                            Math.abs(quartilyLeaveBalance) +
                            prevLeaveWithoutPay;
                        } else {
                          leaveWithoutPay = Math.abs(quartilyLeaveBalance);
                        }
                        quartilyLeaveBalance = 0;
                      } else {
                        if (dateFromMonth == dateToMonth) {
                          leaveWithoutPay = 0 + prevLeaveWithoutPay;
                        } else {
                          leaveWithoutPay = 0;
                        }
                      }
                      if (startMonthQuarter != endMonthQuarter) {
                        let startMonthQuarterYear = startDate.year();
                        if (startMonthQuarter == 1 && endMonthQuarter == 2) {
                          if (prevQuarter == 1) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance + secondQuarter;
                          } else if (prevQuarter == 2) {
                            totalQuarterLeave = prevQuartilyLeaveBalance;
                          }
                          let finalQuartilyLeaveBalance =
                            totalQuarterLeave - leaveDays;
                          if (finalQuartilyLeaveBalance < 0) {
                            quartilyLeaveBalance = 0;
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay =
                                Math.abs(finalQuartilyLeaveBalance) +
                                prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = Math.abs(
                                finalQuartilyLeaveBalance
                              );
                            }
                          } else {
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay = 0 + prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = 0;
                            }
                            quartilyLeaveBalance = finalQuartilyLeaveBalance;
                          }
                        } else if (
                          startMonthQuarter == 2 &&
                          endMonthQuarter == 3
                        ) {
                          if (prevQuarter == 1) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance +
                              secondQuarter +
                              thirdQuarter;
                          } else if (prevQuarter == 2) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance + thirdQuarter;
                          } else if (prevQuarter == 3) {
                            totalQuarterLeave = prevQuartilyLeaveBalance;
                          }
                          let finalQuartilyLeaveBalance =
                            totalQuarterLeave - leaveDays;
                          if (finalQuartilyLeaveBalance < 0) {
                            quartilyLeaveBalance = 0;
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay =
                                Math.abs(finalQuartilyLeaveBalance) +
                                prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = Math.abs(
                                finalQuartilyLeaveBalance
                              );
                            }
                          } else {
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay = 0 + prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = 0;
                            }
                            quartilyLeaveBalance = finalQuartilyLeaveBalance;
                          }
                        } else if (
                          startMonthQuarter == 3 &&
                          endMonthQuarter == 4
                        ) {
                          if (prevQuarter == 1) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance +
                              secondQuarter +
                              thirdQuarter +
                              fourthQuarter;
                          } else if (prevQuarter == 2) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance +
                              thirdQuarter +
                              fourthQuarter;
                          } else if (prevQuarter == 3) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance + fourthQuarter;
                          } else if (prevQuarter == 4) {
                            totalQuarterLeave = prevQuartilyLeaveBalance;
                          }
                          let finalQuartilyLeaveBalance =
                            totalQuarterLeave - leaveDays;
                          if (finalQuartilyLeaveBalance < 0) {
                            quartilyLeaveBalance = 0;
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay =
                                Math.abs(finalQuartilyLeaveBalance) +
                                prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = Math.abs(
                                finalQuartilyLeaveBalance
                              );
                            }
                          } else {
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay = 0 + prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = 0;
                            }
                            quartilyLeaveBalance = finalQuartilyLeaveBalance;
                          }
                        }
                      }
                    }
                  } else {
                    if (moment(new Date()).month() + 1 == 12) {
                      if (prevQuarter == 1) {
                        totalQuarterLeave =
                          prevQuartilyLeaveBalance +
                          secondQuarter +
                          thirdQuarter +
                          fourthQuarter;
                      } else if (prevQuarter == 2) {
                        totalQuarterLeave =
                          prevQuartilyLeaveBalance +
                          thirdQuarter +
                          fourthQuarter;
                      } else if (prevQuarter == 3) {
                        totalQuarterLeave =
                          prevQuartilyLeaveBalance + fourthQuarter;
                      } else if (prevQuarter == 4) {
                        totalQuarterLeave = prevQuartilyLeaveBalance;
                      }

                      let prevQuarterYear = moment(
                        `${leaveData[0].dataValues.DateTo}`
                      ).year();
                      let currQuarterYear = moment(
                        `${bodyData.dateFrom}`
                      ).year();
                      if (prevQuarterYear == currQuarterYear) {
                        quartilyLeaveBalance =
                          prevQuartilyLeaveBalance - leaveDays;
                        if (quartilyLeaveBalance < 0) {
                          if (dateFromMonth == dateToMonth) {
                            leaveWithoutPay =
                              Math.abs(quartilyLeaveBalance) +
                              prevLeaveWithoutPay;
                          } else {
                            leaveWithoutPay = Math.abs(quartilyLeaveBalance);
                          }
                          quartilyLeaveBalance = 0;
                        } else {
                          if (dateFromMonth == dateToMonth) {
                            leaveWithoutPay = 0 + prevLeaveWithoutPay;
                          } else {
                            leaveWithoutPay = 0;
                          }
                        }
                        if (startMonthQuarter != endMonthQuarter) {
                          if (startMonthQuarter == 1 && endMonthQuarter == 2) {
                            if (prevQuarter == 1) {
                              totalQuarterLeave =
                                prevQuartilyLeaveBalance + secondQuarter;
                            } else if (prevQuarter == 2) {
                              totalQuarterLeave = prevQuartilyLeaveBalance;
                            }
                            let finalQuartilyLeaveBalance =
                              totalQuarterLeave - leaveDays;
                            if (finalQuartilyLeaveBalance < 0) {
                              quartilyLeaveBalance = 0;
                              if (dateFromMonth == dateToMonth) {
                                leaveWithoutPay =
                                  Math.abs(finalQuartilyLeaveBalance) +
                                  prevLeaveWithoutPay;
                              } else {
                                leaveWithoutPay = Math.abs(
                                  finalQuartilyLeaveBalance
                                );
                              }
                            } else {
                              if (dateFromMonth == dateToMonth) {
                                leaveWithoutPay = 0 + prevLeaveWithoutPay;
                              } else {
                                leaveWithoutPay = 0;
                              }
                              quartilyLeaveBalance = finalQuartilyLeaveBalance;
                            }
                          } else if (
                            startMonthQuarter == 2 &&
                            endMonthQuarter == 3
                          ) {
                            if (prevQuarter == 1) {
                              totalQuarterLeave =
                                prevQuartilyLeaveBalance +
                                secondQuarter +
                                thirdQuarter;
                            } else if (prevQuarter == 2) {
                              totalQuarterLeave =
                                prevQuartilyLeaveBalance + thirdQuarter;
                            } else if (prevQuarter == 3) {
                              totalQuarterLeave = prevQuartilyLeaveBalance;
                            }
                            let finalQuartilyLeaveBalance =
                              totalQuarterLeave - leaveDays;
                            if (finalQuartilyLeaveBalance < 0) {
                              quartilyLeaveBalance = 0;
                              if (dateFromMonth == dateToMonth) {
                                leaveWithoutPay =
                                  Math.abs(finalQuartilyLeaveBalance) +
                                  prevLeaveWithoutPay;
                              } else {
                                leaveWithoutPay = Math.abs(
                                  finalQuartilyLeaveBalance
                                );
                              }
                            } else {
                              if (dateFromMonth == dateToMonth) {
                                leaveWithoutPay = 0 + prevLeaveWithoutPay;
                              } else {
                                leaveWithoutPay = 0;
                              }
                              quartilyLeaveBalance = finalQuartilyLeaveBalance;
                            }
                          } else if (
                            startMonthQuarter == 3 &&
                            endMonthQuarter == 4
                          ) {
                            if (prevQuarter == 1) {
                              totalQuarterLeave =
                                prevQuartilyLeaveBalance +
                                secondQuarter +
                                thirdQuarter +
                                fourthQuarter;
                            } else if (prevQuarter == 2) {
                              totalQuarterLeave =
                                prevQuartilyLeaveBalance +
                                thirdQuarter +
                                fourthQuarter;
                            } else if (prevQuarter == 3) {
                              totalQuarterLeave =
                                prevQuartilyLeaveBalance + fourthQuarter;
                            } else if (prevQuarter == 4) {
                              totalQuarterLeave = prevQuartilyLeaveBalance;
                            }
                            let finalQuartilyLeaveBalance =
                              totalQuarterLeave - leaveDays;
                            if (finalQuartilyLeaveBalance < 0) {
                              quartilyLeaveBalance = 0;
                              if (dateFromMonth == dateToMonth) {
                                leaveWithoutPay =
                                  Math.abs(finalQuartilyLeaveBalance) +
                                  prevLeaveWithoutPay;
                              } else {
                                leaveWithoutPay = Math.abs(
                                  finalQuartilyLeaveBalance
                                );
                              }
                            } else {
                              if (dateFromMonth == dateToMonth) {
                                leaveWithoutPay = 0 + prevLeaveWithoutPay;
                              } else {
                                leaveWithoutPay = 0;
                              }
                              quartilyLeaveBalance = finalQuartilyLeaveBalance;
                            }
                          }
                        }
                      } else {
                        let queryForward;
                        if (totalQuarterLeave >= 10) {
                          queryForward = 10;
                        } else {
                          queryForward = totalQuarterLeave;
                        }

                        if (startMonthQuarter == 1 && endMonthQuarter == 1) {
                          quarterLeave = firstQuarter + queryForward;
                        } else if (
                          startMonthQuarter == 2 &&
                          endMonthQuarter == 2
                        ) {
                          quarterLeave =
                            firstQuarter + secondQuarter + queryForward;
                        } else if (
                          startMonthQuarter == 3 &&
                          endMonthQuarter == 3
                        ) {
                          quarterLeave =
                            firstQuarter +
                            secondQuarter +
                            thirdQuarter +
                            queryForward;
                        } else if (
                          startMonthQuarter == 4 &&
                          endMonthQuarter == 4
                        ) {
                          quarterLeave =
                            firstQuarter +
                            secondQuarter +
                            thirdQuarter +
                            fourthQuarter +
                            queryForward;
                        }
                        let finalQuartilyLeaveBalance =
                          quarterLeave - leaveDays;
                        if (finalQuartilyLeaveBalance < 0) {
                          leaveWithoutPay = Math.abs(finalQuartilyLeaveBalance);
                          quartilyLeaveBalance = 0;
                        } else {
                          leaveWithoutPay = 0;
                          quartilyLeaveBalance = finalQuartilyLeaveBalance;
                        }
                        if (startMonthQuarter != endMonthQuarter) {
                          let startMonthQuarterYear = startDate.year();
                          if (startMonthQuarter == 1 && endMonthQuarter == 2) {
                            let startMonthQuarterLastDate = `${startMonthQuarterYear}-03-31`;
                            let momentDate1 = moment(
                              `${startMonthQuarterLastDate}`
                            );
                            let firstQuarterLeaveDays =
                              momentDate1.diff(startDate, "days") + 1;

                            let endMonthQuarterFirstDate = `${startMonthQuarterYear}-04-01`;
                            let momentDate2 = moment(
                              `${endMonthQuarterFirstDate}`
                            );
                            let secondQuarterLeaveDays =
                              endDate.diff(momentDate2, "days") + 1;

                            let remainingFirstQuarterLeave =
                              firstQuarter - firstQuarterLeaveDays;
                            let secondTotalQuarterLeave =
                              secondQuarter + remainingFirstQuarterLeave;
                            let totalQuartilyLeaveBalance =
                              secondTotalQuarterLeave -
                              secondQuarterLeaveDays +
                              queryForward;
                            if (totalQuartilyLeaveBalance < 0) {
                              quartilyLeaveBalance = 0;
                              leaveWithoutPay = Math.abs(
                                totalQuartilyLeaveBalance
                              );
                            } else {
                              quartilyLeaveBalance = totalQuartilyLeaveBalance;
                              leaveWithoutPay = 0;
                            }
                          } else if (
                            startMonthQuarter == 2 &&
                            endMonthQuarter == 3
                          ) {
                            let startMonthQuarterLastDate = `${startMonthQuarterYear}-06-30`;
                            let momentDate1 = moment(
                              `${startMonthQuarterLastDate}`
                            );
                            let firstQuarterLeaveDays =
                              momentDate1.diff(startDate, "days") + 1;

                            let endMonthQuarterFirstDate = `${startMonthQuarterYear}-07-01`;
                            let momentDate2 = moment(
                              `${endMonthQuarterFirstDate}`
                            );
                            let secondQuarterLeaveDays =
                              endDate.diff(momentDate2, "days") + 1;

                            let remainingFirstQuarterLeave =
                              firstQuarter +
                              secondQuarter -
                              firstQuarterLeaveDays;
                            let secondTotalQuarterLeave =
                              thirdQuarter + remainingFirstQuarterLeave;
                            let totalQuartilyLeaveBalance =
                              secondTotalQuarterLeave -
                              secondQuarterLeaveDays +
                              queryForward;
                            if (totalQuartilyLeaveBalance < 0) {
                              quartilyLeaveBalance = 0;
                              leaveWithoutPay = Math.abs(
                                totalQuartilyLeaveBalance
                              );
                            } else {
                              quartilyLeaveBalance = totalQuartilyLeaveBalance;
                              leaveWithoutPay = 0;
                            }
                          } else if (
                            startMonthQuarter == 3 &&
                            endMonthQuarter == 4
                          ) {
                            let startMonthQuarterLastDate = `${startMonthQuarterYear}-09-30`;
                            let momentDate1 = moment(
                              `${startMonthQuarterLastDate}`
                            );
                            let firstQuarterLeaveDays =
                              momentDate1.diff(startDate, "days") + 1;

                            let endMonthQuarterFirstDate = `${startMonthQuarterYear}-10-01`;
                            let momentDate2 = moment(
                              `${endMonthQuarterFirstDate}`
                            );
                            let secondQuarterLeaveDays =
                              endDate.diff(momentDate2, "days") + 1;

                            let remainingFirstQuarterLeave =
                              firstQuarter +
                              secondQuarter +
                              thirdQuarter -
                              firstQuarterLeaveDays;
                            let secondTotalQuarterLeave =
                              fourthQuarter + remainingFirstQuarterLeave;
                            let totalQuartilyLeaveBalance =
                              secondTotalQuarterLeave -
                              secondQuarterLeaveDays +
                              queryForward;
                            if (totalQuartilyLeaveBalance < 0) {
                              quartilyLeaveBalance = 0;
                              leaveWithoutPay = Math.abs(
                                totalQuartilyLeaveBalance
                              );
                            } else {
                              quartilyLeaveBalance = totalQuartilyLeaveBalance;
                              leaveWithoutPay = 0;
                            }
                          }
                        }
                      }
                    } else {
                      response = {
                        Message:
                          "Your leave does not allowed in advance for next year",
                      };
                      // resolve(response);
                    }
                  }
                } else {
                  // First entry of leave
                  if (startMonthQuarter == 1 && endMonthQuarter == 1) {
                    quarterLeave = firstQuarter;
                  } else if (startMonthQuarter == 2 && endMonthQuarter == 2) {
                    quarterLeave = firstQuarter + secondQuarter;
                  } else if (startMonthQuarter == 3 && endMonthQuarter == 3) {
                    quarterLeave = firstQuarter + secondQuarter + thirdQuarter;
                  } else if (startMonthQuarter == 4 && endMonthQuarter == 4) {
                    quarterLeave =
                      firstQuarter +
                      secondQuarter +
                      thirdQuarter +
                      fourthQuarter;
                  }
                  let finalQuartilyLeaveBalance = quarterLeave - leaveDays;
                  if (finalQuartilyLeaveBalance < 0) {
                    leaveWithoutPay = Math.abs(finalQuartilyLeaveBalance);
                    quartilyLeaveBalance = 0;
                  } else {
                    leaveWithoutPay = 0;
                    quartilyLeaveBalance = finalQuartilyLeaveBalance;
                  }
                  if (startMonthQuarter != endMonthQuarter) {
                    let startMonthQuarterYear = startDate.year();
                    if (startMonthQuarter == 1 && endMonthQuarter == 2) {
                      let startMonthQuarterLastDate = `${startMonthQuarterYear}-03-31`;
                      let momentDate1 = moment(`${startMonthQuarterLastDate}`);
                      let firstQuarterLeaveDays =
                        momentDate1.diff(startDate, "days") + 1;

                      let endMonthQuarterFirstDate = `${startMonthQuarterYear}-04-01`;
                      let momentDate2 = moment(`${endMonthQuarterFirstDate}`);
                      let secondQuarterLeaveDays =
                        endDate.diff(momentDate2, "days") + 1;

                      let remainingFirstQuarterLeave =
                        firstQuarter - firstQuarterLeaveDays;
                      let secondTotalQuarterLeave =
                        secondQuarter + remainingFirstQuarterLeave;
                      let totalQuartilyLeaveBalance =
                        secondTotalQuarterLeave - secondQuarterLeaveDays;
                      if (totalQuartilyLeaveBalance < 0) {
                        quartilyLeaveBalance = 0;
                        leaveWithoutPay = Math.abs(totalQuartilyLeaveBalance);
                      } else {
                        quartilyLeaveBalance = totalQuartilyLeaveBalance;
                        leaveWithoutPay = 0;
                      }
                    } else if (startMonthQuarter == 2 && endMonthQuarter == 3) {
                      let startMonthQuarterLastDate = `${startMonthQuarterYear}-06-30`;
                      let momentDate1 = moment(`${startMonthQuarterLastDate}`);
                      let firstQuarterLeaveDays =
                        momentDate1.diff(startDate, "days") + 1;

                      let endMonthQuarterFirstDate = `${startMonthQuarterYear}-07-01`;
                      let momentDate2 = moment(`${endMonthQuarterFirstDate}`);
                      let secondQuarterLeaveDays =
                        endDate.diff(momentDate2, "days") + 1;

                      let remainingFirstQuarterLeave =
                        firstQuarter + secondQuarter - firstQuarterLeaveDays;
                      let secondTotalQuarterLeave =
                        thirdQuarter + remainingFirstQuarterLeave;
                      let totalQuartilyLeaveBalance =
                        secondTotalQuarterLeave - secondQuarterLeaveDays;
                      if (totalQuartilyLeaveBalance < 0) {
                        quartilyLeaveBalance = 0;
                        leaveWithoutPay = Math.abs(totalQuartilyLeaveBalance);
                      } else {
                        quartilyLeaveBalance = totalQuartilyLeaveBalance;
                        leaveWithoutPay = 0;
                      }
                    } else if (startMonthQuarter == 3 && endMonthQuarter == 4) {
                      let startMonthQuarterLastDate = `${startMonthQuarterYear}-09-30`;
                      let momentDate1 = moment(`${startMonthQuarterLastDate}`);
                      let firstQuarterLeaveDays =
                        momentDate1.diff(startDate, "days") + 1;

                      let endMonthQuarterFirstDate = `${startMonthQuarterYear}-10-01`;
                      let momentDate2 = moment(`${endMonthQuarterFirstDate}`);
                      let secondQuarterLeaveDays =
                        endDate.diff(momentDate2, "days") + 1;

                      let remainingFirstQuarterLeave =
                        firstQuarter +
                        secondQuarter +
                        thirdQuarter -
                        firstQuarterLeaveDays;
                      let secondTotalQuarterLeave =
                        fourthQuarter + remainingFirstQuarterLeave;
                      let totalQuartilyLeaveBalance =
                        secondTotalQuarterLeave - secondQuarterLeaveDays;
                      if (totalQuartilyLeaveBalance < 0) {
                        quartilyLeaveBalance = 0;
                        leaveWithoutPay = Math.abs(totalQuartilyLeaveBalance);
                      } else {
                        quartilyLeaveBalance = totalQuartilyLeaveBalance;
                        leaveWithoutPay = 0;
                      }
                    }
                  }
                }

                console.log("leaveType ---> ", bodyData.leaveType);
                console.log("leaveDays ---> ", leaveDays);
                console.log("quartilyLeaveBalance ---> ", quartilyLeaveBalance);
                console.log("leaveWithoutPay ---> ", leaveWithoutPay);

                if (
                  moment(`${leaveData[0].dataValues.DateTo}`) <
                  moment(`${bodyData.dateFrom}`)
                ) {
                  let leave: any = await leaveModel.create({
                    Reference_Id: bodyData.referenceId,
                    EmpId: employee.dataValues.Employee_Id,
                    Name: employee.dataValues.FullName,
                    LeaveType: bodyData.leaveType,
                    DateFrom: bodyData.dateFrom,
                    DateTo: bodyData.dateTo,
                    Leave_Days: leaveDays,
                    Quartily_Leave_Balance: quartilyLeaveBalance,
                    Leave_Without_Pay: leaveWithoutPay,
                    Reason: bodyData.reason,
                  });
                  response = {
                    Message: "Leave successfully created",
                    data: leave.dataValues,
                  };
                } else {
                  response = {
                    Message:
                      "Date is not valid compare to previous date of leave!!!",
                  };
                }
              }
            } else {
              response = {
                Message:
                  "Start date not valid before current date Or end date not valid",
              };
              // resolve(response);
            }
          } else {
            response = {
              Message: "Employee not found",
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

  static async getData(id: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await leaveModel.findAll({ where: { Reference_Id: id } });
      resolve(data);
    });
  }

  static async updtLeave(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let response;
      try {
        // Quarter of date from req.body
        let startMonthQuarter = moment(`${bodyData.dateFrom}`).quarter();
        let endMonthQuarter = moment(`${bodyData.dateTo}`).quarter();

        if (startMonthQuarter == 4 && endMonthQuarter == 1) {
          response = {
            Message: "Your date is not valid between current and next year",
          };
        } else {
          // Fetch employee data
          let employee: any = await employeeModel.findOne({
            where: { Id: bodyData.referenceId },
          });
          // check employee exist or not
          if (employee) {
            console.log("Employee found");
            // Date format
            var startDateFrom = moment(`${bodyData.dateFrom}`);
            console.log("Start Date ---> ", startDateFrom);
            var endDateTo = moment(`${bodyData.dateTo}`);
            console.log("End Date ---> ", endDateTo);
            var currentDate = moment();
            console.log("Current Date ---> ", currentDate);

            // Fetch leaveModel data by id order by descending order
            let leaveData: any = await leaveModel.findAll({
              where: { Reference_Id: bodyData.referenceId },
              order: [["Id", "DESC"]],
            });
            // console.log(leaveData[0].dataValues, "//////////////////////")

            // compare start date and current date using moment
            if (startDateFrom >= currentDate && startDateFrom <= endDateTo) {
              // Fetch quarter leave by id
              let quarterData: any = await leaveForQuarterModel.findOne({
                where: { Id: 1 },
              });

              // Leave days of every quarter
              let firstQuarter = quarterData.dataValues.FirstQuarter;
              let secondQuarter = quarterData.dataValues.SecondQuarter;
              let thirdQuarter = quarterData.dataValues.ThirdQuarter;
              let fourthQuarter = quarterData.dataValues.FourthQuarter;

              // Variable declaring
              let leaveDays,
                quartilyLeaveBalance,
                leaveWithoutPay,
                quarterLeave,
                totalQuarterLeave;

              // Start date and end date from req.body
              var startDate = moment(`${bodyData.dateFrom}`);
              var endDate = moment(`${bodyData.dateTo}`);

              if (
                startDate.isoWeekday() == 6 ||
                startDate.isoWeekday() == 7 ||
                endDate.isoWeekday() == 6 ||
                endDate.isoWeekday() == 7
              ) {
                response = {
                  Message:
                    "Please choose working day, saturday or sunday not allowed for leave",
                };
              } else {
                // calculate startDate and endDate diff. excluding weekends (saturday, sunday) => leave_days
                let startDate2 = moment(`${bodyData.dateFrom}`);
                let endDate2 = moment(`${bodyData.dateTo}`);
                var first = startDate2.clone().endOf("week"); // end of first week
                var last = endDate2.clone().startOf("week"); // start of last week
                var days = (last.diff(first, "days") * 5) / 7; // this will always multiply of 7
                var wfirst = first.day() - startDate2.day(); // check first week
                var wlast = endDate2.day() - last.day(); // check last week

                // Check leave type full or half
                if (bodyData.leaveType == "Full") {
                  if (days < 0) {
                    leaveDays = endDate.diff(startDate, "days") + 1;
                  } else {
                    leaveDays = days + wfirst + wlast;
                  }
                  console.log("Total Leave Days ---> ", leaveDays);
                } else if (bodyData.leaveType == "Half") {
                  leaveDays = 0.5;
                  console.log("Total Leave Days ---> ", leaveDays);
                } else {
                  leaveDays = 0;
                  response = {
                    Message:
                      "Leave type does not match! please select 'Full' or 'Half' only",
                  };
                }

                let allLeave: any = await leaveModel.findAll({
                  where: { Reference_Id: bodyData.referenceId },
                });
                let index = allLeave.length - 2;
                let leaveModalForUpdt: any;
                if (index >= 0) {
                  leaveModalForUpdt = await leaveModel.findOne({
                    where: { Id: allLeave[index].dataValues.Id },
                  });
                }
                // Check existing previous leave or not
                if (leaveModalForUpdt) {
                  let prevQuarter = moment(
                    `${leaveModalForUpdt.dataValues.DateTo}`
                  ).quarter();
                  let currQuarter = moment(`${bodyData.dateFrom}`).quarter();
                  let prevQuartilyLeaveBalance =
                    leaveModalForUpdt.dataValues.Quartily_Leave_Balance;
                  // Get value from previous last leave from database
                  let prevLeaveWithoutPay =
                    leaveModalForUpdt.dataValues.Leave_Without_Pay;
                  let dateFromMonth =
                    moment(`${bodyData.dateFrom}`).month() + 1;
                  let dateToMonth = moment(`${bodyData.dateTo}`).month() + 1;
                  if (
                    moment(`${bodyData.dateFrom}`).year() ==
                    moment(new Date()).year()
                  ) {
                    if (prevQuarter == currQuarter) {
                      quartilyLeaveBalance =
                        prevQuartilyLeaveBalance - leaveDays;
                      if (quartilyLeaveBalance < 0) {
                        if (dateFromMonth == dateToMonth) {
                          leaveWithoutPay =
                            Math.abs(quartilyLeaveBalance) +
                            prevLeaveWithoutPay;
                        } else {
                          leaveWithoutPay = Math.abs(quartilyLeaveBalance);
                        }
                        quartilyLeaveBalance = 0;
                      } else {
                        if (dateFromMonth == dateToMonth) {
                          leaveWithoutPay = 0 + prevLeaveWithoutPay;
                        } else {
                          leaveWithoutPay = 0;
                        }
                      }
                      if (startMonthQuarter != endMonthQuarter) {
                        if (startMonthQuarter == 1 && endMonthQuarter == 2) {
                          if (prevQuarter == 1) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance + secondQuarter;
                          } else if (prevQuarter == 2) {
                            totalQuarterLeave = prevQuartilyLeaveBalance;
                          }
                          let finalQuartilyLeaveBalance =
                            totalQuarterLeave - leaveDays;
                          if (finalQuartilyLeaveBalance < 0) {
                            quartilyLeaveBalance = 0;
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay =
                                Math.abs(finalQuartilyLeaveBalance) +
                                prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = Math.abs(
                                finalQuartilyLeaveBalance
                              );
                            }
                          } else {
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay = 0 + prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = 0;
                            }
                            quartilyLeaveBalance = finalQuartilyLeaveBalance;
                          }
                        } else if (
                          startMonthQuarter == 2 &&
                          endMonthQuarter == 3
                        ) {
                          if (prevQuarter == 1) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance +
                              secondQuarter +
                              thirdQuarter;
                          } else if (prevQuarter == 2) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance + thirdQuarter;
                          } else if (prevQuarter == 3) {
                            totalQuarterLeave = prevQuartilyLeaveBalance;
                          }
                          let finalQuartilyLeaveBalance =
                            totalQuarterLeave - leaveDays;
                          if (finalQuartilyLeaveBalance < 0) {
                            quartilyLeaveBalance = 0;
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay =
                                Math.abs(finalQuartilyLeaveBalance) +
                                prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = Math.abs(
                                finalQuartilyLeaveBalance
                              );
                            }
                          } else {
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay = 0 + prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = 0;
                            }
                            quartilyLeaveBalance = finalQuartilyLeaveBalance;
                          }
                        } else if (
                          startMonthQuarter == 3 &&
                          endMonthQuarter == 4
                        ) {
                          if (prevQuarter == 1) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance +
                              secondQuarter +
                              thirdQuarter +
                              fourthQuarter;
                          } else if (prevQuarter == 2) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance +
                              thirdQuarter +
                              fourthQuarter;
                          } else if (prevQuarter == 3) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance + fourthQuarter;
                          } else if (prevQuarter == 4) {
                            totalQuarterLeave = prevQuartilyLeaveBalance;
                          }
                          let finalQuartilyLeaveBalance =
                            totalQuarterLeave - leaveDays;
                          if (finalQuartilyLeaveBalance < 0) {
                            quartilyLeaveBalance = 0;
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay =
                                Math.abs(finalQuartilyLeaveBalance) +
                                prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = Math.abs(
                                finalQuartilyLeaveBalance
                              );
                            }
                          } else {
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay = 0 + prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = 0;
                            }
                            quartilyLeaveBalance = finalQuartilyLeaveBalance;
                          }
                        }
                      }
                    } else {
                      if (startMonthQuarter == 1 && endMonthQuarter == 1) {
                        if (prevQuarter == 1) {
                          totalQuarterLeave = prevQuartilyLeaveBalance;
                        }
                      } else if (
                        startMonthQuarter == 2 &&
                        endMonthQuarter == 2
                      ) {
                        if (prevQuarter == 1) {
                          totalQuarterLeave =
                            prevQuartilyLeaveBalance + secondQuarter;
                        } else if (prevQuarter == 2) {
                          totalQuarterLeave = prevQuartilyLeaveBalance;
                        }
                      } else if (
                        startMonthQuarter == 3 &&
                        endMonthQuarter == 3
                      ) {
                        if (prevQuarter == 1) {
                          totalQuarterLeave =
                            prevQuartilyLeaveBalance +
                            secondQuarter +
                            thirdQuarter;
                        } else if (prevQuarter == 2) {
                          totalQuarterLeave =
                            prevQuartilyLeaveBalance + thirdQuarter;
                        } else if (prevQuarter == 3) {
                          totalQuarterLeave = prevQuartilyLeaveBalance;
                        }
                      } else if (
                        startMonthQuarter == 4 &&
                        endMonthQuarter == 4
                      ) {
                        if (prevQuarter == 1) {
                          totalQuarterLeave =
                            prevQuartilyLeaveBalance +
                            secondQuarter +
                            thirdQuarter +
                            fourthQuarter;
                        } else if (prevQuarter == 2) {
                          totalQuarterLeave =
                            prevQuartilyLeaveBalance +
                            thirdQuarter +
                            fourthQuarter;
                        } else if (prevQuarter == 3) {
                          totalQuarterLeave =
                            prevQuartilyLeaveBalance + fourthQuarter;
                        } else if (prevQuarter == 4) {
                          totalQuarterLeave = prevQuartilyLeaveBalance;
                        }
                      }
                      quartilyLeaveBalance = totalQuarterLeave - leaveDays;
                      if (quartilyLeaveBalance < 0) {
                        if (dateFromMonth == dateToMonth) {
                          leaveWithoutPay =
                            Math.abs(quartilyLeaveBalance) +
                            prevLeaveWithoutPay;
                        } else {
                          leaveWithoutPay = Math.abs(quartilyLeaveBalance);
                        }
                        quartilyLeaveBalance = 0;
                      } else {
                        if (dateFromMonth == dateToMonth) {
                          leaveWithoutPay = 0 + prevLeaveWithoutPay;
                        } else {
                          leaveWithoutPay = 0;
                        }
                      }
                      if (startMonthQuarter != endMonthQuarter) {
                        let startMonthQuarterYear = startDate.year();
                        if (startMonthQuarter == 1 && endMonthQuarter == 2) {
                          if (prevQuarter == 1) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance + secondQuarter;
                          } else if (prevQuarter == 2) {
                            totalQuarterLeave = prevQuartilyLeaveBalance;
                          }
                          let finalQuartilyLeaveBalance =
                            totalQuarterLeave - leaveDays;
                          if (finalQuartilyLeaveBalance < 0) {
                            quartilyLeaveBalance = 0;
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay =
                                Math.abs(finalQuartilyLeaveBalance) +
                                prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = Math.abs(
                                finalQuartilyLeaveBalance
                              );
                            }
                          } else {
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay = 0 + prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = 0;
                            }
                            quartilyLeaveBalance = finalQuartilyLeaveBalance;
                          }
                        } else if (
                          startMonthQuarter == 2 &&
                          endMonthQuarter == 3
                        ) {
                          if (prevQuarter == 1) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance +
                              secondQuarter +
                              thirdQuarter;
                          } else if (prevQuarter == 2) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance + thirdQuarter;
                          } else if (prevQuarter == 3) {
                            totalQuarterLeave = prevQuartilyLeaveBalance;
                          }
                          let finalQuartilyLeaveBalance =
                            totalQuarterLeave - leaveDays;
                          if (finalQuartilyLeaveBalance < 0) {
                            quartilyLeaveBalance = 0;
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay =
                                Math.abs(finalQuartilyLeaveBalance) +
                                prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = Math.abs(
                                finalQuartilyLeaveBalance
                              );
                            }
                          } else {
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay = 0 + prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = 0;
                            }
                            quartilyLeaveBalance = finalQuartilyLeaveBalance;
                          }
                        } else if (
                          startMonthQuarter == 3 &&
                          endMonthQuarter == 4
                        ) {
                          if (prevQuarter == 1) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance +
                              secondQuarter +
                              thirdQuarter +
                              fourthQuarter;
                          } else if (prevQuarter == 2) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance +
                              thirdQuarter +
                              fourthQuarter;
                          } else if (prevQuarter == 3) {
                            totalQuarterLeave =
                              prevQuartilyLeaveBalance + fourthQuarter;
                          } else if (prevQuarter == 4) {
                            totalQuarterLeave = prevQuartilyLeaveBalance;
                          }
                          let finalQuartilyLeaveBalance =
                            totalQuarterLeave - leaveDays;
                          if (finalQuartilyLeaveBalance < 0) {
                            quartilyLeaveBalance = 0;
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay =
                                Math.abs(finalQuartilyLeaveBalance) +
                                prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = Math.abs(
                                finalQuartilyLeaveBalance
                              );
                            }
                          } else {
                            if (dateFromMonth == dateToMonth) {
                              leaveWithoutPay = 0 + prevLeaveWithoutPay;
                            } else {
                              leaveWithoutPay = 0;
                            }
                            quartilyLeaveBalance = finalQuartilyLeaveBalance;
                          }
                        }
                      }
                    }
                  } else {
                    if (moment(new Date()).month() + 1 == 12) {
                      if (prevQuarter == 1) {
                        totalQuarterLeave =
                          prevQuartilyLeaveBalance +
                          secondQuarter +
                          thirdQuarter +
                          fourthQuarter;
                      } else if (prevQuarter == 2) {
                        totalQuarterLeave =
                          prevQuartilyLeaveBalance +
                          thirdQuarter +
                          fourthQuarter;
                      } else if (prevQuarter == 3) {
                        totalQuarterLeave =
                          prevQuartilyLeaveBalance + fourthQuarter;
                      } else if (prevQuarter == 4) {
                        totalQuarterLeave = prevQuartilyLeaveBalance;
                      }

                      let prevQuarterYear = moment(
                        `${leaveModalForUpdt.dataValues.DateTo}`
                      ).year();
                      let currQuarterYear = moment(
                        `${bodyData.dateFrom}`
                      ).year();
                      if (prevQuarterYear == currQuarterYear) {
                        quartilyLeaveBalance =
                          prevQuartilyLeaveBalance - leaveDays;
                        if (quartilyLeaveBalance < 0) {
                          if (dateFromMonth == dateToMonth) {
                            leaveWithoutPay =
                              Math.abs(quartilyLeaveBalance) +
                              prevLeaveWithoutPay;
                          } else {
                            leaveWithoutPay = Math.abs(quartilyLeaveBalance);
                          }
                          quartilyLeaveBalance = 0;
                        } else {
                          if (dateFromMonth == dateToMonth) {
                            leaveWithoutPay = 0 + prevLeaveWithoutPay;
                          } else {
                            leaveWithoutPay = 0;
                          }
                        }
                        if (startMonthQuarter != endMonthQuarter) {
                          if (startMonthQuarter == 1 && endMonthQuarter == 2) {
                            if (prevQuarter == 1) {
                              totalQuarterLeave =
                                prevQuartilyLeaveBalance + secondQuarter;
                            } else if (prevQuarter == 2) {
                              totalQuarterLeave = prevQuartilyLeaveBalance;
                            }
                            let finalQuartilyLeaveBalance =
                              totalQuarterLeave - leaveDays;
                            if (finalQuartilyLeaveBalance < 0) {
                              quartilyLeaveBalance = 0;
                              if (dateFromMonth == dateToMonth) {
                                leaveWithoutPay =
                                  Math.abs(finalQuartilyLeaveBalance) +
                                  prevLeaveWithoutPay;
                              } else {
                                leaveWithoutPay = Math.abs(
                                  finalQuartilyLeaveBalance
                                );
                              }
                            } else {
                              if (dateFromMonth == dateToMonth) {
                                leaveWithoutPay = 0 + prevLeaveWithoutPay;
                              } else {
                                leaveWithoutPay = 0;
                              }
                              quartilyLeaveBalance = finalQuartilyLeaveBalance;
                            }
                          } else if (
                            startMonthQuarter == 2 &&
                            endMonthQuarter == 3
                          ) {
                            if (prevQuarter == 1) {
                              totalQuarterLeave =
                                prevQuartilyLeaveBalance +
                                secondQuarter +
                                thirdQuarter;
                            } else if (prevQuarter == 2) {
                              totalQuarterLeave =
                                prevQuartilyLeaveBalance + thirdQuarter;
                            } else if (prevQuarter == 3) {
                              totalQuarterLeave = prevQuartilyLeaveBalance;
                            }
                            let finalQuartilyLeaveBalance =
                              totalQuarterLeave - leaveDays;
                            if (finalQuartilyLeaveBalance < 0) {
                              quartilyLeaveBalance = 0;
                              if (dateFromMonth == dateToMonth) {
                                leaveWithoutPay =
                                  Math.abs(finalQuartilyLeaveBalance) +
                                  prevLeaveWithoutPay;
                              } else {
                                leaveWithoutPay = Math.abs(
                                  finalQuartilyLeaveBalance
                                );
                              }
                            } else {
                              if (dateFromMonth == dateToMonth) {
                                leaveWithoutPay = 0 + prevLeaveWithoutPay;
                              } else {
                                leaveWithoutPay = 0;
                              }
                              quartilyLeaveBalance = finalQuartilyLeaveBalance;
                            }
                          } else if (
                            startMonthQuarter == 3 &&
                            endMonthQuarter == 4
                          ) {
                            if (prevQuarter == 1) {
                              totalQuarterLeave =
                                prevQuartilyLeaveBalance +
                                secondQuarter +
                                thirdQuarter +
                                fourthQuarter;
                            } else if (prevQuarter == 2) {
                              totalQuarterLeave =
                                prevQuartilyLeaveBalance +
                                thirdQuarter +
                                fourthQuarter;
                            } else if (prevQuarter == 3) {
                              totalQuarterLeave =
                                prevQuartilyLeaveBalance + fourthQuarter;
                            } else if (prevQuarter == 4) {
                              totalQuarterLeave = prevQuartilyLeaveBalance;
                            }
                            let finalQuartilyLeaveBalance =
                              totalQuarterLeave - leaveDays;
                            if (finalQuartilyLeaveBalance < 0) {
                              quartilyLeaveBalance = 0;
                              if (dateFromMonth == dateToMonth) {
                                leaveWithoutPay =
                                  Math.abs(finalQuartilyLeaveBalance) +
                                  prevLeaveWithoutPay;
                              } else {
                                leaveWithoutPay = Math.abs(
                                  finalQuartilyLeaveBalance
                                );
                              }
                            } else {
                              if (dateFromMonth == dateToMonth) {
                                leaveWithoutPay = 0 + prevLeaveWithoutPay;
                              } else {
                                leaveWithoutPay = 0;
                              }
                              quartilyLeaveBalance = finalQuartilyLeaveBalance;
                            }
                          }
                        }
                      } else {
                        let queryForward;
                        if (totalQuarterLeave >= 10) {
                          queryForward = 10;
                        } else {
                          queryForward = totalQuarterLeave;
                        }

                        if (startMonthQuarter == 1 && endMonthQuarter == 1) {
                          quarterLeave = firstQuarter + queryForward;
                        } else if (
                          startMonthQuarter == 2 &&
                          endMonthQuarter == 2
                        ) {
                          quarterLeave =
                            firstQuarter + secondQuarter + queryForward;
                        } else if (
                          startMonthQuarter == 3 &&
                          endMonthQuarter == 3
                        ) {
                          quarterLeave =
                            firstQuarter +
                            secondQuarter +
                            thirdQuarter +
                            queryForward;
                        } else if (
                          startMonthQuarter == 4 &&
                          endMonthQuarter == 4
                        ) {
                          quarterLeave =
                            firstQuarter +
                            secondQuarter +
                            thirdQuarter +
                            fourthQuarter +
                            queryForward;
                        }
                        let finalQuartilyLeaveBalance =
                          quarterLeave - leaveDays;
                        if (finalQuartilyLeaveBalance < 0) {
                          leaveWithoutPay = Math.abs(finalQuartilyLeaveBalance);
                          quartilyLeaveBalance = 0;
                        } else {
                          leaveWithoutPay = 0;
                          quartilyLeaveBalance = finalQuartilyLeaveBalance;
                        }
                        if (startMonthQuarter != endMonthQuarter) {
                          let startMonthQuarterYear = startDate.year();
                          if (startMonthQuarter == 1 && endMonthQuarter == 2) {
                            let startMonthQuarterLastDate = `${startMonthQuarterYear}-03-31`;
                            let momentDate1 = moment(
                              `${startMonthQuarterLastDate}`
                            );
                            let firstQuarterLeaveDays =
                              momentDate1.diff(startDate, "days") + 1;

                            let endMonthQuarterFirstDate = `${startMonthQuarterYear}-04-01`;
                            let momentDate2 = moment(
                              `${endMonthQuarterFirstDate}`
                            );
                            let secondQuarterLeaveDays =
                              endDate.diff(momentDate2, "days") + 1;

                            let remainingFirstQuarterLeave =
                              firstQuarter - firstQuarterLeaveDays;
                            let secondTotalQuarterLeave =
                              secondQuarter + remainingFirstQuarterLeave;
                            let totalQuartilyLeaveBalance =
                              secondTotalQuarterLeave -
                              secondQuarterLeaveDays +
                              queryForward;
                            if (totalQuartilyLeaveBalance < 0) {
                              quartilyLeaveBalance = 0;
                              leaveWithoutPay = Math.abs(
                                totalQuartilyLeaveBalance
                              );
                            } else {
                              quartilyLeaveBalance = totalQuartilyLeaveBalance;
                              leaveWithoutPay = 0;
                            }
                          } else if (
                            startMonthQuarter == 2 &&
                            endMonthQuarter == 3
                          ) {
                            let startMonthQuarterLastDate = `${startMonthQuarterYear}-06-30`;
                            let momentDate1 = moment(
                              `${startMonthQuarterLastDate}`
                            );
                            let firstQuarterLeaveDays =
                              momentDate1.diff(startDate, "days") + 1;

                            let endMonthQuarterFirstDate = `${startMonthQuarterYear}-07-01`;
                            let momentDate2 = moment(
                              `${endMonthQuarterFirstDate}`
                            );
                            let secondQuarterLeaveDays =
                              endDate.diff(momentDate2, "days") + 1;

                            let remainingFirstQuarterLeave =
                              firstQuarter +
                              secondQuarter -
                              firstQuarterLeaveDays;
                            let secondTotalQuarterLeave =
                              thirdQuarter + remainingFirstQuarterLeave;
                            let totalQuartilyLeaveBalance =
                              secondTotalQuarterLeave -
                              secondQuarterLeaveDays +
                              queryForward;
                            if (totalQuartilyLeaveBalance < 0) {
                              quartilyLeaveBalance = 0;
                              leaveWithoutPay = Math.abs(
                                totalQuartilyLeaveBalance
                              );
                            } else {
                              quartilyLeaveBalance = totalQuartilyLeaveBalance;
                              leaveWithoutPay = 0;
                            }
                          } else if (
                            startMonthQuarter == 3 &&
                            endMonthQuarter == 4
                          ) {
                            let startMonthQuarterLastDate = `${startMonthQuarterYear}-09-30`;
                            let momentDate1 = moment(
                              `${startMonthQuarterLastDate}`
                            );
                            let firstQuarterLeaveDays =
                              momentDate1.diff(startDate, "days") + 1;

                            let endMonthQuarterFirstDate = `${startMonthQuarterYear}-10-01`;
                            let momentDate2 = moment(
                              `${endMonthQuarterFirstDate}`
                            );
                            let secondQuarterLeaveDays =
                              endDate.diff(momentDate2, "days") + 1;

                            let remainingFirstQuarterLeave =
                              firstQuarter +
                              secondQuarter +
                              thirdQuarter -
                              firstQuarterLeaveDays;
                            let secondTotalQuarterLeave =
                              fourthQuarter + remainingFirstQuarterLeave;
                            let totalQuartilyLeaveBalance =
                              secondTotalQuarterLeave -
                              secondQuarterLeaveDays +
                              queryForward;
                            if (totalQuartilyLeaveBalance < 0) {
                              quartilyLeaveBalance = 0;
                              leaveWithoutPay = Math.abs(
                                totalQuartilyLeaveBalance
                              );
                            } else {
                              quartilyLeaveBalance = totalQuartilyLeaveBalance;
                              leaveWithoutPay = 0;
                            }
                          }
                        }
                      }
                    } else {
                      response = {
                        Message:
                          "Your leave does not allowed in advance for next year",
                      };
                      // resolve(response);
                    }
                  }
                } else {
                  // First entry of leave
                  if (startMonthQuarter == 1 && endMonthQuarter == 1) {
                    quarterLeave = firstQuarter;
                  } else if (startMonthQuarter == 2 && endMonthQuarter == 2) {
                    quarterLeave = firstQuarter + secondQuarter;
                  } else if (startMonthQuarter == 3 && endMonthQuarter == 3) {
                    quarterLeave = firstQuarter + secondQuarter + thirdQuarter;
                  } else if (startMonthQuarter == 4 && endMonthQuarter == 4) {
                    quarterLeave =
                      firstQuarter +
                      secondQuarter +
                      thirdQuarter +
                      fourthQuarter;
                  }
                  let finalQuartilyLeaveBalance = quarterLeave - leaveDays;
                  if (finalQuartilyLeaveBalance < 0) {
                    leaveWithoutPay = Math.abs(finalQuartilyLeaveBalance);
                    quartilyLeaveBalance = 0;
                  } else {
                    leaveWithoutPay = 0;
                    quartilyLeaveBalance = finalQuartilyLeaveBalance;
                  }
                  if (startMonthQuarter != endMonthQuarter) {
                    let startMonthQuarterYear = startDate.year();
                    if (startMonthQuarter == 1 && endMonthQuarter == 2) {
                      let startMonthQuarterLastDate = `${startMonthQuarterYear}-03-31`;
                      let momentDate1 = moment(`${startMonthQuarterLastDate}`);
                      let firstQuarterLeaveDays =
                        momentDate1.diff(startDate, "days") + 1;

                      let endMonthQuarterFirstDate = `${startMonthQuarterYear}-04-01`;
                      let momentDate2 = moment(`${endMonthQuarterFirstDate}`);
                      let secondQuarterLeaveDays =
                        endDate.diff(momentDate2, "days") + 1;

                      let remainingFirstQuarterLeave =
                        firstQuarter - firstQuarterLeaveDays;
                      let secondTotalQuarterLeave =
                        secondQuarter + remainingFirstQuarterLeave;
                      let totalQuartilyLeaveBalance =
                        secondTotalQuarterLeave - secondQuarterLeaveDays;
                      if (totalQuartilyLeaveBalance < 0) {
                        quartilyLeaveBalance = 0;
                        leaveWithoutPay = Math.abs(totalQuartilyLeaveBalance);
                      } else {
                        quartilyLeaveBalance = totalQuartilyLeaveBalance;
                        leaveWithoutPay = 0;
                      }
                    } else if (startMonthQuarter == 2 && endMonthQuarter == 3) {
                      let startMonthQuarterLastDate = `${startMonthQuarterYear}-06-30`;
                      let momentDate1 = moment(`${startMonthQuarterLastDate}`);
                      let firstQuarterLeaveDays =
                        momentDate1.diff(startDate, "days") + 1;

                      let endMonthQuarterFirstDate = `${startMonthQuarterYear}-07-01`;
                      let momentDate2 = moment(`${endMonthQuarterFirstDate}`);
                      let secondQuarterLeaveDays =
                        endDate.diff(momentDate2, "days") + 1;

                      let remainingFirstQuarterLeave =
                        firstQuarter + secondQuarter - firstQuarterLeaveDays;
                      let secondTotalQuarterLeave =
                        thirdQuarter + remainingFirstQuarterLeave;
                      let totalQuartilyLeaveBalance =
                        secondTotalQuarterLeave - secondQuarterLeaveDays;
                      if (totalQuartilyLeaveBalance < 0) {
                        quartilyLeaveBalance = 0;
                        leaveWithoutPay = Math.abs(totalQuartilyLeaveBalance);
                      } else {
                        quartilyLeaveBalance = totalQuartilyLeaveBalance;
                        leaveWithoutPay = 0;
                      }
                    } else if (startMonthQuarter == 3 && endMonthQuarter == 4) {
                      let startMonthQuarterLastDate = `${startMonthQuarterYear}-09-30`;
                      let momentDate1 = moment(`${startMonthQuarterLastDate}`);
                      let firstQuarterLeaveDays =
                        momentDate1.diff(startDate, "days") + 1;

                      let endMonthQuarterFirstDate = `${startMonthQuarterYear}-10-01`;
                      let momentDate2 = moment(`${endMonthQuarterFirstDate}`);
                      let secondQuarterLeaveDays =
                        endDate.diff(momentDate2, "days") + 1;

                      let remainingFirstQuarterLeave =
                        firstQuarter +
                        secondQuarter +
                        thirdQuarter -
                        firstQuarterLeaveDays;
                      let secondTotalQuarterLeave =
                        fourthQuarter + remainingFirstQuarterLeave;
                      let totalQuartilyLeaveBalance =
                        secondTotalQuarterLeave - secondQuarterLeaveDays;
                      if (totalQuartilyLeaveBalance < 0) {
                        quartilyLeaveBalance = 0;
                        leaveWithoutPay = Math.abs(totalQuartilyLeaveBalance);
                      } else {
                        quartilyLeaveBalance = totalQuartilyLeaveBalance;
                        leaveWithoutPay = 0;
                      }
                    }
                  }
                }

                
                if (
                  moment(`${leaveData[0].dataValues.DateTo}`) <
                  moment(`${bodyData.dateFrom}`)
                  ) {

                  console.log("leaveType ---> ", bodyData.leaveType);
                  console.log("leaveDays ---> ", leaveDays);
                  console.log("quartilyLeaveBalance ---> ", quartilyLeaveBalance);
                  console.log("leaveWithoutPay ---> ", leaveWithoutPay);

                  await leaveModel.update(
                    {
                      Reference_Id: bodyData.referenceId,
                      LeaveType: bodyData.leaveType,
                      DateFrom: bodyData.dateFrom,
                      DateTo: bodyData.dateTo,
                      Leave_Days: leaveDays,
                      Quartily_Leave_Balance: quartilyLeaveBalance,
                      Leave_Without_Pay: leaveWithoutPay,
                      Reason: bodyData.reason,
                    },
                    {
                      where: {
                        Reference_Id: bodyData.referenceId,
                        Id: leaveData[0].dataValues.Id,
                      },
                    }
                  );
                  response = {
                    Message: "Leave successfully updated",
                  };
                } else {
                  response = {
                    Message:
                      "Date is not valid compare to previous date of leave!!!",
                  };
                }
              }
            } else {
              response = {
                Message:
                  "Start date not valid before current date Or end date not valid",
              };
            }
          } else {
            response = {
              Message: "Employee not found",
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

  static async deleteLeave(id: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await leaveModel.destroy({ where: { Id: id } });
      resolve(data);
    });
  }

  static async createStatus(bodyData: any) {
    return await new Promise(async (resolve, reject) => {
      let data = await statusModel.create({
        StatusName: bodyData.statusName,
      });
      resolve(data);
    });
  }
}
