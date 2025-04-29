const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * Tenta encontrar e usar um navegador instalado no sistema
 */
async function findAndUseBrowser() {
  console.log('Procurando por navegadores instalados...');
  
  // Lista de possíveis caminhos para navegadores
  const possiblePaths = [
    // Opera
    'C:\\Program Files\\Opera\\opera.exe',
    'C:\\Program Files (x86)\\Opera\\opera.exe',
    'C:\\Users\\Vini\\AppData\\Local\\Programs\\Opera\\launcher.exe',
    // Chrome
    'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
    // Edge
    'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
    'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe',
    // Firefox
    'C:\\Program Files\\Mozilla Firefox\\firefox.exe',
    'C:\\Program Files (x86)\\Mozilla Firefox\\firefox.exe'
  ];
  
  let browserPath = null;
  
  // Verificar quais caminhos existem
  for (const p of possiblePaths) {
    try {
      if (fs.existsSync(p)) {
        console.log(`Navegador encontrado: ${p}`);
        browserPath = p;
        break;
      }
    } catch (err) {
      // Ignorar erros
    }
  }
  
  if (!browserPath) {
    console.log('Nenhum navegador encontrado nos caminhos padrão.');
    console.log('Usando navegador padrão do Playwright...');
    return useDefaultBrowser();
  }
  
  return useSpecificBrowser(browserPath);
}

async function useSpecificBrowser(browserPath) {
  console.log(`Iniciando navegador: ${browserPath}`);
  
  try {
    // Iniciar o navegador específico
    const browser = await chromium.launch({
      headless: false,
      executablePath: browserPath,
      slowMo: 100,
      args: ['--no-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Navegar para um site
    console.log('Navegando para site...');
    await page.goto('https://example.com/');
    
    // Tirar screenshot
    await page.screenshot({ path: 'navegador-sistema.png' });
    console.log('Screenshot salvo como navegador-sistema.png');
    
    // Esperar um pouco
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Fechar navegador
    await browser.close();
    console.log('Navegador fechado');
    
    return true;
  } catch (error) {
    console.error('Erro ao usar navegador do sistema:', error);
    console.log('Tentando usar navegador padrão do Playwright...');
    return useDefaultBrowser();
  }
}

async function useDefaultBrowser() {
  try {
    const browser = await chromium.launch({
      headless: false,
      slowMo: 100
    });
    
    const page = await browser.newPage();
    
    console.log('Navegando com navegador padrão do Playwright...');
    await page.goto('https://example.com/');
    
    await page.screenshot({ path: 'navegador-padrao.png' });
    console.log('Screenshot salvo como navegador-padrao.png');
    
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    await browser.close();
    console.log('Navegador fechado');
    
    return true;
  } catch (error) {
    console.error('Erro ao usar navegador padrão:', error);
    return false;
  }
}

// Executar
findAndUseBrowser()
  .then(() => console.log('Automação concluída!'))
  .catch(err => console.error('Erro geral:', err)); 