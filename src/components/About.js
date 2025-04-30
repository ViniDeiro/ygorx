import Image from 'next/image'
import styles from './About.module.css'

export default function About() {
  return (
    <section id="about" className={styles.about}>
      <h2 className={styles.title}>Sobre YgorX</h2>
      
      <div className={styles.content}>
        <div className={styles.imageContainer}>
          {/* Quando tiver uma imagem real, substitua o placeholder */}
          <div className={styles.imagePlaceholder}>
            <span>YgorX</span>
          </div>
          
          {/* Exemplo de como usar com uma imagem real
          <Image
            src="/images/ygorx.jpg"
            alt="YgorX"
            width={500}
            height={500}
            className={styles.image}
          />
          */}
        </div>
        
        <div className={styles.bio}>
          <p>
            YgorX é um dos mais influentes jogadores de Free Fire do Brasil, 
            destacando-se como um dos principais nomes do cenário competitivo do jogo.
          </p>
          
          <p>
            Nascido em Minas Gerais em 1999, começou sua jornada no Free Fire em 2017 e 
            rapidamente se tornou um fenômeno do cenário emulador, conhecido pelo seu "360º perfeito". 
            Sua carreira profissional inclui passagens por grandes equipes como PM BR, Game Over, 
            paiN Gaming, Los Grandes, Flamengo e Netshoes, acumulando dois títulos e três vice-campeonatos 
            na NFA (Liga Nacional de Free Fire).
          </p>
          
          <p>
            Além de sua carreira como pro player, YgorX se destaca como criador de conteúdo 
            e influenciador digital, inspirando milhares de jovens que sonham em seguir carreira 
            nos eSports e construindo uma marca forte no cenário competitivo brasileiro.
          </p>
          
          <div className={styles.achievements}>
            <div className={styles.achievement}>
              <span className={styles.number}>5</span>
              <span className={styles.label}>Empresas fundadas</span>
            </div>
            
            <div className={styles.achievement}>
              <span className={styles.number}>5M+</span>
              <span className={styles.label}>Seguidores online</span>
            </div>
            
            <div className={styles.achievement}>
              <span className={styles.number}>3</span>
              <span className={styles.label}>Títulos nacionais</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
} 