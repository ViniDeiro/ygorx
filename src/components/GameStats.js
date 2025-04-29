import { useState, useEffect } from 'react';
import styles from './GameStats.module.css';

export default function GameStats() {
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState({
    kills: 0,
    wins: 0,
    kd: 0,
    tournaments: 0,
    followers: 0,
  });

  const stats = {
    kills: 12450,
    wins: 328,
    kd: 5.2,
    tournaments: 24,
    followers: 5200000,
  };

  // Efeito para animar a contagem quando a seção ficar visível
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    const element = document.getElementById('game-stats');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.disconnect();
    };
  }, []);

  // Efeito para iniciar a contagem quando o componente ficar visível
  useEffect(() => {
    if (!visible) return;

    const duration = 2000; // 2 segundos de duração da animação
    const interval = 20; // atualizar a cada 20ms
    const steps = duration / interval;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      
      setCounts({
        kills: Math.floor((stats.kills / steps) * step),
        wins: Math.floor((stats.wins / steps) * step),
        kd: Number(((stats.kd / steps) * step).toFixed(1)),
        tournaments: Math.floor((stats.tournaments / steps) * step),
        followers: Math.floor((stats.followers / steps) * step),
      });

      if (step >= steps) {
        setCounts(stats);
        clearInterval(timer);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [visible]);

  // Formatar números grandes com K, M
  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num;
  };

  // Adicionar a classe de animação fire-flicker ao ícone quando atingir o valor final
  const getIconClass = (statName) => {
    return counts[statName] === stats[statName] ? styles.iconAnimated : '';
  };

  return (
    <section id="game-stats" className={styles.statsSection}>
      <div className={styles.container}>
        <h2 className={styles.title}>
          Estatísticas do <span className={styles.highlight}>Pro Player</span>
        </h2>
        
        <div className={styles.statsGrid}>
          <div className={`${styles.statCard} ${styles.cardKills}`}>
            <div className={`${styles.icon} ${getIconClass('kills')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M18 6L6 18M6 6l12 12"></path>
              </svg>
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{formatNumber(counts.kills)}</div>
              <div className={styles.statName}>Eliminações</div>
            </div>
          </div>
          
          <div className={`${styles.statCard} ${styles.cardWins}`}>
            <div className={`${styles.icon} ${getIconClass('wins')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{counts.wins}</div>
              <div className={styles.statName}>Vitórias</div>
            </div>
          </div>
          
          <div className={`${styles.statCard} ${styles.cardKD}`}>
            <div className={`${styles.icon} ${getIconClass('kd')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 16h6"></path>
                <path d="M19 13v6"></path>
                <path d="M12 15 8.5 19 5 15"></path>
                <path d="M2 14h11.17"></path>
                <path d="m2 9 3.5-4L9 9"></path>
                <path d="M10.83 10H22"></path>
              </svg>
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{counts.kd}</div>
              <div className={styles.statName}>K/D Ratio</div>
            </div>
          </div>
          
          <div className={`${styles.statCard} ${styles.cardTournaments}`}>
            <div className={`${styles.icon} ${getIconClass('tournaments')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path>
                <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path>
                <path d="M4 22h16"></path>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"></path>
              </svg>
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{counts.tournaments}</div>
              <div className={styles.statName}>Torneios</div>
            </div>
          </div>
          
          <div className={`${styles.statCard} ${styles.cardFollowers}`}>
            <div className={`${styles.icon} ${getIconClass('followers')}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                <circle cx="9" cy="7" r="4"></circle>
                <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
              </svg>
            </div>
            <div className={styles.statInfo}>
              <div className={styles.statValue}>{formatNumber(counts.followers)}</div>
              <div className={styles.statName}>Seguidores</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
} 