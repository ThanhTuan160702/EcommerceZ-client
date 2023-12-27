import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom'
import { Login, Home, Public,FAQ,DetailProduct,Blogs,Service,Products,FinalRegister,ResetPassword } from './pages/public/index'
import { AdminLayout, CreateProduct, Dashboard, ManageOrder, ManageProduct, ManageUser } from './pages/admin/index'
import { MemberLayout, Personal } from './pages/member/index'
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
          <Route path={path.ALL} element={<Home />}/>
        </Route>
        <Route path={path.ADMIN} element={<AdminLayout/>}>
          <Route path={path.DASHBOARD} element={<Dashboard />}/>
          <Route path={path.CREATE_PRODUCT} element={<CreateProduct />}/>
          <Route path={path.MANAGE_ORDER} element={<ManageOrder />}/>
          <Route path={path.MANAGE_PRODUCT} element={<ManageProduct />}/>
          <Route path={path.MANAGE_USER} element={<ManageUser />}/>
        </Route>
        <Route path={path.MEMBER} element={<MemberLayout/>}>
          <Route path={path.PERSONAL} element={<Personal />}/>
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
