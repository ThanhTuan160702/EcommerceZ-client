import React, {useState, useCallback} from 'react'
import { InputFill, Button } from '../../components/index'
import { apiRegister, apiLogin, apiForgot } from '../../apis/user'
import { useNavigate, Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import {loggedin} from '../../store/user/userSlice'
import { useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import path from '../../utils/path'

const Login = () => {

  const dispatch = useDispatch()

  const [payload, setPayload] = useState({
    lastname: '',
    firstname: '',
    email: '',
    password: '',
    passwordConfirm: ''
  })

  const resetPayload = () => {
    setPayload({
      lastname: '',
      firstname: '',
      email: '',
      password: '',
      passwordConfirm: ''
    })
  }

  const [register, setRegister] = useState(false)
  const [isForgot, setIsForgot] = useState(false)
  const [email, setEmail] = useState('')

  const navigation = useNavigate()

  const handleForgot = async() => {
      const response = await apiForgot({email})
      console.log(response)
      if(response?.success){
        toast.success(response?.mes)
      }else{
        toast.error(response?.mes)
      }
  }

  const handleSubmit = useCallback(async()=>{
      const { lastname, firstname, passwordConfirm, ...data } = payload
      if(register){
        if(data.password === passwordConfirm){
          const reponse = await apiRegister(payload)
          if(reponse?.success){
            Swal.fire('Congratulation',reponse?.mes,'success').then(()=>{
              setRegister(false)
              resetPayload()
            })
          }else{
            Swal.fire('Oops!',reponse?.mes,'error')
          }
        }else{
          Swal.fire('Oops!','Password Mismatch Error','error')
        }
      }else{
        const login = await apiLogin(data)
        if(login?.success){
          Swal.fire('Congratulation','Logged in successfully','success').then(()=>{
            dispatch(loggedin({isLoggedIn: true,token: login.accessToken, userData: login.userData}))
            navigation('/')
          })
        }else{
          Swal.fire('Oops!',login?.mes,'error')
        }
      }
  },[payload,register])

  return (
    <div className='w-screen h-screen relative'>
      <img 
      src='https://images.unsplash.com/photo-1500053857731-701d06fac2fa?q=80&w=1864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' 
      alt='images'
      className='w-full h-full object-cover'
      />
      {isForgot && <div className='bottom-0 top-0 left-0 right-0 flex absolute items-center justify-center z-50'>
        <div className='p-8 bg-white rounded-md min-w-[500px] flex flex-col min-h-[310px] gap-10'>
          <h1 className='text-[30px] font-bold text-gray-900 justify-center flex items-center'>Quên mật khẩu</h1>
          <label htmlFor='email'>Enter your email:</label>
          <input type='text' id='email'className='pb-2 border-b outline-none'placeholder='email' value={email} onChange={e=>setEmail(e.target.value)}/>
          <div className='flex justify-end gap-2'>
            <Button name='Submit' handleOnClick={handleForgot}/>
            <Button name='Close' handleOnClick={()=>{setIsForgot(false)}}/>
        </div>
        </div>
      </div>}
      <div className='bottom-0 top-0 left-0 right-0 flex absolute items-center justify-center'>
        <div className='p-8 bg-opacity rounded-md min-w-[500px]'>
          <h1 className='text-[30px] font-bold text-black justify-center flex items-center'>{register ? "Đăng ký" : "Đăng nhập "}</h1>
          {register && 
          <div className='flex items-center gap-2'>
            <InputFill
            value={payload.firstname}
            setValue={setPayload}
            nameKey='firstname'
            placeholder='First name'
            />
            <InputFill
            value={payload.lastname}
            setValue={setPayload}
            nameKey='lastname'
            placeholder='Last name'
            />
          </div>
          }
          <InputFill
          value={payload.email}
          setValue={setPayload}
          nameKey='email'
          placeholder='Email'
          />
          <InputFill
          type='password'
          value={payload.password}
          setValue={setPayload}
          nameKey='password'
          placeholder='Password'
          />
          {register && <InputFill
          type='password'
          value={payload.passwordConfirm}
          setValue={setPayload}
          nameKey='passwordConfirm'
          placeholder='Password Confirm'
          />}
          <Button 
          name={register ? 'Register' : 'Login'}
          style='w-full bg-blue-500 rounded-md text-white h-[40px] mt-2'
          handleOnClick={handleSubmit} 
          />
          <div className='mt-4'>
            <div className='justify-between flex'>
              <span className='cursor-pointer hover:underline' onClick={()=>{setIsForgot(true)}}>{!register ? 'Forgot your account ?' :''}</span>
              {!register && <span className='cursor-pointer hover:underline' onClick={()=> {setRegister(true); resetPayload()}}>Create account</span>}
              </div>  
              {register && <span className='cursor-pointer hover:underline justify-center items-center flex' onClick={()=> {setRegister(false); resetPayload()}}>Go login</span>}
          </div>
          {!register && <Link className='flex justify-center cursor-pointer hover:underline' to={`/${path.HOME}`}>Go Home</Link>}
        </div>
      </div>
    </div>
  )
} 

export default Login