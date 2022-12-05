import './register.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const Register = () => {
  const [inputs, setInputs] = useState({
    username:"",
    firstname:"",
    lastname:"",
    email:"",
    password:""
  })

  const [focused, setFocused] = useState({
    username: false,
    firstname:false,
    lastname:false,
    email: false,
    password: false
  });

  const [error, setError] = useState(null);

  const navigate = useNavigate()

  const handleFocus = (e) => {
    setFocused(prev => ({...prev, [e.target.name]: true}));
  }

  const handleChange = (e) => {
    setInputs(prev => ({...prev, [e.target.name]:e.target.value}))
  }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/register", inputs)
      navigate("/login");
      
    } catch (error) {
      setError(error.response.data)
    }
    
  }

  return (
    <div className='register'>
      
      <form>
        <h1>Register</h1>
        <div className="formInput">
          <input type="text" placeholder='Username' name='username' value={inputs.username} onChange={handleChange} required pattern="^[A-Za-z0-9]{3,16}$" onBlur={handleFocus} focused={focused.username.toString()}/>
        <span>Username should be 3-16 characters and shouldn't include may special character.</span>
        </div>

        <div className="formInput">
          <input type="text" placeholder='First Name' name='firstname' value={inputs.firstname} onChange={handleChange} required pattern="^[A-Za-z]{3,16}$" onBlur={handleFocus} focused={focused.firstname.toString()}/>
        <span >Username should be 3-16 characters and shouldn't include may special character.</span>
        </div>
        <div className="formInput">
          <input type="text" placeholder='Last Name' name='lastname' value={inputs.lastname} onChange={handleChange} required pattern="^[A-Za-z]{3,16}$" onBlur={handleFocus} focused={focused.lastname.toString()}/>
        <span >Username should be 3-16 characters and shouldn't include may special character.</span>
        </div>
        <div className="formInput">
            <input type="email" placeholder='Email' name='email' value={inputs.email} onChange={handleChange} required onBlur={handleFocus} focused={focused.email.toString()}/>
            <span>It should be a valid email address.</span>
        </div>
        <div className="formInput">
            <input type="password" placeholder='Password' name='password' value={inputs.password} onChange={handleChange} required pattern='^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d][A-Za-z\d!@#$%^&*()_+]{8,20}$' onBlur={handleFocus} focused={focused.password.toString()}/>
        <span>Password should be 8-20 characters and include at least 1 letter, 1 number and 1 special character.</span>
        </div>

        

        

        <button onClick={handleSubmit}>Register</button>
        {error && <p>{error}</p>}
        <p>Do you have an account? <Link to="/login">Login</Link> </p>
      </form>
    </div>
  )
}

export default Register