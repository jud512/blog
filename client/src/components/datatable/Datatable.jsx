import './datatable.scss'

import { DataGrid, GridColDef, GridValueGetterParams, GridRowParams } from '@mui/x-data-grid';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import { useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../sidebar/Sidebar';
import { Link, useNavigate } from 'react-router-dom';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { convertLength } from '@mui/material/styles/cssUtils';

const columnsUsers = [
    { field: 'id', headerName: 'ID', width: 70 },
    {field:'img', headerName: 'Image', width: 70,
    sortable: false,
    renderCell:(params) => {
                return (
                    <div className="img">
                       <img src={params.row.img} style={{width:'40px', height:'40px', objectFit:'cover', borderRadius:'50%'}}/>                      
                        
                    </div>
                )
            }},
    { field: 'username', headerName: 'Username', width: 100 },
    { field: 'email', headerName: 'Email', width: 200 },
    {
        field: 'fullname',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 180,
        valueGetter: (params) =>
        `${params.row.firstname || ''} ${params.row.lastname || ''}`,
    },
];

const columnsPosts = [
    { field: 'id', headerName: 'ID', width: 70 },
    {field:'img', headerName: 'Image', width: 70,
    sortable: false,
    renderCell:(params) => {
                return (
                    <div className="img">
                       <img src={`/upload/${params.row.img}`} style={{width:'40px', height:'40px', objectFit:'cover'}}/>                     
                        
                    </div>
                )
            }},
    
    {field: 'title', headerName: 'Title', width: 150},
    {field: 'date', headerName: 'Date', width: 130},
   
        
    {
        field: 'fullname',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 200,
        valueGetter: (params) =>
        `${params.row.firstname || ''} ${params.row.lastname || ''}`,
    },
]


const Datatable = ({type}) => {
    const [users, setUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const typeDatatable = type;
    const navigate = useNavigate();

    // const handleDelete = async (userId) => {
    //     try {
    //         await axios.delete(`/users/${userId}`)
    //         window.location.reload()
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }


    const actionColumn = [
        {
            field:"action",
            headerName:"Action",
            width:100,
            renderCell:(params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/view">
                            <div className="viewButton"><VisibilityOutlinedIcon /></div>
                        </Link>
                        
                            <div className="deleteButton" ><ClearOutlinedIcon/></div>
                        
                        
                    </div>
                )
            }
        }
    ]

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/dashboard/users");
                setUsers(res.data)
            } catch (error) {
                console.log(error);
            }
        }

        typeDatatable == 'users' && fetchData();
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("/dashboard/posts");
                setPosts(res.data);
            } catch (error) {
                console.log(error)
            }
        }
        typeDatatable == 'posts' && fetchData();
    })


  return (
    <div className="datatable">
        
        <Sidebar />
        <div style={{ height: 800, width: '100%' }} className="grid">
            {type == 'users' && <div className="datatableTitle">
                <p>Add New User </p> 
                <Link to="/dashboard/users/new" className='link'>
                    Add New
                </Link>
            </div>}
            <DataGrid
                rows={type == "users" ? users : posts}
                columns={type == "users" ? columnsUsers.concat(actionColumn) : columnsPosts.concat(actionColumn)}
                pageSize={10}
                rowsPerPageOptions={[10]}
                checkboxSelection
            />
        </div>
    </div>
    
  )
}

export default Datatable