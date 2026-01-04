// Enums matching backend
export type Geography = 'France' | 'Spain' | 'Germany';
export type Gender = 'Male' | 'Female';
export type CardType = 'SILVER' | 'GOLD' | 'PLATINUM' | 'DIAMOND';

// Request DTO for prediction
export interface PredictionRequest {
  creditScore: number;
  geography: Geography;
  gender: Gender;
  age: number;
  tenure: number;
  balance: number;
  numOfProducts: number;
  hasCrCard: boolean;
  isActiveMember: boolean;
  satisfaction: number;
  estimatedSalary: number;
  pointsEarned: number;
  cardType: CardType;
}

// Response DTO from prediction
export interface PredictionResponse {
  churnProbability: number;
  willChurn: boolean;
  predictedAt: string;
}

// Stats response
export interface StatsResponse {
  numberOfPredictions: number;
  meanChurnProbability: number;
}
