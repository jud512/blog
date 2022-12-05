import './footer.scss'
import Logo from "../../assets/judyblogwb.png"
import { Link } from 'react-router-dom'

const Footer = () => {
  return (
    <footer>
      <img src={Logo} alt="" />
      <span>
        All rights reserved. <a className='link' href='http://judyprojects.hu' target='_blank'>JudyProjects</a> 
      </span>
    </footer>
  )
}

export default Footer