import React, { useEffect, useRef } from "react";

const BiologyAR = () => {
  const arItems = [
    { title: "Heart", modelPath: "/models/humanheart.glb" },
    { title: "Digestive System", modelPath: "/models/digestivesystem.glb" },
    { title: "Skull", modelPath: "/models/skull.glb" },
    { title: "Brain", modelPath: "/models/humanbrain.glb" },
  ];

  const viewerRefs = useRef([]);

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    document.head.appendChild(script);
  }, []);

  const handleARView = (index) => {
    const viewer = viewerRefs.current[index];
    if (viewer && viewer.activateAR) {
      viewer.activateAR();
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
            className="backdrop-blur-md bg-white/20 border border-white/30 rounded-xl px-6 py-6 shadow-md text-center"
          >
            <h2 className="text-2xl font-semibold mb-4 text-[#3B82F6]">{item.title}</h2>
            <video id="video" width="640" height="480" style="display:none"></video>
            <model-viewer
              ref={(el) => (viewerRefs.current[index] = el)}
              src={item.modelPath}
              ar
              ar-modes="scene-viewer webxr quick-look"
              camera-controls
              style={{ display: "none" }}
            ></model-viewer>

            <button
              onClick={() => handleARView(index)}
              className="mt-4 px-6 py-2 bg-[#20C997] hover:bg-teal-600 text-white font-semibold rounded-md transition"
            >
              View in AR
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BiologyAR;
