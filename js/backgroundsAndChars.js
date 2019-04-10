(function() {
  let requestAnimationFrame = window.requestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame; //Indica al navegador que va a haber una animación y devuelve el cuadro
})();

const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d'); 
ctx.width = 728;
ctx.height = 550;

// Background
const background = {x: 0, y: 0, width: 3000, height: 550};
let backgroundReady = false;
const backgroundImg = new Image();
backgroundImg.onload = function(){
backgroundReady = true;
};
const backgrounds = {
img1: 'img/city1.gif',
}
backgroundImg.src = backgrounds.img1


// Char
const char = {
    x: 30, 
    y: 320, 
    width: 171, 
    height: 200, 
    spriteX: 0, 
    spriteY: 0, 
    speed: 250, 
    edgeRegion: 450, 
    moving: false, 
    animateTime: 5, 
    animateCur: 5, 
          animatePos: Array(1, 2, 3,4, 5, 5)};
let charReady = false;
const charImg = new Image();
charImg.onload = function(){
charReady = true;
};
const zombie1 = {
run: 'img/zombie1Run.gif',
}
charImg.src = zombie1.run;

// Keyboard controls
const keysDown = {};
addEventListener('keydown', function (e) {
char.moving = false;
keysDown[e.keyCode] = true;
}, false);

addEventListener('keyup', function (e) {  
char.moving = false;
delete keysDown[e.keyCode];
}, false);

// Update
const update = function(modifier){
if(37 in keysDown){
  char.spriteX = 171;
  if(Math.round(char.x) > char.edgeRegion){
    char.x -= char.speed * modifier;
  } else {
    if(Math.round(background.x) < 0){
      background.x += char.speed * modifier;
    } else if(Math.round(char.x) > 0){
      char.x -= char.speed * modifier;
    }
  }
}
if(38 in keysDown){
  char.spriteX = 171;
  if(Math.round(char.y) > char.edgeRegion){
    char.y -= char.speed * modifier;
  } else {
    if(Math.round(background.y) < 0){
      background.y += char.speed * modifier;
    } else if(Math.round(char.y) > 0){
      char.y -= char.speed * modifier;
    }
  }
}
if(39 in keysDown){
  char.spriteX = 171;
  if((Math.round(char.x) + char.width) < (canvas.width - char.edgeRegion)){
    char.x += char.speed * modifier;
  } else {
    if(Math.round(background.x) > (canvas.width - background.width)){
      background.x -= char.speed * modifier;
    } else if((Math.round(char.x) + char.width) < canvas.width){
      char.x += char.speed * modifier;
    }
  }
}

if(37 in keysDown && 38 in keysDown){
  char.spriteX = 124;
}
if(38 in keysDown && 39 in keysDown){
  char.spriteX = 100;
}

};

// Render Function
var render = function(){
ctx.clearRect(0, 0, canvas.width, canvas.height);

if(char.moving){
  if(char.animateTime > 0){
    char.animateTime--;
  } else {
    if(char.animateCur + 1 < char.animatePos.length){
      char.animateCur++;
      char.spriteY = char.animatePos[char.animateCur];
    } else {
      char.animateCur = 0;
      char.spriteY = char.animatePos[0];
    }
    char.animateTime = 5;
  }
}

if(backgroundReady){
  ctx.drawImage(backgroundImg, background.x, background.y);
}

if(charReady){
  ctx.drawImage(charImg, char.spriteX, char.spriteY, char.width, char.height, char.x, char.y, char.width, char.height);
}
};

const mainInterval = function(){
let now = Date.now();
  const delta = now - then;

  update(delta / 1000);
  render();

  then = now;
  requestAnimationFrame(mainInterval);
};


render();
then = Date.now();
mainInterval();