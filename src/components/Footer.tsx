import React from 'react';
import { Box, Container, Typography, Link } from '@mui/material';
import { Globe, Code } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 4,
        px: 2,
        mt: 'auto',
        backgroundColor: 'rgba(15, 23, 42, 0.95)',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
        color: '#64748b'
      }}
    >
      <Container maxWidth="lg">
        <Box 
          sx={{ 
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 1 }}>
            <Code size={18} style={{ color: '#6366f1' }} />
            <Typography variant="body2" sx={{ fontFamily: '"Inter", sans-serif', color: '#cbd5e1', fontWeight: 600 }}>
              Estagio.dev &copy; {new Date().getFullYear()}
            </Typography>
          </Box>
          
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ 
              fontFamily: '"Inter", sans-serif', 
              fontSize: '0.8rem',
              maxWidth: { xs: '100%', md: '500px' }
            }}
          >
            Trabalho prático da 2ª Avaliação de Tecnologia para FrontEnd Avançado.
            Foco em Componentização, Hooks, Rotas e Consumo de API.
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <Link 
              href="https://github.com" 
              target="_blank" 
              rel="noopener" 
              sx={{ 
                color: '#94a3b8', 
                '&:hover': { color: '#fff' },
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <Globe size={20} />
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};
