const moment = require("moment");

if (moment("2022-09-21") > moment("2022-09-20")) {
  console.log("first")
} else {
  console.log("second")
}

// var startDate1 = moment("2023-08-20");
// console.log("Start Date ---> ", startDate1);
// var endDate1 = moment("2023-08-24");
// console.log("End Date ---> ", endDate1);
// var currentDate = moment();
// console.log("Current Date ---> ", currentDate);

// if (startDate1 >= currentDate && startDate1 <= endDate1) {
//   console.log("first");
// } else {
//   console.log("second");
// }

// let sm = moment("2013-04-25").quarter(2);
// console.log(sm);

// let quarterLeave;
// if (leaveData[0]) {
//   let prevLeaveBalance = leaveData[0].dataValues.Leave_Balance;

//   let prevQuartilyLeaveBalance =
//     leaveData[0].dataValues.Quartily_Leave_Balance;

//   if (startMonthQuarter && endMonthQuarter == 3) {
//     quarterLeave = firstQuarter + secondQuarter + thirdQuarter;
//     if (prevQuartilyLeaveBalance == 0) {
//       leaveBalance = prevLeaveBalance;
//       quartilyLeaveBalance = 0;
//       leaveWithoutPay = leaveDays;
//     } else {
//       leaveBalance = prevLeaveBalance - quarterLeave;
//       quartilyLeaveBalance = prevQuartilyLeaveBalance - leaveDays;
//       if (quartilyLeaveBalance < 0) {
//         leaveWithoutPay = Math.abs(quartilyLeaveBalance + leaveDays);
//         quartilyLeaveBalance = 0;
//       }
//     }
//   } else {
//     if (startMonthQuarter && endMonthQuarter == 1) {
//     } else if (startMonthQuarter && endMonthQuarter == 2) {
//     } else if (startMonthQuarter && endMonthQuarter == 4) {
//       quarterLeave = fourthQuarter + prevQuartilyLeaveBalance;
//       console.log(quarterLeave)
//     }
//     console.log(prevQuartilyLeaveBalance)
//     if (prevQuartilyLeaveBalance == 0) {
//       leaveBalance = prevLeaveBalance;
//       quartilyLeaveBalance = 0;
//       leaveWithoutPay = leaveDays;
//     } else {
//       leaveBalance = prevLeaveBalance - quarterLeave;
//       console.log(leaveBalance)
//       quartilyLeaveBalance = prevQuartilyLeaveBalance - leaveDays;
//       if (quartilyLeaveBalance < 0) {
//         leaveWithoutPay = Math.abs(quartilyLeaveBalance + leaveDays);
//         quartilyLeaveBalance = 0;
//       }
//     }
//   }
// } else {
//   if (startMonthQuarter && endMonthQuarter == 3) {
//     quarterLeave = firstQuarter + secondQuarter + thirdQuarter;
//     if (leaveDays >= quarterLeave) {
//       leaveBalance = 21 - quarterLeave;
//       quartilyLeaveBalance = quarterLeave - leaveDays;
//       if (quartilyLeaveBalance <= 0) {
//         leaveWithoutPay = Math.abs(quartilyLeaveBalance);
//         quartilyLeaveBalance = 0;
//       }
//     } else {
//       leaveBalance = totalLeave - leaveDays;
//       quartilyLeaveBalance = quarterLeave - leaveDays;
//       leaveWithoutPay = 0;
//     }
//   } else {
//     if (startMonthQuarter && endMonthQuarter == 1) {
//       quarterLeave = firstQuarter;
//     } else if (startMonthQuarter && endMonthQuarter == 2) {
//       quarterLeave = firstQuarter + secondQuarter;
//     } else if (startMonthQuarter && endMonthQuarter == 4) {
//       quarterLeave = firstQuarter + secondQuarter + thirdQuarter + fourthQuarter;
//     }
//     if (leaveDays >= quarterLeave) {
//       leaveBalance = 21 - quarterLeave;
//       quartilyLeaveBalance = quarterLeave - leaveDays;
//       if (quartilyLeaveBalance <= 0) {
//         leaveWithoutPay = Math.abs(quartilyLeaveBalance);
//         quartilyLeaveBalance = 0;
//       }
//     } else {
//       leaveBalance = totalLeave - leaveDays;
//       quartilyLeaveBalance = quarterLeave - leaveDays;
//       leaveWithoutPay = 0;
//     }
//   }
// }

// if (remainingFirstQuarterLeave >= 0) {
//   console.log(secondTotalQuarterLeave)
//   if (totalQuartilyLeaveBalance >= 0) {
//     quartilyLeaveBalance = totalQuartilyLeaveBalance;
//     leaveWithoutPay = 0;
//   } else {
//     leaveWithoutPay = Math.abs(totalQuartilyLeaveBalance);
//     quartilyLeaveBalance = 0;
//   }
// } else {
//   let firstQuarterLeaveWithoutPay = Math.abs(remainingFirstQuarterLeave);
//   let totalQuartilyLeave = secondQuarter - firstQuarterLeaveWithoutPay;
//   quartilyLeaveBalance = totalQuartilyLeave - leaveDays;
//   if (quartilyLeaveBalance < 0) {
//     leaveWithoutPay = Math.abs(quartilyLeaveBalance);
//     quartilyLeaveBalance = 0;
//   } else {
//     leaveWithoutPay = 0;
//   }
// }

// let prevEmpId = employee.dataValues.Id;
// increment = prevEmpId + 1;
// let lengthValue = prevEmpId.toString().length;
// if (lengthValue == 1 && prevEmpId != 9) {
//   employeeId = "E" + "0" + "0" + increment;
// } else if (lengthValue == 2 || prevEmpId == 9) {
//   if (prevEmpId == 99) {
//     employeeId = "E" + increment;
//   } else {
//     employeeId = "E" + "0" + increment;
//   }
// } else if (lengthValue == 3) {
//   employeeId = "E" + increment;
