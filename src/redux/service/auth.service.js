import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '../../utils/axios';


export const register = createAsyncThunk('auth/register', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/auth/register',
    method: 'post',
    data,
  })
);

export const loginAsync = createAsyncThunk('auth/loginAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/auth/login',
    method: 'post',
    data,
  })
);
