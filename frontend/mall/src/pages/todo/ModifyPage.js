import { useNavigate } from "react-router-dom";

const ModifyPage = ({tno}) => {

    const navigate = useNavigate()
    const moveToRead = () => {
        navigate({pathname:`/todo/read/${tno}`})
    }

    const movetoList = () => {
        navigate({pathname:"/todo/list"})
    }
    return (
        <div className="text-3xl font-extrabold">

            Todo Modify Page
        </div>
    )
}

export default ModifyPage;