//Initializing varaibles

//Export
let Saves = require("../saves/save.js");

//Boolean
let bindsThrottle = true;
let introWas = Saves.introWas;
let continuing = false;

//Num
let menuState = 0;
let playerSpeedY = 1.25;
let playerSpeedX = 1.25;
let playerY = 0;
let playerX = 0;
let mapPlayerX = 0;
let mapPlayerY = 0;
let canEnterBuilding = 0;

//Object
let keysPressed = {};

//Array
let sides = [];

//String
let lastButton;
let lastScreen;
if(introWas){
    setTimeout(() => {
        lastScreen = Mgame_screen;
    }, 10);
}
if(!introWas){
    setTimeout(() => {
    lastScreen = intro_screen;
    }, 10);
}
let lastPlayerGif = "img/idleForward.gif"


//DOM elements
let volume = document.querySelector("#volume");
let game = document.querySelector(".game");
let options = document.querySelector(".options");
let background = document.querySelector(".background");
let menuButton = document.querySelector(".menuButton");
let enterButton = document.querySelector(".enterButton");
let menu = document.querySelector(".menu");
let textBoxE = document.querySelector(".textBox");
let map = document.querySelector(".map");
let player = document.querySelector(".player");
let panorama = document.querySelector(".panorama");
let hitboxes = document.querySelectorAll(".hitbox");
let fadeElem = document.querySelectorAll(".fade")
let entrances = document.querySelectorAll(".entrance");

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

//Checks if elements are colliding
function areElementsColliding(element1, element2) {
    const rect1 = element1.getBoundingClientRect();
    const rect2 = element2.getBoundingClientRect();

    // Check for collision using bounding rectangles
    return !(
        rect1.right < rect2.left ||
        rect1.left > rect2.right ||
        rect1.bottom < rect2.top ||
        rect1.top > rect2.bottom
    );
}

//fades an element
function fade(element1, element2) {
    element2.forEach(element => {
        if(areElementsColliding(element1,element)){
            element.style.background = element.getAttribute("color");
            element.style.borderBottom = "26px solid black";
        }
        else{
            element.style.background = "";
            element.style.borderBottom = "";
        }
    });
}

//Function to enter a building
function enterBuilding(element1, element2){
    let reset = 0;
    for(let i = 0;i < element2.length;i++){
        if(areElementsColliding(player,element2[i])){
            canEnterBuilding = parseFloat(element2[i].id)+1;
            enterButton.style.opacity = "1";
        }
        else{
            reset++;
        }
    }
    if(reset == element2.length){
        canEnterBuilding = 0;
        enterButton.style.opacity = "0";
    }
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
        if(keysPressed['Enter']){
            if(canEnterBuilding > 0){
                if(canEnterBuilding == 1){
                    ctrlScreen(Mgame_screen);
                }
                else{
                    ctrlScreen(Buildings[`Building${canEnterBuilding}`]);
                }
                bindsThrottle = false;
                setTimeout(() => {
                    bindsThrottle = true;
                },200);
            }
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
    ctrlScreen(lastScreen);
}

//Switches to intro screen
function switchToIntroScreen(){
    clearInterval(panoramaInterval);
    introWas = true;
    saveToFile(`
    let introWas = true
    module.exports = {
        introWas: introWas,
    }
    `);
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
        case "aw":
        case "as":
        case "a":
            player.src = "img/idleLeft.gif";
            break;
        case "s":
            player.src = "img/idleForward.gif";
            break;
        case "dw":
        case "ds":
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
        menuButton.style.rotate = "90deg";
        clearInterval(gameLooping);
        menuState = 1;
    }
    else if(menuState == 1){
        menu.style.opacity = 0;
        menu.style.display = "none";
        menuButton.style.rotate = "";
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
    player = document.querySelector(".player");
    if(!continuing){
    map.style.top = `${mapPlayerY}px`;
    map.style.left = `${mapPlayerX}px`;
    playerX = mapPlayerX;
    playerY = mapPlayerY;
    }
    else{
        map.style.top = `${playerY}px`;
        map.style.left = `${playerX}px`;
    }
    clearInterval(gameLooping);
    player.src = lastPlayerGif;
    gameLooping = setInterval(gameLoop, 10); 
}

function gameLoop(){
    //Movement
    if (keysPressed['a'] && keysPressed['w']) {
        // Move the player diagonally up and left
        lastButton = "aw";
        if(player.src.includes("img/idle")){
            player.src = "img/walkLeft.gif";
        }
        playerX += playerSpeedX;
        playerY += playerSpeedY;
    } 
    else if (keysPressed['a'] && keysPressed['s']) {
        // Move the player diagonally down and left
        lastButton = "as";
        if(player.src.includes("img/idle")){
            player.src = "img/walkLeft.gif";
        }
        playerX += playerSpeedX;
        playerY -= playerSpeedY;
    } 
    else if (keysPressed['d'] && keysPressed['w']) {
        // Move the player diagonally up and right
        lastButton = "dw";
        if(player.src.includes("img/idle")){
            player.src = "img/walkRight.gif";
        }
        playerX -= playerSpeedX;
        playerY += playerSpeedY;
    } 
    else if (keysPressed['d'] && keysPressed['s']) {
        // Move the player diagonally down and right
        lastButton = "ds";
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
    lastPlayerGif = player.src

    //Borders
    if(lastScreen.name == Mgame_screen.name){
        if (playerX > 992.5) {
            playerX = 992.5;
        } 
        if (playerX < -876.25) {
            playerX = -876.5;
        }
        if (playerY > 1090.25) {
            playerY = 1090.25;
        } 
        if (playerY < -1127.25) {
            playerY = -1127.25;
    }
    }
    if(lastScreen.name == Buildings[`Building3`].name){
        if (playerX > 202.5) {
            playerX = 202.5;
        } 
        if (playerX < -202.5) {
            playerX = -202.5;
        }
        if (playerY < -525) {
            playerY = -525;
        }
    }
    getLastSide(player,hitboxes);
    enterBuilding(player,entrances);
    fade(player,fadeElem)

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

// Gets last side which is touched by element1
function getLastSide(element1, element2Array) {
    const rect1 = element1.getBoundingClientRect();
    for(let i = 0;element2Array.length > i;i++){
        const rect2 = element2Array[i].getBoundingClientRect();
        if(sides[i] == undefined){
        sides[i] = [];
        }

        if (rect1.left < rect2.right) {
            if (!sides[i].includes("left")) {
                sides[i].push("left");
            }
        } else {
            if (sides[i].includes("left")) {
                sides[i].splice(sides[i].indexOf("left"), 1);
            }
        }

        if (rect1.top < rect2.bottom) {
            if (!sides[i].includes("top")) {
                sides[i].push("top");
            }
        } else {
            if (sides[i].includes("top")) {
                sides[i].splice(sides[i].indexOf("top"), 1);
            }
        }

        if (rect1.right > rect2.left) {
            if (!sides[i].includes("right")) {
                sides[i].push("right");
            }
        } else {
            if (sides[i].includes("right")) {
                sides[i].splice(sides[i].indexOf("right"), 1);
            }
        }

        if (rect1.bottom > rect2.top) {
            if (!sides[i].includes("bottom")) {
                sides[i].push("bottom");
            }
        } else {
            if (sides[i].includes("bottom")) {
                sides[i].splice(sides[i].indexOf("bottom"), 1);
            }
        }
    }
    let validSet = false;
    let setIndex;
    sides.forEach((array, index) => {
        if(array.length == 4){
            validSet = true;
            setIndex = index;
        }
    });
    if(validSet){
        switch (sides[setIndex][3]) {
            case "top":
                playerY -= playerSpeedY;
                break;
            case "bottom":
                playerY += playerSpeedY;
                break;
            case "right":
                playerX += playerSpeedX;
                break;
            case "left":
                playerX -= playerSpeedX;
                break;

            default:
                break;
        }
    }
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
    <img class="enterButton" src="img/enter.png" style="opacity:0">
    <div class="menu" style="opacity:0; display:none;">
    <div class="unPause" onclick="script.openMenu()">unpause</div>
    <div class="exitMButton" onclick="script.ctrlScreen(script.start_menu)">exit to menu</div>
    <div class="exitButton" onclick="window.close()">exit</div>
    </div>
    <div class="textBox" style="opacity:0; display:none;"></div>
    <img class="player" src="${lastPlayerGif}">
    <div class="map" style="width: 3526px;">
    <img class="map_img" src="img/map.png">
    <div class="hitbox" style="position: absolute;top: 1376px;left: 744px;width: 514px;height: 778px;"></div>
    <div class="hitbox" style="position: absolute;top: 1886px;left: 2109px;width: 557px;height: 299px;"></div>
    <div class="hitbox" style="position: absolute;top: 1272px;left: 2109px;width: 557px;height: 295px;"></div>
    <div class="fade" color="#443f47" style="position: absolute;top: 1753px; left: 2078px;width: 596px;height: 154px;"></div>
    <div class="fade" color="#626262" style="position: absolute; top: 1136px; left: 2091px;width: 582px; height: 154px;"></div>
    <div class="fade" color="#626262" style="position: absolute;top: 1222px; left: 743px;width: 544px;height: 177px;"></div>
    <img class="entrance" src="img/entrance.gif" id="1" style="position: absolute;top: 2113px;width: 42px;left: 2035px;">
    <img class="entrance" src="img/entrance.gif" id="2" style="position: absolute;top: 1822px;width: 42px;left: 1300px;rotate: 180deg;">
    </div>
    `,
    name: `game`
}
let Buildings = {
    Building2: {
        code: `<img class="menuButton" src="img/menu1.png" onclick="script.openMenu()">
    <img class="enterButton" src="img/enter.png" style="opacity:0">
    <div class="menu" style="opacity:0; display:none;">
    <div class="unPause" onclick="script.openMenu()">unpause</div>
    <div class="exitMButton" onclick="script.ctrlScreen(script.start_menu)">exit to menu</div>
    <div class="exitButton" onclick="window.close()">exit</div>
    </div>
    <div class="textBox" style="opacity:0; display:none;"></div>
    <img class="player" src="${lastPlayerGif}">
    <div class="map" style="width: 3526px;">
    <img class="map_img" src="img/Building2.png">
    <div class="hitbox" style="position: absolute;top: 1376px;left: 744px;width: 514px;height: 778px;"></div>
    <div class="hitbox" style="position: absolute;top: 1886px;left: 2109px;width: 557px;height: 299px;"></div>
    <div class="hitbox" style="position: absolute;top: 1272px;left: 2109px;width: 557px;height: 295px;"></div>
    <div class="hitbox" style="position: absolute;top: 1272px;left: 2109px;width: 557px;height: 295px;"></div>
    <div class="hitbox" style="position: absolute;top: 1272px;left: 2109px;width: 557px;height: 295px;"></div>
    <div class="entrance" id="0" style="position: absolute;top: 2113px;width: 42px;left: 2030px;"></div>
    </div>
    `,
    name: `building2`
    },
    Building3: {
        code: `<img class="menuButton" src="img/menu1.png" onclick="script.openMenu()">
    <img class="enterButton" src="img/enter.png" style="opacity:0">
    <div class="menu" style="opacity:0; display:none;">
    <div class="unPause" onclick="script.openMenu()">unpause</div>
    <div class="exitMButton" onclick="script.ctrlScreen(script.start_menu)">exit to menu</div>
    <div class="exitButton" onclick="window.close()">exit</div>
    </div>
    <div class="textBox" style="opacity:0; display:none;"></div>
    <img class="player" src="${lastPlayerGif}">
    <div class="map" style="width: 500px;">
    <img class="map_img" src="img/Building3.png">
    <div class="hitbox" style="position: absolute;top: 15px;left: 15px;width: 470px;height: 75px;"></div>
    <div class="hitbox" style="position: absolute;top: 394px;left: 462px;width: 23px;height: 1px;"></div>
    <div class="hitbox" style="position: absolute;top: 479px;left: 15px;width: 23px;height: 1px;"></div>
    <div class="hitbox" style="position: absolute;top: 819px;left: 15px;width: 23px;height: 1px;"></div>
    <div class="entrance" id="0" style="position: absolute;top: 904px;left: 429px;width: 57px;height: 125px;"></div>
    </div>
    `,
    name: `building3`
    },
}

//Function to change the screens
function ctrlScreen(HTML){
    game.innerHTML = HTML.code;
    window.location.name = HTML.name;
    if(HTML.name == "startMenu"){
        startMenu();
        continuing = true;
    }
    else{
        lastScreen = HTML;
    }
    if(HTML.name == "intro"){
        switchToIntroScreen();
        continuing = false;
    }
    if(HTML.name == "game"){
        startGameEngine();  
        continuing = false;
    }   
    if(HTML.name.includes("building")){
        if(!continuing){
        mapPlayerX = playerX;
        mapPlayerY = playerY;
        if(HTML.name == "building3"){
            playerY = -261.25
            playerX = -112.5
        }
        }
        else{
            startGameEngine();
        }
        continuing = false;
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
    if(document.querySelector(".enterButton")){
        enterButton = document.querySelector(".enterButton");
    }
    if(document.querySelector("#volume")){
        volume = document.querySelector("#volume");
    }
    if(document.querySelector(".textBox")){
        textBoxE = document.querySelector(".textBox");
    }
    if(document.querySelectorAll(".hitbox")){
        hitboxes = document.querySelectorAll(".hitbox");
    }
    if(document.querySelectorAll(".fade")){
        fadeElem = document.querySelectorAll(".fade")
    }
    if(document.querySelectorAll(".entrance")){
        entrances = document.querySelectorAll(".entrance")
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
    areElementsColliding: areElementsColliding,
    start_menu: start_menu,
    intro_screen: intro_screen,
    Mgame_screen: Mgame_screen,
    playerX: playerX,
    playerY: playerY
}