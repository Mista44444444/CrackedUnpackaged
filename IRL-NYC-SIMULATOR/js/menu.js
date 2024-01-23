//Initializing varaibles
let time = getRandomNumber(2501,7501);
let game = document.querySelector(".game");
let options = document.querySelector(".options");
let buildingsInterval;
let bac;
let introTimeout;
let musicTimeout = setInterval(() => {
    audio.reset(0);
    audio.play(0);
}, 9600);

//Starts the animation of buildings
function startBuildingsAnimation(){
    buildingsInterval = setInterval(() => {
        time = getRandomNumber(2501,7501);
        bac = document.querySelector(".background");
        let transition_time = time/1000;
        bac.innerHTML = "";
        bac.innerHTML += `<img src="img/b${getRandomNumber(1,3)}.png" class="Building" style="animation: ${transition_time}s Skyskrapers ease-out;">`;
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

//Closes options
function closeOptions(){
    options.style.opacity = "0";
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

//Switches to intro screen
function switchToIntroScreen(){
    clearInterval(buildingsInterval);
    game.style.display = "";
    game.style.opacity = "1";
    introTimeout = setTimeout(() => {
        ctrlScreen(Mgame_screen);
    }, 10000);
}