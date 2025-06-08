import { useState } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  CardHeader, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  type SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Avatar,
  LinearProgress,
  Chip,
} from '@mui/material'; // Removed unused Paper import
import {
  Assessment as AssessmentIcon,
  School as SchoolIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

// Mock data for charts and tables
const subjectData = [
  { name: 'Mathematics', value: 35 },
  { name: 'Physics', value: 25 },
  { name: 'Chemistry', value: 20 },
  { name: 'Biology', value: 15 },
  { name: 'Other', value: 5 },
];

const performanceData = [
  { name: 'Jan', avgScore: 65, highestScore: 85, lowestScore: 45 },
  { name: 'Feb', avgScore: 70, highestScore: 88, lowestScore: 52 },
  { name: 'Mar', avgScore: 72, highestScore: 90, lowestScore: 55 },
  { name: 'Apr', avgScore: 75, highestScore: 92, lowestScore: 58 },
  { name: 'May', avgScore: 78, highestScore: 95, lowestScore: 60 },
  { name: 'Jun', avgScore: 82, highestScore: 98, lowestScore: 65 },
];

const recentActivity = [
  { id: 1, user: 'John Doe', action: 'Completed', paper: 'Mathematics Quiz 1', score: '85%', time: '2 hours ago' },
  { id: 2, user: 'Jane Smith', action: 'Started', paper: 'Physics Test 2', score: 'In Progress', time: '3 hours ago' },
  { id: 3, user: 'Alex Johnson', action: 'Completed', paper: 'Chemistry Final', score: '92%', time: '5 hours ago' },
  { id: 4, user: 'Sarah Wilson', action: 'Completed', paper: 'Biology Midterm', score: '78%', time: '1 day ago' },
  { id: 5, user: 'Mike Brown', action: 'Completed', paper: 'Mathematics Quiz 2', score: '88%', time: '1 day ago' },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [subject, setSubject] = useState('all');

  const handleTimeRangeChange = (event: SelectChangeEvent) => {
    setTimeRange(event.target.value);
  };

  const handleSubjectChange = (event: SelectChangeEvent) => {
    setSubject(event.target.value);
  };

  const stats = [
    { title: 'Total Papers', value: '128', icon: <AssessmentIcon fontSize="large" />, color: 'primary.main' },
    { title: 'Average Score', value: '78%', icon: <SchoolIcon fontSize="large" />, color: 'success.main' },
    { title: 'Completion Rate', value: '92%', icon: <CheckCircleIcon fontSize="large" />, color: 'info.main' },
    { title: 'Avg. Time Spent', value: '42 min', icon: <ScheduleIcon fontSize="large" />, color: 'warning.main' },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600, mb: 1 }}>
          Analytics Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Track performance and gain insights into exam papers
        </Typography>
      </Box>

      {/* Filters */}
      <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Time Range</InputLabel>
          <Select value={timeRange} label="Time Range" onChange={handleTimeRangeChange}>
            <MenuItem value="week">Last 7 days</MenuItem>
            <MenuItem value="month">Last 30 days</MenuItem>
            <MenuItem value="quarter">Last 3 months</MenuItem>
            <MenuItem value="year">Last year</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 200 }} size="small">
          <InputLabel>Subject</InputLabel>
          <Select value={subject} label="Subject" onChange={handleSubjectChange}>
            <MenuItem value="all">All Subjects</MenuItem>
            <MenuItem value="mathematics">Mathematics</MenuItem>
            <MenuItem value="physics">Physics</MenuItem>
            <MenuItem value="chemistry">Chemistry</MenuItem>
            <MenuItem value="biology">Biology</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Stats Cards */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
        gap: 3,
        mb: 4 
      }}>
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    {stat.title}
                  </Typography>
                  <Typography variant="h4" component="div">
                    {stat.value}
                  </Typography>
                </Box>
                <Box sx={{ color: stat.color }}>
                  {stat.icon}
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Box>

      {/* Charts */}
      <Box sx={{ 
        display: 'grid', 
        gridTemplateColumns: { xs: '1fr', lg: '2fr 1fr' },
        gap: 3,
        mb: 4 
      }}>
        {/* Performance Trend */}
        <Card>
          <CardHeader 
            title="Performance Trend" 
            titleTypographyProps={{ variant: 'h6' }}
            action={
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <Select
                  value="avgScore"
                  onChange={() => {}}
                  size="small"
                  sx={{ fontSize: '0.875rem' }}
                >
                  <MenuItem value="avgScore">Average Score</MenuItem>
                  <MenuItem value="completionRate">Completion Rate</MenuItem>
                </Select>
              </FormControl>
            }
          />
          <CardContent sx={{ height: 350 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <RechartsTooltip />
                <Legend />
                <Bar dataKey="avgScore" name="Average Score" fill="#8884d8" />
                <Bar dataKey="highestScore" name="Highest Score" fill="#82ca9d" />
                <Bar dataKey="lowestScore" name="Lowest Score" fill="#ffc658" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Subject Distribution */}
        <Card>
          <CardHeader 
            title="Subject Distribution" 
            titleTypographyProps={{ variant: 'h6' }}
          />
          <CardContent sx={{ height: 350, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Box sx={{ width: '100%', height: 250, mb: 2 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={subjectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {subjectData.map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <RechartsTooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
              {subjectData.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', alignItems: 'center' }}>
                  <Box 
                    sx={{ 
                      width: 12, 
                      height: 12, 
                      bgcolor: COLORS[index % COLORS.length], 
                      mr: 1, 
                      borderRadius: '2px' 
                    }} 
                  />
                  <Typography variant="body2">
                    {item.name} ({item.value}%)
                  </Typography>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
      </Box>

      {/* Recent Activity */}
      <Card>
        <CardHeader 
          title="Recent Activity" 
          titleTypographyProps={{ variant: 'h6' }}
          action={
            <FormControl size="small" sx={{ minWidth: 150 }}>
              <InputLabel>Filter by</InputLabel>
              <Select
                value="all"
                onChange={() => {}}
                label="Filter by"
                size="small"
              >
                <MenuItem value="all">All Activities</MenuItem>
                <MenuItem value="completed">Completed</MenuItem>
                <MenuItem value="inProgress">In Progress</MenuItem>
              </Select>
            </FormControl>
          }
        />
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>User</TableCell>
                <TableCell>Action</TableCell>
                <TableCell>Paper</TableCell>
                <TableCell align="right">Score</TableCell>
                <TableCell align="right">Time</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recentActivity.map((activity) => (
                <TableRow key={activity.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                        {activity.user.charAt(0)}
                      </Avatar>
                      {activity.user}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={activity.action} 
                      size="small" 
                      color={activity.action === 'Completed' ? 'success' : 'default'}
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>{activity.paper}</TableCell>
                  <TableCell align="right">
                    {activity.score === 'In Progress' ? (
                      <Chip 
                        label="In Progress" 
                        size="small" 
                        icon={<ScheduleIcon fontSize="small" />}
                        variant="outlined"
                      />
                    ) : (
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                        <Typography variant="body2" sx={{ mr: 1 }}>{activity.score}</Typography>
                        <LinearProgress 
                          variant="determinate" 
                          value={parseInt(activity.score)} 
                          sx={{ width: 60, height: 6, borderRadius: 3 }}
                        />
                      </Box>
                    )}
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="body2" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
    </Box>
  );
};

export default AnalyticsPage;
