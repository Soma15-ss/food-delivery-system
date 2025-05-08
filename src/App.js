import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { store } from './redux/store'
import { ThemeProvider } from '@mui/material/styles';

import Login from './pages/Login'
import Register from './pages/Register'
import Menu from './pages/Menu'
import Orders from './pages/Order'
import OrderHistory from './pages/OrderHistory'
import PrivateRoute from './role/PrivateRoute'
import PublicRoute from './role/PublicRoute'
import Navbar from './components/Navbar'
import { CartProvider } from './context/CartContext'
import theme from './theme/theme'

function App () {
  return (
    <Provider store={store}>
      <CartProvider>
        <BrowserRouter>
        <ThemeProvider theme={theme}>  {/* Wrap the app with ThemeProvider */}
          <Toaster position='top-right' />
          <Navbar />
          <Routes>
            <Route
              path='/login'
              element={
                <PublicRoute>
                  <Login />
                </PublicRoute>
              }
            />

            <Route
              path='/register'
              element={
                <PublicRoute>
                  <Register />
                </PublicRoute>
              }
            />

            <Route path='/' element={<Menu />} />
            <Route
              path='/orders'
              element={
                <Orders />
              }
            />
            <Route
              path='/history'
              element={
                <PrivateRoute roles={['user', 'admin', 'manager']}>
                  <OrderHistory />
                </PrivateRoute>
              }
            />
          </Routes>
          </ThemeProvider>
        </BrowserRouter>
      </CartProvider>
    </Provider>
  )
}

export default App
