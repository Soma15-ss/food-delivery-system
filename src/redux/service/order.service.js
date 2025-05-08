import { createAsyncThunk } from '@reduxjs/toolkit';
import AxiosClient from '../../utils/axios';

export const createOrderAsync = createAsyncThunk('order/createOrderAsync', async (data, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/order',
    method: 'post',
    data
  })
);
export const getOrdersAsync = createAsyncThunk('order/getOrdersAsync', async (_, toolkit) =>
  AxiosClient({
    toolkit,
    url: '/order',
    method: 'get',
  })
);
export const updateOrderStatus = createAsyncThunk('order/updateOrderStatus', async ({id, data}, toolkit) =>
  AxiosClient({
    toolkit,
    url: `/order/${id}/status`,
    method: 'put',
    data
  })
);