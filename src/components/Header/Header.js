import React from 'react'
import { MdPhoneCallback } from "react-icons/md";
import { IoIosMail } from "react-icons/io";
import { FaUserCircle } from "react-icons/fa";
import { BsBagCheckFill } from "react-icons/bs";
import { Link } from 'react-router-dom'
import path from '../../utils/path'
import { useSelector } from 'react-redux';

const Header = () => {

  const { current } = useSelector(state => state.user)
  console.log(current)
  
  return (
    <div className='flex justify-between w-main h-[110px] py-[35px]'>
       <Link to={`/${path.HOME}`}>
       <div className='cursor-pointer w-[234px]'>
          <span>Shop</span>
          <span className='text-main font-semibold'> ThanhTuan</span>
        </div>
       </Link>
       <div className='flex text-[13px]'>
          <div className='flex flex-col items-center border-r-2 px-6'>
            <span className='flex items-content gap-4'>
              <MdPhoneCallback color='red' size={15}/>
              <span className='font-semibold'>(+1800) 000 8808</span>
            </span>
            <span>Mon-Sat 9:00AM - 8:00PM</span>
          </div>
          <div className='flex flex-col px-6 items-center border-r-2'>
            <span className='flex items-content gap-4'>
              <IoIosMail color='red' size={15}/>
              <span className='font-semibold'>SUPPORT@GMAIL.COM</span>
            </span>
            <span>Online Support 24/7</span>
          </div>
          <div className='flex border-r-2 px-6 gap-2 items-center justify-center cursor-pointer'>
            <span><BsBagCheckFill color='red' /></span>
            <span>0 item(s)</span>
          </div>
          <Link to={+current?.role === 6666 ? `/${path.MEMBER}/${path.PERSONAL}` : `/${path.ADMIN}/${path.DASHBOARD}`} className='flex items-center justify-center px-6 gap-2 cursor-pointer'>
            <FaUserCircle color='red' size={24}/>
            <span>Profile</span>
          </Link>
       </div>
    </div>
  )
}

export default Header