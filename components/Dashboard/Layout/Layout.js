import Image from 'next/image'
import React from 'react'

function Layout({children}) {
  return (
      <div className="bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-600 h-screen flex overflow-hidden text-sm">
          <div className="bg-white dark:bg-gray-900 dark:border-gray-800 w-20 flex-shrink-0 border-r border-gray-200 flex-col hidden sm:flex">
              <div className="h-16 text-blue-500 flex items-center justify-center">
                  <Image src="/toco.svg" width="56" height="56" />
              </div>
              <div className="flex mx-auto flex-grow mt-4 flex-col text-gray-400 space-y-4">
                  <button className="h-10 w-12 dark:bg-gray-700 dark:text-white rounded-md flex items-center justify-center bg-blue-100 text-blue-500">
                      <svg viewBox="0 0 24 24" className="h-5" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round">
                          <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                      </svg>
                  </button>
              </div>
          </div>
          {children}
        </div>
  )
}

export default Layout