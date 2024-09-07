import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";

const MainPage = () => {
    return (
        <BasicLayout>
            <div className="flex underline">
            <Link to={'/about'}>about</Link>
            </div>
        <div className="text-3xl">
            <div>MainPage</div>
        </div>
        
       
        
        </BasicLayout>
    )
}

export default MainPage;