# Site do Empresário YgorX

Este é o repositório do site oficial do empresário YgorX, um website informativo que apresenta sua história, empresas e projetos.

## Tecnologias Utilizadas

- **Next.js**: Framework React para renderização do lado do servidor
- **React**: Biblioteca para construção de interfaces
- **CSS Modules**: Para estilização modular e isolada
- **Playwright**: Para automação de navegador e testes

## Estrutura do Projeto

```
ygorx/
├── public/           # Arquivos estáticos
├── src/              # Código fonte
│   ├── components/   # Componentes React reutilizáveis
│   ├── pages/        # Páginas do Next.js
│   └── styles/       # Estilos globais e módulos CSS
├── next.config.js    # Configuração do Next.js
├── package.json      # Dependências e scripts
└── README.md         # Documentação do projeto
```

## Scripts Disponíveis

No diretório do projeto, você pode executar:

### `npm run dev`

Inicia o aplicativo no modo de desenvolvimento.
Abra [http://localhost:3000](http://localhost:3000) para visualizá-lo no navegador.

### `npm run build`

Compila o aplicativo para produção na pasta `.next`.

### `npm start`

Inicia o aplicativo no modo de produção.

## Uso do Playwright

O Playwright está configurado neste projeto para automação de navegador. Ele pode ser utilizado para:

- Testes e2e
- Web scraping
- Automação de tarefas no navegador

Para executar scripts com o Playwright:

```javascript
// exemplo.js
const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('https://example.com');
  // Automação e interação
  await browser.close();
})();
```

## Personalização

Para personalizar o site:

1. Adicione imagens reais na pasta `/public/images/`
2. Atualize os dados das empresas no arquivo `src/components/Companies.js`
3. Modifique as informações biográficas em `src/components/About.js`
4. Ajuste as cores no arquivo de variáveis CSS em `src/styles/globals.css` 