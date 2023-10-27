import {Button,InputGroup,Row,Form,Card } from 'react-bootstrap';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { addUserData } from '../../slice/userSlice';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Navigate, useNavigate } from 'react-router-dom';
import './addUser.css';
const AddUser=()=>{
    const users = useSelector((state) => state.user.users)
const isLoading = useSelector((state) => state.user.isLoading)
const error = useSelector((state) => state.user.error)
 console.log("users",users,isLoading,error);
    const [inputs, setInputs] = useState({});
    const dispatch=useDispatch()
    const navigate=useNavigate()
    const handleChange = (event) => {
      const name = event.target.name;
      const value = event.target.value;
      setInputs(values => ({...values, [name]: value}))
    }
  
    const handleSubmit = (event) => {
      event.preventDefault();
      console.log(inputs);
      dispatch(addUserData(inputs))
    }
    if(users.message ){
      return(  
        <div>
        {toast(users.message)}
        <ToastContainer />       
        </div>
      )
    }
    // if(users.user ){
    //     setTimeout(() => {
    //     navigate("/user/login")
    //       }, "3000");
    //   }
    const resetButton=()=>{
        navigate("/user/login")   
    }
    return(
        <>
   
   <Card className='addUserCard'>
    <Row className="cust_addUser_rows">
        <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>Name</Form.Label>
            <Form.Control type="name" name="name" value={inputs.name} onChange={handleChange} className="form-control" />
        </Form.Group>       
        <Form.Group className=" col col-sm-6" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control className="form-control" type="text" name="address" value={inputs.address}  onChange={handleChange} />
        </Form.Group>
    </Row>
    <Row className="cust_addUser_rows">        
        <Form.Group controlId="formBasicEmail" className="col col-sm-6">
            <Form.Label>Email</Form.Label>
            <InputGroup>
                <Form.Control aria-label="Recipient's username" aria-describedby="basic-addon2" type="email" name="email" value={inputs.email}  onChange={handleChange} />
                <InputGroup.Text id="basic-addon2">@gmail.com</InputGroup.Text>
            </InputGroup>
        </Form.Group>
        <Form.Group controlId="formBasicPassword" className="col col-sm-6">
            <Form.Label>password</Form.Label>
            <InputGroup>               
                <Form.Control aria-label="password" type="password" aria-describedby="basic-addon1" className="form-control" name="password" value={inputs.password } onChange={handleChange} />
            </InputGroup>
        </Form.Group>
    </Row>
    <Row className="cust_addUser_rows">
    <Form.Group controlId="formBasicMobile" className="col col-sm-6">
            <Form.Label>Mobile Number</Form.Label>
            <InputGroup className='mobile_number'>
                <InputGroup.Text id="basic-addon1">+91</InputGroup.Text>
                <Form.Control aria-label="Mobile Number" type="mobile" aria-describedby="basic-addon1" className="form-control" name="phone_number" value={inputs.mobile_number}  onChange={handleChange} />
            </InputGroup>
        </Form.Group>
    </Row>
    <Row className="cust_addUser_rows">
        <Form.Group controlId="formGridCheckbox" className="col col-sm-6">
            <button type="submit" onClick={handleSubmit} className="me-4 btn btn-success btn-lg btn-block cust_add_btn">Submit</button>
            <button type="login" onClick={resetButton} className="me-4 btn btn-danger btn-lg btn-block cust_login_btn">Cancel</button>
        </Form.Group>
    </Row>
    </Card>



        </>
    )
}
export default AddUser