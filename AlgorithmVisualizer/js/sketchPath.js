
var width = 0, height = 0;

var row = 0,col = 0;
var space = 25;
var maze;
var src=[0,0];
var dest = [];
var path;
var visited = [];
function getSelectedObject() 
{ 
    var ele = document.getElementsByName('object'); 
      
    for(i = 0; i < ele.length; i++) { 
        if(ele[i].checked) 
        return ele[i].value; 
    } 
} 
function setup()
{
	var hdiff = floor((windowWidth/100)*10);
	var vdiff = floor((windowHeight/100)*10);
	
	width = windowWidth-2*hdiff;
	height = windowHeight-2*vdiff;
	width=height;
	row = ceil(height/space);
	col = ceil(width/space);
	let cnv = createCanvas(width+2*space, width+2*space);
	
	//
	//background('green'); 
	//
	hdiff=floor((windowWidth-height-space)/2);
	cnv.position(hdiff,vdiff);
	
	
	maze = new Maze(row);
	dest = [row-1,col-1];
	
	frameRate(2);
	iter = maze.shortestPath(src,dest);
}
function getIndex(coordinate,space)
{
	return floor(coordinate/space);
}
function getCoordinate(index,space)
{
	return index*space+space/2;
}
function drawGrid()
{
	 

	
	for(var i=space/2;i<=space*maze.getsize()[0];i+=space)
	{
		for(var j=space/2;j<=space*maze.getsize()[1];j+=space)
		{
			var indi = getIndex(i,space);
			var indj = getIndex(j,space);
			if(maze.isObstacles(indi,indj))
				fill(120);
			else
				fill(255);
			rect(j,i,space,space);
		}
		
	}
}
function setObject()
{
	if (mouseIsPressed) {
		if (mouseButton === LEFT) {
      		var i = mouseY;
      		var j = mouseX;
      		var indi = getIndex(mouseY-(space/2),space);
      		var indj = getIndex(mouseX-(space/2),space);
      		var obj = getSelectedObject();
  			var leftheight = getCoordinate(0,space);
			var topheight = getCoordinate(0,space);
      		if(obj=="obstacles")
      		{
      			maze.setObstacles([[indi,indj]]);
      			iter = maze.shortestPath(src,dest);
      			visited=[];
      		}
      		else if(obj=="source")
      		{
      			if(mouseX>leftheight && mouseY>topheight)
      			{

      				src = [indi,indj];
      				iter = maze.shortestPath(src,dest);
      				visited=[];
      			}
      		}
      		else
      		{
      			if(mouseX>leftheight && mouseY>topheight)
      			{
      				dest=[indi,indj];
      				iter = maze.shortestPath(src,dest);
      				visited=[];
      			}
      		}
    	}
	}
} 
function drawPoint(point)
{
	rect(getCoordinate(point[0],space),getCoordinate(point[1],space),space,space);
}

function wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}
function printShortestPath(j,path)
{
	if(isdefined(path))
	{
		j=Math.min(path.length-1,j);
		for(var i=0;i<=j;i++)
		drawPoint([path[i][1],path[i][0]]);
	}
}
function isdefined(path)
{
	if(typeof path === 'undefined')
	return false;
	return true;
}
var pi = 0;
var vi = 0;
function draw()
{
	background(180,255,255);
	drawGrid();
	frameRate(30);
	setObject();
	x = iter.next();
	if(!x.done)
	{
		temp = x.value;
		visited.push(temp);
		fill(255,0,0);
		path=x.value;
	}

	
	fill(0,250,0);
	printShortestPath(vi,visited.slice(0,visited.length-1));
	fill(255,255,0);
	printShortestPath(vi,visited[visited.length-1]);
	fill(255,0,0);
	drawPoint([src[1],src[0]]);
	fill(0,0,255);
	drawPoint([dest[1],dest[0]]);
	
	if(isdefined(visited[visited.length-1])&&pi<visited[visited.length-1].length);
	{
		pi++;
	}
	if(vi<visited.length-1)
	{
		vi++;
	}
}

