import './cart.scss'
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';

const Cart = () => {
  return (
    <div className='cart'>
        <div className="left">
            <span className="title">users</span>
            <span className="counter">40</span>
            <span className="link">See all users</span>
        </div>
        <div className="right">
            <span className="percentage">
                <KeyboardArrowUpIcon />
                20%
            </span>
            <PersonIcon className='icon'/>

        </div>
    </div>
  )
}

export default Cart