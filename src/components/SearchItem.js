import React,{ memo, useEffect, useState } from 'react'
import { FaAngleDown } from "react-icons/fa";
import { color } from '../utils/contants';
import { createSearchParams, useNavigate} from 'react-router-dom';
import path from '../utils/path';

const SearchItem = ({category ,name, activeClick, changeActiveClick, type = 'checkbox'}) => {

    const [selected, setSelected] = useState([])
    const navigate = useNavigate()
    const handleSelected = (e) =>{
        const alreadyEl = selected.find(el => el === e)
        if(alreadyEl){
            setSelected(prev => prev.filter(el=> el!==e))
        }else{
            setSelected(prev => [...prev, e])
        }
    }

    useEffect(()=>{
        if(selected.length > 0){
            navigate({
                pathname: `/${category}`,
                search: createSearchParams({
                    color: selected.join(',')
                }).toString()
            })
        }else{
            navigate(`/${category}`)
        }
    },[selected])
    
  return (
    <div onClick={()=>changeActiveClick(name)} 
    className='text-[12px] cursor-pointer p-3 border relative border-gray-800 flex items-center justify-between gap-6'>
        <span className='capitalize'>{name}</span>
        <FaAngleDown />
        {activeClick===name && 
        <div className='top-[104%] left-[-1px] w-fit absolute z-10 p-4 border bg-white min-w-[150px]'>
            {type === 'checkbox' && <div className=''>
                <div className='p-4 justify-between flex gap-8 border-b-[1px]'>
                    <span className='whitespace-nowrap'>{`${selected.length} selected`}</span> 
                    <span onClick={e => {e.stopPropagation(); setSelected([])}} className='underline cursor-pointer'>Reset</span> 
                </div>
                <div onClick={e => e.stopPropagation()} className='flex flex-col gap-3 mt-4'>
                    {color.map((el, index)=>(
                        <div  key={index} className='flex items-center gap-2'>
                            <input 
                            type='checkbox' 
                            value={el} 
                            onChange={()=>handleSelected(el)} 
                            id={el} 
                            checked={selected.some(selectedItem => selectedItem === el)}
                            />
                            <label htmlFor={el} className='capitalize'>{el}</label>
                        </div>
                    ))}
                </div>
            </div>}
            {type === 'input' && <div>
                <div className='p-4 justify-between flex gap-8'>
                    <input onClick={e => e.stopPropagation()} type='number' className='border flex'></input>
                    <input onClick={e => e.stopPropagation()} type='number' className='border flex'></input>
                </div>
            </div>}
        </div>
        }
    </div>
  )
}

export default memo(SearchItem)