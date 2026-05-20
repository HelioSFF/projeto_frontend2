import React from 'react';
import { Card, CardContent, Skeleton, Box, Grid } from '@mui/material';

export const LoadingSkeleton: React.FC = () => {
  // Gera um array com 3 itens para simular 3 cards carregando
  const items = Array.from(new Array(3));

  return (
    <Box sx={{ width: '100%' }}>
      {items.map((_, index) => (
        <Card 
          key={index} 
          sx={{ 
            mb: 3, 
            background: 'rgba(30, 41, 59, 0.5)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            borderRadius: '12px'
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              {/* Logo da Empresa */}
              <Skeleton 
                variant="circular" 
                width={48} 
                height={48} 
                sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} 
              />
              
              {/* Título e Empresa */}
              <Box sx={{ flex: 1 }}>
                <Skeleton 
                  variant="text" 
                  width="60%" 
                  height={28} 
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} 
                />
                <Skeleton 
                  variant="text" 
                  width="30%" 
                  height={20} 
                  sx={{ bgcolor: 'rgba(255, 255, 255, 0.08)' }} 
                />
              </Box>
            </Box>

            {/* Descrição curta */}
            <Skeleton 
              variant="rectangular" 
              height={40} 
              sx={{ mb: 2, borderRadius: '4px', bgcolor: 'rgba(255, 255, 255, 0.08)' }} 
            />

            <Grid container spacing={2} sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
              {/* Chips/Tags de tecnologias */}
              <Grid size={{ xs: 12, sm: 8 }}>
                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Skeleton variant="rectangular" width={70} height={24} sx={{ borderRadius: '16px', bgcolor: 'rgba(255, 255, 255, 0.08)' }} />
                  <Skeleton variant="rectangular" width={90} height={24} sx={{ borderRadius: '16px', bgcolor: 'rgba(255, 255, 255, 0.08)' }} />
                  <Skeleton variant="rectangular" width={60} height={24} sx={{ borderRadius: '16px', bgcolor: 'rgba(255, 255, 255, 0.08)' }} />
                </Box>
              </Grid>

              {/* Botões */}
              <Grid size={{ xs: 12, sm: 4 }} sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                <Skeleton variant="rectangular" width={100} height={36} sx={{ borderRadius: '8px', bgcolor: 'rgba(255, 255, 255, 0.08)' }} />
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};
export default LoadingSkeleton;
