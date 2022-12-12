import './single.scss'
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import { Link, useLocation, useNavigate } from 'react-router-dom'
import Menu from '../../components/menu/Menu';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import DOMPurify from 'dompurify'
import BlogApi from '../../apis/BlogApi';


const Single = () => {
  const [post, setPost] = useState([]);

  const location = useLocation();
  const postId = location.pathname.split("/")[2];
  const {currentUser} = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await BlogApi.get(`/posts/${postId}`);
        setPost(res.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
  }, [postId])

  console.log(post)
  const handleDelete = async () => {
    try {
      await BlogApi.delete(`/posts/${postId}`)
      navigate("/")
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className='single'>
      <div className="content">
        <img src={`../upload/${post?.img}`} alt="" />
        <div className="user">
          <Link to={`/profile/${post.userId}`}>
            {post.userImg && <img src={post.userImg} alt="" />}

          </Link>
          
          <div className="info">
            <span>{post.firstname} {post.lastname}</span>
            <p>Posted {moment(post.date).fromNow()} </p>
          </div>
          {currentUser.username === post.username && <div className="icon">
            <Link className="link" to={`/write?edit=2`} state={post}>
              <div className="edit">
                <ModeEditOutlineOutlinedIcon />
              </div>
            </Link>
            
            <div className="delete" onClick={handleDelete}>
              <DeleteOutlineOutlinedIcon />
            </div>            
          </div>}
          </div>
          <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.desc),
          }}
        ></p> 
        
      </div>
      
      <Menu cat={post.cat}/>
      
    </div>
  )
}

export default Single