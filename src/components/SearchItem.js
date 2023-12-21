import React,{ memo, useState } from 'react'
import { FaAngleDown } from "react-icons/fa";
import { color } from '../utils/contants';

const SearchItem = ({name, activeClick, changeActiveClick, type = 'checkbox'}) => {

    const [selected, setSelected] = useState(0)


  return (
    <div onClick={()=>changeActiveClick(name)} 
    className='text-[12px] cursor-pointer p-3 border relative border-gray-800 flex items-center justify-between gap-6'>
        <span className='capitalize'>{name}</span>
        <FaAngleDown />
        {activeClick===name && 
        <div className='top-[104%] left-[-1px] w-fit absolute z-10 p-4 border bg-white min-w-[150px]'>
            {type === 'checkbox' && <div className=''>
                <div className='p-4 justify-between flex gap-8 border-b-[1px]'>
                    <span className='whitespace-nowrap'>{`${selected} selected`}</span> 
                    <span className='underline cursor-pointer'>Reset</span> 
                </div>
                <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                    {color.map((el, index)=>(
                        <div  key={index} className='flex items-center gap-2'>
                            <input type='checkbox' name={el} />
                            <label htmlFor={el} className='capitalize'>{el}</label>
                        </div>
                    ))}
                </div>
            </div>}
        </div>
        }
    </div>
  )
}

export default memo(SearchItem)