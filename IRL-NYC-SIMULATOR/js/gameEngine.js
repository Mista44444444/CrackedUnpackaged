//Initializing varaibles
let playerSpeedY = 0.5;
let playerSpeedX = 0.25;
let playerY = -18;
let playerX = -5;
let lastButton;
let map;
let player;

function startGameEngine(){
    map = document.querySelector(".map");
    map.style.top = `${playerY}%`;
    map.style.left = `${playerX}%`;
    player = document.querySelector(".player");
    let keysPressed = {};
    document.addEventListener('keydown', function(event) {
    keysPressed[event.key] = true;
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
    if (playerX > 45) {
        playerX = 45;
    } 
    else if (playerX < -44) {
        playerX = -44;
    }

    if (playerY > 36) {
        playerY = 36;
    } 
    else if (playerY < -35) {
        playerY = -35;
    }

    //Sets the players new position
    map.style.top = `${playerY}%`;
    map.style.left = `${playerX}%`;
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