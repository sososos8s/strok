export enum Gender {
  Male = 'Male',
  Female = 'Female',
  Other = 'Other'
}

export enum WorkType {
  Private = 'Private',
  SelfEmployed = 'Self-employed',
  GovtJob = 'Govt_job',
  Children = 'children',
  NeverWorked = 'Never_worked'
}

export enum ResidenceType {
  Urban = 'Urban',
  Rural = 'Rural'
}

export enum SmokingStatus {
  NeverSmoked = 'never smoked',
  FormerlySmoked = 'formerly smoked',
  Smokes = 'smokes',
  Unknown = 'Unknown'
}

export enum YesNo {
  Yes = 'Yes',
  No = 'No'
}

export enum BinaryCondition {
  No = '0',
  Yes = '1'
}

export interface PatientData {
  gender: Gender;
  age: string;
  hypertension: BinaryCondition;
  heart_disease: BinaryCondition;
  ever_married: YesNo;
  work_type: WorkType;
  Residence_type: ResidenceType;
  avg_glucose_level: string;
  bmi: string;
  smoking_status: SmokingStatus;
}

export interface PredictionResult {
  isStroke: boolean;
  probability: number;
  riskLevel: 'Low' | 'Moderate' | 'High';
  explanation?: string;
}
