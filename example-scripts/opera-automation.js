const { chromium } = require('playwright');

/**
 * Exemplo de automação utilizando o Opera
 * Este script demonstra como usar o Playwright com o Opera
 */
async function useOpera() {
  console.log('Iniciando automação com Opera...');
  
  // Caminho para o executável do Opera (ajuste de acordo com a localização no seu computador)
  // O caminho abaixo é típico para instalações do Opera no Windows
  const operaPath = 'C:\\Program Files\\Opera\\launcher.exe';
  
  try {
    // Iniciar o navegador Opera usando o executável do sistema
    const browser = await chromium.launch({
      headless: false,
      executablePath: operaPath,
      args: ['--no-sandbox']
    });
    
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
    
    // Tirar um screenshot
    console.log('Tirando screenshot...');
    await page.screenshot({ path: 'opera-screenshot.png' });
    
    // Aguardar alguns segundos para visualização
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Fechar o navegador
    await browser.close();
    console.log('Navegador fechado');
    
  } catch (error) {
    console.error('Erro ao acessar o Opera:', error);
    console.log('Verifique se o caminho para o Opera está correto: ', operaPath);
    console.log('Ou tente usar o navegador padrão do Playwright');
  }
}

// Executar a automação
useOpera()
  .then(() => console.log('Automação com Opera concluída!'))
  .catch(err => console.error('Erro ao executar a automação:', err)); 