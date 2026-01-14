import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { fetchStats } from '@/services/api';
import { BarChart3, TrendingUp, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { data: stats, isLoading, error } = useQuery({
    queryKey: ['stats'],
    queryFn: fetchStats,
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground">
            ChurnInsight
          </h1>
          <p className="mt-2 text-muted-foreground">
            Previsão de churn para clientes bancários
          </p>
        </header>

        {/* Stats Cards */}
        <div className="grid gap-6 md:grid-cols-2 mb-12">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Total de Previsões
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-8 w-20 bg-muted animate-pulse rounded" />
              ) : error ? (
                <p className="text-sm text-muted-foreground">Indisponível</p>
              ) : (
                <p className="text-3xl font-semibold">
                  {stats?.numeroDePrevisoes ?? 0}
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Churn Médio
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="h-8 w-20 bg-muted animate-pulse rounded" />
              ) : error ? (
                <p className="text-sm text-muted-foreground">Indisponível</p>
              ) : (
                <p className="text-3xl font-semibold">
                  {stats?.churnMedio !== undefined
                    ? `${(stats.churnMedio * 100).toFixed(1)}%`
                    : '0%'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <Button asChild size="lg" className="gap-2">
            <Link to="/predict">
              Nova Previsão
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
