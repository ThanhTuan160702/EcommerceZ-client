import React,{memo, useEffect, useState} from 'react'
import { tabs } from '../utils/contants'

const ProductInformation = ({product}) => {

  const [idTabs, setIdTabs] = useState(1)

  return (
    <>
      <div className='flex gap-2 items-center relative bottom-[-1.2px]'>
        {tabs.map((el)=>(
          <span 
          onClick={()=>setIdTabs(el.id)} 
          key={el.id} 
          className={`px-4 py-3 border cursor-pointer ${el.id === idTabs ? 'bg-white border-b-0' : 'bg-gray-200'}`}>{el.title}</span>
        ))}
      </div>
      <div className='w-main border p-4'>
        {idTabs===1 && product?.description?.map((el, index)=>(
          <li key={index}>{el}</li>
        ))}
        {tabs.some(el => el.id === idTabs) && tabs.find(el => el.id === idTabs)?.content}
      </div>
    </>
  )
}

export default memo(ProductInformation)