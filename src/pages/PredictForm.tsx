import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Slider } from '@/components/ui/slider';
import { predict } from '@/services/api';
import type { PredictionRequest, Geography, Gender, CardType } from '@/types/churn';
import { useToast } from '@/hooks/use-toast';

const PredictForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState<PredictionRequest>({
    CreditScore: 650,
    Geography: 'France',
    Gender: 'Male',
    Age: 35,
    Tenure: 5,
    Balance: 50000,
    NumOfProducts: 1,
    HasCrCard: true,
    IsActiveMember: true,
    Satisfaction_Score: 3,
    EstimatedSalary: 50000,
    Point_Earned: 500,
    CardType: 'SILVER',
  });

  const mutation = useMutation({
    mutationFn: predict,
    onSuccess: (data) => {
      navigate('/result', { state: { result: data } });
    },
    onError: () => {
      toast({
        title: 'Erro',
        description: 'Falha ao realizar a predição. Verifique se a API está rodando.',
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const updateField = <K extends keyof PredictionRequest>(
    field: K,
    value: PredictionRequest[K]
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <header className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar
          </Link>
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Nova Previsão
          </h1>
          <p className="mt-1 text-muted-foreground">
            Preencha os dados do cliente
          </p>
        </header>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Dados Pessoais */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="Gender">Gênero</Label>
                <Select
                  value={formData.Gender}
                  onValueChange={(v: Gender) => updateField('Gender', v)}
                >
                  <SelectTrigger id="Gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MALE">Masculino</SelectItem>
                    <SelectItem value="FEMALE">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="Age">Idade</Label>
                <Input
                  id="Age"
                  type="number"
                  min={18}
                  max={100}
                  value={formData.Age}
                  onChange={(e) => updateField('Age', Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="Geography">País</Label>
                <Select
                  value={formData.Geography}
                  onValueChange={(v: Geography) => updateField('Geography', v)}
                >
                  <SelectTrigger id="Geography">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="FRANCE">França</SelectItem>
                    <SelectItem value="SPAIN">Espanha</SelectItem>
                    <SelectItem value="GERMANY">Alemanha</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Dados Financeiros */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Dados Financeiros</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="CreditScore">Score de Crédito</Label>
                <Input
                  id="CreditScore"
                  type="number"
                  min={50}
                  max={850}
                  value={formData.CreditScore}
                  onChange={(e) => updateField('CreditScore', Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="balance">Saldo (€)</Label>
                <Input
                  id="balance"
                  type="number"
                  min={0}
                  value={formData.Balance}
                  onChange={(e) => updateField('Balance', Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="EstimatedSalary">Salário Estimado (€)</Label>
                <Input
                  id="EstimatedSalary"
                  type="number"
                  min={0}
                  value={formData.EstimatedSalary}
                  onChange={(e) => updateField('EstimatedSalary', Number(e.target.value))}
                />
              </div>
            </CardContent>
          </Card>

          {/* Relacionamento com o Banco */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Relacionamento com o Banco</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="Tenure">Tempo de Conta (anos)</Label>
                  <Input
                    id="Tenure"
                    type="number"
                    min={0}
                    max={50}
                    value={formData.Tenure}
                    onChange={(e) => updateField('Tenure', Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="NumOfProducts">Número de Produtos</Label>
                  <Input
                    id="NumOfProducts"
                    type="number"
                    min={1}
                    max={4}
                    value={formData.NumOfProducts}
                    onChange={(e) => updateField('NumOfProducts', Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="Point_Earned">Pontos Acumulados</Label>
                  <Input
                    id="Point_Earned"
                    type="number"
                    min={0}
                    value={formData.Point_Earned}
                    onChange={(e) => updateField('Point_Earned', Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="CardType">Tipo de Cartão</Label>
                <Select
                  value={formData.CardType}
                  onValueChange={(v: CardType) => updateField('CardType', v)}
                >
                  <SelectTrigger id="CardType" className="sm:w-48">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SILVER">Silver</SelectItem>
                    <SelectItem value="GOLD">Gold</SelectItem>
                    <SelectItem value="PLATINUM">Platinum</SelectItem>
                    <SelectItem value="DIAMOND">Diamond</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <div className="flex items-center gap-3">
                  <Switch
                    id="HasCrCard"
                    checked={formData.HasCrCard}
                    onCheckedChange={(v) => updateField('HasCrCard', v)}
                  />
                  <Label htmlFor="HasCrCard">Possui Cartão de Crédito</Label>
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    id="IsActiveMember"
                    checked={formData.IsActiveMember}
                    onCheckedChange={(v) => updateField('IsActiveMember', v)}
                  />
                  <Label htmlFor="IsActiveMember">Membro Ativo</Label>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Satisfação</Label>
                  <span className="text-sm text-muted-foreground">
                    {formData.Satisfaction_Score} / 5
                  </span>
                </div>
                <Slider
                  value={[formData.Satisfaction_Score]}
                  onValueChange={([v]) => updateField('Satisfaction_Score', v)}
                  min={1}
                  max={5}
                  step={1}
                  className="w-full"
                />
              </div>
            </CardContent>
          </Card>

          <Button type="submit" className="w-full" size="lg" disabled={mutation.isPending}>
            {mutation.isPending ? 'Calculando...' : 'Calcular Risco de Churn'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default PredictForm;
