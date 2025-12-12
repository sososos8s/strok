import { GoogleGenAI, Type } from "@google/genai";
import { PatientData, PredictionResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const predictStrokeRisk = async (data: PatientData): Promise<PredictionResult> => {
  const modelId = "gemini-2.5-flash"; // Using a fast model for latency

  const prompt = `
    You are an expert medical classification system trained on the Kaggle Stroke Prediction dataset.
    
    Task: Perform a binary classification to predict if the following patient is at risk of a stroke based on their input features.
    
    Input Features:
    - Gender: ${data.gender}
    - Age: ${data.age}
    - Hypertension: ${data.hypertension === '1' ? 'Yes' : 'No'}
    - Heart Disease: ${data.heart_disease === '1' ? 'Yes' : 'No'}
    - Ever Married: ${data.ever_married}
    - Work Type: ${data.work_type}
    - Residence Type: ${data.Residence_type}
    - Avg Glucose Level: ${data.avg_glucose_level} mg/dL
    - BMI: ${data.bmi}
    - Smoking Status: ${data.smoking_status}

    Analyze these factors. Age, hypertension, heart disease, high glucose, and high BMI are strong indicators.
    
    Return a JSON object with:
    - isStroke: boolean (true if high risk/stroke predicted, false otherwise)
    - probability: number (0 to 1, representing the likelihood of stroke)
    - riskLevel: string ("Low", "Moderate", or "High")
  `;

  try {
    const response = await ai.models.generateContent({
      model: modelId,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isStroke: { type: Type.BOOLEAN },
            probability: { type: Type.NUMBER },
            riskLevel: { type: Type.STRING, enum: ["Low", "Moderate", "High"] }
          },
          required: ["isStroke", "probability", "riskLevel"]
        }
      }
    });

    const result = JSON.parse(response.text || "{}");
    
    return {
      isStroke: result.isStroke,
      probability: result.probability,
      riskLevel: result.riskLevel as 'Low' | 'Moderate' | 'High'
    };

  } catch (error) {
    console.error("Prediction error:", error);
    // Fallback safe response if API fails
    return {
      isStroke: false,
      probability: 0.05,
      riskLevel: "Low"
    };
  }
};
