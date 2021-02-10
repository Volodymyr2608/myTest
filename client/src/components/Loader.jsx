import React from 'react'
import {useSelector} from 'react-redux'
export const Loader = () => {
  // const isShow = useSelector(state => state.loader.isShow)
  return (
    <>
    <div className="flex justify-center">
      <div className="loader px-4 inline-block relative">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div></div>
    </>
  )
}