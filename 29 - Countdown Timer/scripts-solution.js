// Get elements:
const time_left = document.querySelector('.display__time-left');
let timer_buttons = Array.from(document.getElementsByClassName('timer__button'));
const time_form = document.getElementById('custom');
const end_time = document.querySelector('.display__end-time');

// Make functions:
let countDown; 

function setTimer(e){
    e.preventDefault();
    let min, sec, time;
    if (e.target.dataset.time){
        time = e.target.dataset.time;
        min = Math.floor(time/60);
        sec = time%60;
        if (sec < 10) sec = `0${sec}`;
        time_left.innerText = `${min}:${sec}`;
        document.title = `Countdown Timer ${min}:${sec}`;
    }
    if (e.target.id === "custom"){
        time = parseInt(time_form.elements['minutes'].value);
        if (!time) return;
        min = time;
        sec = "00";
        time_left.innerText = `${min}:${sec}`;
        document.title = `Countdown Timer ${min}:${sec}`;
    }
    setEndTime(min, sec);
    startTimer(min, sec);
};

function startTimer(min, sec){
    clearInterval(countDown);
    countDown = setInterval(() => {
        sec = parseInt(sec);
        sec--;
        if (sec < 10 && sec >= 0) sec = `0${sec}`;
        if (sec < 0){
            sec = 59;
            min = parseInt(min);
            min--;
        }
        time_left.innerText = `${min}:${sec}`;
        document.title = `Countdown Timer ${min}:${sec}`;
        if (time_left.innerText === "0:00") clearInterval(countDown);
    }, 1000);
};

function setEndTime(min, sec){
    const now = new Date();
    const nowHH = now.getHours();
    const nowMM = now.getMinutes();
    const nowSS = now.getSeconds();
    let apm, endHH, endMM, endSS;
    min = parseInt(min);
    sec = parseInt(sec);

    endSS = nowSS + sec;
    endMM = nowMM + min;
    endHH = nowHH;
    if (endSS >= 60){
        let addMM = Math.floor(endSS/60);
        endMM += addMM;
    }
    if (endMM >= 60){
        let addHH = Math.floor(endMM/60);
        endMM = endMM%60;      
        endHH += addHH;
    }
    if (endHH >= 24){
        endHH -= 24;
    }

    if (endHH > 12){
        endHH -= 12;
        apm = "pm";
    } else {
        apm = "am"
    }

    if (endHH == 0) endHH = 12;
    if (endMM < 10) endMM = `0${endMM}`;

    end_time.innerText = `Be back at ${endHH}:${endMM} ${apm}`;
};

// Set up event listeners:
timer_buttons.forEach(btn => btn.addEventListener('click', setTimer));

time_form.addEventListener('submit', setTimer);