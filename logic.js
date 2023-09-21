document.addEventListener("DOMContentLoaded", function () {
  const background = document.querySelector(".background__img"),
    thumbnail = document.querySelector(".audio__player__top"),
    songArtist = document.querySelector(".artist"),
    songTitle = document.querySelector(".title"),
    playPause = document.querySelector(".play__pause__btn"),
    nextSong = document.querySelector(".next__btn"),
    prevSong = document.querySelector(".back__btn"),
    progressBar = document.getElementById("progress-bar"),
    defaultSong = document.querySelector(".song");

  let songs = ["assets/audio/beyonce.mp3", "assets/audio/dontstartnow.mp3"];
  let thumbnails = ["assets/img/lemonade.png", "assets/img/dontstartnow.png"];
  let songArtists = ["Beyonce", "Dua Lipa"];
  let songTitles = ["Don't Hurt Yourself", "Don't Start Now"];

  let isPlaying = false;
  let currentSongIndex = 0; // Track the currently playing song index

  playPause.addEventListener("click", checkIfPlaying);
  nextSong.addEventListener("click", followingSong);
  prevSong.addEventListener("click", previousSong);

  function checkIfPlaying() {
    if (isPlaying) {
      defaultSong.pause();
      isPlaying = false;
      thumbnail.style.transform = "scale(1)";
      playPause.src = "assets/svg/play.png";
    } else {
      defaultSong.play();
      isPlaying = true;
      thumbnail.style.transform = "scale(1.15)";
      playPause.src = "assets/svg/pause.png";
    }
  }

  function followingSong() {
    currentSongIndex++;
    if (currentSongIndex >= songs.length) {
      currentSongIndex = 0;
    }
    defaultSong.pause();
    background.src = thumbnails[currentSongIndex];
    thumbnail.src = thumbnails[currentSongIndex];
    songArtist.innerHTML = songArtists[currentSongIndex];
    songTitle.innerHTML = songTitles[currentSongIndex];
    defaultSong.src = songs[currentSongIndex];
    if (isPlaying) {
      defaultSong.play();
    }
  }

  function previousSong() {
    currentSongIndex--;
    if (currentSongIndex <= -1) {
      currentSongIndex = songs.length - 1; // Go back to the last song
    }
    defaultSong.pause();
    background.src = thumbnails[currentSongIndex];
    thumbnail.src = thumbnails[currentSongIndex];
    songArtist.innerHTML = songArtists[currentSongIndex];
    songTitle.innerHTML = songTitles[currentSongIndex];
    defaultSong.src = songs[currentSongIndex];
    if (isPlaying) {
      defaultSong.play();
    }
  }

  const durationTimeElement = document.querySelector(".durationTime");
  const currentTimeElement = document.querySelector(".currentTime");

  function updateProgressValue() {
    durationTimeElement.innerHTML = formatTime(
      Math.floor(defaultSong.duration)
    );
    currentTimeElement.innerHTML = formatTime(
      Math.floor(defaultSong.currentTime)
    );
    progressBar.value = defaultSong.currentTime;
    progressBar.max = defaultSong.duration;
  }

  function formatTime(timeInSeconds) {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds - minutes * 60);
    const formattedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;
    return `${minutes}:${formattedSeconds}`;
  }

  setInterval(updateProgressValue, 500);

  defaultSong.addEventListener("ended", function () {
    followingSong();
  });

  progressBar.addEventListener("click", changeProgressBar);

  function changeProgressBar() {
    defaultSong.currentTime = progressBar.value;
  }

  // Volume
  let volumeDisplay = false;

  const volumeBtn = document.querySelector(".volume");
  const volumeSlider = document.getElementById("volume-slider");

  volumeBtn.addEventListener("click", changePosition);
  volumeSlider.addEventListener("click", changeVolume);

  function changePosition() {
    if (volumeDisplay) {
      nextSong.style.display = "block";
      prevSong.style.display = "block";
      volumeSlider.style.display = "none";
      volumeDisplay = false;
    } else {
      nextSong.style.display = "none";
      prevSong.style.display = "none";
      volumeSlider.style.display = "block";
      volumeDisplay = true;
    }
  }

  function changeVolume() {
    defaultSong.volume = volumeSlider.value;
  }
});
