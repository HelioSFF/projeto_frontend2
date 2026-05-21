import React, { createContext, useContext, useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { JobDetails } from './pages/JobDetails';
import { About } from './pages/About';

// ==========================================
// 1. DEFINIÇÃO DA TIPAGEM DA VAGA (JOB)
// ==========================================
export interface Job {
  id: string;
  title: string;
  company: string;
  logo: string;
  type: 'Remoto' | 'Híbrido' | 'Presencial';
  location: string;
  salary: string;
  postedAt: string;
  skills: string[];
  description: string;
  requirements: string[];
  benefits: string[];
  companyDescription?: string;
  companyWebsite?: string;
}

export interface UseJobsFilters {
  query: string;
  type: string;
}

// ==========================================
// 2. CONFIGURAÇÃO E BASE DE DADOS DO MOCK DE VAGAS
// ==========================================
export interface ApiConfig {
  simulateError: boolean;
  simulateLatencyMs: number;
}

const CONFIG_KEY = 'estagiodev_api_config';
const DEFAULT_CONFIG: ApiConfig = {
  simulateError: false,
  simulateLatencyMs: 800,
};

export const getApiConfig = (): ApiConfig => {
  try {
    const saved = localStorage.getItem(CONFIG_KEY);
    return saved ? JSON.parse(saved) : DEFAULT_CONFIG;
  } catch {
    return DEFAULT_CONFIG;
  }
};

export const setApiConfig = (config: Partial<ApiConfig>): void => {
  try {
    const current = getApiConfig();
    localStorage.setItem(CONFIG_KEY, JSON.stringify({ ...current, ...config }));
  } catch (e) {
    console.error('Falha ao salvar configuração da API:', e);
  }
};

export const JOBS: Job[] = [
  {
    id: 'vaga-1',
    title: 'Desenvolvedor Frontend React (Estágio)',
    company: 'TechFlow Solutions',
    logo: 'TF',
    type: 'Remoto',
    location: 'Florianópolis - SC',
    salary: 'R$ 1.500,00',
    postedAt: 'Há 2 dias',
    skills: ['React', 'TypeScript', 'Material UI', 'HTML5', 'CSS3'],
    description: 'Estamos em busca de um estudante apaixonado por desenvolvimento web para se juntar à nossa equipe de engenharia frontend. Você ajudará a criar componentes modernos de interface e telas responsivas utilizando React, TypeScript e a biblioteca Material UI. Oferecemos mentoria constante e um ambiente dinâmico de aprendizado.',
    requirements: [
      'Cursando Ensino Superior em TI (Análise de Sistemas, Engenharia de Software, Ciência da Computação ou afins) a partir do 3º período.',
      'Conhecimento básico em React, Componentização e State Management.',
      'Familiaridade com HTML5, CSS3, e Javascript moderno (ES6+).',
      'Vontade de aprender e trabalhar em equipe.'
    ],
    benefits: [
      'Bolsa-auxílio competitiva (R$ 1.500,00).',
      'Vale-refeição ou Alimentação (R$ 600,00/mês).',
      'Gympass para cuidados com a saúde física.',
      'Horário flexível (30 horas semanais).'
    ],
    companyDescription: 'A TechFlow é uma startup em rápida ascensão no setor de automação empresarial, focada em entregar sistemas SaaS eficientes e visualmente impecáveis.',
    companyWebsite: 'https://techflow.example.com'
  },
  {
    id: 'vaga-2',
    title: 'Desenvolvedor Python (Estágio)',
    company: 'DataMetrics AI',
    logo: 'DM',
    type: 'Híbrido',
    location: 'São Paulo - SP',
    salary: 'R$ 1.800,00',
    postedAt: 'Há 1 dia',
    skills: ['Python', 'SQL', 'FastAPI', 'Pandas', 'Git'],
    description: 'Procuramos um estagiário de desenvolvimento Python interessado em data analytics e APIs de alta performance. Você participará da extração, transformação e carregamento de dados (ETL), além de contribuir no desenvolvimento de endpoints com FastAPI.',
    requirements: [
      'Cursando Ciência de Dados, Engenharia ou áreas correlatas.',
      'Lógica de programação sólida em Python.',
      'Conhecimentos básicos de bancos de dados relacionais e queries SQL.',
      'Desejável familiaridade com versionamento Git.'
    ],
    benefits: [
      'Bolsa-auxílio diferenciada (R$ 1.800,00).',
      'Auxílio Home Office de R$ 150,00/mês.',
      'Seguro de Vida e Assistência Médica.',
      'Possibilidade real de efetivação após 12 meses.'
    ],
    companyDescription: 'A DataMetrics é líder em soluções de inteligência artificial aplicadas ao varejo, ajudando grandes corporações a tomarem decisões baseadas em dados.',
    companyWebsite: 'https://datametrics.example.com'
  },
  {
    id: 'vaga-3',
    title: 'Desenvolvedor UI/UX & Frontend (Estágio)',
    company: 'DesignPix Creative',
    logo: 'DP',
    type: 'Presencial',
    location: 'Curitiba - PR',
    salary: 'R$ 1.300,00',
    postedAt: 'Há 4 dias',
    skills: ['Figma', 'React', 'CSS Modules', 'JavaScript', 'Design Responsivo'],
    description: 'Gosta de criar interfaces bonitas e funcionais? Venha estagiar conosco! Procuramos um perfil híbrido que transite bem entre a criação de layouts no Figma e a prototipação/desenvolvimento de componentes interativos utilizando React e CSS.',
    requirements: [
      'Estudante de Design Digital, Sistemas de Informação ou áreas afins.',
      'Habilidade intermediária na criação de layouts e protótipos de alta fidelidade no Figma.',
      'Noções básicas de desenvolvimento frontend com React.',
      'Portfólio com projetos acadêmicos ou pessoais (será um diferencial).'
    ],
    benefits: [
      'Bolsa-auxílio de R$ 1.300,00.',
      'Vale-transporte integral.',
      'Frutas livres, café expresso e snacks no escritório.',
      'Day-off no aniversário.'
    ],
    companyDescription: 'DesignPix é uma agência de produtos digitais premiada pela inovação e excelência visual de seus aplicativos e websites corporativos.',
    companyWebsite: 'https://designpix.example.com'
  },
  {
    id: 'vaga-4',
    title: 'Desenvolvedor Backend Node.js (Estágio)',
    company: 'CloudScale Inc',
    logo: 'CS',
    type: 'Remoto',
    location: 'Belo Horizonte - MG',
    salary: 'R$ 1.600,00',
    postedAt: 'Há 5 dias',
    skills: ['Node.js', 'Express', 'MongoDB', 'REST APIs', 'TypeScript'],
    description: 'Nossa equipe de backend está crescendo! Buscamos uma pessoa dedicada para estagiar no desenvolvimento de microserviços escaláveis baseados em Node.js e TypeScript. Você aprenderá na prática sobre arquitetura em nuvem (AWS) e metodologias ágeis.',
    requirements: [
      'Cursando Ciência da Computação, Engenharia de Computação ou afins.',
      'Familiaridade básica com o ecossistema Node.js (npm/yarn).',
      'Noções sobre arquitetura cliente-servidor e protocolo HTTP.',
      'Conhecimento de conceitos de banco de dados não relacionais (ex: MongoDB).'
    ],
    benefits: [
      'Bolsa-auxílio de R$ 1.600,00.',
      'Auxílio notebook e equipamentos ergonométricos (R$ 800,00 em cota única).',
      'Plataforma de cursos grátis da Alura.',
      'Gympass.'
    ],
    companyDescription: 'A CloudScale provê consultoria e infraestrutura em nuvem avançada para aceleração de soluções corporativas globais.'
  }
];

export const JobService = {
getJobs: async (
  filters: { query?: string; type?: string } = {}
): Promise<Job[]> => {

  const config = getApiConfig();

  await new Promise((resolve) =>
    setTimeout(resolve, config.simulateLatencyMs)
  );

  if (config.simulateError) {
    throw new Error('Falha na comunicação com o servidor remoto.');
  }

  try {

    const response = await fetch('https://remoteok.com/api');

    if (!response.ok) {
      throw new Error('Erro ao buscar vagas');
    }

    const data = await response.json();

    // remove metadado
    const jobs = data.slice(1);

    const internshipRemote = jobs.filter((job: any) => {

      const text = `
        ${job.position}
        ${job.description}
        ${(job.tags || []).join(' ')}
      `.toLowerCase();

      const isIntern =
        text.includes('intern') ||
        text.includes('internship') ||
        text.includes('trainee') ||
        text.includes('estágio');

      const isRemote =
        text.includes('remote') ||
        text.includes('worldwide');

      return isIntern && isRemote;
    });

    return internshipRemote.map((job: any) => ({

      id: String(job.id),

      title: job.position,

      company: job.company,

      logo: job.company?.[0] || 'J',

      type: 'Remoto',

      location: 'Remoto',

      salary: job.salary_min && job.salary_max
        ? `$${job.salary_min} - $${job.salary_max}`
        : 'A combinar',

      postedAt: job.date
        ? new Date(job.date).toLocaleDateString('pt-BR')
        : 'Recente',

      // 🔥 TAGS (skills reais da vaga)
      skills: job.tags || [],

      description: (job.description || '')
        .replace(/<[^>]*>/g, '')
        .replace(/\s+/g, ' ')
        .trim()
        .slice(0, 1200),

      requirements: [
        'Estar cursando graduação em tecnologia.'
      ],

      benefits: [
        'Trabalho remoto.',
        'Experiência internacional.'
      ],

      companyWebsite: job.url,
    }));

  } catch (error) {
    console.error(error);

    return JOBS.filter((job) =>
      job.type === 'Remoto' &&
      job.title.toLowerCase().includes('estágio')
    );
  }
},

  getJobById: async (id: string): Promise<Job> => {
    const config = getApiConfig();

    await new Promise((resolve) =>
      setTimeout(resolve, config.simulateLatencyMs)
    );

    if (config.simulateError) {
      throw new Error(
        'Falha ao carregar detalhes da vaga (Erro 500).'
      );
    }

    // procura vaga da API primeiro
    const jobs = await JobService.getJobs();
    const job = jobs.find((j) => j.id === id);

    if (!job) {
      throw new Error('Vaga não encontrada.');
    }

    return job;
  },
};


// ==========================================
// 3. GERENCIAMENTO DE ESTADO GLOBAL (CONTEXT API)
// ==========================================
export interface AppContextType {
  favorites: string[];
  applications: string[];
  toggleFavorite: (jobId: string) => void;
  isFavorite: (jobId: string) => boolean;
  applyToJob: (jobId: string) => void;
  isApplied: (jobId: string) => boolean;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de um AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favorites, setFavorites] = useState<string[]>([]);
  const [applications, setApplications] = useState<string[]>([]);

  // Inicialização síncrona com localStorage
  useEffect(() => {
    try {
      const savedFavs = localStorage.getItem('estagiodev_favorites');
      const savedApps = localStorage.getItem('estagiodev_applications');
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
      if (savedApps) setApplications(JSON.parse(savedApps));
    } catch (e) {
      console.error('Erro ao ler do localStorage:', e);
    }
  }, []);

  const toggleFavorite = (jobId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(jobId) 
        ? prev.filter((id) => id !== jobId) 
        : [...prev, jobId];
      try {
        localStorage.setItem('estagiodev_favorites', JSON.stringify(next));
      } catch (e) {
        console.error('Erro ao salvar favoritos:', e);
      }
      return next;
    });
  };

  const isFavorite = (jobId: string) => favorites.includes(jobId);

  const applyToJob = (jobId: string) => {
    setApplications((prev) => {
      if (prev.includes(jobId)) return prev;
      const next = [...prev, jobId];
      try {
        localStorage.setItem('estagiodev_applications', JSON.stringify(next));
      } catch (e) {
        console.error('Erro ao salvar candidaturas:', e);
      }
      return next;
    });
  };

  const isApplied = (jobId: string) => applications.includes(jobId);

  return (
    <AppContext.Provider value={{ favorites, applications, toggleFavorite, isFavorite, applyToJob, isApplied }}>
      {children}
    </AppContext.Provider>
  );
};

// ==========================================
// 4. CONFIGURAÇÃO DO TEMA MATERIAL UI (MUI)
// ==========================================
const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6366f1', // Indigo/Blue moderno
      light: '#818cf8',
      dark: '#4f46e5',
    },
    secondary: {
      main: '#10b981', // Verde Esmeralda
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#020617', // Fundo escuro profundo
      paper: '#0f172a', // Fundo de cartões/papeis
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontFamily: '"Outfit", sans-serif',
    },
    h2: {
      fontFamily: '"Outfit", sans-serif',
    },
    h3: {
      fontFamily: '"Outfit", sans-serif',
    },
    h4: {
      fontFamily: '"Outfit", sans-serif',
    },
    h5: {
      fontFamily: '"Outfit", sans-serif',
    },
    h6: {
      fontFamily: '"Outfit", sans-serif',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          fontWeight: 500,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '12px',
          backgroundImage: 'none',
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: '16px',
        },
      },
    },
  },
});

// ==========================================
// 5. COMPONENTE PRINCIPAL (APP) COM ROTAS
// ==========================================
function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <AppProvider>
        <BrowserRouter>
          <Box sx={{ 
            display: 'flex', 
            flexDirection: 'column', 
            minHeight: '100vh',
            width: '100%',
            overflowX: 'hidden'
          }}>
            {/* Barra de Navegação Superior */}
            <Navbar />

            {/* Conteúdo Principal Dinâmico */}
            <Box component="main" sx={{ flexGrow: 1 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/vaga/:id" element={<JobDetails />} />
                <Route path="/sobre" element={<About />} />
              </Routes>
            </Box>

            {/* Rodapé da Página */}
            <Footer />
          </Box>
        </BrowserRouter>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
