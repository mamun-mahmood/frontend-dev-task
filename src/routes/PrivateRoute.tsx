import { FC, useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';
import { selectUser } from '../redux/features/user/userSlice';
import { useNavigate } from 'react-router-dom';

interface PrivateRouteProps {
    children: React.ReactNode
}

const PrivateRoute: FC<PrivateRouteProps> = (props) => {
    const { isLoggedIn } = useAppSelector(selectUser)
    const navigate = useNavigate()
    useEffect(() => {
        if (!isLoggedIn) {
            navigate('/signin')
        }
        
    }, [isLoggedIn, navigate])
    if(isLoggedIn) return (
        <>
            {props.children}
        </>
    );
};

export default PrivateRoute;