var http = require('http');
var qs = require('querystring');
var mysql = require('mysql');
var MLP = require('mlp');


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

				for (var i = 0; i < rows.length; i++) 
				{
					  
					  str.push({"NAME":rows[i].sname,"VALUE":rows[i].sval});
				};
				
				
				console.log(JSON.stringify({"str":str}));
				 
                                console.log(str);
				res.write(JSON.stringify({"str":str}));
				
				res.end();
			
				console.log("string sent");
				
			});
			
            
       		 });
		
		
		
    	}
	else if (path == "/inputsymptoms")
	{
		var body ="";
		
		req.on('data',function(data){
			body+=data;
		});
		 
		req.on('end', function () 
		{
            		//var post = qs.parse(body);
			var arr= JSON.parse(body);
			
			//console.log(req.body);
			console.log(arr);
			console.log("request received");
			
			/*
			res.writeHead(200, { 'Content-Type': 'application/json' });
			
			var str = [];
			con.query('SELECT symptom.sname, symptom.sval FROM symptom,region,regionsymptom WHERE symptom.sno = regionsymptom.sno AND region.rno = regionsymptom.rno AND region.rname = '+post.region,function(err,rows)
			{
  				if(err) throw err;

				for (var i = 0; i < rows.length; i++) 
				{
					  
					  str.push({"NAME":rows[i].sname,"VALUE":rows[i].sval});
				}
				
				
				console.log(JSON.stringify({"str":str}));
				 
                                console.log(str);
				res.write(JSON.stringify({"str":str}));
				
				res.end();
			
				console.log("string sent");
				
			});
			
            		*/
       		 });
		
	}
	else if (path == "/mlp")
	{	
					// create a new perceptron
			var MLP = require('mlp');
			var mlp = new MLP(2,1);

			// add hidden layers and initialize
			mlp.addHiddenLayer(5);
			
			mlp.init();

			mlp.addToTrainingSet([1, 1], [0]);
			mlp.addToTrainingSet([0, 1], [1]);
			mlp.addToTrainingSet([1, 0], [1]);
			mlp.addToTrainingSet([0, 0], [0]);
			

			var learnRate = 0.5;
			var error = Number.MAX_VALUE;
			while (error > 0.01) {
				error = mlp.train(learnRate);
			}

			var element = [1, 0.8];
			var classification = mlp.classify(element);
			console.log(classification);
			console.log(mlp);
			mlp.save("saved.json");
			mlp.load("saved.json");
			
	}
/*	else if ( path == "/mlptrain")
	{
		var body ="";
		
		req.on('data',function(data){
			body+=data;
		});
		
		req.on('end', function () 
		{
            		//var post = qs.parse(body);
			var arr= JSON.parse(body);
			
			//console.log(req.body);
			console.log(arr);
			console.log("request received");
			
			
			res.writeHead(200, { 'Content-Type': 'application/json' });
			
			var str = [];
			con.query('SELECT symptom.sname, symptom.sval FROM symptom,region,regionsymptom WHERE symptom.sno = regionsymptom.sno AND region.rno = regionsymptom.rno AND region.rname = '+post.region,function(err,rows)
			{
  				if(err) throw err;

				for (var i = 0; i < rows.length; i++) 
				{
					  
					  str.push({"NAME":rows[i].sname,"VALUE":rows[i].sval});
				}
				
				
				console.log(JSON.stringify({"str":str}));
				 
                                console.log(str);
				res.write(JSON.stringify({"str":str}));
				
				res.end();
			
				console.log("string sent");
				
			});
			
            		
       		 });
		
		
	}
*/
/*	else if (path = '/listparam')
	{
		var body ="";
		
		req.on('data',function(data){
			body+=data;
		});

		req.on('end', function () 
		{
            		//var post = qs.parse(body);
			var arr= JSON.parse(body);
			
			//console.log(req.body);
			console.log(arr);
			console.log("Health Condition Received");
			
			
			res.writeHead(200, { 'Content-Type': 'application/json' });
			
			var str = [];
			con.query('SELECT param.pname, param.pno, param.punit FROM param, disease WHERE param.pno = paramdisease.pno AND disease.dno = paramdisease.dno AND disease.dname = '+post.disease, function(err,rows)
			{
  				if(err) throw err;

				for (var i = 0; i < rows.length; i++) 
				{
					  
					  str.push({"PNAME":rows[i].pname,"VALUE":rows[i].pno,"PUNIT":rows[i].punit});
				}
				
				
				console.log(JSON.stringify({"str":str}));
				 
                                console.log(str);
				res.write(JSON.stringify({"str":str}));
				
				res.end();
			
				console.log("string sent");
				
			});
			
            		
       		 });
		
	}
*/	
	else
	{

		var done = finalhandler(req, res);
		serve(req, res, done);
	}
});

server.listen(8000);
