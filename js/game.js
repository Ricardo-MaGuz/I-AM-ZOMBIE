

//Clases
var ctx = canvas.getContext('2d')
function Floor(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image()
    this.img.src = "img/bg1.gif"


    this.img.onload = function(){
        this.draw()
    }.bind(this)

    this.move = function(){
        this.x = this.x-7
        if(this.x < -canvas.width) this.x = 0
    }

    this.draw = function(){
        this.move();
        ctx.drawImage(this.img, this.x,this.y, this.width,this.height)
        ctx.drawImage(this.img,this.x + canvas.width,this.y,this.width,this.height)
    }
} 
function Board(){
    this.x = 0;
    this.y = 0;
    this.width = canvas.width;
    this.height = canvas.height;
    this.img = new Image();
    this.img.src = "img/0.gif"


    this.img.onload = function(){
        this.draw()
    }.bind(this)

    this.move = function(){
        this.x = this.x-3
        if(this.x < -canvas.width) this.x = 0
    }

    this.draw = function(){
        this.move()
        ctx.drawImage(this.img, this.x,this.y, this.x ,this.height)
        ctx.drawImage(this.img,4024,this.y,this.width,this.height)
    };
} 


function Buildings(){
    this.x = 0
    this.y = 0
    this.width = canvas.width
    this.height = canvas.height
    this.img = new Image()
    this.img.src = "img/buildings.gif"
    this.distance = 0
    this.recorded = Math.floor(frames / 60)

    this.img.onload = function(){
        this.draw()
    }.bind(this)

    this.move = function(){
        this.x = this.x -4
        if(this.x < -canvas.width) this.x = 0
    };

    this.draw = function(){
        this.move();
        ctx.drawImage(this.img, this.x,this.y, this.width,this.height)
        ctx.drawImage(this.img,this.x + canvas.width,this.y,this.width,this.height)
    };

} 


//Character

function Zombie(){
    this.x = 0
    this.y = 0
    this.z = 171
    this.w = 150
    this.width = 171
    this.height = 200
    
    this.animate = function(){

        if(this.z < 280){   
        this.z += 4
    }
        ctx.drawImage(this.img,this.width*this.x,this.height*this.y,this.width,this.height,this.w,this.z,this.width,this.height);
        
        if (frames % 4 === 0){
        this.x++
    }
        if(this.x>5){
          this.x=0
          this.y++
        }
        if(this.y>4){
          this.y=0
        }
    }
    this.img = document.createElement("img");
    this.img.src = "img/zombie1Run.gif";

    this.zombieJump = function(){
        if(zombie.z === 280){
        zombie.z -= 2000
        jump.colY = 100
    }else{
        zombie.z = zombie.z;
        }
    }

 }

 function Jump(){
    this.x = 171
    this.y = 200
    this.colX = 150
    this.colY = 280
    this.width = 171
    this.height = 200
    this.img = new Image();
    this.img.src = "img/jump.gif"

    this.img.onload = function(){
        this.draw()
    }.bind(this)

    this.draw = function(){
        this.y = this.y + 4
        this.colY = this.colY + 4
        ctx.drawImage(this.img, this.x,this.y, this.width,this.height)
        if (this.y === 272){
            zombie.z = 280
            this.y = 100
            this.colY = 280
        }
    }
} 

// Obstacles

function Trap(){
    this.x = canvas.width
    this.y = 450
    this.width = 75
    this.height = 100
    this.img = new Image()
    this.img.src = "img/trap.gif"

    this.img.onload = function(){
        this.draw()
    }.bind(this);

    this.draw = function(){
        this.x = this.x - 7
        ctx.drawImage(this.img, this.x,this.y, this.width,this.height)
    }

    this.isTouching = function(zombie){
        return ((this.x - 100) < (zombie.w / 2) + (zombie.width / 2)) &&
               ((this.x - 100) + (this.width / 2) > (zombie.w / 2)) &&
               (this.y < zombie.z + zombie.height) &&
               (this.y + this.height > zombie.z);
    };

} 

//Variables

var board = new Board()
var buildings = new Buildings()
var floor = new Floor()
var zombie = new Zombie()
var jump = new Jump()
var enemies = []
var interval
var frames = 0

//Auxiliar Functions

function gameOver(){
    stop();
    clearInterval(interval)
    ctx.fillText('Perdiste broooo', 50, 50)
    
}

function generateEnemies (){
    var x = [150, 250, 320];
    var rand = x[Math.floor(Math.random() * x.length)]
    if(!(frames % rand === 0)) return
    var trap = new Trap ()
    enemies.push(trap)
}

function deleteEnemies(){
    if(enemies.length === 5){
        enemies.splice(0,1)
    }
}

function drawEnemies(){
    enemies.forEach(function(trap){
        trap.draw()
    })
}

function checkCollition(){
    enemies.forEach(function(trap){
     if(trap.isTouching(zombie)){
        gameOver()
        }   
    })
}

//Main Flow

function update(){
    generateEnemies()
    deleteEnemies()
    frames++
    ctx.clearRect(0,0,canvas.width, canvas.height);
    board.draw()
    buildings.draw()
    floor.draw()
    drawEnemies()

    if (zombie.z != 280){
        jump.draw()
        
    }else {
        zombie.animate()
        zombie.z = 280;
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


  