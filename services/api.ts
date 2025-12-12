import { PatientData, PredictionResult } from "../types";

// The URL where your FastAPI Python server is running
const API_URL = "http://localhost:8000";

export const predictStrokeRisk = async (data: PatientData): Promise<PredictionResult> => {
  try {
    const response = await fetch(`${API_URL}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server error (${response.status}): ${errorText}`);
    }

    const result = await response.json();
    
    return {
      isStroke: result.isStroke,
      probability: result.probability,
      riskLevel: result.riskLevel
    };
  } catch (error) {
    console.error("API Connection Error:", error);
    alert(
      "Failed to connect to the backend server.\n\n" +
      "Please ensure the Python FastAPI server is running:\n" +
      "1. Install dependencies: pip install fastapi uvicorn pydantic\n" +
      "2. Run server: python main.py"
    );
    
    // Return a default error object so the app doesn't crash
    return {
      isStroke: false,
      probability: 0,
      riskLevel: "Low",
    };
  }
};
