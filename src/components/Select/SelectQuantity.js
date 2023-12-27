import React,{memo} from 'react'

const SelectQuantity = ({quantity, handleQuantity, handleChangeQuantity}) => {
  return (
    <div className='flex items-center'>
        <button onClick={()=>handleChangeQuantity('-')} className='py-1 cursor-pointer px-2 border border-black'>
          -
        </button>
        {/*<span onClick={()=>handleChangeQuantity('-')} className='py-1 cursor-pointer px-2 border border-black'>-</span>*/}
        <input className='py-1 px-2 outline-none w-[40px] text-center border-y border-black' type='text' value={quantity} onChange={e => handleQuantity(e.target.value)}/>
        <button onClick={()=>handleChangeQuantity('+')} className='py-1 cursor-pointer px-2 border border-black'>
          +
        </button>
    </div>
  )
}

export default memo(SelectQuantity)