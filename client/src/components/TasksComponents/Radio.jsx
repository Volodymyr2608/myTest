import React, {useState, useRef, useEffect} from "react"
import {Form, Field} from 'react-final-form'
import { useDispatch, useSelector } from "react-redux";
import { saveTask, updateTask } from "../../store/actions/tasksAction";
import { updateTest } from "../../store/actions/testsAction";


export const Radio = ({task, testId, index}) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.userData.token)
  
  // const answers = task.answers
  const [state, setState] = useState(task)

  useEffect(()=>{
    setState(task)
  }, [task])


  const createItem = () => {
    dispatch(updateTask({
      task: {...state, answers: [...state.answers, {"answer": ''}]},
      token
    }))
  }

  const changeHandler = ({target: {name, value}}) => {
    setState({...state, [name]: value})
  }

  const handleChangeAnswer = ({target: {name, value}}) => {
 
    setState(prevState => {
      return {
      ...prevState, answers: prevState.answers.map(item=>{
        if (item._id === name) {
          return {
            ...item,
            answer: value
          }
        }
        return item
      })
    }})
  }

  const handleOptionChange = (changeEvent) => {
    setState({
      ...state, right: changeEvent.target.value
    })
  }

  const taskSave = () => {
    dispatch(updateTask({
      task: {...state},
      token
    }))

  }

  return (
    <>
      <form>
              <div className="form bg-white shadow rounded-md mb-6 px-6 py-4 border-t-4 border-indigo-500" key={task._id}>

                <div><p className="text-lg">{index+1? `Завдання ${index+1}` : <span className="text-red-700">Завдання не збережене! </span>}<span className='italic text-sm'>(Правильну відповідь оберіть)</span></p></div>
                  <div className="py-2">
                    <input 
                      type="text" 
                      placeholder="Напишіть запитання"  
                      className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"   
                      value={state.question}
                      name="question"
                      onChange={changeHandler}
                      onBlur={taskSave}
                      />
                  </div>
                  {state.answers.map(answer => (<>
                    <div className="py-2 flex justify-between items-center" key={answer._id}>
                      <input 
                        type={task.type} 
                        placeholder="Ведіть варіант відповіді"  
                        className="mr-2"
                        name={`right`}
                        value={`${answer._id}`}
                        onChange={handleOptionChange}
                        onBlur={taskSave}
                      />
                      <input 
                        type="text" 
                        placeholder="Ведіть варіант відповіді"  
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        name={`${answer._id}`}
                        value={answer.answer}
                        onChange={handleChangeAnswer}
                        onBlur={taskSave}
                      />
                    </div>
                  </>)
                    
                  )}
                  <div className="py-2 flex items-center">
                    <input className="mr-2" id="item1" value="answerOne" type="radio" disabled/>
                    <div className="mt-1 py-2 px-3 border-b  sm:text-sm" onClick={createItem}>
                      <span className="text-gray-500">Додати варіант</span>
                    </div>
                  </div>
                </div>
      </form>




    {/* <Form
      onSubmit={taskSave}
      render={({handleSubmit})=>(
        <form onSubmit={handleSubmit}>
              <div className="form bg-white shadow rounded-md mb-6 px-6 py-4 border-t-4 border-indigo-500" key={task._id}>

                <div><p className="text-lg">{index+1? `Завдання ${index+1}` : <span className="text-red-700">Завдання не збережене! </span>}<span className='italic text-sm'>(Правильну відповідь оберіть)</span></p></div>
                  <div className="py-2">
                    <Field name={`question`}>
                          {({ input}) => (
                            <input 
                              {...input} 
                              type="text" 
                              placeholder="Напишіть запитання"  
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              onBlur={handleSubmit}
                            />
                          )}
                    </Field>
                    
                  </div>
                  {task.answers.map(answer => (<>
                    <div className="py-2 flex justify-between items-center" key={answer._id}>
                      <Field name={`right`} component="input" type={task.type} onBlur={handleSubmit} value={`${answer._id}`} className="mr-2" /> 

                      
                      <Field name={`${answer._id}`}>
                        {({ input}) => (
                          <input 
                            {...input} 
                            type="text" 
                            placeholder="Ведіть варіант відповіді"  
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                            onBlur={handleSubmit}
                          />
                        )}
                      </Field>
                      
                    </div>
                    </>)  
                  )}
                  <div className="py-2 flex items-center">
                    <input className="mr-2" id="item1" value="answerOne" type="radio" disabled/>
                    <div className="mt-1 py-2 px-3 border-b border-gray-300 border shadow-sm sm:text-sm rounded-md w-full" onClick={createItem}>
                      <span className="text-gray-500">Додати варіант</span>
                    </div>
                  </div>

        </div>
        </form>
              )}
              /> */}
    </>
    )
}