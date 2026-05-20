import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { 
  Container, Typography, Box, Grid, Paper, Button, 
  List, ListItem, ListItemIcon, ListItemText, Divider, Alert,
  TextField, Dialog, DialogTitle, DialogContent, DialogActions,
  CircularProgress, Avatar
} from '@mui/material';
import { 
  ArrowLeft, MapPin, DollarSign, Calendar, Heart, 
  Send, ShieldCheck, CheckCircle2, ChevronRight, ExternalLink
} from 'lucide-react';
import { useApp, JobService, type Job } from '../App';
import { ErrorMessage } from '../components/ErrorMessage';

export const JobDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite, applyToJob, isApplied } = useApp();
  
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  
  // Estados para Modal de Candidatura
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [candidateName, setCandidateName] = useState('');
  const [candidateEmail, setCandidateEmail] = useState('');
  const [candidateGithub, setCandidateGithub] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const favorited = job ? isFavorite(job.id) : false;
  const applied = job ? isApplied(job.id) : false;

  // Busca detalhes da vaga
  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!id) return;
      setLoading(true);
      setError(null);
      try {
        const data = await JobService.getJobById(id);
        setJob(data);
      } catch (err: any) {
        setError(err.message || 'Falha ao carregar detalhes da vaga.');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  // Simula o envio do formulário de candidatura
  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!job || !candidateName || !candidateEmail) return;

    setSubmitting(true);
    // Simula atraso na requisição de candidatura
    setTimeout(() => {
      applyToJob(job.id);
      setSubmitting(false);
      setOpenModal(false);
    }, 1200);
  };

  if (loading) {
    return (
      <Container maxWidth="md" sx={{ py: 8, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <Box sx={{ textAlign: 'center' }}>
          <CircularProgress sx={{ color: '#6366f1' }} />
          <Typography variant="body2" sx={{ color: '#94a3b8', mt: 2, fontFamily: '"Inter", sans-serif' }}>
            Carregando detalhes da vaga...
          </Typography>
        </Box>
      </Container>
    );
  }

  if (error || !job) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Button 
          component={Link} 
          to="/" 
          startIcon={<ArrowLeft size={16} />}
          sx={{ color: '#94a3b8', mb: 4, textTransform: 'none', fontFamily: '"Inter", sans-serif' }}
        >
          Voltar para vagas
        </Button>
        <ErrorMessage message={error || 'Vaga não encontrada.'} onRetry={() => navigate('/')} />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>
      
      {/* Botão Voltar */}
      <Button 
        component={Link} 
        to="/" 
        startIcon={<ArrowLeft size={16} />}
        sx={{ 
          color: '#cbd5e1', 
          mb: 4, 
          textTransform: 'none', 
          fontFamily: '"Inter", sans-serif',
          '&:hover': { color: '#fff' }
        }}
      >
        Voltar para a listagem
      </Button>

      <Grid container spacing={4}>
        
        {/* Painel Esquerdo: Detalhes principais */}
        <Grid size={{ xs: 12, md: 8 }}>
          <Paper
            elevation={0}
            sx={{
              p: { xs: 3, md: 4 },
              background: 'rgba(30, 41, 59, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              mb: 4
            }}
          >
            {/* Header com Avatar e Ações */}
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 3, mb: 4 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar 
                  sx={{ 
                    bgcolor: '#6366f1', 
                    width: 64, 
                    height: 64, 
                    fontSize: '1.5rem',
                    fontWeight: 750,
                    fontFamily: '"Outfit", sans-serif',
                    boxShadow: '0 0 16px rgba(99, 102, 241, 0.4)'
                  }}
                >
                  {job.logo}
                </Avatar>
                <Box>
                  <Typography variant="h4" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 800, color: '#fff', fontSize: { xs: '1.6rem', md: '2rem' } }}>
                    {job.title}
                  </Typography>
                  <Typography variant="h6" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 500, color: '#cbd5e1', mt: 0.5 }}>
                    {job.company}
                  </Typography>
                </Box>
              </Box>

              {/* Ações Rápidas (Favoritar) */}
              <Button
                variant="outlined"
                onClick={() => toggleFavorite(job.id)}
                startIcon={<Heart size={16} fill={favorited ? '#ef4444' : 'none'} />}
                sx={{
                  borderColor: favorited ? '#ef4444' : 'rgba(255, 255, 255, 0.1)',
                  color: favorited ? '#ef4444' : '#cbd5e1',
                  textTransform: 'none',
                  fontFamily: '"Inter", sans-serif',
                  '&:hover': {
                    borderColor: '#ef4444',
                    backgroundColor: 'rgba(239, 68, 68, 0.05)'
                  }
                }}
              >
                {favorited ? 'Salva' : 'Salvar Vaga'}
              </Button>
            </Box>

            <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)', my: 3 }} />

            {/* Descrição da Vaga */}
            <Typography variant="h6" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, color: '#fff', mb: 2 }}>
              Descrição da Oportunidade
            </Typography>
            <Typography variant="body1" sx={{ fontFamily: '"Inter", sans-serif', color: '#cbd5e1', lineHeight: 1.7, mb: 4 }}>
              {job.description}
            </Typography>

            {/* Requisitos */}
            <Typography variant="h6" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, color: '#fff', mb: 2 }}>
              Requisitos & Qualificações
            </Typography>
            <List sx={{ mb: 4 }}>
              {job.requirements.map((req, i) => (
                <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start', py: 0.75 }}>
                  <ListItemIcon sx={{ minWidth: '32px', mt: 0.5, color: '#6366f1' }}>
                    <ChevronRight size={18} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography sx={{ fontFamily: '"Inter", sans-serif', color: '#cbd5e1', fontSize: '0.95rem' }}>
                        {req}
                      </Typography>
                    } 
                  />
                </ListItem>
              ))}
            </List>

            {/* Benefícios */}
            <Typography variant="h6" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, color: '#fff', mb: 2 }}>
              O que oferecemos (Benefícios)
            </Typography>
            <List>
              {job.benefits.map((benefit, i) => (
                <ListItem key={i} disableGutters sx={{ alignItems: 'flex-start', py: 0.75 }}>
                  <ListItemIcon sx={{ minWidth: '32px', mt: 0.5, color: '#10b981' }}>
                    <ShieldCheck size={18} />
                  </ListItemIcon>
                  <ListItemText 
                    primary={
                      <Typography sx={{ fontFamily: '"Inter", sans-serif', color: '#cbd5e1', fontSize: '0.95rem' }}>
                        {benefit}
                      </Typography>
                    } 
                  />
                </ListItem>
              ))}
            </List>

          </Paper>
        </Grid>

        {/* Painel Direito: Informações e Inscrição */}
        <Grid size={{ xs: 12, md: 4 }}>
          <Box sx={{ position: 'sticky', top: '90px' }}>
            <Paper
              elevation={0}
              sx={{
                p: 3,
                background: 'rgba(30, 41, 59, 0.7)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                borderRadius: '16px',
                mb: 3
              }}
            >
              <Typography variant="subtitle1" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 700, color: '#fff', mb: 2 }}>
                Informações Importantes
              </Typography>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                
                {/* Remuneração */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(16, 185, 129, 0.1)', color: '#10b981', display: 'flex' }}>
                    <DollarSign size={20} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1 }}>
                      Bolsa Auxílio
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, mt: 0.5 }}>
                      {job.salary}
                    </Typography>
                  </Box>
                </Box>

                {/* Localização */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(99, 102, 241, 0.1)', color: '#6366f1', display: 'flex' }}>
                    <MapPin size={20} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1 }}>
                      Localização
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, mt: 0.5 }}>
                      {job.location} ({job.type})
                    </Typography>
                  </Box>
                </Box>

                {/* Postado em */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Box sx={{ p: 1, borderRadius: '8px', bgcolor: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', display: 'flex' }}>
                    <Calendar size={20} />
                  </Box>
                  <Box>
                    <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', lineHeight: 1 }}>
                      Anunciado em
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#fff', fontWeight: 600, mt: 0.5 }}>
                      {job.postedAt}
                    </Typography>
                  </Box>
                </Box>

              </Box>

              <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.05)', my: 3 }} />

              {/* Botão de Candidatura Dinâmico */}
              {applied ? (
                <Alert 
                  severity="success" 
                  icon={<CheckCircle2 size={20} />}
                  sx={{ 
                    background: 'rgba(16, 185, 129, 0.1)', 
                    border: '1px solid rgba(16, 185, 129, 0.2)',
                    color: '#a7f3d0',
                    fontFamily: '"Inter", sans-serif',
                    '& .MuiAlert-icon': { color: '#10b981' }
                  }}
                >
                  Candidatura enviada com sucesso! Aguarde contato da empresa.
                </Alert>
              ) : (
                <Button
                  fullWidth
                  variant="contained"
                  endIcon={<Send size={16} />}
                  onClick={() => setOpenModal(true)}
                  sx={{
                    background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    color: '#fff',
                    fontFamily: '"Inter", sans-serif',
                    textTransform: 'none',
                    fontWeight: 600,
                    borderRadius: '8px',
                    py: 1.5,
                    boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                    }
                  }}
                >
                  Candidatar-se agora
                </Button>
              )}
            </Paper>

            {/* Informações da Empresa */}
            {job.companyDescription && (
              <Paper
                elevation={0}
                sx={{
                  p: 3,
                  background: 'rgba(30, 41, 59, 0.3)',
                  border: '1px solid rgba(255, 255, 255, 0.03)',
                  borderRadius: '16px',
                }}
              >
                <Typography variant="subtitle2" sx={{ fontFamily: '"Inter", sans-serif', color: '#cbd5e1', fontWeight: 650, mb: 1 }}>
                  Sobre a {job.company}
                </Typography>
                <Typography variant="body2" sx={{ fontFamily: '"Inter", sans-serif', color: '#94a3b8', lineHeight: 1.6, mb: 2 }}>
                  {job.companyDescription}
                </Typography>
                {job.companyWebsite && (
                  <Button
                    component="a"
                    href={job.companyWebsite}
                    target="_blank"
                    rel="noopener noreferrer"
                    size="small"
                    endIcon={<ExternalLink size={12} />}
                    sx={{ color: '#a5b4fc', textTransform: 'none', fontFamily: '"Inter", sans-serif', p: 0 }}
                  >
                    Visitar site da empresa
                  </Button>
                )}
              </Paper>
            )}
          </Box>
        </Grid>

      </Grid>

      {/* Modal / Diálogo de Candidatura */}
      <Dialog 
        open={openModal} 
        onClose={() => !submitting && setOpenModal(false)}
        slotProps={{
          paper: {
            sx: {
              background: 'rgba(15, 23, 42, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              borderRadius: '16px',
              color: '#fff',
              maxWidth: '450px',
              width: '100%'
            }
          }
        }}
      >
        <DialogTitle sx={{ fontFamily: '"Outfit", sans-serif', fontWeight: 700, pb: 1 }}>
          Candidatura para {job.title}
        </DialogTitle>
        <form onSubmit={handleApplySubmit}>
          <DialogContent sx={{ pt: 1, display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Typography variant="body2" sx={{ color: '#94a3b8', fontFamily: '"Inter", sans-serif', mb: 1 }}>
              Insira seus dados abaixo para enviar sua candidatura de estágio. Esses dados serão consolidados no localStorage.
            </Typography>

            <TextField
              required
              fullWidth
              label="Nome Completo"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
              disabled={submitting}
              sx={{
                '& .MuiInputLabel-root': { color: '#cbd5e1' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                }
              }}
            />

            <TextField
              required
              fullWidth
              type="email"
              label="E-mail"
              value={candidateEmail}
              onChange={(e) => setCandidateEmail(e.target.value)}
              disabled={submitting}
              sx={{
                '& .MuiInputLabel-root': { color: '#cbd5e1' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                }
              }}
            />

            <TextField
              fullWidth
              label="Link do GitHub (Opcional)"
              value={candidateGithub}
              onChange={(e) => setCandidateGithub(e.target.value)}
              disabled={submitting}
              sx={{
                '& .MuiInputLabel-root': { color: '#cbd5e1' },
                '& .MuiOutlinedInput-root': {
                  color: '#fff',
                  '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                  '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                  '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                }
              }}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 3, pt: 1, gap: 1 }}>
            <Button 
              onClick={() => setOpenModal(false)} 
              disabled={submitting}
              sx={{ color: '#cbd5e1', textTransform: 'none', fontFamily: '"Inter", sans-serif' }}
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              variant="contained"
              disabled={submitting}
              sx={{
                background: '#6366f1',
                color: '#fff',
                fontFamily: '"Inter", sans-serif',
                textTransform: 'none',
                px: 3,
                '&:hover': { background: '#4f46e5' }
              }}
            >
              {submitting ? <CircularProgress size={20} sx={{ color: '#fff' }} /> : 'Enviar Inscrição'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

    </Container>
  );
};

export default JobDetails;
