import React from 'react'
import { NavLink } from 'react-router-dom'

export const Sidebar = ({ isOpen, showHandler }) => {

  const hideSidebar = () => {
    if (document.documentElement.clientWidth < 640) {
      showHandler()
    }
  }

  return (
    <>    
    <div className="z-40 xl:z-0 xl:fixed xl:h-full">
      <div className={`absolute xl:hidden  bg-black bg-opacity-75 transition-opacity ease duration-500 ${isOpen?'opacity-100 inset-0' : 'opacity-0'}`}
           aria-hidden="true"
           onClick={()=>showHandler()}
      ></div>

        <div className={`absolute inset-y-0 transform transition-width duration-500 easy ${isOpen?'translate-x-0 w-60' : '-translate-x-full w-20 xl:translate-x-0'}`}>
          <div className="h-full flex flex-col py-6 bg-indigo-600 shadow-xl p-4">
            <div className={`flex ${isOpen? 'justify-between': 'justify-center'} box-border h-8 text-2xl font-medium text-white`}>
              <span className={`${!isOpen? 'hidden' : ''}`}>myTest</span>
              <button onClick={()=>showHandler()} className="focus:outline-none">
                <svg className="h-7 w-7 xl:block hidden" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                <svg class="xl:hidden h-7 w-7" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
              </button>
            </div>
            <ul className='mt-4 text-lg' onClick={()=>hideSidebar()}>
              <li className=" text-indigo-300" >
                <NavLink to="/classes" className='flex w-full p-2 rounded-lg hover:bg-indigo-700 sidebar'>
                  <span>
                    <svg className={`h-7 w-7 transition-margin duration-500 easy ${isOpen? ' mr-4': 'mr-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </span>
                  <span className={`transition-opacity duration-300 ease-in ${!isOpen? 'hidden' : 'opacity-100'}`}>Класи</span>
                </NavLink>
              </li>
              <li className=" text-indigo-300">
                <NavLink to="/students" className='flex w-full p-2 rounded-lg hover:bg-indigo-700 sidebar'>
                  <span>
                    <svg className={`h-7 w-7 transition-margin duration-500 easy ${isOpen? ' mr-4': 'mr-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                    </svg>
                  </span>
                  <span className={`transition-opacity duration-300 ease-in ${!isOpen? 'hidden' : 'opacity-100'}`}>Учні</span>
                </NavLink>
              </li>
              <li className=" text-indigo-300">
                <NavLink to="/tests" className='flex w-full p-2 rounded-lg hover:bg-indigo-700 sidebar'>
                  <span>
                    <svg className={`h-7 w-7 transition-margin duration-500 easy ${isOpen? ' mr-4': 'mr-0'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                    </svg>
                  </span>
                  <span className={`transition-opacity duration-300 ease-in ${!isOpen? 'hidden' : 'opacity-100'}`}>Тести</span>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
    </div> 
    </>
  )
}