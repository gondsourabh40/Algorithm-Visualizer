var numbers = []
var itr=0;
var x=110;
var y=200;
var d=40;
var delaytime=800;
var space= 50;
let search,algo='none',hd,Find;

function getUrlVars()
{
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function myFunction(toFind)
 {
	 var ele=parseInt(toFind,10);
	 
	 setup(ele);
 }

function setup(toFind) 
{
	 if(numbers.length==0)
	 {
		numbers = Array(20).fill().map(() => Math.floor(random(0,200)));
		toFind=numbers[12];
	 }

	Find=toFind;
	numbers=mergeSort(numbers);
	algo=getUrlVars()['algo'];
	createCanvas(windowWidth, 400);
	background(180,255,255);

	if(algo=='binarySearch')
	{
		hd='Binary Search';
		search=binarySearch(numbers,toFind);
		setTimeout(function(){searchHelper(numbers)},delaytime);
	}
	else
	{
		hd='Linear Search';
		search=linearSearch(numbers,toFind);
		setTimeout(function(){searchHelper(numbers)},delaytime);
	}

}


function editCircleRange(l,r,numbers,col)
{
	clear();
	setHeading();
	setLabels(550,300,"We are Find the Element = "+Find,color(255, 0, 0));
	createCircle(numbers);
	for(let i=l;i<r;i++)
	{
		editCircle(numbers,i,col);
	}

}

function editCircle(numbers,id,col)
{	

	fill(col);
	circle(x+id*space, y, d);
	fill(255);
	textAlign(CENTER);
	text(numbers[id],x+id*space, y);
}

function searchHelper(numbers)
{
    
    createCircle(numbers);
	if (search.next().done)
	{
		return;
    }
    setTimeout(function(){searchHelper(numbers)},delaytime);
}


function createCircle(numbers)
{
	
	for(var i=0;i<numbers.length; i++)
	{
		fill(144, 148, 151);
		circle(x+i*space, y, d);
		fill(255);
		textAlign(CENTER);
		text(numbers[i],x+i*space, y);
		
	}
	
	
}

function setLabels(posX,posY,txt,col)
{
	fill(col);
	textStyle(BOLDITALIC);
	text(txt,posX, posY);
}



function setHeading()
{
	let c = color(255, 0, 0);
	fill(c);
	textSize(50);
	textStyle(BOLDITALIC);
	text(hd,410,110);
	textSize(14);
	textStyle(ITALIC);
	
}

function* binarySearch(sortedArray, elToFind)
 {
	var lowIndex = 0;
	var highIndex = sortedArray.length - 1;
	while (lowIndex <= highIndex)
	{
		var midIndex = Math.floor((lowIndex + highIndex) / 2);
		
		if (sortedArray[midIndex] == elToFind)
		{
			editCircleRange(lowIndex,highIndex,numbers,color(144, 148, 151));
			setLabels((x-5+midIndex*(space)), y-25,'Target',color(0,0,0));
			editCircle(numbers,midIndex,color(249, 181, 14));
			return midIndex;
		}
		else if (sortedArray[midIndex] < elToFind)
		{
			editCircleRange(lowIndex,highIndex,numbers,color(144, 148, 151));
			setLabels((x-5+lowIndex*(space)), y-25,'low',color(0,0,0));

			editCircle(numbers,lowIndex,color(0,255,0));
			setLabels((x-5+midIndex*(space)), y-25,'mid',color(0,0,0));

			editCircle(numbers,midIndex,color(0,255,0));
			setLabels((x-5+highIndex*(space)), y-25,'high',color(0,0,0));

			editCircle(numbers,highIndex,color(0,255,0));
			lowIndex = midIndex + 1;
			
		
		} 
		else 
		{
			editCircleRange(lowIndex,highIndex,numbers,color(144, 148, 151));
			setLabels((x-5+lowIndex*(space)), y-25,'low',color(0,0,0));
			
			editCircle(numbers,lowIndex,color(0,255,0));
			setLabels((x-5+midIndex*(space)), y-25,'mid',color(0,0,0));
			
			editCircle(numbers,midIndex,color(0,255,0));
			setLabels((x-5+highIndex*(space)), y-25,'high',color(0,0,0));
			
			editCircle(numbers,highIndex,color(0,255,0));
			highIndex = midIndex - 1;
			
		}
		yield;
	} 
	clear();
	setHeading();
	createCircle(numbers);
	setLabels(550,300,Find+' is Not Found',color(255, 0, 0));
	return -1;
}


function* linearSearch(sortedArray, elToFind)
{
	let r=sortedArray.length;
	for(let i = 0; i < r; i++)
	{
		editCircleRange(i,r,numbers,color(144, 148, 151));
		editCircle(numbers,i,color(0,255,0));
		if(sortedArray[i] === elToFind)
		{
			setLabels((x-5+i*(space)), y-25,'Target',color(0,0,0));
			editCircle(numbers,i,color(249, 181, 14));
			return i;
		}
		yield;
	}
	clear();
	setHeading();
	createCircle(numbers);
	setLabels(550,300,Find+' is Not Found',color(255, 0, 0));
	return -1;
}





function merge(arr,l,m,r)
{
	var i,j,k;
	n1 = m-l+1;
	n2 = r-m;
	L = Array(n1);
	R = Array(n2);
	for(i=0;i<n1;i++)
	L[i]=arr[l+i];
	for(j=0;j<n2;j++)
	R[j]=arr[m+1+j];
	i=0;
	j=0;
	k=l;
	
	while (i < n1 && j < n2) 
	{ 
        if (L[i] <= R[j]) 
        { 
            arr[k] = L[i]; 
            i++; 
        } 
        else
        { 
            arr[k] = R[j]; 
            j++; 
        } 
        k++; 
    } 
  

    while (i < n1) 
    { 
        arr[k] = L[i]; 
        i++; 
        k++; 
    } 
  

    while (j < n2) 
    { 
        arr[k] = R[j]; 
        j++; 
        k++; 
    } 
}
function mergeSort(numbers)
{
	var curr_size;
	var left_start; 
	n = numbers.length;
	for (curr_size=1; curr_size<=n-1; curr_size = 2*curr_size) 
	{ 
		for (left_start=0; left_start<n-1; left_start += 2*curr_size) 
		{ 
			var mid = min(left_start + curr_size - 1, n-1); 
			var right_end = min(left_start + 2*curr_size - 1, n-1); 
			merge(numbers,left_start,mid,right_end);
		} 
	}
return numbers;	
}