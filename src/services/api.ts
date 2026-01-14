import type { PredictionRequest, PredictionResponse, StatsResponse } from '@/types/churn';

const API_BASE_URL = 'http://localhost:8080/v1';

export async function fetchStats(): Promise<StatsResponse> {
  const response = await fetch(`${API_BASE_URL}/stats`);
  
  if (!response.ok) {
    throw new Error('Falha ao carregar estatísticas');
  }
  
  return response.json();
}

export async function predict(data: PredictionRequest): Promise<PredictionResponse> {
  const response = await fetch(`${API_BASE_URL}/prediction`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  
  if (!response.ok) {
    throw new Error('Falha ao realizar predição');
  }
  
  return response.json();
}
