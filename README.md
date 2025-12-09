# Cook AI PWA

Cook AI PWA é um sistema web progressivo para busca, organização e consulta de receitas culinárias, com integração a IA para resumo e tradução de receitas. O projeto utiliza React, Vite e diversas bibliotecas modernas para garantir performance, usabilidade e experiência mobile.

Repo da API: https://github.com/GuilhermeSsampaio/guisamp_project_apis

## Funcionalidades

- Busca de receitas por IA (Gemini)
- Listagem e visualização de receitas
- Login, registro e perfil de usuário
- Organização de receitas favoritas
- Interface responsiva e PWA (instalável)
- Modal de login, drawer de perfil, prompts de instalação

## Principais Bibliotecas e Tecnologias

### React

Framework principal para construção da interface, com componentes reutilizáveis e estado reativo.

### Vite

Ferramenta de build e desenvolvimento rápido, com HMR (Hot Module Replacement) e configuração simplificada.

### React Router

Gerencia as rotas e páginas do sistema, permitindo navegação SPA.

### Context API

Gerencia autenticação e estado global do usuário, facilitando acesso a dados em toda a aplicação.

### ESLint

Padroniza e garante qualidade do código, com regras customizadas para React.

### PWA (Progressive Web App)

Permite instalar o sistema no dispositivo, usar offline e receber notificações. Configurado via `manifest.json` e service workers (`registerSW.js`, `sw.js`).

### CSS Modules

Estilização modular e isolada para componentes, evitando conflitos de estilos.

### Axios/Fetch

Utilizado nos handlers para comunicação com APIs externas e backend.

### Gemini API (Google GenAI)

Integração via backend para resumir, traduzir e extrair informações de receitas automaticamente.

### BeautifulSoup & Cloudscraper (Backend)

Utilizados para scraping de páginas de receitas, extraindo o conteúdo principal para análise pela IA.

## Estrutura do Projeto

```
src/
  components/      # Componentes visuais e funcionais
  constants/       # Constantes e contextos globais
  contexts/        # Providers e hooks de autenticação
  handlers/        # Funções de comunicação com APIs e localStorage
  hooks/           # Hooks customizados
  pages/           # Páginas principais do sistema
  routes/          # Rotas protegidas e públicas
public/
  manifest.json    # Configuração PWA
  icons/           # Ícones para instalação
```

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
3. Acesse em `http://localhost:5173` (padrão Vite)

## Como usar como PWA

- Clique em "Instalar" no navegador ou use o prompt de instalação.
- O app funcionará offline e poderá ser adicionado à tela inicial do dispositivo.

## Como funciona a busca por IA

- O backend faz scraping da página de receita usando BeautifulSoup e Cloudscraper
- O texto extraído é enviado para a API Gemini, que resume, traduz e organiza os dados
- O frontend exibe o resultado formatado para o usuário

---

Projeto desenvolvido por Guilherme S. Sampaio
