var SplunkLogger = require("splunk-logging").Logger;

var config = {
    token: "E09D0308-510A-4D4E-810A-26A489B6FF02",
    url: "https://localhost:8088"
};

var Logger = new SplunkLogger(config);

function send(cb)
{
	var payload = {
	    // Message can be anything; doesn't have to be an object
	    message: {
	        temperature: "70F",
	        chickenCount: 500
	    }
	};
	console.log("Sending payload", payload);
	Logger.send(payload, function(err, resp, body) {
	    // If successful, body will be { text: 'Success', code: 0 }
	    console.log("Response from Splunk", body);
	    cb(err, resp, body);
	});
}

module.exports = {
	send: send
};