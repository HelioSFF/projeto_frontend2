import React from 'react';
import { Container, Typography, Box, Paper, Grid, Chip } from '@mui/material';
import { Code2, Users, BookOpen, Layers } from 'lucide-react';

export const About: React.FC = () => {
  // Lista fictícia de integrantes para que os alunos possam substituir facilmente
  const groupMembers = [
    { name: 'Hélio Siqueira', role: 'Desenvolvedor' },
    { name: 'Pedro Felipe', role: 'Desenvolvedor' },
    { name: 'Sabrina Holanda', role: 'Desenvolvedora' },
  ];

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 4, md: 6 } }}>

      {/* Cabeçalho */}
      <Box sx={{ mb: 6, textAlign: 'center' }}>
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
          <BookOpen size={14} style={{ color: '#a5b4fc' }} />
          <Typography variant="caption" sx={{ color: '#a5b4fc', fontFamily: '"Inter", sans-serif', fontWeight: 600 }}>
            TECNOLOGIA PARA FRONTEND AVANÇADO
          </Typography>
        </Box>
        <Typography
          variant="h3"
          component="h1"
          sx={{
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 800,
            color: '#fff',
            fontSize: { xs: '2rem', sm: '2.8rem' }
          }}
        >
          Sobre o Estagio.dev
        </Typography>
        <Typography variant="h6" sx={{ fontFamily: '"Inter", sans-serif', color: '#94a3b8', mt: 2, maxWidth: '650px', mx: 'auto', fontWeight: 400 }}>
          Plataforma desenvolvida para simplificar a inserção de desenvolvedores iniciantes no mercado de trabalho de TI.
        </Typography>
      </Box>

      {/* Conteúdo em Grid */}
      <Grid container spacing={4}>

        {/* Painel Principal: O Projeto */}
        <Grid size={{ xs: 12, md: 7 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: 'rgba(30, 41, 59, 0.5)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              mb: 4
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Code2 size={24} style={{ color: '#6366f1' }} />
              <Typography variant="h5" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 700, color: '#fff' }}>
                O Projeto
              </Typography>
            </Box>

            <Typography variant="body1" sx={{ fontFamily: '"Inter", sans-serif', color: '#cbd5e1', lineHeight: 1.7, mb: 3 }}>
              O <strong>Estagio.dev</strong> foi construído sob premissas rigorosas de usabilidade, responsividade e separação clara de responsabilidades.
              A aplicação serve como um hub onde estudantes podem filtrar vagas de estágio por modelo de trabalho (remoto, híbrido ou presencial), ler atribuições e requisitos, gerenciar vagas de interesse nos "favoritos" e submeter candidaturas fictícias.
            </Typography>

            <Typography variant="body1" sx={{ fontFamily: '"Inter", sans-serif', color: '#cbd5e1', lineHeight: 1.7, mb: 3 }}>
              A arquitetura é 100% componentizada, integrando de forma contínua o ecossistema do <strong>Material UI (MUI)</strong>, gerenciamento de estado global com <strong>React Context API</strong> e hooks customizados para encapsular a lógica de comunicação externa.
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mt: 4, mb: 2 }}>
              <Layers size={24} style={{ color: '#6366f1' }} />
              <Typography variant="h6" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 700, color: '#fff' }}>
                Tecnologias Utilizadas
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
              {['React 19', 'TypeScript', 'Vite', 'Material UI (MUI)', 'React Router 6', 'Lucide Icons', 'HTML5 & CSS3'].map(tech => (
                <Chip
                  key={tech}
                  label={tech}
                  sx={{
                    bgcolor: 'rgba(99, 102, 241, 0.08)',
                    color: '#a5b4fc',
                    fontWeight: 600,
                    fontFamily: '"Inter", sans-serif',
                    border: '1px solid rgba(99, 102, 241, 0.2)'
                  }}
                />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Painel Lateral: Equipe */}
        <Grid size={{ xs: 12, md: 5 }}>
          <Paper
            elevation={0}
            sx={{
              p: 4,
              background: 'rgba(30, 41, 59, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              mb: 4
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
              <Users size={24} style={{ color: '#10b981' }} />
              <Typography variant="h5" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 700, color: '#fff' }}>
                Integrantes do Grupo
              </Typography>
            </Box>

            <Typography variant="body2" sx={{ fontFamily: '"Inter", sans-serif', color: '#94a3b8', mb: 3 }}>
              Membros do grupo de desenvolvimento:
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {groupMembers.map((member, i) => (
                <Paper
                  key={i}
                  elevation={0}
                  sx={{
                    p: 2,
                    background: 'rgba(15, 23, 42, 0.4)',
                    border: '1px solid rgba(255, 255, 255, 0.03)',
                    borderRadius: '8px'
                  }}
                >
                  <Typography variant="body1" sx={{ fontFamily: '"Inter", sans-serif', color: '#fff', fontWeight: 600 }}>
                    {member.name}
                  </Typography>
                  <Typography variant="caption" sx={{ fontFamily: '"Inter", sans-serif', color: '#10b981', display: 'block', mt: 0.5 }}>
                    {member.role}
                  </Typography>
                </Paper>
              ))}
            </Box>
          </Paper>
        </Grid>

      </Grid>

    </Container>
  );
};

export default About;
