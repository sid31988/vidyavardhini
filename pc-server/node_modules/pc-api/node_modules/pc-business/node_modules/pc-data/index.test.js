const DbContextFactory = require("./src/dbcontextfactory").DbContextFactory;
const ContextTypeEnum = require("./src/dbcontextfactory").ContextTypeEnum;

const MongoClient = require("mongodb").MongoClient;
const mongoUrl = "mongodb://localhost:27017";

MongoClient.connect(mongoUrl, { useNewUrlParser: true }, function (err, client) {
    if(typeof err != "undefined" && err != null) {
        console.log(`Error found while connecting to '${mongoUrl}'`, err);
    }
    else {
        const timesheetCollection = client.db("vidyavardhini").collection("timesheet");
        timesheetCollection.find({ $and: [
            { "employeeId": "1" },
            { "date": "12-03-2018" }
        ] }).toArray((err, timesheetData) => {
            if(typeof err != "undefined" && err != null) {
                console.log(`Error while reading from collection timesheet`, err);
            }
            else {
                console.log(`Timesheet data found: `, timesheetData);

                timesheetCollection.updateOne({ "employeeId": timesheetData[0].employeeId, "date": timesheetData[0].date }, { $set: { "hours": 10 } }, { upsert: true }, (err, result) => {
                    if(typeof err != "undefined" && err != null) {
                        console.log(`Error while reading from collection timesheet`, err);
                    }
                    else {
                        console.log(`Timesheet data updated`, result);
                    }
                    client.close();
                });
            }
        });
    }
});

/*
var factory = new DbContextFactory();
var fileDbContext = factory.createContext(ContextTypeEnum.FileDbContext, "user");
var userItem = {
    id: 3,
    name: "superadmin",
    userName: "superadmin",
    pwd: "abcd@1234"
};
fileDbContext.insert(userItem, (err, result) => {
    if(typeof err != "undefined" && err != null) {
        console.log(err);
    }
    else {
        console.log(JSON.stringify(result));

        userItem.name = "admin";
        fileDbContext.update(userItem, (err, result) => {
            if(typeof err != "undefined" && err != null) {
                console.log(err);
            }
            else {
                console.log(JSON.stringify(result));
            
                fileDbContext.delete(userItem, (err, result) => {
                    if(typeof err != "undefined" && err != null) {
                        console.log(err);
                    }
                    else {
                        console.log(JSON.stringify(result));
                    }
                });
            }
        });
    }
});
*/