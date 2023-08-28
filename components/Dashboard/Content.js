import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import Users from './Users'
import DashboardHeader from './DashboardHeader'
import Layout from './Layout/Layout'
import Transactions from './Transactions'
import { useDispatch } from 'react-redux'
import { logout } from '@/features/auth/authSlice'
import { useRouter } from 'next/router'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SERVER_URL } from '@/utils/consts'

function Content({ user }) {
    const dispatch = useDispatch()
    const router = useRouter()
    const [activeUser, setActiveUser] = useState(user._id)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [connectedUser, setConnectedUser] = useState(user)

    useEffect(() => {
        updateConnectedUser()
    }, [isModalOpen])

    const updateConnectedUser = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}users/${user._id}`, { headers: { Authorization: `Bearer ${user.token}` } })
            if (res.data.data) {
                setConnectedUser(res.data.data)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong!")
        }
    }

    return (
        <Layout >

            <div className="flex-grow overflow-hidden h-full flex flex-col">
                <div className="h-16 lg:flex w-full border-b border-gray-200 dark:border-gray-800 hidden px-10">
                    <div className="flex h-full text-gray-600 dark:text-gray-400">
                        <a href="#" className="cursor-pointer h-full border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-white inline-flex mr-8 items-center">Currency Exchange</a>
                    </div>
                    <div class="ml-auto flex items-center space-x-7">
                        <button class="h-11 px-3 flex items-center justify-evenly rounded-md shadow text-white bg-blue-500"><Image src="/icon.png" width="30" height="30" />{connectedUser.balance}</button>
                        <button class="flex items-center">
                            <span class="relative flex-shrink-0">
                                <img class="w-7 h-7 rounded-full" src="/avatar.png" alt="profile" />
                                <span class="absolute right-0 -mb-0.5 bottom-0 w-2 h-2 rounded-full bg-green-500 border border-white dark:border-gray-900"></span>
                            </span>
                            <span onClick={() => setActiveUser(user._id)} class="ml-2">{user.firstName} {user.lastName}</span>
                            <Image onClick={() => { dispatch(logout()); router.push('/login') }} src="/logout.png" width="25" height="25" className=" m-3" />
                        </button>
                    </div>
                </div>
                <div className="flex-grow flex overflow-x-hidden">
                    <Users token={user.token} setActiveUser={setActiveUser} activeUser={activeUser} />
                    <div className="flex-grow bg-white dark:bg-gray-900 overflow-y-auto">
                        <DashboardHeader
                            isModalOpen={isModalOpen}
                            setIsModalOpen={setIsModalOpen}
                            activeUser={activeUser}
                            token={user.token}
                            uid={user._id} />

                        <div className="sm:p-7 p-4">
                            <div className="flex w-full items-center mb-7">


                            </div>
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="text-gray-400">
                                        <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Sender</th>
                                        <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Receiver</th>
                                        <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Amount</th>
                                        <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800">Description</th>
                                        <th className="font-normal px-3 pt-0 pb-3 border-b border-gray-200 dark:border-gray-800 sm:text-gray-400 text-white">Date</th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-600 dark:text-gray-100">

                                    <Transactions
                                        token={user.token}
                                        activeUser={activeUser}
                                        uid={user._id}
                                        isModalOpen={isModalOpen} />
                                </tbody>

                            </table>

                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Content