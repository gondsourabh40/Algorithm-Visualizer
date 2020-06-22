let addNewClassButton;
let testDataButton;
let inputButton;
function setup() 
{
	createCanvas(windowWidth,windowHeight);
	line(150,150,150,550);   // Y-axis line
	line(150,550,600,550); // X-axis line
		
	addNewClassButton=createButton("Add New Class"); //Function will add new class
	addNewClassButton.position(850,150);
	addNewClassButton.mouseClicked(addNewClass);	

	testDataButton=createButton("Add Test Input"); //Function will add new test input
	testDataButton.position(850,190);
	testDataButton.mouseClicked(addTestInput);	
	
	inputButton=createInput();
    inputButton.position(850,270);
}
var X=[]  // Input Vector
var Y=[] //  Output Vector
var pointsColorRed=[]; //  Store colour of each point
var pointsColorBlue=[]; 
var pointsColorGreen=[]; 
let testPointX=-1  // This point will store the cordinates of test input point
let testPointY=-1;
let addNewClassFlag=true;  
let addTestInputFlag=false;
let distanceAndIndex=[]; //store sorted distance and index of points with test cordinate
let runButtonStatus=false;
let clusterId=0;
let pointClusterId=[];  
let closePoints=[];  // It is use to find the closest cluster within K nearest points
let max,index;

class NearestPoint
{
  constructor(distance,index) 
  {
    this.distance=distance;
	this.index=index;
  }
}

function draw() //Infinite loop until user terminate
{ 
	background(180,255,255);
	strokeWeight(4);
	
	textSize(30);
	fill("white");
	text("K Nearest Neighbours Algorithm",410,110);
	
	line(150,150,150,550);   // Y-axis line
	line(150,550,600,550); // X-axis line
	textSize(25);
	fill('whilte');
	text("X-axis",610,555);
	text("Y-axis",130,145);
	text("Enter Value of K",850,240)

	strokeWeight(1);
	kNearestNeighbours();
	if(testPointX!=-1 && testPointY!=-1) 
	{
		if(inputButton.value()=="" || inputButton.value()>X.length || inputButton.value()<=0 || Number.isInteger((int(inputButton.value())))==false)
		{
			strokeWeight(4);
			line(testPointX-10,testPointY-10,testPointX+10,testPointY+10);
			line(testPointX+10,testPointY-10,testPointX-10,testPointY+10);	
			strokeWeight(1);
		}
	  else 
	  {
		fill(pointsColorRed[index],pointsColorGreen[index],pointsColorBlue[index]);
		circle(testPointX,testPointY,20);
	  }
	}

	for(let i=0;i<X.length;i++)
	{
			fill(pointsColorRed[i],pointsColorGreen[i],pointsColorBlue[i]);
			circle(X[i],Y[i],10);
	}
	closePoints=[];
	for(let i=0;i<=clusterId;i++)
	 closePoints.push(0);
	let c=0;
	for(let i=0;i<int(inputButton.value());i++)
	{
		if(distanceAndIndex.length>0 && inputButton.value()!="" && int(inputButton.value())<=X.length && int(inputButton.value())>0)
		{
			strokeWeight(2);
			let x=X[distanceAndIndex[i].index];
			let y=Y[distanceAndIndex[i].index];
			line(testPointX,testPointY,x,y);
			closePoints[pointClusterId[distanceAndIndex[i].index]]++; 
c++;			
		}
	}
	max=-1;
	for(let i=0;i<closePoints.length;i++)
	{
		if(max<closePoints[i])
		{
			 max=closePoints[i];
			 index=i;
		}
	}
	
	for(let i=0;i<pointClusterId.length;i++)
	{
		if(index==pointClusterId[i])      // find the maximum frequeny cluster within K points 
		 {index=i;}
	}
	stroke(0,0,0);
	strokeWeight(1);
}

function addNewClass()  // Function will create new cluster for next input points
{
	red=(int(random(1,255)));
    green=(int(random(1,255)));
	blue=(int(random(1,255)));
	if(clusterId==0)
		addNewClassFlag=true;
	if(addNewClassFlag==false) 
		 return;
	clusterId++;
	addNewClassFlag=false;
	addTestInputFlag=false;
}
function addTestInput()  
{
		addTestInputFlag=true;
}

function kNearestNeighbours()  //K NearestNeighbours Algorithm
{
	distanceAndIndex=[];   // store distance and index idetifies the point to which distance is belong to 
	for(let i=0;i<X.length;i++)
	{
		let perpendicular=abs(Y[i]-testPointY);  // Apply Euclidean Distance
		let base=abs(X[i]-testPointX);
		base*=base;
		perpendicular*=perpendicular;
		let distance=int(sqrt(base+perpendicular));
		distanceAndIndex.push(new NearestPoint(distance,i));
	}

	distanceAndIndex.sort(function(firstPoint,secondPoint){   // sort the all calculated distance for finding nearest K points
       return firstPoint.distance-secondPoint.distance;
	   })
}

function mousePressed()  // Append location of input data points 
{
	if(mouseX>=150 && mouseX<=600 && mouseY>=150 && mouseY<=550)
	{
		if(addTestInputFlag)
		{
		 testPointX=mouseX;
		 testPointY=mouseY;
		}
		else if(clusterId>=1)
		{
			X.push(mouseX);
			Y.push(mouseY);
			pointsColorRed.push(red);
			pointsColorGreen.push(green);
			pointsColorBlue.push(blue);
			pointClusterId.push(clusterId);
			addNewClassFlag=true;
		}
	}
}

