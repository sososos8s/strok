import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.pipeline import Pipeline
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.compose import ColumnTransformer
import joblib

# 1. تحميل البيانات
# تأكد أن اسم الملف مطابق للملف الموجود لديك
df = pd.read_csv('healthcare-dataset-stroke-data.csv')

# 2. تنظيف البيانات
# تحويل bmi إلى أرقام لأن فيها قيم "N/A"
df['bmi'] = pd.to_numeric(df['bmi'], errors='coerce')
# حذف عمود ID لأنه غير مفيد للتوقع
df = df.drop('id', axis=1)

# 3. فصل المتغيرات (X) عن النتيجة (y)
X = df.drop('stroke', axis=1)
y = df['stroke']

# 4. تحديد أنواع الأعمدة للمعالجة
numeric_features = ['age', 'avg_glucose_level', 'bmi']
categorical_features = ['gender', 'hypertension', 'heart_disease', 'ever_married', 'work_type', 'Residence_type', 'smoking_status']

# 5. بناء الـ Pipeline للمعالجة المسبقة
# للأرقام: نملأ القيم المفقودة بالمتوسط ونقوم بعمل Scaling
numeric_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='mean')),
    ('scaler', StandardScaler())
])

# للنصوص: نملأ القيم المفقودة (إن وجدت) ونحولها لأرقام (OneHotEncoding)
categorical_transformer = Pipeline(steps=[
    ('imputer', SimpleImputer(strategy='constant', fill_value='missing')),
    ('onehot', OneHotEncoder(handle_unknown='ignore'))
])

preprocessor = ColumnTransformer(
    transformers=[
        ('num', numeric_transformer, numeric_features),
        ('cat', categorical_transformer, categorical_features)
    ])

# 6. دمج المعالجة مع المودل (Random Forest)
model = Pipeline(steps=[('preprocessor', preprocessor),
                        ('classifier', RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42))])

# 7. تقسيم البيانات وتدريب المودل
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
model.fit(X_train, y_train)

# طباعة الدقة للتأكد
print("Model Score:", model.score(X_test, y_test))

# 8. حفظ المودل لاستخدامه لاحقاً
joblib.dump(model, 'stroke_model.pkl')
print("Model saved as stroke_model.pkl")