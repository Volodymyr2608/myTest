import React, { useState } from 'react'
import {Link} from 'react-router-dom'
import { Modal } from '../Common/Admin/Modal';
import { Test } from '../Modals/Test';
import { useDispatch, useSelector } from 'react-redux';
import { showIsDelete, showModal } from '../../redux/actions/modalAction';
import { Dropdown } from '../Common/Admin/Dropdown';
import { Confirm } from '../Modals/Confirm';

export const TestsTable = ({tests, classId}) => {
  const dispatch = useDispatch()
  const isShow = useSelector(state => state.modal.isShow)
  const isDelete = useSelector(state => state.modal.isDelete)
  const [test, setTest] = useState(null)

  const handleModal = () => {
    dispatch(showModal())
  }

  const clearForm = () => {
    setTest(null)
  }

  const handleEdit = (data = {}) => {
    handleModal()
    setTest({...data})
  }
  const handleDelete = (data = {}) => {
    dispatch(showIsDelete())
    handleModal()
    setTest({...data})
  }


  return (<>
          <div className="flex flex-col relative">
              <div className="lg:flex justify-between items-center p-4">
                <div>Count </div>
                <div className="flex justify-between items-center">
 
                  <input type="text" name="search" id="search" placeholder="Пошук" autocomplete="given-name" class="focus:ring-indigo-500 mr-4 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"/>

                  <button onClick={handleModal} type="submit" className="group flex justify-center items-center w-40 py-2 px-3 border border-transparent lg:font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                    <span className="hidden">
                      <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                    </span>
                    <span className="ml-2">Створити</span>
                  </button>
                </div>
              </div>
                <div className="overflow-x-auto w-full">
                  <table class="divide-y divide-gray-200 w-full ">
                      <thead class="bg-gray-50">
                        <tr>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            №
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Тема
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Статус
                          </th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Open test</span>
                          </th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                      {
                        !tests.length
                        ? <tr><td class="px-6 py-4 whitespace-nowrap" colSpan='4'><div class="text-gray-900 text-center">Список тестів порожній</div></td></tr>
                        : tests.map((item, index)=>
                          <tr key={item._id}>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900">{index+1}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900">{item.topic}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              {
                                item.status
                                ? <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    Призначено
                                  </span> 
                                : <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                    Не призначено
                                  </span>
                              }

                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900">
                                <Link to={`/test/${item._id}`}>
                                  <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                </svg>
                                </Link>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <Dropdown document={item} handleEdit={handleEdit} handleDelete={handleDelete}/>
                            </td>
                          </tr>
                        )
                        }

                      </tbody>
                    </table>
                </div>
                
            </div>
      <Modal isShow={isShow} clearForm={clearForm}>
        {!isDelete
        ? <Test classId={classId} test={test}/>
        : <Confirm document={test} documentType={'test'}/>
        }
      </Modal>

  
  </>)
}