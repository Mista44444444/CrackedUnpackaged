//Saving

const fs = require('fs');
const path = require('path');

//Saving function
function saveToFile(data) {
    const saveDirectory = path.join(__dirname, '../saves');
    const saveFilePath = path.join(saveDirectory, 'save.txt');
  
    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory);
    }
  
    fs.writeFileSync(saveFilePath, data, 'utf8');
}

//Read from save.txt
function readFromFile() {
    const saveDirectory = path.join(__dirname, '../saves');
    const saveFilePath = path.join(saveDirectory, 'save.txt');
  
    if (!fs.existsSync(saveFilePath)) {
      return null;
    }
  
    return fs.readFileSync(saveFilePath, 'utf8');
}


//Functions


// Save a key-value pair to local storage
const saveToLocalStorage = (key, value) => localStorage.setItem(key, value);

// Retrieve a value from local storage by its key
const getFromLocalStorage = key => localStorage.getItem(key);

// Function to generate a random number between a start and end value
function getRandomNumber(start, end) {
    return Math.floor(Math.random() * (end - start + 1)) + start;
}

//Reverses a number
function reverse(num) {
    return num -= 2 * num
}

// Checks if a str is made out of only numbers
function isNumeric(str) {
    return /^\d+$/.test(str);
}


//Music controller


class Audio {
    //Tracks
    tracks = [
        document.querySelector(".audio1")
    ]

    constructor() { 
        this.pauseAll();
        this.volumeAll(50); 
        this.play(0) 
    }

    //Pauses every track
    pauseAll(){
        this.tracks.forEach(function(track) {
            track.pause();
        }, this);
    }

    //Plays every track
    playAll(){
        this.tracks.forEach(function(track) {
            track.play();
            track.volume = 1;
        }, this);
    }

    //Pauses a track
    pause(index){
        this.tracks[index].pause();
    }

    //Plays a track
    play(index){
        this.tracks[index].play();
    }

    //Resets a track
    reset(index){
        this.tracks[index].currentTime = 0;
    }
    
    //Sets current time from a varaible for the track
    setTime(index, time){
        this.tracks[index].currentTime = time;
    }
    
    //Changes volume of the track
    volumeAll(value){
        this.tracks.forEach(function(track) {
            track.volume = value / 100;
        }, this);
    }

    //Returns the current voluma value for all tracks
    volumeValue(){
        return this.tracks[0].volume * 100;
    }

    //Changes volume of the track
    volume(index, value){
        this.tracks[index].volume = value;
    }

    //Mutes a track
    mute(index){
        this.tracks[index].muted = true;
    }

    //Unmutes a track
    unmute(index){
        this.tracks[index].muted = false;
    }
}

const audio = new Audio();


//Starting menu


//Initializing varaibles
let time = getRandomNumber(2501,7501);
let game = document.querySelector(".game");
let options = document.querySelector(".options");
let buildingsInterval;
let bac;
let introTimeout;
let bindsLoop;
let bindsThrottle = true;

//Sets up the starting menu
function startMenu(){
    reinitiateLET();
    menuState = false;
    audio.reset(0);
    audio.play(0);
    buildingsInterval = setInterval(() => {
        if(document.querySelector(".background")){
        time = getRandomNumber(2501,7501);
        bac = document.querySelector(".background");
        let transition_time = time/1000;
        bac.innerHTML = "";
        bac.innerHTML += `<img src="img/b${getRandomNumber(1,3)}.png" class="Building" style="animation: ${transition_time}s Skyskrapers ease-out;">`;
        }
    }, time);
}

//Opens options window
function openOptWindow(){
    reinitiateLET();
    if(options.style.opacity == "1"){
        options.style.opacity = "0";
    }
    else{
        options.style.opacity = "1";
    }
}

//Changes volume of all songs
function ChangeVolume(){
    let volume = document.querySelector("#volume");
    audio.volumeAll(volume.value)
    document.querySelector("#rangeValue").innerHTML = volume.value;
}

function binds(){
    if(bindsThrottle){
        if(keysPressed['Escape']){
            openMenu();
            bindsThrottle = false;
            setTimeout(() => {
                bindsThrottle = true;
            },200);
        }
    }
}

bindsLoop = setInterval(binds, 10);

//Function to start the game
function startGame(){
    reinitiateLET();
    audio.pause(0);
    audio.reset(0);
    if(!introWas){
    game.style.display = "none";
    game.style.opacity = "0";
    }
    ctrlScreen(intro_screen);
}

//Switches to intro screen
function switchToIntroScreen(){
    clearInterval(buildingsInterval);
    introWas = true;
    game.style.display = "";
    game.style.opacity = "1";
    introTimeout = setTimeout(() => {
        ctrlScreen(Mgame_screen);
    }, 10000);
}

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


//In game-menu


let menuButton = document.querySelector(".menuButton");
let menu = document.querySelector(".menu");
let menuState = 0;

function openMenu(){
    reinitiateLET();
    if(menuState == 0){
        menu.style.opacity = 1;
        menu.style.display = "";
        menuButton.src = "img/menu2.png";
        clearInterval(gameLooping);
        menuState = 1;
    }
    else if(menuState == 1){
        menu.style.opacity = 0;
        menu.style.display = "none";
        menuButton.src = "img/menu1.png";
        gameLooping = setInterval(gameLoop, 10);
        menuState = 0;
    }
}


//Game engine


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
        <div class="start_button" onclick="script.startGame()">continue</div>
        <div class="option_button" onclick="script.openOptWindow()">options</div>
        <div class="options" style="opacity: 0;"><div class="x" onclick="script.openOptWindow()">x</div><input type="range" id="volume" min="0" max="100" value="${audio.volumeValue()}" oninput="script.ChangeVolume()"><p id="rangeValue">${audio.volumeValue()}</p></div>  
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


//Screens engine


//Initializing varaibles
let introWas = false;
let start_menu = {
    code: `
    <div class="background" style="position: absolute; z-index: -1;"></div>
    <div class="on_top_of_background">
        <div class="title">Cracked</div>
        <div class="start_button" onclick="script.startGame()">start</div>
        <div class="option_button" onclick="script.openOptWindow()">options</div>
        <div class="exit" onclick="window.close()">exit</div>
        <div class="options" style="opacity: 0;"><div class="x" onclick="script.openOptWindow()">x</div><div class="volumeText">Volume</div><input type="range" id="volume" min="0" max="100" value="50" oninput="script.ChangeVolume()"><p id="rangeValue">50</p></div>  
    </div>
    `,
    name: `startMenu`
}
let intro_screen = {
    code: `<video width="100%" height="100%" style="background:black;" autoplay>
    <source src="img/intro.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>
    <div onclick="script.ctrlScreen(script.Mgame_screen)" class="skip">skip</div>
    `,
    name: `intro`
}
let Mgame_screen = {
    code: `
    <img class="menuButton" src="img/menu1.png" onclick="script.openMenu()">
    <div class="menu" style="opacity:0">
    <div class="unPause" onclick="script.openMenu()">unpause</div>
    <div class="exitMButton" onclick="script.ctrlScreen(script.start_menu)">exit to menu</div>
    <div class="exitButton" onclick="window.close()">exit</div>
    </div>
    <img class="player" src="img/player_front.png">
    <img class="map" src="img/map.png" style="left: 0%;top: 0%;">
    `,
    name: `game`
}

//Function to change the screens
function ctrlScreen(HTML){
    if(introWas && HTML == intro_screen){
        HTML = Mgame_screen;
    }
    game.innerHTML = HTML.code;
    window.location.name = HTML.name
    if(HTML.name == "startMenu"){
        startMenu();
    }
    if(HTML.name == "intro"){
        switchToIntroScreen();
    }
    if(HTML.name == "game"){
        startGameEngine();  
    }
}
ctrlScreen(start_menu);

//Reinitiates all dom varaibles
function reinitiateLET(){
    if(document.querySelector(".game")){
        game = document.querySelector(".game");
    }
    if(document.querySelector(".background")){
        bac = document.querySelector(".background");
    }
    if(document.querySelector(".options")){
        options = document.querySelector(".options");
    }
    if(document.querySelector(".player")){
        player = document.querySelector(".player");
    }
    if(document.querySelector(".map")){
        map = document.querySelector(".map");
    }
    if(document.querySelector(".menu")){
        menu = document.querySelector(".menu");
    }
    if(document.querySelector(".menuButton")){
        menuButton = document.querySelector(".menuButton")
    }
}

module.exports = {
    openOptWindow: openOptWindow,
    startGame: startGame,
    ctrlScreen: ctrlScreen,
    ChangeVolume: ChangeVolume,
    openMenu: openMenu,
    saveToFile: saveToFile,
    readFromFile: readFromFile,
    start_menu: start_menu,
    intro_screen: intro_screen,
    Mgame_screen: Mgame_screen
}