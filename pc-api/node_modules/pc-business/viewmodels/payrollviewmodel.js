module.exports.PayrollViewModel = class PayrollViewModel {
    constructor() {
        this.billableDays = 0;
        this.nonBillableDays = 0;
        this.totalWorkingHours = 0;
        this.totalHalfDays = 0;
        this.month = 0;
        this.monthName = null;
        this.year = 0;
        this.amountPayable = 0;
        this.totalLeaves = 0;
    }
}