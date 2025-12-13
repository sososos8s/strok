import streamlit as st
import pandas as pd
import joblib

# تحميل المودل
model = joblib.load('stroke_model.pkl')

st.title("Stroke Prediction App 🧠")
st.write("Enter patient details to predict the probability of stroke.")

# إنشاء فورم لإدخال البيانات
with st.form("patient_data"):
    col1, col2 = st.columns(2)
    
    with col1:
        gender = st.selectbox("Gender", ['Male', 'Female'])
        age = st.number_input("Age", min_value=0.0, max_value=120.0, value=30.0)
        hypertension = st.selectbox("Hypertension", [0, 1], format_func=lambda x: "Yes" if x == 1 else "No")
        heart_disease = st.selectbox("Heart Disease", [0, 1], format_func=lambda x: "Yes" if x == 1 else "No")
        ever_married = st.selectbox("Ever Married?", ['Yes', 'No'])
        
    with col2:
        work_type = st.selectbox("Work Type", ['Private', 'Self-employed', 'Govt_job', 'children', 'Never_worked'])
        residence_type = st.selectbox("Residence Type", ['Urban', 'Rural'])
        avg_glucose_level = st.number_input("Average Glucose Level", value=100.0)
        bmi = st.number_input("BMI", value=25.0)
        smoking_status = st.selectbox("Smoking Status", ['formerly smoked', 'never smoked', 'smokes', 'Unknown'])

    submit = st.form_submit_button("Predict")

if submit:
    # تجميع البيانات في DataFrame بنفس تنسيق التدريب
    input_data = pd.DataFrame({
        'gender': [gender],
        'age': [age],
        'hypertension': [hypertension],
        'heart_disease': [heart_disease],
        'ever_married': [ever_married],
        'work_type': [work_type],
        'Residence_type': [residence_type],
        'avg_glucose_level': [avg_glucose_level],
        'bmi': [bmi],
        'smoking_status': [smoking_status]
    })

    # التوقع
    prediction = model.predict(input_data)[0]
    probability = model.predict_proba(input_data)[0][1]

    if prediction == 1:
        st.error(f"⚠️ High Risk of Stroke! (Probability: {probability:.2%})")
    else:
        st.success(f"✅ Low Risk of Stroke. (Probability: {probability:.2%})")