$(document).ready(function(){
    var socket = io();
    var lastTenLeftX = [];
    var lastTenLeftY = [];
    var lastTenRightX = [];
    var lastTenRightY = [];
    var cursorUpdateRate = 50;
    var offsetX= 0;
    var offsetY= 0;
    

    
    function update() {

	socket.emit('updateRequest', $('#m').val());
	$('#m').val('');
	return false;
	
    }
    setInterval(update, 1);
    setInterval(updateCursor, cursorUpdateRate);

    
    
    function updateCursor(){
	var l = document.getElementById('cursorL');
	l.style.position = "absolute";

	var r = document.getElementById('cursorR');
	r.style.position = "absolute";
	
	var x = document.getElementById('cursor');
	x.style.position = "absolute";


	var averageLeftX = 0;
	var averageLeftY = 0;
	var averageRightX = 0;
	var averageRightY = 0;
	for(i=0 ; i < lastTenLeftX.length ; i++){
	    averageLeftX += lastTenLeftX[i];
	}

	
	for(i=0 ; i < lastTenLeftY.length ; i++){
	    averageLeftY += lastTenLeftY[i];
	}


	averageLeftX = averageLeftX/lastTenLeftX.length;
	averageLeftY = averageLeftY/lastTenLeftY.length;

	var leftX = averageLeftX*screen.width-offsetX;
	var leftY = averageLeftY*screen.height-offsetY;
	l.style.left = (leftX)+'px';
	l.style.top = (leftY)+'px';      

	for(i=0 ; i < lastTenRightX.length ; i++){
	    averageRightX += lastTenRightX[i];
	}

	
	for(i=0 ; i < lastTenRightY.length ; i++){
	    averageRightY += lastTenRightY[i];
	}


	averageRightX = averageRightX/lastTenRightX.length;
	averageRightY = averageRightY/lastTenRightY.length;


	
	var rightX = averageRightX*screen.width-offsetX;
	var rightY = averageRightY*screen.height-offsetY;
	r.style.left = (rightX)+'px';
	r.style.top = (rightY)+'px';      

	x.style.left = ((rightX+leftX)/2)+'px';
	x.style.top = ((rightY+leftY)/2)+'px';      
	
	$('#right').empty().append($('<li>').text("Right Eye : x : "+averageRightX+"   y :  "+averageRightY));
	$('#left').empty().append($('<li>').text("Left Eye : x : "+averageLeftX+"   y :  "+averageLeftY));
	
    }
    
    socket.on('coordinates', function(leftX, leftY, rightX, rightY){

	
	lastTenLeftX.unshift(leftX);
	lastTenLeftY.unshift(leftY);
	
	if(lastTenLeftX.length>cursorUpdateRate){

	    tmp = [];
	    for(i=0 ; i < cursorUpdateRate ; i++){
		
		tmp.push(lastTenLeftX[i]);
	    }
	    lastTenLeftX = tmp;
	}
	if(lastTenLeftY.length>cursorUpdateRate){

	    tmp = [];
	    for(i=0 ; i < cursorUpdateRate ; i++){
		
		tmp.push(lastTenLeftY[i]);
	    }
	    lastTenLeftY = tmp;
	}
	lastTenRightX.unshift(rightX);
	lastTenRightY.unshift(rightY);
	
	if(lastTenRightX.length>cursorUpdateRate){

	    tmp = [];
	    for(i=0 ; i < cursorUpdateRate ; i++){
		
		tmp.push(lastTenRightX[i]);
	    }
	    lastTenRightX = tmp;
	}
	if(lastTenRightY.length>cursorUpdateRate){

	    tmp = [];
	    for(i=0 ; i < cursorUpdateRate ; i++){
		
		tmp.push(lastTenRightY[i]);
	    }
	    lastTenRightY = tmp;
	}


	

    });

});
