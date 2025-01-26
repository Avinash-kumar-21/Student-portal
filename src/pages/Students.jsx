import { useState, useEffect } from 'react';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';
import Grid from '@mui/material/Grid';
import { 
  Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow, Paper, IconButton, Button, Dialog, DialogTitle, 
  DialogContent, DialogContentText, DialogActions, 
  TextField, InputAdornment, Chip, Box, Typography,
  CircularProgress, Tooltip
} from '@mui/material';
import { Edit, Delete, Visibility, Search, Add } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import StudentForm from '../components/StudentForm';

export default function Students() {
  const theme = useTheme();
  const [students, setStudents] = useState([]);
  const [openForm, setOpenForm] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [viewModalOpen, setViewModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const fetchStudents = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'students'));
      setStudents(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (error) {
      console.error('Error fetching students:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const handleSubmit = async (data) => {
    try {
      if (selectedStudent) {
        await updateDoc(doc(db, 'students', selectedStudent.id), data);
      } else {
        await addDoc(collection(db, 'students'), {
          ...data,
          createdAt: new Date()
        });
      }
      fetchStudents();
    } catch (error) {
      console.error('Error saving student:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, 'students', id));
      fetchStudents();
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };
// Add this function BEFORE it's used in the JSX
const confirmDelete = async () => {
  await handleDelete(studentToDelete);
  setDeleteConfirmOpen(false);
};

// Move the handleView function here
const handleView = (student) => {
  setSelectedStudent(student);
  setViewModalOpen(true);
};
  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        mb: 3,
        flexDirection: { xs: 'column', sm: 'row' },
        gap: 2
      }}>
        <Typography variant="h5" component="h2" sx={{ fontWeight: 600 }}>
          Student Management
        </Typography>
        
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search students..."
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearchTerm(e.target.value)}
          sx={{ width: { xs: '100%', sm: 300 } }}
        />
        
        <Button 
          variant="contained" 
          startIcon={<Add />} 
          onClick={() => setOpenForm(true)}
          sx={{ width: { xs: '100%', sm: 'auto' } }}
        >
          New Student
        </Button>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <TableContainer 
          component={Paper} 
          sx={{ 
            borderRadius: 2,
            boxShadow: theme.shadows[2],
            '&:hover': { boxShadow: theme.shadows[4] }
          }}
        >
          <Table>
            <TableHead sx={{ bgcolor: theme.palette.background.paper }}>
              <TableRow>
                <TableCell>SR No.</TableCell>
                <TableCell>Student Name</TableCell>
                <TableCell>Class</TableCell>
                <TableCell>Section</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Actions</TableCell>
              </TableRow>
            </TableHead>
            
            <TableBody>
              {filteredStudents.map((student, index) => (
                <TableRow 
                  key={student.id}
                  hover 
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{index + 1}.{student.section}</TableCell>
                  <TableCell>
                    <Typography fontWeight="500">
                      {student.firstName} {student.lastName}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {student.email}
                    </Typography>
                  </TableCell>
                  <TableCell>Grade {student.class}</TableCell>
                  <TableCell>
                    <Chip 
                      label={student.section} 
                      size="small" 
                      color="primary"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={student.status} 
                      color={student.status === 'active' ? 'success' : 'error'} 
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="center">
                    <Tooltip title="View Details">
                      <IconButton onClick={() => handleView(student)}>
                        <Visibility />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Edit Student">
                      <IconButton onClick={() => {
                        setSelectedStudent(student);
                        setOpenForm(true);
                      }}>
                        <Edit />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete Student">
                      <IconButton onClick={() => {
                        setStudentToDelete(student.id);
                        setDeleteConfirmOpen(true);
                      }}>
                        <Delete color="error" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* View Student Modal */}
      <Dialog 
        open={viewModalOpen} 
        onClose={() => setViewModalOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle sx={{ fontSize: '1.5rem', fontWeight: 600 }}>
          Student Details
        </DialogTitle>
        <DialogContent>
          {selectedStudent && (
            <Box sx={{ mt: 2 }}>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                    Personal Information
                  </Typography>
                  <DetailItem label="Full Name" value={`${selectedStudent.firstName} ${selectedStudent.lastName}`} />
                  <DetailItem label="Date of Birth" value={selectedStudent.dob} />
                  <DetailItem label="Email" value={selectedStudent.email} />
                  <DetailItem label="Phone" value={selectedStudent.phone} />
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                    Academic Information
                  </Typography>
                  <DetailItem label="Class" value={`Grade ${selectedStudent.class}`} />
                  <DetailItem label="Section" value={selectedStudent.section} />
                  <DetailItem label="Roll Number" value={selectedStudent.rollNumber} />
                  <DetailItem label="Enrollment Date" value={selectedStudent.enrollmentDate} />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1" fontWeight={500} gutterBottom>
                    Additional Information
                  </Typography>
                  <DetailItem label="Address" value={selectedStudent.address} />
                  <DetailItem label="Emergency Contact" value={selectedStudent.emergencyContact} />
                  <DetailItem label="Previous School" value={selectedStudent.previousSchool} />
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewModalOpen(false)} variant="outlined">
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteConfirmOpen} onClose={() => setDeleteConfirmOpen(false)}>
        <DialogTitle sx={{ fontWeight: 600 }}>Confirm Delete</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this student record? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteConfirmOpen(false)} variant="outlined">
            Cancel
          </Button>
          <Button 
            onClick={confirmDelete} 
            color="error" 
            variant="contained"
            startIcon={<Delete />}
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      <StudentForm 
        open={openForm}
        onClose={() => {
          setOpenForm(false);
          setSelectedStudent(null);
        }}
        onSubmit={handleSubmit}
        initialData={selectedStudent}
      />
    </Box>
  );
}

const DetailItem = ({ label, value }) => (
  <Box sx={{ mb: 2 }}>
    <Typography variant="caption" color="textSecondary">{label}</Typography>
    <Typography variant="body1">{value || '-'}</Typography>
  </Box>
);