
import BasicMenu from './../../components/menus/BasicMenu';
import LogoutComponet from './../../components/member/LogoutComponent';
const LogoutPage = () => {
    return (
        <div className="fixed top-0 left-0 z-[1055] flex flex-col h-full w-full">
            <BasicMenu></BasicMenu>
            <div className='w-full flex flex-wrap h-full justify-center items-center border-2'>
                <LogoutComponet></LogoutComponet>
            </div>
        </div>
    )
}

export default LogoutPage ;