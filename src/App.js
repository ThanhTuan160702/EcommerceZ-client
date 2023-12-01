import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Public } from './pages/public/index'
import path from "./utils/path"
import { getCategories } from './store/asyncAction'

function App() {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getCategories())
  },[])
  return (
    <div className="min-h-screen font-main">
      <Routes>
        <Route path={path.PUBLIC} element={<Public/>}>
          <Route path={path.HOME} element={<Home />}/>
          <Route path={path.LOGIN} element={<Login />}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;