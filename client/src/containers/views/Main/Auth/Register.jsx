import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Form, Field } from 'react-final-form'
import {composeValidators, required, maxLength, email, minLength} from '../../../../utils/validators'
import { createUser } from '../../../../store/actions/authAction'
import { Link } from 'react-router-dom'
import {Toast} from '../../../../components/Common/Toast'

export const Register = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.message.message)
  const registerUser = (values) => {
    dispatch(createUser(values))
  }
  return (
    <>
      <div>
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Реєстрація
        </h2>
      </div>
        <Form
          onSubmit={registerUser}
          render={({handleSubmit})=>(
          <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
              <Field name="lastname" validate={composeValidators(required('Прізвище'), maxLength(20))}>
                {({ input, meta }) => (
                  <div className="col-span-6 sm:col-span-4">
                  <label htmfor="last_name" className="block text-sm font-medium text-gray-700">Прізвище</label>
                  <input 
                    {...input} 
                    type="text" 
                    placeholder="Ведіть прізвище" 
                    id="last_name" 
                    className={`input ${meta.error && meta.touched ? 'border-red-500 focus:ring-red-400 focus:border-red-400': 'focus:ring-indigo-600 focus:border-indigo-600'}`}
                  />
                    {meta.error && meta.touched && <span className="absolute text-sm text-red-400">{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="firstname" validate={composeValidators(required("Ім'я"), maxLength(20))}>
                {({ input, meta }) => (
                  <div className="col-span-6 sm:col-span-4">
                    <label htmfor="first_name" className="block text-sm font-medium text-gray-700">Ім'я</label>
                    <input 
                      {...input} 
                      type="text" 
                      placeholder="Ведіть ім'я" 
                      id="first_name" 
                      className={`input ${meta.error && meta.touched ? 'border-red-500 focus:ring-red-400 focus:border-red-400': 'focus:ring-indigo-600 focus:border-indigo-600'}`}
                    />
                      {meta.error && meta.touched && <span className="absolute text-sm text-red-400">{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="email" validate={composeValidators(required("Email"), email)}>
                {({ input, meta }) => (
                  <div className="col-span-6 sm:col-span-4">
                    <label htmfor="email" className="block text-sm font-medium text-gray-700">Email</label>
                      <input 
                        {...input} 
                        type="email" 
                        placeholder="Ведіть email" 
                        id="email" 
                        className={`input ${meta.error && meta.touched ? 'border-red-500 focus:ring-red-400 focus:border-red-400': 'focus:ring-indigo-600 focus:border-indigo-600'}`}
                      />
                        {meta.error && meta.touched && <span className="absolute text-sm text-red-400">{meta.error}</span>}
                  </div>
                )}
              </Field>
              <Field name="password" validate={composeValidators(required("Пароль"), minLength(8))}>
                {({ input, meta }) => (
                  <div className="col-span-6 sm:col-span-4">
                    <label htmfor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
                    <input 
                      {...input} 
                      type="password" 
                      placeholder="Ведіть пароль" 
                      id="password" 
                      className={`input ${meta.error && meta.touched ? 'border-red-500 focus:ring-red-400 focus:border-red-400': 'focus:ring-indigo-600 focus:border-indigo-600'}`}
                    />
                      {meta.error && meta.touched && <span className="absolute text-sm text-red-400">{meta.error}</span>}
                  </div>
                )}
              </Field>
            </div>
            <div className="mt-5">
              <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                  Реєстрація
              </button>
            </div>
            <div className="text-center text-sm mt-2">
              <p>Уже є обліковий запис? <span className="font-medium text-indigo-600 hover:text-indigo-500">
                <Link to="/">Увійти</Link></span> </p>
            </div>
          </form>
        )}/>
      <Toast message={message}/>
    </>
  )
}
