import { useState } from 'react';
import type { SelectChangeEvent } from '@mui/material/Select';
import {
  Box, 
  Typography, 
  Paper, 
  Card, 
  CardContent, 
  CardHeader, 
  TextField, 
  Button, 
  Divider, 
  Switch, 
  FormControlLabel, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  IconButton,
  Avatar
} from '@mui/material';
import {
  Person as PersonIcon,
  Email as EmailIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  DarkMode as DarkModeIcon,
  LightMode as LightModeIcon,
  Save as SaveIcon,
  Edit as EditIcon,
  Lock as LockIcon,
  Cancel as CancelIcon
} from '@mui/icons-material';

const SettingsPage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState('John Doe');
  const [email, setEmail] = useState('john.doe@example.com');
  const [phone, setPhone] = useState('+1 (555) 123-4567');
  const [bio, setBio] = useState('Experienced educator with a passion for teaching.');

  const handleLanguageChange = (event: SelectChangeEvent<string>) => {
    setLanguage(event.target.value);
  };

  const handleSave = () => {
    setIsEditing(false);
    // Add save logic here
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Add cancel logic here
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Settings
      </Typography>
      
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 3 }}>
        {/* Profile Section */}
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Card>
            <CardHeader 
              title="Profile Information" 
              action={
                isEditing ? (
                  <>
                    <IconButton color="primary" onClick={handleSave}>
                      <SaveIcon />
                    </IconButton>
                    <IconButton onClick={handleCancel}>
                      <CancelIcon />
                    </IconButton>
                  </>
                ) : (
                  <IconButton color="primary" onClick={() => setIsEditing(true)}>
                    <EditIcon />
                  </IconButton>
                )
              }
            />
            <Divider />
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
                <Avatar 
                  sx={{ 
                    width: 100, 
                    height: 100,
                    bgcolor: 'primary.main',
                    fontSize: 40
                  }}
                >
                  <PersonIcon fontSize="large" />
                </Avatar>
              </Box>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Box>
                  <TextField
                    fullWidth
                    label="Full Name"
                    variant="outlined"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={!isEditing}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    disabled={!isEditing}
                    InputProps={{
                      startAdornment: <EmailIcon color="action" sx={{ mr: 1 }} />,
                    }}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Phone Number"
                    variant="outlined"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    disabled={!isEditing}
                  />
                </Box>
                <Box>
                  <TextField
                    fullWidth
                    label="Bio"
                    variant="outlined"
                    multiline
                    rows={3}
                    value={bio}
                    onChange={(e) => setBio(e.target.value)}
                    disabled={!isEditing}
                  />
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Box>

        {/* Preferences Section */}
        <Box sx={{ width: { xs: '100%', md: '50%' } }}>
          <Card>
            <CardHeader title="Preferences" />
            <Divider />
            <CardContent>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                <Box>
                  <FormControl fullWidth>
                    <InputLabel id="language-select-label">Language</InputLabel>
                    <Select
                      labelId="language-select-label"
                      id="language-select"
                      value={language}
                      label="Language"
                      onChange={handleLanguageChange}
                      startAdornment={<LanguageIcon color="action" sx={{ mr: 1 }} />}
                    >
                      <MenuItem value="en">English</MenuItem>
                      <MenuItem value="es">Español</MenuItem>
                      <MenuItem value="fr">Français</MenuItem>
                      <MenuItem value="de">Deutsch</MenuItem>
                    </Select>
                  </FormControl>
                </Box>
                
                <Box>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={darkMode}
                          onChange={(e) => setDarkMode(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {darkMode ? (
                            <LightModeIcon color="action" sx={{ mr: 1 }} />
                          ) : (
                            <DarkModeIcon color="action" sx={{ mr: 1 }} />
                          )}
                          <span>Dark Mode</span>
                        </Box>
                      }
                      sx={{ m: 0 }}
                    />
                  </Paper>
                </Box>
                
                <Box>
                  <Paper variant="outlined" sx={{ p: 2 }}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications}
                          onChange={(e) => setNotifications(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <NotificationsIcon color="action" sx={{ mr: 1 }} />
                          <span>Email Notifications</span>
                        </Box>
                      }
                      sx={{ m: 0 }}
                    />
                  </Paper>
                </Box>
                
                <Box>
                  <Button
                    variant="contained"
                    color="secondary"
                    fullWidth
                    startIcon={<LockIcon />}
                    sx={{ mt: 2 }}
                  >
                    Change Password
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card sx={{ mt: 3, border: '1px solid', borderColor: 'error.main' }}>
            <CardHeader 
              title={
                <Typography color="error" variant="h6">
                  Danger Zone
                </Typography>
              } 
            />
            <Divider />
            <CardContent>
              <Button
                variant="outlined"
                color="error"
                fullWidth
                onClick={() => console.log('Deleting account...')}
              >
                Delete My Account
              </Button>
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                Warning: This action cannot be undone. All your data will be permanently deleted.
              </Typography>
            </CardContent>
          </Card>
        </Box>
      </Box>
    </Box>
  );
};

export default SettingsPage;
