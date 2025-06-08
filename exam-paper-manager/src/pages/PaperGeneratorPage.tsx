import * as React from 'react';
import { useState, useCallback, useMemo } from 'react';
import type { FC } from 'react';
import axios from 'axios';
import type { SelectChangeEvent } from '@mui/material/Select';
import { 
  Box, 
  Typography, 
  Paper,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  Alert,
  CircularProgress,
  Chip,
  FormControlLabel,
  Switch
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AlertTitle from '@mui/material/AlertTitle';
import type { jsx } from '@emotion/react';

// Types
type Difficulty = 'Easy' | 'Medium' | 'Hard';
type QuestionType = 'Multiple Choice' | 'True/False' | 'Short Answer' | 'Essay';

interface Question {
  id: string;
  type: QuestionType;
  text: string;
  options: string[];
  correctAnswer: string;
  points: number;
  difficulty: Difficulty;
  category: string;
}

type NewQuestion = Omit<Question, 'id'>;

interface FormData {
  title: string;
  subject: string;
  totalMarks: number;
  duration: number;
  instructions: string;
  questions: Question[];
}

const subjects = ['Math', 'Science', 'History', 'English', 'Geography'];
const questionTypes: QuestionType[] = ['Multiple Choice', 'True/False', 'Short Answer', 'Essay'];
const difficultyLevels: Difficulty[] = ['Easy', 'Medium', 'Hard'];

const PaperGeneratorPage: FC = (): jsx.Element => {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    title: '',
    subject: '',
    totalMarks: 100,
    duration: 60,
    instructions: '',
    questions: [],
  });

  // State for new question form
  const [newQuestion, setNewQuestion] = useState<NewQuestion>({
    type: 'Multiple Choice',
    text: '',
    options: ['', '', '', ''],
    correctAnswer: '',
    points: 1,
    difficulty: 'Medium',
    category: '',
  });

  // State for AI generation
  const [aiTopic, setAiTopic] = useState('');
  const [aiQuestionCount, setAiQuestionCount] = useState(5);
  const [aiDifficulty, setAiDifficulty] = useState<Difficulty>('Medium');
  
  // UI State
  const [isGenerating, setIsGenerating] = useState(false);
  const [isAIGenerating, setIsAIGenerating] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState(false);
  const [generationError, setGenerationError] = useState('');

  // Calculate total points
  const totalPoints = useMemo(() => 
    formData.questions.reduce((sum, q) => sum + q.points, 0), 
    [formData.questions]
  );

  // Check if form is valid
  const isFormValid = useMemo(() => 
    Boolean(formData.title && formData.subject && formData.questions.length > 0),
    [formData.title, formData.subject, formData.questions.length]
  );

  // Handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSelectChange = useCallback((e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleQuestionInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleQuestionSelectChange = useCallback((e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setNewQuestion(prev => ({
      ...prev,
      [name]: value,
      ...(name === 'type' && value === 'Multiple Choice' ? { options: ['', '', '', ''] } : {})
    }));
  }, []);

  const handleOptionChange = useCallback((index: number, value: string) => {
    setNewQuestion(prev => {
      const newOptions = [...(prev.options || [])];
      newOptions[index] = value;
      return { ...prev, options: newOptions };
    });
  }, []);

  const addOption = useCallback(() => {
    setNewQuestion(prev => ({
      ...prev,
      options: [...(prev.options || []), ''],
    }));
  }, []);

  const removeOption = useCallback((index: number) => {
    setNewQuestion(prev => {
      const newOptions = [...(prev.options || [])];
      newOptions.splice(index, 1);
      return {
        ...prev,
        options: newOptions,
        correctAnswer: prev.correctAnswer === prev.options?.[index] ? '' : prev.correctAnswer
      };
    });
  }, []);

  const removeQuestion = useCallback((id: string) => {
    setFormData(prev => ({
      ...prev,
      questions: prev.questions.filter(q => q.id !== id),
    }));
  }, []);

  const addQuestion = useCallback(() => {
    if (!newQuestion.text) {
      setGenerationError('Question text is required');
      return;
    }

    if (newQuestion.type === 'Multiple Choice' && !newQuestion.correctAnswer) {
      setGenerationError('Please select a correct answer');
      return;
    }

    const questionToAdd: Question = {
      id: Date.now().toString(),
      ...newQuestion,
      category: newQuestion.category || formData.subject || 'General'
    };

    setFormData(prev => ({
      ...prev,
      questions: [...prev.questions, questionToAdd],
    }));

    // Reset new question form
    setNewQuestion({
      type: 'Multiple Choice',
      text: '',
      options: ['', '', '', ''],
      correctAnswer: '',
      points: 1,
      difficulty: 'Medium',
      category: formData.subject || '',
    });

    setGenerationError('');
  }, [newQuestion, formData.subject]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setGenerationError('Please fill in all required fields');
      return;
    }

    setIsGenerating(true);
    setGenerationError('');

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Update with actual submission logic
      console.log('Form submitted:', {
        ...formData,
        totalMarks: totalPoints
      });
      
      setGenerationSuccess(true);
      
      // Reset form after successful submission
      setFormData({
        title: '',
        subject: '',
        totalMarks: 100,
        duration: 60,
        instructions: '',
        questions: [],
      });
      
      // Hide success message after 5 seconds
      setTimeout(() => setGenerationSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting form:', error);
      setGenerationError('Failed to submit form. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  }, [formData, isFormValid, totalPoints]);

  // AI question generation functionality can be implemented here when needed
  // Example implementation:
  // const handleGenerateAIQuestions = useCallback(async () => {
  //   // Implementation for AI question generation
  // }, [aiTopic, aiQuestionCount, aiDifficulty, formData.subject]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Generate Exam Paper
        </Typography>
        
        {generationSuccess && (
          <Alert severity="success" sx={{ mb: 2 }}>
            <AlertTitle>Success</AlertTitle>
            Your exam paper has been generated successfully!
          </Alert>
        )}

        {generationError && (
          <Alert 
            severity="error" 
            sx={{ mb: 3 }}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => setGenerationError('')}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            <AlertTitle>Error</AlertTitle>
            {generationError}
          </Alert>
        )}

        <Paper sx={{ p: 3, mb: 4 }}>
          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Basic Information */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Paper Information
                </Typography>
                <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                  <TextField
                    label="Paper Title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />

                  <FormControl fullWidth required>
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

                  <TextField
                    label="Total Marks"
                    name="totalMarks"
                    type="number"
                    value={formData.totalMarks}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    inputProps={{ min: 1 }}
                  />

                  <TextField
                    label="Duration (minutes)"
                    name="duration"
                    type="number"
                    value={formData.duration}
                    onChange={handleInputChange}
                    fullWidth
                    required
                    inputProps={{ min: 1 }}
                  />
                </Box>
              </Box>

              {/* Questions Section */}
              <Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6">Questions</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {formData.questions.length} question{formData.questions.length !== 1 ? 's' : ''} added
                  </Typography>
                </Box>

                {formData.questions.length > 0 ? (
                  <Box sx={{ mb: 3 }}>
                    {formData.questions.map((question, index) => (
                      <Box key={question.id} sx={{ mb: 2, p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                          <Typography variant="subtitle1">
                            Q{index + 1}. {question.text}
                          </Typography>
                          <IconButton 
                            size="small" 
                            color="error"
                            onClick={() => removeQuestion(question.id)}
                          >
                            <DeleteIcon fontSize="small" />
                          </IconButton>
                        </Box>
                        <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                          <Chip label={question.type} size="small" variant="outlined" />
                          <Chip label={`${question.points} pt${question.points !== 1 ? 's' : ''}`} size="small" variant="outlined" />
                          <Chip 
                            label={question.difficulty} 
                            size="small" 
                            variant="outlined" 
                            color={
                              question.difficulty === 'Easy' ? 'success' :
                              question.difficulty === 'Medium' ? 'warning' : 'error'
                            }
                          />
                        </Box>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box sx={{ textAlign: 'center', py: 4, bgcolor: 'action.hover', borderRadius: 1, mb: 3 }}>
                    <Typography variant="body1" color="text.secondary">
                      No questions added yet. Add your first question below.
                    </Typography>
                  </Box>
                )}

                {/* Add Question Form */}
                <Accordion defaultExpanded={formData.questions.length === 0}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Add New Question</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                      <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 3 }}>
                        <FormControl fullWidth>
                          <InputLabel>Question Type</InputLabel>
                          <Select
                            name="type"
                            value={newQuestion.type}
                            label="Question Type"
                            onChange={handleQuestionSelectChange}
                          >
                            {questionTypes.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <FormControl fullWidth>
                          <InputLabel>Difficulty</InputLabel>
                          <Select
                            name="difficulty"
                            value={newQuestion.difficulty}
                            label="Difficulty"
                            onChange={handleQuestionSelectChange}
                          >
                            {difficultyLevels.map((level) => (
                              <MenuItem key={level} value={level}>
                                {level}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>

                        <TextField
                          label="Points"
                          name="points"
                          type="number"
                          value={newQuestion.points}
                          onChange={handleQuestionInputChange}
                          fullWidth
                          inputProps={{ min: 1 }}
                        />

                        <TextField
                          label="Category (optional)"
                          name="category"
                          value={newQuestion.category}
                          onChange={handleQuestionInputChange}
                          fullWidth
                        />
                      </Box>

                      <TextField
                        label="Question Text"
                        name="text"
                        value={newQuestion.text}
                        onChange={handleQuestionInputChange}
                        fullWidth
                        multiline
                        rows={2}
                        required
                      />

                      {newQuestion.type === 'Multiple Choice' && (
                        <Box>
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                            <Typography variant="subtitle2">Options</Typography>
                            <Button
                              size="small"
                              startIcon={<AddIcon />}
                              onClick={addOption}
                              disabled={(newQuestion.options?.length || 0) >= 10}
                            >
                              Add Option
                            </Button>
                          </Box>
                          
                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, mb: 2 }}>
                            {newQuestion.options?.map((option, index) => (
                              <Box key={index} sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
                                <TextField
                                  value={option}
                                  onChange={(e) => handleOptionChange(index, e.target.value)}
                                  fullWidth
                                  size="small"
                                  placeholder={`Option ${index + 1}`}
                                />
                                <FormControlLabel
                                  control={
                                    <Switch
                                      checked={newQuestion.correctAnswer === option}
                                      onChange={() => {
                                        setNewQuestion(prev => ({
                                          ...prev,
                                          correctAnswer: option,
                                        }));
                                      }}
                                      color="primary"
                                    />
                                  }
                                  label="Correct"
                                  labelPlacement="start"
                                />
                                <IconButton
                                  size="small"
                                  onClick={() => removeOption(index)}
                                  disabled={(newQuestion.options?.length || 0) <= 2}
                                >
                                  <DeleteIcon fontSize="small" />
                                </IconButton>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}

                      {newQuestion.type === 'True/False' && (
                        <FormControl component="fieldset">
                          <Typography variant="subtitle2" gutterBottom>
                            Select the correct answer:
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                              variant={newQuestion.correctAnswer === 'True' ? 'contained' : 'outlined'}
                              onClick={() => {
                                setNewQuestion(prev => ({
                                  ...prev,
                                  correctAnswer: 'True',
                                }));
                              }}
                            >
                              True
                            </Button>
                            <Button
                              variant={newQuestion.correctAnswer === 'False' ? 'contained' : 'outlined'}
                              onClick={() => {
                                setNewQuestion(prev => ({
                                  ...prev,
                                  correctAnswer: 'False',
                                }));
                              }}
                            >
                              False
                            </Button>
                          </Box>
                        </FormControl>
                      )}

                      {(newQuestion.type === 'Short Answer' || newQuestion.type === 'Essay') && (
                        <TextField
                          label="Model Answer"
                          name="correctAnswer"
                          value={newQuestion.correctAnswer || ''}
                          onChange={(e) => {
                            setNewQuestion(prev => ({
                              ...prev,
                              correctAnswer: e.target.value,
                            }));
                          }}
                          fullWidth
                          multiline
                          rows={newQuestion.type === 'Essay' ? 4 : 2}
                          placeholder="Enter the model answer or key points"
                        />
                      )}

                      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                          variant="contained"
                          startIcon={<AddIcon />}
                          onClick={addQuestion}
                          disabled={!newQuestion.text}
                        >
                          Add Question
                        </Button>
                      </Box>
                    </Box>
                  </AccordionDetails>
                </Accordion>
              </Box>

              {/* Instructions */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  Instructions (optional)
                </Typography>
                <TextField
                  name="instructions"
                  value={formData.instructions}
                  onChange={handleInputChange}
                  fullWidth
                  multiline
                  rows={3}
                  placeholder="Enter any special instructions for the exam..."
                />
              </Box>

              {/* Submit Button */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  startIcon={isGenerating ? <CircularProgress size={20} /> : <AutoAwesomeIcon />}
                  disabled={!isFormValid || isGenerating}
                >
                  {isGenerating ? 'Generating...' : 'Generate Paper'}
                </Button>
              </Box>
            </Box>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default PaperGeneratorPage;