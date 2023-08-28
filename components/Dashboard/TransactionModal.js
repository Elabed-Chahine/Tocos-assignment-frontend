import React, { useState } from 'react'
import Modal from '../Widgets/Modal'
import Image from 'next/image'
import axios from 'axios'
import { toast } from 'react-toastify'
import { SERVER_URL } from '@/utils/consts'

function TransactionModal({ isModalOpen, setIsModalOpen, token, uid, user }) {
    const [toTransfer, setToTransfer] = useState()
    const makeTransaction = async () => {
        try {
            const res = await axios.post(`${SERVER_URL}transactions`, { sender: uid, receiver: user._id, transferredTocos: toTransfer }, { headers: { Authorization: `Bearer ${token}` } })
            if (res.data.data) {
                setIsModalOpen(false)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message || "Something went wrong with your transaction!")
        }
    }
    return (
        <Modal title="Make a transaction" isModalOpen={isModalOpen} handleClose={() => setIsModalOpen(false)}>
            <div className="flex items-center flex-col justify-center">
                <button onClick={() =>makeTransaction()}className="bg-black rounded-full p-8 m-4 border-2 border-transparent hover:border-blue-500">  <Image src="/toco.svg" width="36" height="36" /></button>
                <input type="text" placeholder='Tocos to transfer' className="px-6 focus:outline-none py-3 rounded-xl border border-gray-500 text-gray-500" value={toTransfer} onChange={(e) => setToTransfer(e.target.value)} />
                <h1 className=" text-gray-500 font-semibold mt-2">Click on Toco to Transfer to <span className="font-bold text-green-700">{user.firstName}</span> </h1>
            </div>
        </Modal>
    )
}

export default TransactionModal