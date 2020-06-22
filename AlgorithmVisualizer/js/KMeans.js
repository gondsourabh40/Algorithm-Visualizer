let runButton;
let throwRandomPointsButton;
let inputDataButton;
function setup() 
{
	createCanvas(windowWidth,windowHeight);
  	textSize(25);
	fill('white');
	text("X-axis",610,555);
	text("Y-axis",130,145);	
	
	radio=createRadio();	
	radio.option("Input data points") 
	radio.option("Throw random points for cluster") 
	radio.value("Input data points");
	radio.position(150,630);
	
	runButton=createButton("Run Algorithm"); //Button to train data set
	runButton.position(530,630); 
	runButton.mouseClicked(calculateDistance); 
}

var X=[]  // Input Vector
var Y=[] //  Output Vector

let meanColorIndex=[]; //mean colour index
let meanX=[],meanY=[]; //mean x,y cordinates
let meanRed=[],meanGreen=[],meanBlue=[]; //store the colour of mean value of each cluster
let clusterId=[];  // it signifies the identity of each cluster
let runButtonStatus=false;
let randomPointButtonStatus=false;
let numberOfCluster=0;
function draw()
{
	background(180,255,255);
	let val=radio.value();
	if(val=="Throw random points for cluster")
	  randomPointButtonStatus=true;
    else 
	  randomPointButtonStatus=false;
    strokeWeight(4);
	textSize(50);
	fill("white");
	text("K-Means Clustering",410,110);

	line(150,150,150,550);   // Y-axis line
	line(150,550,600,550); // X-axis line
	textSize(25);
	fill('white');
	text("X-axis",610,555);
	text("Y-axis",130,145);	

    strokeWeight(1);    
	for(let i=0;i<X.length;i++)
	{
		if(runButtonStatus)
		{		
			frameRate(2);
			fill("white");
			circle(X[i],Y[i],10);			
			fill(meanRed[meanColorIndex[i]],meanGreen[meanColorIndex[i]],meanBlue[meanColorIndex[i]]);
			circle(X[i],Y[i],10);
		}
		else 
		{
			fill(meanRed[meanColorIndex[i]],meanGreen[meanColorIndex[i]],meanBlue[meanColorIndex[i]]);
			circle(X[i],Y[i],10);
		}
    }

	for(let i=0;i<meanX.length;i++)
	{
		stroke(meanRed[i],meanGreen[i],meanBlue[i]);
		strokeWeight(4);
		line(meanX[i]-10,meanY[i]-10,meanX[i]+10,meanY[i]+10);
		line(meanX[i]+10,meanY[i]-10,meanX[i]-10,meanY[i]+10);	
	}
	
	strokeWeight(2);
	for(let i=0;i<X.length;i++)
	{
		for(let j=0;j<meanX.length;j++)
		{
			if(clusterId.length>0 && clusterId[i]==j )
			{
		    stroke(meanRed[j],meanGreen[j],meanBlue[j]); 	
			line(X[i],Y[i],meanX[j],meanY[j]); // draw distance line between points and associated cluster centroid
			frameRate(1);
			}
		}
	}
	
	stroke(0,0,0);
	strokeWeight(1);	

	if(runButtonStatus && numberOfCluster!=0) //check the status of Run Algorithm Button
	{
		calculateMean();
		calculateDistance();
	}
}

function calculateDistance()  // This function will calculate the minimum distance between data points and centroid(mean of cluster)
{
	if(numberOfCluster==0)
		 return;
	clusterId=[];meanColorIndex=[];
	runButtonStatus=true;
	for(let i=0;i<X.length;i++)
	{
		let min=1000,index;
		for(let j=0;j<meanX.length;j++)
		{
			let perpendicular=abs(Y[i]-meanY[j]);
			let base=abs(X[i]-meanX[j]);
			base*=base;
			perpendicular*=perpendicular;
			let distance=int(sqrt(base+perpendicular));
			if(min>distance)
			   {
				min=distance;
				index=j;
				}
		}
		clusterId.push(index);
		meanColorIndex.push(index);
	}
}

function calculateMean()
{
	for(let i=0;i<meanX.length;i++)
	{
		let sumX=0,sumY=0,total=0;
		for(let j=0;j<clusterId.length;j++)
		{
			if(clusterId[j]==i)
			{
				sumX+=X[j]; // Calculate the next mean(centroid) for each cluster after including the data points
				sumY+=Y[j];
				total++;
			}
		}
		if(sumX==0)
		   continue;
		meanX[i]=int(sumX/total);
		meanY[i]=int(sumY/total);
	}	
}

function mouseReleased()  // Append location of input data points 
{
	if(mouseX>=150 && mouseX<=600 && mouseY>=150 && mouseY<=550)
	{
		if(randomPointButtonStatus)
		{
			if(numberOfCluster==X.length)
			{
			 alert("Number of Clusters can't greater than NUMBER OF INPUT POINTS");
			 return;
			}
			meanX.push(mouseX);
			meanY.push(mouseY);
		    meanRed.push(int(random(1,255)));
		    meanGreen.push(int(random(1,255)));
		    meanBlue.push(int(random(1,255)));
		    numberOfCluster++;
		}
	    else 
		{		 
			X.push(mouseX);
			Y.push(mouseY);
		}
	}
}
