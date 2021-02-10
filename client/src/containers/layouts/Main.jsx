import React from 'react'


export const Main = ({ children }) => {

    return (
        <>
        <div className="flex justify-between">
            <div className="min-h-screen flex justify-center items-center bg-gray-300 w-8/12 max-w-full h-screen">
                <div className="text-center text-3xl">
                    <h1>Заставка 1</h1>
                </div>
            </div>
            
            <div className="min-h-screen w-4/12 flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    {children}
                </div>
            </div>
        </div>
        </>
    )
}