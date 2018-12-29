const pcApi = require("pc-api");
const http = require("http");
const webServer = http.createServer((req, res) => {
    var requestParts = req.url.split("/");
    var apiName = requestParts[1];
    var actionName = requestParts[2];
    if(typeof apiName == "undefined" || apiName == null) {
        res.statusCode = 404;
        res.write(`Invalid Api Call: ${apiName}`);
        res.end();
    }
    if(typeof actionName == "undefined" || actionName == null) {
        res.statusCode = 404;
        res.write(`Invalid Api Action: ${actionName}`);
        res.end();
    }
    var factory = new pcApi.ApiFactory();
    var apiInstance = factory.createInstance(apiName);
    if(apiInstance == null) {
        res.statusCode = 400;
        res.write(`No such Api Call: ${apiName}`);
        res.end();
    }
    else if(apiInstance[actionName] === undefined) {
            res.statusCode = 400;
            res.write(`No such Api Call: ${apiName}`);
            res.end();
    }
    else {
        req.addListener("data", chunk => {
            var apiParams = JSON.parse(chunk.toString());
            apiInstance[actionName](apiParams, (err, result) => {
                if(typeof err != "undefined" && err != null) {
                    res.statusCode = 404;
                    res.write(JSON.stringify(err));
                    res.end();
                }
                else {
                    res.statusCode = 200;
                    res.write(JSON.stringify(result));
                    res.end();
                }
            })
        })
    }
});
webServer.listen(1080);
console.log("Listening on host: 1080");