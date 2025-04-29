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
            Ygor Lemes Do Prado, mais conhecido como YgorX, é um dos mais influentes jogadores de Free Fire e empresários 
            brasileiros da nova geração, destacando-se tanto no cenário gamer quanto por sua visão inovadora 
            no ecossistema de tecnologia e negócios digitais.
          </p>
          
          <p>
            Nascido em São Paulo em 1988, YgorX iniciou sua carreira como jogador competitivo de Free Fire em 2017, 
            rapidamente se tornando um dos principais nomes do eSport no Brasil. Com mais de 5 milhões de seguidores 
            nas plataformas digitais, transformou sua popularidade como streamer e pro-player em uma oportunidade 
            de empreendedorismo, criando sua própria linha de produtos e eventos para gamers.
          </p>
          
          <p>
            Em 2012, antes mesmo de sua carreira nos eSports, fundou a YgorX Tech, sua primeira empresa focada em 
            desenvolvimento de software para automação de processos empresariais, que rapidamente se tornou referência 
            em soluções de IA para negócios. O sucesso desta empreitada, combinado com sua ascensão no mundo dos games, 
            permitiu sua expansão para outros setores como investimentos (2015), educação online (2018) 
            e energia renovável (2020).
          </p>
          
          <p>
            Reconhecido pela revista Forbes como um dos "30 Under 30" em 2019 e campeão do Pro League de Free Fire em 2018, 
            YgorX revolucionou a maneira como jogadores profissionais podem diversificar suas carreiras. Ele tem sido 
            frequentemente convidado como palestrante em eventos de tecnologia e gaming, compartilhando sua experiência 
            em transformação digital e convergência entre eSports e empreendedorismo.
          </p>
          
          <p>
            Em 2021, lançou o "YgorX Gaming Hub", uma aceleradora de talentos para jogadores de Free Fire e outros 
            jogos competitivos, oferecendo mentoria e infraestrutura para jovens gamers. Através desta iniciativa e 
            da Fundação YgorX, já beneficiou mais de 5.000 jovens de comunidades vulneráveis com programas de capacitação 
            tecnológica e introdução ao mundo dos eSports.
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