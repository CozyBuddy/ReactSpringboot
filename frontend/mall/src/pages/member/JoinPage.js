
import BasicLayout from '../../layouts/BasicLayout';
import JoinComponent from '../../components/member/JoinComponent';

const ModifyPage = () => {
    return (
        <BasicLayout>
            <div className='text-3xl'>회원가입 페이지</div>
            <div className='bg-white w-full mt-4 p-2'>
                <JoinComponent></JoinComponent>
            </div>
        </BasicLayout>
    )
}

export default ModifyPage;