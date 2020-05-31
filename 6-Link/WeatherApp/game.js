document.addEventListener('DOMContentLoaded', () => {

    const takenMax = 10;
    const gridMax = 200;
    let timer;
    const miniGridMax = 16;
    for (let index = 0; index < gridMax; index++){
        var div = document.createElement("div");
        //if the index of classname increase we go to next layer.
        document.getElementsByClassName("grid")[0].appendChild(div);
        
    }

    for(let index = 0;index < miniGridMax; index++){
        var div = document.createElement("div");
        document.getElementsByClassName("miniGrid")[0].appendChild(div);
    }
    
    for (let index = 0; index < takenMax; index++){
        //var div = document.createElement("div");
        var takenDiv = document.createElement("div");
        takenDiv.className = "taken";
        //if the index of classname increase we go to next layer.
        //document.getElementsByClassName("taken").
       document.getElementsByClassName("grid")[0].appendChild(takenDiv);
    }
var gameOver = false;
let nextRandom = 0;
const height = 10;
const grid = document.querySelector('.grid');
let squares = Array.from(document.querySelectorAll('.grid div'));
let nextSquares = document.querySelectorAll('.miniGrid div')
const startBtn = document.querySelector('#start-button');
const scoreDisplay = document.querySelector('#score');
const firstRow = [0,1,2,3,4,5,6,7,8,9];

//The Tetrominoes
const lTetro = [
    [1, height+1, height*2+1, 2],
    [height, height+1, height+2, height*2+2],
    [1, height+1, height*2+1, height*2],
    [height, height*2, height*2+1, height*2+2]
  ];

  const zTetro = [
    [0,height,height+1,height*2+1],
    [height+1, height+2,height*2,height*2+1],
    [0,height,height+1,height*2+1],
    [height+1, height+2,height*2,height*2+1]
  ];

  const tTetro = [
    [1,height,height+1,height+2],
    [1,height+1,height+2,height*2+1],
    [height,height+1,height+2,height*2+1],
    [1,height,height+1,height*2+1]
  ];

  const oTetro = [
    [0,1,height,height+1],
    [0,1,height,height+1],
    [0,1,height,height+1],
    [0,1,height,height+1]
  ];

  const iTetro = [
    [1,height+1,height*2+1,height*3+1],
    [height,height+1,height+2,height+3],
    [1,height+1,height*2+1,height*3+1],
    [height,height+1,height+2,height+3]
  ];

const tetro = [lTetro, zTetro,oTetro,iTetro,tTetro];

var currentPosition = 4;
var currentRotation = 0;

//ranodow tetro generation 

let random = Math.floor(Math.random()*tetro.length);
var current = tetro[random][currentRotation];
var nextCurrent = tetro[nextRandom][currentRotation];
var isRightEdge = false;
var isLeftEdge = false;


function showNext (){

//var next = document.createElement(nextCurrent);s
        //random = Math.floor(Math.random()*tetro.length);

    //var nextCurrent = tetro[nextRandom][currentRotation];
    //var hasClass = (nextSquares.item().classList.contains('tetro'));
    //if ((nextSquares ){

    for (let element of nextCurrent){

        nextCurrent = tetro[nextRandom][currentRotation];
        //console.log(index);

        if (element >= 3*height) {
            element = element -(6*3);
            //console.log(index);

             
        }else if (element >= 2*height){
            element = element -(6*2);
            //console.log(index);
        }
        else if(element >= height){
            element = element -6;
            //console.log(index);
        }
        //console.log(element);

       //if (nextSquares[element].classList.length > 0){
        //console.log('remove'+element);
        nextSquares[element].classList.remove('tetro');
        //console.log('index');
        //}
    }
    //}
    for (let index of nextCurrent){
        //console.log(index);
        //console.log(nextCurrent);
        //console.log(nextSquares[1]);
        if (index >= 3*height) {
            index = index -(6*3);
            //console.log(index);

             
        }else if (index >= 2*height){
            index = index -(6*2);
        }
        else if(index >= height){
            index = index -6;
        }
        //console.log('add' +index);
        nextSquares[index].classList.add('tetro');
    }

//document.getElementsByClassName("miniGrid")[0].appendChild(next);

}

// showNext();


function draw(){

    for (let index of current){
        
        squares[currentPosition+index].classList.add('tetro');
        //if ((firstRow.includes(current[index]) && (squares[currentPosition+index].classList.contains('taken')))){
          //  gameOver = true;
            //timer = setInterval(, 0);
        //}
    }
    //showNext();
}  

function undraw(){
    for (let index of current){
        //console.log(index);
        squares[currentPosition+index].classList.remove('tetro');
    }
}
//tetro move down and speed
//timer = setInterval(moveDown, 200);

//assign key function
function control(event){
    if(event.keyCode ===37){
        moveLeft();
    } else if (event.keyCode === 38){
        moveRotation();
    } else if (event.keyCode === 39){
        moveRight();
    } else if (event.keyCode === 40){
        moveDown();
    }
}
document.addEventListener('keyup',control);


function moveDown(){
    //console.log("here");
    undraw();

    // if (gameOver){console.log("Lost");}
    // else{
    currentPosition +=height;
    draw();
    freeze();
}


function moveRight(){
    undraw();
    isRightEdge = false;
    for (let index of current){
        if ((currentPosition+index) % height === 9){
            return(isRightEdge = true);
        }if (squares[currentPosition+index+1].classList.contains('taken')){
            return(isRightEdge = true);
        }
    }

    if(isRightEdge == false){
        currentPosition = currentPosition+1;
    }

    
    draw();
}


function freeze(){
    for (let index of current){

        //console.log(currentPosition);

        if (squares[currentPosition+index+height].classList.contains('taken')){

            //nextSquares[]
            
            for (let index of current){
            
            squares[currentPosition+index].classList.add('taken');
            
            //if (firstRow.includes(current[index])){
                //console.log("You Lost");
            }
            //else {
            //console.log(random);
            
            random = nextRandom;
            //console.log(random);
            
            nextRandom = Math.floor(Math.random()*tetro.length);
            //nextCurrent = tetro[nextRandom][currentRotation];
            current = tetro[random][currentRotation];
            currentPosition = 4
            showNext();
            draw();
           ////////////////// }
        }
    }  
}


function moveRotation(){

    undraw();
    currentRotation++;
    
    if (currentRotation === current.length){
        currentRotation = 0;
    }

    //nextRotation = currentRotation;
    let nextCurrentRotation = tetro[random][currentRotation];
    
    for (let index of nextCurrentRotation){
        console.log(isLeftEdge);
        //console.log("yooo");
        //console.log(currentPosition+index);
        if (((currentPosition+index)%height=== 0) && (isRightEdge == true)){
            console.log("Right");
            if (currentRotation===0) {currentRotation = 3;}
            else {currentRotation--;}
            break;
            //return current = tetro[random][currentRotation];
             //return currentPosition--;
            
            //current = tetro[random][currentRotation];
        }else if (((currentPosition+index)% height===9) && (isLeftEdge == true)){

            console.log("Left");
            
            if (currentRotation===0) {currentRotation = 3;}
            else {currentRotation--;}
            break;
            //return current = tetro[random][currentRotation];
            //return currentPosition--;
            
        }

    }
    //currentRotation++;
    current = tetro[random][currentRotation];
    //console.log(current);
    draw();

}

//move left 
function moveLeft(){
    //console.log('hi');
    undraw();
    
    isLeftEdge = false;
    for (let index of current){
        //console.log(current[index]);
        if ((currentPosition+index) % height === 0){
            return(isLeftEdge = true); 
             //isLeftEdge[current[index]] = true;      
        }
        //else{isLeftEdge = false};
        //     console.log(isLeftEdge);}

        if (squares[currentPosition+index-1].classList.contains('taken')){
            //console.log("taken");
            //console.log(currentPosition);
            return(isLeftEdge = true); 
            //currentPosition +=1;
            //console.log(currentPosition);
        }
        
    }
    //if (isNear == true){currentPosition +=1;}
    //if (isNear == true) {currentPosition +=1;}
    if (isLeftEdge == false) {currentPosition -=1;}
    //console.log(isLeftEdge);
    draw();
  
}

startBtn.addEventListener('click', () => {
    if  (timer) {
        clearInterval(timer);
        timer = null;
    } else{
        draw()
        timer = setInterval(moveDown,300);
        showNext();
    }
})


})
