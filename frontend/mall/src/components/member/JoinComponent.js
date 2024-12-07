
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import loginSlice, { login } from '../../slices/loginSlice';
import useCustomLogin from '../../hooks/useCustomLogin';
import ResultModal from '../common/ResultModal';
import { JoinMember } from './../../api/memberApi';
import { Router, useNavigate } from 'react-router-dom';
import { sendmail } from '../../api/sendMail';


const initState = {
    email : '' ,
    pw: '' ,
    nickname : ''
}

const emailData = {
    email: '',
};
const JoinComponent = () => {
    const [member,setMember] = useState(initState)
    const [result, setResult] = useState() 
    const [emailvalidate, setemailvalidate] = useState(emailData) 
    const navigate = useNavigate();
    const handleChange = (e) => {
        setMember({...member ,[e.target.name] : e.target.value})
        if(e.target.name == 'email'){
            setemailvalidate({...emailData , email: e.target.value})
        }
       
    }
    const handleClickJoin = () => {
   
        JoinMember(member).then(result => {
            setResult("Modified")
        
            
        })

    }
    const handleValidateEmail = () => {
        const res = sendmail(emailvalidate).then(
            result => {
                alert('메일을 보냈습니다.')
            }
        )
       
    }
    const colseModal = () => {
        setResult(null)
        navigate("/member/login")
    }
    return ( 
        <div className='mt-6 w-full h-full'>
            {result ? <ResultModal title={'회원정보'} content={'회원가입완료'} callbackFn={colseModal}></ResultModal>: <></>}
            <div className='grid grid-cols-[2fr,5fr] grid-rows-3 w-full h-[50%] gap-1'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-full p-6 text-xs text-right md:text-lg font-bold'>이메일</div>
                </div>
                <div className='flex justify-start items-center'><input type="text" className='w-[60%] p-6 h-full rounded-lg border border-solid border-neutral-300
                     shadow-md' name='email' value={member.email} onChange={handleChange}/>
                      <button className='w-[15%] h-[30%] ml-2 p-6 text-xs  border border-gray-800 text-right flex justify-center items-center md:text-lg bg-black  text-white font-semibold rounded-lg shadow-xl overflow-hidden' onClick={handleValidateEmail}>이메일 인증하기</button></div>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-full p-6 text-xs md:text-lg  text-right font-bold'>비밀번호</div>
                
                </div>
                <div> <input type="password" className='w-[60%] h-full p-6 rounded-lg border border-solid border-neutral-300
                     shadow-md' name='pw' value={member.pw} onChange={handleChange}/></div>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-full p-6 text-xs md:text-lg text-right font-bold'>닉네임</div>
                </div>
                <div> <input type="text" className='w-[60%] h-full p-6 rounded-lg border border-solid border-neutral-300
                     shadow-md' name='nickname' value={member.nickname} onChange={handleChange}/></div>
            </div>
           
            
            <div className='flex justify-end items-end'>
                <div className=' mb-4 flex w-full flex-wrap justify-end items-end'>
                    <button type='button' className='rounded p-4 m-2 text-xl font-bold w-32 text-white bg-blue-500'
                    onClick={handleClickJoin}>
                       회원가입
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JoinComponent;