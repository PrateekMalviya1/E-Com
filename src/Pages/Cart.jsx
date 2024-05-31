import React, { useContext, useEffect, useState } from 'react'
import Footer from '../Comman/Footer'
import Header from '../Comman/Header'
import { cartContext } from '../Context/MainContext'

export default function Cart() {
    let {cart,setCart}=useContext(cartContext)
    let item=JSON.parse(localStorage.getItem('cart'))
    let arr=[...cart]

    
    function del(i){
        arr.splice(i,1)
        setCart(arr)
    }
    useEffect(()=>{
        item=JSON.parse(localStorage.getItem('cart'))
    },[cart])
  return (
    <div>
        <header className='bg-white mb-[10px] sticky top-0'>
            <Header/>
        </header>
        <section className='max-w-[1320px] mx-auto p-[10px]'>
            {
                (cart.length>0)?
                    <div className='flex justify-around items-center my-[10px] text-center bg-slate-800 rounded-md underline text-white text-[20px] py-[5px]'>
                        <div>
                            IMAGE
                        </div>
                        <div>
                            NAME
                        </div>
                        <div>
                            ACTION
                        </div>
                    </div>
                :''
            }
            {
                (cart.length>0)?
                    cart.map((v,i)=>{
                        return(
                            <div className='flex justify-around items-center my-[10px]' key={i}>
                                <div>
                                    <img src={v.img} alt=""  className='sm:w-[150px] sm:h-[100px] w-[90px] h-[90px] rounded-md border' />
                                </div>
                                <div className='text-center md:text-[25px]'>
                                    <span className='underline'> {v.name} </span><br />
                                    <hr />
                                    Price : {v.price}
                                </div>
                                <div>   
                                    <button onClick={()=>del(i)} className='bg-red-500 text-white p-[3px_5px] rounded-md text-[10px] sm:text-[16px]'>
                                        Delete
                                    </button>
                                </div>
                            </div>
                        )
                    }):
                    <div className='text-center font-semibold py-[30px] border border-black hover:scale-75 rounded-md'> 
                        NO DATA IN CART
                    </div>
            }
        </section>
        <footer className= {(cart.length>3)?'w-[100%]':'fixed bottom-0 w-[100%]'}>
          <Footer/>
        </footer>
    </div>
  )
}
