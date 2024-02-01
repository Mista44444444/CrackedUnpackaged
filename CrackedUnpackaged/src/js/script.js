//Initializing varaibles

//Bolean
let bindsThrottle = true;
let introWas = false;

//Num
let menuState = 0;
let playerSpeedY = 1.25;
let playerSpeedX = 1.25;
let playerY = -116;
let playerX = -90;

//Object
let keysPressed = {};

//Sctring
let lastButton;

//DOM elements
let volume = document.querySelector("#volume");
let game = document.querySelector(".game");
let options = document.querySelector(".options");
let background = document.querySelector(".background");
let menuButton = document.querySelector(".menuButton");
let menu = document.querySelector(".menu");
let textBoxE = document.querySelector(".textBox");
let map = document.querySelector(".map");
let player = document.querySelector(".player");
let panorama = document.querySelector(".panorama");

//Intervals
let panoramaInterval;
let gameLooping;
let bindsLoop;
let introTimeout;

//Saving

const fs = require('fs');
const path = require('path');

//Saving function
function saveToFile(data) {
    const saveDirectory = path.join(__dirname, '../saves');
    const saveFilePath = path.join(saveDirectory, 'save.js');
  
    if (!fs.existsSync(saveDirectory)) {
      fs.mkdirSync(saveDirectory);
    }
  
    fs.writeFileSync(saveFilePath, data, 'utf8');
}

//Read from save.txt
function readFromFile() {
    const saveDirectory = path.join(__dirname, '../saves');
    const saveFilePath = path.join(saveDirectory, 'save.js');
  
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


//Sets up the starting menu
function startMenu(){
    menuState = false;
    audio.reset(0);
    audio.play(0);
}

//Opens options window
function openOptWindow(){
    if(options.style.opacity == "1"){
        options.style.opacity = "0";
    }
    else{
        options.style.opacity = "1";
    }
}

//Changes volume of all songs
function ChangeVolume(){
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
    clearInterval(panoramaInterval);
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
            player.src = "img/idleForeward.gif";
            break;
        case "a":
            player.src = "img/idleLeft.gif";
            break;
        case "s":
            player.src = "img/idleForward.gif";
            break;
        case "d":
            player.src = "img/idleRight.gif";
            break;
    }
    delete keysPressed[event.key];
});  


//In game-menu


function openMenu(){
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


function startGameEngine(){
    clearTimeout(introTimeout);
    clearInterval(panoramaInterval);
    menuState = 0;  
    start_menu.code = `
    <div class="background" style="position: absolute; z-index: -1;">
    </div>
    <div class="on_top_of_background">
        <div class="title">Cracked</div>
        <div class="start_button" onclick="script.startGame()">continue</div>
        <div class="option_button" onclick="script.openOptWindow()">options</div>
        <div class="exitButton" onclick="window.close()">exit</div>
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
        if(player.src.includes("img/idle")){
            player.src = "img/walkLeft.gif";
        }
        playerX += playerSpeedX;
        playerY += playerSpeedY;
    } 
    else if (keysPressed['a'] && keysPressed['s']) {
        // Move the player diagonally down and left
        lastButton = "a";
        if(player.src.includes("img/idle")){
            player.src = "img/walkLeft.gif";
        }
        playerX += playerSpeedX;
        playerY -= playerSpeedY;
    } 
    else if (keysPressed['d'] && keysPressed['w']) {
        // Move the player diagonally up and right
        lastButton = "d";
        if(player.src.includes("img/idle")){
            player.src = "img/walkRight.gif";
        }
        playerX -= playerSpeedX;
        playerY += playerSpeedY;
    } 
    else if (keysPressed['d'] && keysPressed['s']) {
        // Move the player diagonally down and right
        lastButton = "d";
        if(player.src.includes("img/idle")){
            player.src = "img/walkRight.gif";
        }
        playerX -= playerSpeedX;
        playerY -= playerSpeedY;
    } 
    else if (keysPressed['a']) {
        // Move the player left
        lastButton = "a";
        if(player.src.includes("img/idle")){
            player.src = "img/walkLeft.gif";
        }
        playerX += playerSpeedX;
    } 
    else if (keysPressed['w']) {
        // Move the player up
        lastButton = "w";
        if(player.src.includes("img/idle")){
            player.src = "img/walkForewards.gif";
        }
        playerY += playerSpeedY;
    } 
    else if (keysPressed['s']) {
        // Move the player down
        lastButton = "s";
        if(player.src.includes("img/idle")){
            player.src = "img/walkForward.gif";
        }
        playerY -= playerSpeedY;
    } 
    else if (keysPressed['d']) {
        // Move the player right
        lastButton = "d";
        if(player.src.includes("img/idle")){
            player.src = "img/walkRight.gif";
        }
        playerX -= playerSpeedX;
    }

    //Borders
    if (playerX > 992.5) {
        playerX = 992.5;
    } 
    else if (playerX < -876.25) {
        playerX = -876.5;
    }

    if (playerY > 1090.25) {
        playerY = 1090.25;
    } 
    else if (playerY < -1127.25) {
        playerY = -1127.25;
    }

    //Sets the players new position
    map.style.top = `${playerY}px`;
    map.style.left = `${playerX}px`;

}

//Function to start a dialouge
function textBox(text){
    let textA = text.split("");
    textBoxE.style.opacity = "1";
    textBoxE.style.display = "";
    textBoxE.innerHTML = "";
    clearInterval(gameLooping);
    for(let i = 0;i < textA.length;i++){
        setTimeout(() => {
            textBoxE.innerHTML += textA[i];
        }, i * 50);
    }
    let handleEnter = window.addEventListener("keydown", function(event) {
        if (event.key === "Enter") {
            window.removeEventListener("keydown", handleEnter);
            clearInterval(gameLooping);
            gameLooping = setInterval(gameLoop, 10); 
            textBoxE.style.opacity = "0";
            textBoxE.style.display = "none";
        }
      });
      
}


//Screens engine


//Initializing varaibles
let start_menu = {
    code: `
    <div class="background" style="position: absolute; z-index: -1;">
    </div>
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
    <div class="menu" style="opacity:0; display:none;">
    <div class="unPause" onclick="script.openMenu()">unpause</div>
    <div class="exitMButton" onclick="script.ctrlScreen(script.start_menu)">exit to menu</div>
    <div class="exitButton" onclick="window.close()">exit</div>
    </div>
    <div class="textBox" style="opacity:0; display:none;"></div>
    <img class="player" src="img/idleForward.gif">
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
    reinitateDOM();
}
ctrlScreen(start_menu);

//Reinitiates all dom varaibles
function reinitateDOM(){
    if(document.querySelector(".game")){
        game = document.querySelector(".game");
    }
    if(document.querySelector(".background")){
        background = document.querySelector(".background");
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
        menuButton = document.querySelector(".menuButton");
    }
    if(document.querySelector("#volume")){
        volume = document.querySelector("#volume");
    }
    if(textBoxE = document.querySelector(".textBox")){
        textBoxE = document.querySelector(".textBox");
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
    textBox: textBox,
    start_menu: start_menu,
    intro_screen: intro_screen,
    Mgame_screen: Mgame_screen,
}