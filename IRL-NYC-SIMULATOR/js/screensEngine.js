//Initializing varaibles
let start_menu = {
    code: `
    <div class="background" style="position: absolute; z-index: -1;"></div>
    <div class="on_top_of_background">
        <div class="title">Cracked</div>
        <div class="start_button" onclick="startGame()">start</div>
        <div class="option_button" onclick="openOptWindow()">options</div>
        <div class="options" style="opacity: 0;"><div class="x" onclick="closeOptions()">x</div>something</div>  
    </div>
    `,
    name: `startMenu`
}
let intro_screen = {
    code: `<video width="100%" height="100%" style="background:black;" autoplay>
    <source src="img/intro.mp4" type="video/mp4">
    Your browser does not support the video tag.
    </video>
    <div onclick="ctrlScreen(Mgame_screen)" class="skip">skip</div>
    `,
    name: `intro`
}
let Mgame_screen = {
    code: `
    <img src="img/player_front.png"class="player">
    <img class="map" src="img/map.png" style="left: 0%;top: 0%;">
    `,
    name: `game`
}

//Function to change the screens
function ctrlScreen(HTML){
    game.innerHTML = HTML.code;
    window.location.name = HTML.name
    if(HTML.name == "startMenu"){
        startBuildingsAnimation();
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
}