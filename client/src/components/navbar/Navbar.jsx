import './navbar.scss'
import Logo from "../../assets/judyblogwb.png"
import { Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react'
import { AuthContext } from '../../context/authContext'
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useState } from 'react'

const Navbar = () => {

  const { currentUser, logout} = useContext(AuthContext);
  const profileImg = currentUser?.img ? currentUser.img : "https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1";

  const [open, setOpen] = useState('false');

  const navigate = useNavigate();

  const handleAdmin = () => {
    setOpen(!open)
    navigate('/dashboard')
   
  }

  const handleLogout = () => {
    logout()
    navigate("/")
  }

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to='/'>
            <img src={Logo} alt="" />
          </Link>
          
        </div>
        <div className="links">
          <div className="linksTop">
              <Link className='link' to="/?cat=art">
              <h6>ART</h6>
            </Link>
            <Link className='link' to="/?cat=science">
              <h6>SCIENCE</h6>
            </Link>
            <Link className='link' to="/?cat=technology">
              <h6>TECHNOLOGY</h6>
            </Link>
            <Link className='link' to="/?cat=design">
              <h6>DESIGN</h6>
            </Link>
            <Link className='link' to="/?cat=food">
              <h6>FOOD</h6>
            </Link>
            
           {currentUser && 
           <div className="img" onClick={() => setOpen(!open)}>
              <img src={profileImg} alt="" />
              
            </div>}
            {currentUser ? "" : <Link className='link' to="/login" style={{fontSize:'18px', fontWeight:'500', backgroundColor:'rgb(7, 104, 159)', color:'white', padding:'5px 10px', borderRadius:'10px'}}>Login</Link>}
          </div>
          
          
          
        </div>
      </div>


      <div className='writeContainer'>
        {currentUser && <div className='write' ><Link className='link' to='/write'>Write</Link></div>}
      </div>



      <div className={(currentUser && !open) ? 'profileMenu' : 'hide'} >
        <div className="userName">
          <Link className='link' to={`/profile/${currentUser?.id}`} onClick={() => setOpen(!open)}>
            <img src={profileImg} alt="" />
          </Link>
           <Link className='link' to={`/profile/${currentUser?.id}`} onClick={() => setOpen(!open)}>
            <span>{currentUser?.firstname} {currentUser?.lastname}</span>
          </Link>          
          
        </div>
        
        {currentUser?.isadmin  ? (<div className="item">
          <div className="itemIcon">
            {currentUser && <LogoutOutlinedIcon fontSize='medium'/>}
          </div>
          
          {currentUser && <span onClick={handleAdmin}>Admin</span> }
        </div>) : ""}

        <div className="item">
          <div className="itemIcon">
            {currentUser && <LogoutOutlinedIcon fontSize='medium'/>}
          </div>
          
          {currentUser && <span onClick={() => handleLogout()}>Logout</span> }
        </div>
        
      </div>
    </div>
  )
}

export default Navbar