//Initializing varaibles
let time = getRandomNumber(2501,7501);
let game = document.querySelector(".game");
let options = document.querySelector(".options");
let buildingsInterval;
let playerSpeedY = 0.5;
let playerSpeedX = 0.25;
let playerY = -18;
let playerX = -5;
let musicTimeout = setInterval(() => {
    audio.reset(0);
    audio.play(0);
}, 9600);
let map;
let player;

let start_menu = {
    code: `
    <div class="background" style="position: absolute; z-index: -1;"></div>
    <div class="on_top_of_background">
        <div class="title">Cracked</div>
        <div class="start_button" onclick="startGame()">start</div>
        <div class="option_button" onclick="openWindow()">options</div>
        <div class="options" style="opacity: 0;">something <div class="x" onclick="closeOptions()">x</div></div>  
    </div>
    `,
    name: `startMenu`
}
let intro_screen = {
    code: `<video width="100%" height="100%" style="background:black;" autoplay>
    <source src="img/intro.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>
    <div onclick="ctrlScreen(game_screen)" class="skip">skip</div>
    `,
    name: `intro`
}
let game_screen = {
    code: `
    <img src="img/player.png"class="player">
    <img class="map" src="img/map.png" style="left: 0%;top: 0%;">
    `,
    name: `game`
}

//Function to change the screens
function ctrlScreen(HTML){
    game.innerHTML = HTML.code;
    window.location.name = HTML.name
    if(HTML.name == "startMenu"){
        buildingsInterval = setInterval(() => {
            time = getRandomNumber(2501,7501);
            let bac = document.querySelector(".background");
            let style = time/1000;
            bac.innerHTML = "";
            bac.innerHTML += `<img src="img/b${getRandomNumber(1,3)}.png" class="Building" style="animation: ${style}s Skyskrapers ease-out;">`;
        }, time);
    }
    if(HTML.name == "intro"){
        clearInterval(buildingsInterval);
        game.style.display = "";
        game.style.opacity = "1";
        setTimeout(() => {
            ctrlScreen(game_screen);
        }, 10000);
    }
    if(HTML.name == "game"){
        map = document.querySelector(".map");
        map.style.top = `${playerY}%`;
        map.style.left = `${playerX}%`;
        player = document.querySelector(".player");
        let keysPressed = {};
        document.addEventListener('keydown', function(event) {
        keysPressed[event.key] = true;
        if (keysPressed['a'] && keysPressed['w']) {
            // Move the player diagonally up and left
            playerX += playerSpeedX;
            playerY += playerSpeedY;
        } else if (keysPressed['a'] && keysPressed['s']) {
            // Move the player diagonally down and left
            playerX += playerSpeedX;
            playerY -= playerSpeedY;
        } else if (keysPressed['d'] && keysPressed['w']) {
            // Move the player diagonally up and right
            playerX -= playerSpeedX;
            playerY += playerSpeedY;
        } else if (keysPressed['d'] && keysPressed['s']) {
            // Move the player diagonally down and right
            playerX -= playerSpeedX;
            playerY -= playerSpeedY;
        } else if (keysPressed['a']) {
            // Move the player left
            playerX += playerSpeedX;
        } else if (keysPressed['w']) {
            // Move the player up
            playerY += playerSpeedY;
        } else if (keysPressed['s']) {
            // Move the player down
            playerY -= playerSpeedY;
        } else if (keysPressed['d']) {
            // Move the player right
            playerX -= playerSpeedX;
        }

        if (playerX > 45) {
            playerX = 45;
        } else if (playerX < -44) {
            playerX = -44;
        }

        if (playerY > 36) {
            playerY = 36;
        } else if (playerY < -35) {
            playerY = -35;
        }

        map.style.top = `${playerY}%`;
        map.style.left = `${playerX}%`;
        });

        document.addEventListener('keyup', function(event) {
        delete keysPressed[event.key];
        });        
    }
}
ctrlScreen(start_menu);

//Reinitiates all dom varaibles
function reinitiateLET(){
    game = document.querySelector(".game");
    options = document.querySelector(".options");
}

//Function to start the game
function startGame(){
    reinitiateLET();
    clearTimeout(musicTimeout);
    audio.pause(0);
    audio.reset(0);
    game.style.display = "none";
    game.style.opacity = "0";
    ctrlScreen(intro_screen);
}

//Opens options window
function openWindow(){
    reinitiateLET();
    if(options.style.opacity == "1"){
        options.style.opacity = "0";
    }
    else{
        options.style.opacity = "1";
    }
}

//Closes options
function closeOptions(){
    options.style.opacity = "0";
}