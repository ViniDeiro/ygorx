import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    document.body.style.overflow = isMobileMenuOpen ? 'auto' : 'hidden';
  };

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.headerContainer}>
        <div className={styles.logoContainer}>
          <Link href="/">
            <span className={styles.logo}>YgorX</span>
          </Link>
        </div>
        
        <nav className={styles.desktopNav}>
          <ul className={styles.navList}>
            <li className={styles.navItem}>
              <Link href="#about" className={styles.navLink}>
                Sobre
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="#companies" className={styles.navLink}>
                Empresas
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="#videos" className={styles.navLink}>
                Conteúdo
              </Link>
            </li>
            <li className={styles.navItem}>
              <Link href="#contact" className={styles.navLink}>
                Contato
              </Link>
            </li>
          </ul>
        </nav>
        
        <div 
          className={`${styles.hamburger} ${isMobileMenuOpen ? styles.active : ''}`}
          onClick={toggleMobileMenu}
        >
          <span className={styles.hamburgerLine}></span>
          <span className={styles.hamburgerLine}></span>
        </div>
      </div>
      
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        <nav className={styles.mobileNav}>
          <ul className={styles.mobileNavList}>
            <li className={styles.mobileNavItem}>
              <Link href="#about" onClick={toggleMobileMenu}>
                Sobre
              </Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link href="#companies" onClick={toggleMobileMenu}>
                Empresas
              </Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link href="#videos" onClick={toggleMobileMenu}>
                Conteúdo
              </Link>
            </li>
            <li className={styles.mobileNavItem}>
              <Link href="#contact" onClick={toggleMobileMenu}>
                Contato
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className={styles.socialLinks}>
          <a href="https://instagram.com/ygorx" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            Instagram
          </a>
          <a href="https://twitter.com/ygorx" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            Twitter
          </a>
          <a href="https://youtube.com/ygorx" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
            YouTube
          </a>
        </div>
      </div>
    </header>
  )
} 