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

//Closes options
function closeOptions(){
    options.style.opacity = "0";
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