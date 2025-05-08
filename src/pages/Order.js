import React, { useState, useEffect } from 'react'
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  CardMedia,
  IconButton,
  Input
} from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import RemoveIcon from '@mui/icons-material/Remove'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'
import { LoadingButton } from '@mui/lab';
import { createOrderAsync } from '../redux/service/order.service'

const Orders = () => {
  const dispatch = useDispatch();
  const [orders, setOrders] = useState([])
  const user = JSON.parse(localStorage.getItem('userData'))
  const token = localStorage.getItem('token');
  const navigate = useNavigate();
  const {isSubmitting} = useSelector((state) => state.orderReducer)

  // Load the cart from localStorage on initial render
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem('cart')) || []
    setOrders(savedOrders)
  }, [])
  // Function to handle quantity change
  const handleQuantityChange = (id, change) => {
    const updatedOrders = orders.map(order => {
      if (order._id === id) {
        const newQuantity = order.quantity + change
        if (newQuantity > 0) {
          order.quantity = newQuantity
        }
      }
      return order
    })

    setOrders(updatedOrders) // Update local state
    localStorage.setItem('cart', JSON.stringify(updatedOrders)) // Save updated cart to localStorage
  }
  // Function to handle checkout
  const handleCheckout = () => {
    if (token) {
      const payload = orders.map((item)=>({
        itemId: item?._id,
        quantity: item?.quantity,
        price: item?.price,
      }))
      dispatch(createOrderAsync({items: payload})).then((res)=>{
        if(res?.payload?.status === 201){
          toast.success(res?.payload?.message);
          navigate('/history')
        }
      })      
    } else {
      toast.error('Please Login before proceeding!')
      navigate('/login')
    }
  }

  const handleClearCart = () => {
    localStorage.removeItem('cart');
    setOrders([])
  }

  // Calculate total cart value
  const calculateTotal = () => {
    return orders.reduce((acc, order) => acc + order.price * order.quantity, 0)
  }

  return (
    <Container maxWidth='lg' sx={{ py: 5 }}>
      <Typography
        variant='h4'
        fontWeight='bold'
        gutterBottom
        textAlign='center'
        mb={5}
      >
        {user?.role === 'user' ? 'My Orders' : 'All Orders'}
      </Typography>

      <Grid container spacing={4} justifyContent="center">
        {orders?.length > 0 ? (
          orders?.map(order => (
            <Grid item xs={12} sm={6} md={4} key={order._id}>
              <Card
                elevation={4}
                sx={{
                  width: 300, // Fixed width for each card
                  borderRadius: 3,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'scale(1.03)'
                  }
                }}
              >
                <CardMedia
                  component='img'
                  height='180'
                  image={order?.image}
                  alt={order?.name}
                />
                <CardContent>
                  <Typography variant='h6' fontWeight='bold'>
                    {order?.name}
                  </Typography>
                  <Typography color='text.secondary'>₹{order?.price}</Typography>
                  <Box
                    display='flex'
                    alignItems='center'
                    justifyContent='space-between'
                    mt={2}
                  >
                    <Box display='flex' alignItems='center'>
                      <IconButton
                        onClick={() => handleQuantityChange(order?._id, -1)}
                        color='primary'
                        disabled={order?.quantity <= 1}
                      >
                        <RemoveIcon />
                      </IconButton>
                      <Input
                        value={order?.quantity}
                        onChange={e => {
                          const newQuantity = Math.max(1, e.target.value)
                          handleQuantityChange(
                            order?._id,
                            newQuantity - order?.quantity
                          )
                        }}
                        inputProps={{ min: 1 }}
                        sx={{ width: 40, textAlign: 'center' }}
                      />
                      <IconButton
                        onClick={() => handleQuantityChange(order?._id, 1)}
                        color='primary'
                      >
                        <AddIcon />
                      </IconButton>
                    </Box>
                    <Typography variant='body2' color='text.secondary'>
                      Total: ₹{order.price * order.quantity}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))
        ) : (
          <Grid item xs={12}>
            <Typography variant='h6' color='text.secondary' textAlign='center'>
              No orders in your cart
            </Typography>
          </Grid>
        )}
      </Grid>

      {orders.length > 0 && (
        <Box mt={4} textAlign='center'>
          <Typography variant='h6' fontWeight='bold'>
            Total: ₹{calculateTotal()}
          </Typography>
          <Box sx={{display: "flex", gap: 2, justifyContent: "center"}}>
            <LoadingButton
              variant='contained'
              color='primary'
              sx={{ mt: 2 }}
              onClick={handleCheckout}
              loading={isSubmitting}
            >
              Place Order
            </LoadingButton>
            <LoadingButton
              variant='contained'
              color='primary'
              sx={{ mt: 2 }}
              onClick={handleClearCart}
              loading={isSubmitting}
            >
              Clear Cart
            </LoadingButton>
        </Box>
        </Box>
      )}
      <Box mt={4} textAlign='center'>
            <Button
              variant='contained'
              color='primary'
              sx={{ mt: 2 }}
              onClick={() => navigate('/')}
            >
              Browse More Menus
            </Button>
          </Box>
    </Container>
  )
}

export default Orders
