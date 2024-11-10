import { lazy, Suspense } from "react"


const Loading = <div>Loading ...</div>
const Login = lazy(()=> import("../pages/member/LoginPage"))
const LogoutPage = lazy(() => import("../pages/member/LogoutPage"))
const KakaoRedirect = lazy(() => import("../pages/member/KakaoRedirectPage"))
const MemberModify = lazy(() => import("../pages/member/ModifyPage"))
const JoinMember = lazy(() => import("../pages/member/JoinPage"))
const memberRouter = () => {

    return [
        {
            path: "login" ,
            element: <Suspense fallback={Loading}><Login></Login></Suspense>
        },
        {
            path: "logout" ,
            element: <Suspense fallback={Loading}><LogoutPage></LogoutPage></Suspense>
        },
        {
            path : "kakao" ,
            element : <Suspense fallback={Loading}><KakaoRedirect/></Suspense>
        },
        {
            path : "modify" ,
            element : <Suspense fallback={Loading}><MemberModify/></Suspense>
        },
        {
            path : "join" ,
            element : <Suspense fallback={Loading}><JoinMember/></Suspense>
        }
    ]
}

export default memberRouter