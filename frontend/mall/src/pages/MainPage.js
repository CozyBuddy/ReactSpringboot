import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {
    return (
        <BasicLayout>
            <div className="flex underline">
            <Link to={'/about'}>기타</Link>
            </div>
        <div className="text-3xl">
            <div>메인</div>
        </div>
        
       
        
        </BasicLayout>
    )
}

export default MainPage;