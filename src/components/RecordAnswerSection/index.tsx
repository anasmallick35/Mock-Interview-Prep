import React, { useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import { FaMicrophone, FaStopCircle } from "react-icons/fa";
import Button from "../Button";
import { width, height } from "@/utils/constant";
import * as faceapi from "face-api.js";
import { FaExclamationTriangle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { WebcamIcon } from "lucide-react";

interface RecordProps {
  isRecording: boolean;
  loading: boolean;
  startStopRecording: any;
  audioURL: string;
  showConfirmation: boolean;
  confirmRecording: () => void;
  discardRecording: () => void;
}

const Record: React.FC<RecordProps> = ({
  isRecording,
  loading,
  startStopRecording,
  audioURL,
  showConfirmation,
  confirmRecording,
  discardRecording,
}) => {
  const webcamRef = useRef<Webcam>(null);
  const [isMultipleFacesDetected, setIsMultipleFacesDetected] = useState(false);
  const [isFaceDetectionReady, setIsFaceDetectionReady] = useState(false);
  const [totalSession, setTotalSession] = useState(5);

  const navigate = useNavigate();

  useEffect(() => {
    const loadModels = async () => {
      try {
        await Promise.all([
          faceapi.nets.ssdMobilenetv1.loadFromUri("/models"),
          faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
          faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
        ]);
        setIsFaceDetectionReady(true);
      } catch (error) {
        console.error("Error loading models:", error);
      }
    };

    loadModels();
  }, []);

  useEffect(() => {
    if (!isFaceDetectionReady || !webcamRef.current) return;
    const video = webcamRef.current.video;

    if (!video) return;

    const detectFaces = async () => {
      try {
        const detections = await faceapi
          .detectAllFaces(video)
          .withFaceLandmarks()
          .withFaceDescriptors();

        if (detections.length > 1) {
          setIsMultipleFacesDetected(true);
        } else {
          setIsMultipleFacesDetected(false);
        }
      } catch (error) {
        console.error("Error detecting faces:", error);
      }
    };
    const interval = setInterval(detectFaces, 1000);
    return () => clearInterval(interval);
  }, [isFaceDetectionReady]);

  useEffect(() => {
    if (isMultipleFacesDetected) {
      setTotalSession((prev) => prev - 1);
    }
  }, [isMultipleFacesDetected]);

  useEffect(() => {
    if (totalSession <= 0) {
      navigate("/");
      toast.error("You cheated!");
    }
  }, [totalSession]);

  return (
    <div className="flex items-center justify-center flex-col relative">
      {isRecording && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>
      )}

      {isMultipleFacesDetected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="bg-red-300 p-8 rounded-lg shadow-2xl text-center transform transition-all duration-300 ease-in-out animate-fade-in">
            <div className="flex justify-center mb-4">
              <FaExclamationTriangle className="text-white text-5xl" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-3">Warning!</h2>
            <p className="text-lg text-white mb-6">
              More than one face detected. Please ensure only one person is in
              the frame.
            </p>
            <i>You have {totalSession} session left</i>
          </div>
        </div>
      )}

{showConfirmation && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50 backdrop-blur-sm transition-all duration-300">
    <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-2xl shadow-2xl border border-gray-200 text-center animate-fade-in">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">🎤 Confirm Your Recording</h2>

      <div className="relative mb-4">
        <audio
          controls
          src={audioURL}
          className="w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
        >
          Your browser does not support the audio element.
        </audio>
      </div>

      <div className="flex justify-center gap-4 mt-6">
        <Button
          onClick={confirmRecording}
          className="bg-green-300 hover:bg-green-500 text-white px-5 py-2 rounded-lg transition-all duration-200"
        >
          ✅ Confirm
        </Button>
        <Button
          onClick={discardRecording}
          className="bg-red-300 hover:bg-red-500 text-white px-5 py-2 rounded-lg transition-all duration-200"
        >
          ❌ Discard
        </Button>
      </div>
    </div>
  </div>
)}


      <div className={`flex flex-col my-10 justify-center bg-black items-center rounded-lg p-5 ${isRecording ? "pointer-events-none opacity-50" : ""}`}>
        <WebcamIcon width={width} height={height} className="absolute text-white" />
        <Webcam
          ref={webcamRef}
          mirrored={true}
          style={{ height: 300, width: "100%", zIndex: 10 }}
          videoConstraints={{ facingMode: "user" }}
        />
      </div>

      <div className="z-50">
        <Button
          disabled={loading || isMultipleFacesDetected || showConfirmation}
          className="my-1 bg-red-500"
          onClick={startStopRecording}
        >
          {isRecording ? (
            <h2 className="flex gap-2">
              <FaStopCircle size={24} /> Stop Recording
            </h2>
          ) : (
            <h2 className="flex gap-2 items-center">
              <FaMicrophone size={24} /> Record Answer
            </h2>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Record;