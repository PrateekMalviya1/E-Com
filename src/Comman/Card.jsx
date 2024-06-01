import React, { useContext } from 'react'
import { PiShoppingCartLight } from "react-icons/pi";
import { Link } from 'react-router-dom';
import { cartContext } from '../Context/MainContext';
import { MdCurrencyRupee } from "react-icons/md";

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
        <div className='shadow-lg border border-slate-700 rounded-lg'>
            <Link to={`/Detail/${props.id}`}>
          <div className='w-[100%] hover:scale-105 '>
            <img src={props.img} alt="" className='w-[100%] rounded-lg' />
          </div>
          <div className='text-center font-semibold py-[3px] w-[100%] text-[13px] sm:text-[16px] md:text-[19px] lg:text-[22px]'>
              <i>
                {props.name}
              </i>
          </div>
          <div className='py-[5px] flex justify-center relative w-[100%]'>
            <div className='w-[100%] absolute top-[50%] translate-y-[-50%] border border-slate-700'></div>
            <div className='text-[15px] sm:text-[18px] md:text-[21px] lg:text-[24px] flex items-center bg-slate-700 text-white z-[9] p-[5px] rounded-full'>
                <MdCurrencyRupee/> {props.price} /-
            </div>
          </div>
          <div className='text-slate-700 text-center py-[3px] text-[13px] sm:text-[16px] md:text-[19px] lg:text-[22px]'>
            {props.warranty}
          </div>
            </Link>
          <div onClick={()=>addToCart()} className='cursor-pointer w-[100%] py-[3px] bg-slate-700 rounded-b-lg text-[16px] sm:text-[19px] md:text-[22px] lg:text-[25px] text-white text-center font-semibold '>
              <div className='hover:scale-105'>
                Add to Cart
              </div>
          </div>
        </div>
    // <div className=' hover:scale-105'>
    //     <div className='bg-slate-700 rounded border border-[#c9c8c8] lg:p-[10px] p-[5px]'>
    //         <div className='bg-slate-700'>
    //             <Link to={`/Detail/${props.id}`}>
    //                 <img src={props.img} alt="" className='bg-slate-700 w-[100%] mx-auto m-1'/>
    //             </Link>
    //         </div>
    //         <div className='bg-white p-[2px] rounded-md '>
    //             <div className='lg:text-[20px] text-[16px] font-semibold text-center'>
    //                 {props.name}
    //             </div>
    //             <div className='text-[14px] md:text-[16px] flex justify-between pt-[10px]'>
    //                 <div>
    //                     {props.warranty}
    //                 </div>
    //                 <div className='flex items-center'>
    //                     <MdCurrencyRupee/> {props.price} /-
    //                 </div>
    //             </div>
    //             <div className='flex justify-between border border-t-2 mt-[5px] p-[5px]'>
    //                 <div>
    //                     <Link to={`/Detail/${props.id}`}>
    //                     Detail..
    //                     </Link>
    //                 </div>
    //                 <div onClick={()=>addToCart()} className='flex gap-[5px] rounded p-[3px_10px] items-center group hover:bg-[#6e6efa]'>
    //                     <PiShoppingCartLight className='group-hover:text-[white] font-semibold'/>
    //                     <div className='group-hover:text-white'>Cart</div>
    //                 </div>
    //             </div>
    //         </div>
    //     </div>
    // </div>
  )
}
