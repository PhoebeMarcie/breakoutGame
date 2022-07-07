const grid = document.querySelector('.grid');
const blockWidth = 100
const blockHeight = 20
const boardWidth = 560
const boardHeight = 300
const ballDiameter = 20
const scoreDisplay = document.querySelector('.score')
let xDirection =-2
let yDirection = 2
let score = 0
const userStart = [230, 10]
const ballStart = [270, 30]
let ballCurrentPosition = ballStart
let timerId 
let currentPosition =  userStart;
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
const blocks = [
    new Block(10,270),
    new Block(120,270),
    new Block(230,270),
    new Block(340,270),
    new Block(450,270),
    new Block(0,240),
    new Block(110,240),
    new Block(220,240),
    new Block(330,240),
    new Block(440,240),
    new Block(20,210),
    new Block(130,210),
    new Block(240,210),
    new Block(350,210),
    new Block(460,210),
]

// create blue blocks within the grid
// 1. create variable called block
// 2.create class block in html document
function addBlocks() {
    for(let i = 0; i<blocks.length; i++){
         const block = document.createElement('div');
         block.classList.add('block');
         block.style.left = blocks[i].bottomLeft[0] +'px'
         block.style.bottom = blocks[i].bottomLeft[1] + 'px';
         grid.appendChild(block);
    }
    // const block = document.createElement('div')

    // block.classList.add('block') 
    // block.style.left = '50px';
    // block.style.bottom = '50px';
    // grid.appendChild(block)
}


addBlocks();

// add user
const user = document.createElement('div')
user.classList.add('user')
drawUser()
grid.appendChild(user)
// draw user
function drawUser(){
user.style.left = currentPosition[0] + 'px';
user.style.bottom =currentPosition[1] + 'px';  

}

// move user
function moveUser(e){
    switch(e.key){
        case 'ArrowLeft':
            if(currentPosition[0] > 0){
            currentPosition[0] -= 10
           drawUser()
         
        }
        break;

        case 'ArrowRight':
            if(currentPosition[0] < boardWidth - blockWidth) {
                currentPosition[0] += 10
                drawUser()
                
            }
            break;

    }
}


document.addEventListener('keydown', moveUser)

// add ball

const ball = document.createElement('div')
ball.classList.add('ball')
drawball()
grid.appendChild(ball)

// draw ball
 function drawball(){
     ball.style.left = ballCurrentPosition[0] + 'px';
     ball.style.bottom = ballCurrentPosition[1] + 'px';
 }

//  bounce ball

function moveBall() {
    ballCurrentPosition[0] += xDirection
    ballCurrentPosition[1] += yDirection
    drawball()
    checkForCollisions()
}

timerId = setInterval(moveBall, 30)

// check for collisions

function checkForCollisions(){
// block colllisions
    for(let i =0; i<blocks.length; i++){
        if (
            (ballCurrentPosition[0] > blocks[i].bottomLeft[0] && ballCurrentPosition[0] < blocks[i].bottomRight[0])
            && ((ballCurrentPosition[1] + ballDiameter) > blocks[i].bottomLeft[1] && ballCurrentPosition[1] < blocks[i].topLeft[1] )
        ){
            const allBlocks = Array.from(document.querySelectorAll('.block'))
           allBlocks[i].classList.remove('block')
           blocks.splice(i, 1)
           changeDirection()
           score++
           scoreDisplay.innerHTML = score

        //    check for win
        if(blocks.length === 0){
            scoreDisplay.innerHTML = 'Ýou Win'
            clearInterval(timerId)
            document.removeEventListener('keydown',moveUser)
        }
        }
    }
    // wall collisions

    if (ballCurrentPosition[0] >= (boardWidth - ballDiameter) || 
        ballCurrentPosition[1] >= (boardHeight - ballDiameter)||
        ballCurrentPosition[0]<=0
        ){
        changeDirection()
    }
// check for game over
    if(ballCurrentPosition[1]<=0){
        clearInterval(timerId)
        scoreDisplay.innerHTML = 'Game Over'
        document.removeEventListener('keydown',moveUser)
    }

    // check for user collisions
    if((ballCurrentPosition[0] > currentPosition[0] && ballCurrentPosition[0] < currentPosition[0] + blockWidth ) 
        && (ballCurrentPosition[1] > currentPosition[1] && ballCurrentPosition[1] < currentPosition[1] + blockHeight)
    ){
        changeDirection()
    }

    

   
    // if (ballCurrentPosition[0] >= (boardHeight - ballDiameter)){
    //     changeDirection()
    // }
}

// change direction
function changeDirection() {
    if(xDirection === 2 && yDirection === 2){
        yDirection = -2
        return
    }

    if(xDirection === 2 && yDirection == -2 ){
        xDirection = -2
        return
    }
    if(xDirection == -2 && yDirection == -2 ){
        yDirection = 2
        return
    }
    if(xDirection == -2 && yDirection == 2 ){
        xDirection = 2
        return
    }

}
