const { test, expect } = require('@playwright/test');

/**
 * Exemplo de teste automatizado usando Playwright
 * Este script testa a navegação e elementos básicos do site
 */

// Teste da página inicial
test('página inicial carrega corretamente', async ({ page }) => {
  // Navegação para a página inicial
  await page.goto('http://localhost:3000/');

  // Verificar se o título está correto
  await expect(page).toHaveTitle(/YgorX/);

  // Verificar se elementos principais estão presentes
  await expect(page.locator('h1')).toContainText('YgorX');
  await expect(page.locator('header')).toBeVisible();
  await expect(page.locator('footer')).toBeVisible();
});

// Teste de navegação
test('navegação do header funciona corretamente', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Clicar no link "Sobre" e verificar se rolou para a seção
  await page.click('text=Sobre');
  await expect(page.locator('#about')).toBeInViewport();

  // Clicar no link "Empresas" e verificar se rolou para a seção
  await page.click('text=Empresas');
  await expect(page.locator('#companies')).toBeInViewport();

  // Clicar no link "Contato" e verificar se rolou para a seção
  await page.click('text=Contato');
  await expect(page.locator('#contact')).toBeInViewport();
});

// Teste responsivo
test('site é responsivo em telas mobile', async ({ page }) => {
  // Configurar viewport para tamanho mobile
  await page.setViewportSize({ width: 375, height: 667 });
  
  await page.goto('http://localhost:3000/');

  // Verificar se o menu mobile está presente
  const menuButton = page.locator('.menuButton');
  await expect(menuButton).toBeVisible();

  // Abrir o menu mobile
  await menuButton.click();
  
  // Verificar se o menu está visível
  await expect(page.locator('.nav.active')).toBeVisible();
});

// Teste de componentes específicos
test('seção de empresas exibe todas as empresas', async ({ page }) => {
  await page.goto('http://localhost:3000/');

  // Verificar se a seção de empresas existe
  const companiesSection = page.locator('#companies');
  await expect(companiesSection).toBeVisible();

  // Verificar se existem 4 cards de empresas
  const companyCards = companiesSection.locator('.card');
  await expect(companyCards).toHaveCount(4);

  // Verificar se os nomes das empresas estão presentes
  await expect(companyCards.nth(0)).toContainText('YgorX Tech');
  await expect(companyCards.nth(1)).toContainText('YgorX Invest');
  await expect(companyCards.nth(2)).toContainText('YgorX Edu');
  await expect(companyCards.nth(3)).toContainText('YgorX Energy');
}); 