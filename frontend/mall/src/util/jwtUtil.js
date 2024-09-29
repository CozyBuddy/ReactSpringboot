import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";
import { API_SERVER_HOST } from "../api/todoApi";


const jwtAxios = axios.create() 

const beforeReq = (config) => {
    console.log("before request...")
    const memberInfo = getCookie("member")

    if(!memberInfo) {
        console.log("Member NOT FOUND")
        return Promise.reject(
            {response : 
                {data: 
                    {error:"REQUIRE_LOGIN"}
                }
            }
        )
    }

    const {accessToken} = memberInfo

    config.headers.Authorization = `Bearer ${accessToken}`
    return config
}

const requestfail = (err) => {
    console.log("request error ....")

    return Promise.reject(err)
}

const beforeRes = async (res) => {
    console.log("before return response")
    console.log(res)

    const data = res.data
    if(data && data.error === 'ERROR_ACCESS_TOKEN') {
        const memberCookieValue = getCookie("member")

        const result = await refreshJWT (memberCookieValue.accessToken,
            memberCookieValue.refreshToken
        )

        console.log("refreshJWT Result" , result)

        memberCookieValue.accessToken = result.accessToken
        memberCookieValue.refreshToken = result.refreshToken

        setCookie("member" , JSON.stringify(memberCookieValue) ,1 )

        const originalRequest = res.config

        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

        return await axios(originalRequest)
    }

    return res
}

const responseFail = (err) => {
    console.log("response fail error")

    return Promise.reject(err)
}
const refreshJWT = async (accessToken , refreshToken) => {
    const host = API_SERVER_HOST

    const header = {headers : {"Authorization" : `Bearer ${accessToken}`}}

    const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}`,header)

    console.log("-----------------")

    console.log(res.data)

    return res.data
}

jwtAxios.interceptors.request.use(beforeReq, requestfail)

jwtAxios.interceptors.response.use( beforeRes, responseFail)

export default jwtAxios 