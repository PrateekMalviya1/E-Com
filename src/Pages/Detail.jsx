import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../Comman/Footer'
import Header from '../Comman/Header'

export default function Detail() {
  let [item,setItem]=useState({})
  let [bImg,setBImg]=useState('')
  let [imgLen,setImgLen]=useState(0)
  let [status,setStatus]=useState(false)
  let {id}=useParams()
  useEffect(()=>{
    axios.get(`https://dummyjson.com/products/${id}`)
    .then((res)=>setItem(res.data))
    .then(()=>setStatus(true))
     
    .then(()=>console.log(item)) 
    .then(()=>setImgLen(item.images ? item.images.length : 0))
  
  },[id,imgLen,status])
  return (
    <div>
      <header className='sticky top-0 bg-white'>
          <Header/>
        </header>
      <div className='max-w-[1320px] mx-auto p-[5px_10px]'>
        <div className='grid lg:grid-cols-2 grid-cols-1 justify-between'>
          <div className=' w-[90%] mx-auto p-[10px]'>
            <img src={(bImg==='')?item.thumbnail:bImg} className='shadow-lg mb-[15px] w-[100%]'/>

            {
              (imgLen>0)?
              <div className=' flex border-2 shadow-lg border-[#7b7b7b] p-[5px] justify-around my-[10px]'>
                <div>
                  <img src={item.images[0]} onClick={()=>setBImg(item.images[0])} className={(imgLen>=1)?'cursor-pointer border-2 w-[100px] h-[100px]':'w-0 h-0 absolute'} />
                </div>
                <div>
                  <img src={item.images[1]} onClick={()=>setBImg(item.images[1])} className={(imgLen>=2)?'cursor-pointer border-2 w-[100px] h-[100px]':'w-0 h-0 absolute'} />
                </div>
                <div>
                  <img src={item.images[2]} onClick={()=>setBImg(item.images[2])} className={(imgLen>=3)?'cursor-pointer border-2 w-[100px] h-[100px]':'w-0 h-0 absolute'} />
                </div>
                <div>
                  <img src={item.images[3]} onClick={()=>setBImg(item.images[3])} className={(imgLen>=4)?'cursor-pointer border-2 w-[100px] h-[100px]':'w-0 h-0 absolute'} />
                </div>
                <div>
                  <img src={item.images[4]} onClick={()=>setBImg(item.images[4])} className={(imgLen>=5)?'cursor-pointer border-2 w-[100px] h-[100px]':'w-0 h-0 absolute'} />
                </div>
              </div>
              :''

            }
            
          </div>
          <div >
            <h1 className='text-center underline xl:text-[40px] lg:text-[35px] md:text-[30px] text-[25px] py-[10px] font-semibold'> 
              {item.title} 
            </h1>
            <div className='sm:flex justify-around lg:text-[30px] text-[22px] py-[5px]'>
              <h2>
                Category : {item.category}
              </h2>
              <h2>
                Brand : {item.brand}
              </h2>
            </div>
            <div className='md:text-[25px] text-[20px] p-[8px]'>
              Price : {item.price}/only
            </div>
            <div className='text-[20px] p-[5px]'>
              Status : {item.availabilityStatus}
            </div>
            <div className='p-[5px] text-slate-600'>
              <span className='underline text-black py-[5px] text-[20px]'> Descripion </span><br />
              {item.description}
            </div>
            <div className='p-[10px]'> 
              
              <div className='text-center underline lg:text-[30px] text-[22px] bg-yellow-400 m-[10px] rounded-lg'>
                {item.discountPercentage} % off
              </div>
              <div className='md:text-[25px] text-[20px]'>
                Warranty : {item.warrantyInformation}
              </div>
            </div>
          </div>
        </div>
      </div> 
      <footer>
          <Footer/>
        </footer> 
    </div>
  )
}
