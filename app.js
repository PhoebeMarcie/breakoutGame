const grid = document.querySelector('.grid');
const blockWidth = 100
const blockHeight = 20
// create Block
class Block{
    constructor(xAxis, yAxis){
        this.bottomLeft = [xAxis, yAxis];
        this.bottomRight = [xAxis + blockWidth, yAxis]
        this.topLeft = [xAxis, yAxis + blockHeight]
        this.topRight = [xAxis +blockWidth, yAxis + blockHeight]
    }
   
}
 //create many blocks
const blocks = 

// create blue blocks within the grid
// 1. create variable called block
// 2.create class block in html document
function addBlock() {
    const block = document.createElement('div')

    block.classList.add('block') 
    block.style.left = '50px';
    block.style.bottom = '50px';
    grid.appendChild(block)
}


addBlock();