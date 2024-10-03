
import BasicLayout from './../../layouts/BasicLayout';
import ModifyComponent from './../../components/member/ModifyComponent';

const ModifyPage = () => {
    return (
        <BasicLayout>
            <div className='text-3xl'>Member Modify Page</div>
            <div className='bg-white w-full mt-4 p-2'>
                <ModifyComponent></ModifyComponent>
            </div>
        </BasicLayout>
    )
}

export default ModifyPage;