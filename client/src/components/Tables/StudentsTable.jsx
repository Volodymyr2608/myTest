import React, { useState } from 'react'
import { Modal } from '../Common/Admin/Modal';
import { Student } from '../Modals/Student';
import { useDispatch, useSelector } from 'react-redux';
import { showIsDelete, showModal } from '../../store/actions/modalAction';
import { Dropdown } from '../Common/Admin/Dropdown';
import { Confirm } from '../Modals/Confirm';

export const StudentsTable = ({students, classId}) => {
  const dispatch = useDispatch()
  const isShow = useSelector(state => state.modal.isShow)
  const isDelete = useSelector(state => state.modal.isDelete)
  const [student, setStudent] = useState(null)

  const handleModal = () => {
    dispatch(showModal())
  }

  const clearForm = () => {
    setStudent(null)
  }

  const handleEdit = (data = {}) => {
    handleModal()
    setStudent({...data})
  }
  const handleDelete = (data = {}) => {
    dispatch(showIsDelete())
    handleModal()
    setStudent({...data})
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
                            Учень
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Email
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                          <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Role
                          </th>
                          <th scope="col" class="relative px-6 py-3">
                            <span class="sr-only">Edit</span>
                          </th>
                        </tr>
                      </thead>
                      <tbody class="bg-white divide-y divide-gray-200">
                      {
                        !students.length
                        ? <tr><td class="px-6 py-4 whitespace-nowrap" colSpan='4'><div class="text-gray-900 text-center">Список учнів порожній</div></td></tr>
                        : students.map((item)=>
                          <tr key={item._id}>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="flex items-center">
                                <div class="flex-shrink-0 h-10 w-10">
                                  <img class="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt="" />
                                </div>
                                <div class="ml-4">
                                  <div class="text-sm font-medium text-gray-900">
                                    {item.lastname} {item.firstname}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <div class="text-sm text-gray-900">{item.email}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                              <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                Active
                              </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {item.role[0]}
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
        ? <Student classId={classId} student={student}/>
        : <Confirm document={student} documentType={'student'}/>
        }
      </Modal>

  
  </>)
}