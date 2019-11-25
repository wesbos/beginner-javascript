import { hslToRgb } from './utils';

const WIDTH = 1500;
const HEIGHT = 1500;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = WIDTH;
canvas.height = HEIGHT;
let analyzer;
let bufferLength;

function handleError(err) {
  console.log('You must give access to your mic in order to proceed');
}

async function getAudio() {
  const stream = await navigator.mediaDevices
    .getUserMedia({ audio: true })
    .catch(handleError);
  const audioCtx = new AudioContext();
  analyzer = audioCtx.createAnalyser();
  const source = audioCtx.createMediaStreamSource(stream);
  source.connect(analyzer);
  // How much data should we collect
  analyzer.fftSize = 2 ** 8;
  // pull the data off the audio
  // how many pieces of data are there?!?
  bufferLength = analyzer.frequencyBinCount;
  const timeData = new Uint8Array(bufferLength);
  const frequencyData = new Uint8Array(bufferLength);
  drawTimeData(timeData);
  drawFrequency(frequencyData);
}

function drawTimeData(timeData) {
  // inject the time data into our timeData array
  analyzer.getByteTimeDomainData(timeData);
  // now that we have the data, lets turn it into something visual
  // 1. Clear the canvas TODO
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // 2. setup some canvas drawing
  ctx.lineWidth = 10;
  ctx.strokeStyle = '#ffc600';
  ctx.beginPath();
  const sliceWidth = WIDTH / bufferLength;
  let x = 0;
  timeData.forEach((data, i) => {
    const v = data / 128;
    const y = (v * HEIGHT) / 2;
    // draw our lines
    if (i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  });

  ctx.stroke();

  // call itself as soon as possible
  requestAnimationFrame(() => drawTimeData(timeData));
}

function drawFrequency(frequencyData) {
  // get the frequency data into our frequencyData array
  analyzer.getByteFrequencyData(frequencyData);
  // figure out the bar width
  const barWidth = (WIDTH / bufferLength) * 2.5;
  let x = 0;
  frequencyData.forEach(amount => {
    // 0 to 255
    const percent = amount / 255;
    const [h, s, l] = [360 / (percent * 360) - 0.5, 0.8, 0.5];
    const barHeight = HEIGHT * percent * 0.5;
    // TODO: Convert the colour to HSL TODO
    const [r, g, b] = hslToRgb(h, s, l);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    x += barWidth + 2;
  });

  requestAnimationFrame(() => drawFrequency(frequencyData));
}

getAudio();
