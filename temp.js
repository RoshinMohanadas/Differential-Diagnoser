var http = require('http');
var qs = require('querystring');
var mysql = require('mysql');



var finalhandler = require('finalhandler');
var serveStatic = require('serve-static');
var url = require('url');

var serve = serveStatic("./");

var con = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "root",
	database: "project"
});

con.connect(function(err){
if(err){
	console.log('Error connecting to Db');
	return;
	}
	console.log('Connection established');
});

var server = http.createServer(function(req, res) {
	
	var path = url.parse(req.url).pathname;

	

	if(path == "/getsymptoms")
	{
		var body ="";
		
		req.on('data',function(data){
			body+=data;
		});

		 req.on('end', function () {
            		var post = qs.parse(body);
			console.log(post['region']);
			console.log("request received");
			res.writeHead(200, { 'Content-Type': 'application/json' });
			
   			var str = "";
			con.query('SELECT * FROM symptom',function(err,rows)
			{
  				if(err) throw err;

				  console.log('Data received from Db:\n');
				  console.log(rows);
				str = "[";
				for (var i = 0; i < rows.length; i++) 
				{
					  console.log(rows[i].sname);
					str+=JSON.stringify({ "NAME": rows[i].sname , "VALUE" : rows[i].sval });
				/*	str+="{";
					str+='NAME:'+rows[i].sname+',';
					str+='VALUE:'+rows[i].sval;
				*/	
					if(i!=rows.length-1)
				
					str+=",";
				};
				str+="]";
				console.log(str);
				
			});


			res.write(str);
		    	//res.write(JSON.stringify([{ "NAME": "Headache", "VALUE": 20},{ "NAME": "Dizzines", "VALUE": 33}]));  
			res.end();
			console.log("string sent");
            
       		 });
		
		
		
    	}
	else
	{

		var done = finalhandler(req, res);
		serve(req, res, done);
	}
});

server.listen(8001);
