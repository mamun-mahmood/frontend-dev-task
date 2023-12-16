import { FC, useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { selectUser } from '../redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';
import Loader from '../components/Loader';

interface PrivateRouteProps {
    children: React.ReactNode
}

const PrivateRoute: FC<PrivateRouteProps> = ({children}) => {
    const { isLoggedIn } = useAppSelector(selectUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/signin')
        }
    }, [isLoggedIn, navigate])

    return isLoggedIn ? children : <Loader/>
};

export default PrivateRoute;