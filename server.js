


var http = require('http');

var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');

var fs = require('fs');
var url = require('url');
var choices = ["hello world","goodbye world"];

var serve = serveStatic("./");

http.createServer(function(request,response)
{



	var path = url.parse(request.url).pathname;
	if(path == "/getsymptoms")
	{
		console.log(request.body);
		console.log("request received");
		response.writeHead(200, { 'Content-Type': 'application/json' });
            	response.write(JSON.stringify([{ "NAME": "Headache", "VALUE": '20'},{ "NAME": "Dizzines", "VALUE": '33'}]));  
		response.end();
        console.log("string sent");
    	}
	else
	{
		var done = finalhandler(request, respond);
  		serve(request, respond, done);
		/*
        	fs.readFile('./index.html', function(err, file) 
		{  
		   	if(err) 
			{  
		         //write an error response or nothing here  
		        	return;  
		   	}  
		    	response.writeHead(200, { 'Content-Type': 'text/html' });  
		    	response.end(file, "utf-8");  
        	});
		*/
    	}
}).listen(8002);
console.log("server initialized");
