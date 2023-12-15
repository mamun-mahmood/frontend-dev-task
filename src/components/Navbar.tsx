import { Link, useLocation,  } from 'react-router-dom';

const navBtns = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
]
const Navbar = () => {
    const currentPath = useLocation().pathname;
    
    return (
        <nav className="bg-gray-800 h-20">
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 flex py-4">
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                    <Link to="/" className="flex-shrink-0 flex items-center">
                        <img className=" h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg" alt="Workflow" />
                    </Link>
                </div>
                <div >
                    <div className="sm:ml-6">
                        <div className="flex space-x-4">
                            {navBtns.map(({name, path}, index) => (
                                <Link key={index} to={path} className={`text-gray-300 
                                ${currentPath === path && "bg-gray-900" } transition-all hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}>{name}</Link>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </nav>
    );
};

export default Navbar;