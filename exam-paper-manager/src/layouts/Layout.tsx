import { useState, useCallback, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Box, CssBaseline, Toolbar, useTheme, useMediaQuery } from '@mui/material';
import { useTheme as useAppTheme } from '../context/ThemeContext';
import { AppBar, Drawer } from '../components/layout';

const DRAWER_WIDTH = 240;

const Layout = () => {
  const theme = useTheme();
  const { isDarkMode } = useAppTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  
  // Auto-show/hide drawer based on screen size
  useEffect(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);
  
  const isOpen = !isMobile;

  const handleDrawerToggle = useCallback(() => {
    if (isMobile) {
      setMobileOpen(prev => !prev);
    }
  }, [isMobile]);

  const handleDrawerClose = useCallback(() => {
    if (isMobile) {
      setMobileOpen(false);
    }
  }, [isMobile]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <CssBaseline />
      <AppBar onMenuClick={handleDrawerToggle} />
      <Box
        component="nav"
        sx={{ width: { sm: DRAWER_WIDTH }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* Mobile Drawer */}
        <Drawer 
          variant="temporary"
          open={isMobile && mobileOpen}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile
          }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              boxSizing: 'border-box',
              width: DRAWER_WIDTH,
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
            },
          }}
        />
        
        {/* Desktop Drawer */}
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', md: 'block' },
            '& .MuiDrawer-paper': { 
              width: isOpen ? DRAWER_WIDTH : 0,
              overflowX: 'hidden',
              transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
              }),
              bgcolor: 'background.paper',
              borderRight: '1px solid',
              borderColor: 'divider',
              position: 'relative',
              whiteSpace: 'nowrap',
            },
          }}
          open={isOpen}
        />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${isOpen ? DRAWER_WIDTH : 0}px)` },
          ml: { sm: `${isOpen ? DRAWER_WIDTH : 0}px` },
          transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          bgcolor: 'background.default',
          minHeight: '100vh',
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Toolbar />
        <Box sx={{ mt: 2 }}>
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;
