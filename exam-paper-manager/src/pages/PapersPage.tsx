import { Box, Typography, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, IconButton, Tooltip, TextField, InputAdornment } from '@mui/material';
import { Add, Search, FilterList, CloudDownload, Delete, Edit, Visibility } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Mock data for the table
const mockPapers = [
  { id: 1, title: 'Mathematics Final Exam 2023', subject: 'Mathematics', date: '2023-12-15', type: 'Final', status: 'Completed' },
  { id: 2, title: 'Physics Midterm 2023', subject: 'Physics', date: '2023-11-10', type: 'Midterm', status: 'In Progress' },
  { id: 3, title: 'Chemistry Quiz 1', subject: 'Chemistry', date: '2023-10-05', type: 'Quiz', status: 'Completed' },
  { id: 4, title: 'Biology Final Exam 2023', subject: 'Biology', date: '2023-12-20', type: 'Final', status: 'Pending' },
  { id: 5, title: 'Mathematics Quiz 2', subject: 'Mathematics', date: '2023-11-25', type: 'Quiz', status: 'Completed' },
];

const PapersPage = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleChangePage = (_event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const filteredPapers = mockPapers.filter(paper => 
    paper.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paper.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - filteredPapers.length) : 0;

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
          My Exam Papers
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => navigate('/upload')}
          sx={{ textTransform: 'none', fontWeight: 500 }}
        >
          Add New Paper
        </Button>
      </Box>

      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            placeholder="Search papers..."
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Search />
                </InputAdornment>
              ),
            }}
            sx={{ flexGrow: 1, maxWidth: 400 }}
          />
          <Button
            variant="outlined"
            startIcon={<FilterList />}
            sx={{ textTransform: 'none' }}
          >
            Filters
          </Button>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Subject</TableCell>
                <TableCell>Date</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {(rowsPerPage > 0
                ? filteredPapers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : filteredPapers
              ).map((paper) => (
                <TableRow key={paper.id} hover>
                  <TableCell>{paper.title}</TableCell>
                  <TableCell>{paper.subject}</TableCell>
                  <TableCell>{paper.date}</TableCell>
                  <TableCell>{paper.type}</TableCell>
                  <TableCell>
                    <Box
                      component="span"
                      sx={{
                        display: 'inline-block',
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: 
                          paper.status === 'Completed' ? 'success.light' :
                          paper.status === 'In Progress' ? 'warning.light' : 'grey.300',
                        color: 'common.white',
                        fontSize: '0.75rem',
                        fontWeight: 500,
                      }}
                    >
                      {paper.status}
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="View">
                      <IconButton size="small" onClick={() => navigate(`/papers/${paper.id}`)}>
                        <Visibility fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit">
                      <IconButton size="small">
                        <Edit fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Download">
                      <IconButton size="small">
                        <CloudDownload fontSize="small" />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton size="small" color="error">
                        <Delete fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredPapers.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

export default PapersPage;
