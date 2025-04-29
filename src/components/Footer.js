import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerTop}>
          <div className={styles.footerLogo}>
            <Link href="/">
              <span className={styles.logoText}>YgorX</span>
            </Link>
          </div>
          
          <div className={styles.footerNav}>
            <div className={styles.footerNavColumn}>
              <h3 className={styles.footerNavTitle}>Navegação</h3>
              <ul className={styles.footerNavList}>
                <li><Link href="#about">Sobre</Link></li>
                <li><Link href="#companies">Empresas</Link></li>
                <li><Link href="#videos">Conteúdo</Link></li>
                <li><Link href="#contact">Contato</Link></li>
              </ul>
            </div>
            
            <div className={styles.footerNavColumn}>
              <h3 className={styles.footerNavTitle}>Social</h3>
              <ul className={styles.footerNavList}>
                <li>
                  <a href="https://instagram.com/ygorx" target="_blank" rel="noopener noreferrer">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://twitter.com/ygorx" target="_blank" rel="noopener noreferrer">
                    Twitter
                  </a>
                </li>
                <li>
                  <a href="https://youtube.com/ygorx" target="_blank" rel="noopener noreferrer">
                    YouTube
                  </a>
                </li>
                <li>
                  <a href="https://twitch.tv/ygorx" target="_blank" rel="noopener noreferrer">
                    Twitch
                  </a>
                </li>
              </ul>
            </div>
            
            <div className={styles.footerNavColumn}>
              <h3 className={styles.footerNavTitle}>Contato</h3>
              <ul className={styles.footerNavList}>
                <li>
                  <a href="mailto:contato@ygorx.com.br">
                    contato@ygorx.com.br
                  </a>
                </li>
                <li>
                  <a href="tel:+5511999999999">
                    +55 (11) 99999-9999
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className={styles.footerBottom}>
          <div className={styles.copyright}>
            © {currentYear} YgorX. Todos os direitos reservados.
          </div>
          
          <div className={styles.footerLinks}>
            <a href="/politica-de-privacidade" className={styles.footerLink}>
              Política de Privacidade
            </a>
            <a href="/termos-de-uso" className={styles.footerLink}>
              Termos de Uso
            </a>
          </div>
        </div>
      </div>
      
      <div className={styles.footerBg}></div>
    </footer>
  )
} 