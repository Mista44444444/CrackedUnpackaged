//Initializing varaibles
let playerSpeedY = 1.25;
let playerSpeedX = 1.25;
let playerY = -116;
let playerX = -90;
let keysPressed = {};
let lastButton;
let map;
let player;

function startGameEngine(){
    clearTimeout(introTimeout)
    map = document.querySelector(".map");
    map.style.top = `${playerY}px`;
    map.style.left = `${playerX}px`;
    player = document.querySelector(".player");
    setInterval(gameLoop, 10);
    document.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;
    });

    document.addEventListener('keyup', function(event) {
    switch(lastButton){
        case "w":
            player.src = "img/player_back.png";
            break;
        case "a":
            player.src = "img/player_left.png";
            break;
        case "s":
            player.src = "img/player_front.png";
            break;
        case "d":
            player.src = "img/player_right.png";
            break;
    }
    delete keysPressed[event.key];
    });   
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