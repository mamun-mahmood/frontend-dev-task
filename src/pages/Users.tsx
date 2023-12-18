import { useEffect, useState } from 'react';
import Loader from '../components/Loader';
import { IUserState } from '../redux/features/user/userSlice';
import { useLazyGetUsersQuery } from '../services/user';
import IconButton from '../components/IconButton';
import CheckBox from '../components/CheckBox';

const Users = () => {
    const [currentPage, setPage] = useState(1)
    const [
        getUsers,
        { data, isLoading },
    ] = useLazyGetUsersQuery()
    const [users, setUsers] = useState([]) as [IUserState[], any]
    useEffect(() => {
        getUsers({ page: currentPage })
    }, [getUsers, currentPage])
    const { data: usersData = [], total_pages: totalPage } = data as {
        data: IUserState[],
        total_pages: number,
    } || {};
    useEffect(() => {
        setUsers(usersData.map((user: any) => ({
            ...user,
            selected: false
        })))
    }, [usersData])

    const handleNext = () => {
        setPage(prev => prev + 1)
    }
    const handlePrevious = () => {
        setPage(prev => prev - 1)
    }
    const handleSelectAll = (e: any) => {
        setUsers((prev: any,) => prev.map((user: any) => ({
            ...user,
            selected: e.target.checked
        })))
    }
    const handleDelete = () => { }
    const handleEdit = () => { }
    const handleSelect = (id: number) => {
        setUsers((prev: any,) => prev.map((user: any) => {
            if (user.id === id) {
                return {
                    ...user,
                    selected: !user.selected
                }
            }
            return user
        }))
    }
    const dummyStatus = [
        {
            id: 1,
            name: 'Random Sticker Label',
            color: '#027A48'
        },
        {
            id: 2,
            name: 'Churned',
            color: '#344054',
        },
        {
            id: 3,
            name: 'Customer',
            color: '#027A48',
        },
        {
            id: 4,
            name: 'Customer',
            color: '#027A48',
        },
        {
            id: 5,
            name: 'Churned',
            color: '#344054',
        },
        {
            id: 6,
            name: 'Customer',
            color: '#027A48',
        },
    ]
    const tableHeader = [
        "User Info",
        "About",
        "Status",
    ]
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
            <div className="mt-[33px] border border-[#EAECF0] rounded-lg">
                <table className="w-full ">
                    <thead className="bg-[#F9FAFB] border-b border-[#eeeeee]">
                        <tr className="text-[#344054] text-sm  ">
                            <td className="py-[16px] pl-6 pr-2">
                                <CheckBox checked={users.every((user: any) => user.selected)} onChange={handleSelectAll} value="all" />
                            </td>
                            {tableHeader.map((item) => <th key={item} className="text-start">{item}</th>)}
                        </tr>
                    </thead>
                    <tbody className='' >
                        {users.map(({ selected, first_name, last_name, id, email, avatar, }, index) => (
                            <tr key={id} className="text-[#344054] text-sm">
                                <td className="pl-6 pr-2">
                                    <CheckBox checked={selected} value={id.toString()} onChange={() => handleSelect(id)} />
                                </td>
                                <td className="py-[16px]">
                                    <div className="flex items-center gap-3">
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
                                <td className="py-[16px] flex gap-3 items-center">
                                    <div className="flex-1">
                                        <p className={`w-fit font-mediumtext-sm bg-[#F2F4F7] text-center px-2 py-[2px] rounded-2xl `} style={{ color: dummyStatus[index].color }}>{dummyStatus[index].name}</p>
                                    </div>
                                    <div className="flex gap-3 pr-5">
                                        <IconButton icon="/trash.svg" onClick={handleDelete} />
                                        <IconButton icon="/edit.svg" onClick={handleEdit} />
                                    </div>

                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {isLoading && <Loader />}
                <div className="w-full flex justify-between items-center py-[16px] px-6">
                    <button className="w-[123px] h-10 rounded-lg py-[10x] px-[16px] text-[#344054]  border border-[#D0D5DD] items-center hover:opacity-80 transition-opacity disabled:opacity-50" onClick={handlePrevious}
                        disabled={currentPage === 1}
                    >
                        Previous
                    </button>
                    <p className='text-[#344054]'>
                        Page {currentPage} of {totalPage}
                    </p>
                    <button className="w-[123px] h-10 rounded-lg py-[10x] px-[16px] text-[#344054]  border border-[#D0D5DD] items-center hover:opacity-80 transition-opacity disabled:opacity-50" onClick={handleNext}
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