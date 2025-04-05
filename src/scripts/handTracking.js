// handTracking.js
const videoElement = document.getElementById('video');
const hands = new Hands(); // Initialize MediaPipe Hands

// Set hand tracking options
hands.setOptions({
  maxNumHands: 1,
  modelComplexity: 1,
  minDetectionConfidence: 0.5,
  minTrackingConfidence: 0.5,
});

// Handle hand landmark detection results
hands.onResults((results) => {
  if (results.multiHandLandmarks) {
    const handPosition = results.multiHandLandmarks[0]; // Get first hand's landmarks
    moveModelWithHand(handPosition);
  }
});

// Start camera feed
async function startCamera() {
  const stream = await navigator.mediaDevices.getUserMedia({
    video: true,
  });
  videoElement.srcObject = stream;

  // Process video frames with MediaPipe
  const camera = new Camera(videoElement, {
    onFrame: async () => {
      await hands.send({ image: videoElement });
    }
  });
  camera.start();
}

// Move the model based on hand landmarks
function moveModelWithHand(handLandmarks) {
  const x = handLandmarks[9].x * window.innerWidth;
  const y = handLandmarks[9].y * window.innerHeight;

  const model = document.querySelector('model-viewer');
  model.style.transform = `translate3d(${x}px, ${y}px, 0)`;
}

startCamera();
