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
		 
		req.on('end', function () 
		{
            		var post = qs.parse(body);
			console.log(post['region']);
			console.log("request received");
			

			res.writeHead(200, { 'Content-Type': 'application/json' });
			
			var str = [];
			con.query('SELECT symptom.sname, symptom.sval FROM symptom,region,regionsymptom WHERE symptom.sno = regionsymptom.sno AND region.rno = regionsymptom.rno AND region.rname = '+post.region,function(err,rows)
			{
  				if(err) throw err;

				  //console.log('Data received from Db:\n');
				  //console.log(rows);
				
				for (var i = 0; i < rows.length; i++) 
				{
					  //console.log(rows[i].sname);
					  str.push({"NAME":rows[i].sname,"VALUE":rows[i].sval});
				};
				
				//strobj = JSON.stringify({"str":str});
				console.log(JSON.stringify({"str":str}));
				 
                                console.log(str);
				res.write(JSON.stringify({"str":str}));
				/*
				if(post.region == "'head'")
				{
					console.log("Entered");
				res.write(JSON.stringify([{ "NAME": "Headache", "VALUE": 20},{ "NAME": "Dizzines", "VALUE": 33}]));
				}  
				else if (post.region == "'righthand'"||post.region == "'lefthand'")
				{res.write(JSON.stringify([{ "NAME": "Rashes", "VALUE": 40},{ "NAME": "Swelling", "VALUE": 78}]));
				}
				*/
				res.end();
			
				console.log("string sent");
				
			});
			
            
       		 });
		
		
		
    	}
	else
	{

		var done = finalhandler(req, res);
		serve(req, res, done);
	}
});

server.listen(8000);
