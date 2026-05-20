import React from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <Paper
      elevation={0}
      sx={{
        p: 4,
        textAlign: 'center',
        background: 'rgba(239, 68, 68, 0.05)',
        border: '1px solid rgba(239, 68, 68, 0.2)',
        borderRadius: '12px',
        maxWidth: '500px',
        mx: 'auto',
        my: 4,
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <AlertTriangle size={48} style={{ color: '#ef4444' }} />
      </Box>
      <Typography variant="h6" sx={{ color: '#fca5a5', fontFamily: '"Inter", sans-serif', fontWeight: 600, mb: 1 }}>
        Ops! Ocorreu um erro
      </Typography>
      <Typography variant="body2" sx={{ color: '#cbd5e1', mb: 3, fontFamily: '"Inter", sans-serif' }}>
        {message}
      </Typography>
      {onRetry && (
        <Button
          variant="contained"
          onClick={onRetry}
          startIcon={<RefreshCw size={16} />}
          sx={{
            background: '#ef4444',
            color: '#fff',
            fontFamily: '"Inter", sans-serif',
            textTransform: 'none',
            '&:hover': {
              background: '#dc2626',
            },
          }}
        >
          Tentar novamente
        </Button>
      )}
    </Paper>
  );
};

export default ErrorMessage;
