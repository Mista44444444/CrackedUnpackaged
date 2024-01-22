class Audio {
    //Tracks
    tracks = [
        document.querySelector(".audio1")
    ]

    constructor() { this.pauseAll(); this.play(0) }

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