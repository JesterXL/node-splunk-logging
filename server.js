'use strict';

const Hapi = require('hapi');
var splunkLogger = require('./splunk');

// Create a server with a host and port
const server = new Hapi.Server();
server.connection({ 
    host: 'localhost', 
    port: 4000 
});

// Add the route
server.route({
    method: 'GET',
    path:'/hello', 
    handler: function (request, reply) {

        return reply('hello world');
    }
});

server.route({
	method: 'GET',
	path: '/logtest',
	handler: function(req, reply)
	{
		splunkLogger.send(function(err, response, body)
		{
			reply("Done logging to Splunk.");
		});
	}
})

// Start the server
server.start((err) => {

    if (err) {
        throw err;
    }
    console.log('Server running at:', server.info.uri);
});