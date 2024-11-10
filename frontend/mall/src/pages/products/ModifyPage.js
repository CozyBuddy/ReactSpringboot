import { useParams } from "react-router-dom";
import ModifyComponent from './../../components/products/ModifyComponent';

const ModifyPage = () => {

    const {pno} = useParams()
    return (
        <div className="p-4 w-full bg-whtie">
            <div className="text-3xl font-extrabold">
               상품 수정
            </div>

            <ModifyComponent pno={pno}></ModifyComponent>
        </div>
    )
}

export default ModifyPage;