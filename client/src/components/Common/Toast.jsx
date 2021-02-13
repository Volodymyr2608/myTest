import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { clearMessage } from '../../store/actions/messageAction';

export const Toast = ({message}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    setTimeout(() => {
      if (message) dispatch(clearMessage());
    }, 4000);

  }, [message, dispatch]);

  return (<>
    <div className={`${!!message? 'visible animate-toast': 'invisible'}  min-w-40 -ml-4 bg-gray-800 text-white text-center rounded-2xl p-4 fixed z-10 top-8 right-4`}>
      <p className="max-w-sm">{message}</p>
    </div>
  </>)
}