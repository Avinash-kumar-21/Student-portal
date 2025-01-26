import { useState, useEffect } from 'react';
import {
  TextField, MenuItem, FormControl, InputLabel, Select,
  Checkbox, FormControlLabel, Grid, Dialog, DialogTitle,
  DialogContent, DialogActions, Button, Radio, RadioGroup,
  FormLabel, InputAdornment
} from '@mui/material';
import { Email, Phone, Home, Person } from '@mui/icons-material';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const defaultFormValues = {
  firstName: '',
  lastName: '',
  class: '',
  section: 'A',
  rollNumber: '',
  dob: dayjs(),
  email: '',
  phone: '',
  address: '',
  parentName: '',
  enrollmentDate: dayjs(),
  status: 'active',
  subjects: [],
  gender: 'male',
  bloodGroup: '',
  feesPaid: false,
  emergencyContact: '',
  previousSchool: '',
  remarks: ''
};

const StudentForm = ({ open, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState(defaultFormValues);

  useEffect(() => {
    if (open) {
      setFormData(initialData ? {
        ...initialData,
        dob: dayjs(initialData.dob),
        enrollmentDate: dayjs(initialData.enrollmentDate)
      } : defaultFormValues);
    }
  }, [open, initialData]);

  const subjectsList = ['Math', 'Science', 'English', 'History', 'Geography'];
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubjectChange = (subject, checked) => {
    setFormData(prev => ({
      ...prev,
      subjects: checked
        ? [...prev.subjects, subject]
        : prev.subjects.filter(s => s !== subject)
    }));
  };

  const validateForm = () => {
    return (
      formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.includes('@') &&
      formData.phone.length >= 10
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      alert('Please fill in all required fields correctly');
      return;
    }

    const submissionData = {
      ...formData,
      dob: formData.dob.format('YYYY-MM-DD'),
      enrollmentDate: formData.enrollmentDate.format('YYYY-MM-DD')
    };

    onSubmit(submissionData);
    onClose();
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
        <DialogTitle>{initialData ? 'Edit Student' : 'Add Student'}</DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} sx={{ mt: 1 }}>
              {/* Personal Information */}
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                  InputProps={{ startAdornment: <Person fontSize="small" /> }}
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <FormLabel component="legend">Gender</FormLabel>
                  <RadioGroup
                    row
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    sx={{
                      gap: 3,
                      '& .MuiFormControlLabel-label': { fontSize: '0.875rem' }
                    }}
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <FormControlLabel
                          value="male"
                          control={<Radio size="small" />}
                          label="Male"
                          sx={{ m: 0 }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <FormControlLabel
                          value="female"
                          control={<Radio size="small" />}
                          label="Female"
                          sx={{ m: 0 }}
                        />
                      </Grid>
                    </Grid>
                  </RadioGroup>
                </FormControl>
              </Grid>

              {/* Academic Information */}
              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  label="Class"
                  name="class"
                  value={formData.class}
                  onChange={handleChange}
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((cls) => (
                    <MenuItem key={cls} value={cls}>{cls}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  select
                  fullWidth
                  label="Section"
                  name="section"
                  value={formData.section}
                  onChange={handleChange}
                  required
                >
                  {['A', 'B', 'C', 'D'].map((sec) => (
                    <MenuItem key={sec} value={sec}>{sec}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  label="Roll Number"
                  name="rollNumber"
                  type="number"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                />
              </Grid>

              {/* Contact Information */}
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  InputProps={{ startAdornment: <Email fontSize="small" /> }}
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  InputProps={{ startAdornment: <Phone fontSize="small" /> }}
                />
              </Grid>

              {/* Date Fields */}
              <Grid item xs={6}>
                <DatePicker
                  label="Date of Birth"
                  value={formData.dob}
                  onChange={(newValue) => setFormData(prev => ({ ...prev, dob: newValue }))}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>
              <Grid item xs={6}>
                <DatePicker
                  label="Enrollment Date"
                  value={formData.enrollmentDate}
                  onChange={(newValue) => setFormData(prev => ({ ...prev, enrollmentDate: newValue }))}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                />
              </Grid>

              {/* Other Fields */}
              <Grid item xs={6}>
                <TextField
                  select
                  fullWidth
                  label="Blood Group"
                  name="bloodGroup"
                  value={formData.bloodGroup}
                  onChange={handleChange}
                >
                  {bloodGroups.map((bg) => (
                    <MenuItem key={bg} value={bg}>{bg}</MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  multiline
                  rows={3}
                  InputProps={{ startAdornment: <Home fontSize="small" /> }}
                />
              </Grid>

              <Grid item xs={12}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">Subjects</FormLabel>
                  <Grid container>
                    {subjectsList.map((subject) => (
                      <Grid item xs={4} key={subject}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={formData.subjects.includes(subject)}
                              onChange={(e) => handleSubjectChange(subject, e.target.checked)}
                              value={subject}
                            />
                          }
                          label={subject}
                        />
                      </Grid>
                    ))}
                  </Grid>
                </FormControl>
              </Grid>
            </Grid>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" color="primary">
                {initialData ? 'Update' : 'Save'}
              </Button>
            </DialogActions>
          </form>
        </DialogContent>
      </Dialog>
    </LocalizationProvider>
  );
};

export default StudentForm;