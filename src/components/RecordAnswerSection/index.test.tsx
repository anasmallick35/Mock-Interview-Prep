import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import Record from ".";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import * as faceapi from "face-api.js";
import "@testing-library/jest-dom";


jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

jest.mock("lucide-react", () => ({
  WebcamIcon: jest.fn(() => <svg data-testid="web-camera-icon"></svg>),
}));


jest.mock("sonner", () => ({
  toast: {
    error: jest.fn(),
  },
}));


jest.mock("react-webcam", () => ({
  __esModule: true,
  default: jest.fn(() => <div data-testid="webcam-mock"></div>),
}));

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
  
    // Simulate face detection
    fireEvent.click(screen.getByText(/Record Answer/i));
  
    // Wait for the warning message to appear
    await waitFor(() => {
     
      const warningElement = screen.getByText(/Warning!/i);
      expect(warningElement).toBeInTheDocument();
  
    
      const messageElement = screen.getByText(/More than one face detected/i);
      expect(messageElement).toBeInTheDocument();
    });
  });

  it("decrements session count on multiple face detection", async () => {
    (faceapi.detectAllFaces as jest.Mock).mockImplementation(async () => ({
      withFaceLandmarks: jest.fn(() => ({
        withFaceDescriptors: jest.fn(() => [1, 2]), 
      })),
    }));
  
    renderComponent();
  
    
    fireEvent.click(screen.getByText(/Record Answer/i));
  
    await waitFor(() => {
      const sessionCountElement = screen.getByText('You have 4 session left');
      expect(sessionCountElement).toBeInTheDocument();
    });
  });

  it("navigates to home page when session count reaches zero", async () => {
    (faceapi.detectAllFaces as jest.Mock).mockImplementation(async () => ({
      withFaceLandmarks: jest.fn(() => ({
        withFaceDescriptors: jest.fn(() => [1, 2]), // Simulate multiple faces
      })),
    }));
  
    // Render with only 1 session left
    renderComponent({ totalSession: 1 });
  
    // Simulate face detection
    fireEvent.click(screen.getByText(/Record Answer/i));
  
    // Wait for navigation to occur
    await waitFor(() => {
      expect(navigateMock).toHaveBeenCalledWith("/");
      expect(toast.error).toHaveBeenCalledWith("You cheated!");
    });
  });

  it("disables button during loading or multiple face detection", () => {
    renderComponent({ loading: true });
    const buttons = screen.getAllByRole("button");
    const disabledButton = buttons.find((button) => (button as HTMLButtonElement).disabled);
    expect(disabledButton).toBeInTheDocument();
  
    renderComponent({ isMultipleFacesDetected: true });
    const buttonsWithMultipleFaces = screen.getAllByRole("button");
    const disabledButtonWithMultipleFaces = buttonsWithMultipleFaces.find((button) => (button as HTMLButtonElement).disabled);
    expect(disabledButtonWithMultipleFaces).toBeInTheDocument();
  });
});