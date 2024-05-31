import React, { useContext } from 'react'
import { PiShoppingCartLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/MainContext';

export default function Card(props) {
    let {cart,setCart}=useContext(cartContext);
    function addToCart(){
        let obj={
            'img':props.img,
            'price':props.price,
            'name':props.name
        }
        let oldCart=[...cart,obj]
        setCart(oldCart)
    }
  return (
    <div className=' hover:scale-105'>
        <div className='bg-slate-700 rounded border border-[#c9c8c8] lg:p-[10px] p-[5px]'>
            <div className='bg-slate-700'>
                <Link to={`/Detail/${props.id}`}>
                    <img src={props.img} alt="" className='bg-slate-700 w-[100%] mx-auto m-1'/>
                </Link>
            </div>
            <div className='bg-white p-[2px] rounded-md '>
                <div className='lg:text-[20px] text-[18px] font-semibold text-center'>
                    {props.name}
                </div>
                <div className='flex underline justify-between pt-[10px]'>
                    <div>
                        {props.warranty}
                    </div>
                    <div>
                        Price: {props.price}
                    </div>
                </div>
                <div className='flex justify-between border border-t-2 mt-[5px] p-[5px]'>
                    <div>
                        <Link to={`/Detail/${props.id}`}>
                        Detail..
                        </Link>
                    </div>
                    <div onClick={()=>addToCart()} className='flex gap-[5px] rounded p-[3px_10px] items-center group hover:bg-[#6e6efa]'>
                        <PiShoppingCartLight className='group-hover:text-[white] font-semibold'/>
                        <div className='group-hover:text-white'>Cart</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}
