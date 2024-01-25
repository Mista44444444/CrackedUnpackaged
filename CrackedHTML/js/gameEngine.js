//Initializing varaibles
let playerSpeedY = 1.25;
let playerSpeedX = 1.25;
let playerY = -116;
let playerX = -90;
let keysPressed = {};
let lastButton;
let map;
let player;
let gameLooping;

function startGameEngine(){
    clearTimeout(introTimeout);
    clearInterval(buildingsInterval);
    menuState = 0;  
    start_menu.code = `
    <div class="background" style="position: absolute; z-index: -1;"></div>
    <div class="on_top_of_background">
        <div class="title">Cracked</div>
        <div class="start_button" onclick="startGame()">continue</div>
        <div class="option_button" onclick="openOptWindow()">options</div>
        <div class="options" style="opacity: 0;"><div class="x" onclick="closeOptions()">x</div><input type="range" id="volume" min="0" max="100" value="${audio.volumeValue()}" oninput="ChangeVolume()"><p id="rangeValue">${audio.volumeValue()}</p></div>  
    </div>`; 
    map = document.querySelector(".map");
    map.style.top = `${playerY}px`;
    map.style.left = `${playerX}px`;
    player = document.querySelector(".player");
    clearInterval(gameLooping);
    gameLooping = setInterval(gameLoop, 10); 
}

function gameLoop(){
    //Movement
    if (keysPressed['a'] && keysPressed['w']) {
        // Move the player diagonally up and left
        lastButton = "a";
        if(player.src.includes("img/player")){
            player.src = "img/leftside_walking.gif";
        }
        playerX += playerSpeedX;
        playerY += playerSpeedY;
    } 
    else if (keysPressed['a'] && keysPressed['s']) {
        // Move the player diagonally down and left
        lastButton = "a";
        if(player.src.includes("img/player")){
            player.src = "img/leftside_walking.gif";
        }
        playerX += playerSpeedX;
        playerY -= playerSpeedY;
    } 
    else if (keysPressed['d'] && keysPressed['w']) {
        // Move the player diagonally up and right
        lastButton = "d";
        if(player.src.includes("img/player")){
            player.src = "img/rightside_walking.gif";
        }
        playerX -= playerSpeedX;
        playerY += playerSpeedY;
    } 
    else if (keysPressed['d'] && keysPressed['s']) {
        // Move the player diagonally down and right
        lastButton = "d";
        if(player.src.includes("img/player")){
            player.src = "img/rightside_walking.gif";
        }
        playerX -= playerSpeedX;
        playerY -= playerSpeedY;
    } 
    else if (keysPressed['a']) {
        // Move the player left
        lastButton = "a";
        if(player.src.includes("img/player")){
            player.src = "img/leftside_walking.gif";
        }
        playerX += playerSpeedX;
    } 
    else if (keysPressed['w']) {
        // Move the player up
        lastButton = "w";
        if(player.src.includes("img/player")){
            player.src = "img/backward_walking.gif";
        }
        playerY += playerSpeedY;
    } 
    else if (keysPressed['s']) {
        // Move the player down
        lastButton = "s";
        if(player.src.includes("img/player")){
            player.src = "img/forward_walking.gif";
        }
        playerY -= playerSpeedY;
    } 
    else if (keysPressed['d']) {
        // Move the player right
        lastButton = "d";
        if(player.src.includes("img/player")){
            player.src = "img/rightside_walking.gif";
        }
        playerX -= playerSpeedX;
    }

    //Borders
    if (playerX > 818) {
        playerX = 818;
    } 
    else if (playerX < -817.5) {
        playerX = -817.5;
    }

    if (playerY > 393.5) {
        playerY = 393.5;
    } 
    else if (playerY < -391) {
        playerY = -391;
    }

    //Sets the players new position
    map.style.top = `${playerY}px`;
    map.style.left = `${playerX}px`;

}