const video = document.querySelector(".webcam");

const canvas = document.querySelector(".video");
const ctx = canvas.getContext("2d");

const faceCanvas = document.querySelector(".face");
const faceCtx = faceCanvas.getContext("2d");

const faceDetector = new FaceDetector();
// console.log(video, canvas, faceCanvas, faceDetector);

const SIZE = 10;
const SCALE = 1.5;

async function populateVideo() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: { width: 1280, height: 720 },
  });
  video.srcObject = stream;
  await video.play();

  //   console.log(video.videoWidth, video.videoHeight);
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;
  faceCanvas.height = video.videoWidth;
  faceCanvas.height = video.videoHeight;
}

async function detect() {
  const faces = await faceDetector.detect(video);
  console.log(faces);
  faces.forEach(drawFace);
  //   requestAnimationFrame(detect);
}

function drawFace(face) {
  const { width, height, top, left } = face.boundingBox;
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);
  ctx.strokeStyle = "#ffc600";
  ctx.lineWidth = 2;
  ctx.strokeRect(left, top, width, height);
}

function censor({ boundingBox: face }) {
  faceCtx.imageSmoothingEnabled = false;
  faceCtx.clearRect(0, 0, faceCanvas.width, faceCanvas.height);
  faceCtx.drawImage(
    video,
    face.x,
    face.y,
    face.width,
    face.height,
    face.x,
    face.y,
    SIZE,
    SIZE
  );

  const width = face.width * SCALE;
  const height = face.height * SCALE;

  faceCtx.drawImage(
    faceCanvas,
    face.x,
    face.y,
    SIZE,
    SIZE,
    face.x - (width - face.width) / 2,
    face.y - (height - face.height) / 2,
    width,
    height
  );
}

populateVideo().then(detect);
