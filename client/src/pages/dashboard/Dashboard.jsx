import Cart from '../../components/cart/Cart'
import Sidebar from '../../components/sidebar/Sidebar'
import './dashboard.scss'

const Dashboard = () => {
  return (
    <div className='dashboard'>
        <Sidebar />
        <div className="dashboardContainer">
            <Cart />
            <Cart />            
        </div>
    </div>
  )
}

export default Dashboard