import React, {useState} from "react"
import {Form, Field} from 'react-final-form'
import { useDispatch, useSelector } from "react-redux";
import { saveTask, updateTask } from "../../store/actions/tasksAction";
import { updateTest } from "../../store/actions/testsAction";
import setFieldData from 'final-form-set-field-data'
import AutoSave from "./AutoSave";

export const Radio = ({task, testId, index}) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.userData.token)
  const answers = task.answers

  
  const createItem = () => {
    answers.push({"item": ''})
    dispatch(updateTask({
      task: {...task, answers},
      token
    }))
  } 

  const handleSave = (event) => {
    event.preventDefault()
    // dispatch(updateTask({stateRadio}))
  }

  const taskSave = () => {
    console.log('Hello')
  }

  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const save = async (values) => {
    console.log("Saving", values);
    await sleep(1000);
  };

  const SavingIndicator = ({ name }) => (
    <Field
      name={name}
      subscription={{ data: true }}
      render={({
        meta: {
          data: { saving }
        }
      }) => (saving ? <div className="saving">Saving</div> : null)}
    />
  )

  return (
    <>

      <Form
        onSubmit={save /* NOT USED, but required */}
        initialValues={{ employed: true, stooge: 'larry' }}
        mutators={{ setFieldData }}
        subscription={{} /* No need to subscribe to anything */}
          >
            {({ form }) => (
              <div className="form bg-white shadow rounded-md mb-6 px-6 py-4 border-t-4 border-indigo-500" key={task._id}>
                <AutoSave setFieldData={form.mutators.setFieldData} save={save} />
                <div><p className="text-lg">{index+1? `Завдання ${index+1} ` : <span className="text-red-700">Завдання не збережене! </span>}<span className='italic text-sm'>(Правильну відповідь оберіть)</span></p></div>
                  <div className="py-2">
                    <Field name={`question ${index+1} ${task._id}`}>
                          {({ input}) => (
                            <input 
                              {...input} 
                              type="text" 
                              placeholder="Напишіть запитання"  
                              className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
   
                            />
                          )}
                    </Field>
                    <SavingIndicator name={`question ${index+1} ${task._id}`} />
                  </div>
                  {task.answers.map(answer => (<>
                    <div className="py-2 flex justify-between items-center" key={answer._id}>
                      <Field name={`right ${task._id}`}>
                        {({ input}) => (
                          <input {...input} className="mr-2" type="radio" value={`answer ${answer._id}`}/>
                        )}  
                      </Field>
                      <SavingIndicator name={`right ${task._id}`} />
                      <Field name={`task ${task._id} answer ${answer._id}`}>
                        {({ input}) => (
                          <input 
                            {...input} 
                            type="text" 
                            placeholder="Ведіть варіант відповіді"  
                            className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          />
                        )}
                      </Field>
                      <SavingIndicator name={`task ${task._id} answer ${answer._id}`} />
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
      )}
    </Form>
    </>
    )
}