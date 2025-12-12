import React from 'react';

interface PythonCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PythonCodeModal: React.FC<PythonCodeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const code = `import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score

# 1. Load the dataset
# The 'id' column is dropped as it is not predictive
df = pd.read_csv('healthcare-dataset-stroke-data.csv')
df = df.drop('id', axis=1)

# 2. Data Preprocessing
# Fill missing BMI values with mean
df['bmi'].fillna(df['bmi'].mean(), inplace=True)

# Encode categorical variables (Gender, Work Type, etc.)
encoder = LabelEncoder()
categorical_cols = ['gender', 'ever_married', 'work_type', 
                   'Residence_type', 'smoking_status']

for col in categorical_cols:
    df[col] = encoder.fit_transform(df[col])

# 3. Split Features (X) and Target (y)
X = df.drop('stroke', axis=1)
y = df['stroke']

# Split into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.2, random_state=42
)

# 4. Train the Model
# Using Logistic Regression for Binary Classification
model = LogisticRegression(max_iter=1000)
model.fit(X_train, y_train)

# 5. Make Predictions
predictions = model.predict(X_test)
probabilities = model.predict_proba(X_test)

print(f"Model Accuracy: {accuracy_score(y_test, predictions):.2f}")
print("Classification Report:\\n", probabilities)`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh]">
        
        <div className="flex items-center justify-between p-6 border-b border-slate-200">
          <div>
            <h2 className="text-xl font-bold text-slate-800">Python Implementation</h2>
            <p className="text-sm text-slate-500">Scikit-learn Binary Classification Logic</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="p-0 overflow-auto bg-slate-900">
          <pre className="p-6 text-sm font-mono text-emerald-400 leading-relaxed overflow-x-auto">
            <code>{code}</code>
          </pre>
        </div>

        <div className="p-6 border-t border-slate-200 bg-slate-50 rounded-b-xl flex justify-end">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 text-slate-800 font-medium rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default PythonCodeModal;
