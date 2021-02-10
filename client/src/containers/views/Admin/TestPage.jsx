import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { updateTest } from '../../../redux/actions/testsAction'
export const TestPage = () => {
  const dispatch = useDispatch()
  const id = useParams()
  const token = useSelector(state => state.auth.userData.token)
  const loading = useSelector(state => state.loader.isShow)
  const tests = useSelector(state => state.classroom.classroom.tests)
  const test = tests.find((item)=>item._id === id.id)
  
  const appointTest = () => {
    test.status = !test.status
    dispatch(updateTest({test: {...test}, token}))
  }

  if (loading) return <Loader/>

  return (<>
      <div className="flex justify-center sm:justify-between items-center bg-white shadow rounded-md mb-6 px-6 py-4">
        <div className="hidden sm:block ">
          <h3 className="text-xl">Сторення завдань</h3>
        </div>
        <div>
        <button onClick={appointTest} type="submit" class={`${test.status? 'bg-gray-600 hover:bg-gray-700' :'bg-green-600 hover:bg-green-700'} group flex flex-grow justify-center items-center py-2 px-3 border border-transparent font-medium rounded-md text-white  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500`}>
          <span className="ml-2">{test.status? 'Скасувати завдання' :'Призначити'}</span>
        </button>
        </div>
      </div>

      
  </>)
}