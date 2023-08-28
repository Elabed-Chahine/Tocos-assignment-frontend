import { SERVER_URL } from '@/utils/consts'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Users({ token,setActiveUser,activeUser }) {
    const [searchValue, setSearchValue] = useState("")
    const [data, setData] = useState([])
    useEffect(() => {
        searchUsers()
    }, [searchValue])

    const searchUsers = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}users/search?q=${searchValue}`, { headers: { Authorization: `Bearer ${token}` } })
            if (res.data.data) {
                setData(res.data.data)
            }
        } catch (error) {
            toast.error("Something went wrong with your search!")
        }
    }
    return (
        <div className="xl:w-72 w-48 flex-shrink-0 border-r border-gray-200 dark:border-gray-800 h-full overflow-y-auto lg:block hidden p-5">
            <div className="text-xs text-gray-400 tracking-wider">USERS</div>
            <div className="relative mt-2">
                <input type="text" className="pl-8 h-9 bg-transparent border border-gray-300 dark:border-gray-700 dark:text-white w-full rounded-md text-sm" placeholder="Search" onChange={(e) => setSearchValue(e.target.value)} />
                <svg viewBox="0 0 24 24" className="w-4 absolute text-gray-400 top-1/2 transform translate-x-0.5 -translate-y-1/2 left-2" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                </svg>
            </div>

            {data.length > 0 && data.map((user, index) =>
                <div onClick={()=>setActiveUser(user._id)} key={index} className="space-y-4 mt-3">
                    <button className={`border-2 border-transparent bg-white p-3 w-full flex flex-col rounded-md dark:bg-gray-800 shadow ${activeUser == user._id ? "border-2 border-blue-600":""}`}>
                        <div className="flex xl:flex-row flex-col items-center font-medium text-gray-900 dark:text-white pb-2 mb-2 xl:border-b border-gray-200 border-opacity-75 dark:border-gray-700 w-full">
                            <Image width={28} height={28} src="/avatar.png" className=" mr-2 rounded-full" alt="profile" />
                            {user.firstName + " " + user.lastName}
                        </div>
                        <div className="flex items-center w-full">
                            <div className="text-xs py-1 px-2 leading-none dark:bg-green-900 bg-blue-100 text-green-500 rounded-md">{user.transactions.length} transfers made</div>
                            <div className="ml-auto text-xs text-gray-500">${user.balance}</div>
                        </div>
                    </button>

                </div>)}
        </div>
    )
}

export default Users