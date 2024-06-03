import React, { createContext, useEffect, useState } from 'react'

export let cartContext=createContext()
export function MainContext({children}) {
    let oldCart=JSON.parse(localStorage.getItem('cart'))??[]
    let [cart,setCart]=useState(oldCart)
    let userName=JSON.parse(localStorage.getItem('user'))??''
    let [userMailC,setUserMailC]=useState(userName)
    let obj={
        cart,
        setCart,
        userMailC,
        setUserMailC
    }
    useEffect(()=>{
        localStorage.setItem('cart',JSON.stringify(cart))
    },[cart])
  return (
    <cartContext.Provider value={obj} >
        {children}
    </cartContext.Provider>
  )
}
