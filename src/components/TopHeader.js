import React, {memo, useEffect} from 'react'
import { Link } from 'react-router-dom'
import path from '../utils/path'
import { getUser } from '../store/user/asyncAction'
import { useDispatch, useSelector } from 'react-redux'
import { IoIosLogOut } from "react-icons/io";
import { logout } from '../store/user/userSlice'

const TopHeader = () => {

  const dispatch = useDispatch()
  const {isLoggedIn, current} = useSelector(state => state.user)

  useEffect(()=>{
    if(isLoggedIn){
      dispatch(getUser())
    }
  },[dispatch, isLoggedIn])

  return (
    <div className='h-[38px] w-full bg-main flex items-center justify-center'>
        <div className='w-main flex items-center justify-between text-xs text-white'>
            <span>ORDER ONLINE OR CALL US (+1800) 000 8808</span>
            {isLoggedIn ? 
            <div className='flex items-center gap-4 text-sm'>
              <span>{`Welcome, ${current?.firstname} ${current?.lastname}`}</span>
              <span onClick={()=>{dispatch(logout())}} className='hover:rounded-full hover:bg-gray-200 p-2 hover:text-main cursor-pointer'><IoIosLogOut size={18}/></span>
            </div> 
            : <Link className='hover:text-gray-800' to={`${path.LOGIN}`}>Sign In or Create Account</Link>}
        </div>
    </div>
  )
}

export default memo(TopHeader)