
import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';
import loginSlice, { login } from './../../slices/loginSlice';
import { modifyMember } from '../../api/memberApi';
import useCustomLogin from '../../hooks/useCustomLogin';
import ResultModal from './../common/ResultModal';


const initState = {
    email : '' ,
    pw: '' ,
    nickname : ''
}

const ModifyComponent = () => {
    const [member,setMember] = useState(initState)
    const loginInfo = useSelector(state => state.loginSlice)
    const {moveToLogin} = useCustomLogin()
    const [result, setResult] = useState() 
    useEffect(() => {
        setMember({...loginInfo, pw:"ABCD"})
    },[loginInfo])

    const handleChange = (e) => {
        member[e.target.name] = e.target.value
        setMember({...member})
    }
    const handleClickModify = () => {
        modifyMember(member).then(result => {
            setResult("Modified")
        })


    }
    const colseModal = () => {
        setResult(null)
        moveToLogin()
    }
    return ( 
        <div className='mt-6'>
            {result ? <ResultModal title={'회원정보'} content={'정보수정완료'} callbackFn={colseModal}></ResultModal>: <></>}
            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap items-stretch'>
                    <div className='w-1/5 p-6 text-right font-bold'>이메일</div>
                    <input type="text" className='w-4/5 p-6 rounded-r border border-solid border-neutral-300
                     shadow-md' name='email' value={member.email} readOnly/>
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
                    <div className='w-1/5 p-6 text-right font-bold'>비밀번호</div>
                    <input type="text" className='w-4/5 p-6 rounded-r border border-solid border-neutral-300
                     shadow-md' name='nickname' value={member.nickname} onChange={handleChange}/>
                </div>
            </div>
            <div className='flex justify-center'>
                <div className='relative mb-4 flex w-full flex-wrap justify-end'>
                    <button type='button' className='rounded p-4 m-2 text-xl w-32 text-white bg-blue-500'
                    onClick={handleClickModify}>
                        수정
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ModifyComponent;