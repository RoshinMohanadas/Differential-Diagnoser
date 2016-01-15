


/*
function loadbody()
{

    var body = document.getElementById("humanBodyDivision");
    body.innerHTML = " ";

	var img = document.createElement("img");
	img.setAttribute("src","pics/human_body1.jpg");
	img.setAttribute("usemap","#newmap");
	
	var height = img.getAttribute("height");
	var width = img. getAttribute("width");
	
	var ratiox= 265/width;
	var ratioy= 529/height;
	
	var map = document.createElement("map");
	map.setAttribute("name","newmap");
	
			 var area1 = document.createElement("area");
			 area1.setAttribute("shape","poly");
			 area1.setAttribute("coords","97,34,110,10,131,2,160,10,163,38,149,66,115,66");
			 area1.setAttribute("name","head");
			 map.appendChild(area1);                  
    
			var area2 = document.createElement("area");
			area2.setAttribute("shape","poly");
			area2.setAttribute("coords","0,0");
			area2.
}


function eventManage()
{
        var regions = document.getElementById("humanBodyDivision").querySelectorAll(".region");
        
        for(var i=0;i<regions.length();i++)
        {
            var name = regions[i].getAttribute("name");
            regions[i].addEventListener("click",listsymptoms(name));
            regions[i].addEventListener("mouseover",highlight(name));
            regions[i].addEventListener("mouseout",dehighlight(name));
        }

}

*/

		var arr = [];
		var sym = [];
		function listsymptoms(name)
		{
		       $.ajax({
			    type: "POST",
			    dataType: "json",
			    data: {'region' : "'"+name+"'"},
			    url: 'http://localhost:8000/getsymptoms',
			    success: function(data) 
			    {
				//alert("hello");
				var obj = data.str;
				alert(obj);
				var length = obj.length;
				var i=0;
		    
				var listdiv = document.getElementById("listdiv");
				listdiv.innerHTML = "";
				
								
				while(i<length)
				{
				    var div = document.createElement("div");
				    div.innerHTML = obj[i].NAME+" - "+obj[i].VALUE;
				    div.style.backgroundColor = "#ffffff";
				    div.setAttribute("onclick",'add("'+obj[i].NAME+'",'+obj[i].VALUE+')');
				    listdiv.appendChild(div);
				    var o = document.createElement('br');
				    listdiv.appendChild(o); 
				    i++;
				}
			    }
			});
		}

		function add(name,value)
		{
		    
		    arr.push(value);
		    sym.push(name);
		    
		    
		    var final = document.getElementById('finallist');
		    
			
			var div = document.createElement('div');
			div.innerHTML = name;
			div.style.backgroundColor = "#ffffff";
			final.appendChild(div);
			
			/*
			var num = Math.random(1000);
			div.setAttribute("id",num);
			var sp = document.createElement('span');
			sp.setAttribute("class","glyphicon glyphicon-remove");
			sp.setAttribute("onclick","alert('remove from list?');remove('finallist',"+num+");");
			final.appendChild(sp);
			*/
			var o = document.createElement('br');
			final.appendChild(o);
			
		}  


function remove(parent,child)
{
	
}

function listParameters(healthCondition)
{
    $.ajax({
            type: "POST",
            dataType: "json",
            data: {region : name},
            url: 'ajax/getparams.php',
            success: function(data) 
            {

                var obj = JSON.parse(data);
                var length = obj.length();
                var i=0;
    
                var listparams = document.getElementById("listparams");
                listparams.innerHTML = "";
                while(i<length)
                {
                    var input = document.createElement("input");
                    input.setAttribute("type","text");
                    input.setAttribute("placeholder",obj[i].NAME);
                    input.setAttribute("class","param");
                    listparams.appendChild(input); 
                }
            }
        });
    
}


