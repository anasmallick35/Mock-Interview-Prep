import { render, screen, waitFor } from "@testing-library/react";
import Record from ".";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as faceapi from "face-api.js";
import "@testing-library/jest-dom";



// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

// Mock the toast notification
jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));

// Mock the Webcam component
jest.mock("react-webcam", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="webcam-mock"></div>),
}));

// Mock the face-api.js
jest.mock("face-api.js", () => ({
  nets: {
    ssdMobilenetv1: { loadFromUri: jest.fn() },
    faceRecognitionNet: { loadFromUri: jest.fn() },
    faceLandmark68Net: { loadFromUri: jest.fn() },
  },
  detectAllFaces: jest.fn(async () => ({
    withFaceLandmarks: jest.fn(() => ({
      withFaceDescriptors: jest.fn(() => []),
    })),
  })),
}));

describe("Record Component", () => {
  const startStopRecordingMock = jest.fn();
  const navigateMock = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(navigateMock);
  });

  const renderComponent = (props = {}) => {
    const defaultProps = {
      isRecording: false,
      loading: false,
      startStopRecording: startStopRecordingMock,
    };
    return render(<Record {...defaultProps} {...props} />);
  };

  it("renders the component correctly", () => {
    renderComponent();
    expect(screen.getByTestId("webcam-mock")).toBeInTheDocument();
    expect(screen.getByText(/Record Answer/i)).toBeInTheDocument();
  });

  it("detects multiple faces and shows warning", async () => {
    (faceapi.detectAllFaces as jest.Mock).mockImplementation(async () => ({
      withFaceLandmarks: jest.fn(() => ({
        withFaceDescriptors: jest.fn(() => [1, 2]), // Simulate multiple faces
      })),
    }));

    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText(/Warning!/i)).toBeInTheDocument();
      expect(screen.getByText(/More than one face detected/i)).toBeInTheDocument();
    });
  });

  it("decrements session count on multiple face detection", async () => {
    (faceapi.detectAllFaces as jest.Mock).mockImplementation(async () => ({
      withFaceLandmarks: jest.fn(() => ({
        withFaceDescriptors: jest.fn(() => [1, 2]), // Simulate multiple faces
      })),
    }));

    renderComponent();
    
    await waitFor(() => {
      expect(screen.getByText(/You have 4 session left/i)).toBeInTheDocument();
    });
  });

  it("navigates to home page when session count reaches zero", async () => {
    (faceapi.detectAllFaces as jest.Mock).mockImplementation(async () => ({
      withFaceLandmarks: jest.fn(() => ({
        withFaceDescriptors: jest.fn(() => [1, 2]), // Simulate multiple faces
      })),
    }));

    renderComponent({ totalSession: 1 });

    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/");
      expect(toast.error).toHaveBeenCalledWith("You cheated!");
    });
  });

  it("disables button during loading or multiple face detection", () => {
    renderComponent({ loading: true });
    expect(screen.getByRole("button")).toBeDisabled();

    renderComponent({ isMultipleFacesDetected: true });
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
