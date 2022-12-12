import { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/authContext'
import './profile.scss'
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import DOMPurify from 'dompurify'
import { Link } from 'react-router-dom';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import BlogApi from '../../apis/BlogApi';

const Profile = () => {

    const { currentUser} = useContext(AuthContext);
    const [userPosts, setUserPosts] = useState([]);
    const location = useLocation();
    const userId = location.pathname.split("/")[2];
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await BlogApi.get(`/users/${userId}`);
                setUserPosts(res.data);
            } catch (err) {
                console.log(err)
            }
        }

        fetchData(userPosts);
    }, [userId])
    // console.log(userPosts)
    // console.log(currentUser)
    // console.log(moment(userPosts[0]?.date).format('YYYY-MM-DD'))

  return (
    <div className='profile'>
        <div className="profileInfo">
            <div className="img">
                <img src={currentUser?.img} alt="" />
            </div>
            <div className="info">
                <h1>{currentUser.firstname} {currentUser.lastname}</h1>
                <h5>{currentUser.email}</h5>
                <div className="counter"><span>{userPosts.length}</span>  posts</div>                
                <p><EmailOutlinedIcon /></p>
                    
                
                
            </div>

            <div className="infoAlter">

            </div>
        </div>
        <div className="userPosts">
            {
                userPosts.map(post => {
                    return(
                        <div key={post.id} className="post">
                            <div className="img">
                                <img src={`../upload/${post?.postImg}`} alt="" />
                            </div>
                            <div className="info">
                                <div className="infoPost">
                                    <h1>{post.title}</h1>
                                    <h5>{moment(post?.date).format('YYYY-MM-DD')}</h5>
                                    <div>
                                        <p dangerouslySetInnerHTML={{
                                        __html: DOMPurify.sanitize(post.desc.slice(0,200)),
                                    }}></p>...
                                    </div>
                                    
                                </div>                                
                                <Link className='link' to={`/post/${post.id}`}>
                                        <button>Read more</button>
                                </Link>
                                

                            </div>
                        </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Profile