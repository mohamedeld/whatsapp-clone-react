import React from 'react'
import getTimeAgo from '../../utils/getTimeStamp'
import DeleteIcon from '../../svgandicons/svg/DeleteIcon'

export default function QuestionItem({item}) {
  return (
    
      <div className='relative flex flex-col justify-center items-center mx-5'>
        <div className='w-full md:w-3/6 px-10 py-8 my-5 dark:bg-white rounded'>
          <div className='absolute top-10 left-5 cursor-pointer'>
            <DeleteIcon className="fill-red-500"/>
          </div>
          <h2 className='font-bold font-xl my-2'>{item.title}</h2>
          <p className=''>{item.description}</p>
          <div className="flex justify-between items-center">
            <div className="flex justify-start items-center gap-3 mt-3">
              <img src={item?.user?.picture ? `${item?.user?.picture}`: "/profile.png" } alt="user image" className="w-10 h-10 object-cover rounded-full"/>
              <p>{item?.user?.name}</p>
            </div>
            <p>{getTimeAgo(item.updatedAt)}</p>
          </div>
        </div>
      </div>
  )
}
