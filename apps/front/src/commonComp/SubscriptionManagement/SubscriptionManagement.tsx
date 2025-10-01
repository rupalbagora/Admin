import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  fetchSubscriptionPlans,
  createSubscriptionPlan,
  updateSubscriptionPlan,
  deleteSubscriptionPlan,
  setCurrentPlan
} from '../../redux/Slice/SubscriptionPlansSlice/subscriptionPlansSlice';
import type { SubscriptionPlan } from '../../redux/types/subscriptionPlan.types';
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  Chip,
  Snackbar,
  Alert,
  CircularProgress,
  Grid,
  Typography
} from '@mui/material';

const SubscriptionManagement = () => {
  const dispatch = useAppDispatch();
  const { plans, loading, error, currentPlan } = useAppSelector(state => state.subscriptionPlans);
  const [openDialog, setOpenDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const [formData, setFormData] = useState<SubscriptionPlan>({
    _id: '',
    name: '',
    price: 0,
    currency: 'USD',
    billingInterval: 'month',
    isActive: true,
    trialDays: 0,
    features: []
  });
  const [newFeature, setNewFeature] = useState('');

  // Fetch plans on mount
  useEffect(() => {
    dispatch(fetchSubscriptionPlans());
  }, [dispatch]);

  // Handle dialog open for create
  const handleCreateOpen = () => {
    setIsEditMode(false);
    setFormData({
      _id: '',
      name: '',
      price: 0,
      currency: 'USD',
      billingInterval: 'month',
      isActive: true,
      trialDays: 0,
      features: []
    });
    setOpenDialog(true);
  };

  // Handle dialog open for edit
  const handleEditOpen = (plan: SubscriptionPlan) => {
    setIsEditMode(true);
    setFormData(plan);
    setOpenDialog(true);
  };

  // Handle dialog close
  const handleClose = () => {
    setOpenDialog(false);
  };

  // Handle form input changes
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  // Handle select changes
  const handleSelectChange = (e: any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Add new feature
  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }));
      setNewFeature('');
    }
  };

  // Remove feature
  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      if (isEditMode) {
        await dispatch(updateSubscriptionPlan({ id: formData._id, data: formData })).unwrap();
        setSnackbar({ open: true, message: 'Plan updated successfully', severity: 'success' });
      } else {
        await dispatch(createSubscriptionPlan(formData)).unwrap();
        setSnackbar({ open: true, message: 'Plan created successfully', severity: 'success' });
      }
      handleClose();
    } catch (err) {
      setSnackbar({ open: true, message: err as string, severity: 'error' });
    }
  };

  // Handle delete
  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this plan?')) {
      try {
        await dispatch(deleteSubscriptionPlan(id)).unwrap();
        setSnackbar({ open: true, message: 'Plan deleted successfully', severity: 'success' });
      } catch (err) {
        setSnackbar({ open: true, message: err as string, severity: 'error' });
      }
    }
  };

  // Set current plan
  const handleSetCurrent = (plan: SubscriptionPlan) => {
    dispatch(setCurrentPlan(plan));
    setSnackbar({ open: true, message: `Current plan set to ${plan.name}`, severity: 'info' });
  };

  return (
    <div>
      <Grid container justifyContent="space-between" alignItems="center" sx={{ mb: 3 }}>
        <Typography variant="h4">Subscription Plans</Typography>
        <Button variant="contained" color="primary" onClick={handleCreateOpen}>
          Create New Plan
        </Button>
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Price</TableCell>
                <TableCell>Billing</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Trial Days</TableCell>
                <TableCell>Features</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {plans.map(plan => (
                <TableRow key={plan._id}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>{plan.price} {plan.currency}</TableCell>
                  <TableCell>{plan.billingInterval}</TableCell>
                  <TableCell>
                    <Chip
                      label={plan.isActive ? 'Active' : 'Inactive'}
                      color={plan.isActive ? 'success' : 'error'}
                      size="small"
                    />
                  </TableCell>
                  <TableCell>{plan.trialDays || 0}</TableCell>
                  <TableCell>
                    {plan.features.slice(0, 2).map((f, i) => (
                      <Chip key={i} label={f} size="small" sx={{ mr: 1, mb: 1 }} />
                    ))}
                    {plan.features.length > 2 && (
                      <Chip label={`+${plan.features.length - 2}`} size="small" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Button
                      size="small"
                      onClick={() => handleEditOpen(plan)}
                      sx={{ mr: 1 }}
                    >
                      Edit
                    </Button>
                    <Button
                      size="small"
                      color="secondary"
                      onClick={() => handleDelete(plan._id)}
                      sx={{ mr: 1 }}
                    >
                      Delete
                    </Button>
                    <Button
                      size="small"
                      color="primary"
                      variant={currentPlan?._id === plan._id ? 'contained' : 'outlined'}
                      onClick={() => handleSetCurrent(plan)}
                    >
                      {currentPlan?._id === plan._id ? 'Current' : 'Set Current'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Create/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>{isEditMode ? 'Edit Subscription Plan' : 'Create New Subscription Plan'}</DialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Plan Name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Currency</InputLabel>
                <Select
                  name="currency"
                  value={formData.currency}
                  onChange={handleSelectChange}
                  label="Currency"
                >
                  <MenuItem value="USD">USD ($)</MenuItem>
                  <MenuItem value="EUR">EUR (€)</MenuItem>
                  <MenuItem value="GBP">GBP (£)</MenuItem>
                  <MenuItem value="INR">INR (₹)</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth margin="normal">
                <InputLabel>Billing Interval</InputLabel>
                <Select
                  name="billingInterval"
                  value={formData.billingInterval}
                  onChange={handleSelectChange}
                  label="Billing Interval"
                >
                  <MenuItem value="month">Monthly</MenuItem>
                  <MenuItem value="year">Yearly</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Trial Days"
                name="trialDays"
                type="number"
                value={formData.trialDays}
                onChange={handleInputChange}
                margin="normal"
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleInputChange}
                    color="primary"
                  />
                }
                label="Active Plan"
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" gutterBottom>
                Features
              </Typography>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                <TextField
                  fullWidth
                  label="Add Feature"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  margin="none"
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAddFeature}
                  sx={{ ml: 2 }}
                >
                  Add
                </Button>
              </div>
              <div>
                {formData.features.map((feature, index) => (
                  <Chip
                    key={index}
                    label={feature}
                    onDelete={() => handleRemoveFeature(index)}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </div>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} color="primary" variant="contained">
            {isEditMode ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
      >
        <Alert
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
          severity={snackbar.severity as any}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default SubscriptionManagement;