import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Public,FAQ,DetailProduct,Blogs,Service,Products,FinalRegister,ResetPassword } from './pages/public/index'
import path from "./utils/path"
import { getCategories } from './store/app/asyncAction'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
          <Route path={path.BLOGS} element={<Blogs />}/>
          <Route path={path.DETAIL_PRODUCT_CATEGORY_PID_TITLE} element={<DetailProduct />}/>
          <Route path={path.FQA} element={<FAQ />}/>
          <Route path={path.OUR_SERVICES} element={<Service />}/>
          <Route path={path.PRODUCTS} element={<Products />}/>
        </Route>
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />}/>
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />}/>
        <Route path={path.LOGIN} element={<Login />}/>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
