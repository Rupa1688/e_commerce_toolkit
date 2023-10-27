import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const options = {
  headers: {'ngrok-skip-browser-warning':true}
};
export const addVariant = createAsyncThunk(
  'addVariant',
  async (variantData) => {
    console.log("variantData",variantData);
    // let formObject = Object.fromEntries(variantData.entries());
    // console.log("formObject",formObject);
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}product/variant/addVariant`,variantData,options)
    const data = await res.data
    console.log("variantData111",data);

    return data
  }
)

export const getVaraint = createAsyncThunk(
  'getVaraint',
  async (id) => {
    console.log("id11",id);
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}product/variant/getVariant/${id}`,options)
    const data = await res.data
    console.log("getVaraint",res.data);
    return data;
  }
)

export const varaintId = createAsyncThunk(
  'varaintId',
  async (id) => {
    console.log("id22",id);
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}product/variant/getVariant?id=${id}`,options)
    const data = await res.data
    console.log("getVaraint",res.data);
    return data;
  }
)

export const variantSlice = createSlice({  
  name: 'variants',
  initialState: {
    createVariant:[],    
    allVariant:[], 
    variant:[], 
    isLoading: false,
    error: null,
  },
  
  extraReducers: (builder) => {    
    console.log("builder",builder);
    builder.addCase(addVariant.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addVariant.fulfilled, (state, action) => {
      state.isLoading = false
      state.createVariant = action.payload
    })
    builder.addCase(addVariant.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(getVaraint.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getVaraint.fulfilled, (state, action) => {      
      state.isLoading = false
      state.allVariant = action.payload
      // console.log("state.categoryProduc", action.payload);
    })
    builder.addCase(getVaraint.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(varaintId.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(varaintId.fulfilled, (state, action) => {      
      state.isLoading = false
      state.variant = action.payload
      // console.log("state.categoryProduc", action.payload);
    })
    builder.addCase(varaintId.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    


    
    
  },
})
console.log("userSlice",variantSlice);
export default variantSlice.reducer