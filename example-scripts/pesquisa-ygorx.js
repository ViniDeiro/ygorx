const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * Script para pesquisar sobre YgorX no Google
 * Coleta informações, imagens e referências de layout
 */
async function pesquisarYgorX() {
  console.log('Iniciando pesquisa sobre YgorX...');
  
  // Iniciar o navegador
  const browser = await chromium.launch({
    headless: false,
    slowMo: 50
  });
  
  try {
    // Criar diretório para imagens
    const imgDir = path.join(__dirname, '../public/images/reference');
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }
    
    const page = await browser.newPage();
    
    // Pesquisar por YgorX no Google
    console.log('\n=== Pesquisando por YgorX no Google ===');
    await page.goto('https://www.google.com/');
    
    // Aceitar cookies se necessário (popup comum na Europa)
    try {
      const acceptButton = page.locator('button:has-text("Aceitar tudo")');
      if (await acceptButton.isVisible({ timeout: 3000 })) {
        await acceptButton.click();
      }
    } catch (e) {
      // Ignorar se não encontrar o botão
    }
    
    // Realizar a pesquisa
    await page.fill('input[name="q"]', 'YgorX empresário história sucesso');
    await page.press('input[name="q"]', 'Enter');
    
    // Aguardar resultados
    await page.waitForLoadState('networkidle');
    
    // Extrair informações dos resultados
    console.log('\nResultados da pesquisa:');
    const resultTexts = await page.evaluate(() => {
      const results = [...document.querySelectorAll('h3')].slice(0, 5);
      return results.map(result => result.textContent);
    });
    
    resultTexts.forEach((text, index) => {
      console.log(`${index + 1}. ${text}`);
    });
    
    // Salvar screenshot dos resultados
    await page.screenshot({ path: path.join(imgDir, 'resultados-ygorx.png') });
    
    // Pesquisar por imagens
    console.log('\n=== Pesquisando imagens do YgorX ===');
    await page.goto('https://www.google.com/imghp');
    await page.fill('input[name="q"]', 'YgorX empresário');
    await page.press('input[name="q"]', 'Enter');
    
    // Aguardar carregamento das imagens
    await page.waitForLoadState('networkidle');
    
    // Salvar screenshot das imagens
    await page.screenshot({ path: path.join(imgDir, 'imagens-ygorx.png') });
    
    // Clicar em algumas imagens e salvar
    console.log('Salvando referências de imagens...');
    await page.screenshot({ path: path.join(imgDir, 'imagens-referencia-1.png'), fullPage: true });
    
    // Pesquisar por layouts modernos para sites de empresários
    console.log('\n=== Pesquisando layouts para sites de empresários ===');
    await page.goto('https://www.google.com/search?q=melhores+layouts+site+empresário+moderna+2023&tbm=isch');
    
    // Aguardar carregamento
    await page.waitForLoadState('networkidle');
    
    // Salvar screenshot dos layouts
    await page.screenshot({ path: path.join(imgDir, 'layouts-referencia.png'), fullPage: true });
    
    // Buscar inspiração em sites de design
    console.log('\n=== Buscando inspiração em sites de design ===');
    
    // Behance
    console.log('Visitando Behance...');
    await page.goto('https://www.behance.net/search/projects?search=entrepreneur+website');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(imgDir, 'behance-inspiration.png'), fullPage: true });
    
    // Dribbble
    console.log('Visitando Dribbble...');
    await page.goto('https://dribbble.com/search/entrepreneur%20website');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(imgDir, 'dribbble-inspiration.png'), fullPage: true });
    
    // Awwwards
    console.log('Visitando Awwwards...');
    await page.goto('https://www.awwwards.com/websites/business/');
    await page.waitForLoadState('networkidle');
    await page.screenshot({ path: path.join(imgDir, 'awwwards-inspiration.png'), fullPage: true });
    
    console.log('\nPesquisa finalizada! Todas as referências foram salvas na pasta public/images/reference');
    
  } catch (error) {
    console.error('Erro durante a pesquisa:', error);
  } finally {
    // Aguardar alguns segundos antes de fechar
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Fechar o navegador
    await browser.close();
    console.log('\nNavegador fechado');
  }
}

// Executar pesquisa
pesquisarYgorX()
  .then(() => console.log('Processo de pesquisa finalizado com sucesso!'))
  .catch(err => console.error('Erro na execução:', err)); 