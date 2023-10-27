import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';

const initialState= {
  users: [],
  loginUser:"",
  isLoading: false,
  error: null,
}

export const addUserData = createAsyncThunk(
  'addUserData',
  async (userData) => {
    console.log("userData",userData);
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}user/addUser`,userData
      
        // headers:{
        //     'content-type': 'application/json'
        // },
        // body:JSON.stringify(userData)
    )
    const data = await res.data
    console.log("data",data);

    return data
  }
)
export const getAllUser = createAsyncThunk(
  'getAllUser',
  async () => {
    const token =
    localStorage?.getItem("token") &&
    localStorage?.getItem("token") !== undefined
      ? JSON.parse(localStorage?.getItem("token"))
      : ""
    const res = await axios.get(`${process.env.REACT_APP_BASE_URL}user/getAllUser`,{
      headers:{
        "Authorization" : `Bearer ${token}`,
        'ngrok-skip-browser-warning':true
      }
    })
    const data = await res.data
    console.log("data",data);
    return data
  }
)

export const login=createAsyncThunk(
  'login',
  async (userData) => {
    console.log("login",userData);
    const res = await axios.post(`${process.env.REACT_APP_BASE_URL}user/login`,userData)
    const data = await res.data
    console.log("data",data);
    return data
  }
)

export const userSlice = createSlice({  
  name: 'user',
  initialState:{
    userData:[],
  },
  reducers: {    
    logout:(state,action)=>{
      state.isLoading = false
      state.users=null
      state.loginUser=null
      state.error= null
      // return state=[]     
    }
  },
   
  extraReducers: (builder) => {
    console.log("builder",builder);
    builder.addCase(addUserData.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(addUserData.fulfilled, (state, action) => {
      state.isLoading = false
      state.users = action.payload
    })
    builder.addCase(addUserData.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })

    builder.addCase(login.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false
      console.log("action",action);
      state.loginUser = action.payload
    })
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    builder.addCase(getAllUser.pending, (state) => {
      state.isLoading = true
    })
    builder.addCase(getAllUser.fulfilled, (state, action) => {
      state.isLoading = false
      console.log("action",action);
      state.userData = action.payload
    })
    builder.addCase(getAllUser.rejected, (state, action) => {
      state.isLoading = false
      state.error = action.error.message
    })
    
  },
})
console.log("userSlice",userSlice);
  export const {logout } = userSlice.actions
export default userSlice.reducer