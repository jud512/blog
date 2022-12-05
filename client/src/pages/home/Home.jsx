import { useEffect } from 'react';
import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './home.scss'
import axios from 'axios'

const Home = () => {

    const [posts, setPosts] = useState([]);

    const cat = useLocation().search;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`/posts${cat}`);
                setPosts(res.data)
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, [cat])

    // const posts = [
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

    const getText = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html")
        return doc.body.textContent;
    }

    return (
        <div className='home'>
            <div className='posts'>
                {
                    posts.map(post => {
                        return (
                            <div className="post" key={post.id}>
                                <div className="img">
                                    <img src={`../upload/${post.img}`} alt="" />
                                </div>
                                <div className="content">
                                    <Link className="link" to={`/post/${post.id}`}>
                                        <h1>{post.title}</h1>
                                    </Link>
                                    <p>{getText(post.desc).slice(0,500)}...</p>
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

export default Home