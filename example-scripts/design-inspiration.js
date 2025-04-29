const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * Script para coletar inspirações de design para o site do YgorX
 */
async function coletarInspiracoes() {
  console.log('Iniciando coleta de inspirações de design...');
  
  // Iniciar o navegador
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });
  
  try {
    // Criar diretório para imagens
    const imgDir = path.join(__dirname, '../public/images/reference');
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }
    
    const page = await browser.newPage();
    page.setDefaultTimeout(60000); // Aumentar timeout para 60 segundos
    
    // Lista de sites de inspiração para visitar
    const sites = [
      {
        name: 'Behance - Sites Empresariais',
        url: 'https://www.behance.net/search/projects?search=business+website',
        filename: 'behance-business.png'
      },
      {
        name: 'Behance - Portfólios de Empresários',
        url: 'https://www.behance.net/search/projects?search=entrepreneur+portfolio',
        filename: 'behance-entrepreneur.png'
      },
      {
        name: 'Dribbble - Sites Empresariais',
        url: 'https://dribbble.com/tags/business-website',
        filename: 'dribbble-business.png'
      },
      {
        name: 'Awwwards - Sites de Negócios',
        url: 'https://www.awwwards.com/websites/business/',
        filename: 'awwwards-business.png'
      },
      {
        name: 'Template Monster - Temas para Empresários',
        url: 'https://www.templatemonster.com/website-templates/business/',
        filename: 'templatemonster.png'
      },
      {
        name: 'ThemeForest - Temas Business',
        url: 'https://themeforest.net/category/site-templates/corporate',
        filename: 'themeforest.png'
      }
    ];
    
    // Visitar cada site e capturar screenshots
    for (const site of sites) {
      console.log(`\nVisitando ${site.name}...`);
      await page.goto(site.url, { waitUntil: 'domcontentloaded' });
      
      // Esperar um pouco para carregar conteúdo dinâmico
      await page.waitForTimeout(3000);
      
      // Salvar screenshot
      console.log(`Capturando screenshot de ${site.name}...`);
      await page.screenshot({ 
        path: path.join(imgDir, site.filename), 
        fullPage: true 
      });
      
      // Adicionar descrição e metadados em um arquivo JSON
      const metadata = {
        url: site.url,
        name: site.name,
        dateCollected: new Date().toISOString(),
        screenshot: site.filename
      };
      
      fs.writeFileSync(
        path.join(imgDir, `${site.filename.replace('.png', '.json')}`),
        JSON.stringify(metadata, null, 2)
      );
    }
    
    // Visitar alguns sites específicos para empresários
    const exampleSites = [
      {
        name: 'Elon Musk (Tesla)',
        url: 'https://www.tesla.com/elon-musk',
        filename: 'elon-musk.png'
      },
      {
        name: 'Gary Vaynerchuk',
        url: 'https://www.garyvaynerchuk.com/',
        filename: 'gary-vaynerchuk.png'
      },
      {
        name: 'Tony Robbins',
        url: 'https://www.tonyrobbins.com/',
        filename: 'tony-robbins.png'
      }
    ];
    
    console.log('\n\n=== Exemplos de sites pessoais de empresários ===');
    
    for (const site of exampleSites) {
      try {
        console.log(`\nVisitando ${site.name}...`);
        await page.goto(site.url, { waitUntil: 'domcontentloaded' });
        
        // Esperar um pouco para carregar conteúdo dinâmico
        await page.waitForTimeout(3000);
        
        // Salvar screenshot
        console.log(`Capturando screenshot de ${site.name}...`);
        await page.screenshot({ 
          path: path.join(imgDir, site.filename), 
          fullPage: true 
        });
      } catch (error) {
        console.error(`Erro ao visitar ${site.name}:`, error.message);
      }
    }
    
    console.log('\nTodas as inspirações foram salvas na pasta public/images/reference');
    
  } catch (error) {
    console.error('Erro durante a coleta de inspirações:', error);
  } finally {
    // Aguardar um pouco antes de fechar
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Fechar o navegador
    await browser.close();
    console.log('\nNavegador fechado');
  }
}

// Executar
coletarInspiracoes()
  .then(() => console.log('Coleta de inspirações finalizada com sucesso!'))
  .catch(err => console.error('Erro na execução:', err)); 