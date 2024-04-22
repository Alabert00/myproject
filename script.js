const menuBtn = document.querySelector(".menu-btn"),
container = document.querySelector(".container");

menuBtn.addEventListener("click" , () => {
    container.classList.toggle("active");
});

let playing = false,
currentSong = 0,
shuffle = false,
repeat = false,
favourits = [],
audio = new Audio();

const songs = [
    {
        title: "song 1",
        artist: "artist song 1",
        img_src: "miyuki1.png",
        src: "song1.mp3",
    },
    {
        title: "song 2",
        artist: "artist song 2",
        img_src: "miyuki2.png",
        src: "song2.mp3",
    },
    {
        title: "song 3",
        artist: "artist song 3",
        img_src: "miyuki3.png",
        src: "song3.mp3",
    },    
];

const playlistContainer = document.querySelector("#playlist"),
    infoWrapper = document.querySelector(".info"),
    coverImage = document.querySelector(".cover-image"),
    currentSongTitle = document.querySelector(".current-song-title"),
    currentFavourite = document.querySelector(".current-favourite");

function init() {
    updatePlaylist (songs);
    loadSong(currentSong);
}

init();

function updatePlaylist (songs) {
    playlistContainer.innerHTML = "";

    songs.forEach((song, index) => {
        const { title, src } = song;
        const isFavourite = favourits.includes(index);
        const tr = document.createElement("tr");
        tr.classList.add("song");
        tr.innerHTML = `
            <td class="no">
                <h5>${index + 1}</h5>
            </td>
            <td class="title">
                <h6>${title}</h6>
            </td>
            <td class="length">
                <h5>2:03</h5>
            </td>
            <td>
                <i class="fas fa-heart ${ isFavourite ? "active" : "" }"></i>
            </td>
        `;

        playlistContainer.appendChild(tr);

        const audioForDuration = new Audio(`data/${src}`);
        audioForDuration.addEventListener("loadedmetadata", () => {
            const duration = audioForDuration.duration;

            let songDuration = formatTime(duration);
            tr.querySelector(".length h5").innerText = songDuration;
        });
    });   
}

function formatTime (time) {
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60);
    seconds = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutes}:${seconds}`;
}

function loadSong(num){
    infoWrapper.innerHTML = `
    <h2>${songs[num].title}</h2>
    <h3>${songs[num].artist}</h3>
    `;

    currentSongTitle.innerHTML = songs[num].title;
    coverImage.style.backgroundImage = `url(data/${songs[num].img_src})`;

    if (favourits.includes(num)){
        currentFavourite.classList.add("active");
    }
    else{
        currentFavourite.classList.remove("active");
    }
}

const playPauseBtn = document.querySelector("#playpause");
    nextBtn = document.querySelector("#next"),
    prevBtn = document.querySelector("#prev");

playPauseBtn.addEventListener("click",() => {
    if(playing){
        playPauseBtn.classList.replace("fa-pause", "fa-play");
        playing = false;
        audio.pause();
    } else {
        playPauseBtn.classList.replace("fa-play", "fa-pause");
        playing = true;
        audio.play();
    }
});