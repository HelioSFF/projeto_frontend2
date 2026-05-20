import React, { useState, useEffect } from 'react';
import { 
  Paper, Box, TextField, Select, MenuItem, InputLabel, FormControl, 
  Typography, Switch, FormControlLabel, Slider, Button, Collapse 
} from '@mui/material';
import { Search, Settings, SlidersHorizontal, AlertCircle } from 'lucide-react';
import { getApiConfig, setApiConfig, type UseJobsFilters } from '../App';

interface JobFiltersProps {
  filters: UseJobsFilters;
  onChangeFilters: (filters: UseJobsFilters) => void;
  onRefresh: () => void;
}

export const JobFilters: React.FC<JobFiltersProps> = ({ filters, onChangeFilters, onRefresh }) => {
  const [showConfig, setShowConfig] = useState(false);
  const [apiError, setApiError] = useState(false);
  const [apiLatency, setApiLatency] = useState(800);

  // Carrega configuração da API ao montar o componente
  useEffect(() => {
    const config = getApiConfig();
    setApiError(config.simulateError);
    setApiLatency(config.simulateLatencyMs);
  }, []);

  // Handler para busca de texto
  const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChangeFilters({ ...filters, query: e.target.value });
  };

  // Handler para tipo de vaga
  const handleTypeChange = (e: any) => {
    onChangeFilters({ ...filters, type: e.target.value as string });
  };

  // Handler para simular erro da API
  const handleToggleError = (e: React.ChangeEvent<HTMLInputElement>) => {
    const checked = e.target.checked;
    setApiError(checked);
    setApiConfig({ simulateError: checked });
    onRefresh(); // Atualiza a busca com a nova configuração de erro
  };

  // Handler para latência da API
  const handleLatencyChange = (_event: Event | React.SyntheticEvent, value: number | number[]) => {
    const ms = value as number;
    setApiLatency(ms);
    setApiConfig({ simulateLatencyMs: ms });
  };

  // Aplica as alterações e força a recarga
  const handleApplyConfig = () => {
    onRefresh();
  };

  return (
    <Box>
      {/* Painel Principal de Filtros */}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          mb: 3,
          background: 'rgba(30, 41, 59, 0.7)',
          backdropFilter: 'blur(10px)',
          border: '1px solid rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
        }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          {/* Cabeçalho */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <SlidersHorizontal size={20} style={{ color: '#6366f1' }} />
              <Typography variant="h6" sx={{ fontFamily: '"Inter", sans-serif', fontWeight: 600, color: '#fff' }}>
                Filtros e Busca
              </Typography>
            </Box>
            <Button
              variant="text"
              size="small"
              startIcon={<Settings size={16} />}
              onClick={() => setShowConfig(!showConfig)}
              sx={{
                color: showConfig ? '#6366f1' : '#94a3b8',
                textTransform: 'none',
                fontFamily: '"Inter", sans-serif',
                '&:hover': {
                  color: '#6366f1',
                  backgroundColor: 'rgba(99, 102, 241, 0.08)'
                }
              }}
            >
              Simulador API
            </Button>
          </Box>

          {/* Inputs de Filtro */}
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
            {/* Campo de pesquisa de texto */}
            <Box sx={{ flex: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Buscar por cargo, empresa ou skill (ex: React)..."
                value={filters.query}
                onChange={handleQueryChange}
                slotProps={{
                   input: {
                     startAdornment: <Search size={18} style={{ color: '#94a3b8', marginRight: '8px' }} />,
                   }
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    color: '#fff',
                    fontFamily: '"Inter", sans-serif',
                    backgroundColor: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '8px',
                    '& fieldset': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                    '&:hover fieldset': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                    '&.Mui-focused fieldset': { borderColor: '#6366f1' },
                  }
                }}
              />
            </Box>

            {/* Dropdown de tipo de vaga */}
            <Box sx={{ flex: 1 }}>
              <FormControl fullWidth>
                <InputLabel id="job-type-label" sx={{ color: '#94a3b8', fontFamily: '"Inter", sans-serif' }}>Modelo</InputLabel>
                <Select
                  labelId="job-type-label"
                  id="job-type-select"
                  value={filters.type}
                  label="Modelo"
                  onChange={handleTypeChange}
                  sx={{
                    color: '#fff',
                    fontFamily: '"Inter", sans-serif',
                    backgroundColor: 'rgba(15, 23, 42, 0.4)',
                    borderRadius: '8px',
                    '& .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.1)' },
                    '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: 'rgba(255, 255, 255, 0.2)' },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': { borderColor: '#6366f1' },
                    '& .MuiSvgIcon-root': { color: '#94a3b8' }
                  }}
                >
                  <MenuItem value="Todos">Todos os modelos</MenuItem>
                  <MenuItem value="Remoto">Remoto</MenuItem>
                  <MenuItem value="Híbrido">Híbrido</MenuItem>
                  <MenuItem value="Presencial">Presencial</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      </Paper>

      {/* Painel do Simulador de API (Exclusivo para a Apresentação Acadêmica) */}
      <Collapse in={showConfig}>
        <Paper
          elevation={0}
          sx={{
            p: 3,
            mb: 3,
            background: 'rgba(30, 41, 59, 0.9)',
            border: '1px dashed rgba(99, 102, 241, 0.3)',
            borderRadius: '12px',
          }}
        >
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AlertCircle size={18} style={{ color: '#a5b4fc' }} />
              <Typography variant="subtitle2" sx={{ fontFamily: '"Inter", sans-serif', color: '#a5b4fc', fontWeight: 600 }}>
                Painel do Professor - Simulador de Estado da API
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ color: '#94a3b8', fontFamily: '"Inter", sans-serif' }}>
              Utilize os controles abaixo para simular as condições exigidas na avaliação da disciplina (erros e loading).
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, gap: 3, mt: 1, alignItems: 'center' }}>
              <FormControlLabel
                control={
                  <Switch 
                    checked={apiError} 
                    onChange={handleToggleError}
                    color="error"
                  />
                }
                label={
                  <Typography variant="body2" sx={{ color: '#fff', fontFamily: '"Inter", sans-serif' }}>
                    Simular Falha na Requisição (Erro)
                  </Typography>
                }
                sx={{ flex: 1 }}
              />

              <Box sx={{ flex: 2, width: '100%' }}>
                <Typography id="latency-slider" variant="body2" sx={{ color: '#fff', fontFamily: '"Inter", sans-serif', mb: 1 }}>
                  Latência da Rede (Simular Carregamento / Loading): <strong>{apiLatency}ms</strong>
                </Typography>
                <Slider
                  aria-labelledby="latency-slider"
                  value={apiLatency}
                  onChange={handleLatencyChange}
                  min={0}
                  max={4000}
                  step={100}
                  valueLabelDisplay="auto"
                  sx={{ color: '#6366f1' }}
                />
              </Box>

              <Button
                variant="outlined"
                size="small"
                onClick={handleApplyConfig}
                sx={{
                  borderColor: 'rgba(99, 102, 241, 0.5)',
                  color: '#a5b4fc',
                  fontFamily: '"Inter", sans-serif',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.1)'
                  }
                }}
              >
                Recarregar API
              </Button>
            </Box>
          </Box>
        </Paper>
      </Collapse>
    </Box>
  );
};

export default JobFilters;
