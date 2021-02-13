import React, { useEffect, useCallback, useState } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {ClassroomsTable} from '../../../components/Tables/ClassroomsTable'
import { showModal } from '../../../store/actions/modalAction';
import {fetchClassrooms} from '../../../store/actions/classroomsAction'
import { Loader } from '../../../components/Loader';
import { Modal } from '../../../components/Common/Admin/Modal';
import { Classroom } from '../../../components/Modals/Classroom';
import { Toast } from '../../../components/Common/Toast';



export const ClassroomsPage = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.message.message)
  const token = useSelector(state => state.auth.userData.token)
  const data = useSelector((state)=>state.classrooms.classrooms)
  const loading = useSelector(state => state.loader.isShow)
  const isShow = useSelector(state => state.modal.isShow)
  const [classroom, setClassroom] = useState(null)
  const clearForm = () => {
    setClassroom(null)
  }

  const handleModal = () => {
    dispatch(showModal())
  }

  const getClassrooms = useCallback(()=>{
    dispatch(fetchClassrooms({token}))
  }, [dispatch, token])


  useEffect(()=> {
    getClassrooms()
  }, [getClassrooms])


  if (loading) return <Loader/>

  return (
    <>
      <div className="flex justify-center sm:justify-between items-center bg-white shadow rounded-md mb-6 px-6 py-4">
        <div className="hidden sm:block ">
          <h3 className="text-xl">Створені класи</h3>
        </div>
        <div>
        <button onClick={handleModal} type="submit" class="group flex flex-grow justify-center items-center py-2 px-3 border border-transparent font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
          <span class="flex items-center">
            <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </span>
          <span className="ml-2">Додати клас</span>
        </button>
        </div>
      </div>

      {
        !data.length
        ? <div className="text-center text-2xl">Список класів порожній</div> 
        : <ClassroomsTable classrooms={data}/>
      }


      <Modal isShow={isShow} clearForm={clearForm}>
        <Classroom token={token}/>
      </Modal>
      <Toast message={message}/>

    </>
  )
}
