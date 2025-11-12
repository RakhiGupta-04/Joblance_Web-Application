import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom';
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
    <div className='login-form'>
        <h1 className='text-danger'>Joblance</h1>
        <br /><br />
        <form style={{width:"35%"}} className='p-4  shadow' onSubmit={onSubmitUserDetails}>
          <div className="form-group">
            <label htmlFor="exampleInputUsername">Username</label>
            <input onChange={(e)=>{setValues({...allValues,username:e.target.value})}} type="text" className="form-control" id="exampleInputUsername" aria-describedby="UsernameHelp"/>
            <small id="UsernameHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
          </div>
          <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input onChange={(e)=>{setValues({...allValues,password:e.target.value})}} type="password" className="form-control" id="exampleInputPassword1"/>
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          <br /><br />
          <b className='text-danger'>{allValues.errorMsg}</b>
      </form>
    </div>
  )
}

export default Login;