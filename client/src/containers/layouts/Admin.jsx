import React, { useState } from 'react'
import { Navbar } from '../../components/Common/Admin/Navbar'
import { Sidebar } from '../../components/Common/Admin/Sidebar'


export const Admin = ({children}) => {
    const [isOpen, setIsOpen] = useState(false)
    const showHandler = () => {
        setIsOpen(!isOpen)
    }

    return (
        <>
        <div className="flex">
            <Sidebar showHandler={showHandler} isOpen={isOpen}/>
            <div className={`${isOpen? 'xl:ml-60' : 'xl:ml-20'} ml-0 transition-margin duration-500 easy w-full h-full py-6 px-4`}>
                <Navbar showHandler={showHandler}/>
                {children}
            </div>
        </div>
        </>

    )
}