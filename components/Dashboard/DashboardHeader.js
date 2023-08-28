import { SERVER_URL } from '@/utils/consts'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import TransactionModal from './TransactionModal'

const DashboardHeader = ({isModalOpen,setIsModalOpen, activeUser, token, uid }) => {
    const [user, setUser] = useState([])
    useEffect(() => {
        getActiveUser()
    }, [activeUser])

    const getActiveUser = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}users/${activeUser}`, { headers: { Authorization: `Bearer ${token}` } })
            if (res.data.data) {
                setUser(res.data.data)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong!")
        }
    }
    return (
        <div className="sm:px-7 sm:pt-7 px-4 pt-4 flex flex-col w-full border-b border-gray-200 bg-white dark:bg-gray-900 dark:text-white dark:border-gray-800 sticky top-0">
            {isModalOpen && <TransactionModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} token={token} uid={uid} user={user} />
            }          <div className="flex w-full items-center">
                <div className="flex items-center text-3xl text-gray-900 dark:text-white">
                    {user.firstName + " " + user.lastName}
                </div>
                <div className="ml-auto sm:flex hidden items-center justify-end">
                    <div className="text-right">
                        <div className="text-xs text-gray-400 dark:text-gray-400">Account balance:</div>
                        <div className="text-gray-900 text-lg dark:text-white flex items-center justify-evenly"> <Image width="60" height="60" className={"m-3"} src="/icon.png" />{user.balance}</div>
                    </div>
                   { activeUser!=uid && <button onClick={()=>setIsModalOpen(true)} className="ml-4 p-4 hover:bg-slate-600 font-bold text-white shadow  rounded-full flex items-center justify-center border border-gray-200 dark:border-gray-700">
                        Transfer tocos
                    </button>}
                </div>
            </div>
            <div className="flex items-center space-x-3 sm:mt-7 mt-4">
                <a href="#" className="px-3 border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white pb-1.5">Transactions</a>
            </div>
        </div>
    )
}

export default DashboardHeader