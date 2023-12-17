import { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';
import { selectUser } from '../redux/features/user/userSlice';
import { useAppSelector } from '../redux/hooks';

interface PrivateRouteProps {
    children: React.ReactNode
}

const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
    const { isLoggedIn } = useAppSelector(selectUser)
    const navigate = useNavigate()
    const from = useLocation().pathname
    
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/signin', {state: {from}})
        }
    }, [isLoggedIn, navigate, from])

    return isLoggedIn ? children : <Loader/>
};

export default PrivateRoute;