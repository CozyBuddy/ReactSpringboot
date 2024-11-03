import { useEffect, useRef, useState } from "react";
import FetchingModal from './../common/FetchingModal';
import { deleteOne, getOne, putOne } from "../../api/productApi";
import { API_SERVER_HOST} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';



const initState = {
    pno:0,
    pname: '',
    pdesc: '',
    price: 0 ,
    delFlag: false,
    uploadFileNames : []
}

const host = API_SERVER_HOST

const ModifyComponent = ({pno}) => {
   
    
    const {moveToRead, moveToList} = useCustomMove()

    const [product,setProduct] = useState(initState)


    const query = useQuery({
        queryKey : ['product',pno] ,
        queryFn : () => getOne(pno) ,
        staleTime : Infinity
    })

    const uploadRef = useRef()

    useEffect(() => {
       if(query.isSuccess) {
        setProduct(query.data)
       }
    },[pno,query.data, query.isSuccess])

    const handleChangeProduct = (e) => {
        product[e.target.name]  = e.target.value

        setProduct({...product})
    }

    const delteOldImages = (imageName) => {
        const resultFileNames = product.uploadFileNames.filter(fileName => 
            fileName !== imageName
        )

        product.uploadFileNames = resultFileNames

        setProduct({...product})
    }
    const modMutation = useMutation({
        mutationFn : (product) => putOne(pno,product)
    })
    const handleClickModify = () => {
        const files = uploadRef.current.files

        const formData = new FormData()

        for (let i= 0 ; i < files.length ; i++) {
            formData.append("files" , files[i])


        }

        formData.append("pname" , product.name)
        formData.append("pdesc" , product.pdesc)
        formData.append("price",product.price)
        formData.append("delFlag" , product.delFlag)

        for ( let i=0 ; i<product.uploadFileNames.length ; i++) {
            formData.append("uploadFileNames" , product.uploadFileNames[i])
        }   
        
        modMutation.mutate(formData)
       

        
    }

    

    const delMutation = useMutation({
        mutationFn: (pno) => deleteOne(pno)
    })

    const queryClient = useQueryClient()

    const handleClickDelete = () => {
       delMutation.mutate(pno)
        
    }
    const closeModal = () => {
        if(delMutation.isSuccess) {
            queryClient.invalidateQueries(['products' , pno])
            queryClient.invalidateQueries(['products/list'])
            moveToList()
        }
        if(modMutation.isSuccess) {
            queryClient.invalidateQueries(['products' , pno])
            queryClient.invalidateQueries(['products/list'])
            moveToRead(pno)
        }
    }

    return (
        <div className="border-2 border-sky-200 mt-10 m-2 p-4">
          {query.isFetching || delMutation.isLoading || modMutation.isLoading ? <FetchingModal/> : <></>}
          {
            delMutation.isSuccess || modMutation.isSuccess ? <ResultModal title={'처리 결과'} content={'정상적으로 처리 되었습니다.'} callbackFn={closeModal}></ResultModal>
          : <></> }
            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">상품명</div>

                    <input type="text" className="w-4/5 p-6 rounded-r border border-solid border-neutral-300
                    shadow-md" name="pname" value={product.pname} onChange={handleChangeProduct}/>

                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">설명</div>
                    <textarea name="pdesc" id="" className="w-4/5 p-6 rounded-r border border-solid border-neutral-300
                     shadow-md resize-y" rows="4" 
                     onChange={handleChangeProduct}
                     value={product.pdesc}></textarea>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">가격</div>
                    <input type="number" className="w-4/5 p-6 rounded-r border border-solid border-neutral-300
                    shadow-md" name="price" value={product.price} onChange={handleChangeProduct}/>

                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">삭제</div>
                    <select name="delFlag" id="" value={product.delFlag}
                    onChange={handleChangeProduct}
                    className="w-4/5 p-6 rounded-r border border-solid border-neutral-300
                    shadow-md">
                        <option value={false}>사용</option>
                        <option value={true}>삭제</option>
                    </select>
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">파일</div>
                    <input type="file" ref={uploadRef} className="w-4/5 p-6 rounded-r border 
                    border-solid border-neutral-300
                    " multiple={true} />
                </div>
            </div>

            <div className="flex justify-center">
                <div className="relative mb-4 flex w-full flex-wrap items-stretch">
                    <div className="w-1/5 p-6 text-right font-bold">이미지</div>
                    <div className="w-4/5 justify-center flex flex-wrap items-start">
                    {product.uploadFileNames.map((imgFile, i) => 
                        <div className="flex justify-center flex-col w-1/3 m-1 align-baseline"
                        key={i}
                        >
                            <button className="bg-blue-500 text-3xl text-white" onClick={() => delteOldImages(imgFile)}>Delete</button>
                            <img src={`${host}/api/products/view/s_${imgFile}`} alt="img" />
                        </div>
                    )}
                    </div>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-red-500
                " onClick={handleClickDelete}>삭제</button>

                <button type="button" className="inline-block rounded p-4 m-2 text-xl w-32 text-white bg-orange-500"
                onClick={handleClickModify}>수정</button>

                <button type="button" className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
                onClick={moveToList}>
                    목록
                </button>
            </div>

        </div>
    )
}

export default ModifyComponent;