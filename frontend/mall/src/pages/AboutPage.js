import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout"
import useCustomLogin from "../hooks/useCustomLogin";


const AboutPage = () => {

     const {isLogin, moveToLoginReturn} = useCustomLogin()

     if(!isLogin) {
        return moveToLoginReturn()
     }
    return (
        <BasicLayout>
        <Link to={"/"}>Main Page</Link>
        <div className="text-3xl">About Page</div>
        </BasicLayout>
    )
}

export default AboutPage;