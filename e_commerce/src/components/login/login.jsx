import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../slice/userSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { useNavigate } from 'react-router-dom';
import { Card } from 'react-bootstrap';

const Login=()=>{
  const dispatch=useDispatch()
  const [inputs, setInputs] = useState({});
const navigate=useNavigate()
 
const loginData=useSelector((state)=> {return state.user.loginUser})
const isLoading=useSelector((state)=> {return state.user?.isLoading})
const error=useSelector((state)=> {return state.user?.error})
  console.log("login115555555",loginData);
  const handleChange = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setInputs(values => ({...values, [name]: value}))
  }
  if(loginData &&loginData !==null){
    localStorage.setItem('token', JSON.stringify(loginData?.token));
    localStorage.setItem('data', JSON.stringify(loginData?.user));

    if(loginData?.user?.role === 1){

      navigate('/product/admin/addCategory')
      window.location.reload()
    }else if(loginData?.user?.role === 0){
      navigate('/product/category') 
      window.location.reload()
    }
    
  }
  if(isLoading && isLoading===true){
   return(
      <Spinner animation="border" className='spinner_parent' role="status" style={{ width: "4rem", height: "4rem" }} variant="secondary">
        <span className="visually-hidden">Loading...</span>
    </Spinner>
   )
  }
    return(
        <>     
        {error && error !=null&& ( 
          <div>
            {toast(error.message)}
                    <ToastContainer />
          </div>        
        )}

{process.env.REACT_APP_BASE_URL}
        <Card className='loginCard'>
      <Form.Group className="form_group" controlId="formBasicEmail">
        <Form.Label className='cust_form_label'>Email address</Form.Label>
        <Form.Control type="email" name="email" placeholder="Enter email" className='email' onChange={handleChange}/>
        <Form.Text className="text-muted">        
        </Form.Text>
      </Form.Group>
      <Form.Group className="form_group" controlId="formBasicPassword">
        <Form.Label className='cust_form_label'>Password</Form.Label>
        <Form.Control type="password" name="password" placeholder="Password" className='password' onChange={handleChange}/>
      </Form.Group>
      {/* <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check type="checkbox" label="Check me out" />
      </Form.Group> */}
      <Button variant="primary" onClick={(e)=> dispatch(login(inputs))} type="submit" className='login'>
        Submit
      </Button>
      </Card>
    
        </>
    )
}
export default Login