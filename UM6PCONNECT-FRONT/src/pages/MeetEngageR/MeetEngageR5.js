import React from 'react';
import { Box, Typography } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

// Red arrow icon style
const iconStyle = {
  fontSize: { xs: 24, sm: 26, md: 30 },
  color: '#ea3b15',
  mr: 1.5,
  mt: '2px',
};

const textSize = { xs: '20px', sm: '22px', md: '25px' };

const MeetEngageR5 = () => {
  return (
    <Box sx={{ px: 4, py: 6, backgroundColor: '#fff', borderLeft: '1px solid #CCC' }}>
      {/* Paragraph */}
      <Typography
        sx={{
          fontSize: textSize,
          color: '#000',
          fontWeight: 300,
          mb: 4,
          lineHeight: 1.8,
        }}
      >
        Through the Ai Movement, UM6P is advancing data science for public systems. We’ve deployed 12
        machine learning models between 2021–2024 to support healthcare diagnostics, energy optimization,
        and collective decision-making. Our partners include DeepEcho (prenatal screening), OMS
        (predictive maintenance in smart cities), and the African Data Hub. Research is hosted at the
        School of Collective Intelligence and powered by Africa’s leading supercomputing platform.
      </Typography>


      {/* Project list with red arrows */}
      <Box sx={{ pl: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
          <ChevronRightIcon sx={iconStyle} />
          <Typography sx={{ fontSize: textSize, color: '#000' }}>
            Deep learning for prenatal health diagnostics (DeepEcho)
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 1 }}>
          <ChevronRightIcon sx={iconStyle} />
          <Typography sx={{ fontSize: textSize, color: '#000' }}>
            Agent-based policy modeling for urban planning
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
          <ChevronRightIcon sx={iconStyle} />
          <Typography sx={{ fontSize: textSize, color: '#000' }}>
            Digital twin for irrigation governance systems
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default MeetEngageR5;
