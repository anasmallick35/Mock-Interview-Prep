"use client";
import React from "react";
import Button from "../Button";
import Webcam from "react-webcam";
import { Mic, StopCircle } from "lucide-react";
import webCam from "@/assets/webcam.png";


interface RecordProps {
  isRecording: boolean;
  loading:boolean;
  startStopRecording:any;
}

const Record: React.FC<RecordProps> = ({isRecording,loading,startStopRecording }) => {
  

  return (
    <div className="flex items-center justify-center flex-col">
      <div className="flex flex-col my-20 justify-center bg-black items-center rounded-lg p-5">
        <img src={webCam} width={200} height={200} alt="webcam" className="absolute" />
        <Webcam mirrored={true} style={{ height: 300, width: "100%", zIndex: 10 }} />
      </div>
      <Button disabled={loading} className="my-1 bg-red-500" onClick={startStopRecording}>
        {isRecording ? (
          <h2 className="flex gap-2">
            <StopCircle /> Stop Recording
          </h2>
        ) : (
          <h2 className="flex gap-2 items-center">
            <Mic /> Record Answer
          </h2>
        )}
      </Button>
    </div>
  );
};

export default Record;
