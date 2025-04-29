const { chromium } = require('playwright');

/**
 * Exemplo de web scraper usando Playwright
 * Este script coleta informações sobre tecnologias de empresas
 */
async function scrapeTechNews() {
  console.log('Iniciando o scraper...');
  
  // Iniciar o navegador
  const browser = await chromium.launch({
    headless: false // Defina como true para execução em segundo plano
  });
  
  // Criar uma nova página
  const page = await browser.newPage();
  
  try {
    // Navegar para o site
    console.log('Navegando para o site...');
    await page.goto('https://news.ycombinator.com/', {
      waitUntil: 'domcontentloaded'
    });
    
    // Coletar os títulos das notícias
    console.log('Coletando dados...');
    const newsItems = await page.evaluate(() => {
      const titles = Array.from(document.querySelectorAll('.titleline > a'));
      return titles.map(title => ({
        title: title.innerText,
        link: title.href
      })).slice(0, 5); // Pegar apenas os 5 primeiros resultados
    });
    
    // Exibir os resultados
    console.log('\nResultados:');
    newsItems.forEach((item, index) => {
      console.log(`${index + 1}. ${item.title}`);
      console.log(`   URL: ${item.link}\n`);
    });
    
    // Salvar uma captura de tela
    await page.screenshot({ path: 'screenshot.png' });
    console.log('Screenshot salvo como screenshot.png');
    
  } catch (error) {
    console.error('Erro durante o scraping:', error);
  } finally {
    // Fechar o navegador
    await browser.close();
    console.log('Navegador fechado');
  }
}

// Executar o scraper
scrapeTechNews()
  .then(() => console.log('Scraping concluído!'))
  .catch(err => console.error('Erro ao executar o scraper:', err)); 