import { atom } from "recoil"
import { getCookie } from "../util/cookieUtil"

const initState = {
    email : '' ,
    nickname : '' ,
    social : false ,
    accessToken : '',
    refreshToken : ''
}

const loadMemberCookie = () => {
    const memberInfo = getCookie('member')
    
    if( memberInfo && memberInfo.nickname) {
        memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
    }

    return memberInfo 
}

const signinState = atom( {
    key : 'signinState' ,
    default : loadMemberCookie() || initState
})

export default signinState