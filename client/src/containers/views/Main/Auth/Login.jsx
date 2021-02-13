import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Form, Field } from 'react-final-form'
import {composeValidators, required, email, minLength} from '../../../../utils/validators'
import { loginUser } from '../../../../store/actions/authAction'
import { Link } from 'react-router-dom'
import {Toast} from '../../../../components/Common/Toast'


export const Login = () => {
  const dispatch = useDispatch()
  const message = useSelector(state => state.message.message)
  const login = (values) => {
    dispatch(loginUser(values))
  }


  return (
    <>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Ласкаво просимо до myTest
        </h2>
        <p className="mt-3 text-center text-gray-900">Будь-ласка увійдіть або зареєструйтеся для створення або проходження тесту</p>
      </div>
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          Увійти
        </h2>
      </div>
            <Form
              onSubmit={login}
              render={({handleSubmit})=>(
                <form onSubmit={handleSubmit}>
                    <div className="grid gap-4">
                      <Field name="email" validate={composeValidators(required("Email"), email)}>
                        {({ input, meta }) => (
                          <div className="col-span-6 sm:col-span-4">
                            <label htmFor="email" className="block text-sm font-medium text-gray-700">Email</label>
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
                            <label htmFor="password" className="block text-sm font-medium text-gray-700">Пароль</label>
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
                    <div className="flex items-center justify-between my-5">
                        <div className="flex items-center">
                          <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
                          <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">
                            Remember me
                          </label>
                        </div>

                        <div className="text-sm">
                          <a href="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Забули пароль?
                          </a>
                        </div>
                    </div>

                    <div>
                      <button type="submit" className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                          Увійти
                      </button>
                      
                    </div>
                    <div className="text-center text-sm mt-2">
                        <p>Вперше в системі? <span className="font-medium text-indigo-600 hover:text-indigo-500">
                          <Link to="/register">Зареєструватись</Link></span> </p>
                    </div>

                </form>
              )}
            />
        <Toast message={message}/>
    </>
  )
}
