import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
const options = {
    // headers: {
    //     'Content-Type': 'application/json',
    //   },
    headers: {
        // 'ngrok-skip-browser-warning':true,
        'Content-Type':'application/json'
    },
  };
export const addPromocode = createAsyncThunk(
  'addPromocode',
  async (data) => {   
      console.log("data",data);
     
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}api/addPromocode`,data,options)
      const result = await res.data
      console.log("result",result);  
      return result
  }
)
export const assignPromocode = createAsyncThunk(
  'assignPromocode',
  async (data) => {   
      console.log("data",data);     
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}api/assignPromocode`,data,options)
      const result = await res.data
      console.log("result",result);  
      return result
  }
)


export const getAllPromocode = createAsyncThunk(
  'getAllPromocode',
  async () => {    
    const res = await axios.get(`http://localhost:4001/api/getAllPromocode`)
    const data = await res.data
    console.log("getAllPromocode",res.data);
    return data;
  }
)

export const applyPromocode = createAsyncThunk(
  'applyPromocode',
  async (data) => {   
      
      const user=localStorage.getItem('data') ? JSON.parse(localStorage.getItem('data')):[];
      const promocodeData={data,...{userId:user._id}}
      console.log("promocodeData",promocodeData);     
      const res = await axios.post(`${process.env.REACT_APP_BASE_URL}api/applyPromocode`,promocodeData,options)
      const result = await res.data
      console.log("result",result);  
      return result
  }
)

// export const getAllUser = createAsyncThunk(
//   'getAllUser',
//   async () => {    
//     const res = await axios.get(`http://localhost:4001/api/getAllUser`)
//     const data = await res.data
//     console.log("getAllUser",res.data);
//     return data;
//   }
// )



export const discountSlice = createSlice({  
  name: 'services',
  initialState: {
    addPromocode:[],
    getPromocode:[],
    addAssignPromocode:[],
    isLoading: false,
    error: null,
    applyPromocode:[]
  },
  reducers:{
clearState:(state,action)=>{
state.addPromocode=[]
}
  },
  extraReducers: (builder) => {    
    console.log("builder",builder);
    builder.addCase(addPromocode.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addPromocode.fulfilled, (state, action) => {
      state.isLoading = false
      state.addPromocode = action.payload
    })
    builder.addCase(addPromocode.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(getAllPromocode.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllPromocode.fulfilled, (state, action) => {      
      state.isLoading = false
      state.getPromocode = action.payload
      // console.log("state.categoryProduc", action.payload);
    })
    builder.addCase(getAllPromocode.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
 
    builder.addCase(assignPromocode.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(assignPromocode.fulfilled, (state, action) => {      
      state.isLoading = false
      state.addAssignPromocode = action.payload
      // console.log("state.categoryProduc", action.payload);
    })
    builder.addCase(assignPromocode.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    builder.addCase(applyPromocode.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(applyPromocode.fulfilled, (state, action) => {      
      state.isLoading = false
      state.addapplyPromocode = action.payload
      // console.log("state.categoryProduc", action.payload);
    })
    builder.addCase(applyPromocode.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    
    
    
    
  },
})
  export const {clearState}=discountSlice.actions
export default discountSlice.reducer