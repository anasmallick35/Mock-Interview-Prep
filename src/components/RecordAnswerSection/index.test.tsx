import { render, screen, waitFor } from "@testing-library/react";
import Record from ".";
import { useNavigate } from "react-router-dom";
import "@testing-library/jest-dom";
import * as faceapi from "face-api.js";

jest.mock("lucide-react", () => ({
  WebcamIcon: jest.fn(() => <svg data-testid="web-camera-icon"></svg>),
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

jest.mock("react-webcam", () => ({
  __esModule: true,
  default: () => <div data-testid="webcam-mock"></div>,
}));

jest.mock("face-api.js", () => ({
  nets: {
    ssdMobilenetv1: {
      loadFromUri: jest.fn(),
    },
    faceRecognitionNet: {
      loadFromUri: jest.fn(),
    },
    faceLandmark68Net: {
      loadFromUri: jest.fn(),
    },
  },
  detectAllFaces: jest.fn().mockReturnValue({
    withFaceLandmarks: jest.fn().mockReturnValue({
      withFaceDescriptors: jest.fn().mockResolvedValue([]),
    }),
  }),
}));

describe("Record Component", () => {
  const startStopRecordingMock = jest.fn();
  const confirmRecording = jest.fn();
  const discardRecording = jest.fn()
  const navigateMock = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders the component correctly", () => {
    render(
      <Record
        isRecording={false}
        loading={false}
        startStopRecording={startStopRecordingMock}
        audioURL={""}
        showConfirmation= {false} 
        confirmRecording = {confirmRecording} 
        discardRecording = {discardRecording}
      />
    );

    expect(screen.getByTestId("webcam-mock")).toBeInTheDocument();
    expect(screen.getByText("Record Answer")).toBeInTheDocument();
  });

  it("changes button text when recording", () => {
    render(
      <Record
        isRecording={true}
        loading={false}
        startStopRecording={startStopRecordingMock}
        audioURL={""}
        showConfirmation= {false} 
        confirmRecording = {confirmRecording} 
        discardRecording = {discardRecording}
      />
    );

    expect(screen.getByText("Stop Recording")).toBeInTheDocument();
  });


  it("disables button when loading or multiple faces are detected", async () => {
    render(
      <Record
        isRecording={false}
        loading={true}
        startStopRecording={startStopRecordingMock}
        audioURL={""}
        showConfirmation= {false} 
        confirmRecording = {confirmRecording} 
        discardRecording = {discardRecording}
      />
    );

    expect(screen.getAllByText("Record Answer")[0].closest("button")).toBeDisabled();

    (faceapi.detectAllFaces as jest.Mock).mockResolvedValue([{}, {}]);

    render(
      <Record
        isRecording={false}
        loading={false}
        startStopRecording={startStopRecordingMock}
        audioURL={""}
        showConfirmation= {false} 
        confirmRecording = {confirmRecording} 
        discardRecording = {discardRecording}
      />
    );

    await waitFor(() => {
      expect(screen.getAllByText("Record Answer")[0].closest("button")).toBeDisabled();
    });
  });

});