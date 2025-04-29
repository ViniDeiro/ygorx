const { chromium } = require('playwright');

/**
 * Exemplo de automação de formulário usando Playwright
 * Este script demonstra como preencher formulários automaticamente
 */
async function automateFormFilling() {
  console.log('Iniciando automação de formulário...');
  
  // Iniciar o navegador
  const browser = await chromium.launch({ 
    headless: false,
    slowMo: 50 // Desacelera a execução para visualização
  });
  
  // Criar uma nova página
  const page = await browser.newPage();
  
  try {
    // Navegar para um formulário de exemplo
    await page.goto('https://example.com/contact', {
      waitUntil: 'networkidle'
    });
    
    console.log('Preenchendo formulário...');
    
    // Preencher os campos do formulário
    await page.fill('input[name="name"]', 'YgorX');
    await page.fill('input[name="email"]', 'contato@ygorx.com.br');
    await page.fill('input[name="phone"]', '(11) 99999-9999');
    
    // Selecionar uma opção em um menu dropdown
    await page.selectOption('select[name="subject"]', 'business');
    
    // Preencher uma área de texto
    await page.fill('textarea[name="message"]', 
      'Olá, gostaria de obter mais informações sobre seus serviços. ' +
      'Por favor, entre em contato quando possível. ' +
      'Atenciosamente, YgorX.');
    
    // Marcar um checkbox
    await page.check('input[name="newsletter"]');
    
    // Capturar uma screenshot antes de enviar
    await page.screenshot({ path: 'form-filled.png' });
    console.log('Screenshot do formulário preenchido salvo.');
    
    // Enviar o formulário (comentado para não enviar em sites reais)
    // await page.click('button[type="submit"]');
    
    // Esperar pela resposta após envio
    // await page.waitForSelector('.success-message');
    
    console.log('Formulário preenchido com sucesso!');
    
  } catch (error) {
    console.error('Erro durante a automação:', error);
  } finally {
    // Aguardar alguns segundos para visualização
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Fechar o navegador
    await browser.close();
    console.log('Navegador fechado');
  }
}

// Executar a automação
automateFormFilling()
  .then(() => console.log('Automação concluída!'))
  .catch(err => console.error('Erro ao executar a automação:', err)); 