# Magnun Bank

Sistema de transações bancárias desenvolvido com React, TypeScript, Vite e Tailwind CSS. Aplicação completa com autenticação, transações PIX/TED, histórico e API mock.

## 🚀 Funcionalidades

### Autenticação
- **Login** com email e senha
- **Registro** de novos usuários
- **Autenticação JWT** com tokens seguros
- **Rotas protegidas** para usuários logados

### Transações
- **Transferências PIX** com chave PIX
- **Transferências TED** com dados bancários completos
- **Validação de senha** para cada transação
- **Atualização automática** do saldo
- **Resumo da transação** com protocolo

### Histórico e Saldo
- **Histórico completo** de transações
- **Filtros avançados** por tipo, período, data e valor
- **Ordenação** por data ou valor
- **Saldo em tempo real** em todas as telas
- **Formatação brasileira** de valores monetários

### Interface
- **Design responsivo** com Tailwind CSS
- **Navegação intuitiva** com menu lateral
- **Feedback visual** para ações do usuário
- **Loading states** e tratamento de erros

## 🛠️ Tecnologias

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **State Management**: React Context API
- **API Mock**: JSON Server
- **Testing**: Jest + React Testing Library
- **Package Manager**: npm

## 📦 Instalação

```bash
# Clone o repositório
git clone <repository-url>
cd test-magnun-bank

# Instale as dependências
npm install
```

## 🚀 Execução

### Desenvolvimento
```bash
# Inicia Vite + JSON Server simultaneamente
npm run dev
```

Acesse: http://localhost:5174

### Produção
```bash
# Build para produção
npm run build

# Preview da build
npm run preview
```

### Testes
```bash
# Executa todos os testes
npm test
```

## 📁 Estrutura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── Header.tsx      # Cabeçalho das páginas de auth
│   ├── Footer.tsx      # Rodapé das páginas de auth
│   └── Menu.tsx        # Menu de navegação principal
├── contexts/           # Contextos React
│   └── AuthContext.tsx # Contexto de autenticação
├── pages/              # Páginas da aplicação
│   ├── HomePage.tsx    # Página inicial
│   ├── LoginPage.tsx   # Login
│   ├── RegisterPage.tsx # Registro
│   ├── TransactionPage.tsx # Nova transação
│   └── HistoryPage.tsx # Histórico
├── routes/             # Configuração de rotas
│   ├── AppRoutes.tsx   # Rotas principais
│   └── PrivateRoute.tsx # Rota protegida
├── services/           # Serviços de API
│   └── api.ts         # Funções de comunicação com API
└── __tests__/         # Testes automatizados

mock-api/
└── db.json           # Banco de dados mock
```

## 🔧 Configuração

### Variáveis de Ambiente
O projeto usa configurações padrão:
- **Vite**: Porta 5173/5174
- **JSON Server**: Porta 3001
- **API URL**: http://localhost:3001

### Banco de Dados Mock
O `mock-api/db.json` contém:
- **Usuários** com saldo inicial
- **Transações** de exemplo
- **Estrutura** para PIX e TED

## 🧪 Testes

O projeto inclui testes automatizados para:
- Componentes React
- Hooks customizados
- Funções utilitárias
- Integração com API

```bash
# Executa testes em modo watch
npm test

# Executa testes uma vez
npm test -- --watchAll=false
```

## 🔒 Segurança

- **Autenticação JWT** para sessões seguras
- **Validação de senha** para transações
- **Rotas protegidas** para usuários autenticados
- **Sanitização** de dados de entrada

## 📱 Responsividade

- **Mobile-first** design
- **Breakpoints** otimizados
- **Interface adaptativa** para diferentes telas
- **Navegação touch-friendly**

## 🚀 Deploy

### Vercel (Recomendado)
```bash
# Instale Vercel CLI
npm i -g vercel

# Deploy
vercel
```

### Outras Plataformas
O projeto é compatível com:
- Netlify
- GitHub Pages
- AWS S3
- Qualquer servidor estático

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 🆘 Suporte

Para dúvidas ou problemas:
1. Verifique a documentação
2. Execute `npm test` para verificar se tudo está funcionando
3. Abra uma issue no repositório

---

**Magnun Bank** - Sistema de Transações Bancárias 🏦
