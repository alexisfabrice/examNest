import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  type SelectChangeEvent,
  CircularProgress,
  Alert,
  AlertTitle,
  IconButton,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  Close as CloseIcon,
} from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';

const subjects = [
  'Mathematics',
  'Physics',
  'Chemistry',
  'Biology',
  'Computer Science',
  'English',
  'History',
  'Geography',
  'Economics',
  'Other',
];

const paperTypes = ['Exam', 'Quiz', 'Assignment', 'Practice Test', 'Other'];

interface FormData {
  title: string;
  subject: string;
  paperType: string;
  description: string;
  file: File | null;
}

const PaperUploadPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState('');
  const [formData, setFormData] = useState<FormData>({
    title: '',
    subject: '',
    paperType: '',
    description: '',
    file: null,
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setFormData(prev => ({
        ...prev,
        file,
        title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension for title
      }));
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
    },
    maxFiles: 1,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRemoveFile = () => {
    setFormData(prev => ({
      ...prev,
      file: null,
      title: '',
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.file) {
      setUploadError('Please select a file to upload');
      return;
    }

    setIsUploading(true);
    setUploadError('');
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Reset form after successful upload
      setFormData({
        title: '',
        subject: '',
        paperType: '',
        description: '',
        file: null,
      });
      
      setUploadSuccess(true);
      
      // Hide success message after 5 seconds
      setTimeout(() => {
        setUploadSuccess(false);
      }, 5000);
      
    } catch (error) {
      setUploadError('An error occurred while uploading the file. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const isFormValid = formData.file && formData.title && formData.subject && formData.paperType;

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Upload Exam Paper
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Upload your exam papers in PDF, DOC, DOCX, or TXT format
        </Typography>
      </Box>

      {uploadSuccess && (
        <Alert 
          severity="success" 
          sx={{ mb: 3 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setUploadSuccess(false)}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Success</AlertTitle>
          Your paper has been uploaded successfully!
        </Alert>
      )}

      {uploadError && (
        <Alert 
          severity="error" 
          sx={{ mb: 3 }}
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => setUploadError('')}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          <AlertTitle>Error</AlertTitle>
          {uploadError}
        </Alert>
      )}

      <Paper sx={{ p: 3, mb: 4 }}>
        <form onSubmit={handleSubmit}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* File Upload Area */}
            <Box>
              <Box
                {...getRootProps()}
                sx={{
                  border: `2px dashed ${theme.palette.divider}`,
                  borderRadius: 1,
                  p: 4,
                  textAlign: 'center',
                  cursor: 'pointer',
                  backgroundColor: isDragActive ? 'action.hover' : 'background.paper',
                  transition: 'background-color 0.3s',
                  '&:hover': {
                    backgroundColor: 'action.hover',
                  },
                }}
              >
                <input {...getInputProps()} />
                <CloudUploadIcon sx={{ fontSize: 48, mb: 2, color: 'text.secondary' }} />
                <Typography variant="h6" gutterBottom>
                  {isDragActive ? 'Drop the file here' : 'Drag and drop a file here, or click to select'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Supported formats: PDF, DOC, DOCX, TXT (Max 10MB)
                </Typography>
              </Box>

              {formData.file && (
                <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
                  <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="body2" sx={{ flexGrow: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {formData.file.name}
                  </Typography>
                  <IconButton size="small" onClick={handleRemoveFile}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              )}
            </Box>

            {/* Form Fields */}
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
              <TextField
                label="Paper Title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                fullWidth
                required
                disabled={isUploading}
                helperText="A descriptive title for your paper"
              />

              <FormControl fullWidth required disabled={isUploading}>
                <InputLabel>Subject</InputLabel>
                <Select
                  name="subject"
                  value={formData.subject}
                  label="Subject"
                  onChange={handleSelectChange}
                >
                  {subjects.map((subject) => (
                    <MenuItem key={subject} value={subject}>
                      {subject}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl fullWidth required disabled={isUploading}>
                <InputLabel>Paper Type</InputLabel>
                <Select
                  name="paperType"
                  value={formData.paperType}
                  label="Paper Type"
                  onChange={handleSelectChange}
                >
                  {paperTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <TextField
                label="Year"
                type="number"
                name="year"
                fullWidth
                disabled={isUploading}
                helperText="Year the paper was administered (optional)"
              />
            </Box>

            <TextField
              label="Description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              multiline
              rows={4}
              fullWidth
              disabled={isUploading}
              helperText="Add any additional details about this paper"
            />

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => navigate(-1)}
                disabled={isUploading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                disabled={!isFormValid || isUploading}
                startIcon={isUploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
              >
                {isUploading ? 'Uploading...' : 'Upload Paper'}
              </Button>
            </Box>
          </Box>
        </form>
      </Paper>
    </Box>
  );
};

export default PaperUploadPage;
