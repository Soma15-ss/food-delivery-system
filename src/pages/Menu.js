import React, { useEffect, useState } from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Button,
  Box,
  TextField,
  TablePagination,
  Chip,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  InputAdornment,
  useTheme
} from '@mui/material'
import AddItemDialog from '../components/AddItemForm'
import { useDispatch, useSelector } from 'react-redux'
import {
  deleteMenuAsync,
  getAllMenuAsync,
  postMenuAsync,
  updateMenuAsync
} from '../redux/service/menu.service'
import { useCart } from '../context/CartContext'
import toast from 'react-hot-toast'
import SearchIcon from '@mui/icons-material/Search'
import AddIcon from '@mui/icons-material/Add'
import { LoadingButton } from '@mui/lab';

const Menu = () => {
  const dispatch = useDispatch()
  const { cart, addToCart } = useCart()
  const user = JSON.parse(localStorage.getItem('userData'))
  const [searchTerm, setSearchTerm] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(6)
  const [editItem, setEditItem] = useState(null)
  const { menuList, isLoading, isSubmitting, isDeleting } = useSelector(state => state.menuReducer)
  const theme = useTheme();
  const [menuItems, setMenuItems] = useState([])
  const [openDialog, setOpenDialog] = useState(false)

  const [deleteDialog, setDeleteDialog] = useState(false)
  const [selectedItemId, setSelectedItemId] = useState(null)

  const [itemData, setItemData] = useState({
    name: '',
    price: '',
    image: '',
    category: ''
  })

  // Filtered items based on search term
  const filteredMenuItems = menuItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Handle change in page number
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  // Handle change in number of rows per page
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0) // Reset to first page
  }

  const handleOpenDialog = () => {
    setEditItem(null) // Reset editItem to null for Add Item
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
  }

  const handleAddItem = async (newItem) => {
    try {
      if (editItem) {
        // Edit the existing item
        // setMenuItems(prevItems =>
        //   prevItems.map(item =>
        //     item.id === editItem.id ? { ...item, ...newItem } : item
        //   )
        // );
        const response = await dispatch(updateMenuAsync({ id: newItem?._id, data: newItem }));
        if (response?.payload?.status === 200) {
          toast.success(response?.payload?.message);
          dispatch(getAllMenuAsync());
        }
      } else {
        // Add the new item (optimistic update)
        // setMenuItems(prevItems => [
        //   ...prevItems,
        //   { id: prevItems.length + 1, ...newItem }
        // ]);
        const response = await dispatch(postMenuAsync(newItem));
        if (response?.payload?.status === 201) {
          toast.success(response?.payload?.message);
          dispatch(getAllMenuAsync());
        }
      }
    } catch (error) {
      // Handle any errors that might occur during the API call
      console.error('Error adding/editing item:', error);
    }
  };
  

  const handleAddToCart = item => {
    const storedCart = localStorage.getItem('cart');
    const currentCart = storedCart ? JSON.parse(storedCart) : [];
  
    const existingItemIndex = currentCart.findIndex(cartItem => cartItem._id === item._id);
  
    if (existingItemIndex !== -1) {
      currentCart[existingItemIndex].quantity += 1;
    } else {
      currentCart.push({ ...item, quantity: 1 });
    }
    
    addToCart(currentCart)
    toast.success("Item added to Orders")
    localStorage.setItem('cart', JSON.stringify(currentCart));
  };
  

  const handleEdit = item => {
    setEditItem(item)
    setOpenDialog(true)
    // Optional: set some `editItem` state and pass to dialog
  }

  const handleDelete = itemId => {
    setSelectedItemId(itemId)
    setDeleteDialog(true)
  }

  const confirmDelete = () => {
    dispatch(deleteMenuAsync(selectedItemId)).then(res => {
      if (res?.payload?.status === 200) {
        dispatch(getAllMenuAsync())
        toast.success(res?.payload?.message)
      }
    })
    setMenuItems(prev => prev.filter(item => item._id !== selectedItemId))
    setDeleteDialog(false)
  }

  useEffect(() => {
    dispatch(getAllMenuAsync())
  }, [])

  useEffect(() => {
    setMenuItems(menuList)
  }, [menuList])

  return (
    <Container maxWidth='lg' sx={{ py: 5 }}>
      <Box display='flex' justifyContent='right' mb={4} gap={2}>
        <TextField
          size='small'
          variant='outlined'
          placeholder='Search...'
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start'>
                <SearchIcon color='action' />
              </InputAdornment>
            )
          }}
          sx={{
            width: '220px'
          }}
        />
              {/* Show "Add Item" button for Admin and Manager */}
      {user?.role === 'admin' ? (
        <Box textAlign="right" mb={4}>
  <Button
    variant="contained"
    color="secondary"
    onClick={handleOpenDialog}
    startIcon={<AddIcon />}
  >
    Add Item
  </Button>
</Box>
      ) : null}
      </Box>
      <Typography
        variant='h4'
        fontWeight='bold'
        gutterBottom
        textAlign='center'
      >
        Welcome, {user?.username}
      </Typography>

      <Typography variant='h5' gutterBottom textAlign='center' sx={{ mb: 4 }}>
        Menu
      </Typography>

      {/* Menu Grid */}
      <Grid container spacing={4} justifyContent='center' alignItems='center'>
        {isLoading ? (
          <Box
            sx={{
              height: '40vh',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          filteredMenuItems
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(item => (
              <Grid item xs={12} sm={6} md={4} key={item._id}>
                <Card
                  elevation={4}
                  sx={{
                    width: 300, // Fixed width for each card
                    borderRadius: 3,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'scale(1.03)'
                    },
                    mt: 2
                  }}
                >
                  <CardMedia
                    component='img'
                    height='180'
                    image={item.image}
                    alt={item.name}
                  />

                  <CardContent>
                    {/* Category Chip */}
                    {item.category && (
                      <Box sx={{ mb: 1 }}>
                        <Chip
                          label={item.category} // Assuming `item.category` holds the category name
                          color='success'
                          sx={{
                            fontWeight: 'bold',
                            textTransform: 'uppercase',
                            backgroundColor: '#4caf50', // Custom green color
                            color: 'white'
                          }}
                        />
                      </Box>
                    )}

                    <Typography variant='h6' fontWeight='bold'>
                      {item.name}
                    </Typography>
                    <Typography color='text.secondary'>
                      ₹{item.price}
                    </Typography>
                  </CardContent>

                  <CardActions>
                    {user?.role !== 'admin' && user?.role !== 'manager' && (
                      <Box px={2} pb={2} width='100%'>
                        <Button
                          variant='contained'
                          color='primary'
                          fullWidth
                          onClick={() => handleAddToCart(item)}
                        >
                          Add to Order
                        </Button>
                      </Box>
                    )}

                    {(user?.role === 'admin' || user?.role === 'manager') && (
                      <Box
                        px={2}
                        pb={2}
                        width='100%'
                        display='flex'
                        justifyContent='space-between'
                        gap={1}
                      >
                        <Button
                          variant='outlined'
                          color='primary'
                          onClick={() => handleEdit(item)}
                          fullWidth
                        >
                          Edit
                        </Button>

                        {user?.role === 'admin' && (
                          <Button
                            variant='outlined'
                            color='error'
                            onClick={() => handleDelete(item._id)}
                            fullWidth
                          >
                            Delete
                          </Button>
                        )}
                      </Box>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            ))
        )}
      </Grid>

      {/* Pagination */}
      <Box display='flex' justifyContent='center' mt={4}>
        <TablePagination
          component='div'
          count={filteredMenuItems.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          rowsPerPageOptions={[6, 12, 24]}
        />
      </Box>
      <Dialog
      open={deleteDialog}
      onClose={() => setDeleteDialog(false)}
      sx={{
        '& .MuiDialog-paper': {
          borderRadius: 12, // Rounded corners for the dialog
          padding: 3,
        },
      }}
    >
      <DialogTitle
        sx={{
          display: 'flex',
          alignItems: 'center',
          fontWeight: 'bold',
          color: theme.palette.error.main,
        }}
      >
        <DeleteIcon sx={{ marginRight: 1 }} /> Confirm Deletion
      </DialogTitle>
      <DialogContent>
        <DialogContentText
          sx={{
            fontSize: '16px',
            lineHeight: 1.5,
            color: theme.palette.text.secondary,
          }}
        >
          Are you sure you want to delete this item? This action cannot be undone.
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{
          justifyContent: 'space-between',
          padding: '0 16px 16px 16px',
        }}
      >
        <Button
          onClick={() => setDeleteDialog(false)}
          color="primary"
          sx={{
            textTransform: 'none',
            backgroundColor: theme.palette.grey[200],
            '&:hover': {
              backgroundColor: theme.palette.grey[300],
            },
          }}
        >
          Cancel
        </Button>
        <LoadingButton
        loading={isDeleting}
          onClick={confirmDelete}
          color="error"
          sx={{
            textTransform: 'none',
            fontWeight: 'bold',
            backgroundColor: theme.palette.error.main,
            '&:hover': {
              backgroundColor: theme.palette.error.dark,
            },
            color:"white"
          }}
        >
          Delete
        </LoadingButton>
      </DialogActions>
    </Dialog>

      <AddItemDialog
        open={openDialog}
        onClose={handleCloseDialog}
        onAddItem={handleAddItem}
        editItem={editItem}
        itemData={itemData}
        setItemData={setItemData}
        loading = {isSubmitting}
      />
    </Container>
  )
}

export default Menu
