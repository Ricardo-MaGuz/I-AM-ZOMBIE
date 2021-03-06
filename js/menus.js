//Menus and Ending Code

//Variables
const gameOverScreen = document.getElementById("game-over")
const innerTV = document.getElementById("inner-tv")
const ironDrugs = document.getElementById("iron-drugs")
const wides = document.getElementById("wides")
const mainMenu = document.getElementById("main-menu")
const menuStartGame = document.querySelector(".menu-start-game")
const menuStartGame2 = document.querySelectorAll(".menu-start-game")[1]
const blackOut = document.getElementById("blackOut")
const menuControlsBtn = document.getElementById("menu-controls-btn")
const menuControls = document.getElementById("menu-controls")
const menuCredits = document.getElementById("credits")
const menuCreditsBtn = document.getElementById("main-credits-btn")

//Functions
const menuStartGameF = function (){
  setTimeout(function(){
    const canvas = document.getElementById('canvas')
    blackOut.style.display = "block"
    document.getElementById("game-start").play();
    canvas.style.display = "block"
  },000); 
  setTimeout(function(){
    document.getElementById("main-menu-audio").remove()
    mainMenu.style.display = "none"
    blackOut.style.display = "none"
  },2000)
  setTimeout(function(){
    document.getElementById("game-start").remove()
    document.getElementById("in-game-music").play()
  },3000)
  setTimeout(function(){
    start()
  },4000)
}

//Event Listeners
  //Screen Progression
window.onload = function() { 
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

menuControlsBtn.addEventListener('click', function (){
  menuControls.classList.add("grave")
  menuControls.classList.remove("bye-grave")
  document.onkeypress=function(){
    menuControls.classList.add("bye-grave")
  }
})

menuCreditsBtn.addEventListener('click', function (){
  menuCredits.classList.add("grave")
  menuCredits.classList.remove("bye-grave")
  document.onkeypress=function(){
    menuCredits.classList.add("bye-grave")
  }
})