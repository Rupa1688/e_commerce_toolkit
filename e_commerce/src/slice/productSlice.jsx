import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const options = {
  headers: {'ngrok-skip-browser-warning':true}
};

export const addProduct = createAsyncThunk(
  'addCategory',
  async (productData) => {
    console.log("producrData",productData);
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL} product/addProductCategory`,productData,options)
    const data = await res.data
    console.log("data",data);
    return data
  }
)

export const getAllProduct = createAsyncThunk(
  'getAllProduct',
  async (id) => {
    console.log("iddd",id);
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}product/getAllProductCategory?categoryId=${id}`,options)
    const data = await res.data
    console.log("getAllProduct",res.data);
    return data;
  }
)

export const getProduct=createAsyncThunk(
  'getProduct',
  async(id)=>{
const response=await axios.get(`${process.env.REACT_APP_BASE_URL}product/getProductCategory/${id}`,options)
console.log("response",response);
return response.data
  }
)
export const getAllDataProduct=createAsyncThunk(
  'getAllDataProduct',
  async(id)=>{
const response=await axios.get(`${process.env.REACT_APP_BASE_URL}product/getAllProduct`,options)
console.log("response",response);
return response.data
  }
)



export const productSlice = createSlice({  
  name: 'categories',
  initialState: {
    product:[],
    allProduct:[],
    productData:[],
    getAllProduct:[],
    // parentCategory:[],
    isLoading: false,
    error: null,
  },
  
  extraReducers: (builder) => {    
    console.log("builder",builder);
    builder.addCase(addProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addProduct.fulfilled, (state, action) => {
      state.isLoading = false
      state.product = action.payload
    })
    builder.addCase(addProduct.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(getAllProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllProduct.fulfilled, (state, action) => {      
      state.isLoading = false
      state.allProduct = action.payload
      // console.log("state.categoryProduc", action.payload);
    })
    builder.addCase(getAllProduct.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    
    builder.addCase(getProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getProduct.fulfilled, (state, action) => {      
      state.isLoading = false
      state.productData = action.payload
      // console.log("state.categoryProduc", action.payload);
    })
    builder.addCase(getProduct.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    builder.addCase(getAllDataProduct.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllDataProduct.fulfilled, (state, action) => {      
      state.isLoading = false
      state.getAllProduct = action.payload
      // console.log("state.categoryProduc", action.payload);
    })
    builder.addCase(getAllDataProduct.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    
    
    
  },
})
console.log("productSlice",productSlice);
export default productSlice.reducer