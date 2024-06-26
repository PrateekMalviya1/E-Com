import React, { useContext, useEffect, useState } from 'react'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { BsCart4 } from "react-icons/bs";
import { Link } from 'react-router-dom';
import logo from '../Images/logo.png'
import { GoEye } from "react-icons/go";
import { app } from '../FireBase/Fire';
import { MdLogin } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { cartContext } from '../Context/MainContext';

export default function Header() {
    let {userMailC,setUserMailC}=useContext(cartContext)
    let userMail=JSON.parse(localStorage.getItem('user'))??'';
    let [userStatus,setUserStatus]=useState(userMail)
    let [pass,setPass]=useState(false)
    let [form,setForm]=useState(false)
    let [upIn,setUpIn]=useState(true)
    let [signInEmail,setSignInEmail]=useState('')
    let [signInPass,setSignInPass]=useState('')
    let [signUpEmail,setSignUpEmail]=useState('')
    let [signUpPass,setSignUpPass]=useState('')
    let [signUpMsg,setSignUpMsg]=useState('')
    let [signInMasg,setSignInMsg]=useState('')
    function deluser(){
        localStorage.setItem('user',JSON.stringify(''))
        setUserStatus('')
        setUserMailC('')
    }
    function signUpFun(){
        const auth = getAuth(app);
        createUserWithEmailAndPassword(auth, signUpEmail, signUpPass)
        .then((userCredential) => {
            // Signed up 
        const user = userCredential.user;
        setSignUpMsg('Account is Created')

            // ...
        })
        .then(()=>{
            setSignUpEmail('');
            setSignUpPass('');
            setForm(!form)
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setSignUpMsg('retry user Exist / password length is more than 7 charecter')

        // ..
        });
    }
    function signInFun(){
        const auth = getAuth(app);
        signInWithEmailAndPassword(auth, signInEmail, signInPass)
        .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        localStorage.setItem('user',JSON.stringify(user.email));
        setUserStatus(user.email)
        setSignInMsg('')
        setUserMailC(user.email)
        // ...
        })
        .then(()=>{
            setSignInEmail('');
            setSignInPass('');
            setForm(!form)
        })
        .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setSignInMsg('Some thing wrong Try Again')
        });
    }
    
  return (
    <div className='px-[10px] z-[99] sm:px-[20px] md:px-[30px] shadow-lg'>
        {/* Login form  (form)?'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white border px-[10px]' : */}
        <div className={(form)?'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white shadow-lg rounded-lg border px-[10px] scale-100 transition duration-300'
        :
        'fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-white border px-[10px] scale-0 transition duration-300'}>
            <div className='absolute right-[5px] top-[-10px] text-[30px] cursor-pointer' onClick={()=>setForm(!form)}>
                &times;
            </div>
            {
                (upIn)?
                <div>
                    <h1 className='text-[30px] font-serif text-center underline p-[10px] '> Sign In </h1>
                    <div className='text-[16px]'> Email </div>
                    <input type="email" className='border border-slate-700 w-[300px] py-[4px]' name="" value={signInEmail} onChange={(e)=>setSignInEmail(e.target.value)} />
                    <div className='text-[16px]'> PassWord </div>
                    <div className='relative'>
                        <input type={(pass)?'text':'password'} value={signInPass} onChange={(e)=>setSignInPass(e.target.value)} className='border border-slate-700 w-[300px] py-[4px]' />
                        <div className='absolute right-2 top-[10px] cursor-pointer' onClick={()=>setPass(!pass)}>
                            <GoEye />
                        </div>
                    </div>
                    <div onClick={()=>signInFun()} className='w-[90%] mx-auto pt-[15px]'>
                        <button className='text-center w-[100%] bg-blue-500 hover:bg-blue-600 rounded text-white p-[2px_5px]'>
                            Sign In 
                        </button>
                    </div>
                    <div className='text-red-500 text-[9px] text-center'>
                        {signInMasg}
                    </div>
                    <div onClick={()=>setUpIn(!upIn)} className='text-end py-[10px] underline cursor-pointer hover:text-blue-600'>
                        Sign Up
                    </div>
                </div>
                :
                <div>
                    <h1 className='text-[30px] font-serif text-center underline p-[10px] '> Sign Up </h1>
                    <div className='text-[16px]'> Email </div>
                    <input type="email" className='border border-slate-700 w-[300px] py-[4px]' name="" value={signUpEmail} onChange={(e)=>setSignUpEmail(e.target.value)} />
                    <div className='text-[16px]'> Set PassWord </div>
                    <div className='relative'>
                        <input type={(pass)?'text':'password'} value={signUpPass} onChange={(e)=>setSignUpPass(e.target.value)} className='border border-slate-700 w-[300px] py-[4px]' />
                        <div className='absolute right-2 top-[10px] cursor-pointer' onClick={()=>setPass(!pass)}>
                            <GoEye />
                        </div>
                    </div>
                    <div onClick={()=>signUpFun()} className='w-[90%] mx-auto pt-[15px]'>
                        <button className='text-center w-[100%] bg-blue-500 hover:bg-blue-600 rounded text-white p-[2px_5px]'>
                            Create Account
                        </button>
                    </div>
                    <div className='text-red-500 text-[9px] text-center'>
                        {signUpMsg}
                    </div>
                    <div onClick={()=>setUpIn(!upIn)} className='text-end py-[10px] underline cursor-pointer hover:text-blue-600'>
                        Sign In
                    </div>
                </div>
            }
            
        </div>
        {/* Header */}
        <div className='max-w-[1320px] mx-auto'>
            <div className='flex justify-between items-center'>
                <div>
                    <Link to={'/'}>
                        <img src={logo} alt="Logo.." className='lg:w-[110px] lg:h-[110px] md:w-[100px] md:h-[100px] sm:w-[75px] sm:h-[75px] w-[65px] h-[65px] hover:scale-90'/>
                    </Link>
                </div>
                <div className='xl:text-[30px] md:text-[23px] sm:text-[19px] '>
                    <ul className='flex justify-between items-center lg:gap-[40px] sm:gap-[30px] gap-[20px]'>
                        {
                            (userStatus==='')?
                            <li className='flex justify-between items-center gap-1 md:gap-2 underline hover:scale-95 hover:text-slate-700 cursor-pointer' onClick={()=>setForm(!form)} >
                                <MdLogin  className='text-[22px] xl:text-[30px] md:text-[23px] sm:text-[19px]'/> <span className='hidden sm:block'>Login </span>
                            </li>
                            :
                            <li className='flex justify-between items-center gap-1 md:gap-2 underline hover:scale-95 hover:text-slate-700 cursor-pointer' onClick={()=>deluser()} >
                                <MdLogout className='text-[22px] xl:text-[30px] md:text-[23px] sm:text-[19px]' /><span className='hidden sm:block'> Log Out </span>
                            </li>

                        }
                        
                        <li>
                            <Link to={'/cart'} className='flex underline gap-1 md:gap-2 items-center hover:scale-95 hover:text-slate-700'>
                                <BsCart4  className='text-[22px] xl:text-[30px] md:text-[23px] sm:text-[19px]'/>
                                <span className='hidden sm:block'> Cart </span>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
  )
}
