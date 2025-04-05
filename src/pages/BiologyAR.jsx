import React, { useEffect } from "react";

const BiologyAR = () => {
  const arItems = [
    { title: "Heart", modelPath: "/models/humanheart.glb" },
    { title: "Digestive System", modelPath: "/models/digestivesystem.glb" },
    { title: "Skull", modelPath: "/models/skull.glb" },
    { title: "Brain", modelPath: "/models/humanbrain.glb" },
  ];

  useEffect(() => {
    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    document.head.appendChild(script);
  }, []);

  const handleARView = (modelPath) => {
    const a = document.createElement("a");
    a.setAttribute("rel", "ar");
    a.setAttribute("href", modelPath);
    a.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#06B6D4] to-[#3B82F6] text-white px-6 py-10">
      <h1 className="text-3xl font-bold text-center mb-10">Biology AR Models</h1>
      <div className="grid gap-10">
        {arItems.map((item, index) => (
          <div
            key={index}
            className="backdrop-blur-md bg-white/10 border border-white/30 rounded-xl px-6 py-6 shadow-md text-center"
          >
            <h2 className="text-2xl font-semibold mb-4">{item.title}</h2>

            {/* Hidden model-viewer just to comply with Android */}
            <model-viewer
              id={`modelViewer-${index}`}
              src={item.modelPath}
              ar
              ar-modes="scene-viewer webxr quick-look"
              style={{ display: "none" }}
            ></model-viewer>

            <button
              onClick={() => handleARView(item.modelPath)}
              className="mt-4 px-6 py-2 bg-[#EB5757] hover:bg-red-600 text-white font-semibold rounded-md transition"
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
