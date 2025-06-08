import { Box, Typography, Paper, useTheme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import {
  Description as PapersIcon,
  CloudUpload as UploadIcon,
  AutoAwesome as GenerateIcon,
  Assessment as AnalyticsIcon,
  School as SchoolIcon,
  People as PeopleIcon,
  BarChart as BarChartIcon,
} from '@mui/icons-material';

const Dashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();

  const stats = [
    { title: 'Total Papers', value: '124', icon: <PapersIcon fontSize="large" color="primary" /> },
    { title: 'Students', value: '89', icon: <PeopleIcon fontSize="large" color="secondary" /> },
    { title: 'Subjects', value: '12', icon: <SchoolIcon fontSize="large" color="success" /> },
    { title: 'Avg. Score', value: '78%', icon: <BarChartIcon fontSize="large" color="warning" /> },
  ];

  const quickActions = [
    {
      title: 'View Papers',
      description: 'Access and manage all your exam papers',
      icon: <PapersIcon fontSize="large" color="primary" />,
      path: '/papers',
    },
    {
      title: 'Upload Paper',
      description: 'Upload new exam papers to the system',
      icon: <UploadIcon fontSize="large" color="primary" />,
      path: '/upload',
    },
    {
      title: 'Generate Paper',
      description: 'Create custom exam papers',
      icon: <GenerateIcon fontSize="large" color="primary" />,
      path: '/generate',
    },
    {
      title: 'View Analytics',
      description: 'Analyze exam performance',
      icon: <AnalyticsIcon fontSize="large" color="primary" />,
      path: '/analytics',
    },
  ];

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" sx={{ mb: 4 }}>Dashboard</Typography>
      
      {/* Stats Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, 
        gap: 3, 
        mb: 6 
      }}>
        {stats.map((stat, index) => (
          <Paper 
            key={index} 
            sx={{ 
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              height: '100%',
            }}
          >
            <Box sx={{ mb: 2 }}>{stat.icon}</Box>
            <Typography variant="h6" sx={{ mb: 1 }}>{stat.title}</Typography>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {stat.value}
            </Typography>
          </Paper>
        ))}
      </Box>

      {/* Quick Actions */}
      <Typography variant="h5" sx={{ mb: 3 }}>Quick Actions</Typography>
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(4, 1fr)' }, 
        gap: 3 
      }}>
        {quickActions.map((action, index) => (
          <Paper 
            key={index}
            onClick={() => navigate(action.path)}
            sx={{
              p: 3,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: theme.shadows[8],
              },
              height: '100%',
            }}
          >
            <Box sx={{ mb: 2, color: 'primary.main' }}>{action.icon}</Box>
            <Typography variant="h6" sx={{ mb: 1 }}>{action.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {action.description}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
