import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
import joblanceLogo from '../../assets/joblance_logo_t2.png';
import './index.css';

const Login = () => {

  const navigate = useNavigate();

  useEffect(()=>{
    const token = Cookies.get("myToken");

    if(token !== undefined){
      navigate("/");
    }
  },[])

  const [allValues,setValues] = useState({
    username: "",
    password: "",
    errorMsg: ""
  })

  const onSubmitUserDetails = async (e) => {
    e.preventDefault();

    const api = "https://apis.ccbp.in/login";

    const userDetails = {
      username: allValues.username,
      password: allValues.password
    }

    const options = {
      method: "Post",
      body: JSON.stringify(userDetails)
    }

    try {
      const response = await fetch(api,options);
      const data = await response.json();
      console.log(data);
      if(response.ok){
        setValues({...allValues,errorMsg:""});
        Cookies.set("myToken",data.jwt_token);
        navigate("/");
      }
      else{
        setValues({...allValues,errorMsg:data.error_msg});
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='main'>
      <div className='login-form'>
          <img src={joblanceLogo} width="300px" className='rounded' />
          <br />
          <h2 className='text-light text-center p-3'>Your Career Journey Starts Here</h2>
          <br />
          <form style={{width:"50%"}} className='p-4 rounded shadow form_details lg-w-50' onSubmit={onSubmitUserDetails}>
            <div className="form-group">
              <label htmlFor="exampleInputUsername">Username</label>
              <input onChange={(e)=>{setValues({...allValues,username:e.target.value})}} type="text" className="form-control" id="exampleInputUsername" aria-describedby="UsernameHelp"/>
              <small id="UsernameHelp" className="form-text text-muted bg-light">We'll never share your email with anyone else.</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">Password</label>
              <input onChange={(e)=>{setValues({...allValues,password:e.target.value})}} type="password" className="form-control" id="exampleInputPassword1"/>
            </div>
            <div className='w-100 d-flex justify-content-center '>
              <button type="submit" className="btn btn-primary ">Login</button>
            </div>
            <br />
            <b className='text-danger text-center w-100'>{allValues.errorMsg}</b>
        </form>
      </div>
    </div>
  )
}

export default Login;