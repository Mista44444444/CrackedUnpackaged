let menuButton = document.querySelector(".menuButton");
let menu = document.querySelector(".menu");
let menuState = 0;

function openMenu(){
    reinitiateLET();
    if(menuState == 0){
        menu.style.opacity = 1;
        menuButton.src = "img/menu2.png";
        clearInterval(gameLooping);
        menuState = 1;
    }
    else if(menuState == 1){
        menu.style.opacity = 0;
        menuButton.src = "img/menu1.png";
        gameLooping = setInterval(gameLoop, 10);
        menuState = 0;
    }
}