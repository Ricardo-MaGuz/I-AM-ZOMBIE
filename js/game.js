var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
//Clases
function Floor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image()
    this.img.src = "img/bg1.gif"
    this.img.onload = () => {this.draw()}
    this.move = () => {
        this.x = this.x-7
        if(this.x < -canvas.width) this.x = 0
    }
    this.draw = () => {
        this.move()
        ctx.drawImage(this.img, this.x,this.y, this.width,this.height)
        ctx.drawImage(this.img,this.x + canvas.width,this.y,this.width,this.height)
    }
} 

//Backgrounds

function Board(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = "img/sky.gif"


    this.img.onload = ()=>{
        this.draw()
    }

    this.move = () => {
        this.x = this.x-3
        if(this.x < -canvas.width) this.x = 0
    }

    this.draw = () => {
        this.move()
        ctx.drawImage(this.img, this.x,this.y, this.width,this.height)
        ctx.drawImage(this.img,this.x + canvas.width,this.y,this.width,this.height)
    }
} 

function Buildings(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = "img/buildings.gif"
    this.img.onload = ()=> {this.draw()}

    this.move = ()=>{
        this.x = this.x -4
        if(this.x < -canvas.width) this.x = 0
    }
    this.draw = () =>{
        this.move()
        ctx.drawImage(this.img, this.x,this.y, this.width,this.height)
        ctx.drawImage(this.img,this.x + canvas.width,this.y,this.width,this.height)
    }
} 


function Zombie(){
    this.x = 0
    this.y = 0
    this.z = 170
    this.w = 200
    this.width = 171
    this.height = 200
    
    this.animate = () => { if(this.z < 270){    this.z += 3}
        
        ctx.drawImage(this.img,
            this.width*this.x,
            0,
            this.width,
            this.height,
            this.w,
            this.z,
            this.width,
            this.height);

        if (frames % 5 === 0){
        this.x++
        }
        else if(this.x>5){
          this.x=0
        }
    }
    this.img = document.createElement("img")
    this.img.src = "img/zombie1Run.gif"
    this.zombieJump = () =>{ zombie.z -= 2100 }
 }

 function Jump(){
    this.x = 171
    this.y = 200
    this.width = 171
    this.height = 200
    this.img = new Image()
    this.img.src = "img/jump.png"

    this.draw = function(){
        this.y = this.y + 4
        ctx.drawImage(this.img, this.x,this.y, this.width,this.height)
        if (this.y === 272){
            zombie.z = 270
            this.y = 100
        }
    }
} 

//It's a Trap
function Trap(){
    this.x = canvas.width
    this.y = 430
    this.width = 100
    this.height = 120
    this.img = new Image()
    this.img.src = "img/trap.gif"

    this.img.onload = () => {
        this.draw()
    }

    this.draw = () => {
        this.x = this.x - 7
        ctx.drawImage(this.img, this.x,this.y, this.width,this.height)
    }
    //Collition
    this.isTouching = function(zombie){
        return ((this.x - 100) < (zombie.w / 2) + (zombie.width / 2)) &&
               ((this.x - 100) + (this.width / 2) > (zombie.w / 2)) &&
               (this.y < zombie.z + zombie.height) &&
               (this.y + this.height > zombie.z)
    }

} 
//Variables 
var board = new Board()
var buildings = new Buildings()
var floor = new Floor()
var zombie = new Zombie()
var jump = new Jump()
var traps = []
var interval
var frames = 0

//Aux 
function gameOver(){

    stop();
    document.getElementById("game-over-audio").play()
    clearInterval(interval)
    gameOverScreen.style.display = "block"
    addEventListener('keydown', function(e){
        if(e.keyCode === 13){
            location.reload();
        }
    })
}

function trapMaker (){
    var x = [150,200, 300, 350];
    var rand = x[Math.floor(Math.random() * x.length)]
    if(!(frames % rand === 0)) return
    var trap = new Trap ()
    traps.push(trap)
}

function deleteEnemies(){
    if(traps.length === 5){
        traps.splice(0,1)
    }
}

function drawEnemies(){
    traps.forEach(function(trap){
        trap.draw()
    })
}

function checkCollition(){
    traps.forEach(function(trap){
     if(trap.isTouching(zombie)){
        gameOver()
        }   
        
    })
}

//Main Flow

function update(){
    trapMaker()
    deleteEnemies()
    frames++
    ctx.clearRect(0,0,canvas.width, canvas.height)
    board.draw()
    buildings.draw()
    floor.draw()
    drawEnemies()

    if (zombie.z != 270){
        
        jump.draw()
        
    }else {
        zombie.animate()
        zombie.z = 270;
    }

    checkCollition()
}

function start(){
    if(interval > 0) return;
    interval = setInterval(function(){
        update()
    }, 1000/60)
    frames = 0
}

function stop(){
    clearInterval(interval)
    interval = 0
    frames = frames
}


//Event Listeners 
addEventListener('keydown', function(e){
    if(e.keyCode === 32){
        e.stopPropagation();
        e.preventDefault();
        zombie.zombieJump()
        document.getElementById("jump-audio").play()
    }
})
