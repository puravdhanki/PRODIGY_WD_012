// DOM Elements
const display = document.querySelector('.display');
const startBtn = document.querySelector('.start');
const resetBtn = document.querySelector('.reset');
const lapBtn = document.querySelector('.lap-btn');
const lapTimes = document.querySelector('.lap-times');

// Variables
let startTime;
let elapsedTime = 0;
let timeInterval;
let isRunning = false;
let lapCount = 1;

// Start/Stop function
function startStop() {
    if (!isRunning) {
        // Start the stopwatch
        isRunning = true;
        startBtn.textContent = 'Pause';
        startBtn.classList.replace('start', 'pause');
        startTime = Date.now() - elapsedTime;
        timeInterval = setInterval(updateTime, 10);
    } else {
        // Pause the stopwatch
        isRunning = false;
        startBtn.textContent = 'Start';
        startBtn.classList.replace('pause', 'start');
        clearInterval(timeInterval);
    }
}

// Update time function
function updateTime() {
    elapsedTime = Date.now() - startTime;
    display.textContent = formatTime(elapsedTime);
}

// Format time function
function formatTime(time) {
    let minutes = Math.floor(time / (1000 * 60));
    let seconds = Math.floor((time % (1000 * 60)) / 1000);
    let milliseconds = Math.floor((time % 1000) / 10);

    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

// Reset function
function reset() {
    clearInterval(timeInterval);
    isRunning = false;
    startBtn.textContent = 'Start';
    startBtn.classList.replace('pause', 'start');
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapTimes.innerHTML = '';
    lapCount = 1;
}

// Lap function
function lap() {
    if (isRunning) {
        const lapTime = document.createElement('div');
        lapTime.classList.add('lap-time');
        lapTime.textContent = `Lap ${lapCount}: ${display.textContent}`;
        lapTimes.insertBefore(lapTime, lapTimes.firstChild);
        lapCount++;
    }
}

// Event listeners
startBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

// Keyboard shortcuts
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        startStop();
    } else if (e.code === 'KeyR') {
        reset();
    } else if (e.code === 'KeyL') {
        lap();
    }
});