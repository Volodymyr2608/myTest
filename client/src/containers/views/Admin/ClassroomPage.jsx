import React, {useState, useEffect, useCallback} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useParams } from "react-router-dom"
import { Loader } from '../../../components/Loader';
import { fetchClassroom } from '../../../redux/actions/classroomAction'
import { StudentsTable } from '../../../components/Tables/StudentsTable';
import { TestsTable } from '../../../components/Tables/TestsTable';
import { Toast } from '../../../components/Common/Toast';



export const ClassroomPage = (props) => {
  const id = useParams()
  const dispatch = useDispatch()
  const message = useSelector(state => state.message.message)
  const token = useSelector(state => state.auth.userData.token)
  const [tab, setTab] = useState(1)

  const toggleTab = (index) => {
    setTab(index)
  }

  const loading = useSelector(state => state.loader.isShow)
  const {parallel, letter, students, tests} = useSelector(state => state.classroom.classroom)


  const getClassroom = useCallback(()=>{
    dispatch(fetchClassroom({classId: id.id, token}))
  }, [dispatch, id, token])


  useEffect(()=> {
    getClassroom()
  }, [getClassroom])


  if (loading) return <Loader/>

  return (
    <>

      <div className="bg-white shadow sm:rounded-lg w-full">
        <div className="px-4 py-5 sm:px-6 border-b border-gray-200">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Клас: {parallel}-{letter}
            </h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Кількість учнів: {students.length}
            </p>
            <p className="mt-1 max-w-2xl text-sm text-gray-500">
              Кількість тестів: {tests.length}
            </p>
        </div>
        <div className="lg:flex">
          <div className="py-5 w-full lg:w-40 lg:border-r border-gray-200">
            <ul className='text-lg flex justify-between text-center lg:text-left lg:flex-col'>
              <li onClick={()=>toggleTab(1)} className={`${tab===1? 'border-b-4 lg:border-b-0 lg:border-l-4 border-indigo-500': 'lg:border-l-4 border-transparent border-b-4'} w-full px-4 py-2 transition easy duration-500 hover:bg-gray-300 cursor-pointer`}>
                  Учні
              </li>
              <li onClick={()=>toggleTab(2)} className={`${tab===2? 'border-b-4 lg:border-b-0 lg:border-l-4 border-indigo-500': 'lg:border-l-4 border-transparent border-b-4'} w-full px-4 py-2 transition easy-in duration-500 hover:bg-gray-300 cursor-pointer`}>
                Тести
              </li>
            </ul>
          </div>
          <div className="w-full">
            <div className="transition-all">
              {tab === 1 && <StudentsTable students={students} classId={id}/>}
              {tab === 2 && <TestsTable tests={tests} classId={id}/>}
            </div>

          </div>
        </div>
      </div>

      <Toast message={message}/>

      {/* {
        !tests.length
        ? <div className="text-center mt-10 text-2xl">Список тестів порожній</div>
        : <AppointTestTable tests={tests} handleEditOpen={handleEditOpen} handleDeleteOpen={handleDeleteOpen}/>
      } */}

    </>
  )
}

