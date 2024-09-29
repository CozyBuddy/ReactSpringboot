
import { createSearchParams, Navigate, useNavigate } from 'react-router-dom';
import useCustomMove from './useCustomMove';
import { useDispatch, useSelector } from 'react-redux';
import loginSlice, { loginPostAsync, logout } from './../slices/loginSlice';
const useCustomLogin = () => {
    const navigate = useNavigate()

    const dispatch = useDispatch()
    const loginState = useSelector(state => state.loginSlice)

    const isLogin = loginState.email ? true : false 

    const doLogin = async (loginParam) => {
        const action = await dispatch(loginPostAsync(loginParam))

        return action.payload
    }

    const doLogout = () => {
        dispatch(logout())
    }
    const moveToPath = (path) => {
        navigate({pathname:path},{replace:true})
    }
    const moveToLogin = () => {
        navigate({pathname: '/member/login'} , {replace:true})
    }

    const moveToLoginReturn = () => {
        return <Navigate replace to="/member/login"></Navigate>
    }

    const exceptionHandle = (ex) => {
        console.log("Exception ...............")

        console.log(ex)

        const errorMsg = ex.response.data.error

        const errorStr = createSearchParams({error:errorMsg}).toString()

        if(errorMsg === 'REQUIRE_LOGIN')    {
            alert("로그인이 필요합니다.")
            navigate({pathname : '/member/login' , search:errorStr})
            return
        }

        if(ex.response.data.error === 'ERROR_ACCESSDENIED') {
            alert("해당 메뉴를 사용할 수 있는 권한이 없습니다.")
            navigate({pathname: '/member/login', search : errorStr})
            return
        }
    }

    return {loginState, isLogin, doLogin, doLogout, moveToPath , moveToLogin , moveToLoginReturn 
        ,exceptionHandle
    }

}

export default useCustomLogin;