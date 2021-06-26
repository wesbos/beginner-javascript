import { hslToRgb } from './utils';

const WIDTH = 1536;
const HEIGHT = 1536;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

canvas.width = WIDTH;
canvas.height = HEIGHT;
let analyzer;
let bufferLength;

function handleError(err) {
  console.log('needs mic access to proceed');
}

// get audio and data about freqs
async function getAudio() {
  // this is the same as getting webcam but we just want audio now
  const audioStream = await navigator.mediaDevices
    .getUserMedia({
      audio: true,
    })
    .catch(handleError);

  // get audio context
  const audioCtx = new AudioContext();

  // there are tons of cool methods available on AudioContext !
  analyzer = audioCtx.createAnalyser();

  // take source from stream and pipe through context, do operations, then pipe it out
  const source = audioCtx.createMediaStreamSource(audioStream);
  source.connect(analyzer);
  // how much data to collect?
  // .fftsize = fast fourier transform size (how much data to sample?)
  analyzer.fftSize = 2 ** 12;

  // pull the data off the audio into a Uint8Array
  // each item in the array can only be 8 bits / 1 byte with this.
  // it's also typed, so you can only put the specified type of data
  // how many pieces of data are there?
  bufferLength = analyzer.frequencyBinCount;
  const timeData = new Uint8Array(bufferLength);
  // console.log(timeData);
  const frequencyData = new Uint8Array(bufferLength);
  // console.log(frequencyData);

  drawTimeData(timeData);
  drawFrequency(frequencyData);
}

function drawTimeData(timeData) {
  // call method and pass data you want to inject into the array
  analyzer.getByteTimeDomainData(timeData);
  // console.log(timeData);
  // now that we have adata, lets visualize it
  // 1. clear canvas (TODO)
  ctx.clearRect(0, 0, WIDTH, HEIGHT);
  // 2. setup canvas drawing
  ctx.lineWidth = 2;
  ctx.strokeStyle = '#00ff00';
  ctx.beginPath();

  // find slice width of lines and bars based on width
  // canvas rounds pixel values automatically
  const sliceWidth = WIDTH / bufferLength;
  let x = 0;

  // loop over array, draw each peice to canvas
  timeData.forEach((data, index) => {
    const v = data / 128;
    const y = (v * HEIGHT) / 2.5;
    // draw lines
    if (index === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
      x += sliceWidth;
    }
  });

  ctx.stroke();

  // call itself ASAP with a request animation frame
  requestAnimationFrame(() => drawTimeData(timeData));
}

function drawFrequency(frequencyData) {
  // get freq data into array
  analyzer.getByteFrequencyData(frequencyData);
  // console.log(frequencyData);
  // the top end of frequencies is not useful, so lop it off here with a higher width
  const barWidth = (WIDTH / bufferLength) * 10;
  let x = 0;

  frequencyData.forEach((amount) => {
    // ranges from 0 to 255
    const percent = amount / 255;
    const [h, s, l] = [360 / (percent * 360) - 0.5, 0.8, 0.5];
    const barHeight = HEIGHT * percent * 0.6;
    // TODO : convert color to HSL
    // can't use HSL on the canvas! have to convert to RGB
    const [r, g, b] = hslToRgb(h, s, l);
    ctx.fillStyle = `rgb(${r},${g},${b})`;
    // fillRect takes four vars: x, y, width, height
    ctx.fillRect(x, HEIGHT - barHeight, barWidth, barHeight);
    x += barWidth + 2;
  });

  requestAnimationFrame(() => drawFrequency(frequencyData));
}
getAudio();
// draw the freq bars
// draw the time data
