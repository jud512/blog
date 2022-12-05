import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import './menu.scss';
import { Link } from 'react-router-dom';

const Menu = ({cat}) => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts/?cat=${cat}`)
                setPosts(res.data)
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, [cat])

    //  const posts = [
    //     {
    //         id: 1,
    //         title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //         desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora possimus molestias aperiam aliquid iure iusto voluptatibus labore modi soluta optio.",
    //         img: "https://images.pexels.com/photos/572688/pexels-photo-572688.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
    //     },
    //     {
    //         id: 2,
    //         title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //         desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora possimus molestias aperiam aliquid iure iusto voluptatibus labore modi soluta optio.",
    //         img: "https://images.pexels.com/photos/4349791/pexels-photo-4349791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
    //     },
    //     {
    //         id: 3,
    //         title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //         desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora possimus molestias aperiam aliquid iure iusto voluptatibus labore modi soluta optio.",
    //         img: "https://images.pexels.com/photos/511763/pexels-photo-511763.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
    //     },
    //     {
    //         id: 4,
    //         title: "Lorem ipsum dolor sit, amet consectetur adipisicing elit.",
    //         desc: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tempora possimus molestias aperiam aliquid iure iusto voluptatibus labore modi soluta optio.",
    //         img: "https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
    //     },
    // ]




    return (
        <div className='menu'>
            <h1>Other post you may like</h1>
            {
                posts.map(post => {
                    return(
                        
                        <div className="post" key={post.id}>
                            <img src={`../upload/${post?.img}`} alt="" />
                            <h2>{post.title}</h2>
                            <Link className='link' to={`/post/${post.id}`}>
                                <button>Read more</button>
                            </Link>
                            
                        </div>
                        
                    )
                })
            }
        </div>
    )
}

export default Menu