import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Button, IconButton, Grid, Avatar } from '@mui/material';
import { Link } from 'react-router-dom';
import { Heart, MapPin, Calendar, DollarSign, ArrowRight, CheckCircle } from 'lucide-react';
import type { Job } from '../App';
import { useApp } from '../App';

interface JobCardProps {
  job: Job;
}

export const JobCard: React.FC<JobCardProps> = ({ job }) => {
  const { toggleFavorite, isFavorite, isApplied } = useApp();
  
  const favorited = isFavorite(job.id);
  const applied = isApplied(job.id);

  // Mapeamento de cores baseado no tipo de vaga para apelo visual premium
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'Remoto': return { bg: 'rgba(16, 185, 129, 0.1)', color: '#10b981' };
      case 'Híbrido': return { bg: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b' };
      case 'Presencial': return { bg: 'rgba(99, 102, 241, 0.1)', color: '#6366f1' };
      default: return { bg: 'rgba(255, 255, 255, 0.05)', color: '#94a3b8' };
    }
  };

  const typeStyle = getTypeColor(job.type);

  return (
    <Card 
      sx={{ 
        mb: 3, 
        background: 'rgba(30, 41, 59, 0.5)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.05)',
        borderRadius: '12px',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out, border-color 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 24px -10px rgba(99, 102, 241, 0.2)',
          borderColor: 'rgba(99, 102, 241, 0.3)'
        }
      }}
    >
      <CardContent sx={{ p: 3, '&:last-child': { pb: 3 } }}>
        <Grid container spacing={2}>
          
          {/* Header da vaga: Logo e Título */}
          <Grid size={{ xs: 12, sm: 9 }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
              <Avatar 
                sx={{ 
                  bgcolor: '#6366f1', 
                  width: 48, 
                  height: 48, 
                  fontSize: '1.1rem',
                  fontWeight: 750,
                  fontFamily: '"Outfit", sans-serif',
                  boxShadow: '0 0 12px rgba(99, 102, 241, 0.3)'
                }}
              >
                {job.logo}
              </Avatar>
              <Box>
                <Typography 
                  variant="h6" 
                  sx={{ 
                    fontFamily: '"Inter", sans-serif',
                    fontWeight: 700, 
                    color: '#fff',
                    lineHeight: 1.3,
                    mb: 0.5
                  }}
                >
                  {job.title}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                  <Typography variant="subtitle2" sx={{ color: '#cbd5e1', fontFamily: '"Inter", sans-serif', fontWeight: 500 }}>
                    {job.company}
                  </Typography>
                  <Typography variant="caption" sx={{ color: '#64748b' }}>•</Typography>
                  <Chip 
                    label={job.type} 
                    size="small" 
                    sx={{ 
                      backgroundColor: typeStyle.bg, 
                      color: typeStyle.color,
                      fontWeight: 600,
                      fontSize: '0.75rem',
                      fontFamily: '"Inter", sans-serif',
                      height: '20px'
                    }} 
                  />
                  {applied && (
                    <Chip 
                      icon={<CheckCircle size={12} style={{ color: '#10b981' }} />}
                      label="Candidatado" 
                      size="small" 
                      sx={{ 
                        backgroundColor: 'rgba(16, 185, 129, 0.12)', 
                        color: '#10b981',
                        fontWeight: 600,
                        fontSize: '0.75rem',
                        fontFamily: '"Inter", sans-serif',
                        height: '20px',
                        '& .MuiChip-icon': { color: '#10b981 !important' }
                      }} 
                    />
                  )}
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Botão Favoritar */}
          <Grid size={{ xs: 12, sm: 3 }} sx={{ display: 'flex', justifyContent: { xs: 'flex-start', sm: 'flex-end' }, alignItems: 'flex-start' }}>
            <IconButton 
              onClick={() => toggleFavorite(job.id)}
              sx={{ 
                color: favorited ? '#ef4444' : '#64748b',
                backgroundColor: favorited ? 'rgba(239, 68, 68, 0.08)' : 'rgba(255, 255, 255, 0.02)',
                borderRadius: '8px',
                '&:hover': {
                  color: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.12)'
                }
              }}
            >
              <Heart size={20} fill={favorited ? '#ef4444' : 'none'} />
            </IconButton>
          </Grid>

          {/* Resumo da descrição */}
          <Grid size={12}>
            <Typography 
              variant="body2" 
              sx={{ 
                color: '#94a3b8', 
                fontFamily: '"Inter", sans-serif',
                lineHeight: 1.6,
                my: 1,
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                textOverflow: 'ellipsis'
              }}
            >
              {job.description}
            </Typography>
          </Grid>

          {/* Rodapé do Card: Info e Ação */}
          <Grid size={12} sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', md: 'center' }, gap: 2, pt: 1 }}>
            
            {/* Metadados (Salário, Localização, Data) */}
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#94a3b8' }}>
                <DollarSign size={16} style={{ color: '#10b981' }} />
                <Typography variant="caption" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 500 }}>
                  {job.salary}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#94a3b8' }}>
                <MapPin size={16} />
                <Typography variant="caption" sx={{ fontFamily: '"Inter", sans-serif' }}>
                  {job.location}
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: '#64748b' }}>
                <Calendar size={16} />
                <Typography variant="caption" sx={{ fontFamily: '"Inter", sans-serif' }}>
                  {job.postedAt}
                </Typography>
              </Box>
            </Box>

            {/* Ação */}
            <Button
              component={Link}
              to={`/vaga/${job.id}`}
              variant="contained"
              endIcon={<ArrowRight size={16} />}
              sx={{
                background: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                color: '#fff',
                fontFamily: '"Inter", sans-serif',
                textTransform: 'none',
                fontWeight: 600,
                borderRadius: '8px',
                px: 3,
                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.25)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                  boxShadow: '0 6px 16px rgba(99, 102, 241, 0.4)',
                }
              }}
            >
              Ver Detalhes
            </Button>

          </Grid>

          {/* Tecnologias exigidas (tags) */}
          <Grid size={12} sx={{ borderTop: '1px solid rgba(255, 255, 255, 0.05)', pt: 2, mt: 1 }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {job.skills.map((skill) => (
                <Chip 
                  key={skill} 
                  label={skill} 
                  size="small" 
                  sx={{ 
                    backgroundColor: 'rgba(255, 255, 255, 0.03)', 
                    color: '#cbd5e1', 
                    fontSize: '0.75rem',
                    fontFamily: '"Inter", sans-serif',
                    border: '1px solid rgba(255, 255, 255, 0.05)',
                    '&:hover': {
                      backgroundColor: 'rgba(99, 102, 241, 0.08)',
                      borderColor: 'rgba(99, 102, 241, 0.2)',
                      color: '#a5b4fc'
                    }
                  }} 
                />
              ))}
            </Box>
          </Grid>

        </Grid>
      </CardContent>
    </Card>
  );
};
export default JobCard;
