import { useState } from "react"
import { login, loginPostAsync } from "../../slices/loginSlice"
import { useDispatch } from "react-redux"
import { Navigate, useNavigate } from "react-router-dom"
import useCustomLogin from "../../hooks/useCustomLogin"
import KakaoLoginComponent from './KakaoLoginComponent';

const initState = {
    email: '' ,
    pw: ''
}

const LoginComponent = () => {
    const [loginParam , setLoginParam] = useState({...initState})

   const { doLogin, moveToPath} = useCustomLogin()

    const handleChange = (e) => {
        loginParam[e.target.name] = e.target.value

        setLoginParam({...loginParam})
    }

    const handelClickLogin = (e) => {
       doLogin(loginParam)
       .then(data => {
        console.log("after unwrap")
        console.log(data)
        if(data.error) {
            alert("아이디와 패스워드를 다시 확인하세요")
        } else {
            alert("로그인 성공")
            moveToPath('/')
        }
       })
    }

    return ( 
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
            <div className="flex justify-center">
                <div className="text-4xl m-4 p-4 font-extrabold text-blue-500">Login Component</div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Email</div>
                    <input type="text" className="w-full p-3 rounded-r border border-solid border-neutral-500
                     shadow-md" name="email" value={loginParam.email} onChange={handleChange} />

                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-full p-3 text-left font-bold">Password</div>
                    <input type="password" className="w-full p-3 rounded-r border border-solid border-neutral-500
                     shadow-md" name="pw" value={loginParam.pw} onChange={handleChange} />

                </div>
            </div>
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full justify-center">
                    <div className="w-2/5 p-6 flex justify-center font-bold">
                    <button className="rounded p-4 w-36 bg-blue-500 text-xl text-white" onClick={handelClickLogin}>
                        Login
                    </button>
                    </div>
                </div>
            </div>
            <KakaoLoginComponent></KakaoLoginComponent>
        </div>
    )
}

export default LoginComponent ;