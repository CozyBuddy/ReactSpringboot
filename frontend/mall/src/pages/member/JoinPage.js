
import BasicLayout from '../../layouts/BasicLayout';
import JoinComponent from '../../components/member/JoinComponent';

const ModifyPage = () => {
    return (
        <BasicLayout>
            <div className='text-3xl mt-5 border border-gray-900 shadow-lg rounded-lg h-[80%]'>
                <div className='text-3xl font-bold'>회원가입 페이지</div>
            <div className='bg-white w-full h-full mt-4 p-2 border border-black rounded-lg '>
                <JoinComponent></JoinComponent>
            </div>
            </div>
        </BasicLayout>
    )
}

export default ModifyPage;