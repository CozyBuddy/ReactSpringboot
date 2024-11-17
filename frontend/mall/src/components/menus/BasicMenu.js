
import { Link } from "react-router-dom"
import useCustomLogin from "../../hooks/useCustomLogin";

const BasicMenu = () => {
    const {loginState} = useCustomLogin()
    return(
        <nav id='navbar' className="flex bg-blue-300">
            <div className="w-4/5 bg-green-700">
            <ul className="flex p-4 text-white font-bold">
                <li className="pr-6 text-2xl">
                    <Link to={"/"}>메인</Link> 
                </li>
                <li className="pr-6 text-2xl">
                    <Link to={"/about"}>기타</Link> 
                </li>
                {loginState.email ? <>
                
                <li className="pr-6 text-2xl">
                    <Link to={"/todo/"}>게시판</Link> 
                </li>
                <li className="pr-6 text-2xl">
                    <Link to={"/products/"}>상품</Link> 
                </li>
                </> : <></>}
            </ul>
            </div>

            <div className="w-1/5 flex justify-end bg-orange-300 p-4 font-medium">
            {!loginState.email ? 
            <div className="text-white text-sm m-1 rounded">
               <Link to={'/member/login'}>로그인</Link>
            </div>
                :
             <div className="text-white text-sm m-1 rounded">
                <Link to={'/member/logout'}>로그아웃</Link>
             </div>}
            </div>
        </nav>
    )
}

export default BasicMenu;