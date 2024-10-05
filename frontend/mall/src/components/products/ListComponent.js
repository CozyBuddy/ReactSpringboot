import { useEffect, useState } from "react"
import useCustomMove from "../../hooks/useCustomMove"
import FetchingModal from './../common/FetchingModal';
import { API_SERVER_HOST } from "../../api/todoApi";
import { getList } from "../../api/productApi";
import PageComponent from './../common/PageComponent';
import useCustomLogin from "../../hooks/useCustomLogin";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const host = API_SERVER_HOST
const initState = {

    dtoList:[],
    pageNumList:[],
    pageRequestDTO: null ,
    prev: false ,
    next: false ,
    totalCount : 0,
    prevPage:0,
    nextPage :0 ,
    totalPage : 0,
    current : 0
}

const ListComponent = (() => {

    const {moveToLoginReturn} = useCustomLogin() ;
    
    const {page,size,refresh ,moveToList, moveToRead} = useCustomMove()

   const {isFetching , data ,error , isError} = useQuery({
     queryKey:  ['product/list' , {page,size,refresh}],
     queryFn: () => getList({page,size}),
     staleTime : 1000*5
     }
   )

   //const queryClient = useQueryClient()

   const handleClickPage = (pageParam) => {
     moveToList(pageParam)
   }
   if(isError) {
    console.log(error)
    return moveToLoginReturn()
   }

   const serverData = data || initState


    return ( 
        <div className="border-2 border-blue-100 mt-10 mr-2 ml-2">
            <h1>Product List Component</h1>

            {isFetching ? <FetchingModal/> :<></>}

            <div className="flex flex-wrap mx-auto p-6">
        {serverData.dtoList.map(product => 
            <div key={product.pno} className="w-1/2 p-1 rounded shadow-md border-2"
            onClick={() => moveToRead(product.pno)}>
                <div className="flex flex-col h-full">
                    <div className="font-extrabold text-2xl p-2 w-full">
                        {product.pno}
                    </div>
                    <div className="text-1xl m-1 p-2 w-full flex flex-col">
                        <div className="w-full overflow-hidden">
                            <img src={`${host}/api/products/view/s_${product.uploadFileNames[0]}`} alt="product" className="m-auto rounded-md w-60"/>
                        </div>

                        <div className="bottom-0 font-extrabold bg-white">
                            <div className="text-center p-1">
                                이름 : {product.pname}
                            </div>
                            <div className="text-center p-1">
                                가격 : {product.price}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        )}

            </div>
            <PageComponent serverData={serverData} movePage={handleClickPage}></PageComponent>
        </div>
    )

})

export default ListComponent;