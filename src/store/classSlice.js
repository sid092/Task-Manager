import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  classValue: 'dark'
};

export const classSlice = createSlice({
  name: 'class',
  initialState,
  reducers: {
    setclassValue: (state, action) => {
      state.classValue = action.payload; 
    },
  },
});

export const { setclassValue } = classSlice.actions;
export default classSlice.reducer;