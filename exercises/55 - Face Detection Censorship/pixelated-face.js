// The face detection does not work on all browsers and operating systems.
// If you are getting a `Face detection service unavailable` error or similar,
// it's possible that it won't work for you at the moment.

console.log('works.');

// adsf

// select all the elements on the page with document.querySelector

const video = document.querySelector('.webcam');
const canvas = document.querySelector('.video');
const ctx = canvas.getContext('2d');
const faceCanvas = document.querySelector('.face');
const faceCtx = faceCanvas.getContext('2d');
const faceDetector = new window.FaceDetector();
const optionsInputs = document.querySelectorAll(
  '.controls input[type="range"]'
);

const options = {
  SIZE: 9,
  SCALE: 1.35,
};

function handleOption(event) {
  const { value, name } = event.currentTarget;
  options[name] = parseFloat(value);
}

optionsInputs.forEach((input) => input.addEventListener('input', handleOption));

// write a function that will populate the user's video

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = stream;
  await video.play();
  // size the canvases to be same size as video
  console.log(video.videoWidth, video.videoHeight);
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.width = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

// by using a bundler you can't normally access variables in the browser console

// recursion is when a function calls itself

async function detect() {
  const faces = await faceDetector.detect(video);
  // console.log(faces.length);
  faces.forEach(drawFace);
  faces.forEach(censor);
  // ask the browser when the next animation frame is
  // and tell it to run detect for us
  requestAnimationFrame(detect);
}

function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.strokeStyle = `#00ff00`;
  ctx.lineWidth = `1px`;
  ctx.strokeRect(left, top, width, height);
}

// destructure and rename
function censor({ boundingBox: face }) {
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);

  // draw a super small face
  faceCtx.drawImage(
    // 5 source args
    video,
    face.x,
    face.y,
    face.width,
    face.height,
    // 4 draw args
    face.x,
    face.y,
    options.SIZE,
    options.SIZE
  );
  // take that face back out and draw at normal size

  const width = face.width * options.SCALE;
  const height = face.height * options.SCALE;

  faceCtx.drawImage(
    faceCanvas,
    face.x,
    face.y,
    options.SIZE,
    options.SIZE,
    face.x - (width - face.width) / 2,
    face.y - (height - face.height) / 2,
    width,
    height
  );
}

populateVideo().then(detect);
