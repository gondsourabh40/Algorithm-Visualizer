let runButton;
function setup() 
{
	createCanvas(windowWidth,windowHeight);
	line(150,150,150,550);   // Y-axis line
	line(150,550,600,550); // X-axis line
	runButton=createButton("Run Algorithm"); //Button to train data set
	runButton.position(750,550);
	runButton.mouseClicked(linearRegression); //Linear regression funtion will run on mouse click event	
}
var X=[]  // Input Vector
var Y=[] //  Output Vector

let fx1=[];  //Array to store best fit lines points
let fy1=[];
let fx2=[];
let fy2=[];

var storeX=[]; // store points for plot between axes
var storeY=[];
let loop=0; // store index value of (best fit line points) array

let slopeArray=[];  //Array to store slope or m
let interceptArray=[]  //Array to store intercept or c
function draw() //Infinite loop until user terminate
{ 
	background(180,255,255);
	strokeWeight(4);	
	textSize(30);
	fill("white");
	text("Linear Regression with Gradient Descent Optimization",410,110);
	//text("Linear Regression with Gradient Descent Optimization",200,50);
	line(150,150,150,550);   // Y-axis line
	line(150,550,600,550); // X-axis line
	textSize(25);
	fill('white');
	text("X-axis",610,555);
	text("Y-axis",130,145);	
	strokeWeight(1);
	for(let i=0;i<storeX.length;i++)
	{
		fill('red');
		circle(storeX[i],storeY[i],10);
	}
   	if(loop<fx1.length)
	{
		textSize(25);
		fill('whilte');
		strokeWeight(4);
		text("m = "+slopeArray[loop],700,200);
		text("c = "+interceptArray[loop],700,250);
		line(int(fx1[loop])+150,550-int(fy1[loop]),150+int(fx2[loop]),550-int(fy2[loop]));
		strokeWeight(1);
		loop++;
	}
   else if(loop!=0) 
   {
		textSize(25);
		fill('whilte');
		strokeWeight(4);
		text("m = "+slopeArray[loop-1],700,200);
		text("c = "+interceptArray[loop-1],700,250);
	   	line(int(fx1[loop-1])+150,550-int(fy1[loop-1]),150+int(fx2[loop-1]),550-int(fy2[loop-1]));
		strokeWeight(1);
   }
	stroke(0,0,0);
	strokeWeight(1);	

}

function linearRegression()  //Linear Regression Algorithm
{
loop=0;
let m=0; //slope of line
let c=0 // Intercept of line or bias
let learningRate=0.0000001 // Learning Rate
let iterations=500;  // Number of iteration of gradient descent
let predictValue=[];      // Vector of predict value or y_predict
fx1=[];  //Array to store best fit lines points
fy1=[];
fx2=[];
fy2=[];

	for(let outerLoop=0;outerLoop<iterations;outerLoop++)
	{
		predictValue=[];
		for(let index=0;index<X.length;index++)  
			predictValue.push(m*X[index]+c);  //Calculate predict value for each value of X[i]
		
		let slopeDerivative=0;  // derivative of m or slope
		for(let index=0;index<Y.length;index++)
			slopeDerivative+=(X[index]*(Y[index]-predictValue[index]));
		slopeDerivative=(-2*slopeDerivative)/(X.length);
		
		let interceptDerivative=0; // derivative of c or intercept or bias
		for(let index=0;index<Y.length;index++)
			interceptDerivative+=(Y[index]-predictValue[index]);
		interceptDerivative=(-2*interceptDerivative)/(X.length);
		
		m=m-(learningRate*slopeDerivative);
		c=c-(learningRate*interceptDerivative);	

		let x1,y1,x2,y2;  //Points of best fit line
		let min=1000; 
		for(let i=0;i<X.length;i++)
		{
		 if(X[i]<min)
		  min=X[i];	 
		}	
		x1=min;
		min=1000
		for(let i=0;i<predictValue.length;i++)
		{
		 if(predictValue[i]<min)
		  min=predictValue[i];	 
		}
		y1=min;
			
		let max=0;
		for(let i=0;i<X.length;i++)
		{
		 if(X[i]>max)
		  max=X[i];	 
		}	
		x2=max;
		max=0
		for(let i=0;i<predictValue.length;i++)
		{
		 if(predictValue[i]>max)
		  max=predictValue[i];	 
		}
		y2=max;		
	fx1.push(x1);   //store points in array to plot best fit line
	fx2.push(x2);
	fy1.push(y1);
	fy2.push(y2);
	
	slopeArray.push(m);
	interceptArray.push(c);
	}
}
function mouseReleased()  // Append location of input data points 
{
	if(mouseX>=150 && mouseX<=600 && mouseY>=150 && mouseY<=550)
	{
		storeX.push(mouseX);
		storeY.push(mouseY);
		X.push(int(mouseX-150));
		Y.push(int(550-mouseY));
	}
}

