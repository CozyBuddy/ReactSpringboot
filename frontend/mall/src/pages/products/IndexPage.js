import { useCallback } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import BasicLayout from "../../layouts/BasicLayout";

const IndexPage = () => {

    const navigate = useNavigate()

    const handleClickList = useCallback(()=>{
        navigate({pathname:'list'})
    
    })

    const handleClickAdd = useCallback(()=>{
        navigate({pathname:'add'})
    
    })
    return (
        <BasicLayout>
            <div className="text-black font-extrabold -mt-10"> 
                상품 메뉴
            </div>

            <div className="w-full flex m-2 p-2">
                <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline" onClick={handleClickList}>
                    목록
                </div>

                <div className="text-xl m-1 p-2 w-20 font-extrabold text-center underline" onClick={handleClickAdd}>
                    추가
                </div>
            </div>

            <div className="flex flex-wrap w-full">
                <Outlet></Outlet>
            </div>
        </BasicLayout>
    )
}
export default IndexPage;