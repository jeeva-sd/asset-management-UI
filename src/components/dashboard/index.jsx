import { useSelector } from 'react-redux';
import UserDashboard from './UserDashboard';
import DevDashboard from './DevDashboard';

const Dashboard = () => {
    const { isDev } = useSelector(state => state.user.userInfo);
    return (
        <div>
            {isDev ? <DevDashboard /> : <UserDashboard />}
        </div>
    );
};

export default Dashboard;