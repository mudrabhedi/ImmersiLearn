import React, { useEffect, useRef, useState } from "react";

const BiologyAR = () => {
  const arItems = [
    { title: "Heart", modelPath: "/models/humanheart.glb" },
    { title: "Digestive System", modelPath: "/models/digestivesystem.glb" },
    { title: "Skull", modelPath: "/models/skull.glb" },
    { title: "Brain", modelPath: "/models/humanbrain.glb" },
  ];

  const viewerRefs = useRef([]);
  const videoRef = useRef(null); // Reference to video element
  const canvasRef = useRef(null); // Reference to canvas for drawing landmarks
  const [handDetected, setHandDetected] = useState(false);
  const [isARActive, setIsARActive] = useState(false); // To track if AR is active

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    document.head.appendChild(script);

    // Load MediaPipe Hands for hand tracking
    const handTrackingScript = document.createElement("script");
    handTrackingScript.src = "https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.3.1626204891/mediapipe-hands.js";
    document.head.appendChild(handTrackingScript);

    handTrackingScript.onload = () => {
      // Do not initialize hand tracking until AR is activated
      if (isARActive) {
        setupHandTracking();
      }
    };

    return () => {
      document.head.removeChild(handTrackingScript);
    };
  }, [isARActive]); // Depend on isARActive state

  const setupHandTracking = () => {
    const videoElement = videoRef.current;
    const canvasElement = canvasRef.current;
    const ctx = canvasElement.getContext("2d");

    const hands = new window.Hands(); // MediaPipe Hands instance
    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 1,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    hands.onResults((results) => {
      if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
        const handLandmarks = results.multiHandLandmarks[0];
        setHandDetected(true);
        drawHandLandmarks(handLandmarks, ctx); // Draw hand landmarks on the canvas
        moveModelWithHand(handLandmarks);
      } else {
        setHandDetected(false);
      }
    });

    const startCamera = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
      });
      videoElement.srcObject = stream;

      const camera = new window.Camera(videoElement, {
        onFrame: async () => {
          await hands.send({ image: videoElement });
        },
      });
      camera.start();
    };

    startCamera();
  };

  const drawHandLandmarks = (handLandmarks, ctx) => {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height); // Clear previous frame

    handLandmarks.forEach((landmark) => {
      const x = landmark.x * ctx.canvas.width;
      const y = landmark.y * ctx.canvas.height;

      // Draw each point (landmark)
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, 2 * Math.PI);
      ctx.fillStyle = "red";
      ctx.fill();
    });
  };

  const moveModelWithHand = (handLandmarks) => {
    const x = handLandmarks[9].x * window.innerWidth;
    const y = handLandmarks[9].y * window.innerHeight;

    // Move the model based on hand position
    viewerRefs.current.forEach((viewer) => {
      if (viewer) {
        viewer.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
    });
  };

  const handleARView = (index) => {
    const viewer = viewerRefs.current[index];
    if (viewer && viewer.activateAR) {
      viewer.activateAR();
      setIsARActive(true); // Set AR active when "View in AR" is clicked
    } else {
      alert("AR not supported or model-viewer not loaded yet.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] font-sans text-white px-6 py-10">
      <h1 className="text-3xl font-extrabold text-center text-[#3B82F6] mb-10">Biology AR Models</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10">
        {arItems.map((item, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl px-6 py-6 shadow-md text-center relative"
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#3B82F6]">{item.title}</h2>
            <video
              ref={videoRef}
              id="video"
              width="640"
              height="480"
              style={{ display: "none" }}
            ></video>
            <canvas
              ref={canvasRef}
              width="640"
              height="480"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                zIndex: 1, // Layer the canvas above the AR model
                pointerEvents: "none", // Do not block clicks or interactions with the AR model
              }}
            ></canvas>
            <model-viewer
              ref={(el) => (viewerRefs.current[index] = el)}
              src={item.modelPath}
              ar
              ar-modes="scene-viewer webxr quick-look"
              camera-controls
              style={{
                position: "absolute", // Ensure it's positioned in the background
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
              }}
            ></model-viewer>

            <button
              onClick={() => handleARView(index)}
              className="mt-4 px-6 py-2 bg-[#20C997] hover:bg-teal-600 text-white font-semibold rounded-md transition"
            >
              View in AR
            </button>

            {/* Display hand detected or not */}
            {handDetected ? (
              <div className="text-green-500 mt-2">Hand Detected</div>
            ) : (
              <div className="text-red-500 mt-2">No Hand Detected</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiologyAR;
