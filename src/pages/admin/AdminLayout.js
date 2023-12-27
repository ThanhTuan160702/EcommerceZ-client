import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
import path from '../../utils/path'
import { useSelector } from 'react-redux'

const MemberLayout = () => {
  const { isLoggedIn, current, role } = useSelector(state => state.user)
  if(!isLoggedIn || !current || +current.role !== 9999) return <Navigate to={`/${path.LOGIN}`} replace={true} />


  return (
    <div>
      <div>AdminLayout</div>
      <div>
        <Outlet />
      </div>
    </div>
  )
}

export default MemberLayout