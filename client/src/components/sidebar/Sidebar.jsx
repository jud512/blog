import './sidebar.scss'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import ArticleIcon from '@mui/icons-material/Article';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupIcon from '@mui/icons-material/Group';
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <ul>
            <p className='title'>main</p>
            <li>
                <DashboardIcon className='icon'/>
                <span>Dashboard</span>
            </li>
            <p className='title'>lists</p>
            <Link to="/dashboard/users" style={{textDecoration:'none'}}>
            <li>
                <GroupIcon className='icon'/>
                <span>Users</span>
            </li>
            </Link>
            <Link to="/dashboard/posts" style={{textDecoration:'none'}}>
            <li>
                <ArticleIcon className='icon'/>
                <span>Posts</span>
            </li>
            </Link>
            <p className='title'>useful</p>
            <li>
                <AutoGraphIcon className='icon'/>
                <span>Statistics</span>
            </li>
            <li>
                <NotificationsIcon className='icon'/>
                <span>Notifications</span>
            </li>
            <li>
                <CollectionsBookmarkIcon className='icon'/>
                <span>Logs</span>
            </li>
            <li>
                <SettingsIcon className='icon'/>
                <span>Settings</span>
            </li>
            <p className='title'>user</p>
            <li>
                <PersonIcon className='icon'/>
                <span>Profile</span>
            </li>
            <li>
                <LogoutIcon className='icon'/>
                <span>Logout</span>
            </li>
            
        </ul>
    </div>
  )
}

export default Sidebar