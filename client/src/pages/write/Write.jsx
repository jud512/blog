import './write.scss';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { useState } from 'react';
import axios from 'axios'
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { useEffect } from 'react';
import BlogApi from '../../apis/BlogApi';

const Write = () => {

  const state = useLocation().state;
  // console.log(state);
  const [value, setValue] = useState(state?.desc || '');
  const [title, setTitle] = useState(state?.title ||'');
  const [file, setFile] = useState(state?.img || null);
  const [cat, setCat] = useState(state?.cat ||'');
  
  const navigate = useNavigate()

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file)     
      const res = await BlogApi.post("/upload", formData)
      return res.data
    } catch (error) {
      console.log(error);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault()
    const imgUrl = await upload()

    try {
      state ? await BlogApi.put(`/posts/${state.id}`, {
        title,
        desc:value,
        cat,
        img:file ? imgUrl : "",
      }) : await BlogApi.post('/posts/', {
        title,
        desc:value,
        cat,
        img: file ? imgUrl : "",
        date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss")
      });

      navigate("/");
    } catch (error) {
      console.log(error);
    }
    navigate("/")
  }
  
  
  const handleFileSelect = async (e) => {
    e.preventDefault();
    setFile(e.target.files[0])

  }

 
// console.log(state)
  return (
    <div className='add'>
      <div className="content">
        <input type="text" value={title} placeholder='Title' onChange={e => setTitle(e.target.value)}/>
        <div className="editorContainer">
          <ReactQuill theme="snow" value={value} onChange={setValue} className='editor'/>
        </div>
      </div>
      <div className="menu">
        <div className="item">
          <div>
            <div className="left">
              <h1>Publish</h1>
              <span>
                <b>Status: </b> Draft
              </span>
              <span>
                <b>Visability: </b> Public
              </span>
              <input style={{display:"none"}}type="file" id="file" name="" onChange={handleFileSelect}/>
              <label className='file' htmlFor="file">Upload Image</label>
            </div>
            <div className="right">
             {state ?  <img src={`../upload/${file}`}/> : <img src={file ? URL.createObjectURL(file) : "https://media.istockphoto.com/id/1357365823/vector/default-image-icon-vector-missing-picture-page-for-website-design-or-mobile-app-no-photo.jpg?s=612x612&w=0&k=20&c=PM_optEhHBTZkuJQLlCjLz-v3zzxp-1mpNQZsdjrbns="} alt="" />}
            </div>  
          </div>
          


          <div className="buttons">
            <button>Save as a draft</button>
            <button onClick={handleSubmit}>Publish</button>
          </div>
        </div>
        <div className="item">
          <h1>Category</h1>
          <div className="cat">          
            <input type="radio" checked={cat === 'art'} name="cat" value="art" id="art" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="art">Art</label>
          </div>
          <div className="cat">  
            <input type="radio" checked={cat === 'science'} name="cat" value="science" id="science" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="science">Science</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'technology'} name="cat" value="technology" id="technology" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="technology">Technology</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'design'} name="cat" value="design" id="design" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="design">Design</label>
          </div>
          <div className="cat">
            <input type="radio" checked={cat === 'food'} name="cat" value="food" id="food" onChange={e => setCat(e.target.value)}/>
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
      </div>
    
  )
}

export default Write