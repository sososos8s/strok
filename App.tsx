import React, { useState } from 'react';
import { 
  PatientData, 
  PredictionResult, 
  Gender, 
  WorkType, 
  ResidenceType, 
  SmokingStatus, 
  YesNo, 
  BinaryCondition 
} from './types';
import { INITIAL_PATIENT_DATA, SAMPLE_PATIENT_DATA } from './constants';
import { predictStrokeRisk } from './services/geminiService';
import InputField from './components/InputField';
import InputSelect from './components/InputSelect';

const App: React.FC = () => {
  const [formData, setFormData] = useState<PatientData>(INITIAL_PATIENT_DATA);
  const [prediction, setPrediction] = useState<PredictionResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData(INITIAL_PATIENT_DATA);
    setPrediction(null);
  };

  const handleLoadSample = () => {
    setFormData(SAMPLE_PATIENT_DATA);
    setPrediction(null);
  };

  const handlePredict = async () => {
    // Basic validation
    if (!formData.age || !formData.avg_glucose_level || !formData.bmi) {
      alert("Please fill in all numerical fields (Age, Glucose Level, BMI).");
      return;
    }

    setLoading(true);
    setPrediction(null);
    try {
      const result = await predictStrokeRisk(formData);
      setPrediction(result);
    } catch (error) {
      console.error(error);
      alert("An error occurred during prediction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-12">
      {/* 1) Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Stroke Prediction System</h1>
          </div>
          <div className="flex space-x-3">
            <button 
              onClick={handleReset}
              className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-white rounded-md transition-colors border border-transparent hover:border-slate-300"
            >
              Reset Form
            </button>
            <button 
              onClick={handleLoadSample}
              className="px-3 py-1.5 text-xs font-medium text-cyan-700 bg-white hover:bg-white rounded-md transition-colors border border-cyan-100 hover:border-cyan-300 shadow-sm"
            >
              Load Sample Data
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* 2) Input Form (Left Panel) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
              <div className="px-6 py-4 bg-white border-b border-slate-100 flex items-center">
                <span className="bg-cyan-600 w-1 h-4 rounded-full mr-2"></span>
                <h2 className="text-lg font-semibold text-slate-800">Patient Data Input</h2>
              </div>
              
              <div className="p-6 space-y-8">
                {/* A) Demographic Information */}
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">A) Demographic Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputSelect 
                      label="Gender" 
                      name="gender" 
                      value={formData.gender} 
                      onChange={handleInputChange} 
                      options={[
                        { label: 'Male', value: Gender.Male },
                        { label: 'Female', value: Gender.Female },
                        { label: 'Other', value: Gender.Other }
                      ]}
                    />
                    <InputField 
                      label="Age" 
                      name="age" 
                      type="number"
                      value={formData.age} 
                      onChange={handleInputChange} 
                      placeholder="e.g. 67"
                      required
                    />
                  </div>
                </section>

                {/* B) Work & Social Status */}
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">B) Work & Social Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <InputSelect 
                      label="Work Type" 
                      name="work_type" 
                      value={formData.work_type} 
                      onChange={handleInputChange} 
                      options={[
                        { label: 'Private', value: WorkType.Private },
                        { label: 'Self-employed', value: WorkType.SelfEmployed },
                        { label: 'Govt Job', value: WorkType.GovtJob },
                        { label: 'Children', value: WorkType.Children },
                        { label: 'Never Worked', value: WorkType.NeverWorked }
                      ]}
                    />
                    <InputSelect 
                      label="Residence Type" 
                      name="Residence_type" 
                      value={formData.Residence_type} 
                      onChange={handleInputChange} 
                      options={[
                        { label: 'Urban', value: ResidenceType.Urban },
                        { label: 'Rural', value: ResidenceType.Rural }
                      ]}
                    />
                    <InputSelect 
                      label="Ever Married" 
                      name="ever_married" 
                      value={formData.ever_married} 
                      onChange={handleInputChange} 
                      options={[
                        { label: 'Yes', value: YesNo.Yes },
                        { label: 'No', value: YesNo.No }
                      ]}
                    />
                  </div>
                </section>

                {/* C) Medical History */}
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">C) Medical History</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputSelect 
                      label="Hypertension" 
                      name="hypertension" 
                      value={formData.hypertension} 
                      onChange={handleInputChange} 
                      options={[
                        { label: '0 - No', value: BinaryCondition.No },
                        { label: '1 - Yes', value: BinaryCondition.Yes }
                      ]}
                    />
                    <InputSelect 
                      label="Heart Disease" 
                      name="heart_disease" 
                      value={formData.heart_disease} 
                      onChange={handleInputChange} 
                      options={[
                        { label: '0 - No', value: BinaryCondition.No },
                        { label: '1 - Yes', value: BinaryCondition.Yes }
                      ]}
                    />
                  </div>
                </section>

                {/* D) Clinical Measurements */}
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">D) Clinical Measurements</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InputField 
                      label="Avg Glucose Level" 
                      name="avg_glucose_level" 
                      type="number"
                      value={formData.avg_glucose_level} 
                      onChange={handleInputChange} 
                      placeholder="e.g. 228.69"
                      description="Average blood sugar level in mg/dL"
                      required
                    />
                    <InputField 
                      label="BMI" 
                      name="bmi" 
                      type="number"
                      value={formData.bmi} 
                      onChange={handleInputChange} 
                      placeholder="e.g. 36.6"
                      description="Body Mass Index"
                      required
                    />
                  </div>
                </section>

                {/* E) Lifestyle */}
                <section>
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 border-b border-slate-100 pb-2">E) Lifestyle</h3>
                  <div className="grid grid-cols-1 gap-4">
                    <InputSelect 
                      label="Smoking Status" 
                      name="smoking_status" 
                      value={formData.smoking_status} 
                      onChange={handleInputChange} 
                      options={[
                        { label: 'Never Smoked', value: SmokingStatus.NeverSmoked },
                        { label: 'Formerly Smoked', value: SmokingStatus.FormerlySmoked },
                        { label: 'Smokes', value: SmokingStatus.Smokes },
                        { label: 'Unknown', value: SmokingStatus.Unknown }
                      ]}
                    />
                  </div>
                </section>
              </div>

              {/* 3) Action Button */}
              <div className="p-6 bg-white border-t border-slate-100">
                <button
                  onClick={handlePredict}
                  disabled={loading}
                  className={`w-full py-4 rounded-lg text-white font-bold text-lg shadow-md transition-all 
                    ${loading ? 'bg-slate-400 cursor-not-allowed' : 'bg-red-600 hover:bg-red-700 hover:shadow-lg active:scale-[0.99]'}
                  `}
                >
                  {loading ? (
                    <span className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing Classification...</span>
                    </span>
                  ) : (
                    "Predict Stroke"
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* 4) Output Panel (Right Panel) */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            {prediction ? (
              <div className="bg-white rounded-xl shadow-lg border border-slate-200 overflow-hidden animate-fade-in-up">
                {/* Result Header - Fixed to white bg and slate border */}
                <div className={`px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-white`}>
                  <h2 className="text-lg font-bold text-slate-800">Classification Result</h2>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide ${prediction.isStroke ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                    Confirmed
                  </span>
                </div>

                <div className="p-8 text-center space-y-8">
                  {/* Prediction Result */}
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">Prediction</p>
                    <div className={`text-5xl font-black ${prediction.isStroke ? 'text-red-600' : 'text-green-600'}`}>
                      Stroke: {prediction.isStroke ? 'YES' : 'NO'}
                    </div>
                  </div>

                  {/* Probabilities - Progress bar track changed to white with border */}
                  <div className="bg-white rounded-lg p-6 border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-end mb-2">
                      <span className="text-sm font-medium text-slate-600">Stroke Probability</span>
                      <span className="text-xl font-bold text-slate-900">{(prediction.probability).toFixed(2)}</span>
                    </div>
                    <div className="w-full bg-white border border-slate-200 rounded-full h-2.5 mb-4">
                      <div 
                        className={`h-2.5 rounded-full transition-all duration-1000 -mt-[1px] ${prediction.isStroke ? 'bg-red-500' : 'bg-green-500'}`} 
                        style={{ width: `${prediction.probability * 100}%` }}
                      ></div>
                    </div>
                    
                    <div className="flex justify-between items-end border-t border-slate-100 pt-4 mt-2">
                      <span className="text-sm font-medium text-slate-600">No-Stroke Probability</span>
                      <span className="text-xl font-bold text-slate-900">{(1 - prediction.probability).toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Risk Level */}
                  <div>
                    <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest mb-2">Risk Assessment</p>
                    <div className={`inline-block px-6 py-2 rounded-lg text-lg font-bold border ${
                      prediction.riskLevel === 'High' ? 'bg-white text-red-800 border-red-200' :
                      prediction.riskLevel === 'Moderate' ? 'bg-white text-yellow-800 border-yellow-200' :
                      'bg-white text-green-800 border-green-200'
                    }`}>
                      {prediction.riskLevel} Risk
                    </div>
                  </div>
                </div>

                {/* Disclaimer */}
                <div className="p-4 bg-white border-t border-slate-100 text-center">
                  <p className="text-xs text-slate-400 italic">
                    ⚠️ This system is for educational purposes only and does not replace professional medical diagnosis.
                  </p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-12 text-center h-full flex flex-col justify-center items-center text-slate-400">
                <svg className="w-16 h-16 mb-4 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                </svg>
                <h3 className="text-lg font-medium text-slate-500">No Prediction Yet</h3>
                <p className="text-sm mt-2">Fill out the patient form and click "Predict Stroke" to see the classification results.</p>
              </div>
            )}
          </div>

        </div>
      </main>

      {/* 5) Footer */}
      <footer className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 text-center text-slate-400 text-sm border-t border-slate-200 mt-8">
        <p>&copy; 2025 Stroke Prediction System</p>
      </footer>
    </div>
  );
};

export default App;