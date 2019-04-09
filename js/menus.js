//Menus and Ending Code

//Variables
const innerTV = document.getElementById("inner-tv")
const ironDrugs = document.getElementById("iron-drugs")
const wides = document.getElementById("wides")
const mainMenu = document.getElementById("main-menu")
const singlePlayer = document.getElementById("single-player")
const blackOut = document.getElementById("blackOut")
//Functions



//Event Listeners

  //Screen Progression
window.onload = function() { //Optimizar con CurrentTime onda el cronometro
    // ironDrugs.classList.add("fade-in-out");
    // setTimeout(function(){
    //   ironDrugs.remove()
    //   wides.classList.add("fade-in-out");
    // }, 8000);
    setTimeout(function(){
      // wides.remove()
      mainMenu.style.display = "block";
    },000);  //Cambiar a 16k
}

singlePlayer.addEventListener('click', function () {
  innerTV.appendChild(document.createElement("CANVAS"))
  setTimeout(function(){
    blackOut.style.display = "block";
  },000);  //16k
  setTimeout(function(){
    mainMenu.style.display = "none";
    blackOut.style.display = "none";  
    const canvas = document.querySelector('canvas')
  },1500)
})