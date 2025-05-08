import React, { useEffect, useState } from 'react'
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  CircularProgress,
  CardMedia,
  Divider,
  Stack,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button
} from '@mui/material'
import { styled } from '@mui/system'
import { useDispatch, useSelector } from 'react-redux'
import {
  getOrdersAsync,
  updateOrderStatus
} from '../redux/service/order.service'
import { LoadingButton } from '@mui/lab'
import toast from 'react-hot-toast'

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: 16,
  backgroundColor: '#fafafa'
  // boxShadow: theme.shadows[2],
}))

const getStatusColor = status => {
  switch (status?.toLowerCase()) {
    case 'delivered':
      return 'success'
    case 'pending':
      return 'warning'
    case 'cancelled':
      return 'error'
    default:
      return 'default'
  }
}

const OrderHistory = () => {
  const dispatch = useDispatch()
  const [orders, setOrders] = useState([])
  const user = JSON.parse(localStorage.getItem('userData'))
  const { isLoading, orderList, isSubmitting } = useSelector(
    state => state.orderReducer
  )
  const [openDialog, setOpenDialog] = useState(false)
  const [selectedStatus, setSelectedStatus] = useState('')
  const [selectedOrderId, setSelectedOrderId] = useState('')

  useEffect(() => {
    if (!user) return
    dispatch(getOrdersAsync()).then(res => {
      setOrders(res.payload)
    })
  }, [dispatch])

  const handleStatusSelect = orderId => {
    setSelectedOrderId(orderId)
    setOpenDialog(true)
  }

  const confirmStatusUpdate = async () => {
    await dispatch(
      updateOrderStatus({ id: selectedOrderId, data: { status: 'Completed' } })
    ).then(res => {
      if (res?.payload?.status === 200) {
        setOpenDialog(false)
        toast.success(res?.payload?.message)
      }
    })
    dispatch(getOrdersAsync()).then(res => {
      setOrders(res.payload)
    })
  }

  return (
    <Container maxWidth='md' sx={{ py: 6 }}>
      <Typography
        variant='h4'
        fontWeight='bold'
        textAlign='center'
        gutterBottom
      >
        {user?.role === 'user' ? 'My Orders' : 'All Orders'}
      </Typography>

      {isLoading ? (
        <Box display='flex' justifyContent='center' py={6}>
          <CircularProgress />
        </Box>
      ) : orderList?.length > 0 ? (
        <Stack spacing={3}>
          {orderList?.map((order, index) => (
            <StyledCard key={order._id}>
              <CardContent>
                <Stack spacing={2}>
                  {(user?.role === 'admin' || user?.role === 'manager') &&
                    order.userId?.username && (
                      <Chip
                        label={`👤 Ordered by: ${order.userId.username}`}
                        sx={{
                          backgroundColor: '#E6F4F1', // soft teal
                          color: '#116466', // dark teal text
                          fontWeight: '600',
                          fontSize: '0.875rem',
                          borderRadius: '8px',
                          px: 1.5,
                          py: 0.5,
                          height: 'auto',
                          '& .MuiChip-label': {
                            whiteSpace: 'normal',
                            padding: 0.5
                          }
                        }}
                        variant='outlined'
                      />
                    )}

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent='space-between'
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                    spacing={2}
                  >
                    <Typography variant='h6' fontWeight='medium'>
                      Order #{index + 1}
                    </Typography>
                    {order.status === 'Pending' && user?.role === 'admin' ? (
                      <Button
                        variant='contained'
                        size='small'
                        onClick={() => handleStatusSelect(order._id)}
                        sx={{
                          backgroundColor: 'primary.main',
                          color: '#fff',
                          textTransform: 'none',
                          borderRadius: 2,
                          fontWeight: 500,
                          px: 2,
                          py: 0.5,
                          boxShadow: 2,
                          '&:hover': {
                            backgroundColor: 'primary.dark'
                          }
                        }}
                      >
                        Mark as Completed
                      </Button>
                    ) : (
                      <Chip
                        label={order.status}
                        size='small'
                        sx={{
                          bgcolor:
                            order.status === 'Completed'
                              ? 'success.main'
                              : 'warning.main',
                          color: '#fff',
                          fontWeight: 500,
                          borderRadius: 1,
                          px: 1.5
                        }}
                      />
                    )}
                  </Stack>

                  <Divider />

                  <Stack spacing={2}>
                    {order.items.map((item, idx) => (
                      <Stack
                        key={idx}
                        direction='row'
                        alignItems='center'
                        spacing={2}
                        sx={{ flexWrap: 'wrap' }}
                      >
                        <CardMedia
                          component='img'
                          image={item?.itemId?.image}
                          alt={item?.itemId?.name}
                          sx={{
                            width: 56,
                            height: 56,
                            borderRadius: 2,
                            objectFit: 'cover'
                          }}
                        />
                        <Box>
                          <Typography fontWeight='medium'>
                            {item?.itemId?.name}
                          </Typography>
                          <Typography variant='body2' color='text.secondary'>
                            ₹{item?.price} × {item?.quantity} = ₹
                            {item?.price * item?.quantity}
                          </Typography>
                        </Box>
                      </Stack>
                    ))}
                  </Stack>

                  <Divider />

                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    justifyContent='space-between'
                    alignItems={{ xs: 'flex-start', sm: 'center' }}
                  >
                    <Typography variant='body2' color='text.secondary'>
                      Ordered on:{' '}
                      {new Date(order.createdAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant='subtitle1' fontWeight='bold'>
                      Total: ₹{order.totalAmount}
                    </Typography>
                  </Stack>
                </Stack>
              </CardContent>
            </StyledCard>
          ))}
        </Stack>
      ) : (
        <Typography
          variant='h6'
          color='text.secondary'
          textAlign='center'
          mt={4}
        >
          You haven't placed any orders yet.
        </Typography>
      )}
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth='xs'
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 2
          }
        }}
      >
        <DialogTitle>
          <Typography variant='h6' fontWeight={600}>
            Change Status
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ mb: 1 }}>
            Are you sure you want to change the status to{' '}
            <Typography component='span' fontWeight={600} color='primary.main'>
              {selectedStatus}
            </Typography>
            ?
          </DialogContentText>
        </DialogContent>

        <DialogActions sx={{ justifyContent: 'flex-end' }}>
          <Button
            onClick={() => setOpenDialog(false)}
            color='inherit'
            sx={{ textTransform: 'none' }}
          >
            Cancel
          </Button>

          <LoadingButton
            onClick={confirmStatusUpdate}
            loading={isSubmitting}
            variant='contained'
            sx={{ textTransform: 'none' }}
          >
            Confirm
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Container>
  )
}

export default OrderHistory
