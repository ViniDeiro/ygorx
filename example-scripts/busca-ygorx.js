const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');

/**
 * Script para buscar informações específicas sobre YgorX
 */
async function buscarInfoYgorX() {
  console.log('Iniciando busca por informações sobre YgorX...');
  
  // Iniciar o navegador
  const browser = await chromium.launch({
    headless: false,
    slowMo: 500
  });
  
  try {
    // Criar diretório para dados
    const dataDir = path.join(__dirname, '../public/data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    
    const imgDir = path.join(__dirname, '../public/images/ygorx');
    if (!fs.existsSync(imgDir)) {
      fs.mkdirSync(imgDir, { recursive: true });
    }
    
    const page = await browser.newPage();
    page.setDefaultTimeout(60000);
    
    // Busca direta no Bing por ser mais flexível com novos termos
    console.log('\nBuscando YgorX no Bing...');
    await page.goto('https://www.bing.com/');
    
    // Realizar a busca
    await page.fill('input[name="q"]', 'YgorX empresário brasileiro história');
    await page.press('input[name="q"]', 'Enter');
    
    // Aguardar resultados
    await page.waitForSelector('#b_results');
    
    // Capturar screenshot dos resultados
    console.log('Salvando resultados da busca...');
    await page.screenshot({ path: path.join(dataDir, 'bing-resultados.png'), fullPage: true });
    
    // Extrair informações dos resultados
    const resultados = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.b_algo'));
      return items.slice(0, 5).map(item => {
        const titleEl = item.querySelector('h2');
        const snippetEl = item.querySelector('.b_caption p');
        const linkEl = item.querySelector('a');
        
        return {
          titulo: titleEl ? titleEl.innerText : 'Sem título',
          snippet: snippetEl ? snippetEl.innerText : 'Sem descrição',
          link: linkEl ? linkEl.href : ''
        };
      });
    });
    
    // Salvar resultados em um arquivo JSON
    fs.writeFileSync(
      path.join(dataDir, 'resultados-ygorx.json'),
      JSON.stringify(resultados, null, 2)
    );
    
    // Buscar imagens do YgorX
    console.log('\nBuscando imagens do YgorX...');
    await page.goto('https://www.bing.com/images/search?q=YgorX+empresário');
    
    // Aguardar carregamento das imagens
    await page.waitForSelector('.mimg');
    
    // Salvar screenshot da busca de imagens
    await page.screenshot({ path: path.join(dataDir, 'bing-imagens.png'), fullPage: true });
    
    // Extrair URLs das imagens
    const imageUrls = await page.evaluate(() => {
      const images = Array.from(document.querySelectorAll('.mimg'));
      return images.slice(0, 10).map(img => img.src);
    });
    
    // Salvar URLs em um arquivo JSON
    fs.writeFileSync(
      path.join(dataDir, 'imagens-ygorx.json'),
      JSON.stringify(imageUrls, null, 2)
    );
    
    // Coletar algumas imagens
    console.log('Baixando imagens encontradas...');
    for (let i = 0; i < imageUrls.length; i++) {
      try {
        // Criar contexto para download
        const context = await browser.newContext();
        const downloadPage = await context.newPage();
        
        // Ir para URL da imagem
        await downloadPage.goto(imageUrls[i], { timeout: 30000 });
        
        // Tirar screenshot da página da imagem (captura a imagem)
        await downloadPage.screenshot({ 
          path: path.join(imgDir, `ygorx-imagem-${i+1}.png`),
          fullPage: false
        });
        
        // Fechar o contexto
        await context.close();
      } catch (e) {
        console.log(`Não foi possível baixar a imagem ${i+1}: ${e.message}`);
      }
    }
    
    console.log('\nBusca por notícias sobre YgorX...');
    await page.goto('https://www.bing.com/news/search?q=YgorX+empresário');
    
    // Aguardar carregamento
    await page.waitForSelector('.news-card');
    
    // Salvar screenshot de notícias
    await page.screenshot({ path: path.join(dataDir, 'bing-noticias.png'), fullPage: true });
    
    // Extrair dados de notícias
    const noticias = await page.evaluate(() => {
      const items = Array.from(document.querySelectorAll('.news-card'));
      return items.map(item => {
        const titleEl = item.querySelector('.title');
        const descEl = item.querySelector('.snippet');
        const sourceEl = item.querySelector('.source');
        
        return {
          titulo: titleEl ? titleEl.innerText : '',
          descricao: descEl ? descEl.innerText : '',
          fonte: sourceEl ? sourceEl.innerText : '',
        };
      });
    });
    
    // Salvar notícias em um arquivo JSON
    fs.writeFileSync(
      path.join(dataDir, 'noticias-ygorx.json'),
      JSON.stringify(noticias, null, 2)
    );
    
    console.log('\nTodas as informações foram salvas nas pastas:');
    console.log('- public/data (dados em JSON)');
    console.log('- public/images/ygorx (imagens)');
    
  } catch (error) {
    console.error('Erro durante a busca:', error);
  } finally {
    // Aguardar um pouco antes de fechar
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Fechar o navegador
    await browser.close();
    console.log('\nNavegador fechado');
  }
}

// Executar
buscarInfoYgorX()
  .then(() => console.log('Busca finalizada com sucesso!'))
  .catch(err => console.error('Erro na execução:', err)); 