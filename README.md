# 📊 ChurnInsight — Frontend

> Interface web para visualização e interação com o sistema **ChurnInsight** — uma aplicação completa que prevê churn de clientes usando Machine Learning e disponibiliza insights através de uma API backend.

Este projeto é a **camada frontend** construída em **React + TypeScript**, responsável por fornecer uma experiência visual para usuários consumirem a funcionalidade de previsão de churn e relatórios do sistema.

---

## 🚀 Visão Geral

O **ChurnInsight Frontend** faz parte de um ecossistema composto por:

| Componente          | Descrição                                                                                  |
| ------------------- | ------------------------------------------------------------------------------------------ |
| 🖥️ **Frontend**     | UI em React/TypeScript para interação com o usuário.                                        |
| ⚙️ **API Backend**  | Backend da aplicação  que expõe endpoints REST para consumo do frontend.                   |
| 🧠 **Modelo de ML** | Modelo de Machine Learning responsável pela previsão de churn.                             |

Repositórios relacionados:

* **Frontend:** [https://github.com/isaacmnss/churnInsight-frontend](https://github.com/isaacmnss/churnInsight-frontend)
* **API Backend:** [https://github.com/isaacmnss/churnInsight/](https://github.com/isaacmnss/churnInsight)
* **Modelo de ML:** [https://github.com/isaacmnss/churnInsight-model](https://github.com/isaacmnss/churnInsight-model)

---

## 🛠️ Tecnologias Utilizadas

* **React** (Vite)
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui**
* **Axios / Fetch API**
* **React Router**

---

## 🎯 Funcionalidades

* 📈 Consumo de previsões de churn fornecidas pela API
* 📊 Visualização de métricas e insights de clientes
* 🧪 Interação com o modelo de Machine Learning via backend
* 📱 Interface responsiva e moderna

> 💡 Toda a lógica de negócio, previsões e regras estão centralizadas no backend e no modelo de ML.

---

## 🧪 Pré-requisitos

Antes de rodar o projeto, certifique-se de ter:

* **Node.js 18+**
* **NPM ou Yarn**
* API Backend em execução
* Modelo de ML integrado corretamente ao backend

---

## 🚀 Como Rodar o Projeto

Clone o repositório:

```bash
git clone https://github.com/isaacmnss/churnInsight-frontend.git
cd churnInsight-frontend
```

Instale as dependências:

```bash
npm install
# ou
yarn
```

Execute o projeto em modo de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
```

Acesse no navegador:

```
http://localhost:5173
```

---

## 🔌 Integração com Backend e ML

### ⚙️ API Backend

Repositório:

```
https://github.com/isaacmnss/churnInsight
```

Responsável por:

* Expor endpoints REST
* Integrar o modelo de Machine Learning
* Retornar previsões e métricas para o frontend

### 🧠 Modelo de Machine Learning

Repositório:

```
https://github.com/isaacmnss/churnInsight-model
```

Responsável por:

* Treinamento do modelo
* Geração das previsões de churn
* Processamento dos dados de entrada

---

## 📦 Scripts Disponíveis

| Script            | Descrição                            |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Inicia o servidor de desenvolvimento |
| `npm run build`   | Gera build de produção               |
| `npm run preview` | Visualiza a build localmente         |

---


## ❤️ Agradecimentos

Projeto desenvolvido no contexto de um **Hackathon** promovido por Alura e Oracle durante o bootcamp Oracle Next Education

Agradecimentos especiais ao restante dos membros da equipe:

### Data Scientists

- Pedro Camargo

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/pedrocamargo1/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/Pdrnho)

- Suellen Costa


[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/suellensilva86)

- Antonio Sergio

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/asccjr/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/ASCCJR)

### Devs Backend

- Paulo Cruz

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/paulo-cruz-dev/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/PauloBrazilian)

- Isaaac Meneses

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?logo=linkedin&logoColor=white)](https://www.linkedin.com/in/isaac-meneses/)
[![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=white)](https://github.com/isaacmnss)