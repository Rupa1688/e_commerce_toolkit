import { configureStore } from '@reduxjs/toolkit'
import  attributeSlice from '../slice/attributeSlice'
import cartSlice from '../slice/cartSlice'
import categotySlice  from '../slice/categorySlice'
import discountSlice from '../slice/discountSlice'
import productSlice from '../slice/productSlice'
import userSlice from '../slice/userSlice'
import variantSlice from '../slice/variantSlice'

export const store = configureStore({
  reducer: {
    user: userSlice,
    category:categotySlice,
    product:productSlice,
    variant:variantSlice,
    attribute:attributeSlice,
    cart:cartSlice,
    services:discountSlice
    

  },
})