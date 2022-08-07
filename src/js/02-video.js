import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);

let parsedCurrentTime = 0;

player.on('timeupdate', throttle(onPlay, 500));

const LOCALSTORAGE_KEY = 'videoplayer-current-time';

function onPlay(evt) {
  localStorage.setItem(LOCALSTORAGE_KEY, evt.seconds);
}
const currentTime = localStorage.getItem(LOCALSTORAGE_KEY);

function timeHandler(currentTime) {
  if (currentTime) {
    parsedCurrentTime = JSON.parse(currentTime);
  } else {
    parsedCurrentTime = 0;
  }
}

timeHandler(currentTime);

player.setCurrentTime(parsedCurrentTime);
