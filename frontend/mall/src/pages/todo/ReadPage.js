import { useCallback } from "react";
import { createSearchParams, useNavigate, useParams, useSearchParams } from "react-router-dom";
import ReadComponent from './../../components/todo/ReadComponent';

const ReadPage = () => {
    //밑은 userParams로 url 경로의 파라미터값들을 왼쪽에 중괄호를 통해서 변수에 받아두는 역할임.
    const {tno} = useParams()
   /*  const navigate = useNavigate()
    const [queryParams] = useSearchParams() // 현재 쿼리스트링에 대한 정보 가지고 있음.

    const page = queryParams.get("page") ? parseInt(queryParams.get("page")) : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10

    const queryStr = createSearchParams({page,size}).toString()
    const moveToModify = useCallback((tno)=>{
        navigate({pathname: `/todo/modify/${tno}`,
                  search : queryStr})
    },[tno,page,size])

    const movetoList = useCallback(() =>{
        navigate({
            pathname : `/todo/list/`,
            search : queryStr
        })
    },[page,size])
    // [tno] 가 있어야 새로 랜더링 될때 저 값이 업데이트됨. */
    return(
        <div className="font-extrabold w-full bg-white mt-6">
        <div className="text-2xl">
            Todo Read Page Component {tno}
            <div>
            <ReadComponent tno={tno}></ReadComponent>
            
        </div>
        </div>
        </div>

        
    );
}

export default ReadPage;