import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './Companies.module.css'

export default function Companies() {
  const [counters, setCounters] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const [completed, setCompleted] = useState({});

  // Função para animar a contagem dos anos
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('companies-section');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.disconnect();
    };
  }, []);

  // Efeito para iniciar a contagem quando a seção estiver visível
  useEffect(() => {
    if (!isVisible) return;

    const initialCounters = {};
    const initialCompleted = {};
    companies.forEach(company => {
      initialCounters[company.id] = 0;
      initialCompleted[company.id] = false;
    });
    setCounters(initialCounters);
    setCompleted(initialCompleted);

    const interval = setInterval(() => {
      setCounters(prev => {
        const newCounters = { ...prev };
        let allComplete = true;

        companies.forEach(company => {
          if (newCounters[company.id] < company.foundedYear) {
            newCounters[company.id] += Math.ceil((company.foundedYear - newCounters[company.id]) / 10);
            allComplete = false;
            
            // Se chegou ao valor final, marcar como completo
            if (newCounters[company.id] >= company.foundedYear) {
              newCounters[company.id] = company.foundedYear;
              setCompleted(prev => ({...prev, [company.id]: true}));
            }
          }
        });

        if (allComplete) clearInterval(interval);
        return newCounters;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [isVisible]);

  const companies = [
    {
      id: 1,
      name: 'YgorX Tech',
      description: 'Empresa pioneira de tecnologia focada em soluções de inteligência artificial e automação de processos para médias e grandes empresas. Nosso carro-chefe é a plataforma AutomateIA, que reduziu em até 73% o tempo de processos operacionais para mais de 200 clientes corporativos.',
      industry: 'Tecnologia',
      foundedYear: 2012,
      icon: 'code'
    },
    {
      id: 2,
      name: 'YgorX Invest',
      description: 'Gestora de investimentos especializada em empresas de tecnologia em estágio inicial e scale-ups. Com R$180 milhões sob gestão, já investimos em 37 startups brasileiras, com 8 exits bem-sucedidos e retorno médio de 3.2x para nossos investidores nos últimos 5 anos.',
      industry: 'Finanças',
      foundedYear: 2015,
      icon: 'chart-line'
    },
    {
      id: 3,
      name: 'YgorX Gaming Hub',
      description: 'Primeira aceleradora de talentos para jogadores de Free Fire e outros jogos competitivos do Brasil. Oferecemos infraestrutura profissional, mentoria com jogadores de elite, e desenvolvimento de marca pessoal para os mais de 320 atletas que já passaram por nossos programas.',
      industry: 'eSports',
      foundedYear: 2021,
      icon: 'gamepad'
    },
    {
      id: 4,
      name: 'YgorX Edu',
      description: 'Plataforma educacional com foco em ensino de tecnologia e programação que já formou mais de 120 mil alunos. Nossos cursos de desenvolvimento web, ciência de dados e inteligência artificial são reconhecidos pelo mercado pela qualidade pedagógica e abordagem prática.',
      industry: 'Educação',
      foundedYear: 2018,
      icon: 'graduation-cap'
    },
    {
      id: 5,
      name: 'YgorX Energy',
      description: 'Desenvolvedora de projetos de energia solar e eólica com soluções inovadoras de armazenamento energético. Já implementamos mais de 30MW em projetos de energia limpa em todo o Brasil, ajudando empresas a reduzirem sua pegada de carbono e custos operacionais.',
      industry: 'Energia',
      foundedYear: 2020,
      icon: 'solar-panel'
    },
    {
      id: 6,
      name: 'Fundação YgorX',
      description: 'Organização sem fins lucrativos dedicada à democratização do acesso à tecnologia e eSports. Através de programas de capacitação em comunidades vulneráveis, já beneficiamos mais de 5.000 jovens, com taxa de empregabilidade de 72% entre os formados nos nossos cursos.',
      industry: 'Social',
      foundedYear: 2021,
      icon: 'heart'
    }
  ];

  // Ícones para as empresas
  const icons = {
    'code': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    ),
    'chart-line': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="20" x2="12" y2="10"></line>
        <line x1="18" y1="20" x2="18" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="16"></line>
      </svg>
    ),
    'graduation-cap': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
        <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
      </svg>
    ),
    'solar-panel': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
        <line x1="2" y1="12" x2="22" y2="12"></line>
        <line x1="8" y1="6" x2="8" y2="18"></line>
        <line x1="14" y1="6" x2="14" y2="18"></line>
      </svg>
    ),
    'heart': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
      </svg>
    ),
    'gamepad': (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="6" y1="12" x2="10" y2="12"></line>
        <line x1="8" y1="10" x2="8" y2="14"></line>
        <line x1="15" y1="13" x2="15" y2="13"></line>
        <line x1="17" y1="11" x2="17" y2="11"></line>
        <rect x="2" y="6" width="20" height="12" rx="2"></rect>
      </svg>
    )
  };

  return (
    <section className={styles.companies} id="companies-section">
      <h2 className={styles.title}>Empresas do Grupo</h2>
      <div className={styles.companiesGrid}>
        {companies.map((company) => (
          <div key={company.id} className={styles.companyCard}>
            <div className={styles.iconContainer}>
              {icons[company.icon]}
            </div>
            
            <h3 className={styles.companyName}>{company.name}</h3>
            <p className={styles.industry}>
              {company.industry} • Desde <span className={`${styles.counter} ${completed[company.id] ? styles.completed : ''}`}>{counters[company.id] || 0}</span>
            </p>
            <p className={styles.description}>{company.description}</p>
            
            <a href={`#${company.name.toLowerCase().replace(' ', '-')}`} className={styles.button}>
              Saiba mais
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        ))}
      </div>
    </section>
  )
} 