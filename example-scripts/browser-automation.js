const { chromium } = require('playwright');

/**
 * Exemplo de automação usando o navegador padrão do Playwright
 * Este script usa o Chrome/Chromium gerenciado pelo próprio Playwright
 */
async function automateBrowser() {
  console.log('Iniciando automação com navegador...');
  
  // Iniciar o navegador padrão do Playwright
  const browser = await chromium.launch({
    headless: false, // Mostrar a interface do navegador
    slowMo: 100 // Desacelerar para melhor visualização
  });
  
  try {
    // Criar uma nova página
    const page = await browser.newPage();
    
    // Navegar para um site
    console.log('Navegando para o Google...');
    await page.goto('https://www.google.com/');
    
    // Realizar uma pesquisa
    await page.fill('input[name="q"]', 'YgorX empresário');
    await page.press('input[name="q"]', 'Enter');
    
    // Aguardar pelos resultados da pesquisa
    await page.waitForSelector('h3');
    
    // Clicar no primeiro resultado
    console.log('Clicando no primeiro resultado...');
    await page.click('h3', { delay: 500 });
    
    // Aguardar a navegação para a próxima página
    await page.waitForLoadState('networkidle');
    
    // Tirar um screenshot da página
    console.log('Tirando screenshot...');
    await page.screenshot({ path: 'resultado-navegacao.png', fullPage: true });
    
    // Obter e mostrar o título da página
    const title = await page.title();
    console.log(`Título da página: ${title}`);
    
    // Aguardar alguns segundos para visualização
    console.log('Aguardando alguns segundos...');
    await new Promise(resolve => setTimeout(resolve, 5000));
    
  } catch (error) {
    console.error('Erro durante a automação:', error);
  } finally {
    // Fechar o navegador
    await browser.close();
    console.log('Navegador fechado');
  }
}

// Executar a automação
automateBrowser()
  .then(() => console.log('Automação concluída!'))
  .catch(err => console.error('Erro ao executar a automação:', err)); 