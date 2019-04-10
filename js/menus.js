//Menus and Ending Code

//Variables
const innerTV = document.getElementById("inner-tv")
const ironDrugs = document.getElementById("iron-drugs")
const wides = document.getElementById("wides")
const mainMenu = document.getElementById("main-menu")
const menuStartGame = document.querySelector(".menu-start-game")
const menuStartGame2 = document.querySelectorAll(".menu-start-game")[1]
const blackOut = document.getElementById("blackOut")
const menuControlsBtn = document.getElementById("menu-controls-btn")
const menuControls = document.getElementById("menu-controls")

//Functions
const menuStartGameF = function (){
  innerTV.appendChild(document.createElement("CANVAS"))
  const canvas = document.querySelector('canvas')
  canvas.setAttribute('width', '763');
  canvas.setAttribute('height', '550');
  
  setTimeout(function(){
    blackOut.style.display = "block"
    document.getElementById("game-start").play();
  },000); 
  setTimeout(function(){
    document.getElementById("main-menu-audio").remove()
    mainMenu.style.display = "none"
    blackOut.style.display = "none"
  },2000)
  setTimeout(function(){
    document.getElementById("game-start").remove()
    document.getElementById("in-game-music").play()
  },4000)
}

//Event Listeners
  //Screen Progression
window.onload = function() { //Optimizar con CurrentTime onda el cronometro
    ironDrugs.classList.add("fade-in-out");
    setTimeout(function(){
      ironDrugs.remove()
      wides.classList.add("fade-in-out");
    }, 8000); //cambiar a 8K
    setTimeout(function(){
      wides.remove()
      document.getElementById("main-menu-audio").play()
      mainMenu.style.display = "block"
    },16000);  //Cambiar a 16k
}

menuStartGame.addEventListener('click', menuStartGameF)
menuStartGame2.addEventListener('click', menuStartGameF)
menuControlsBtn.addEventListener('click', function (){
  menuControls.classList.add("grave")
  menuControls.classList.remove("bye-grave")
  document.onkeypress=function(){
    menuControls.classList.add("bye-grave")
  }
})

