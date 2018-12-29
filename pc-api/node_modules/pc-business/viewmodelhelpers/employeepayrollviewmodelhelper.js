const EmployeeViewModelHelper = require("./employeeviewmodelhelper").EmployeeViewModelHelper;
const EmployeePayrollViewModel = require("../viewmodels/employeepayrollviewmodel").EmployeePayrollViewModel;
const PayrollViewModel = require("../viewmodels/payrollviewmodel").PayrollViewModel;
const TimesheetModel = require("../models").TimesheetModel;

const MonthNames = {
    January: 1, "1": "January", February: 2, "2": "February",
    March: 3, "3": "March", April: 4, "4": "April",
    May: 5, "5": "May", June: 6, "6": "June",
    July: 7, "7": "July", August: 8, "8": "August",
    September: 9, "9": "September", October: 10, "10": "October",
    November: 11, "11": "November", December: 12, "12": "December"
}
const MonthlyDaysCount = {
    January: 31, February: 28, March: 31, April: 30, May: 31, June: 30,
    July: 31, August: 31, September: 30, October: 31, November: 30,
    December: 31
}
const MonthlyDaysCountLeap = {
    January: 31, February: 29, March: 31, April: 30, May: 31, June: 30,
    July: 31, August: 31, September: 30, October: 31, November: 30,
    December: 31
}
const DaysOfWeek = {
    Sunday: 0, Monday: 1, Tuesday: 2, Wednesday: 3, Thursday: 4, Friday: 6,
    Saturday: 7
}

module.exports.EmployeePayrollViewModelHelper = class EmployeePayrollViewModelHelper extends EmployeeViewModelHelper {
    constructor() {
        super();
    }

    createViewModel(employeeId, callback) {
        super.createViewModel(employeeId, (err, result) => {
            if(typeof err != "undefined" && err != null) {
                callback(err, null);
            }
            else {
                var employeePayrollViewModel = new EmployeePayrollViewModel();
                for(var x in result) {
                    employeePayrollViewModel[x] = result[x];
                }
                this.calculatePayroll(employeePayrollViewModel);
                callback(null, employeePayrollViewModel);
            }
        });
    }

    calculatePayroll(empPayViewModel) {
        if(empPayViewModel instanceof EmployeePayrollViewModel) {
            var groupedTimesheets = {};
            empPayViewModel.timesheet.forEach(x => {
                if(x instanceof TimesheetModel) {
                    var year = x.date.getFullYear();
                    var month = x.date.getMonth() + 1;
                    var monthName = MonthNames[month];

                    if(groupedTimesheets[year] === undefined) {
                        groupedTimesheets[year] = {};
                    }
                    var yearWiseGroup = groupedTimesheets[year];
                    if(yearWiseGroup[monthName] === undefined) {
                        yearWiseGroup[monthName] = [];
                    }
                    yearWiseGroup[monthName].push(x);
                }
            });

            for(var year in groupedTimesheets) {
                empPayViewModel[year] = {};
                for(var month in groupedTimesheets[year]) {
                    var timesheetsForMonth = groupedTimesheets[year][month];
                    var isLeapYear = year % 4 == 0;
                    var salary = empPayViewModel.designation.salary;
                    var monthlyPayroll = this.calculatePayrollFromTimesheets(timesheetsForMonth, salary, month, year, isLeapYear);
                    empPayViewModel.payroll[year] = {};
                    empPayViewModel.payroll[year][month] = monthlyPayroll;
                }
            }
        }
    }

    calculatePayrollFromTimesheets(timesheets, salary, monthName, year, isLeapYear) {
        var payrollViewModel = new PayrollViewModel();
        var billableDays = 0;
        var halfDays = 0;
        var leaves = 0;
        var nonBillableDays = 0;
        var totalWorkingHours = 0;
        timesheets.forEach(timesheet => {
            if(timesheet instanceof TimesheetModel) {
                totalWorkingHours = totalWorkingHours + timesheet.hours;
                if(timesheet.hours > 6) {
                    billableDays = billableDays + 1;
                }
                else if(timesheet.hours > 2){
                    billableDays = billableDays + 1;
                    halfDays = halfDays + 1;
                }
                else {
                    leaves = leaves + 1;
                }
            }
        });
        var daysCount = isLeapYear ? MonthlyDaysCountLeap[monthName] : MonthlyDaysCount[monthName];
        var dateDetails = this.getDateDetails(1, daysCount, MonthNames[monthName], year);
        var weekends = dateDetails.filter(x => !x.isWeekday).length;
        nonBillableDays = leaves + weekends;

        var dailySalary = salary / daysCount;
        var fullDays = billableDays - halfDays + weekends;
        payrollViewModel.amountPayable = Math.ceil(fullDays * dailySalary) + Math.ceil(halfDays * dailySalary);
        payrollViewModel.billableDays = billableDays;
        payrollViewModel.month = MonthNames[monthName];
        payrollViewModel.monthName = monthName;
        payrollViewModel.nonBillableDays = nonBillableDays;
        payrollViewModel.totalHalfDays = halfDays;
        payrollViewModel.totalLeaves = leaves;
        payrollViewModel.totalWorkingHours = totalWorkingHours;
        payrollViewModel.year = year;

        return payrollViewModel;
    }

    getDateDetails(fromDay, toDay, month, year) {
        var dateDetails = [];
        for(var i = fromDay; i <= toDay; i++) {
            var date = new Date(parseInt(year), month - 1, i, 0, 0, 0, 0);
            dateDetails.push({
                date: date,
                isWeekday: date.getDay() != 0 && date.getDay() != 6,
                day: DaysOfWeek[date.getDay()]
            });
        }
        return dateDetails;
    }
}