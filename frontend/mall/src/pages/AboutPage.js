import { Link } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout"


const AboutPage = () => {
    return (
        <BasicLayout>
        <Link to={"/"}>Main Page</Link>
        <div className="text-3xl">About Page</div>
        </BasicLayout>
    )
}

export default AboutPage;