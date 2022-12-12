import './login.scss'
import { Link, useNavigate } from 'react-router-dom'
import { useContext, useState } from 'react'
import axios from 'axios';
import { AuthContext } from '../../context/authContext';
import BlogApi from '../../apis/BlogApi';

const Login = () => {
  const [inputs, setInputs] = useState({
    username:"",
    password:""
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate();
;
  const {login} = useContext(AuthContext);
 

  const handleChange = (e) => {
    setInputs((prev) => ({...prev, [e.target.name]:e.target.value}))
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(inputs)
      await BlogApi.post("/auth/login", inputs);
      navigate("/");
    } catch (error) {
      setError(error.response.data)
    }
  }
  return (
    <div className='login'>
      
      <form>
        <h1>Login</h1>
        <input type="text" placeholder='Username' name="username" onChange={handleChange}/>
        <input type="password" placeholder='Password' name="password" onChange={handleChange}/>
        <button onClick={handleSubmit}>Login</button>
        {error && <p>{error}</p>}
        <span>Don't you have an account? <Link to="/register">Register</Link> </span>
      </form>
    </div>
  )
}

export default Login