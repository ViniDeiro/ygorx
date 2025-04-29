// @ts-check
const { defineConfig, devices } = require('@playwright/test');

/**
 * Configuração do Playwright para testes
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
  testDir: './tests',
  /* Tempo máximo de execução para cada teste */
  timeout: 30 * 1000,
  /* Quantidade de falhas permitidas antes de parar */
  expect: {
    timeout: 5000
  },
  /* Relatório para cada teste */
  reporter: 'html',
  /* Configurações compartilhadas para todos os projetos */
  use: {
    /* Navegação baseada */
    baseURL: 'http://localhost:3000',
    /* Captura de screenshot em caso de falha */
    screenshot: 'only-on-failure',
    /* Coleta de rastreamento em caso de falha */
    trace: 'on-first-retry',
  },

  /* Configurações específicas de projetos */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    /* Testes em modo mobile */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },
  ],

  /* Configurações de servidor de desenvolvimento */
  webServer: {
    command: 'npm run dev',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
}); 