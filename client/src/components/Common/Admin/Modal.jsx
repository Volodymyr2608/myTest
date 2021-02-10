import { Transition } from '@headlessui/react'
import React from 'react'
import { useDispatch } from 'react-redux'

import { hideISDelete, hideModal } from '../../../redux/actions/modalAction'

export const Modal = ({isShow, children, clearForm}) => {

  const dispatch = useDispatch()
  
  const handleCancel = () => {
    dispatch(hideModal())
    dispatch(hideISDelete())
    clearForm()

  }
  return (<>
      <Transition show={isShow}>
      <div class="fixed z-10 inset-0 overflow-y-auto">
        <div class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:p-0">
          <Transition.Child
            enter="ease-in-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div onClick={handleCancel} class="fixed inset-0 transition-opacity" aria-hidden="true">
              <div class="absolute inset-0 bg-black opacity-75"></div>
            </div>
          </Transition.Child>


          <Transition.Child
            enter="ease-out duration-300"
            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enterTo="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            className="w-96"
          >
            <div class=" bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">
              <div class="bg-white">
                {children}
              </div>
            </div>
          </Transition.Child>

        </div>
      </div>
      </Transition>
  
  </>)
}