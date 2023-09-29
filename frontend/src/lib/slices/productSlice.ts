import { ProductType } from '@/lib/types';
import { createSlice } from '@reduxjs/toolkit';

const initialState: ProductType[] = [];

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts(state, action) {
      return action.payload;
    },
  },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
