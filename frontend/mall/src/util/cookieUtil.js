import { Cookies } from "react-cookie";

const cookies = new Cookies() 

export const setCookie = ( name , value, days) => {
    const expires = new Date()
    expires.setUTCDate(expires.getUTCDate() + days) 
    return cookies.set(name,value,{path:'/' , expires:expires})
}

export const getCookie = (name) => {
    return cookies.get(name)
}

export const removeCookie = (name) => {
    cookies.remove(name , {path: '/' })
    document.cookie = `${name}=; Max-Age=0; path=/;`;
}