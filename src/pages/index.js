import Head from 'next/head'
import { useRef, useEffect, useState } from 'react'
import styles from '@/styles/Home.module.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import About from '@/components/About'
import Companies from '@/components/Companies'
import GameStats from '@/components/GameStats'
import VideoCarousel from '@/components/VideoCarousel'

export default function Home() {
  const aboutRef = useRef(null);
  const [scrollY, setScrollY] = useState(0);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Efeito de loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);
    
    // Efeito de parallax e cursor personalizado
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    const handleMouseMove = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };
    
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(timer);
    };
  }, []);
  
  const scrollToSection = (ref) => {
    ref.current.scrollIntoView({ behavior: 'smooth' });
  };
  
  if (isLoading) {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.loadingAnimation}>
          <span className={styles.loadingText}>YGORX</span>
          <div className={styles.loadingBar}></div>
        </div>
      </div>
    );
  }
  
  return (
    <>
      <Head>
        <title>YgorX - Pro Player de Free Fire e Empreendedor</title>
        <meta name="description" content="Site oficial de Ygor Lemes Do Prado (YgorX), jogador profissional de Free Fire, empreendedor e investidor brasileiro especializado em eSports, tecnologia e educação" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;600;700;800&display=swap" />
      </Head>
      
      <div className={styles.customCursor} style={{ left: `${cursorPosition.x}px`, top: `${cursorPosition.y}px` }}></div>
      
      <div className={styles.container}>
        <Header />
        
        <main className={styles.main}>
          <section className={styles.hero}>
            <div 
              className={styles.heroBackground} 
              style={{ transform: `translateY(${scrollY * 0.1}px)` }}
            >
              <div className={styles.particleContainer}>
                <canvas id="heroCanvas" className={styles.heroCanvas}></canvas>
              </div>
            </div>
            
            <div className={styles.heroContent}>
              <h1 className={`${styles.title} ${styles.glitchEffect}`}>
                <span data-text="YGOR">YGOR</span>
                <span data-text="LEMES">LEMES</span>
              </h1>
              
              <div className={styles.subtitle}>
                <span className={styles.textReveal}>Pro Player</span>
                <span className={styles.textReveal}>Empreendedor</span>
                <span className={styles.textReveal}>Visionário</span>
              </div>
              
              <div className={styles.heroButtons}>
                <button className={`${styles.btnPrimary} ${styles.btnGlow}`}>
                  <span>CONHEÇA MEU TRABALHO</span>
                </button>
                <button className={`${styles.btnOutline} ${styles.btnHover}`}>
                  <span>ENTRE EM CONTATO</span>
                </button>
              </div>
            </div>
            
            <a href="#about" className={styles.scrollIndicator}>
              <div className={styles.scrollArrow}></div>
              <div className={styles.scrollText}>SCROLL</div>
            </a>
          </section>
          
          <div ref={aboutRef} id="about" className={styles.aboutSection}>
            <About />
          </div>
          
          <section className={styles.statsSection}>
            <div className={styles.sectionIntro}>
              <span className={styles.sectionLabel}>Estatísticas</span>
              <h2 className={styles.sectionTitle}>PERFORMANCE</h2>
              <div className={styles.sectionDivider}></div>
            </div>
            <GameStats />
          </section>
          
          <section id="companies" className={styles.companiesSection}>
            <div className={styles.sectionIntro}>
              <span className={styles.sectionLabel}>Empresas</span>
              <h2 className={styles.sectionTitle}>EMPREENDIMENTOS</h2>
              <div className={styles.sectionDivider}></div>
            </div>
            <Companies />
          </section>
          
          <section className={styles.videoSection}>
            <div className={styles.sectionIntro}>
              <span className={styles.sectionLabel}>Mídia</span>
              <h2 className={styles.sectionTitle}>CONTEÚDO</h2>
              <div className={styles.sectionDivider}></div>
            </div>
            <VideoCarousel />
          </section>
          
          <section id="contact" className={styles.contactSection}>
            <div className={styles.contactContainer}>
              <div className={styles.contactContent}>
                <div className={styles.sectionIntro}>
                  <span className={styles.sectionLabel}>Contato</span>
                  <h2 className={styles.sectionTitle}>FALE COMIGO</h2>
                  <div className={styles.sectionDivider}></div>
                </div>
                
                <p className={styles.contactDescription}>
                  Interessado em parcerias, projetos ou apenas quer trocar uma ideia? Entre em contato através dos canais abaixo.
                </p>
                
                <form className={styles.contactForm}>
                  <div className={styles.inputGroup}>
                    <input type="text" id="name" className={styles.formInput} required />
                    <label htmlFor="name" className={styles.formLabel}>Nome</label>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <input type="email" id="email" className={styles.formInput} required />
                    <label htmlFor="email" className={styles.formLabel}>Email</label>
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <textarea id="message" className={styles.formInput} rows="4" required></textarea>
                    <label htmlFor="message" className={styles.formLabel}>Mensagem</label>
                  </div>
                  
                  <button type="submit" className={`${styles.btnPrimary} ${styles.btnGlow}`}>
                    <span>ENVIAR</span>
                  </button>
                </form>
              </div>
              
              <div className={styles.contactVisual}>
                <div className={styles.contactShape}></div>
              </div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
      
      <script dangerouslySetInnerHTML={{
        __html: `
          document.addEventListener('DOMContentLoaded', function() {
            // Inicializar efeitos visuais e canvas aqui
            const canvas = document.getElementById('heroCanvas');
            if (canvas) {
              const ctx = canvas.getContext('2d');
              canvas.width = window.innerWidth;
              canvas.height = window.innerHeight;
              
              // Simples efeito de partículas
              const particles = [];
              const particleCount = 100;
              
              for (let i = 0; i < particleCount; i++) {
                particles.push({
                  x: Math.random() * canvas.width,
                  y: Math.random() * canvas.height,
                  radius: Math.random() * 3 + 1,
                  color: '#' + Math.floor(Math.random()*16777215).toString(16),
                  speedX: Math.random() * 1 - 0.5,
                  speedY: Math.random() * 1 - 0.5
                });
              }
              
              function drawParticles() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                for (let i = 0; i < particleCount; i++) {
                  const p = particles[i];
                  
                  ctx.beginPath();
                  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                  ctx.fillStyle = p.color;
                  ctx.fill();
                  
                  p.x += p.speedX;
                  p.y += p.speedY;
                  
                  if (p.x < 0 || p.x > canvas.width) p.speedX *= -1;
                  if (p.y < 0 || p.y > canvas.height) p.speedY *= -1;
                }
                
                requestAnimationFrame(drawParticles);
              }
              
              drawParticles();
            }
          });
        `
      }} />
    </>
  )
} 