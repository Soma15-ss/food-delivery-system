import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '../../utils/axios';


export const getAllMenuAsync = createAsyncThunk('menu/getAllMenuAsync', async (params, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/menu',
    method: 'get',
    params
  })
);

export const postMenuAsync = createAsyncThunk('menu/postMenuAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/menu',
    method: 'post',
    data,
  })
);

export const updateMenuAsync = createAsyncThunk('menu/updateMenuAsync', async ({id, data}, toolkit) =>
  AxiosClient({
    toolkit,
    url: `/menu/${id}`,
    method: 'put',
    data,
  })
);

export const deleteMenuAsync = createAsyncThunk('menu/deleteMenuAsync', async (id, toolkit) =>
  AxiosClient({
    toolkit,
    url: `/menu/${id}`,
    method: 'delete',
  })
);
