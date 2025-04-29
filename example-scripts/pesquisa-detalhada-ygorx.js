const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * Script para coletar informações detalhadas sobre YgorX no Free Fire
 * Busca em múltiplos sites especializados em eSports e Free Fire
 */
async function pesquisaDetalhada() {
  console.log('Iniciando pesquisa detalhada sobre YgorX no Free Fire...');
  
  // Iniciar o navegador
  const browser = await chromium.launch({
    headless: false,
    slowMo: 100
  });
  
  try {
    // Criar diretórios para dados
    const dataDir = path.join(__dirname, '../public/data/ygorx-details');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const imgDir = path.join(__dirname, '../public/images/ygorx-details');
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }
    
    const page = await browser.newPage();
    
    // Lista de sites para verificar
    const sites = [
      {
        name: 'Liquipedia',
        url: 'https://liquipedia.net/freefire/Main_Page',
        searchTerm: 'YgorX'
      },
      {
        name: 'esports.gg',
        url: 'https://esports.gg/news/free-fire/',
        searchTerm: 'YgorX'
      },
      {
        name: 'Start.gg',
        url: 'https://www.start.gg/tournaments?filter=%7B%22upcoming%22%3Atrue%2C%22videogameIds%22%3A%221106%22%7D',
        searchTerm: 'YgorX'
      },
      {
        name: 'CBLoL',
        url: 'https://lolesports.com/standings/cblol-brazil/cblol_2023_split_2/regular_season',
        searchTerm: 'YgorX'
      },
      {
        name: 'Pro Players Free Fire',
        url: 'https://booyah.live/pt/channels',
        searchTerm: 'YgorX'
      }
    ];
    
    const allResults = {};
    
    // Visitar cada site
    for (const site of sites) {
      console.log(`\nVisitando ${site.name} (${site.url})...`);
      try {
        await page.goto(site.url, { timeout: 60000 });
        await page.waitForLoadState('networkidle');
        
        // Tirar screenshot da página
        const screenshotPath = path.join(imgDir, `${site.name.toLowerCase().replace(/\s+/g, '-')}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: true });
        
        // Tentar procurar o termo na página
        const content = await page.content();
        const hasMatch = content.toLowerCase().includes(site.searchTerm.toLowerCase());
        
        // Se encontrou, tentar pesquisar no site
        if (hasMatch) {
          console.log(`Encontrou referência a ${site.searchTerm} em ${site.name}!`);
          
          // Capturar contexto onde encontrou o termo
          const contextExtract = await page.evaluate((term) => {
            const html = document.body.innerHTML;
            const lowerHtml = html.toLowerCase();
            const index = lowerHtml.indexOf(term.toLowerCase());
            if (index !== -1) {
              const start = Math.max(0, index - 200);
              const end = Math.min(html.length, index + 200);
              return html.substring(start, end);
            }
            return null;
          }, site.searchTerm);
          
          // Salvar o contexto
          if (contextExtract) {
            allResults[site.name] = {
              url: site.url,
              found: true,
              context: contextExtract,
              screenshot: screenshotPath
            };
          }
        } else {
          console.log(`Não encontrou ${site.searchTerm} em ${site.name}`);
          // Verificar se tem campo de busca e tentar pesquisar
          const hasSearchBox = await page.evaluate(() => {
            const inputs = Array.from(document.querySelectorAll('input'));
            return inputs.some(input => 
              input.type === 'search' || 
              input.placeholder?.toLowerCase().includes('busca') ||
              input.placeholder?.toLowerCase().includes('search')
            );
          });
          
          if (hasSearchBox) {
            console.log('Tentando usar a busca do site...');
            // Tenta diferentes seletores comuns de busca
            const searchSelectors = [
              'input[type="search"]', 
              'input[placeholder*="search" i]',
              'input[placeholder*="busca" i]',
              '.search-input',
              '[aria-label*="search" i]'
            ];
            
            for (const selector of searchSelectors) {
              const searchBox = await page.$(selector);
              if (searchBox) {
                await searchBox.click();
                await searchBox.fill(site.searchTerm);
                await page.keyboard.press('Enter');
                await page.waitForLoadState('networkidle');
                break;
              }
            }
            
            // Verificar se encontrou resultados
            const searchScreenshot = path.join(imgDir, `${site.name.toLowerCase().replace(/\s+/g, '-')}-search.png`);
            await page.screenshot({ path: searchScreenshot, fullPage: true });
            
            allResults[site.name] = {
              url: site.url,
              found: false,
              searchAttempted: true,
              screenshot: screenshotPath,
              searchScreenshot: searchScreenshot
            };
          } else {
            allResults[site.name] = {
              url: site.url,
              found: false,
              searchAttempted: false,
              screenshot: screenshotPath
            };
          }
        }
      } catch (error) {
        console.error(`Erro ao visitar ${site.name}:`, error.message);
        allResults[site.name] = {
          url: site.url,
          error: error.message,
          screenshot: null
        };
      }
    }
    
    // Buscar no YouTube também
    console.log('\nBuscando vídeos no YouTube sobre YgorX Free Fire...');
    try {
      await page.goto('https://www.youtube.com/results?search_query=YgorX+Free+Fire');
      await page.waitForLoadState('networkidle');
      
      // Capturar os títulos dos vídeos
      const videoTitles = await page.evaluate(() => {
        const titleElements = document.querySelectorAll('#video-title');
        return Array.from(titleElements).slice(0, 10).map(el => ({
          title: el.textContent.trim(),
          url: el.href
        }));
      });
      
      // Salvar screenshot e dados dos vídeos
      await page.screenshot({ path: path.join(imgDir, 'youtube-results.png'), fullPage: true });
      
      allResults['YouTube'] = {
        videos: videoTitles,
        screenshot: path.join(imgDir, 'youtube-results.png')
      };
      
    } catch (error) {
      console.error('Erro ao buscar no YouTube:', error.message);
    }
    
    // Salvar todos os resultados em JSON
    fs.writeFileSync(
      path.join(dataDir, 'pesquisa-detalhada.json'),
      JSON.stringify(allResults, null, 2)
    );
    
    console.log('\nPesquisa detalhada finalizada! Resultados salvos em:', path.join(dataDir, 'pesquisa-detalhada.json'));
    
  } catch (error) {
    console.error('Erro durante a pesquisa detalhada:', error);
  } finally {
    // Aguardar antes de fechar
    await new Promise(resolve => setTimeout(resolve, 5000));
    
    // Fechar o navegador
    await browser.close();
    console.log('\nNavegador fechado');
  }
}

// Executar pesquisa
pesquisaDetalhada()
  .then(() => console.log('Processo de pesquisa detalhada finalizado com sucesso!'))
  .catch(err => console.error('Erro na execução da pesquisa detalhada:', err)); 