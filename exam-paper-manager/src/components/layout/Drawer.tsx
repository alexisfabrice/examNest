import { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { styled, useTheme } from '@mui/material/styles';
import type { CSSObject, Theme } from '@mui/material/styles';
import {
  Drawer as MuiDrawer,
  type DrawerProps as MuiDrawerProps,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Collapse,
  IconButton,
  useMediaQuery,
} from '@mui/material';
// import type { SxProps } from '@mui/system';
import type { SxProps as MuiSxProps } from '@mui/material/styles';
import {
  Home as HomeIcon,
  Description as PapersIcon,
  CloudUpload as UploadIcon,
  AutoAwesome as GenerateIcon,
  Assessment as AnalyticsIcon,
  ExpandLess,
  ExpandMore,
  School as SubjectIcon,
  Category as CategoryIcon,
  Settings as SettingsIcon,
  ChevronLeft,
  ChevronRight,
} from '@mui/icons-material';

interface MenuItem {
  text: string;
  icon: React.ReactNode;
  path: string;
  children?: MenuItem[];
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledDrawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== 'open',
})<{ open: boolean }>(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: 'nowrap',
  boxSizing: 'border-box',
  ...(open && {
    ...openedMixin(theme),
    '& .MuiDrawer-paper': openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    '& .MuiDrawer-paper': closedMixin(theme),
  }),
}));

interface DrawerProps extends Omit<MuiDrawerProps, 'open' | 'onClose' | 'variant'> {
  open: boolean;
  onClose: () => void;
  variant: 'temporary' | 'persistent' | 'permanent';
  sx?: MuiSxProps<Theme>;
}

const Drawer = ({ open, onClose, variant, sx = {}, ...props }: DrawerProps): JSX.Element => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);

  const mainMenuItems = useMemo<MenuItem[]>(
    () => [
      { text: 'Dashboard', icon: <HomeIcon />, path: '/' },
      { text: 'My Papers', icon: <PapersIcon />, path: '/papers' },
      { text: 'Upload Paper', icon: <UploadIcon />, path: '/upload' },
      { text: 'Generate Paper', icon: <GenerateIcon />, path: '/generate' },
      { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
    ],
    []
  );

  const handleMenuClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      onClose();
    }
  };

  const handleSubMenuClick = (text: string) => {
    setOpenSubMenu(openSubMenu === text ? null : text);
  };

  return (
    <StyledDrawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true,
      }}
      sx={{
        '& .MuiDrawer-paper': {
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        },
        ...sx,
      }}
      {...props}
    >
      <DrawerHeader>
        <Typography variant="h6" noWrap component="div" sx={{ ml: 1, fontWeight: 600 }}>
          ExamPro AI
        </Typography>
        <IconButton onClick={onClose}>
          {theme.direction === 'rtl' ? <ChevronRight /> : <ChevronLeft />}
        </IconButton>
      </DrawerHeader>
      <Divider />
      <Box sx={{ overflow: 'auto' }}>
        <List>
          {mainMenuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton
                selected={location.pathname === item.path}
                onClick={() => handleMenuClick(item.path)}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                  '&.Mui-selected': {
                    backgroundColor: theme.palette.action.selected,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  },
                  '&:hover': {
                    backgroundColor: theme.palette.action.hover,
                  },
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: location.pathname === item.path ? theme.palette.primary.main : 'inherit',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={{ opacity: open ? 1 : 0 }}
                  primaryTypographyProps={{
                    variant: 'body2',
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider sx={{ my: 1 }} />
        <List>
          <ListItemButton
            onClick={() => handleSubMenuClick('subjects')}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <SubjectIcon />
            </ListItemIcon>
            <ListItemText
              primary="Subjects"
              sx={{ opacity: open ? 1 : 0 }}
              primaryTypographyProps={{
                variant: 'body2',
              }}
            />
            {open && (openSubMenu === 'subjects' ? <ExpandLess /> : <ExpandMore />)}
          </ListItemButton>
          <Collapse in={openSubMenu === 'subjects' && open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {['Mathematics', 'Science', 'History', 'Literature'].map((subject) => (
                <ListItemButton
                  key={subject}
                  sx={{
                    pl: 6,
                    minHeight: 40,
                    '&:hover': {
                      backgroundColor: theme.palette.action.hover,
                    },
                  }}
                  onClick={() => handleMenuClick(`/subjects/${subject.toLowerCase()}`)}
                >
                  <ListItemText
                    primary={subject}
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                  />
                </ListItemButton>
              ))}
            </List>
          </Collapse>
          <ListItemButton
            onClick={() => handleMenuClick('/categories')}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <CategoryIcon />
            </ListItemIcon>
            <ListItemText
              primary="Categories"
              sx={{ opacity: open ? 1 : 0 }}
              primaryTypographyProps={{
                variant: 'body2',
              }}
            />
          </ListItemButton>
        </List>
        <Divider sx={{ my: 1 }} />
        <List>
          <ListItemButton
            onClick={() => handleMenuClick('/settings')}
            sx={{
              minHeight: 48,
              justifyContent: open ? 'initial' : 'center',
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 0,
                mr: open ? 3 : 'auto',
                justifyContent: 'center',
              }}
            >
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText
              primary="Settings"
              sx={{ opacity: open ? 1 : 0 }}
              primaryTypographyProps={{
                variant: 'body2',
              }}
            />
          </ListItemButton>
        </List>
      </Box>
    </StyledDrawer>
  );
};

export default Drawer;
