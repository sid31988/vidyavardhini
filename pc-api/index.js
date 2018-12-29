const http = require("http");
const webServer = http.createServer((req, res) => {
    var requestParts = req.url.split("/");
    var apiName = requestParts[1];
    switch(apiName) {
        case "timesheet":
            req.addListener("data", chunk => {
                var formData = JSON.parse(chunk.toString());
            })
        break;
    }
});
webServer.listen(1080);
console.log("Listening on host: 1080");