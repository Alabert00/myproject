const menuBtn = document.querySelector(".menu-btn"),
    container = document.querySelector(".container");

const progressBar = document.querySelector(".bar"),
    progressDot = document.querySelector(".dot"),
    currentTimeeEl = document.querySelector(".current-time"),
    DurationEl = document.querySelector(".duration");


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
        title: "Fortnight",
        artist: "Taylor Swift",
        img_src: "01.jpg",
        src: "01.mp3",
    },
    {
        title: "The Tortured Poets Department",
        artist: "Taylor Swift",
        img_src: "02.jpg",
        src: "02.mp3",
    },
    {
        title: "My Boy Only Breaks His Favorite Toys",
        artist: "Taylor Swift",
        img_src: "03.jpg",
        src: "03.My Boy Only Breaks His Favorite Toys.mp3",
    },
    {
        title: "Down Bad",
        artist: "Taylor Swift",
        img_src: "04.jpg",
        src: "04.Down Bad.mp3",
    },  
    {
        title: "So Long, London",
        artist: "Taylor Swift",
        img_src: "05.jpg",
        src: "05.So Long, London.mp3",
    },  
    {
        title: "But Daddy I Love Him",
        artist: "Taylor Swift",
        img_src: "06.jpg",
        src: "06.But Daddy I Love Him.mp3",
    },    
    {
        title: "Fresh Out The Slammer",
        artist: "Taylor Swift",
        img_src: "07.jpg",
        src: "07.Fresh Out The Slammer.mp3",
    },
    {
        title: "Florida",
        artist: "Taylor Swift",
        img_src: "08.jpg",
        src: "08.Florida.mp3",
    }, 
    {
        title: "Guilty as Sin",
        artist: "Taylor Swift",
        img_src: "09.jpg",
        src: "09.Guilty as Sin.mp3",
    }, 
    {
        title: "Who's Afraid of Little Old Me",
        artist: "Taylor Swift",
        img_src: "10.jpg",
        src: "10.mp3",
    }, 
    {
        title: "I Can Fix Him (No Really I Can)",
        artist: "Taylor Swift",
        img_src: "11.jpg",
        src: "11.I Can Fix Him (No Really I Can).mp3",
    }, 
    {
        title: "loml",
        artist: "Taylor Swift",
        img_src: "12.jpg",
        src: "12.loml.mp3",
    }, 
    {
        title: "I Can Do It With a Broken Heart",
        artist: "Taylor Swift",
        img_src: "13.jpg",
        src: "13.I Can Do It With a Broken Heart.mp3",
    }, 
    {
        title: "The Smallest Man Who Ever Lived",
        artist: "Taylor Swift",
        img_src: "14.jpg",
        src: "14.The Smallest Man Who Ever Lived.mp3",
    }, 
    {
        title: "The Alchemy",
        artist: "Taylor Swift",
        img_src: "15.jpg",
        src: "15.The Alchemy.mp3",
    }, 
    {
        title: "Clara Bow",
        artist: "Taylor Swift",
        img_src: "16.jpg",
        src: "16.Clara Bow.mp3",
    }, 
    {
        title: "The Black Dog",
        artist: "Taylor Swift",
        img_src: "17.jpg",
        src: "17.The Black Dog.mp3",
    },
    {
        title: "imgonnagetyouback",
        artist: "Taylor Swift",
        img_src: "18.jpg",
        src: "18.imgonnagetyouback.mp3",
    },
    {
        title: "The Albatross",
        artist: "Taylor Swift",
        img_src: "19.jpg",
        src: "19.The Albatross.mp3",
    },
    {
        title: "Chloe or Sam or Sophia or Marcus",
        artist: "Taylor Swift",
        img_src: "20.jpg",
        src: "20.Chloe or Sam or Sophia or Marcus.mp3",
    },
    {
        title: "How Did It End",
        artist: "Taylor Swift",
        img_src: "21.jpg",
        src: "21.How Did It End.mp3",
    },
    {
        title: "So High School",
        artist: "Taylor Swift",
        img_src: "22.jpg",
        src: "22.So High School.mp3",
    },
    {
        title: "I Hate It Here",
        artist: "Taylor Swift",
        img_src: "23.jpg",
        src: "23.I Hate It Here.mp3",
    },
    {
        title: "thanK you aIMee",
        artist: "Taylor Swift",
        img_src: "24.jpg",
        src: "24.thanK you aIMee.mp3",
    },
    {
        title: "I Look in People's Windows",
        artist: "Taylor Swift",
        img_src: "25.jpg",
        src: "25.I Look in People's Windows.mp3",
    },
    {
        title: "The Prophecy",
        artist: "Taylor Swift",
        img_src: "26.jpg",
        src: "26.The Prophecy.mp3",
    },
    {
        title: "Cassandra",
        artist: "Taylor Swift",
        img_src: "27.jpg",
        src: "27.Cassandra.mp3",
    },
    {
        title: "Peter",
        artist: "Taylor Swift",
        img_src: "28.jpg",
        src: "28.Peter.mp3",
    },
    {
        title: "The Bolter",
        artist: "Taylor Swift",
        img_src: "29.jpg",
        src: "29.The Bolter.mp3",
    },
    {
        title: "Robin",
        artist: "Taylor Swift",
        img_src: "30.jpg",
        src: "30.Robin.mp3",
    },
    {
        title: "The Manuscript",
        artist: "Taylor Swift",
        img_src: "31.jpg",
        src: "31.The Manuscript.mp3",
    },
];

const playlistContainer = document.querySelector("#playlist"),
    infoWrapper = document.querySelector(".info"),
    coverImage = document.querySelector(".cover-image"),
    currentSongTitle = document.querySelector(".current-song-title"),
    currentFavourite = document.querySelector("#current-favourite");

function init() {
    updatePlaylist (songs);
    loadSong(0);
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

        tr.addEventListener("click" , (e) => {

            if (e.target.classList.contains("fa-heart")){
                addToFavourits(index);
                e.target.classList.toggle("active");
                return;
            }
            currentSong = index;
            loadSong(currentSong);
            audio.play();
            container.classList.remove("active");
            playPauseBtn.classList.replace("fa-play", "fa-pause");
            playing = true;
        })

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

    audio.src = `data/${songs[num].src}`;


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

playPauseBtn.addEventListener("click" , () => {
    if (playing) {
        playPauseBtn.classList.replace("fa-pause", "fa-play");
        playing = false;
        audio.pause();
    } else {
        playPauseBtn.classList.replace("fa-play", "fa-pause");
        playing = true;
        audio.play();
    }
});

function nextSong() {

    if (shuffle){
        shuffleFunc();
        loadSong(currentSong);
    } else if (currentSong < songs.length -1){
        currentSong++;
    } else {
        currentSong = 0;
    }
    loadSong(currentSong);

    if(playing){
        audio.play();
    }
}

nextBtn.addEventListener("click" , nextSong);

function prevSong() {

    if (shuffle){
        shuffleFunc();
        loadSong(currentSong);
    } else if (currentSong > 0){
        currentSong--;
    } else {
        currentSong = songs.length -1;
    }
    loadSong(currentSong);

    if(playing){
        audio.play();
    }
}

prevBtn.addEventListener("click" , prevSong);

function addToFavourits(index) {
    if(favourits.includes(index)){
        favourits = favourits.filter((item) => item !== index);
        currentFavourite.classList.remove("active");
    } else {
        favourits.push(index);

        if (index === currentSong){
            currentFavourite.classList.add("active");
        }
    }
    updatePlaylist(songs);
}

currentFavourite.addEventListener("click" , () => {
    currentFavourite.classList.toggle("active");
    addToFavourits(currentSong);
});

const shuffleBtn = document.querySelector("#shuffle");

function shuffleSongs() {
    shuffle = !shuffle;
    shuffleBtn.classList.toggle("active");
}

shuffleBtn.addEventListener("click" , shuffleSongs);

function shuffleFunc() {
    if (shuffle) {
        currentSong = Math.floor(Math.random()  * songs.length);
    } 
}

const repeatBtn = document.querySelector("#repeat");

function repeatSong() {
    if (repeat === 0) {
        repeat = 1;
        repeatBtn.classList.add("active");
    } else if (repeat === 1){
        repeat = 2;
        repeatBtn.classList.add("active");
    } else {
        repeat = 0;
        repeatBtn.classList.remove("active");
    }
}

repeatBtn.addEventListener("click", repeatSong);

audio.addEventListener("ended", () => {
    if (repeat === 1){
        loadSong(currentSong);
        audio.play();
    } else if (repeat === 2) {
        nextSong();
        audio.play();
    } else {
        if (currentSong === songs.length - 1){
            audio.pause();
            playPauseBtn.classList.replace("fa-pause", "fa-play");
            playing = false;
        } else {
            nextSong();
            audio.play();
        }
    }
});


function progress() {
    let { duration, currentTime } = audio;

    isNaN(duration) ? (duration = 0) : duration;
    isNaN(currentTime) ? (currentTime = 0) : currentTime;

    currentTimeeEl.innerHTML = formatTime(currentTime);
    DurationEl.innerHTML = formatTime(duration);

    let progressPercentage = (currentTime / duration) * 100;
    progressDot.style.left = `${progressPercentage}%`;
}

audio.addEventListener("timeupdate" , progress);

function setProgress (e){
    let width = this.clientWidth;
    let clickX = e.offsetX;
    let duration = audio.duration;
    audio.currentTime =  (clickX / width) * duration;
}

progressBar.addEventListener("click" , setProgress);