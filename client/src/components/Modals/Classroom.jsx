import React from 'react'
import {Form, Field} from 'react-final-form'
import { useDispatch } from 'react-redux'
import { createClassroom } from '../../store/actions/classroomsAction'
import { hideModal } from '../../store/actions/modalAction'
import { composeValidators, maxLength, required } from '../../utils/validators'


export const Classroom = ({token}) => {
  const dispatch = useDispatch()

  const classroomSave = (values) => {

    dispatch(createClassroom({classroom: values, token}))
    dispatch(hideModal())
  }

  return (<>
    <Form
      onSubmit={classroomSave}
      render={({handleSubmit})=>(
                <form onSubmit={handleSubmit}>
                  <h4 className="py-4 text-2xl text-center font-semibold">Новий клас</h4>
                    <div className="grid gap-6 px-8 pb-8">
                      <Field name="parallel" validate={composeValidators(required("Паралель"), maxLength(6))}>
                        {({ input, meta }) => (
                          <div className="col-span-6 sm:col-span-4">
                            <label htmFor="parallel" className="block text-sm font-medium text-gray-700">Паралель</label>
                              <input 
                                {...input} 
                                type="text"  
                                id="parallel" 
                                className={`input ${meta.error && meta.touched ? 'border-red-500 focus:ring-red-400 focus:border-red-400': 'focus:ring-indigo-600 focus:border-indigo-600'}`}
                                />
                                {meta.error && meta.touched && <span className="absolute text-sm text-red-400">{meta.error}</span>}
                          </div>
                          )}
                      </Field>
                      <Field name="letter" validate={composeValidators(required("Літера"), maxLength(6))}>
                        {({ input, meta }) => (
                          <div className="col-span-6 sm:col-span-4">
                            <label htmFor="letter" className="block text-sm font-medium text-gray-700">Літера</label>
                            <input 
                              {...input} 
                              type="text" 
                              id="letter"
                              className={`input ${meta.error && meta.touched ? 'border-red-500 focus:ring-red-400 focus:border-red-400': 'focus:ring-indigo-600 focus:border-indigo-600'}`}
                              />
                              {meta.error && meta.touched && <span className="absolute text-sm text-red-400">{meta.error}</span>}
                            </div>
                        )}
                      </Field>
                    </div>

                    <div class="bg-gray-100 px-4 py-3 sm:px-6 sm:flex sm:justify-center">
                      <button type="submit" class="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-8 py-2 bg-green-500 text-base font-medium text-white hover:bg-green-600 focus:outline-none sm:ml-3 sm:w-auto sm:text-sm">
                        Створити
                      </button>
                      {/* <button onClick={handleCancel} type="button" class="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm">
                        Скасувати
                      </button> */}
                      
                    </div>
                </form>
              )}
              />
  
  </>)
}
