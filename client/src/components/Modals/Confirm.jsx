import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { hideISDelete, hideModal } from '../../store/actions/modalAction'
import { deleteStudent } from '../../store/actions/studentAction'
import { deleteTest } from '../../store/actions/testsAction'
export const Confirm = ({document, documentType}) => {

  const dispatch = useDispatch()
  const token = useSelector(state => state.auth.userData.token)
  const {_id, classId} = document

  const clearState = () =>{
    dispatch(hideModal())
    dispatch(hideISDelete())
  }

  const handleDelete = () => {
    switch (documentType) {
      case 'student':
        dispatch(deleteStudent({_id, classId, token}))
        break;
      case 'test':
        dispatch(deleteTest({_id, classId, token}))
        break;
      default:
        break;
    }

    clearState()
  }
  return (<>
  <div className="p-6">
    <div className="pb-4">
      <h3 className="text-center text-3xl ">Підтвердити видалення</h3>
    </div>

    <div>
      <div className="pt-4 flex justify-around items-center">
        <button
          className="px-4 py-2  bg-gray-300 hover:bg-gray-400 rounded focus:outline-none"
          onClick={clearState}
        >
          Скасувати
        </button>
        <button
          className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white rounded focus:outline-none"
          onClick={handleDelete}
        >
          Видалити
        </button>
      </div>
    </div>
    </div>
  </>)
}