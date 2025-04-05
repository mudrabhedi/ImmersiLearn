import React, { useEffect, useRef, useState } from "react";
import { FaAtom, FaFlask, FaInfoCircle, FaMobileAlt } from "react-icons/fa";

const ChemistryAR = () => {
  const [isModelViewerLoaded, setIsModelViewerLoaded] = useState(false);
  const arItems = [
    { 
      title: "Oxygen", 
      modelPath: "/models/atom_oxygen.glb",
      icon: <FaAtom className="text-4xl text-blue-500 mb-3" />,
      description: "Explore the atomic structure of oxygen (O₂)"
    },
    { 
      title: "Glucose", 
      modelPath: "/models/glucosemolecule.glb",
      icon: <FaFlask className="text-4xl text-green-500 mb-3" />,
      description: "View the molecular structure of C₆H₁₂O₆"
    },
  ];

  const viewerRefs = useRef([]);

  useEffect(() => {
    if (document.querySelector('script[src*="model-viewer"]')) {
      setIsModelViewerLoaded(true);
      return;
    }

    const script = document.createElement("script");
    script.type = "module";
    script.src = "https://unpkg.com/@google/model-viewer/dist/model-viewer.min.js";
    script.onload = () => setIsModelViewerLoaded(true);
    document.head.appendChild(script);
    
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleARView = (index) => {
    if (!isModelViewerLoaded) {
      alert("AR viewer is still loading. Please try again in a moment.");
      return;
    }

    const viewer = viewerRefs.current[index];
    if (viewer && viewer.activateAR) {
      viewer.activateAR();
    } else {
      alert("AR not supported in your browser. Try Chrome on Android or Safari on iOS.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F0F9FF] to-[#E0F2FE] font-sans px-6 py-16">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#3B82F6] mb-3">Chemistry AR Models</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore interactive 3D models of chemical structures in augmented reality
          </p>
        </div>

        {/* Model Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {arItems.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-shadow duration-300"
            >
              {/* Model Preview */}
              <div className="h-48 bg-gray-100 flex items-center justify-center">
                {item.icon}
              </div>

              {/* Card Content */}
              <div className="p-5">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">{item.title}</h2>
                  <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                    AR Ready
                  </span>
                </div>
                
                <p className="text-sm text-gray-600 mb-4 flex items-start">
                  <FaInfoCircle className="text-blue-400 mr-2 mt-1 flex-shrink-0" />
                  {item.description}
                </p>

                <button
                  onClick={() => handleARView(index)}
                  className="w-full flex items-center justify-center py-2 px-4 bg-[#3B82F6] hover:bg-blue-700 text-white font-medium rounded-lg transition-colors"
                >
                  <FaMobileAlt className="mr-2" />
                  View in AR
                </button>
              </div>

              {/* Hidden Model Viewer */}
              <model-viewer
                ref={(el) => (viewerRefs.current[index] = el)}
                src={item.modelPath}
                ar
                ar-modes="scene-viewer webxr quick-look"
                camera-controls
                style={{ display: "none" }}
              ></model-viewer>
            </div>
          ))}
        </div>

        {/* AR Support Info */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-lg p-4 text-sm text-blue-800">
          <p className="flex items-start">
            <FaInfoCircle className="mr-2 mt-1 flex-shrink-0" />
            AR works best on mobile devices. For Android, use Chrome browser. For iOS, use Safari.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChemistryAR;