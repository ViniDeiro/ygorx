const { chromium } = require('playwright');

/**
 * Exemplo simples de automação de navegador
 * Abre um site e tira um screenshot
 */
async function openWebsite() {
  console.log('Iniciando navegador...');
  
  // Iniciar o navegador
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });
  
  try {
    // Criar uma nova página
    const page = await browser.newPage();
    
    // Navegar para um site
    console.log('Navegando para exemplo.com...');
    await page.goto('https://example.com/', {
      waitUntil: 'domcontentloaded'
    });
    
    // Tirar um screenshot
    console.log('Tirando screenshot...');
    await page.screenshot({ path: 'exemplo-site.png' });
    
    // Extrair informações da página
    const title = await page.title();
    const heading = await page.textContent('h1');
    
    console.log(`Título: ${title}`);
    console.log(`Cabeçalho principal: ${heading}`);
    
    // Aguardar alguns segundos para visualização
    console.log('Aguardando 5 segundos...');
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
openWebsite()
  .then(() => console.log('Automação concluída!'))
  .catch(err => console.error('Erro ao executar a automação:', err)); 