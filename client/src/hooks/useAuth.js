import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import {authUser, storageName} from '../store/actions/authAction'

export const useAuth = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(storageName))

    if (data && data.token) {
      dispatch(authUser(data))
    }
  }, [dispatch])
}