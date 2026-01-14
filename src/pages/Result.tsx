import { useLocation, Navigate, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import type { PredictionResponse } from '@/types/churn';

const Result = () => {
  const location = useLocation();
  const result = location.state?.result as PredictionResponse | undefined;

  if (!result) {
    return <Navigate to="/" replace />;
  }

  const probability = result.churn_probability * 100;
  const riskLevel =
    probability < 30 ? 'low' : probability < 60 ? 'medium' : 'high';
  
  const riskConfig = {
    low: {
      label: 'Baixo Risco',
      color: 'text-success',
      bgColor: 'bg-success/10',
    },
    medium: {
      label: 'Risco Moderado',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
    },
    high: {
      label: 'Alto Risco',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10',
    },
  };

  const config = riskConfig[riskLevel];

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-lg">
        {/* Header */}
        <header className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Dashboard
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Resultado da Análise
          </h1>
        </header>

        <Card>
          <CardHeader className="text-center pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-wide">
              Probabilidade de Churn
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            {/* Main Probability */}
            <div className={`text-6xl font-semibold ${config.color}`}>
              {probability.toFixed(1)}%
            </div>

            {/* Risk Badge */}
            <div className="flex justify-center">
              <span
                className={`px-4 py-2 rounded-full text-sm font-medium ${config.bgColor} ${config.color}`}
              >
                {config.label}
              </span>
            </div>

            {/* Verdict */}
            <div className="pt-4 border-t border-border">
              <p className="text-lg">
                Veredito:{' '}
                <span className="font-semibold">
                  {result.prediction ? 'Vai cancelar' : 'Não vai cancelar'}
                </span>
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Analisado em{' '}
                {new Date(result.timeStamp).toLocaleString('pt-BR')}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Button asChild variant="outline" className="flex-1 gap-2">
            <Link to="/predict">
              <RefreshCw className="h-4 w-4" />
              Nova Previsão
            </Link>
          </Button>
          <Button asChild className="flex-1">
            <Link to="/">Dashboard</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Result;
