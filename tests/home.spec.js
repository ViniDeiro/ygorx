const { test, expect } = require('@playwright/test');

test.describe('Página inicial', () => {
  test('deve carregar corretamente', async ({ page }) => {
    await page.goto('/');
    
    // Verificar o título da página
    await expect(page).toHaveTitle(/YgorX/);
    
    // Verificar elementos principais
    await expect(page.locator('h1.title')).toBeVisible();
    await expect(page.locator('header')).toBeVisible();
    await expect(page.locator('footer')).toBeVisible();
  });
  
  test('deve exibir todas as seções', async ({ page }) => {
    await page.goto('/');
    
    // Verificar se todas as seções estão presentes
    await expect(page.locator('#about')).toBeVisible();
    await expect(page.locator('#companies')).toBeVisible();
    await expect(page.locator('#contact')).toBeVisible();
  });
  
  test('deve ter links de navegação funcionando', async ({ page }) => {
    await page.goto('/');
    
    // Verificar links no header
    const navLinks = page.locator('.navLink');
    await expect(navLinks).toHaveCount(4); // Início, Sobre, Empresas, Contato
    
    // Verificar links no footer
    const footerLinks = page.locator('.links .link');
    await expect(footerLinks).toHaveCount(8); // 4 links principais + 4 empresas
  });
  
  test('exibe a seção Sobre com informações corretas', async ({ page }) => {
    await page.goto('/');
    
    const aboutSection = page.locator('#about');
    await expect(aboutSection).toBeVisible();
    await expect(aboutSection).toContainText('YgorX é um empresário visionário');
    
    // Verificar as métricas de conquistas
    const achievements = aboutSection.locator('.achievement');
    await expect(achievements).toHaveCount(3);
    await expect(achievements.nth(0)).toContainText('Empresas fundadas');
    await expect(achievements.nth(1)).toContainText('Empregos gerados');
    await expect(achievements.nth(2)).toContainText('Anos de experiência');
  });
  
  test('exibe a seção Empresas com todas as empresas', async ({ page }) => {
    await page.goto('/');
    
    const companyCards = page.locator('#companies .card');
    await expect(companyCards).toHaveCount(4);
    
    const companyNames = [
      'YgorX Tech',
      'YgorX Invest',
      'YgorX Edu',
      'YgorX Energy'
    ];
    
    // Verificar se cada empresa está presente
    for (let i = 0; i < companyNames.length; i++) {
      await expect(companyCards.nth(i)).toContainText(companyNames[i]);
    }
  });
}); 