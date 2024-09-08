import { useSearchParams } from "react-router-dom";

const ListPage = () => {

    const [queryParams] = useSearchParams()

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 1
    return(
        <div className="p-4 w-full bg-white">
            <div className="text-3xl font-extrabold">
                Todo List Page Component {page} --- {size}
            </div>
        </div>
    )
}

export default ListPage;