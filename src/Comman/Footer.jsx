import React from 'react'
import logo from '../Images/logo.png'

export default function Footer() {
  return (
    <div className='py-[10px] md:py-[20px] bg-slate-700 mt-[10px]'>
      <div className='mt-[3px] md:mt-[10px] flex bg-white justify-around items-center '>
        <div>
          <img src={logo} className='sm:w-[100px] sm:h-[100px] w-[70px] h-[70px]' />
        </div>
        <div>
          <p className='md:text-[30px] sm:text-[25px] text-[20px] underline underline-offset-4'> <i>Contect </i> </p>
          <ul className='md:text-[25px] sm:text-[20px] text-[16px] sm:ps-[10px] md:ps-[20px]'>
            <li> malviyaprateek93@gmail.com </li>
            <li> +91 8769302--- </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
