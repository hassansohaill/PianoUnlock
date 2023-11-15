const WHITE_KEYS = ['C', 'D', 'E', 'F', 'G', 'A'];
const BLACK_KEYS = ['Db', 'Eb', 'Gb', 'Ab', 'Bb'];

const keys = document.querySelectorAll('.key');
const whiteKeys = document.querySelectorAll('.key.white');
const blackKeys = document.querySelectorAll('.key.black');
const lockScreen = document.querySelector('.lock-screen');
const errorMessage = document.querySelector('.error-message');
const piano = document.querySelector('.piano');
const homeScreen = document.querySelector('.home-screen');

const unlockMelody = ['C', 'Db', 'E', 'G', 'A'];

const playedNotes = [];
let wrongNotesCount = 0;

keys.forEach(key => {
  key.addEventListener('click', () => {
    playNote(key);
  });
});

document.addEventListener('keydown', e => {
  if (e.repeat) return;
  const key = e.key.toLowerCase();
  if (WHITE_KEYS.includes(key)) {
    const whiteKey = whiteKeys[WHITE_KEYS.indexOf(key)];
    playNote(whiteKey);
  } else if (BLACK_KEYS.includes(key)) {
    const blackKey = blackKeys[BLACK_KEYS.indexOf(key)];
    playNote(blackKey);
  }
});

function playNote(key) {
  const noteAudio = document.getElementById(key.dataset.note);
  if (noteAudio) {
    noteAudio.currentTime = 0;
    noteAudio.play();
    key.classList.add('active');
    noteAudio.addEventListener('ended', () => {
      key.classList.remove('active');
    });
    playedNotes.push(key.dataset.note);
    checkMelody();
  }
}

function checkMelody() {
  if (playedNotes.join('') === unlockMelody.join('')) {
    unlockPhone();
  } else if (playedNotes.length === 5) {
    wrongNotesCount++;
    if (wrongNotesCount >= 1) {
      errorMessage.innerText = 'Wrong Password. Try again.';
      alert('Incorrect password');
      errorMessage.style.display = 'block';
      playedNotes.length = 0;
      setTimeout(() => {
        errorMessage.style.display = 'none';
        wrongNotesCount = 0;
      }, 1000);
    } else {
      errorMessage.style.display = 'none';
      playedNotes.length = 0;
    }
  }
}

function unlockPhone() {
  lockScreen.style.display = 'none';
  piano.style.display = 'none';
  errorMessage.style.display = 'none';
  homeScreen.style.display = 'flex'; // Show the home screen
  alert('Phone unlocked!');
}
