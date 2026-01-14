// Enums matching backend
export type Geography = 'France' | 'Spain' | 'Germany';
export type Gender = 'Male' | 'Female';
export type CardType = 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';

// Request DTO for prediction
export interface PredictionRequest {
  CreditScore: number;
  Geography: Geography;
  Gender: Gender;
  Age: number;
  Tenure: number;
  Balance: number;
  NumOfProducts: number;
  HasCrCard: boolean;
  IsActiveMember: boolean;
  Satisfaction_Score: number;
  EstimatedSalary: number;
  Point_Earned: number;
  CardType: CardType;
}

// Response DTO from prediction
export interface PredictionResponse {
  churn_probability: number;
  prediction: boolean;
  risk_message: string,
  timeStamp: string;
}

// Stats response
export interface StatsResponse {
  numeroDePrevisoes: number;
  churnMedio: number;
}
