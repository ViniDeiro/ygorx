const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * Script para pesquisar sobre YgorX Free Fire no Google
 * Coleta informações específicas sobre a carreira como jogador
 */
async function pesquisarYgorXFreeFire() {
  console.log('Iniciando pesquisa sobre YgorX no Free Fire...');
  
  // Iniciar o navegador
  const browser = await chromium.launch({
    headless: false,
    slowMo: 50
  });
  
  try {
    // Criar diretório para imagens e dados
    const dataDir = path.join(__dirname, '../public/data/free-fire');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const imgDir = path.join(__dirname, '../public/images/free-fire');
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }
    
    const page = await browser.newPage();
    
    // Pesquisar por YgorX Free Fire no Google
    console.log('\n=== Pesquisando por YgorX Free Fire no Google ===');
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
    await page.fill('input[name="q"]', 'YgorX jogador Free Fire Brasil pro player');
    await page.press('input[name="q"]', 'Enter');
    
    // Aguardar resultados
    await page.waitForLoadState('networkidle');
    
    // Extrair informações dos resultados
    console.log('\nResultados da pesquisa:');
    const resultTexts = await page.evaluate(() => {
      const results = [...document.querySelectorAll('h3')].slice(0, 10);
      return results.map(result => result.textContent);
    });
    
    resultTexts.forEach((text, index) => {
      console.log(`${index + 1}. ${text}`);
    });
    
    // Extrair snippets também
    const snippets = await page.evaluate(() => {
      const snippetElements = [...document.querySelectorAll('.VwiC3b')].slice(0, 10);
      return snippetElements.map(snippet => snippet.textContent);
    });
    
    // Combinar títulos e snippets
    const searchResults = resultTexts.map((title, i) => ({
      title,
      snippet: snippets[i] || ''
    }));
    
    // Salvar resultados em JSON
    fs.writeFileSync(
      path.join(dataDir, 'ygorx-free-fire-resultados.json'),
      JSON.stringify(searchResults, null, 2)
    );
    
    // Salvar screenshot dos resultados
    await page.screenshot({ path: path.join(imgDir, 'resultados-ygorx-free-fire.png'), fullPage: true });
    
    // Pesquisar por imagens
    console.log('\n=== Pesquisando imagens do YgorX Free Fire ===');
    await page.goto('https://www.google.com/imghp');
    await page.fill('input[name="q"]', 'YgorX jogador Free Fire');
    await page.press('input[name="q"]', 'Enter');
    
    // Aguardar carregamento das imagens
    await page.waitForLoadState('networkidle');
    
    // Salvar screenshot das imagens
    await page.screenshot({ path: path.join(imgDir, 'imagens-ygorx-free-fire.png'), fullPage: true });
    
    console.log('\nPesquisa finalizada! Resultados e imagens foram salvos.');
    
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
pesquisarYgorXFreeFire()
  .then(() => console.log('Processo de pesquisa finalizado com sucesso!'))
  .catch(err => console.error('Erro na execução:', err)); 