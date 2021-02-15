import React, { useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Loader } from '../../../components/Loader'
import { updateTest } from '../../../store/actions/testsAction'
import { createTask, fetchTasks } from '../../../store/actions/tasksAction'
import {Form, Field} from 'react-final-form'
import {Radio} from '../../../components/TasksComponents/Radio'

export const TestPage = () => {
  const dispatch = useDispatch()
  const id = useParams()
  const token = useSelector(state => state.auth.userData.token)
  const loading = useSelector(state => state.loader.isShow)
  const {parallel, letter, tests} = useSelector(state => state.classroom.classroom)
  const test = tests.find((item)=>item._id === id.id)

  const tasks = useSelector(state => state.tasks.tasks)
  const task = useSelector(state => state.tasks.task)
  
  const createTaskRadio = () => {
    dispatch(createTask({
      task: {question: "", answers: [{"answer": ""}], right: "", type: "radio", testId: id.id},
      token
    }))
  }
  // const createTaskCheckbox = () => {
  //   dispatch(createTask({...checkbox, testId: id.id}))
  // }

  const getTasks = useCallback(()=>{
    dispatch(fetchTasks({testId: id.id, token}))
  }, [dispatch, id, token])


  const appointTest = () => {
    test.status = !test.status
    dispatch(updateTest({test: {...test}, token}))
  }

  const renderComponent = (task, index) => {
    console.log('render Task', task)
    switch (task.type) {
      case 'radio':
        return <Radio testId={id} task={task} index={index}/>
      // case 'checkbox':
      //   return <Checkbox testId={id} data={item} key={item._id} index={index}/>
      default:
        break;
    }
  }

  const taskSave = (values) => {
    console.log(values)
  }

  useEffect(()=> {
    getTasks()
  }, [getTasks])


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
      
      {/* <div className="flex justify-evenly text-2xl py-6">
        <div><span><b>Тема:</b></span> <span>{test.topic}</span></div>
        <div><span><b>Клас:</b></span> <span>{classroom.parallel}-{classroom.letter}</span></div>
      </div> */}
      <div className='py-1 rounded-md shadow bg-white border-gray-200 border fixed'>
          <ul className=''>
            <li className=' hover:bg-gray-200'><button className="focus:outline-none w-full p-2" onClick={createTaskRadio}>Одна відповідь</button></li>
            <li className=' hover:bg-gray-200'><button className="focus:outline-none w-full p-2" >Декілька відповідей</button></li>
          </ul>
        </div>
      <div className="flex justify-arround mt-10 mx-auto max-w-4xl">



          <div className="max-w-xl w-full mx-auto" id="createTest" >
            {
              !tasks.length
              ? <p className="text-center text-xl">Виберіть тип завдання</p>
              : tasks.map((task, index)=>renderComponent(task, index))
            }

      </div></div>
      
  </>)
}