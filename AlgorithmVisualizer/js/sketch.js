numbers=[];

let  columnWidth, sorter, t0,hd;

function getUrlVars()
{
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
}

function myFunction(algo)
 {
	 
	numbers=[];
	setup(algo);
  }
var delaytime=600;
function barGraph(values,size,diff)//Showing bar graph
{
	
    sum=0
    space=-size*(values.length/2)+windowWidth/2;
    var l = values.length;
    for(var i=0;i<values.length;i++)
    sum+=values[i];
	for(var i = 0; i<values.length; i++)
	{
		fill(0,200,239);
		rect(i*size+space,350-values[i],diff,values[i]);
		fill(0);
		text(values[i],i*size+space, 350+diff);
	}
}
function editBar(values,size,diff,i,col)
{
	fill(col);
	space=-size*(values.length/2)+windowWidth/2;
	rect(i*size+space,350-values[i],diff,values[i]);
}
//let  columnWidth, sorter, t0;

function setup(algo='bubbleSort') {
	
	algo=getUrlVars()['algo'];
    cnv=createCanvas(windowWidth, 400);
    cnv.position(10,windowHeight/5);
	
	if(numbers.length==0)
	{
		numbers = Array(25).fill().map(() => random(0,200));
	}
	
	
	for(let i=0;i<numbers.length;i++)
	numbers[i]=floor(numbers[i]);
	columnWidth = width / numbers.length;
	if(algo=='bubbleSort')
	{
		hd='Bubble Sort';
		sorter = bubbleSort(numbers);
	}
	else if(algo=='selectionSort')
	{
		hd='Selection Sort';
		sorter = selectionSort(numbers);
	}
	else if(algo=='insertionSort')
	{
		hd='Insertion Sort';
		sorter = insertionSort(numbers);
	}
	else
	{
		hd='Merge Sort';
		sorter = mergeSort(numbers);
	}
	t0 = performance.now();
    
	fill(255);
    noStroke();
    setTimeout(function(){sorthelper(numbers)},delaytime);
}
function editBarRange(l,r,numbers,col)
{
	background(180,255,255);
	setHeading();
	fill(0);
	text("delaytime = "+delaytime,10,10);
	barGraph(numbers,40,20);
	for(let i=l;i<=r;i++)
	{
		editBar(numbers,40,20,i,col);
	}

}

function setHeading()
{
	let c = color(255, 0, 0);
	fill(c);
	textSize(50);
	textStyle(BOLDITALIC);
	text(hd,410,90);
	textSize(14);
	textStyle(ITALIC);
	
}

function sorthelper(numbers) {

	
	background(180,255,255);
	fill(0);
	text("delaytime = "+delaytime,10,10);
    barGraph(numbers,40,20);
	if (sorter.next().done)
		{
		let time = round(performance.now() - t0) / 1000;
		editBarRange(0,numbers.length-1,numbers,color(255,165,0));
		print("Done!");
		print(`Sorted ${numbers.length} elements in approximately ${time} seconds.`);
		return;
    }
    setTimeout(function(){sorthelper(numbers)},delaytime);
}

function* bubbleSort(numbers) {
	for (let i = numbers.length - 1; i > 0; i--) {
		for (let j = 0; j < i; j++) {
			editBarRange(i+1,numbers.length-1,numbers,color(255,165,0));
			editBar(numbers,40,20,j,color(0,255,0));
			editBar(numbers,40,20,j+1,color(0,255,0));
			
			if (numbers[j] > numbers[j + 1]) {
				// swap
				let t = numbers[j];
				numbers[j] = numbers[j + 1];
				numbers[j + 1] = t;
			}
			yield;
		}
	}
}
function* selectionSort(numbers) {
	for (let i = 0; i < numbers.length-1; i++) {
		
		for (let j = i+1; j < numbers.length; j++) {
			editBarRange(0,i,numbers,color(255,165,0));
			editBar(numbers,40,20,i,color(0,255,0));
			editBar(numbers,40,20,j,color(0,255,0));
			if (numbers[i] > numbers[j ]) {
				// swap
				let t = numbers[i];
				numbers[i] = numbers[j];
				numbers[j] = t;
			}
			yield;
		}
		
	}
}
function* insertionSort(numbers){
	for(let i=1;i<numbers.length;i++)
	{
		let x = numbers[i];
		let j=i;
		for( ;j>0;j--)
		{
			editBarRange(0,i,numbers,color(255,165,0));
			editBar(numbers,40,20,j,color(0,255,0));
			if(numbers[j-1]>x)
			{
				numbers[j]=numbers[j-1];
				numbers[j-1]=x;
			}
			else
			break;
			yield;
		}
		numbers[j]=x;
	}
	
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
function* mergeSort(numbers)
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
			editBarRange(left_start,right_end,numbers,color(255,165,0));
			editBar(numbers,40,20,left_start,color(0,255,0));
			editBar(numbers,40,20,right_end,color(0,255,0));
			yield;
		} 
	} 
}

