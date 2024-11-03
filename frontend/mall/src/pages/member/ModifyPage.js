
import BasicLayout from './../../layouts/BasicLayout';
import ModifyComponent from './../../components/member/ModifyComponent';

const ModifyPage = () => {
    return (
        <BasicLayout>
            <div className='text-3xl'>사용자 정보 수정 페이지</div>
            <div className='bg-white w-full mt-4 p-2'>
                <ModifyComponent></ModifyComponent>
            </div>
        </BasicLayout>
    )
}

export default ModifyPage;