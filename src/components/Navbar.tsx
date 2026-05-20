import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, Badge, IconButton } from '@mui/material';
import { NavLink, Link } from 'react-router-dom';
import { Briefcase, Info, Heart, Code } from 'lucide-react';
import { useApp } from '../App';

export const Navbar: React.FC = () => {
  const { favorites } = useApp();

  return (
    <AppBar position="sticky" elevation={0} sx={{ 
      background: 'rgba(15, 23, 42, 0.85)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      top: 0,
      zIndex: 1100
    }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between', height: '70px' }}>
          
          {/* Logo Estagio.dev */}
          <Box component={Link} to="/" sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            textDecoration: 'none',
            gap: 1,
            color: 'inherit'
          }}>
            <Code size={28} className="logo-icon" style={{ color: '#6366f1' }} />
            <Typography
              variant="h6"
              noWrap
              sx={{
                fontFamily: '"Outfit", "Inter", sans-serif',
                fontWeight: 800,
                letterSpacing: '.05rem',
                color: '#fff',
                fontSize: { xs: '1.2rem', sm: '1.4rem' },
                display: 'flex',
                alignItems: 'center',
              }}
            >
              Estagio
              <Box component="span" sx={{ color: '#6366f1' }}>.dev</Box>
            </Typography>
          </Box>

          {/* Links de navegação */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
            <Button
              component={NavLink}
              to="/"
              startIcon={<Briefcase size={18} />}
              sx={{
                color: '#94a3b8',
                fontFamily: '"Inter", sans-serif',
                textTransform: 'none',
                fontWeight: 500,
                px: 2,
                borderRadius: '8px',
                '&.active': {
                  color: '#fff',
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                },
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }
              }}
            >
              Vagas
            </Button>

            <Button
              component={NavLink}
              to="/sobre"
              startIcon={<Info size={18} />}
              sx={{
                color: '#94a3b8',
                fontFamily: '"Inter", sans-serif',
                textTransform: 'none',
                fontWeight: 500,
                px: 2,
                borderRadius: '8px',
                '&.active': {
                  color: '#fff',
                  backgroundColor: 'rgba(99, 102, 241, 0.12)',
                },
                '&:hover': {
                  color: '#fff',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                }
              }}
            >
              Sobre
            </Button>

            {/* Vagas Favoritas com Badge */}
            <IconButton 
              component={Link}
              to="/"
              state={{ filterFavorites: true }}
              sx={{ 
                color: '#94a3b8',
                backgroundColor: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '8px',
                width: '40px',
                height: '40px',
                '&:hover': {
                  color: '#ef4444',
                  backgroundColor: 'rgba(239, 68, 68, 0.08)'
                }
              }}
            >
              <Badge 
                badgeContent={favorites.length} 
                color="error"
                sx={{
                  '& .MuiBadge-badge': {
                    backgroundColor: '#ef4444',
                    color: '#fff',
                    fontWeight: 'bold',
                    fontFamily: '"Inter", sans-serif'
                  }
                }}
              >
                <Heart size={20} />
              </Badge>
            </IconButton>
          </Box>

        </Toolbar>
      </Container>
    </AppBar>
  );
};
