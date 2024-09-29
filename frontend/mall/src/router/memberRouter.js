import { lazy, Suspense } from "react"


const Loading = <div>Loading ...</div>
const Login = lazy(()=> import("../pages/member/LoginPage"))
const LogoutPage = lazy(() => import("../pages/member/LogoutPage"))
const memberRouter = () => {

    return [
        {
            path: "login" ,
            element: <Suspense fallback={Loading}><Login></Login></Suspense>
        },
        {
            path: "logout" ,
            element: <Suspense fallback={Loading}><LogoutPage></LogoutPage></Suspense>
        }
    ]
}

export default memberRouter