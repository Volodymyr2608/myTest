import React from 'react'
import {Form, Field} from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { hideModal } from '../../store/actions/modalAction'
import { createTest, updateTest } from '../../store/actions/testsAction'
import { composeValidators, maxLength, required } from '../../utils/validators'


export const Test = ({classId, test}) => {
  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.userData.token)

  const testSave = (values) => {
    values._id ? dispatch(updateTest({test: {...values, classId: classId.id}, token}))
    : dispatch(createTest({test: {...values, classId: classId.id, status: false}, token}))
    dispatch(hideModal())
  }

  return (<>
    <Form
      onSubmit={testSave}
      initialValues={test}
      render={({handleSubmit})=>(
                <form onSubmit={handleSubmit}>
                  <h4 className="py-4 text-2xl text-center font-semibold">Створити тест</h4>
                    <div className="grid gap-6 px-8 pb-8">
                    <Field name="topic" validate={composeValidators(required('Тема'), maxLength(40))}>
                      {({ input, meta }) => (
                        <div className="col-span-6 sm:col-span-4">
                          <label htmfor="topic" className="block text-sm font-medium text-gray-700">Тема</label>
                          <input 
                            {...input} 
                            type="text" 
                            placeholder="Ведіть тему тесту" 
                            id="topic" 
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
