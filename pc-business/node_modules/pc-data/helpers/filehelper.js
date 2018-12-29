const fs = require("fs");
const path = require("path");

module.exports.FileHelper = class FileHelper {
    readFromFile(fileName, callback) {
        var filePath = path.join(".", "filedb", `${fileName}.json`);
        var errorFound = false;
        //Error first callback implementation
        fs.exists(filePath, (exists) => {
            if(!exists) {
                fs.writeFile(filePath, "{}", (err) => {
                    if(typeof err != "undefined" && err != null) {
                        callback(err, null);
                        errorFound = true;
                    }
                });
            }
            if(!errorFound) {
                fs.readFile(filePath, (err, data) => {
                    if(typeof err != "undefined" && err != null) {
                        callback(err, null);
                    }
                    else {
                        callback(null, data.toString());
                    }
                });
            }
        });
    }

    writeToFile(fileName, data, callback) {
        var filePath = path.join(".", "filedb", `${fileName}.json`);
        fs.writeFile(filePath, data, (err) => {
            if(typeof err != "undefined" && err != null) {
                callback(err, null);
            }
            else {
                callback(null, "File create success.");
            }
        });
    }
}