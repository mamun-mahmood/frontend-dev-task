import { FC, useEffect, useState } from 'react';
import { useLazyGetUsersQuery } from '../services/user';
import { IUserState } from '../redux/features/user/userSlice';

interface UsersProps {
    // Define your component props here
}

const Users: FC<UsersProps> = () => {
    const [currentPage, setPage] = useState(1)
    const [
        getUsers,
        { data, isLoading, isError, error },
    ] = useLazyGetUsersQuery()
    useEffect(() => {
        getUsers({ page: currentPage })
    }, [getUsers, currentPage])
    const { data: users = [], total_pages: totalPage } = data as {
        data: IUserState[],
        total_pages: number,
    } || {}
    console.log(data);
    const handleNext = () => {
        setPage(prev => prev + 1)
    }
    const handlePrevious = () => {
        setPage(prev => prev - 1)
    }
    return (
        <div className='w-full px-[10%] py-[5%]'>
            <div className="w-full flex justify-between ">
                <p className='text-[#101828] text-2xl '>Users</p>
                <div className="flex gap-3 items-center">
                    <button className="w-[105px] h-10 rounded-lg border border-[#D0D5DD] py-[10x] px-[16px] flex gap-2 items-center hover:opacity-80 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <g clipPath="url(#clip0_2_52)">
                                <path d="M13.3333 13.3334L9.99997 10M9.99997 10L6.66663 13.3334M9.99997 10V17.5M16.9916 15.325C17.8044 14.8819 18.4465 14.1808 18.8165 13.3322C19.1866 12.4837 19.2635 11.5361 19.0351 10.6389C18.8068 9.74182 18.2862 8.94629 17.5555 8.3779C16.8248 7.80951 15.9257 7.50064 15 7.50003H13.95C13.6977 6.5244 13.2276 5.61864 12.5749 4.85085C11.9222 4.08307 11.104 3.47324 10.1817 3.0672C9.25943 2.66116 8.25709 2.46949 7.25006 2.5066C6.24304 2.5437 5.25752 2.80861 4.36761 3.28142C3.47771 3.75422 2.70656 4.42261 2.11215 5.23635C1.51774 6.05008 1.11554 6.98797 0.935783 7.97952C0.756025 8.97107 0.803388 9.99047 1.07431 10.9611C1.34523 11.9317 1.83267 12.8282 2.49997 13.5834" stroke="#344054" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2_52">
                                    <rect width="20" height="20" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span className='text-[#344054] text-sm'>Import</span>
                    </button>
                    <button className="w-[123px] h-10 rounded-lg py-[10x] px-[16px] bg-[#7F56D9] flex gap-2 items-center hover:opacity-80 transition-opacity">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                            <path d="M9.99996 4.16663V15.8333M4.16663 9.99996H15.8333" stroke="white" strokeWidth="1.67" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span className='text-[#FFF] text-sm'>Add User</span>
                    </button>
                </div>
            </div>
            <div className="mt-[33px] border border-[#EAECF0] rounded-lg px-6">
                <table className="w-full ">
                    <thead className="border-b border-[#eeeeee">
                        <tr className="text-[#344054] text-sm ">
                            <th className="py-[16px] text-start flex items-center gap-3"> <input className='w-5 h-5 rounded-[6px] bg-[#b82d2d] border-[1px] border-solid border-[#D0D5DD]'
                                type="checkbox"
                                name="selected" />
                                <p>User Info</p>
                            </th>
                            <th className="py-[16px] text-start">About</th>
                            <th className="py-[16px] text-start">Status</th>
                        </tr>
                    </thead>
                    <tbody className=''>
                        {users.map(({ first_name, last_name, id, email, avatar }) => (
                            <tr key={id} className="text-[#344054] text-sm">
                                <td className="py-[16px]">
                                    <div className="flex items-center gap-3">
                                        <input className='w-5 h-5 rounded-[6px] bg-[#b82d2d] border-[1px] border-solid border-[#D0D5DD]'
                                            type="checkbox"
                                            name="selected" id={id.toString()} />
                                        <img className='h-10 w-10 rounded-[50%]' src={avatar} alt={first_name + "avatar"} />
                                        <div>
                                            <p className="font-mediumtext-sm text-[#101828]">{first_name + last_name}</p>
                                            <p className="font-normal -sm text-[#667085]">{email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="py-[16px]">
                                    <div>
                                        <p className="font-mediumtext-sm text-[#101828]">{first_name + last_name}</p>
                                        <p className="font-normal -sm text-[#667085]">{email}</p>
                                    </div>
                                </td>
                                <td className="py-[16px]">
                                    <div>
                                        <p className="font-mediumtext-sm text-[#101828]">{first_name + last_name}</p>
                                        <p className="font-normal -sm text-[#667085]">{email}</p>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <div className="w-full flex justify-between items-center py-[16px]">
                    <button className="w-[123px] h-10 rounded-lg py-[10x] px-[16px] text-[#344054]  border border-[#D0D5DD] items-center hover:opacity-80 transition-opacity" onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <p className='text-[#344054]'>
                        Page {currentPage} of {totalPage}
                    </p>
                    <button className="w-[123px] h-10 rounded-lg py-[10x] px-[16px] text-[#344054]  border border-[#D0D5DD] items-center hover:opacity-80 transition-opacity" onClick={handleNext}
                        disabled={currentPage >= totalPage}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Users;