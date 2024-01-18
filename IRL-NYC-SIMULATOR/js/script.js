//Initializing varaibles
let start_menu = document.querySelector(".start_menu");
let options = document.querySelector(".options");

//Function to start the game
function startGame(){
    setTimeout(() => {
        start_menu.style.opacity = "0";
        start_menu.style.display = "none";
    }, 100);
}

//Opens options window
function openWindow(){
    options.style.opacity = "1";
}

//Closes options
function closeOptions(){
    options.style.opacity = "0";
}