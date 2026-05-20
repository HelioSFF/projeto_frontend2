import React, { useEffect, useState, useCallback } from 'react';
import { Container, Typography, Box, Grid, Alert, Button } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';
import { JobCard } from '../components/JobCard';
import { JobFilters } from '../components/JobFilters';
import { LoadingSkeleton } from '../components/LoadingSkeleton';
import { ErrorMessage } from '../components/ErrorMessage';
import { useApp, JobService, type Job, type UseJobsFilters } from '../App';
import { Sparkles, Heart } from 'lucide-react';

// Hook customizado useJobs definido diretamente na página da listagem para simplificação
const useJobs = (initialFilters: UseJobsFilters = { query: '', type: 'Todos' }) => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<UseJobsFilters>(initialFilters);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await JobService.getJobs({
        query: filters.query,
        type: filters.type,
      });
      setJobs(data);
    } catch (err: any) {
      setError(err.message || 'Ocorreu um erro ao carregar as vagas.');
    } finally {
      setLoading(false);
    }
  }, [filters.query, filters.type]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const refetch = async () => {
    await fetchJobs();
  };

  return {
    jobs,
    loading,
    error,
    filters,
    setFilters,
    refetch,
  };
};

export const Home: React.FC = () => {
  const { state: routeState } = useLocation();
  const navigate = useNavigate();
  const { favorites } = useApp();
  
  const { jobs, loading, error, filters, setFilters, refetch } = useJobs();
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Verifica se veio redirecionado do clique do Navbar de favoritos
  useEffect(() => {
    if (routeState && (routeState as any).filterFavorites) {
      setShowFavoritesOnly(true);
      // Limpa o estado da rota para não persistir em recargas futuras
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [routeState, navigate]);

  // Filtra as vagas exibidas se a opção de favoritos estiver marcada
  const displayedJobs = showFavoritesOnly 
    ? jobs.filter(job => favorites.includes(job.id)) 
    : jobs;

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      
      {/* Hero Section */}
      <Box 
        sx={{ 
          textAlign: 'center', 
          mb: 6,
          py: { xs: 4, md: 6 },
          px: 2,
          background: 'radial-gradient(circle at 50% 50%, rgba(99, 102, 241, 0.15) 0%, rgba(15, 23, 42, 0) 70%)',
          borderRadius: '16px',
        }}
      >
        <Box 
          sx={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            gap: 1, 
            backgroundColor: 'rgba(99, 102, 241, 0.1)', 
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '20px',
            px: 2,
            py: 0.5,
            mb: 2
          }}
        >
          <Sparkles size={14} style={{ color: '#a5b4fc' }} />
          <Typography variant="caption" sx={{ color: '#a5b4fc', fontFamily: '"Inter", sans-serif', fontWeight: 600, letterSpacing: '0.05em' }}>
            CONECTANDO TALENTOS DE FRONTEND E BACKEND
          </Typography>
        </Box>

        <Typography 
          variant="h2" 
          component="h1" 
          sx={{ 
            fontFamily: '"Outfit", sans-serif', 
            fontWeight: 800, 
            color: '#fff',
            fontSize: { xs: '2.2rem', sm: '3rem', md: '4rem' },
            letterSpacing: '-0.02em',
            mb: 2,
            lineHeight: 1.1
          }}
        >
          O primeiro passo da sua <br />
          <Box component="span" sx={{ 
            background: 'linear-gradient(90deg, #818cf8 0%, #c084fc 100%)', 
            WebkitBackgroundClip: 'text', 
            WebkitTextFillColor: 'transparent' 
          }}>
            carreira de Dev
          </Box>
        </Typography>

        <Typography 
          variant="h6" 
          sx={{ 
            fontFamily: '"Inter", sans-serif', 
            color: '#94a3b8', 
            fontWeight: 400,
            maxWidth: '650px',
            mx: 'auto',
            fontSize: { xs: '1rem', md: '1.2rem' },
            lineHeight: 1.6,
            mb: 4
          }}
        >
          Encontre oportunidades de estágio altamente selecionadas com foco em aprendizado e mentorias reais de tecnologia.
        </Typography>
      </Box>

      {/* Filtros de Vaga */}
      <JobFilters 
        filters={filters} 
        onChangeFilters={setFilters} 
        onRefresh={refetch} 
      />

      {/* Indicador de Visualização de Vagas Favoritadas */}
      {showFavoritesOnly && (
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            backgroundColor: 'rgba(239, 68, 68, 0.08)',
            border: '1px solid rgba(239, 68, 68, 0.15)',
            borderRadius: '8px',
            p: 2,
            mb: 3
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: '#ef4444' }}>
            <Heart size={18} fill="#ef4444" />
            <Typography variant="body2" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 600 }}>
              Visualizando apenas vagas favoritadas ({favorites.length})
            </Typography>
          </Box>
          <Button 
            size="small" 
            onClick={() => setShowFavoritesOnly(false)}
            sx={{ 
              color: '#94a3b8', 
              textTransform: 'none', 
              fontFamily: '"Inter", sans-serif',
              '&:hover': { color: '#fff' }
            }}
          >
            Ver todas as vagas
          </Button>
        </Box>
      )}

      {/* Listagem de Vagas */}
      <Box sx={{ mt: 2 }}>
        {loading ? (
          <LoadingSkeleton />
        ) : error ? (
          <ErrorMessage message={error} onRetry={refetch} />
        ) : displayedJobs.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 6 }}>
            <Alert 
              severity="info" 
              sx={{ 
                justifyContent: 'center', 
                background: 'rgba(99, 102, 241, 0.05)',
                border: '1px solid rgba(99, 102, 241, 0.15)',
                color: '#cbd5e1',
                borderRadius: '8px',
                fontFamily: '"Inter", sans-serif',
                '& .MuiAlert-icon': { color: '#6366f1' }
              }}
            >
              Nenhuma vaga encontrada para os filtros selecionados. Tente alterar os critérios de busca.
            </Alert>
          </Box>
        ) : (
          <Grid container spacing={1}>
            <Grid size={12}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="body2" sx={{ color: '#64748b', fontFamily: '"Inter", sans-serif' }}>
                  Mostrando {displayedJobs.length} vaga{displayedJobs.length > 1 ? 's' : ''} encontrada{displayedJobs.length > 1 ? 's' : ''}
                </Typography>
              </Box>
            </Grid>
            {displayedJobs.map((job) => (
              <Grid size={12} key={job.id}>
                <JobCard job={job} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>

    </Container>
  );
};

export default Home;
