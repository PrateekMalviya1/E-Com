import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Card from '../Comman/Card'
import { CiFilter } from "react-icons/ci";
import Header from '../Comman/Header'
import banner from '../Images/E-Com_Banner1.jpg'
import Footer from '../Comman/Footer';

export default function Home() {
  let userName=JSON.parse(localStorage.getItem('user'))??''
  let [user,setUser]=useState(userName)
  let [product,setProduct]=useState([])
  let [CategoryList,setCategoryList]=useState([])
  let [CategoryButtonStatus,setCategoryButtonStatus]=useState(false)
  let [sortBtnStatus,setSortBtnStatus]=useState(false)
  let [categoryName,setCategoryName]=useState('')
  let [filterBtn,setFilterBtn]=useState(false)
  function ProductCall(){
    let api
    if(categoryName===''){
      api='https://dummyjson.com/products'
    }
    else{
      api=categoryName
    }
    axios.get(api)
    .then((res)=>setProduct(res.data.products))
  }
  function CategoryCall(){
    axios.get('https://dummyjson.com/products/categories')
    .then((res)=>setCategoryList(res.data))
  }
  function sortA(){
    setProduct(product.sort((a,b)=>a.price-b.price))
  }
  function sortD(){
    setProduct(product.sort((a,b)=>b.price-a.price))
  }
  useEffect(()=>{
    ProductCall()
    CategoryCall();
    setUser(JSON.parse(localStorage.getItem('user')))
  },[categoryName])
  return (
    <div>
      {/* Carosel of category */}
      <div className={(CategoryButtonStatus)?'h-screen fixed top-0 z-[999] bg-white border':'h-screen fixed left-[-110%]'}>
        <div className='flex justify-between pe-[10px] text-[30px] cursor-pointer border-b' onClick={()=>setCategoryButtonStatus(!CategoryButtonStatus)}>
          <div className='text-[25px] underline p-[5px]'>
            Categories
          </div> 
          &times;</div>
        <div className='px-[20px] overflow-y-auto h-[94vh]'>
          {
            (CategoryList.length>0)?
            CategoryList.map((v,i)=>{
              return(
                <div className='py-[10px] text-[20px]' key={i} onClick={()=>setCategoryName(v.url)} >{v.name}</div>
              )
            }):''
          }
        </div>
      </div>
      {/* Header */}
        <header className='w-[100%] z-[99] mb-[20px] bg-[white] sticky top-0'>
            <Header/>
        </header>
        {/* banner */}
        <section> 
          <div className='max-w-[1320px] mx-auto relative z-[-1]'>
            <img src={banner} alt="" className='w-[100%] rounded' />
            <p className=' absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] text-[white] underline text-[50px] font-semibold '>
              {(user==='')?
              '':
              <div className='text-center text-[25px] sm:text-[30px] md:text-[35px] lg:text-[40px] xl:text-[45px] 2xl:text-[50px]'>
                Welcome
                <div> {user} </div>
              </div>
              }
            </p>
          </div>
        </section>
        {/* Filter section */}
        <section className='max-w-[1320px] mx-auto p-[10px] sm:p-[20px] md:p-[30px] w-[100%]'>
          <div className='flex justify-end'>
            <button className='text-center flex items-center gap-[5px] p-[6px] md:p-[3px_15px] border border-slate-700 rounded-md bg-slate-700 text-[white] hover:bg-white hover:text-slate-700 ' onClick={()=>setFilterBtn(!filterBtn)}>
                <CiFilter/> <sapan className='hidden md:block'> Filter </sapan>  
              </button>
          </div>

          <div className={(filterBtn)?'scale-1 transition duration-300':'scale-0 transition duration-300 h-[0]'}>
            <div className='max-w-[1320px] mx-auto'>
              <div className='flex justify-between  p-[5px]'>
                <button className='border border-slate-700 p-[3px_7px] rounded-lg hover:bg-slate-700 hover:text-white' onClick={()=>setCategoryName('')}>Clear All Filter</button>
                <button className='border border-slate-700 p-[3px_7px] rounded-lg hover:bg-slate-700 hover:text-white' onClick={()=>setCategoryButtonStatus(!CategoryButtonStatus)}> Category </button>
                <button className='border border-slate-700 p-[3px_7px] rounded-lg relative  hover:bg-slate-700 hover:text-white' onClick={()=>setSortBtnStatus(!sortBtnStatus)}> 
                  Sort By 
                  <div className={(sortBtnStatus)?'absolute top-[108%] text-nowrap text-[black] right-0 p-[10px] bg-[white] rounded-md border border-slate-700':'absolute w-[0px] h-[0px] overflow-hidden'}>
                    <div onClick={sortA}>
                      Low to High
                    </div>
                    <div onClick={sortD}>
                      High to Low
                    </div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>
        {/* Card Section */}
        <section>
          <div className='w-[100%] px-[10px] sm:px-[20px] md:px-[30px]'>
            <div className='max-w-[1320px] mx-auto'>
              <div className='grid xl:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-[5px] items-center'>
                {
                  (product.length>0)?
                  product.map((v,i)=>{
                    return(
                      <Card img={v.thumbnail} name={v.title} key={i} warranty={v.warrantyInformation} id={v.id} price={v.price}/>
                    );
                  })
                  :'wait'

                }
              </div>
            </div>
          </div>
        </section>
        {/* Footer Section */}
        <footer>
          <Footer/>
        </footer>
    </div>
  )
}
