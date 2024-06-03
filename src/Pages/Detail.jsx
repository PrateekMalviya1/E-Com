import axios from 'axios'
import React, { useContext } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import Footer from '../Comman/Footer'
import Header from '../Comman/Header'
import { cartContext } from '../Context/MainContext'
import { MdOutlineStar } from "react-icons/md";
import { MdCurrencyRupee } from "react-icons/md";
import Card from '../Comman/Card'


export default function Detail() {
  let [item,setItem]=useState({})
  let [bImg,setBImg]=useState('')
  let [imgLen,setImgLen]=useState(0)
  let [status,setStatus]=useState(false)
  let [category,setCategory]=useState('')
  let [moreItem,setMoreItem]=useState([])
  let {id}=useParams()
  let {cart,setCart}=useContext(cartContext);
  function addToCart(){
    let obj={
        'img':item.thumbnail,
        'price':item.price,
        'name':item.title
    }
    let oldCart=[...cart,obj]
    setCart(oldCart)
}
  useEffect(()=>{
    axios.get(`https://dummyjson.com/products/${id}`)
    .then((res)=>setItem(res.data))
    .then(()=>setStatus(true))
     
    .then(()=>console.log(item)) 
    .then(()=>setImgLen(item.images ? item.images.length : 0))
    .then(()=>setCategory(item.category))
    .then(()=>more())
  
  },[id,imgLen,status,category])
  function more(){
    if (category != '') {
      let api=`https://dummyjson.com/products/category/${category}`
      console.log(category)
      axios.get(api)
      .then((res)=>setMoreItem(res.data.products))
      .then(()=>console.log(moreItem))
    }
  }

  return (
    <div>
      <header className='sticky top-0 z-[999] bg-white'>
          <Header/>
        </header>
      <div className='max-w-[1320px] mx-auto p-[5px_10px]'>
        <div className='grid lg:grid-cols-[60%_40%] grid-cols-1 justify-between'>
          <div className=' w-[90%] mx-auto p-[10px] '>
            <img src={(bImg==='')?item.thumbnail:bImg} className='shadow-lg mb-[15px] w-[100%]'/>

            {
              (imgLen>0)?
              <div className=' flex border-2 shadow-lg border-slate-700 rounded-md p-[5px] justify-around my-[10px]'>
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
          <div className='px-[10px]' >
            <h1 className='text-center xl:text-[40px] lg:text-[35px] md:text-[30px] text-[25px] pt-[10px] font-semibold'>
              {item.title}
            </h1>
            <div className='text-center text-slate-500 sm:text-[20] md:text-[25px]'>
              {item.brand}
            </div>
            <div className='py-[5px] flex gap-[5px]'>
              <div className='text-yellow-400 lg:text-[25px] sm:text-[20px] flex'>
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
                <MdOutlineStar />
              </div>
              <div className='text-slate-500'>
                {item.rating}
              </div>
            </div>
            <div className='flex items-end gap-2'>
              <div className='flex items-center xl:text-[35px] lg:text-[30px] md:text-[25px] text-[22px]'>
                <MdCurrencyRupee /> {item.price}
              </div>
              <div className='pb-[4px]'>
                 now {item.discountPercentage} %off
              </div>
            </div>
            <div className='text-slate-500 underline underline-offset-2 text-[16px] md:text-[18px]'>
              {item.warrantyInformation}
            </div>
            <div className='py-[3px_5px] text-[14px] md:text-[16px]'>
              {item.availabilityStatus} : Only {item.stock} Left
            </div>
            <div className='pt-[20px]'>
              <div className='text-[19px] md:text-[25px]'>
                Description
              </div>
              <p className='text-slate-500 md:text-[20px]'>
                {item.description}
              </p>
            </div>
            <div onClick={()=>addToCart()} className='w-[80%] mx-auto p-[5px_10px] my-[10px] rounded-full bg-slate-700 text-white text-center cursor-pointer'>
              Add to Cart
            </div>
            <div>

            </div>
            {/* <h1 className='text-center underline xl:text-[40px] lg:text-[35px] md:text-[30px] text-[25px] py-[10px] font-semibold'> 
              {item.title} 
            </h1>
            <div onClick={()=>addToCart()} className='w-[80%] mx-auto p-[5px_10px] rounded-full bg-slate-700 text-white text-center'>
              Add to Cart
            </div>
            <div className='sm:flex justify-around lg:text-[30px] text-[22px] py-[5px]'>
              <h2>
                Category : {item.category}
              </h2>
              <h2>
                Brand : {item.brand}
              </h2>
            </div>
            <div className='md:text-[25px] text-[20px] py-[8px]'>
              Price : {item.price}/only
            </div>
            <div className='text-[20px] py-[5px]'>
              Status : {item.availabilityStatus}
            </div>
            <div className='py-[5px] text-slate-600'>
              <span className='underline text-black py-[5px] text-[20px]'> Descripion </span>
              <p className='px-[5px]'>
                {item.description}
              </p>
            </div>
            <div className='py-[10px]'> 
              
              <div className='text-center underline lg:text-[30px] text-[22px] bg-yellow-400 m-[10px] rounded-lg'>
                {item.discountPercentage} % off
              </div>
              <div className='md:text-[25px] text-[20px]'>
                Warranty : {item.warrantyInformation}
              </div>
            </div> */}
          </div> 
        </div>
        <div>
          <div className='text-center lg:py-[20px] py-[10px] md:text-[30px] text-[20px] underline underline-offset-2' >
            More Products Like This
          </div>
          <div className='grid lg:grid-cols-3 grid-cols-2 gap-[20px] items-center'>
          {
            (moreItem.length>0)?
            moreItem.map((v,i)=>{
              return(
                <Card img={v.thumbnail} name={v.title} key={i} warranty={v.warrantyInformation} id={v.id} price={v.price}/>
              )
            }):''
          }
          </div>
          
        </div>
      </div> 
      <footer>
          <Footer/>
        </footer> 
    </div>
  )
}
