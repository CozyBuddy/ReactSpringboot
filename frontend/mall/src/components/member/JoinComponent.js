
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import loginSlice, { login } from '../../slices/loginSlice';
import useCustomLogin from '../../hooks/useCustomLogin';
import ResultModal from '../common/ResultModal';
import { JoinMember } from './../../api/memberApi';
import { Router, useNavigate } from 'react-router-dom';


const initState = {
    email : '' ,
    pw: '' ,
    nickname : ''
}

const JoinComponent = () => {
    const [member,setMember] = useState(initState)
    const [result, setResult] = useState() 
    const navigate = useNavigate();
    const handleChange = (e) => {
        setMember({...member ,[e.target.name] : e.target.value})
    }
    const handleClickJoin = () => {
   
        JoinMember(member).then(result => {
            setResult("Modified")
        
            
        })

    }
    const colseModal = () => {
        setResult(null)
        navigate("/member/login")
    }
    return ( 
        <div className='mt-6'>
            {result ? <ResultModal title={'회원정보'} content={'회원가입완료'} callbackFn={colseModal}></ResultModal>: <></>}
            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>이메일</div>
                    <input type="text" className='w-4/5 p-6 rounded-r border border-solid border-neutral-300
                     shadow-md' name='email' value={member.email} onChange={handleChange}/>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>비밀번호</div>
                    <input type="password" className='w-4/5 p-6 rounded-r border border-solid border-neutral-300
                     shadow-md' name='pw' value={member.pw} onChange={handleChange}/>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>닉네임</div>
                    <input type="text" className='w-4/5 p-6 rounded-r border border-solid border-neutral-300
                     shadow-md' name='nickname' value={member.nickname} onChange={handleChange}/>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap justify-end'>
                    <button type='button' className='rounded p-4 m-2 text-xl w-32 text-white bg-blue-500'
                    onClick={handleClickJoin}>
                       회원가입
                    </button>
                </div>
            </div>
        </div>
    )
}

export default JoinComponent;