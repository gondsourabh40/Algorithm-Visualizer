//Implementation of Queue using Array
class Queue
{
    constructor()
    {
        this.arr = [];
    }
    isEmpty()   
    {
        return this.arr.length==0;
    }

    enqueue(element)
    {
        this.arr.push(element);
    }
    dequeue()
    {
        if(!this.isEmpty())
        return this.arr.shift();
    }
    front()
    {
        if(!this.isEmpty())
        return this.arr[0];
    }
}
