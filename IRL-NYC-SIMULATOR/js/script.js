//Initializing varaibles
let time = getRandomNumber(2501,7501);
let game = document.querySelector(".game");
let options = document.querySelector(".options");
let buildingsInterval;

let start_menu = {
    code: `
    <div class="background" style="position: absolute; z-index: -1;"></div>
    <div class="on_top_of_background">
        <div class="title">Cracked</div>
        <div class="start_button" onclick="startGame()">start</div>
        <div class="option_button" onclick="openWindow()">options</div>
        <div class="options" style="opacity: 0;">options <div class="x" onclick="closeOptions()">x</div></div>  
    </div>
    `,
    hash: `startMenu`
}
let intro_screen = {
    code: ``,
    hash: `intro`
}
let game_screen = {
    code: ``,
    hash: `game`
}

//Function to change the screens
function ctrlScreen(HTML){
    game.innerHTML = HTML.code;
    window.location.hash = HTML.hash
    if(HTML.hash == "startMenu"){
        buildingsInterval = setInterval(() => {
            time = getRandomNumber(2501,7501);
            let bac = document.querySelector(".background");
            let style = time/1000;
            bac.innerHTML = "";
            bac.innerHTML += `<img src="img/b${getRandomNumber(1,3)}.png" class="Building" style="animation: ${style}s Skyskrapers ease-out;">`;
        }, time);
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
    setTimeout(() => {
        game.style.opacity = "0";
        game.style.display = "none";
    }, 100);
}

//Opens options window
function openWindow(){
    reinitiateLET();
    options.style.opacity = "1";
}

//Closes options
function closeOptions(){
    options.style.opacity = "0";
}