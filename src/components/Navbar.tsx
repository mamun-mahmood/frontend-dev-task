import { useEffect } from 'react';
import { Link, useLocation, } from 'react-router-dom';
import { selectUser, setUser } from '../redux/features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useLazyGetUserQuery } from '../services/user';

const navBtns = [
    { name: "Home", path: "/" },
    { name: "Users", path: "/users" },
    { name: "Projects", path: "/projects" },
    { name: "Tasks", path: "/tasks" },
    { name: "Reporting", path: "/reporting" },
]
const navBtns2 = [
    {
        icon: "/search.svg",
        name: "Search",
    },
    {
        icon: "/settings.svg",
        name: "Setting",
    },
    {
        icon: "/bell.svg",
        name: "Notification",
    },

]
const Navbar = () => {
    const currentPath = useLocation().pathname;
    const { isLoggedIn, id=2, avatar } = useAppSelector(selectUser)    
    const [
        getUser
    ] = useLazyGetUserQuery()
    const dispatch = useAppDispatch()
    useEffect(() => {
        if (isLoggedIn) {
            getUser({id}).then((res: any) => {
                if (res?.data) {
                    dispatch(
                        setUser({ avatar: res?.data.data.avatar})
                    )
                }
            }
            )
        }
    }, [dispatch, getUser, id, isLoggedIn])
    return (
        <nav className="bg-[#6941C6] ">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex py-4 items-center">
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <Link to="/" className="flex-shrink-0 flex items-center mr-[56px]">
                        <img className=" h-8 w-auto" src="/stack.svg" alt="Workflow" />
                        <p className="text-white font-bold text-xl ml-2">Stack</p>
                    </Link>
                    <div className="flex gap-4">
                        {navBtns.map(({ name, path }, index) => (
                            <Link key={index} to={path} className={`text-gray-300 
                                ${currentPath === path && "bg-[#7F56D9]"} transition-all hover:opacity-80 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>{name}</Link>
                        ))}
                    </div>
                </div>
                <div className="gap-2 hidden lg:flex">
                    {navBtns2.map(({ icon }, index) => (
                        <button key={index}
                            className="text-gray-300 hover:bg-[#7F56D9] hover:text-white px-3 py-2 rounded-full text-sm font-medium flex items-center gap-2">
                            <img className='w-5 h-5' src={icon} alt={icon} />
                        </button>
                    ))}
                    <button className="hover:bg-[#7F56D9] rounded-full p-1">
                        <img className='w-10 rounded-full' src={avatar} alt="profile" />
                    </button>
                </div>

            </div>
        </nav>
    );
};

export default Navbar;