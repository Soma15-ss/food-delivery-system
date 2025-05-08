import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Typography
} from '@mui/material';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useDispatch } from 'react-redux';
import { LoadingButton } from '@mui/lab';

const AddItemDialog = ({ open, onClose, onAddItem, editItem, itemData, setItemData, loading }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (editItem) {
      setItemData(editItem);
    } else {
      setItemData({ name: '', price: '', image: '', category: '' });
    }
  }, [editItem, open]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setItemData({ ...itemData, [name]: value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setItemData((prev) => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async () => {
    try {
      await onAddItem(itemData, editItem?.id);  
      // Reset only after API response
      setItemData({ name: '', price: '', image: '', category: '' }); // Clear form after successful submission
      onClose(); // Close the modal after the API response
    } catch (error) {
      // Handle error if needed
      console.error('Failed to add/edit item:', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{editItem ? 'Edit Menu Item' : 'Add Menu Item'}</DialogTitle>
      <DialogContent>
        <TextField
          placeholder="Item Name"
          name="name"
          value={itemData.name}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          placeholder="Price"
          name="price"
          type="number"
          value={itemData.price}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        <TextField
          placeholder="Food Category"
          name="category"
          value={itemData.category}
          onChange={handleChange}
          fullWidth
          sx={{ mb: 2 }}
        />
        
        {/* Upload Area */}
        <Box sx={{ mb: 2 }}>
          {itemData.image && (
            <Box mt={1}>
              <Typography variant="caption">Preview:</Typography>
              <Box
                component="img"
                src={itemData.image}
                alt="preview"
                sx={{ mt: 1, width: '100%', maxHeight: 200, objectFit: 'contain' }}
              />
            </Box>
          )}
          <Button variant="contained" component="label" fullWidth endIcon={<UploadFileIcon />}>
            Upload Image
            <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
          </Button>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancel
        </Button>
        <LoadingButton loading={loading} onClick={handleSubmit} color="primary">
          {editItem ? 'Save Changes' : 'Add Item'}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};

export default AddItemDialog;
