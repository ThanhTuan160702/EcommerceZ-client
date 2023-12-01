import React, { useState } from 'react'
import { formatPrice } from '../utils/helper'
import Image from '../assets/newProduct-removebg-preview.png'
import Image1 from '../assets/bestseller-removebg-preview.png'
import { renderStar } from '../utils/helper'
import {SelectOption} from '../components/index'
import { FaEye } from "react-icons/fa";
import { MdOutlineMenu } from "react-icons/md";
import { FaHeart } from "react-icons/fa";

const Product = ({productData, activedTab}) => {

  const [isShow, setIsShow] = useState(false)

  return (
    <div className='w-full text-base px-[10px]'>
      <div className='w-full border p-[15px]' 
      onMouseEnter={e => {
        e.stopPropagation()
        setIsShow(true)
      }}
      onMouseLeave={e => {
        e.stopPropagation()
        setIsShow(false)
      }}
      >
        <div className='w-full relative flex flex-col items-center'>
          {isShow && <div className='absolute bottom-[-10px] left-0 right-0 flex justify-center gap-2 animate-slide-top'>
              <SelectOption icons={<FaHeart/>}/>
              <SelectOption icons={<MdOutlineMenu/>}/>
              <SelectOption icons={<FaEye/>}/>
          </div>}
          <img src={productData.images[0]} alt='images' className='w-[243px] h-[243px] object-cover'/>
          <img src={activedTab === 1 ? Image1 : Image} alt='images' className={`${activedTab === 1 ? "w-[80px]" : "w-[120px]"} absolute top-[-25px] right-[-15px]`}/>
        </div>
        <div className='flex flex-col gap-1 mt-[15px] items-start w-full'>
          <span className='flex'>{renderStar(productData?.totalRatings)}</span>
          <span className='line-clamp-1'>{productData.title}</span>
          <span>{`${formatPrice(productData.price)} VND`}</span>
        </div>
      </div>
    </div>
  )
}

export default Product