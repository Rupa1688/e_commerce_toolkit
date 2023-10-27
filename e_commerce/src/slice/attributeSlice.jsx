import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';



export const addAttributeData = createAsyncThunk(
  'addAttributeData',
  async (attribute) => {   
      console.log("attribute",attribute);
      const res = await axios.post('http://localhost:4001/product/addAttribute',attribute)
      const data = await res.data
      console.log("data",data);
  
      return data  
  }
)

export const getAttributeData = createAsyncThunk(
  'getAttributeData',
  async (id) => {   
    console.log("id",id); 
    const res = await axios.get(`http://localhost:4001/product/getAttribute/${id}`)
    const data = await res.data
    console.log("getAttributeData",res.data);
    return data;
  }
)


export const attributeSlice = createSlice({  
  name: 'attributes',
  initialState: {
    addAttributeProduct:[],
    attributeProduct:[],
    isLoading: false,
    error: null,
  },
  
  extraReducers: (builder) => {    
    console.log("builder",builder);
    builder.addCase(addAttributeData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addAttributeData.fulfilled, (state, action) => {
      state.isLoading = false
      state.addAttributeProduct = action.payload
    })
    builder.addCase(addAttributeData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(getAttributeData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAttributeData.fulfilled, (state, action) => {      
      state.isLoading = false
      state.attributeProduct = action.payload
      // console.log("state.categoryProduc", action.payload);
    })
    builder.addCase(getAttributeData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    



    
    
  },
})
console.log("userSlice",attributeSlice);
export default attributeSlice.reducer