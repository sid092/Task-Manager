import { configureStore } from '@reduxjs/toolkit'
import classSlice from './classSlice'

export const store = configureStore({
  reducer: {
    class:classSlice
  },
})