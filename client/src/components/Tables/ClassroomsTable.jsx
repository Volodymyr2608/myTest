import { Link } from "react-router-dom";
import classRoomImg from '../../img/classroom.jpg'

export const ClassroomsTable = ({classrooms}) => {
  return (
    <div className="grid grid-cols-1 gap-12 px-4 justify-items-center grid-flow-row sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
      { classrooms.map((cls)=>  (
        <div className="shadow font-medium bg-white rounded-2xl w-80 sm:w-auto" key={cls._id}>
          <div className="relative">
            <img className="rounded-t-2xl" src={classRoomImg} alt="" />
            <button className="absolute right-4 top-4 focus:outline-none" >
              <svg className="text-white w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
            </button>
            <div className="title absolute bottom-4 left-4 text-white text-2xl">
              {cls.parallel} - {cls.letter}
            </div>
          </div>
        <div className="action p-4 text-center ">
          <Link
            className="hover:text-blue-500 p-2 rounded-md"
            to={`/classroom/${cls._id}`}
          >
            Перейти до класу
          </Link>
        </div>
      </div>
      ))}
    </div>
  )
}