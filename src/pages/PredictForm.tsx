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
    creditScore: 650,
    geography: 'France',
    gender: 'Male',
    age: 35,
    tenure: 5,
    balance: 50000,
    numOfProducts: 1,
    hasCrCard: true,
    isActiveMember: true,
    satisfaction: 3,
    estimatedSalary: 50000,
    pointsEarned: 500,
    cardType: 'SILVER',
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
                <Label htmlFor="gender">Gênero</Label>
                <Select
                  value={formData.gender}
                  onValueChange={(v: Gender) => updateField('gender', v)}
                >
                  <SelectTrigger id="gender">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Male">Masculino</SelectItem>
                    <SelectItem value="Female">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="age">Idade</Label>
                <Input
                  id="age"
                  type="number"
                  min={18}
                  max={100}
                  value={formData.age}
                  onChange={(e) => updateField('age', Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="geography">País</Label>
                <Select
                  value={formData.geography}
                  onValueChange={(v: Geography) => updateField('geography', v)}
                >
                  <SelectTrigger id="geography">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="France">França</SelectItem>
                    <SelectItem value="Spain">Espanha</SelectItem>
                    <SelectItem value="Germany">Alemanha</SelectItem>
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
                <Label htmlFor="creditScore">Score de Crédito</Label>
                <Input
                  id="creditScore"
                  type="number"
                  min={300}
                  max={850}
                  value={formData.creditScore}
                  onChange={(e) => updateField('creditScore', Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="balance">Saldo (€)</Label>
                <Input
                  id="balance"
                  type="number"
                  min={0}
                  value={formData.balance}
                  onChange={(e) => updateField('balance', Number(e.target.value))}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimatedSalary">Salário Estimado (€)</Label>
                <Input
                  id="estimatedSalary"
                  type="number"
                  min={0}
                  value={formData.estimatedSalary}
                  onChange={(e) => updateField('estimatedSalary', Number(e.target.value))}
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
                  <Label htmlFor="tenure">Tempo de Conta (anos)</Label>
                  <Input
                    id="tenure"
                    type="number"
                    min={0}
                    max={10}
                    value={formData.tenure}
                    onChange={(e) => updateField('tenure', Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="numOfProducts">Número de Produtos</Label>
                  <Input
                    id="numOfProducts"
                    type="number"
                    min={1}
                    max={4}
                    value={formData.numOfProducts}
                    onChange={(e) => updateField('numOfProducts', Number(e.target.value))}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pointsEarned">Pontos Acumulados</Label>
                  <Input
                    id="pointsEarned"
                    type="number"
                    min={0}
                    value={formData.pointsEarned}
                    onChange={(e) => updateField('pointsEarned', Number(e.target.value))}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardType">Tipo de Cartão</Label>
                <Select
                  value={formData.cardType}
                  onValueChange={(v: CardType) => updateField('cardType', v)}
                >
                  <SelectTrigger id="cardType" className="sm:w-48">
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
                    id="hasCrCard"
                    checked={formData.hasCrCard}
                    onCheckedChange={(v) => updateField('hasCrCard', v)}
                  />
                  <Label htmlFor="hasCrCard">Possui Cartão de Crédito</Label>
                </div>

                <div className="flex items-center gap-3">
                  <Switch
                    id="isActiveMember"
                    checked={formData.isActiveMember}
                    onCheckedChange={(v) => updateField('isActiveMember', v)}
                  />
                  <Label htmlFor="isActiveMember">Membro Ativo</Label>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Satisfação</Label>
                  <span className="text-sm text-muted-foreground">
                    {formData.satisfaction} / 5
                  </span>
                </div>
                <Slider
                  value={[formData.satisfaction]}
                  onValueChange={([v]) => updateField('satisfaction', v)}
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
