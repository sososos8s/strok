import { PatientData, Gender, WorkType, ResidenceType, SmokingStatus, YesNo, BinaryCondition } from './types';

export const INITIAL_PATIENT_DATA: PatientData = {
  gender: Gender.Male,
  age: '',
  hypertension: BinaryCondition.No,
  heart_disease: BinaryCondition.No,
  ever_married: YesNo.Yes,
  work_type: WorkType.Private,
  Residence_type: ResidenceType.Urban,
  avg_glucose_level: '',
  bmi: '',
  smoking_status: SmokingStatus.NeverSmoked
};

export const SAMPLE_PATIENT_DATA: PatientData = {
  gender: Gender.Male,
  age: '67',
  hypertension: BinaryCondition.No,
  heart_disease: BinaryCondition.Yes,
  ever_married: YesNo.Yes,
  work_type: WorkType.Private,
  Residence_type: ResidenceType.Urban,
  avg_glucose_level: '228.69',
  bmi: '36.6',
  smoking_status: SmokingStatus.FormerlySmoked
};
