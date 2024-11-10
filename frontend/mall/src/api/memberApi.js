import axios from "axios";
import { API_SERVER_HOST } from "./todoApi";
import jwtAxios from "../util/jwtUtil";

const host =`${API_SERVER_HOST}/api/member`

export const loginPost = async (loginParam) => {
    const header = { headers : {"Content-Type" : "x-www-form-urlencoded"}}

    const form = new FormData()
    form.append('username' , loginParam.email)
    form.append('password' , loginParam.pw)

    const res = await axios.post(`${host}/login`, form , header)

    return res.data
}

export const modifyMember = async (member) => {
    const res = await jwtAxios.put(`${host}/modify`,member)

    return res.data ;
}

export const JoinMember = async (member) => {
    console.log(member)
    const res = await axios.post(`${host}/join`,member)
    console.log(res)
    return res.data ;
}