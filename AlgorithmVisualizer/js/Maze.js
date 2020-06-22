class Maze
{
    /*
    Class Data Members
        size: size of grid
        grid: It is a 2d matrix which represent NXN unit Grid, In which every element belongs to either 0 or 1 where ,
        0 represent empty cell and 1 represent obstacles
    */
    constructor(size)  //Constructor to initialize Maze Object
    {
        this.size=size;
        
        this.grid = Array(this.size);
        for(var i = 0;i < this.size;i++)
        {
            this.grid[i]=Array(this.size).fill(0);
        }
    }
    getsize()
    {
        return [this.size,this.size];
    }
    isValid(row,col)  //method to check that given (row, col) is valid cell position in grid or not.
    {
        if(row>=0&&col>=0&&row<this.size&&col<this.size)
        return true;

        return false;
    }

    isObstacles(row,col)  //method to check that given (row, col) is obstacles or empty cell.
    {
        if(this.isValid(row,col))
        return this.grid[row][col]==1;
        return false;
    }

    setObstacles(obstacles) //method to set obstacles in grid ,it takes array of obstacles position as arguments
    {
       for(var i=0;i<obstacles.length;i++)
       {
           if(this.isValid(obstacles[i][0],obstacles[i][1]))
           this.grid[obstacles[i][0]][obstacles[i][1]]=1;
       } 
    }

    /*
    Method to find shortest path between given source (src) to destination(dest) and it is based on 
    Breadth first Search algorithm and its time complexity is O(size*size).
    */
    *shortestPath(src,dest) 
    {
        //condition to check that input source or destination are invalid
        if(!this.isValid(src[0],src[1])||!this.isValid(dest[0],dest[1]))
        return [];

        //condition to check that input source or destination are obstacles
        if(this.isObstacles(src[0],src[1])||this.isObstacles(dest[0],dest[1]))
        return [];

        var parent = new Array(this.size);  //parent variable is used to store last parent cell which has been used to reach to the current cell
        var visited = new Array(this.size);  //boolean visited variable is used to check that the current cell (row,col) have already visited or not.
        var q = new Queue();  //Queue for bfs
        var dir = [[1,0],[-1,0],[0,1],[0,-1],[-1,-1],[-1,1],[1,-1],[1,1]]  //All Possible direction to move.

        for(var i=0;i<this.size;i++)
        {
            visited[i]=new Array(this.size).fill(false);
            parent[i]=new Array(this.size).fill([-1,-1]);
        }
        
        q.enqueue(src);
        parent[src[0]][src[1]]=src
        while(!q.isEmpty())  //Loop to iterate each cell , level by level using Queue data structure
        {
            var cur = q.front();
            q.dequeue();
            var row = cur[0];
            var col = cur[1];
            
            for(var k=0;k<dir.length;k++)  //Loop to iterate over all direction using 'dir' variable
            {
                var drow = dir[k][0]; // addition or difference in row
                var dcol = dir[k][1]; // addition or difference in column

                //condition to check and skip visited cell, cell with obstacle and unvalid cell.
                if( (!this.isValid(drow+row,dcol+col)) || visited[drow+row][dcol+col]==true || (this.isObstacles(drow+row,dcol+col)) )
                {
                    continue;
                }

                parent[drow+row][dcol+col]=[row,col]; // storing parent cell 
                visited[drow+row][dcol+col]=true; //assigning true, just to ensure that not to visited this cell again
                if(visited[dest[0]][dest[1]]==true)
                    break;
                yield [drow+row,dcol+col];
                q.enqueue([drow+row,dcol+col]);  //enqueuing new unvisited cell
            }
            if(visited[dest[0]][dest[1]]==true)
                break;
        }
        
        if(visited[dest[0]][dest[1]]==false) //condition to check that destination is reachable from source or not
        return [];
        
        var ans = [];  // variable to store result i.e path from source(src) to destination(dest)
        var row = dest[0];
        var col = dest[1];
        
        //loop to store path by traversing parent variable from destination to source
        do{
            ans.push([row,col]);
            var x = parent[row][col][0];
            var y = parent[row][col][1];
            row=x;
            col=y;
        }while(row!=src[0] || col!=src[1]);
    
        ans.push(src);
        ans.reverse();  //reversing 'ans' array because it store path from destination to source.
    
        yield ans;
    }

    print()  // method to print grid cell's on console
    {
        for(var i=0;i<this.grid.length;i++)
        {
            console.log(...this.grid[i]);
        }
    }
}