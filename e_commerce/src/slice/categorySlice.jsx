import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const options = {
  headers: {'ngrok-skip-browser-warning':true}
};
export const addCategory = createAsyncThunk(
  'addCategory',
  async (category) => {
    console.log("category",category);
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}product/addCategory`,category,options)
    const data = await res.data
    console.log("data",data);

    return data
  }
)

export const getCategory = createAsyncThunk(
  'getCategory',
  async () => {
    
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}product/parrent_category`,options)
    const data = await res.data
    console.log("categorydata",res.data);

    return data;
  }
)


export const categotySlice = createSlice({  
  name: 'categories',
  initialState: {
    categoryProduct:[],
    parentCategory:[],
    isLoading: false,
    error: null,
  },
  
  extraReducers: (builder) => {    
    console.log("builder",builder);
    builder.addCase(addCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addCategory.fulfilled, (state, action) => {
      state.isLoading = false
      state.categoryProduct = action.payload
    })
    builder.addCase(addCategory.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(getCategory.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getCategory.fulfilled, (state, action) => {      
      state.isLoading = false
      state.categoryProduct = action.payload
      // console.log("state.categoryProduc", action.payload);
    })
    builder.addCase(getCategory.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    



    
    
  },
})
console.log("userSlice",categotySlice);
export default categotySlice.reducer