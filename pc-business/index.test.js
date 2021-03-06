const EmployeeHelper = require("./modelhelpers/employeehelper").EmployeeHelper;
const DesignationHelper = require("./modelhelpers/designationhelper").DesignationHelper;
const TimesheetHelper = require("./modelhelpers/timesheethelper").TimesheetHelper;
const UserHelper = require("./modelhelpers/userhelper").UserHelper;
const EmployeeViewModelHelper = require("./viewmodelhelpers/employeeviewmodelhelper").EmployeeViewModelHelper;
const TimesheetModel = require("./models/timesheetmodel").TimesheetModel;

var timesheetHelper = new TimesheetHelper();
var timesheetModel = new TimesheetModel(1, 1, "2018-12-29T09:47:39.515Z", 7.3);
timesheetHelper.insert(timesheetModel, (insertErr, result) => {
    if(typeof insertErr != "undefined" && insertErr != null) {
        console.log("Error found while adding timesheet entry: ", err);
    }
    else {
        console.log("Insert result: ", result);
    }
});

var empVMHelper = new EmployeeViewModelHelper();
empVMHelper.createViewModel(1, (err, employeeViewModel) => {
    if(typeof err != "undefined" && err != null) {
        console.log("Error found while creating Employee View Model: ", err);
    }
    else {
        console.log("Employee View Model: ", employeeViewModel);
    }
});

/*
var objEmpHelper = new EmployeeHelper();
objEmpHelper.read(null, (err, result) => {
    if(typeof err != "undefined" && err != null) {
        console.log("Error found while reading Employee: ", err);
    }
    else {
        console.log("Employee Data found: ", result);
    }
});

var objDesgHelper = new DesignationHelper();
objDesgHelper.read(null, (err, result) => {
    if(typeof err != "undefined" && err != null) {
        console.log("Error found while reading Designation: ", err);
    }
    else {
        console.log("Designation Data found: ", result);
    }
});

var objTimesheetHelper = new TimesheetHelper();
objTimesheetHelper.read(null, (err, result) => {
    if(typeof err != "undefined" && err != null) {
        console.log("Error found while reading Timesheet: ", err);
    }
    else {
        console.log("Timesheet Data found: ", result);
    }
});

var objUserHelper = new UserHelper();
objUserHelper.read(null, (err, result) => {
    if(typeof err != "undefined" && err != null) {
        console.log("Error found while reading User: ", err);
    }
    else {
        console.log("User Data found: ", result);
    }
});
*/