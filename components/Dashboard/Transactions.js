import { SERVER_URL } from '@/utils/consts'
import { mongoDBDateToYMDHMS } from '@/utils/functions'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

function Transactions({token,activeUser,uid,isModalOpen}) {
    const [transactions, setTransactions] = useState([])
    useEffect(() => {
        if(activeUser!==uid) getOurTransactions()
        console.log(transactions);
    }, [activeUser,isModalOpen])

    const getOurTransactions = async () => {
        try {
            const res = await axios.get(`${SERVER_URL}transactions/${activeUser}`, { headers: { Authorization: `Bearer ${token}` } })
            if (res.data.data) {
                setTransactions(res.data.data)
            }
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.message||"Something went wrong")
        }
    }
  return transactions.length>0 && transactions.map((transaction,index)=>
    (
      <tr key={index}>
          <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                  
                  {transaction.sender.firstName + " " + transaction.sender.lastName}
              </div>
          </td>
          <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                  
                  {transaction.receiver.firstName + " " + transaction.receiver.lastName}
              </div>
          </td>
          <td className={`sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800 ${(uid == transaction.receiver._id) ? "text-green-800" : "text-red-500"}`}>{(uid == transaction.receiver._id) ?"+":"-"}{transaction.transferredTocos}</td>
          <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">{transaction.description}</td>
          <td className="sm:p-3 py-2 px-1 border-b border-gray-200 dark:border-gray-800">
              <div className="flex items-center">
                  <div className="sm:flex hidden flex-col">
                      {mongoDBDateToYMDHMS(transaction.createdAt).split(" ")[0]}
                      <div className="text-gray-400 text-xs">{mongoDBDateToYMDHMS(transaction.createdAt).split(" ")[1]}</div>
                  </div>
                  
              </div>
          </td>
      </tr>
  ))
}

export default Transactions