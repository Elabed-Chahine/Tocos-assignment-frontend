import React, { useState } from 'react'
import Image from 'next/image'
import LoginForm from './LoginForm'
function Content() {
    return (
        <div className="h-screen flex  flex-col md:flex-row">

            <div
                className="relative overflow-hidden flex items-center justify-evenly align-baseline h-1/3 md:h-full w-full  md:flex md:w-1/2 bg-gradient-to-tr from-blue-800 to-purple-700 i md:justify-around md:items-center ">
                <div>
                    <Image src="/toco.svg" width={95} height={75} />
                    <Image src="/verified.svg" className="mt-6" width={355} height={265} />
                    <a href="https://www.tocos.org/toco-for-me" className="block w-28 bg-white text-indigo-800 mt-4 py-2 px-2 text-center rounded-2xl font-bold mb-2">Read More</a>
                </div>
                <div className="hidden lg:flex absolute -bottom-32 -left-40 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="hidden lg:flex absolute -bottom-40 -left-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="hidden lg:flex absolute -top-40 -right-0 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
                <div className="hidden lg:flex absolute -top-20 -right-20 w-80 h-80 border-4 rounded-full border-opacity-30 border-t-8"></div>
            </div>
            <LoginForm />
        </div>
    )
}

export default Content