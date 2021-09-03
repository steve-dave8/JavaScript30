/* Get Our Elements */
const body = document.querySelector('body');
const player = document.querySelector('div.player');
const video = document.querySelector('.player__video.viewer');
const controls = document.querySelector('.player__controls');
const progress = document.querySelector('.progress');
const progressBar = document.querySelector('.progress__filled');
const btnPlay = document.querySelector('.player__button.toggle');
// const volume = document.querySelector('input[name=volume]');
// const playbackRate = document.querySelector('input[name=playbackRate]');
const screenToggle = document.querySelector('button.screen');

const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

/* Build out functions */
function togglePlay(){
    video.paused ? video.play() : video.pause();
}

function updateBtn(){
    const icon = this.paused ? '►' : '❚ ❚';
    btnPlay.textContent = icon;
}

function skip(){
    video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(e){
    video[e.target.name] = e.target.value;  
    if (e.target.name === "playbackRate"){
        e.target.title = `Playback Rate: ${e.target.value}x`;
    }
}

function handleProgress(){
    const percent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${percent}%`;
}

function scrub(e) {
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function toggleScreen(){
    body.classList.toggle('fullscreen');
    player.classList.toggle('fullscreen');
    let classList = screenToggle.children[0].classList;
    if (classList.contains('fa-expand')){
        classList.replace('fa-expand', 'fa-compress');
    } else {
        classList.replace('fa-compress', 'fa-expand');
    }
}

/* Hook up the event listeners */
window.addEventListener("load", handleProgress);
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && screenToggle.children[0].classList.contains('fa-compress')){
        toggleScreen();
    }
});

video.addEventListener("click", togglePlay);
video.addEventListener("play", updateBtn);
video.addEventListener("pause", updateBtn);
video.addEventListener("timeupdate", handleProgress);

btnPlay.addEventListener("click", togglePlay);

skipButtons.forEach(btn => btn.addEventListener("click", skip));

let selected = false;
ranges.forEach(range => range.addEventListener('mousedown', () => selected = true));
ranges.forEach(range => range.addEventListener('mouseup', () => selected = false));
ranges.forEach(range => range.addEventListener('mousemove', (e) => selected && handleRangeUpdate(e)));
ranges.forEach(range => range.addEventListener('change', (e) => handleRangeUpdate(e)));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);

screenToggle.addEventListener('click', toggleScreen);