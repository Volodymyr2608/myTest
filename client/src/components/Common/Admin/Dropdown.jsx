import { Menu, Transition } from '@headlessui/react'
import React from 'react'


export const Dropdown = ({document, handleEdit, handleDelete}) => {

  const editDocument = () => {
    handleEdit(document)
  }
  const deleteDocument = () => {
    handleDelete(document)
  }

  return (<>
 
    <div class="inline-block text-left">
      <Menu>
        {({ open }) => (
          <>
            <Menu.Button as={React.Fragment}>
              <button className="focus:outline-none">
                <svg className="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </Menu.Button>


            <Transition
              show={open}
              enter="transition duration-100 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              
              <div class="origin-top-right absolute right-0 w-30 z-40 rounded-md shadow-xl bg-white border-gray-200 border">
                <div class="py-1 " role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                  <Menu.Items static className="focus:outline-none">
                    <Menu.Item>
                      <button onClick={editDocument} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                        </svg>
                        <span>Редагувати</span>
                      </button>
                    </Menu.Item>
                    <Menu.Item>
                      <button onClick={deleteDocument} className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100 hover:text-gray-900" role="menuitem">
                        <svg className="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Видалити</span>
                      </button>
                    </Menu.Item>
                  </Menu.Items>
                </div>
              </div>

            </Transition>
          </>
        )}
      </Menu>
    </div>
  </>)
}